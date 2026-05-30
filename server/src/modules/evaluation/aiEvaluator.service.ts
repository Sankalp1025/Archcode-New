import axios from "axios";

export type EvaluationResult = {
  score: number;
  feedback: string;
};

function safeParseAIResponse(text: string): EvaluationResult {
  try {
    const parsed = JSON.parse(text);

    if (
      typeof parsed.score === "number" &&
      typeof parsed.feedback === "string"
    ) {
      return parsed;
    }

    throw new Error("Invalid structure");
  } catch (err) {
    console.error("AI response parsing failed:", text);

    return {
      score: 50,
      feedback: "Invalid AI response format. Default evaluation applied.",
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
      console.log("AI URL:", process.env.AI_API_URL);                      // For Debugging.
      const response = await axios.post(
        process.env.AI_API_URL as string,
        {
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
          },
        }
      );

      const aiText =
        response.data?.choices?.[0]?.message?.content ||
        response.data?.response ||
        "";

      if (!aiText) {
        throw new Error("Empty AI response");
      }

      const parsed = safeParseAIResponse(aiText);

      return parsed;
    } catch (error) {
      console.error("AI evaluation failed:", error);

      return {
        score: 50,
        feedback: "AI evaluation failed. Please try again later.",
      };
    }
  }
}