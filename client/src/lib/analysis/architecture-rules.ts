import { Edge, Node } from "@xyflow/react";
import { runPatternEngine }from "../pattern-engine/engine";
import { PatternResult } from "../pattern-engine/types";

export function analyzeArchitecture(
  nodes: Node[],
  edges: Edge[]
): PatternResult {

  return runPatternEngine(
    nodes,
    edges
  );
}