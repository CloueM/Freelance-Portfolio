<?php
// chat.php - PHP replacement for server.js
header("Access-Control-Allow-Origin: https://freelance.kurowii.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Load Environment Variables from ../.env
function loadEnv($path)
{
    if (!file_exists($path))
        return [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $env = [];
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0)
            continue;
        list($name, $value) = explode('=', $line, 2);
        $env[trim($name)] = trim($value, " \t\n\r\0\x0B\"'");
    }
    return $env;
}

$env = loadEnv(__DIR__ . '/../.env');
$GEMINI_API_KEY = $env['GEMINI_API_KEY'] ?? '';
$RECAPTCHA_SECRET = $env['RECAPTCHA_API_KEY'] ?? '';

// System Prompt
$SYSTEM_PROMPT = "You are the AI Assistant for Cloue Macadangdang, a developer and designer based in Vancouver, BC. Your role is to help visitors understand Cloue's work and guide them through the initial inquiry process.

IDENTITY:
- You are NOT Cloue. You are his AI Assistant. 
- Tone: Professional, helpful, concise, and friendly.
- NO REPETITIVE INTROS: Do not introduce yourself in every message. Do not say \"I am Cloue's AI Assistant\" or \"Hello there\" repeatedly. Since there is a welcome message, assume the user already knows who you are.
- DIRECT CONTACT: If a user asks to \"talk to the developer\" or \"talk to Cloue\", inform them that you are his assistant and provide his direct email: hello@kurowii.com.

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
3. PRICING QUERIES: If a user asks \"How much?\" or about pricing, provide the starting rate ($750) and then immediately follow up with a relevant inquiry question that hasn't been answered yet.
4. THE INQUIRY PATH:
   - Phase 1: If they ask about services and you don't know their goal yet, ask: \"What kind of website or project are you looking to build?\"
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
- Keep the conversation moving forward. Do not get stuck in a qualifying loop.";

// Simple Rate Limiting
$ip = $_SERVER['REMOTE_ADDR'];
$rateFile = sys_get_temp_dir() . '/rate_' . md5($ip);
$now = time();
$limit = 10;
$window = 60;

if (file_exists($rateFile)) {
    $data = json_decode(file_get_contents($rateFile), true);
    if ($now - $data['start'] < $window) {
        if ($data['count'] >= $limit) {
            http_response_code(429);
            echo json_encode(["error" => "Too many requests. Please wait a minute."]);
            exit;
        }
        $data['count']++;
    } else {
        $data = ['count' => 1, 'start' => $now];
    }
} else {
    $data = ['count' => 1, 'start' => $now];
}
file_put_contents($rateFile, json_encode($data));

// Get Request Body
$input = json_decode(file_get_contents("php://input"), true);
$messages = $input['messages'] ?? [];
$recaptchaToken = $input['recaptchaToken'] ?? '';

// Verify reCAPTCHA
if (!$recaptchaToken) {
    http_response_code(403);
    echo json_encode(["error" => "Security verification failed."]);
    exit;
}

$ch = curl_init("https://www.google.com/recaptcha/api/siteverify");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'secret' => $RECAPTCHA_SECRET,
    'response' => $recaptchaToken
]));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$reResponse = json_decode(curl_exec($ch), true);
curl_close($ch);

if (!$reResponse['success'] || $reResponse['score'] < 0.5) {
    http_response_code(403);
    echo json_encode(["error" => "Security verification failed."]);
    exit;
}

// Input Sanitization
$lastMsg = end($messages);
$userText = $lastMsg['content'][0]['text'] ?? '';
$cleanText = trim(strip_tags(substr($userText, 0, 500)));

$injectionPatterns = [
    '/ignore\s+(previous|all|above|prior|your)\s+(instructions?|prompts?|context|rules?)/i',
    '/you\s+are\s+now\s+(a|an|the)/i',
    '/\[system\]/i',
    '/forget\s+(everything|all|your|the\s+above)/i',
    '/act\s+as\s+(if\s+you\s+(are|were)|a|an|the)/i',
    '/pretend\s+(you\s+are|to\s+be|that)/i',
    '/disregard\s+(your|the|all|previous)/i',
    '/override\s+(your|the|all|previous)\s+(instructions?|rules?|prompts?)/i',
    '/jailbreak/i',
    '/\bDAN\b/',
    '/new\s+persona/i',
    '/your\s+true\s+(self|identity)/i',
    '/developer\s+mode/i'
];

foreach ($injectionPatterns as $pattern) {
    if (preg_match($pattern, $cleanText)) {
        http_response_code(400);
        echo json_encode(["error" => "Message rejected for security reasons."]);
        exit;
    }
}

// Prepare Gemini API Call
$history = [];
foreach (array_slice($messages, 0, -1) as $m) {
    $history[] = [
        "role" => $m['role'] === "assistant" ? "model" : "user",
        "parts" => [["text" => trim(strip_tags($m['content'][0]['text']))]]
    ];
}

$payload = [
    "contents" => array_merge($history, [
        [
            "role" => "user",
            "parts" => [["text" => $cleanText]]
        ]
    ]),
    "system_instruction" => ["parts" => [["text" => $SYSTEM_PROMPT]]]
];

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" . $GEMINI_API_KEY;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = json_decode(curl_exec($ch), true);
curl_close($ch);

if (isset($response['candidates'][0]['content']['parts'][0]['text'])) {
    echo json_encode(["text" => $response['candidates'][0]['content']['parts'][0]['text']]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Assistant unavailable."]);
}
