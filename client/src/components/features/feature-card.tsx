"use client";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-xl
      "
    >

      {/* Glow Background */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-indigo-500/0
          via-cyan-500/0
          to-indigo-500/0
          opacity-0
          blur-2xl
          transition
          duration-700
          group-hover:opacity-100
          group-hover:from-indigo-500/10
          group-hover:via-cyan-500/10
          group-hover:to-purple-500/10
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          z-10
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-500/20
          to-cyan-500/20
        "
      >
        <Icon className="h-7 w-7 text-cyan-300" />
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-2xl font-semibold">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 leading-relaxed text-gray-400">
        {description}
      </p>

    </motion.div>
  );
}