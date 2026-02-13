import { motion } from "motion/react";

interface NavbarProps {
  phase: number;
  logoArrived: boolean;
}

const FINAL_W = 265;
const FINAL_H = 48;
const FINAL_R = 24;

export default function Navbar({ phase, logoArrived }: NavbarProps) {
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
        className="relative flex items-center justify-between overflow-hidden bg-white/80 backdrop-blur-md border border-white/20 shadow-lg"
      >
        {/* Inner content — logo space (24px) + gap + VERONA ... DEV */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            {/* Placeholder space for the logo that flies in */}
            <div className="w-6 h-6 shrink-0" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={logoArrived ? { opacity: 1 } : undefined}
              transition={{ duration: 0.5 }}
              className="font-bold text-sm tracking-tighter whitespace-nowrap"
            >
              VERONA
            </motion.span>
          </div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={logoArrived ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-medium text-neutral-500"
          >
            CREATOR
          </motion.span>
        </div>
      </motion.nav>
    </div>
  );
}
