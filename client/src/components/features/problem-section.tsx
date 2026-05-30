"use client"

import { scrollToSection } from "@/lib/scroll";
export default function ProblemsSection() {

  const problems = [
    {
      title: "Design URL Shortener",
      difficulty: "Easy",
      category: "Scalability",
    },
    {
      title: "Design WhatsApp",
      difficulty: "Hard",
      category: "Realtime Systems",
    },
    {
      title: "Design YouTube",
      difficulty: "Hard",
      category: "Video Streaming",
    },
    {
      title: "Design Uber",
      difficulty: "Medium",
      category: "Location Systems",
    },
    {
      title: "Design Notification Service",
      difficulty: "Medium",
      category: "Messaging",
    },
    {
      title: "Design Rate Limiter",
      difficulty: "Easy",
      category: "Backend Infrastructure",
    },
  ];

  return (
    <section
      id="problems"
      className="relative py-32 px-6"
    >

      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-16">

        <h2 className="text-5xl font-bold text-white mb-4">
          Practice System Design Problems
        </h2>

        <p className="text-white/60 text-lg max-w-2xl">
          Solve real-world architecture challenges inspired by
          scalable distributed systems used by top tech companies.
        </p>

      </div>

      {/* Problem Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {problems.map((problem) => (

          <div
            key={problem.title}
            className="rounded-3xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-xl p-6 hover:border-cyan-400/40 transition duration-300 hover:scale-[1.02]"
          >

            <div className="flex items-center justify-between mb-4">

              <span className="text-sm text-cyan-300">
                {problem.category}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  problem.difficulty === "Easy"
                    ? "bg-green-500/20 text-green-300"
                    : problem.difficulty === "Medium"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {problem.difficulty}
              </span>

            </div>

            <h3 className="text-2xl font-semibold text-white mb-4">
              {problem.title}
            </h3>

            <p className="text-white/60 leading-7 mb-6">
              Architect scalable and production-grade solutions
              with modern distributed system design principles.
            </p>

            <button onClick={() => scrollToSection("Playground")}
              className="w-full rounded-xl bg-white text-black py-3 font-medium hover:bg-gray-200 transition"
              
            >
              Solve Problem
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}