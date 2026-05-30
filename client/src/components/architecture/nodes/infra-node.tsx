import { Handle, Position } from "@xyflow/react";

import {
  Database,
  Server,
  ShieldCheck,
  Cpu,
  Layers3,
  Workflow,
} from "lucide-react";

interface InfraNodeProps {
  data: {
    label: string;
    variant?: string;
  };
}

const nodeConfig = {
  Database: {
    icon: Database,
    glow: "shadow-cyan-500/30",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },

  Cache: {
    icon: Layers3,
    glow: "shadow-emerald-500/30",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },

  Microservice: {
    icon: Cpu,
    glow: "shadow-violet-500/30",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },

  Gateway: {
    icon: Workflow,
    glow: "shadow-orange-500/30",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },

  Auth: {
    icon: ShieldCheck,
    glow: "shadow-pink-500/30",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    iconColor: "text-pink-400",
  },

  Worker: {
    icon: Server,
    glow: "shadow-blue-500/30",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
};

export function InfraNode({ data }: InfraNodeProps) {
  const config = nodeConfig[(data.variant || data.label) as keyof typeof nodeConfig];

  const Icon = config?.icon || Server;

  return (
    <div
      className={`
        min-w-[220px]
        rounded-2xl
        border
        ${config?.border}
        ${config?.bg}
        ${config?.glow}
        p-5
        shadow-2xl
        backdrop-blur-xl
        transition-all
        duration-300
        hover:scale-105
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="h-3 w-3 border-2 border-white bg-sky-400"
      />

      <div className="flex items-start gap-4">
        <div
          className={`
            rounded-xl
            bg-black/30
            p-3
            ${config?.iconColor}
          `}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {data.label}
          </h3>

          <p className="mt-1 text-sm text-slate-300">
            Distributed infrastructure component
          </p>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="h-3 w-3 border-2 border-white bg-sky-400"
      />
    </div>
  );
}