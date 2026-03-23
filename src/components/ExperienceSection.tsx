import { motion } from "motion/react";
import { Gamepad2 } from "lucide-react";
import { type Lang, t } from "../i18n";

interface ExperienceSectionProps {
  phase: number;
  isDark: boolean;
  lang: Lang;
}

const ease = [0.25, 1, 0.5, 1] as const;

// Squircle clip-path (iOS-style superellipse, 100×100 viewBox)
const SQUIRCLE_PATH =
  "M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0Z";

function SquircleIcon({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: 64, height: 64 }}>
      <svg
        viewBox="0 0 100 100"
        width={64}
        height={64}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id="squircle-clip">
            <path d={SQUIRCLE_PATH} />
          </clipPath>
        </defs>
        <rect
          width="100"
          height="100"
          fill={isDark ? "#1e1e23" : "#e5e5ea"}
          clipPath="url(#squircle-clip)"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        <Gamepad2
          size={28}
          strokeWidth={1.6}
          color={isDark ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.55)"}
        />
      </div>
    </div>
  );
}

function SquircleTag({ label, isDark }: { label: string; isDark: boolean }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 text-xs font-medium"
      style={{
        borderRadius: 8,
        background: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
        color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export default function ExperienceSection({ phase, isDark, lang }: ExperienceSectionProps) {
  const tr = t[lang].experience;

  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 28 }}
      animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: 0.2, ease }}
      className="mx-auto max-w-5xl px-6 pb-24"
    >
      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
          {tr.label}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {tr.heading}
        </h2>
      </div>

      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-7"
        style={
          isDark
            ? {
                background: "rgba(30, 30, 35, 0.6)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
              }
            : {
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(20px) saturate(1.4)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow:
                  "0 2px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.02)",
              }
        }
      >
        {/* Subtle gradient accent */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
          <SquircleIcon isDark={isDark} />

          <div className="flex-1 min-w-0">
            {/* Top row: company + period */}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Prota Games
              </h3>
              <span className="shrink-0 font-mono text-xs text-neutral-400">
                {tr.protaGames.period}
              </span>
            </div>

            <p className="mt-0.5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Bulky Bacon
            </p>

            <p className="mt-0.5 text-sm font-medium text-violet-500 dark:text-violet-400">
              {tr.protaGames.role}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              {tr.protaGames.description}
            </p>

            {/* Squircle tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tr.protaGames.tags.map((tag) => (
                <SquircleTag key={tag} label={tag} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
