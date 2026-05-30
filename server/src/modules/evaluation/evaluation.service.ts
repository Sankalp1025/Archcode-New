import { RuleEngineService } from "./ruleEngine.service";
import { AiEvaluatorService, EvaluationResult } from "./aiEvaluator.service";
import { ScoringService } from "./scoring.service";
import { FeedbackService } from "./feedback.service";
import { ParserService, ParsedResult } from "./parser.service";

type AiResultNormalized = {
  strengths: string[];
  weaknesses: string[];
  feedback: string;
};

export class EvaluationService {
  private ruleEngine = new RuleEngineService();
  private aiEvaluator = new AiEvaluatorService();
  private scoring = new ScoringService();
  private feedback = new FeedbackService();
  private parser = new ParserService();

  async evaluate(submission: { answer: string }) {
    try {
      const parsed: ParsedResult = await this.parser.parse(submission.answer);

      const ruleResult = await this.ruleEngine.evaluate(parsed);

      let aiResult: EvaluationResult | null = null;

      try {
        aiResult = await this.aiEvaluator.evaluate(submission.answer);
      } catch (err) {
        console.error("AI evaluation failed:", err);
        aiResult = null;
      }

      const safeAiResult = this.normalizeAiResult(aiResult);

      const finalScore = this.scoring.compute(ruleResult, aiResult);

      const finalFeedback = this.feedback.generate(ruleResult, safeAiResult);

      return {
        score: finalScore,
        feedback: finalFeedback,
      };

    } catch (error) {
      console.error("Evaluation pipeline failed:", error);

      return {
        score: 0,
        feedback: "Evaluation failed. Please try again.",
      };
    }
  }

  private normalizeAiResult(aiResult: EvaluationResult | null): AiResultNormalized {
    if (!aiResult) {
      return {
        strengths: [],
        weaknesses: [],
        feedback: "AI unavailable",
      };
    }

    return {
      strengths: [],
      weaknesses: [],
      feedback: aiResult.feedback || "",
    };
  }
}