import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import HeroSection from "./components/HeroSection";
import ProjectCards from "./components/ProjectCards";
import VideoStack from "./components/VideoStack";
import ExperienceSection from "./components/ExperienceSection";
import ThreeDSection from "./components/ThreeDSection";
import { type Lang, t } from "./i18n";

export default function App() {
  const [phase, setPhase] = useState(0);
  const [logoArrived, setLogoArrived] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("lang") as Lang) || "en";
  });

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "pt" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const advancePhase = useCallback(() => {
    setPhase((p) => p + 1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 500);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950">
      {/* Subtle gradient orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)"
              : "radial-gradient(circle, #c7d2fe 0%, transparent 70%)",
            opacity: isDark ? 1 : 0.4,
          }}
        />
        <div
          className="absolute top-1/3 -left-24 h-[500px] w-[500px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, #fbcfe8 0%, transparent 70%)",
            opacity: isDark ? 1 : 0.3,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, #bfdbfe 0%, transparent 70%)",
            opacity: isDark ? 1 : 0.25,
          }}
        />
      </div>
      <Logo phase={phase} onDrawComplete={() => { setLogoArrived(true); advancePhase(); }} />
      <Navbar phase={phase} logoArrived={logoArrived} isDark={isDark} toggleDark={toggleDark} lang={lang} toggleLang={toggleLang} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <HeroSection phase={phase} onComplete={advancePhase} lang={lang} />
        <ProjectCards phase={phase} isDark={isDark} lang={lang} />
        <ExperienceSection phase={phase} isDark={isDark} lang={lang} />
        <VideoStack phase={phase} isDark={isDark} lang={lang} />
        <ThreeDSection phase={phase} isDark={isDark} lang={lang} />
        <div className="flex-1" />
        <motion.footer
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pb-4 pt-0 text-center text-sm text-neutral-400 dark:text-neutral-500"
        >
          {t[lang].footer}
        </motion.footer>
      </div>
    </div>
  );
}
