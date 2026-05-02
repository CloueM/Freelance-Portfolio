

const MAX_LENGTH = 500;


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


export const sanitizeInput = (text) => {
  if (typeof text !== "string") {
    throw new Error("Invalid message format.");
  }

  let sanitized = text.trim();

  if (!sanitized) {
    throw new Error("Please enter a message before sending.");
  }

  if (sanitized.length > MAX_LENGTH) {
    throw new Error(
      `Your message is too long (${sanitized.length}/${MAX_LENGTH} characters). Please shorten it.`
    );
  }

  sanitized = sanitized.replace(/<[^>]*>/g, "");

  sanitized = sanitized.replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n");

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(sanitized)) {
      throw new Error(
        "Your message contains content that isn't allowed. Please rephrase your question."
      );
    }
  }

  return sanitized;
};
