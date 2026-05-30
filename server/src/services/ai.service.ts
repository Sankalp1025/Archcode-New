import OpenAI from "openai";
import { buildEvaluationPrompt } from "../utils/promptBuilder";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateDesign = async (userAnswer: string) => {
  try {

    // TRY REAL AI FIRST - if it fails, catch the error and return a mock response
    const prompt = buildEvaluationPrompt(userAnswer);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a strict system design interviewer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const content = response.choices?.[0]?.message?.content || "";

    return JSON.parse(content);
  } catch (error) {
    console.log("Using MOCK AI instead");

    // MOCK RESPONSE - Returned when AI call fails
    return {
      score: 72,
      strengths: [
        "Good use of database",
        "Basic understanding of system design"
      ],
      weaknesses: [
        "No load balancer mentioned",
        "Scaling strategy missing"
      ],
      suggestions: [
        "Add caching layer (Redis)",
        "Use CDN for static content"
      ],
      missingComponents: [
        "Load Balancer",
        "Queue system",
        "Replication"
      ],
      followUpQuestions: [
        "How will you scale to 10M users?",
        "How will you handle database failures?"
      ]
    };
  }
};

export const analyzeDesign = async (
  problemId: string,
  userDesign: string
) => {

  return {
    score: 8,
    feedback: {
      strengths: ["Good use of caching"],
      weaknesses: ["No rate limiting"],
      missingComponents: ["Load balancer"],
      scalabilityIssues: ["Single DB instance"],
      suggestions: ["Use sharding"],
    },
  };
};