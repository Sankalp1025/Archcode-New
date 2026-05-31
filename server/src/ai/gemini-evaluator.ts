import { gemini } from "./gemini.client";
import { buildArchitecturePrompt } from "./prompts/architecture.prompt";

export async function evaluateArchitectureWithGemini(
  problemTitle: string,
  problemDescription: string,
  architectureJson: string
) {
  const prompt = buildArchitecturePrompt(
    problemTitle,
    problemDescription,
    architectureJson
  );

  const response = await gemini.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
}