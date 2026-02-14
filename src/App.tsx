import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";

export default function App() {
  const [phase, setPhase] = useState(0);
  const [logoArrived, setLogoArrived] = useState(false);

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
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -left-24 h-[500px] w-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }}
        />
      </div>
      <Logo phase={phase} onDrawComplete={() => { setLogoArrived(true); advancePhase(); }} />
      <Navbar phase={phase} logoArrived={logoArrived} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <HeroSection phase={phase} onComplete={advancePhase} />
        <ProjectCards phase={phase} />
        <div className="flex-1" />
        <motion.footer
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pb-4 pt-0 text-center text-sm text-neutral-400"
        >
          &copy; 2026 João Verona
        </motion.footer>
      </div>
    </div>
  );
}
