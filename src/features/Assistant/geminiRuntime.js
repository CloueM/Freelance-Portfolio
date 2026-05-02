
import { useLocalRuntime } from "@assistant-ui/react";
import { GoogleGenAI } from "@google/genai";
import { checkRateLimit, recordMessage } from "./rateLimiter";
import { sanitizeInput } from "./sanitize";
import { checkDomain } from "./domainGuard";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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

export const useGeminiRuntime = (executeRecaptchaRef) => {
  return useLocalRuntime({
    run: async function* ({ messages, abortSignal }) {

      try {
        checkDomain();
      } catch (error) {
        yield { content: [{ type: "text", text: `⚠️ ${error.message}` }] };
        return;
      }

      try {
        checkRateLimit();
      } catch (error) {
        yield { content: [{ type: "text", text: `⏳ ${error.message}` }] };
        return;
      }

      const lastMessage = messages[messages.length - 1];
      const rawText = lastMessage?.content?.[0]?.text ?? "";
      let sanitizedText;

      try {
        sanitizedText = sanitizeInput(rawText);
      } catch (error) {
        yield { content: [{ type: "text", text: `⚠️ ${error.message}` }] };
        return;
      }

      if (executeRecaptchaRef?.current) {
        try {
          const token = await executeRecaptchaRef.current("chat_message");
          if (!token) {
            yield {
              content: [{
                type: "text",
                text: "⚠️ Could not verify your request. Please refresh and try again.",
              }],
            };
            return;
          }
        } catch {
          console.warn("[Assistant] reCAPTCHA unavailable, continuing without verification.");
        }
      }

      if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_gemini_api_key_here") {
        yield {
          content: [{
            type: "text",
            text: "⚙️ The assistant is not yet configured. Please check back soon!",
          }],
        };
        return;
      }

      const history = [];
      for (let i = 0; i < messages.length - 1; i++) {
        const msg = messages[i];
        const text = msg?.content?.[0]?.text ?? "";
        if (text.trim()) {
          history.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text }],
          });
        }
      }

      try {
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 1500,
            temperature: 0.7,
            topP: 0.9,
          },
          contents: [
            ...history,
            { role: "user", parts: [{ text: sanitizedText }] },
          ],
        });

        const text = response.text ?? "";
        yield { content: [{ type: "text", text: text }] };

        recordMessage();

      } catch (error) {
        console.error("[Assistant] Gemini API error:", error);
        const isQuotaError = error?.message?.includes("429") || error?.message?.includes("quota");
        yield {
          content: [{
            type: "text",
            text: isQuotaError
              ? "⏳ I'm a bit busy right now. Please try again in a moment."
              : "⚠️ Something went wrong. Please try again shortly.",
          }],
        };
      }
    },
  });
};
