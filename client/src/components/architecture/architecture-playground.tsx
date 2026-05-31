"use client";

// Ignore TypeScript missing declaration for CSS side-effect import
// @ts-ignore
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import { templates } from "../../data/templates/template-registry";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
  Connection,
  Edge,
} from "@xyflow/react";

import { initialEdges, initialNodes } from "./initial-elements";
import { nodeTypes } from "./node-types";
import { AIAnalysisPanel } from "../ai-analysis/ai-analysis-panel";
import { analyzeArchitecture } from "../../lib/analysis/architecture-rules";
import { PatternResult } from "../../lib/pattern-engine/types";
import { useSubmissionStream } from "../../hooks/useSubmissionStream";

export default function ArchitecturePlayground() {
 
  const [nodes, setNodes, onNodesChange] =
    useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initialEdges);

  const [submissionId, setSubmissionId] = useState(""); 

  const { status, score, feedback, strengths, weaknesses, recommendations }  = useSubmissionStream(submissionId);

  const [evaluationStatus, setEvaluationStatus] = useState("");

  // Analysis state
  const [analysis, setAnalysis] = useState<PatternResult>({
    score: 0,
    summary: "No architecture detected yet.",
    strengths: [],
    suggestions: [],
    issues: [],
  });
  
  // UI states
  const [saveMessage, setSaveMessage] = useState(false);

  const [showTemplates, setShowTemplates] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

   const onConnect = useCallback(
   (params: Connection) => {
     setEdges((eds) =>
       addEdge(
        {
          ...params,
          animated: true,
          style: {
            stroke: "#38bdf8",
            strokeWidth: 2,
          },
        },
        eds
       )
      );
      },
     [setEdges]
    );

    const addInfraNode = (label: string) => {
    const newNode = {
    id: crypto.randomUUID(),

    position: {
      x: Math.random() * 600,
      y: Math.random() * 600,
    },

    data: {
      label,
    },

    type: "infra",
    };

    setNodes((nds) => [...nds, newNode]);
    };

    const deleteSelectedElements = () => {
    const selectedNodeIds = new Set(
     nodes
      .filter((node) => node.selected)
      .map((node) => node.id)
  );

  setNodes((nds) =>
    nds.filter(
      (node) => !selectedNodeIds.has(node.id)
    )
  );

  setEdges((eds) =>
    eds.filter(
      (edge) =>
        !selectedNodeIds.has(edge.source) &&
        !selectedNodeIds.has(edge.target) &&
        !edge.selected
    )
  );
};

const saveArchitecture = () => {
  const flow = {
    nodes,
    edges,
  };

  localStorage.setItem(
    "archcode-flow",
    JSON.stringify(flow)
  );

  setSaveMessage(true);

  setTimeout(() => {
  setSaveMessage(false);
}, 2000);
};

const loadArchitecture = () => {
   const savedFlow = localStorage.getItem(
    "archcode-flow"
  );

  if (!savedFlow) return;

  const parsedFlow = JSON.parse(savedFlow);

   setNodes(parsedFlow.nodes || []);
   setEdges(parsedFlow.edges || []);
};

const exportToPNG = async () => {
  if (!reactFlowWrapper.current) return;

  try {
    const dataUrl = await toPng(
      reactFlowWrapper.current,
      {
        cacheBust: true,
      }
    );

    const link =
      document.createElement("a");

    link.download =
      "archcode-architecture.png";

    link.href = dataUrl;

    link.click();

  } catch (error) {
    console.error(
      "PNG export failed:",
      error
    );
  }
};

const loadTemplate = (
  template: {
    nodes: any[];
    edges: any[];
  }
) => {

  setNodes([]);
  setEdges([]);

  setTimeout(() => {

    setNodes(template.nodes);

    setEdges(template.edges);

    localStorage.setItem(
      "archcode-flow",
      JSON.stringify(template)
    );

  }, 50);
};

useEffect(() => {
  loadArchitecture();
}, []);

