import { useLocalRuntime } from "@assistant-ui/react";

export const useMockRuntime = () => {
  return useLocalRuntime({
    adapter: {
      run: async function* (messages) {
        const responseText = `I am working! This is a mock response from your AI Specialist. \n\nI can help you explore this portfolio or answer questions about services.`;
        
        const words = responseText.split(" ");
        let currentText = "";

        for (const word of words) {
          currentText += word + " ";
          yield { content: [{ type: "text", text: currentText }] };
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      },
    },
  });
};
