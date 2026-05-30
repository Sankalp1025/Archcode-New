type RuleResult = {
  score: number;
};

type AiResult = {
  score: number;
} | null;

export class ScoringService {
  compute(ruleResult: RuleResult, aiResult: AiResult): number {
    const ruleScore = ruleResult.score;

    if (!aiResult) {
      return ruleScore;
    }

    const aiScore = aiResult.score;

    const finalScore = 0.7 * ruleScore + 0.3 * aiScore;

    return Math.round(finalScore);
  }
}