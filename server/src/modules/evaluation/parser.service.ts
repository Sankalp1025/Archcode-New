export type ParsedResult = {
  components: string[];
  rawText: string;
};

export class ParserService {
  async parse(answer: string): Promise<ParsedResult> {
    const text = answer.toLowerCase();

    const components: string[] = [];

    if (text.includes("load balancer")) components.push("load_balancer");
    if (text.includes("cache") || text.includes("redis")) components.push("cache");
    if (text.includes("database") || text.includes("db")) components.push("database");
    if (text.includes("queue") || text.includes("kafka")) components.push("queue");
    if (text.includes("cdn")) components.push("cdn");
    if (text.includes("microservices")) components.push("microservices");

    return {
      components,
      rawText: answer,
    };
  }
}