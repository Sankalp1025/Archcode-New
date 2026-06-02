import { RuleEngineService } from "./ruleEngine.service";
import { AiEvaluatorService, EvaluationResult } from "./aiEvaluator.service";
import { ScoringService } from "./scoring.service";
import { FeedbackService } from "./feedback.service";
import { ParserService, ParsedResult } from "./parser.service";
import { PatternDetectionService } from "./patternDetection.service";
import { ArchitectureLinterService } from "./architecture-linter.service";
import { LintIssue } from "./lint-types";

type AiResultNormalized = {
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  feedback: string;
};

export class EvaluationService {
  private ruleEngine = new RuleEngineService();
  private aiEvaluator = new AiEvaluatorService();
  private scoring = new ScoringService();
  private feedback = new FeedbackService();
  private parser = new ParserService();
  private patternDetection = new PatternDetectionService();
  private architectureLinter = new ArchitectureLinterService();

  async evaluate(submission: { answer: string; }) {
    try {
      const parsed: ParsedResult = await this.parser.parse(submission.answer);

     let detectedPatterns: string[] = [];
     let lintIssues: LintIssue[] = [];

      try {
       const architecture = JSON.parse(submission.answer);

        detectedPatterns = this.patternDetection.detect(
         architecture.nodes || [],
         architecture.edges || []
        );

      lintIssues = this.architectureLinter.lint(
       architecture.nodes || [],
       architecture.edges || []
      );
    } catch {
     detectedPatterns = [];
     lintIssues = [];
    }

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
        score:aiResult ? aiResult.score : finalScore,
        feedback: aiResult ? aiResult.feedback : finalFeedback,
        strengths: safeAiResult.strengths,
        weaknesses: safeAiResult.weaknesses,
        recommendations: aiResult ? aiResult.recommendations || [] : [],
        detectedPatterns,
        lintIssues,
      };

    } catch (error) {
      console.error("Evaluation pipeline failed:", error);

      return {
        score: 0,
        feedback: "Evaluation failed. Please try again.",
        strengths: [],
        weaknesses: [],
        recommendations: [],
        detectedPatterns: [],
        lintIssues: [],
      };
    }
  }

  private normalizeAiResult(aiResult: EvaluationResult | null): AiResultNormalized {
    if (!aiResult) {
      return {
        strengths: [],
        weaknesses: [],
        recommendations: [],
        feedback: "AI unavailable", 
      };
    }

    return {
     strengths: aiResult.strengths || [],
     weaknesses: aiResult.weaknesses || [],
     recommendations: aiResult.recommendations || [],
     feedback: aiResult.feedback || "",
    };
  }
}