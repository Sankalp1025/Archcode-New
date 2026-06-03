import { PatternRule } from "./types";

export const rules: PatternRule[] = [

  //  CDN Detection
  {
    id: "cdn-detection",
    name: "CDN Detection",

    check: (nodes) => {

      return nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("cdn")
      );
    },

    analyze: () => ({
      scoreDelta: 12,

      strengths: [
        "CDN detected for low-latency global content delivery.",
      ],
      summary: "CDN layer detected.",

      suggestions: [
        "Consider optimizing CDN configuration for better performance."
      ],

      issues: [],
    }),
  },

  //  Redis-Cache Detection
  {
    id: "redis-cache",
    name: "Redis Cache",

    check: (nodes) => {

      return nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("redis")
      );
    },

    analyze: () => ({
      scoreDelta: 10,

      strengths: [
        "Redis cache improves read scalability and latency.",
      ],

      summary: "Redis caching layer detected.",

      suggestions: ["Consider configuring Redis for optimal performance."],

      issues: [],
    }),
  },

  //  Worker Detection
  {
    id: "worker-system",
    name: "Worker System",

    check: (nodes) => {

      return nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("worker")
      );
    },

    analyze: () => ({
      scoreDelta: 10,

      strengths: [
        "Asynchronous worker system detected.",
      ],

      summary: "Worker system detected.",

      suggestions: ["Consider optimizing worker orchestration and monitoring."],

      issues: [],
    }),
  },

  //  Missing Cache Rule
  {
    id: "missing-cache",
    name: "Missing Cache",

    check: (nodes) => {

      const hasDatabase = nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("database")
      );

      const hasCache = nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("cache")
      );
      return hasDatabase && !hasCache;
    },

    analyze: () => ({
      scoreDelta: -15,

      strengths: ["Database layer leads to strong data management capabilities."],

      issues: [
        "No caching layer detected, which may lead to performance bottlenecks as the system scales.",
      ],

      suggestions: [
        "Consider adding Redis or distributed caching.",
      ],

      summary: "No caching layer detected.",
    }),
  },

  //  Missing Gateway Rule
  {
    id: "missing-gateway",
    name: "Missing Gateway",

    check: (nodes) => {

      const hasGateway = nodes.some(
        (node) =>
         (node.data?.label as string).toLowerCase().includes("gateway")
      );
      return (!hasGateway && nodes.length >= 3);
    },

    analyze: () => ({
      scoreDelta: -10,

      strengths: ["Multiple services detected, which is a good foundation for modular architecture."],

      issues:[
        "No API gateway detected.",
      ],

      suggestions:[
        "Consider adding centralized routing and auth gateway.",
      ],
      summary: "No API gateway detected.",
    }),
  },
];