import { LintIssue } from "./lint-types";

export class ArchitectureLinterService {
    
  lint(nodes: any[], edges: any[]): LintIssue[] {
    const issues: LintIssue[] = [];

    const getVariant = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);

  return node?.data?.variant || node?.data?.label;
};

   const getConnectedMicroservices = (databaseId: string) => {
    return edges.filter((edge) => {
    return (
      (edge.target === databaseId &&
        getVariant(edge.source) === "Microservice") ||

      (edge.source === databaseId &&
        getVariant(edge.target) === "Microservice")
    );
  });
};

    // Rule 1: Direct Database Access
    const hasDirectDatabaseAccess = edges.some((edge) => {
      return (
        getVariant(edge.source) === "Gateway" &&
        getVariant(edge.target) === "Database"
      );
    });

    if (hasDirectDatabaseAccess) {
      issues.push({
        ruleId: "DIRECT_DATABASE_ACCESS",
        title: "Direct Database Access",
        severity: "HIGH",
        description:
          "Gateway directly communicates with the database.",
        recommendation:
          "Introduce an API or service layer between the Gateway and database.",
      });
    }

    // Rule 2: Missing Authentication
    const hasGateway = nodes.some(
     (node) =>
     node.data?.variant === "Gateway" ||
     node.data?.label === "Gateway"
    );

    const hasAuth = nodes.some(
     (node) =>
     node.data?.variant === "Auth" ||
     node.data?.label === "Auth"
    );

    if (hasGateway && !hasAuth) {
      issues.push({
        ruleId: "MISSING_AUTHENTICATION",
        title: "Missing Authentication",
        severity: "HIGH",
        description:
          "Gateway exists but no authentication service is present.",
        recommendation:
          "Add an authentication service for identity and access management.",
        });
    }

    // Rule 3: Missing Cache
    const hasDatabase = nodes.some(
     (node) =>
     node.data?.variant === "Database" ||
     node.data?.label === "Database"
    );

    const hasCache = nodes.some(
     (node) =>
     node.data?.variant === "Cache" ||
     node.data?.label === "Cache"
    );

    if (hasDatabase && !hasCache) {
      issues.push({
        ruleId: "MISSING_CACHE",
        title: "Missing Cache",
        severity: "MEDIUM",
        description:
          "Database is present without a caching layer.",
        recommendation:
          "Introduce Redis or another cache to reduce database load.",
      });
    }

    // Rule 4: Missing Async Processing
    const hasMicroservice = nodes.some(
     (node) =>
     node.data?.variant === "Microservice" ||
     node.data?.label === "Microservice"
    );

    const hasWorker = nodes.some(
     (node) =>
     node.data?.variant === "Worker" ||
     node.data?.label === "Worker"
    );

    if (hasMicroservice && !hasWorker) {
      issues.push({
        ruleId: "MISSING_ASYNC_PROCESSING",
        title: "Missing Async Processing",
        severity: "MEDIUM",
        description:
          "Microservices are present but no worker/async processing layer exists.",
        recommendation:
          "Add background workers for long-running operations.",
        });
    }

    // Rule 5: Shared Database Anti-pattern
    nodes.forEach((node) => {
     if (getVariant(node.id) !== "Database") return;

     const incomingMicroservices =
     getConnectedMicroservices(node.id);

    if (incomingMicroservices.length >= 2) {
     issues.push({
      ruleId: "SHARED_DATABASE",
      title: "Shared Database Anti-pattern",
      severity: "HIGH",
      description:
        "Multiple microservices share the same database.",
      recommendation:
        "Consider service-owned databases to reduce coupling.",
    });
  }
});

    // Rule 6: Single Point of Failure
    const microserviceCount = nodes.filter(
     (node) =>
     node.data?.variant === "Microservice" ||
     node.data?.label === "Microservice"
    ).length;

    const databaseCount = nodes.filter(
     (node) =>
     node.data?.variant === "Database" ||
     node.data?.label === "Database"
    ).length;

    const databaseNodes = nodes.filter(
     (node) => getVariant(node.id) === "Database"
    );

    databaseNodes.forEach((database) => {
     const incomingMicroservices =
     getConnectedMicroservices(database.id);

    if (
     databaseCount === 1 &&
     microserviceCount >= 2
    ) {
     issues.push({
      ruleId: "SINGLE_POINT_OF_FAILURE",
      title: "Single Point of Failure",
      severity: "MEDIUM",
      description:
       "Multiple services depend on a single database instance.",
      recommendation:
       "Introduce replication or failover strategy."
    });
}
});

    // Rule 7: Orphaned Services
    nodes.forEach((node) => {
     if (getVariant(node.id) !== "Microservice") return;

     const connected = edges.some(
      (edge) =>
       edge.source === node.id ||
       edge.target === node.id
    );

    if (!connected) {
     issues.push({
      ruleId: "ORPHANED_SERVICE",
      title: "Orphaned Service",
      severity: "MEDIUM",
      description:
        "Microservice is not connected to any component.",
      recommendation:
        "Connect the service to the system flow.",
    });
  }
});

    // Rule 8: Missing API Gateway
    if (microserviceCount > 0 && !hasGateway) {
     issues.push({
      ruleId: "MISSING_GATEWAY",
      title: "Missing API Gateway",
      severity: "MEDIUM",
      description:
       "Microservices exist without an API Gateway.",
      recommendation:
       "Introduce an API Gateway for routing and cross-cutting concerns.",
    });
}
    return issues;
  }
}