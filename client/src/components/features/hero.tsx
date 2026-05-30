"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { toast } from "sonner";

export default function Hero() {
  
  const handleAIEvaluation = () => {
       toast("AI Evaluation is Locked!", {
        description: "Create an account to access AI-powered architecture feedback.", 
       });
    };

  return (

    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-24 -top-24 h-[500px] w-[500px] animate-pulse rounded-full bg-indigo-500/30 blur-[120px]" />

        <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] animate-pulse rounded-full bg-cyan-500/30 blur-[120px]" />

      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold leading-tight md:text-7xl"
      >
        Master{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          System Design
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-2xl text-lg text-gray-400"
      >
        Practice real-world system design questions,
        receive AI-powered architecture feedback,
        and build scalable engineering skills.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex gap-4"
      >
        <Button 
          className="rounded-xl bg-indigo-500 px-6 py-3 text-white hover:bg-indigo-600"
          onClick={() => scrollToSection("Playground")}>
          Start Practicing
        </Button>

        <Button 
          className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur-md hover:bg-white/20"
          onClick={handleAIEvaluation}
        >
          Try AI Evaluation
        </Button>
      </motion.div>

    </section>
  );
}