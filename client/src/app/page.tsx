import Hero from "@/components/features/hero";
import Navbar from "@/components/features/navbar";
import Features from "@/components/features/features";
import MouseGlow from "@/components/features/mouse-glow";
import ScrollProgress from "@/components/features/scroll-progress";
import ArchitectureFlow from "@/components/features/architecture-flow";
import LivePipeline from "@/components/features/live-pipeline";
import FeatureGrid from "@/components/features/feature-grid";
import ArchitecturePlayground from "@/components/architecture/architecture-playground";
import ProblemsSection from "@/components/features/problem-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemsSection />
      <Features />
      <MouseGlow />
      <ScrollProgress />
      <ArchitectureFlow />
      <LivePipeline />
      <FeatureGrid />
      
      <section id="Playground">
      <ArchitecturePlayground />
      </section> 
    </>
  );
}