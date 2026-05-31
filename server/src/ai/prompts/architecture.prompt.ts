export function buildArchitecturePrompt(
  problemTitle: string,
  architectureDescription: string,
  architectureJson: string
): string {
  return `
You are a senior system design interviewer.

Problem:
${problemTitle}

Candidate Architecture:
${architectureDescription}

Architecture JSON:
${architectureJson}

Evaluate the architecture.

Return ONLY valid JSON.

Expected JSON format:

{
  "score": integer between 0 and 100,

  "strengths": [
    "string"
  ],
  "weaknesses": [
    "string"
  ],
  "recommendations": [
    "string"
  ],
  "feedback": "string"
}

IMPORTANT: The "score" field must be an integer between 0 and 100. Do not use 0-10 scale.
Do not include markdown.
Do not include explanations outside JSON.
Do not wrap response in code blocks.
`;
}