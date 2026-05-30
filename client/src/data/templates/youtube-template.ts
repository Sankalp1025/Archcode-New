export const youtubeTemplate = {
  nodes: [
    {
      id: "gateway",
      position: { x: 450, y: 50 },

      data: {
        label: "Video Gateway",
        variant: "Gateway",
      },

      type: "infra",
    },

    {
      id: "upload",
      position: { x: 250, y: 250 },

      data: {
        label: "Upload Service",
        variant: "Microservice",
      },

      type: "infra",
    },

    {
      id: "transcoder",
      position: { x: 650, y: 250 },

      data: {
        label: "Transcoder",
        variant: "Worker",
      },

      type: "infra",
    },

    {
      id: "storage",
      position: { x: 250, y: 500 },

      data: {
        label: "Blob Storage",
        variant: "Database",
      },

      type: "infra",
    },

    {
      id: "cache",
      position: { x: 650, y: 500 },

      data: {
        label: "Edge Cache",
        variant: "Cache",
      },

      type: "infra",
    },
  ],

  edges: [
    {
      id: "e1",
      source: "gateway",
      target: "upload",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e2",
      source: "gateway",
      target: "transcoder",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e3",
      source: "upload",
      target: "storage",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },

    {
      id: "e4",
      source: "transcoder",
      target: "cache",
      animated: true,

      style: {
        stroke: "#38bdf8",
        strokeWidth: 2,
      },
    },
  ],
};