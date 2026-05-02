import { useLocalRuntime } from "@assistant-ui/react";
import { checkRateLimit, recordMessage } from "./rateLimiter";
import { sanitizeInput } from "./sanitize";
import { checkDomain } from "./domainGuard";

const API_URL = import.meta.env.VITE_API_URL || "/api/chat";

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

      let recaptchaToken = null;
      if (executeRecaptchaRef?.current) {
        try {
          recaptchaToken = await executeRecaptchaRef.current("chat_message");
        } catch (err) {
          // Silent fail, backend handles validation
        }
      }

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: messages.map(m => ({
              role: m.role,
              content: m.content
            })),
            recaptchaToken,
          }),
          signal: abortSignal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get response.");
        }

        const data = await response.json();
        yield { content: [{ type: "text", text: data.text }] };

        recordMessage();

      } catch (error) {
        if (error.name === 'AbortError') return;

        const message = error.message.includes("verification failed")
          ? "⚠️ Security check failed. Please refresh the page and try again."
          : "⚠️ Something went wrong. Please try again shortly.";

        yield {
          content: [{
            type: "text",
            text: message,
          }],
        };
      }
    },
  });
};
