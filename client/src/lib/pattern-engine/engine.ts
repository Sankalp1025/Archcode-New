import { rules } from "./rules";
import { analyzeTopology } from "./topology";
import { PatternResult, RuleResult} from "./types";

export const runPatternEngine = (
  nodes: any[],
  edges: any[]
) => {

    if (nodes.length === 0) {

     return {
       score: 0,

    summary:
      "No architecture detected yet.",

    strengths: [],

    suggestions: [
      "Start building your architecture using infrastructure nodes."
    ],

    issues: [],
  };
}

  let score = 70;

  const strengths: string[] = [];
  const issues: string[] = [];
  const suggestions: string[] = [];

  for(const rule of rules) {

    if(rule.check(nodes, edges)) {

      const result: RuleResult = rule.analyze(nodes, edges);

      score += result.scoreDelta;

      strengths.push(
       ...(result.strengths || [])
      );

      issues.push(
       ...(result.issues || [])
      );

      suggestions.push(
       ...(result.suggestions || [])
      );
    }
  }

  const topologyResult =
  analyzeTopology(nodes, edges);

score += topologyResult.scoreDelta;

strengths.push(
 ...topologyResult.strengths
);

issues.push(
 ...topologyResult.issues
);

suggestions.push(
 ...topologyResult.suggestions
);

  score = Math.max(0, Math.min(score, 100)
  );

  return {
   score,

   summary:
    issues.length === 0
      ? "Architecture looks scalable and well-structured."
      : `Detected ${issues.length} architectural issue(s) requiring attention.`,

   strengths,
   suggestions,
   issues,
};
};