useEffect(() => {
  const handleKeyDown = (
    event: KeyboardEvent
  ) => {
    if (
      event.key === "Delete" ||
      event.key === "Backspace"
    ) {
      deleteSelectedElements();
    }
  };

  window.addEventListener(
    "keydown",
    handleKeyDown
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [nodes, edges]);

  const handleEvaluateArchitecture = async () => {

    try {

      setEvaluationStatus("QUEUED");
       const localAnalysis = analyzeArchitecture(nodes, edges);
       setAnalysis(localAnalysis);

      const response = await fetch(
        "http://localhost:5000/api/submissions/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            code: JSON.stringify({
            nodes,
            edges,
          }),
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setSubmissionId(data.submissionId);

    } catch (error) {

      console.error(
        "Architecture evaluation failed:",
        error
      );

      setEvaluationStatus("FAILED");
    }
  };

  useEffect(() => {

   if (!status) return;

   setEvaluationStatus(status);

  }, [status]);


  return (
    <section className="px-6 py-32">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 text-center">

          <h2 className="text-4xl font-bold md:text-5xl">
            Interactive Architecture Playground
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Design scalable distributed systems visually
            using draggable infrastructure components.
          </p>

        </div>

        {/* Playground */}
        <div
          className="
            flex
            h-[820px]
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#020617]
            pb-24
          "
        >

    <div className="flex-1 p-6">

      {saveMessage && (
       <div
        className="
          mb-6
          rounded-2xl
          border
          border-emerald-500/20
          bg-emerald-500/10
          px-4
          py-3
          text-sm
          text-emerald-300
          backdrop-blur-xl
        "
      >
        Architecture saved successfully!
      </div>
)}            

  {/* Toolbar */}         
  <div className="mb-8 flex flex-wrap gap-4">

  <button
    onClick={() => addInfraNode("Database")}
    className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      text-sm
      text-white
      backdrop-blur-xl
      transition
      hover:bg-white/10
    "
  >
    + Add Database
  </button>

  <button
    onClick={() => addInfraNode("Cache")}
    className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      text-sm
      text-white
      backdrop-blur-xl
      transition
      hover:bg-white/10
    "
  >
    + Add Cache
  </button>

  <button
    onClick={() => addInfraNode("Microservice")}
    className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      px-5
      py-3
      text-sm
      text-white
      backdrop-blur-xl
      transition
      hover:bg-white/10
    "
  >
    + Add Microservice
    </button>
    <button
  onClick={() => addInfraNode("Gateway")}
  className="
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-5
    py-3
    text-sm
    text-white
    backdrop-blur-xl
    transition
    hover:bg-white/10
  "
>
  + Add Gateway
</button>

<button
  onClick={() => addInfraNode("Auth")}
  className="
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-5
    py-3
    text-sm
    text-white
    backdrop-blur-xl
    transition
    hover:bg-white/10
  "
>
  + Add Auth
</button>

<button
  onClick={() => addInfraNode("Worker")}
  className="
    rounded-xl
    border
    border-white/10
    bg-white/5
    px-5
    py-3
    text-sm
    text-white
    backdrop-blur-xl
    transition
    hover:bg-white/10
  "
>
  + Add Worker
</button>

<button
  onClick={saveArchitecture}
  className="
    rounded-xl
    border
    border-emerald-500/20
    bg-emerald-500/10
    px-5
    py-3
    text-sm
    text-emerald-300
    backdrop-blur-xl
    transition
    hover:bg-emerald-500/20
  "
>
  Save Architecture
</button>

<button
  onClick={exportToPNG}
  className="
    rounded-xl
    border
    border-sky-500/20
    bg-sky-500/10
    px-5
    py-3
    text-sm
    text-sky-300
    backdrop-blur-xl
    transition
    hover:bg-sky-500/20
  "
>
  Export PNG
</button>

<div className="relative flex items-center gap-6">

  <button
    onClick={() =>
      setShowTemplates(
        !showTemplates
      )
    }
    className="
      rounded-xl
      border
      border-violet-500/20
      bg-violet-500/10
      px-5
      py-3
      text-sm
      text-violet-300
      backdrop-blur-xl
      transition
      hover:bg-violet-500/20
    "
  >
    Load Templates ▼
  </button>

  <button
  onClick={handleEvaluateArchitecture}
  className="
    rounded-xl
    border
    border-violet-400/30
    bg-gradient-to-r
    from-indigo-600
    via-violet-600
    to-cyan-600
    px-6
    py-3
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-violet-300/30
    transition-all
    duration-300
    hover:scale-105
    hover:shadow-xl
    hover:shadow-violet-300/40
    active:scale-95
  "
>
   Evaluate Architecture
</button>

  {showTemplates && (
    <div
      className="
        absolute
        left-0
        top-16
        z-50
        min-w-[220px]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#0f172a]
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {templates.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            loadTemplate(item.template);

            setShowTemplates(false);
          }}
          className="
            block
            w-full
            border-b
            border-white/5
            px-5
            py-4
            text-left
            text-sm
            text-slate-300
            transition
            hover:bg-white/5
          "
        >
          {item.name}

        </button>
      ))}
    </div>
  )}

</div>
  </div>

        <div
         ref={reactFlowWrapper}
          className="
           h-[650px]
           overflow-hidden
           rounded-3xl
          "
        >

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            defaultViewport={{ x: 0, y: 50, zoom: 0.9 }}
          >

            <Background color="#1e293b" gap={24} />

            <MiniMap/>

            <Controls/>

          </ReactFlow>

         </div> 

        </div>

          <AIAnalysisPanel
            analysis={analysis}
            evaluationStatus={evaluationStatus}
            score={score}
            feedback={feedback}
            strengths={strengths}
            weaknesses={weaknesses}
            recommendations={recommendations}
          />
              </div>
          </div>
      </section>
  );
}