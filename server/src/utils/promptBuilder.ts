export const buildEvaluationPrompt = (userAnswer: string) => {
  return `
You are a Professional level system design interviewer.

Evaluate the following system design answer.

Return ONLY valid JSON in this format:
{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[],
  "missingComponents": string[],
  "followUpQuestions": string[]
}

User Answer:
${userAnswer}
`;
};