import { motion } from "framer-motion";

interface AnalysisCardProps {
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
  recommendation: string;
}

const severityStyles = {
  low: {
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    text: "text-green-300",
    badge: "bg-green-500/10 text-green-300",
  },

  medium: {
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    text: "text-yellow-300",
    badge: "bg-yellow-500/10 text-yellow-300",
  },

  high: {
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-300",
    badge: "bg-red-500/10 text-red-300",
  },
};

export function AnalysisCard({
  title,
  severity,
  description,
  recommendation,
}: AnalysisCardProps) {
  const styles = severityStyles[severity];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className={`
        rounded-2xl
        border
        p-4
        transition-all
        duration-300
        hover:scale-[1.02]
        ${styles.border}
        ${styles.bg}
      `}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wide
            ${styles.badge}
          `}
        >
          {severity}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-zinc-300">
        {description}
      </p>

      <div className="rounded-xl bg-black/20 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Recommendation
        </p>

        <p className="mt-2 text-sm text-zinc-200">
          {recommendation}
        </p>
      </div>
    </motion.div>
  );
}