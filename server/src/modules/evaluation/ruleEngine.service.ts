import { ParsedResult } from "./parser.service";

type RuleResult = {
  score: number;
  issues: string[];
};

export class RuleEngineService {
  async evaluate(parsed: ParsedResult): Promise<RuleResult> {
    let score = 100;
    const issues: string[] = [];

    const components = parsed.components;

    const required = ["load_balancer", "database"];

    for (const comp of required) {
      if (!components.includes(comp)) {
        score -= 20;
        issues.push(`Missing required component: ${comp}`);
      }
    }

    if (!components.includes("cache")) {
      score -= 10;
      issues.push("No caching strategy mentioned");
    }

    if (!components.includes("queue")) {
      score -= 10;
      issues.push("No async processing / queue mentioned");
    }

    if (components.includes("cdn")) {
      score += 5;
    }

    if (components.includes("microservices")) {
      score += 5;
    }

    score = Math.max(0, Math.min(100, score));

    return {
      score,
      issues,
    };
  }
}