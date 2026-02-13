import { motion } from "motion/react";
import SocialLinks from "./SocialLinks";

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
      className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-6 pt-36 pb-24 md:flex-row md:gap-16"
    >
      {/* Left: Text */}
      <div className="flex-1 space-y-6">
        <motion.p
          variants={itemVariants}
          className="text-sm font-medium tracking-wide text-neutral-400 uppercase"
        >
          Welcome
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl"
        >
          Hi, I'm Verona
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="max-w-md text-lg leading-relaxed text-neutral-500"
        >
          A developer crafting delightful digital experiences.
          Passionate about clean code and beautiful interfaces.
        </motion.p>
        <motion.div variants={itemVariants}>
          <SocialLinks />
        </motion.div>
      </div>

      {/* Right: Memoji */}
      <motion.div variants={itemVariants} className="shrink-0">
        <img
          src="/memoji.png"
          alt="Memoji"
          className="h-64 w-64 object-contain md:h-80 md:w-80"
        />
      </motion.div>
    </motion.section>
  );
}
