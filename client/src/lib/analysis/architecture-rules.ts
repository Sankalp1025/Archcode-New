import { runPatternEngine }
from "../pattern-engine/engine";

import { PatternResult } from "../pattern-engine/types";

export function analyzeArchitecture(
  nodes: any[],
  edges: any[]
): PatternResult {

  return runPatternEngine(
    nodes,
    edges
  );
}