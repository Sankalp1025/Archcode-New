import { BrainCircuit, ShieldAlert, Sparkles, TrendingUp, } from "lucide-react";
import { motion } from "framer-motion";
import { PatternResult } from "../../lib/pattern-engine/types";

interface AIAnalysisPanelProps {
   analysis: PatternResult;
   evaluationStatus: string;
   score: number | null;
   feedback: string;

   strengths: string[];
   weaknesses: string[];
   recommendations: string[];
   detectedPatterns: string[];
  }

export function AIAnalysisPanel({
  evaluationStatus,
  score,
  feedback,
  strengths,
  weaknesses,
  recommendations,
  detectedPatterns,
}: AIAnalysisPanelProps) {
  return (
    <div className="flex h-[820px] w-[380px] flex-col overflow-y-auto border-l border-zinc-800 bg-[#0B0B0F]">
      {/* Header */}
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-3 flex items-start gap-3">
          <div className="mt-0 rounded-xl bg-violet-500/20 p-2 text-violet-400">
            <BrainCircuit className="h-5 w-5" />
          </div>

          <div>
             <h2 className="text-lg font-semibold text-white">
               AI Architecture Review
             </h2>

             <p className="mt-2 text-sm text-sky-400">
               Status: {evaluationStatus || "IDLE"}
             </p>

             <p className="text-sm text-zinc-400">
               System Design Intelligence Engine
             </p>
           </div>
         </div>

        {/* Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">
                Architecture Score
              </p>

              <h1 className="mt-1 text-4xl font-bold text-white">
                {score}
                <span className="text-xl text-zinc-400">
                 /100
                </span>
              </h1>
            </div>

            <div className="rounded-full bg-violet-500/20 p-3 text-violet-400">
            <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary */}
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-400" />

          <h3 className="font-medium text-white">
            AI Summary
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-300">
          {feedback}
        </p>
      </div>

      {/* Strengths */}
      <div className="border-b border-zinc-800 p-5">
        <div className="mb-4 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4 text-emerald-400" />

          <h3 className="font-medium text-white">
            Strengths
          </h3>
        </div>

        <div className="space-y-3">
          {strengths?.map((strength: string) => (
            <div
              key={strength}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200"
              >
              {strength}
             </div>
           ))}
         </div>
      </div>

      {/* Detected Patterns */}
      <div className="rounded-xl border border-zinc-800 p-4">
        <h3 className="mb-3 text-base font-semibold text-white">
          Detected Architecture Patterns
        </h3>

  <div className="space-y-2">
    {detectedPatterns?.length > 0 ? (
      detectedPatterns.map((pattern: string) => (
        <div
          key={pattern}
          className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-3 py-2 text-sm text-violet-300"
        >
          {pattern}
        </div>
      ))
    ) : (
      <div className="text-sm text-zinc-400">
        No patterns detected yet
      </div>
    )}
  </div>
</div>

      {/* Suggestions */}
      <div className="border-b border-zinc-800 p-5">
        <h3 className="mb-4 font-medium text-white">
          Suggested Improvements
        </h3>

        <div className="space-y-3">
          {recommendations?.map(
            (suggestion: string, index: number) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                duration: 0.25,
                delay: index * 0.05,
                }}
                 className="
                 rounded-xl
                 border
                 border-sky-500/20
                 bg-sky-500/10
                 p-3
                 text-sm
                 text-sky-200
                "
              >
                {suggestion}
              </motion.div>
            )
          )}
        </div>
       </div>

      {/* Issues */}
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium text-white">
            Detected Issues
           </h3>

           <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300">
            {weaknesses?.length} Problems
           </span>
        </div>

        <div className="space-y-4">
          {weaknesses?.map((issue: string, index: number) => (
            <div
              key={index}
              className="
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              p-4
              text-sm
              text-red-200
             "
            >
              {issue}
             </div>
           ))}
         </div>
      </div>
    </div>
  );
}