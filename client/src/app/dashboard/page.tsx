import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">

        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-cyan-500/20 blur-3xl rounded-full" />

        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full" />

      </div>

  
      <div className="relative z-10 p-10">

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-16">

          <h1 className="text-5xl font-bold tracking-tight">
            Dashboard
          </h1>

          <Link
            href="/"
            className="px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Back to Home
          </Link>

        </div>

        {/* Welcome Card */}
        <div className="max-w-3xl rounded-3xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl">

          <h2 className="text-3xl font-semibold mb-4">
            Welcome to ArchCode!
          </h2>

          <p className="text-white/70 leading-7">
            Start building scalable architectures, practice system design
            problems, and unlock AI-powered feedback for your solutions.
          </p>

        </div>

      </div>

    </div>
  );
}