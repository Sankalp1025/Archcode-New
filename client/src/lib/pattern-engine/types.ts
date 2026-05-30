export interface RuleResult {

    scoreDelta: number;
    strengths?: string[];
    issues?: string[];
    suggestions?: string[];
    summary: string;
}

export interface PatternResult {

  score: number;
  strengths?: string[];
  issues?: string[];
  suggestions?: string[];
  summary: string;
}

export interface PatternRule {

  id: string;
  name: string;

  check: (
    nodes: any[],
    edges: any[]
   ) => boolean;

  analyze: (
    nodes: any[],
    edges: any[]
   ) => RuleResult;
}