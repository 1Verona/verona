import { motion } from "motion/react";
import { type Lang, t } from "../i18n";

interface ThreeDSectionProps {
  phase: number;
  isDark: boolean;
  lang: Lang;
}

const ease = [0.25, 1, 0.5, 1] as const;

// Blender logo colours
const BLENDER_ORANGE = "#EA7600";
const BLENDER_DARK   = "#265787";

function BlenderIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
      {/* Simplified Blender logo shape */}
      <circle cx="12" cy="13" r="4.5" fill={BLENDER_ORANGE} />
      <circle cx="12" cy="13" r="2" fill="white" opacity="0.9" />
      {/* Arc arm */}
      <path
        d="M12 8.5 C7 8.5 4 11 4 13.5 C4 16 7 18.5 12 18.5"
        stroke={BLENDER_DARK}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 8.5 C17 8.5 20 11 20 13.5 C20 16 17 18.5 12 18.5"
        stroke={BLENDER_ORANGE}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Top dot */}
      <circle cx="12" cy="5.5" r="1.5" fill={BLENDER_DARK} />
    </svg>
  );
}

function SkillCard({
  name,
  desc,
  isDark,
  icon,
}: {
  name: string;
  desc: string;
  isDark: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-3 rounded-2xl p-5"
      style={
        isDark
          ? {
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }
          : {
              background: "rgba(0,0,0,0.03)",
              border: "1px solid rgba(0,0,0,0.07)",
            }
      }
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          background: isDark ? "rgba(234,118,0,0.15)" : "rgba(234,118,0,0.1)",
          border: `1px solid rgba(234,118,0,${isDark ? "0.25" : "0.2"})`,
        }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          {name}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {desc}
        </p>
      </div>
    </div>
  );
}

const icons = [
  // Cube / modeling
  <svg key="cube" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLENDER_ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>,
  // Sun / rendering
  <svg key="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLENDER_ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>,
  // Layers / scene
  <svg key="layers" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLENDER_ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>,
];

export default function ThreeDSection({ phase, isDark, lang }: ThreeDSectionProps) {
  const tr = t[lang].threed;

  return (
    <motion.section
      id="threed"
      initial={{ opacity: 0, y: 28 }}
      animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: 0.5, ease }}
      className="mx-auto max-w-5xl px-6 pb-28"
    >
      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
          {tr.label}
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {tr.heading}
          </h2>
          {/* Blender badge */}
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: isDark ? "rgba(234,118,0,0.12)" : "rgba(234,118,0,0.1)",
              border: `1px solid rgba(234,118,0,${isDark ? "0.25" : "0.2"})`,
              color: BLENDER_ORANGE,
            }}
          >
            <BlenderIcon />
            Blender
          </span>
        </div>
        <p className="max-w-md text-base leading-relaxed text-neutral-500">
          {tr.description}
        </p>
      </div>

      {/* Skill cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tr.skills.map((skill, i) => (
          <SkillCard
            key={skill.name}
            name={skill.name}
            desc={skill.desc}
            isDark={isDark}
            icon={icons[i]}
          />
        ))}
      </div>

      {/* Renders gallery */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { src: "/images/bedroom.png", label: "Bedroom" },
          { src: "/images/7eleven.png", label: "7-Eleven" },
        ].map(({ src, label }) => (
          <div
            key={label}
            className="overflow-hidden rounded-2xl"
            style={{
              border: isDark
                ? "1px solid rgba(255,255,255,0.07)"
                : "1px solid rgba(0,0,0,0.07)",
            }}
          >
            <img
              src={src}
              alt={label}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              style={{ display: "block" }}
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
