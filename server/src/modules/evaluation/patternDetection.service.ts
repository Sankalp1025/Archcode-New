export class PatternDetectionService {
  detect(nodes: any[], edges: any[]) {
    
  const detectedPatterns: string[] = [];

    const getVariant = (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);

      return node?.data?.variant || node?.data?.label;
    };

    // API Gateway Pattern
    const hasGatewayToMicroservice = edges.some((edge) => {
      return (
        getVariant(edge.source) === "Gateway" &&
        getVariant(edge.target) === "Microservice"
      );
    });

    if (hasGatewayToMicroservice) {
      detectedPatterns.push("API Gateway Pattern");
    }

    // Cache-Aside Pattern
    const hasCacheToDatabase = edges.some((edge) => {
      return (
        getVariant(edge.source) === "Cache" &&
        getVariant(edge.target) === "Database"
      );
    });

    if (hasCacheToDatabase) {
      detectedPatterns.push("Cache-Aside Pattern");
    }

    // Centralized Authentication Pattern
    const hasGatewayToAuth = edges.some((edge) => {
      return (
        getVariant(edge.source) === "Gateway" &&
        getVariant(edge.target) === "Auth"
      );
    });

    if (hasGatewayToAuth) {
      detectedPatterns.push("Centralized Authentication Pattern");
    }

    // Async Processing Pattern
    const hasWorker = nodes.some(
      (node) => node.data?.variant === "Worker" || 
            node.data?.label === "Worker"
    );

    if (hasWorker) {
      detectedPatterns.push("Async Processing Pattern");
    }

    // Microservices Pattern
    const microserviceCount = nodes.filter(
      (node) => node.data?.variant === "Microservice" || 
            node.data?.label === "Microservice"
    ).length;

    if (microserviceCount >= 2) {
      detectedPatterns.push("Microservices Pattern");
    }   

    return detectedPatterns;
  }
}
