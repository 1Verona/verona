import { motion } from "motion/react";

interface NavbarProps {
  phase: number;
  onComplete: () => void;
}

const FINAL_W = 420;
const FINAL_H = 48;
const FINAL_R = 24;

export default function Navbar({ phase, onComplete }: NavbarProps) {
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
        onAnimationComplete={() => {
          if (phase === 1) onComplete();
        }}
        style={{ willChange: "width, opacity, transform" }}
        className="relative flex items-center justify-between overflow-hidden bg-white/80 backdrop-blur-md border border-white/20 shadow-lg"
      >
        {/* Inner content wrapper with fixed padding */}
        <div className="absolute inset-0 flex items-center justify-between px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : undefined}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="font-bold text-sm tracking-tighter whitespace-nowrap"
          >
            VERONA
          </motion.span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : undefined}
            transition={{ delay: 2.0, duration: 0.5 }}
            className="flex items-center gap-5 text-xs font-medium"
          >
            <a href="#home" className="hover:text-gray-600 transition-colors">
              Work
            </a>
            <a href="#projects" className="hover:text-gray-600 transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-gray-600 transition-colors">
              Contact
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
}
