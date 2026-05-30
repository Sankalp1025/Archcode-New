export const netflixTemplate = {
  nodes: [
    {
      id: "cdn",
      position: { x: 450, y: 50 },

      data: {
        label: "CDN",
        variant: "Gateway",
      },

      type: "infra",
    },

    {
      id: "api",
      position: { x: 250, y: 250 },

      data: {
        label: "API Service",
        variant: "Microservice",
      },

      type: "infra",
    },

    {
      id: "recommendation",
      position: { x: 650, y: 250 },

      data: {
        label: "Recommendation Engine",
        variant: "Worker",
      },

      type: "infra",
    },

    {
      id: "cache",
      position: { x: 250, y: 500 },

      data: {
        label: "Redis Cache",
        variant: "Cache",
      },

      type: "infra",
    },

    {
      id: "db",
      position: { x: 650, y: 500 },

      data: {
        label: "User Database",
        variant: "Database",
      },

      type: "infra",
    },
  ],

  edges: [
    {
      id: "e1",
      source: "cdn",
      target: "api",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e2",
      source: "cdn",
      target: "recommendation",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e3",
      source: "api",
      target: "cache",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e4",
      source: "recommendation",
      target: "db",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },
  ],
};