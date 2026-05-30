import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 250, y: 50 },
    data: { label: "API Gateway" },
    type: "infra",
  },
  {
    id: "2",
    position: { x: 100, y: 250 },
    data: { label: "Redis Queue" },
    type: "infra",
  },
  {
    id: "3",
    position: { x: 400, y: 250 },
    data: { label: "Worker Cluster" },
    type: "infra",
  },
  {
    id: "4",
    position: { x: 250, y: 450 },
    data: { label: "AI Evaluation Engine" },
    type: "infra",
  },
];

export const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
  },
];