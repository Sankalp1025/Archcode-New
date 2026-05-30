export function buildArchitecturePrompt(
  problemTitle: string,
  architectureDescription: string
): string {
  return `
You are a senior system design interviewer.

Problem:
${problemTitle}

Candidate Architecture:
${architectureDescription}

Evaluate the architecture.

Return ONLY valid JSON.

Expected JSON format:

{
  "score": number,
  "strengths": string[],
  "weaknesses": string[],
  "recommendations": string[],
  "feedback": string
}

Do not include markdown.
Do not include explanations outside JSON.
Do not wrap response in code blocks.
`;
}