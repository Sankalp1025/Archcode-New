"use client";

import { motion } from "framer-motion";

const nodes = [
  "Client",
  "API Gateway",
  "Redis Queue",
  "Worker Cluster",
  "AI Evaluation",
];

export default function ArchitectureFlow() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            Distributed Evaluation Pipeline
          </h2>

          <p className="mt-6 text-lg text-gray-400">
            Real-time architecture analysis powered by queues,
            workers, and AI-driven evaluation systems.
          </p>
        </motion.div>

        {/* Flow */}
        <div className="flex flex-col items-center">

          {nodes.map((node, index) => (
            <div
              key={node}
              className="flex flex-col items-center"
            >

              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="
                  relative
                  w-[280px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-8
                  py-6
                  text-center
                  text-lg
                  font-semibold
                  backdrop-blur-xl
                  transition
                "
              >

                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 blur-xl transition duration-500 hover:opacity-100" />

                <span className="relative z-10">
                  {node}
                </span>

              </motion.div>

              {/* Connector */}
              {index !== nodes.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: 80 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="relative w-[2px] overflow-hidden bg-white/10"
                >

                  {/* Animated Flow */}
                  <motion.div
                    animate={{
                      y: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="absolute left-0 top-0 h-16 w-full bg-gradient-to-b from-indigo-400 to-cyan-400"
                  />

                </motion.div>
              )}

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}