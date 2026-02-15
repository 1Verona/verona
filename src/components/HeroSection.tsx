import { motion } from "motion/react";
import SocialLinks from "./SocialLinks";
import FloatingDots from "./FloatingDots";

interface HeroSectionProps {
  phase: number;
  onComplete: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

export default function HeroSection({ phase, onComplete }: HeroSectionProps) {
  return (
    <motion.section
      id="home"
      variants={containerVariants}
      initial="hidden"
      animate={phase >= 2 ? "visible" : "hidden"}
      onAnimationComplete={(definition) => {
        if (definition === "visible" && phase === 2) onComplete();
      }}
      className="mx-auto flex max-w-5xl flex-col items-center gap-12 overflow-clip px-6 pt-36 pb-24 md:flex-row md:gap-16"
    >
      {/* Left: Text */}
      <div className="flex-1 space-y-6">
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium tracking-wide text-neutral-400 uppercase"
        >
          Welcome
        </motion.p>

        {/* Mobile: heading + memoji side by side */}
        <div className="flex items-center gap-4 md:block">
          <motion.h1
            variants={itemVariants}
            className="text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl"
          >
            Hi, I'm Verona
          </motion.h1>
          {/* Small memoji for mobile */}
          <motion.div
            variants={itemVariants}
            className="relative h-36 w-36 shrink-0 md:hidden"
          >
            <FloatingDots phase={phase} scale={0.4} />
            <img
              src="/memoji.png"
              alt="Memoji"
              className="relative z-10 h-full w-full object-contain"
              style={{
                filter:
                  "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              }}
            />
          </motion.div>
        </div>

        <motion.p
          variants={itemVariants}
          className="text-lg font-medium text-neutral-400"
        >
          aka João Verona
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="max-w-md text-lg leading-relaxed text-neutral-500"
        >
          A developer crafting solutions. Passionate about UX, UI and AI.
          Bringing the best AI can give to your specific needs.
        </motion.p>
        <motion.div variants={itemVariants}>
          <SocialLinks />
        </motion.div>
      </div>

      {/* Right: Memoji with dots – desktop only */}
      <motion.div
        variants={itemVariants}
        className="relative hidden shrink-0 md:block"
      >
        <FloatingDots phase={phase} />
        <img
          src="/memoji.png"
          alt="Memoji"
          className="relative z-10 h-80 w-80 object-contain"
          style={{
            filter:
              "drop-shadow(0 8px 24px rgba(0,0,0,0.25)) drop-shadow(0 2px 8px rgba(0,0,0,0.15))",
          }}
        />
      </motion.div>
    </motion.section>
  );
}
