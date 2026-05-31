import { evaluateArchitectureWithGemini } from "../../ai/gemini-evaluator";

export type EvaluationResult = {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  feedback: string;
};

function safeParseAIResponse(text: string): EvaluationResult {
  try {
    const parsed = JSON.parse(text);

    if (
      typeof parsed.score === "number" &&
      typeof parsed.feedback === "string" &&
      Array.isArray(parsed.strengths) &&
      Array.isArray(parsed.weaknesses) &&
      Array.isArray(parsed.recommendations)
    ) {
      return parsed;
    }

    throw new Error("Invalid structure");
  } catch (err) {
    console.error("AI response parsing failed:", text);

    return {
      score: 50,
      feedback: "Invalid AI response format. Default evaluation applied.",
      strengths: [],
      weaknesses: [],
      recommendations: []
    };
  }
}

export class AiEvaluatorService {
  async evaluate(answer: string): Promise<EvaluationResult> {
    try {
      const prompt = `
You are an expert system design evaluator.

Evaluate the following answer.

Return ONLY valid JSON. Do NOT include markdown, explanations, or extra text.

Format:
{
  "score": number (0-100),
  "feedback": string
}

Answer:
${answer}
`;
      const aiText = await evaluateArchitectureWithGemini(
       "System Design Problem",
       "Evaluate architecture submission",
       answer
    );

    const parsed = safeParseAIResponse(aiText);

return parsed;
    } catch (error) {
      console.error("AI evaluation failed:", error);

      return {
        score: 50,
        feedback: "AI evaluation failed. Please try again later.",
        strengths: [],
        weaknesses: [],
        recommendations: []
      };
    }
  }
}