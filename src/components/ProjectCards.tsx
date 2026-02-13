import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectCardsProps {
  phase: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    id: "terminoted",
    title: "Terminoted",
    logo: "/terminoted-logo.png",
    description: "A simple TUI-based notes & to-do app for the terminal.",
    details:
      "Terminoted is a terminal sticky notes and to-do application. Switch between notes and tasks with tab, add items with 'a', toggle completion with 'x', and edit notes inline. Data is stored locally in ~/.terminoted/. Installable via Homebrew.",
    tags: ["JavaScript", "Node.js", "TUI", "CLI"],
    link: "https://github.com/1Verona/Terminoted",
  },
  {
    id: "proj-2",
    title: "Project Two",
    logo: null,
    description: "A brief description of this project and the technologies used.",
    details: "More details coming soon.",
    tags: ["Swift", "SwiftUI", "iOS"],
    link: null,
  },
  {
    id: "proj-3",
    title: "Project Three",
    logo: null,
    description: "A brief description of this project and the technologies used.",
    details: "More details coming soon.",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    link: null,
  },
  {
    id: "proj-4",
    title: "Project Four",
    logo: null,
    description: "A brief description of this project and the technologies used.",
    details: "More details coming soon.",
    tags: ["Python", "FastAPI", "AWS"],
    link: null,
  },
];

interface CardRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

// Collapsed card metrics
const CARD_PADDING = 20; // p-5
const CARD_ICON = 56; // h-14
const CARD_GAP = 16; // gap-4
const CARD_FONT_TITLE = 16; // text-base
// Expanded card metrics
const EXP_PADDING = 32; // p-8
const EXP_ICON = 64; // h-16
const EXP_GAP = 20; // gap-5
const EXP_FONT_TITLE = 20; // text-xl

export default function ProjectCards({ phase }: ProjectCardsProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [closingId, setClosingId] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<CardRect | null>(null);
  const selected = projects.find((p) => p.id === selectedId);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const captureRect = (el: HTMLDivElement): CardRect => {
    // Temporarily remove any transform to get true position
    const prevTransform = el.style.transform;
    el.style.transform = "none";
    const rect = el.getBoundingClientRect();
    el.style.transform = prevTransform;
    return {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  };

  const handleSelect = (id: string) => {
    const el = cardRefs.current[id];
    if (el) {
      setOriginRect(captureRect(el));
    }
    setSelectedId(id);
  };

  const handleClose = () => {
    if (selectedId) {
      setClosingId(selectedId);
    }
    setSelectedId(null);
  };

  const finalWidth = Math.min(512, window.innerWidth - 48);

  return (
    <>
      <motion.section
        id="projects"
        variants={containerVariants}
        initial="hidden"
        animate={phase >= 3 ? "visible" : "hidden"}
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-24 md:grid-cols-2"
      >
        {projects.map((project) => {
          const isSelected = selectedId === project.id;
          const isClosing = closingId === project.id;
          const needsFade = isSelected || isClosing;

          return (
          <motion.div
            key={project.id}
            ref={(el) => { cardRefs.current[project.id] = el; }}
            variants={cardVariants}
            onClick={() => handleSelect(project.id)}
            {...(needsFade ? {
              animate: { opacity: isSelected ? 0 : 1 },
              transition: { duration: isClosing ? 0.3 : 0.15, delay: isClosing ? 0.2 : 0, ease: "easeOut" as const },
            } : {})}
            onAnimationComplete={() => {
              if (isClosing && !isSelected) setClosingId(null);
            }}
            className="cursor-pointer rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow:
                "0 2px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden">
                {project.logo && (
                  <img src={project.logo} alt={project.title} className="h-full w-full rounded-2xl object-contain" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                  {project.description}
                </p>
              </div>
            </div>
          </motion.div>
          );
        })}
      </motion.section>

      <AnimatePresence
        onExitComplete={() => {
          setOriginRect(null);
        }}
      >
        {selected && originRect && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Morphing card */}
            <motion.div
              key={`card-${selected.id}`}
              initial={{
                position: "fixed",
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                height: originRect.height,
                borderRadius: 16,
                zIndex: 50,
                opacity: 1,
              }}
              animate={{
                top: `calc(50vh - 170px)`,
                left: `calc(50vw - ${finalWidth / 2}px)`,
                width: finalWidth,
                height: 340,
                borderRadius: 16,
                opacity: 1,
              }}
              exit={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                height: originRect.height,
                borderRadius: 16,
                opacity: 0,
              }}
              transition={{
                duration: 0.45,
                ease,
                opacity: { duration: 0.2, delay: 0.35, ease: "easeOut" },
              }}
              onClick={(e) => e.stopPropagation()}
              className="fixed z-50 bg-white shadow-2xl overflow-hidden"
              style={{ borderRadius: 16, border: "1px solid rgba(0, 0, 0, 0.06)" }}
            >
              <div className="fixed inset-0 -z-10" onClick={handleClose} />

              {/* Inner content that morphs its own metrics */}
              <motion.div
                initial={{ padding: CARD_PADDING }}
                animate={{ padding: EXP_PADDING }}
                exit={{ padding: CARD_PADDING }}
                transition={{ duration: 0.45, ease }}
              >
                <motion.div
                  className="flex items-start"
                  initial={{ gap: CARD_GAP }}
                  animate={{ gap: EXP_GAP }}
                  exit={{ gap: CARD_GAP }}
                  transition={{ duration: 0.45, ease }}
                >
                  {/* Icon morphs size */}
                  <motion.div
                    className="shrink-0 rounded-2xl flex items-center justify-center overflow-hidden"
                    initial={{ width: CARD_ICON, height: CARD_ICON }}
                    animate={{ width: EXP_ICON, height: EXP_ICON }}
                    exit={{ width: CARD_ICON, height: CARD_ICON }}
                    transition={{ duration: 0.45, ease }}
                  >
                    {selected.logo && (
                      <img src={selected.logo} alt={selected.title} className="h-full w-full rounded-2xl object-contain" />
                    )}
                  </motion.div>
                  <div className="min-w-0">
                    <motion.h3
                      className="font-semibold text-neutral-900"
                      initial={{ fontSize: CARD_FONT_TITLE }}
                      animate={{ fontSize: EXP_FONT_TITLE }}
                      exit={{ fontSize: CARD_FONT_TITLE }}
                      transition={{ duration: 0.45, ease }}
                    >
                      {selected.title}
                    </motion.h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-500">
                      {selected.description}
                    </p>
                  </div>
                </motion.div>

                {/* Extra details fade in/out */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                  }}
                >
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                    {selected.details}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      View on GitHub
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
