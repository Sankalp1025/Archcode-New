type RuleResult = {
  issues: string[];
};

type AiResult = {
  strengths: string[];
  weaknesses: string[];
  feedback: string;
} | null;

export class FeedbackService {
  generate(ruleResult: RuleResult, aiResult: AiResult): string {
    let output = "";

    if (aiResult?.strengths?.length) {
      output += "Strengths:\n";
      for (const s of aiResult.strengths) {
        output += `- ${s}\n`;
      }
      output += "\n";
    }

    if (ruleResult.issues?.length) {
      output += "Issues:\n";
      for (const issue of ruleResult.issues) {
        output += `- ${issue}\n`;
      }
      output += "\n";
    }

    if (aiResult?.weaknesses?.length) {
      output += "Weaknesses:\n";
      for (const w of aiResult.weaknesses) {
        output += `- ${w}\n`;
      }
      output += "\n";
    }

    if (aiResult?.feedback) {
      output += "Final Feedback:\n";
      output += aiResult.feedback;
    } else {
      output += "Final Feedback:\nBasic evaluation completed. Add more details for deeper insights.";
    }

    return output.trim();
  }
}