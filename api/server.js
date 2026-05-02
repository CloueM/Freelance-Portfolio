import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const sanitizeKey = (key) => key?.replace(/['"]/g, "").trim();
const RECAPTCHA_SECRET = sanitizeKey(process.env.RECAPTCHA_API_KEY);
const GEMINI_API_KEY = sanitizeKey(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are the AI Assistant for Cloue Macadangdang, a developer and designer based in Vancouver, BC. Your role is to help visitors understand Cloue's work and guide them through the initial inquiry process.

IDENTITY:
- You are NOT Cloue. You are his AI Assistant. 
- Tone: Professional, helpful, concise, and friendly.
- NO REPETITIVE INTROS: Do not introduce yourself in every message. Do not say "I am Cloue's AI Assistant" or "Hello there" repeatedly. Since there is a welcome message, assume the user already knows who you are.
- DIRECT CONTACT: If a user asks to "talk to the developer" or "talk to Cloue", inform them that you are his assistant and provide his direct email: hello@kurowii.com.

ABOUT CLOUE:
- Cloue is a Filipino developer based in Vancouver, BC.
- He builds stable, fast, and fully custom websites (E-commerce, Service sites, Restaurants, Portfolios).
- Pricing starts around $750. Hourly rate is $35.

STRICTLY NO SYMBOLS:
- Do not use asterisks (*), bolding (**), italics (_), or any markdown symbols. 
- Do not use bullet points with symbols like - or *.
- Provide responses in PLAIN TEXT only. Use standard punctuation only.

CONVERSATION FLOW & EFFICIENCY:
1. NO LOOPS: Do not ask the same questions repeatedly. If a user provides an answer, acknowledge it and move to the next logical step. 
2. STATE AWARENESS: Before asking a question, check the conversation history. If the user has already mentioned their project type, budget, or features, DO NOT ask for them again.
3. PRICING QUERIES: If a user asks "How much?" or about pricing, provide the starting rate ($750) and then immediately follow up with a relevant inquiry question that hasn't been answered yet.
4. THE INQUIRY PATH:
   - Phase 1: If they ask about services and you don't know their goal yet, ask: "What kind of website or project are you looking to build?"
   - Phase 2: Once you know the project type, ask ONE follow-up from these categories (Budget, Features, or Inspiration) that hasn't been covered.
   - Phase 3: Once you have 3-4 key details, provide a clean Project Inquiry Summary. Use plain text labels instead of symbols:

   Project Inquiry Summary
   Goal: [Industry/Project Type]
   Status: [New Venture/Redesign]
   Timeline: [Launch Date/Urgency]
   Audience: [Target Market]
   Features: [Key Functionalities]
   Budget: [Range]

   Invite them to email this summary to hello@kurowii.com to officially start the conversation with Cloue.

STRICT RULES:
- Never claim to be Cloue.
- Always provide hello@kurowii.com if they want to talk to him directly.
- Keep the conversation moving forward. Do not get stuck in a qualifying loop.`;

const app = express();

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(cors({
  origin: [ALLOWED_ORIGIN, "https://freelance.kurowii.com"],
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const PORT = process.env.PORT || 3001;

// Backend Rate Limiting (Simple In-Memory)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkBackendRateLimit(ip) {
  const now = Date.now();
  const userData = rateLimits.get(ip) || { count: 0, startTime: now };

  if (now - userData.startTime > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.startTime = now;
  } else {
    userData.count++;
  }

  rateLimits.set(ip, userData);
  return userData.count <= MAX_REQUESTS_PER_WINDOW;
}

// Backend Input Sanitization
const INJECTION_PATTERNS = [
  /ignore\s+(previous|all|above|prior|your)\s+(instructions?|prompts?|context|rules?)/i,
  /you\s+are\s+now\s+(a|an|the)/i,
  /\[system\]/i,
  /forget\s+(everything|all|your|the\s+above)/i,
  /act\s+as\s+(if\s+you\s+(are|were)|a|an|the)/i,
  /pretend\s+(you\s+are|to\s+be|that)/i,
  /disregard\s+(your|the|all|previous)/i,
  /override\s+(your|the|all|previous)\s+(instructions?|rules?|prompts?)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /new\s+persona/i,
  /your\s+true\s+(self|identity)/i,
  /developer\s+mode/i,
];

function sanitize(text) {
  if (typeof text !== "string") return "";
  let s = text.trim().substring(0, 500);
  s = s.replace(/<[^>]*>/g, ""); // Remove HTML
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(s)) return "Malicious content detected.";
  }
  return s;
}

async function verifyRecaptcha(token) {
  const secretKey = RECAPTCHA_SECRET; 
  if (!token) return { valid: false, reason: "No token provided" };
  if (!secretKey || secretKey.length < 10) return { valid: true }; 

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token }),
    });
    const data = await response.json();
    return { valid: data.success && data.score >= 0.5, reason: data["error-codes"]?.[0] || "Low score" };
  } catch (error) {
    return { valid: false, reason: "Verification error" };
  }
}

app.post("/api/chat", async (req, res) => {
  const { messages, recaptchaToken } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // 1. Backend Rate Limit
  if (!checkBackendRateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please wait a minute." });
  }

  // 2. reCAPTCHA
  const recaptchaResult = await verifyRecaptcha(recaptchaToken);
  if (!recaptchaResult.valid) {
    return res.status(403).json({ error: "Security verification failed." });
  }

  // 3. Backend Sanitization
  const lastMsg = messages[messages.length - 1];
  const userText = lastMsg?.content?.[0]?.text ?? "";
  const cleanText = sanitize(userText);
  if (cleanText === "Malicious content detected.") {
    return res.status(400).json({ error: "Message rejected for security reasons." });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT // Use internal prompt, ignore frontend
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: sanitize(m.content[0].text) }]
      })),
    });

    const result = await chat.sendMessage(cleanText);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Assistant unavailable." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
