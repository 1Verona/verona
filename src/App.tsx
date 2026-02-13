import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";

export default function App() {
  const [phase, setPhase] = useState(0);

  const advancePhase = useCallback(() => {
    setPhase((p) => p + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Subtle gradient orbs so liquid glass has something to refract */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -left-24 h-[400px] w-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }}
        />
      </div>
      <Navbar phase={phase} onComplete={advancePhase} />
      <HeroSection phase={phase} onComplete={advancePhase} />
      <ProjectCards phase={phase} />
    </div>
  );
}
