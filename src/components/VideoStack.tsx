import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface VideoStackProps {
  phase: number;
  isDark: boolean;
}

const W = 112;
const H = 199; // 9:16
const CONTAINER_H = 300;
const ORIGIN = "50% 130%";
const CARD_TOP = Math.round(CONTAINER_H - H * 1.3);
const ANGLES = [-38, -19, 0, 19, 38];

// Expanded card size
const EXP_W = 260;
const EXP_H = Math.round(EXP_W * (16 / 9));

const ease = [0.25, 1, 0.5, 1] as const;

const videos = [
  {
    id: "v1",
    title: "Ebook - SEO",
    tag: "ADs",
    duration: "",
    gradient: "",
    src: "/videos/ad1.mp4",
  },
  {
    id: "v2",
    title: "Travel Reel",
    tag: "Travel",
    duration: "1:15",
    gradient: "linear-gradient(160deg, #0d1b2a 0%, #1b263b 60%, #415a77 100%)",
    src: "",
  },
  {
    id: "v3",
    title: "Music Video",
    tag: "Music",
    duration: "3:47",
    gradient: "linear-gradient(160deg, #200122 0%, #6f0000 100%)",
    src: "",
  },
  {
    id: "v4",
    title: "Short Film",
    tag: "Film",
    duration: "5:22",
    gradient: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 60%, #16213e 100%)",
    src: "",
  },
  {
    id: "v5",
    title: "Brand Edit",
    tag: "Brand",
    duration: "0:58",
    gradient: "linear-gradient(160deg, #1a0533 0%, #3d1a78 100%)",
    src: "",
  },
];

interface CardRect { top: number; left: number; width: number; height: number }

export default function VideoStack({ phase, isDark }: VideoStackProps) {
  const [hoveredId, setHoveredId]   = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [originRect, setOriginRect] = useState<CardRect | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const innerRefs  = useRef<Record<string, HTMLDivElement | null>>({});

  const handleEnter = (id: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHoveredId(id);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setHoveredId(null), 80);
  };

  // Pull vector: move card along its own axis (away from the fan pivot)
  const pullVec = (angle: number, dist = 22) => {
    const rad = (angle * Math.PI) / 180;
    return { x: Math.sin(rad) * dist, y: -Math.cos(rad) * dist };
  };

  const handleClick = (id: string) => {
    const el = innerRefs.current[id];
    if (el) {
      const r = el.getBoundingClientRect();
      setOriginRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    }
    setSelectedId(id);
  };

  const handleClose = () => setSelectedId(null);

  const selected = videos.find((v) => v.id === selectedId);
  const expLeft  = typeof window !== "undefined" ? window.innerWidth  / 2 - EXP_W / 2 : 0;
  const expTop   = typeof window !== "undefined" ? window.innerHeight / 2 - EXP_H / 2 : 0;

  return (
    <>
      <motion.section
        id="videos"
        initial={{ opacity: 0, y: 28 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, delay: 0.4, ease }}
        className="mx-auto max-w-5xl px-6 pb-28"
      >
        <div className="mb-16 space-y-3">
          <p className="text-sm font-medium tracking-wide text-neutral-400 uppercase">
            Creative Work
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Video Editing
          </h2>
          <p className="max-w-md text-base leading-relaxed text-neutral-500">
            Beyond code, I craft visual stories through motion and rhythm — from
            cinematic edits to short reels.
          </p>
        </div>

        <div className="relative mx-auto" style={{ height: CONTAINER_H }}>
          {videos.map((video, i) => {
            const angle      = ANGLES[i];
            const isHovered  = hoveredId === video.id;
            const isSelected = selectedId === video.id;
            const pull       = pullVec(angle);

            return (
              // Outer: handles the pull-out translation
              <motion.div
                key={video.id}
                animate={isHovered ? { x: pull.x, y: pull.y } : { x: 0, y: 0 }}
                transition={{ duration: 0.35, ease }}
                style={{
                  position: "absolute",
                  left: `calc(50% - ${W / 2}px)`,
                  top: CARD_TOP,
                  zIndex: i + 1,
                  pointerEvents: "none",
                }}
              >
                <motion.div
                  ref={(el) => { innerRefs.current[video.id] = el; }}
                  onMouseEnter={() => handleEnter(video.id)}
                  onMouseLeave={handleLeave}
                  onClick={() => handleClick(video.id)}
                  animate={{
                    rotate: angle,
                    scale:   isHovered ? 1.05 : 1,
                    opacity: isSelected ? 0 : 1,
                  }}
                  transition={{ duration: 0.35, ease }}
                  style={{
                    width: W,
                    height: H,
                    transformOrigin: ORIGIN,
                    borderRadius: 12,
                    background: video.gradient || "#111",
                    overflow: "hidden",
                    cursor: "pointer",
                    pointerEvents: hoveredId !== null && !isHovered ? "none" : "auto",
                    boxShadow: isHovered
                      ? "0 18px 36px rgba(0,0,0,0.45), 0 6px 14px rgba(0,0,0,0.22)"
                      : "0 6px 20px rgba(0,0,0,0.28)",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {video.src && (
                    <video
                      src={video.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: isHovered ? 1 : 0.65, transition: "opacity 0.25s" }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="absolute left-2 top-2 rounded-full px-1.5 py-0.5 text-[8px] font-medium"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.82)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {video.tag}
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-2.5 py-1.5"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span className="truncate text-[9px] font-medium text-white/90">
                      {video.title}
                    </span>
                    <span className="ml-1 shrink-0 font-mono text-[8px] text-white/50">
                      {video.duration}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Lightbox */}
      <AnimatePresence onExitComplete={() => setOriginRect(null)}>
        {selected && originRect && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Expanding card */}
            <motion.div
              key={`exp-${selected.id}`}
              initial={{
                position: "fixed",
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                height: originRect.height,
                borderRadius: 12,
                zIndex: 50,
              }}
              animate={{
                top: expTop,
                left: expLeft,
                width: EXP_W,
                height: EXP_H,
                borderRadius: 18,
              }}
              exit={{
                top: originRect.top,
                left: originRect.left,
                width: originRect.width,
                height: originRect.height,
                borderRadius: 12,
                opacity: 0,
              }}
              transition={{ duration: 0.45, ease }}
              onClick={handleClose}
              style={{
                overflow: "hidden",
                background: selected.gradient || "#111",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {selected.src && (
                <video
                  src={selected.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Close hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.div>

              {/* Title bar */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.25 }}
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                }}
              >
                <p className="text-xs font-medium text-white/90">{selected.title}</p>
                <p className="text-[10px] text-white/50">{selected.tag}</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
