import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const SYSTEM_PROMPTS: Record<string, string> = {
  email:
    "You are a helpful assistant for PhoziFlow, a school transport and long-distance taxi business. Draft clear, warm, professional emails to schools, parents or partners. Keep it concise. Include a subject line at the top.",
  whatsapp:
    "You are a helpful assistant for PhoziFlow. Draft short, warm WhatsApp replies to parents in a friendly conversational tone. Use plain text, at most 3 short paragraphs.",
  notify:
    "You are a helpful assistant for PhoziFlow. Draft a clear, calm parent notification suitable for bulk sending. Lead with the key information. Keep it under 120 words.",
  tasks:
    "You are a helpful assistant for PhoziFlow. Turn the user's to-dos into a prioritised plan for today with time-blocks and short justifications.",
  business:
    "You are a helpful business assistant for PhoziFlow, a school transport and long-distance taxi business. Give practical, specific answers.",
  revenue:
    "You are a revenue analyst for PhoziFlow. Identify growth opportunities, risks and cost savings. Use bullet points.",
  research:
    "You are a research assistant for PhoziFlow. Research routes, competitors, grants and industry topics. Summarise findings clearly with bullet points and note where verification is needed.",
};

const Input = z.object({
  feature: z.string().min(1),
  prompt: z.string().min(1).max(4000),
});

export const generateAssistantResponse = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const system = SYSTEM_PROMPTS[data.feature] ?? SYSTEM_PROMPTS.business;
    const gateway = createLovableAiGatewayProvider(key);

    try {
      const { text } = await generateText({
        model: gateway("google/gemini-2.5-flash"),
        system,
        prompt: data.prompt,
      });
      return { text };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("429")) {
        throw new Error("Rate limit reached. Please try again in a moment.");
      }
      if (message.includes("402")) {
        throw new Error("AI credits exhausted. Please add credits in your workspace billing.");
      }
      throw new Error("AI generation failed. Please try again.");
    }
  });
