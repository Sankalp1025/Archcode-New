import { Edge, Node } from "@xyflow/react";

export const analyzeTopology = (
  nodes: Node[],
  edges: Edge[]
) => {

  let scoreDelta = 0;

  const strengths: string[] = [];
  const issues: string[] = [];
  const suggestions: string[] = [];

  // Connected nodes

  const connectedNodeIds =
    new Set<string>();

  edges.forEach((edge) => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  // Isolated nodes

  const isolatedNodes = nodes.filter(
    (node) =>
     !connectedNodeIds.has(node.id)
  );

  if (isolatedNodes.length > 0) {

    scoreDelta -=
     isolatedNodes.length * 10;

    issues.push(
     `${isolatedNodes.length} isolated infrastructure nodes detected.`
    );

    suggestions.push(
      "Connect isolated services to architecture flow."
    );
  }

  // Cache without connections
  const cacheNodes = nodes.filter(
    (node) =>
     node.data?.variant === "Cache"
  );

  cacheNodes.forEach((cache) => {

    const connected = edges.some(
      (edge) =>
        edge.source === cache.id ||
        edge.target === cache.id
    );

    if (!connected) {
      scoreDelta -= 8;

      issues.push(
        "Cache layer exists but is unused."
      );
      suggestions.push(
        "Connect cache layer to services or database."
      );
    }
  });

  // Gateway connected to DB
  const gatewayNodes = nodes.filter(
    (node) =>
     node.data?.variant === "Gateway"
  );

  const databaseNodes = nodes.filter(
    (node) =>
     node.data?.variant === "Database"
  );

  gatewayNodes.forEach((gateway) => {

    databaseNodes.forEach((database) => {

      const directConnection =
        edges.some(
          (edge) =>
            (
              edge.source === gateway.id &&
              edge.target === database.id
            )
             ||
            (
              edge.source === database.id &&
              edge.target === gateway.id
            )
        );

      if (directConnection) {
        scoreDelta -= 15;

        issues.push(
         "Gateway should not directly access database layer."
        );

        suggestions.push(
         "Introduce service layer between gateway and database."
        );
      }
    });
  });

  // Worker without async flow.
  const workerNodes = nodes.filter(
    (node) =>
     node.data?.variant === "Worker"
  );

  workerNodes.forEach((worker) => {

    const edgeCount = edges.filter(
      (edge) =>
        edge.source === worker.id ||
        edge.target === worker.id
    ).length;

    if (edgeCount <= 1) {
      scoreDelta -= 5;

      suggestions.push(
       "Worker service has weak async integration."
      );
    }
  });

  nodes.forEach((node) => {

    const connections = edges.filter(
      (edge) =>
        edge.source === node.id ||
        edge.target === node.id
    ).length;

    if (connections >= 5) {
      issues.push(
        `${node.data?.label} may become a bottleneck due to excessive dependencies.`
      );
      scoreDelta -= 5;
    }
  });

  if (
    nodes.length >= 5 &&
    edges.length >= 4
  ) {

    scoreDelta += 10;

    strengths.push(
      "Distributed architecture topology detected."
    );
  }

  return {
    scoreDelta,
    strengths,
    issues,
    suggestions,
  };
};