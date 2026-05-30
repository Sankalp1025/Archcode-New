export interface AnalysisItem {
  id: string;
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
}

export interface ArchitectureAnalysis {
  score: number;
  summary: string;
  strengths: string[];
  issues: AnalysisItem[];
}

export const mockAnalysis: ArchitectureAnalysis = {
  score: 78,

  summary:
    "Your architecture demonstrates a strong foundational separation of concerns, but there are potential scalability and reliability bottlenecks that should be addressed before production deployment.",

  strengths: [
    "Good separation between frontend and backend services",
    "API Gateway centralizes request handling",
    "Database abstraction improves maintainability",
    "Load balancer improves horizontal scalability",
  ],

  issues: [
    {
      id: "1",
      title: "Single Database Bottleneck",
      severity: "high",
      description:
        "All write-heavy services depend on a single primary database instance.",
      recommendation:
        "Introduce read replicas, sharding, or database partitioning strategies.",
    },
    {
      id: "2",
      title: "Missing Caching Layer",
      severity: "medium",
      description:
        "Frequent requests directly hit backend services and database layers.",
      recommendation:
        "Add Redis caching for frequently accessed resources.",
    },
    {
      id: "3",
      title: "No Queue-Based Async Processing",
      severity: "medium",
      description:
        "Long-running operations may block request-response cycles.",
      recommendation:
        "Introduce BullMQ or Kafka for asynchronous task processing.",
    },
  ],
};