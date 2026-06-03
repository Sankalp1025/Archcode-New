import { Edge, Node } from "@xyflow/react";

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
    nodes: Node[],
    edges: Edge[]
   ) => boolean;

  analyze: (
    nodes: Node[],
    edges: Edge[]
   ) => RuleResult;
}