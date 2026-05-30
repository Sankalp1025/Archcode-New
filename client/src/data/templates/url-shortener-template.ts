export const urlShortenerTemplate = {
  nodes: [
    {
      id: "API Gateway",
      position: { x: 400, y: 50 },
      data: {
        label: "API Gateway",
        variant: "Gateway",
      },
      type: "infra",
    },

    {
      id: "Authentication Service",
      position: { x: 200, y: 250 },
      data: {
        label: "Authentication Service",
        variant: "Auth",
      },
      type: "infra",
    },

    {
      id: "Redis Cache",
      position: { x: 600, y: 250 },
      data: {
        label: "Redis Cache",
        variant: "Cache",
      },
      type: "infra",
    },

    {
      id: "PostgreSQL Database",
      position: { x: 400, y: 450 },
      data: {
        label: "PostgreSQL Database",
        variant: "Database",
      },
      type: "infra",
    },

    {
        id: "Worker Service",
        position: { x: 850, y: 450 },
        data: {
            label: "Worker Service",
            variant: "Worker",
        },
        type: "infra",
    }
  ],

  edges: [
    {
      id: "e1",
      source: "API Gateway",
      target: "Authentication Service",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e2",
      source: "API Gateway",
      target: "Redis Cache",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e3",
      source: "Authentication Service",
      target: "PostgreSQL Database",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e4",
      source: "Redis Cache",
      target: "PostgreSQL Database",
      animated: true,
      
      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e5",
      source: "Authentication Service",
      target: "Worker Service",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      }
    }
  ],
};