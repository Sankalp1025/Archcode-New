import {
  parseAnswer,
  scoreAnswer,
  generateFeedback,
  detectWeakness,
} from "../modules/evaluation/evaluation.service";

export const evaluationPipeline = {
  async run(answer: string) {
    const parsed = await parseAnswer(answer);

    const score = await scoreAnswer(parsed);

    const feedback = await generateFeedback(parsed);

    const weaknesses = await detectWeakness(parsed);

    return {
      score,
      feedback,
      weaknesses,
    };
  },
};