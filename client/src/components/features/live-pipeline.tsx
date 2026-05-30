"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const stages = [
  {
    label: "PENDING",
    color: "bg-yellow-500",
    message: "Submission added to Redis queue...",
  },
  {
    label: "PROCESSING",
    color: "bg-blue-500",
    message: "Worker picked up evaluation job...",
  },
  {
    label: "AI ANALYZING",
    color: "bg-purple-500",
    message: "AI evaluating system architecture...",
  },
  {
    label: "COMPLETED",
    color: "bg-green-500",
    message: "Evaluation completed successfully.",
  },
];

export default function LivePipeline() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev === stages.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const activeStage = stages[currentStage];

  return (
    <section className="relative overflow-hidden px-6 py-32">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Real-Time Evaluation Pipeline
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Watch distributed workers process architecture evaluations
            in real-time through async queue pipelines.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-10
            backdrop-blur-xl
          "
        >

          {/* Header */}
          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-2xl font-semibold">
                Submission #A92F
              </h3>

              <p className="mt-2 text-gray-400">
                Distributed system evaluation workflow
              </p>
            </div>

            {/* Status Pill */}
            <motion.div
              key={activeStage.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                px-4
                py-2
                text-sm
                font-medium
              "
            >

              <div
                className={`h-3 w-3 rounded-full ${activeStage.color} animate-pulse`}
              />

              {activeStage.label}

            </motion.div>

          </div>

          {/* Progress Bar */}
          <div className="mt-10 h-3 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStage + 1) / stages.length) * 100}%`,
              }}
              transition={{ duration: 0.6 }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-indigo-500
                to-cyan-500
              "
            />

          </div>

          {/* Logs */}
          <div className="mt-10 space-y-4">

            <AnimatePresence mode="wait">

              <motion.div
                key={activeStage.message}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  font-mono
                  text-sm
                  text-cyan-300
                "
              >
                {activeStage.message}
              </motion.div>

            </AnimatePresence>

          </div>

          {/* Stage Indicators */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">

            {stages.map((stage, index) => (
              <motion.div
                key={stage.label}
                animate={{
                  opacity: index <= currentStage ? 1 : 0.4,
                  scale: index === currentStage ? 1.05 : 1,
                }}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  text-center
                "
              >

                <div
                  className={`mx-auto mb-3 h-3 w-3 rounded-full ${stage.color}`}
                />

                <p className="text-sm font-medium">
                  {stage.label}
                </p>

              </motion.div>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
}