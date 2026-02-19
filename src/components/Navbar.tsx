import { motion } from "motion/react";

interface NavbarProps {
  phase: number;
  logoArrived: boolean;
  isDark: boolean;
  toggleDark: () => void;
}

const FINAL_W = 290;
const FINAL_H = 48;
const FINAL_R = 24;

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar({ phase, logoArrived, isDark, toggleDark }: NavbarProps) {
  const isActive = phase >= 1;

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center pt-6 z-50">
      <motion.nav
        initial={{ width: 48, height: 48, borderRadius: 24, opacity: 0, scale: 0 }}
        animate={
          isActive
            ? { width: FINAL_W, height: FINAL_H, borderRadius: FINAL_R, opacity: 1, scale: 1 }
            : undefined
        }
        transition={{
          width: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
          height: { duration: 0 },
          borderRadius: { duration: 0 },
          opacity: { duration: 0.5 },
          scale: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
        }}
        onAnimationComplete={() => {}}
        style={{ willChange: "width, opacity, transform" }}
        className="relative flex items-center justify-between overflow-hidden bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg"
      >
        {/* Inner content — logo space (24px) + gap + VERONA + toggle ... CREATOR */}
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={logoArrived ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={toggleDark}
              className="flex items-center justify-center w-6 h-6 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </motion.button>
            {/* Placeholder space for the logo that flies in */}
            <div className="w-6 h-6 shrink-0" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={logoArrived ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5 }}
              className="font-bold text-sm tracking-tighter whitespace-nowrap dark:text-neutral-100"
            >
              VERONA
            </motion.span>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={logoArrived ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-medium text-neutral-500 dark:text-neutral-400"
          >
            CREATOR
          </motion.span>
        </div>
      </motion.nav>
    </div>
  );
}
