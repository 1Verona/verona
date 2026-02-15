import { motion, useAnimate } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

const PALETTE = [
  "#D4D4D4", // neutral-300
  "#A3A3A3", // neutral-400
  "#737373", // neutral-500
  "#525252", // neutral-600
  "#404040", // neutral-700
  "#525252", // neutral-600
  "#737373", // neutral-500
  "#A3A3A3", // neutral-400
];

interface Dot {
  id: number;
  cx: number;
  cy: number;
  size: number;
  color: string;
  waveDelay: number;
}

const RINGS = [
  { radius: 160, count: 36 },
  { radius: 138, count: 30 },
  { radius: 116, count: 24 },
];

const WAVE_DURATION = 3;
const BREATHE_DURATION = 8;
const CONTAINER_SIZE = RINGS[0].radius * 2 + 30;
const CENTER = CONTAINER_SIZE / 2;

function buildRingDots(radius: number, count: number, idOffset: number): Dot[] {
  const dots: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const progress = i / count;
    dots.push({
      id: idOffset + i,
      cx: CENTER + Math.cos(angle) * radius,
      cy: CENTER + Math.sin(angle) * radius,
      size: 6 + Math.random() * 6,
      color: PALETTE[Math.floor(progress * PALETTE.length) % PALETTE.length],
      waveDelay: progress * -WAVE_DURATION,
    });
  }
  return dots;
}

interface FloatingDotsProps {
  phase: number;
  scale?: number;
}

export default function FloatingDots({ phase, scale = 1 }: FloatingDotsProps) {
  const rings = useMemo(() => {
    let offset = 0;
    return RINGS.map((ring) => {
      const dots = buildRingDots(ring.radius, ring.count, offset);
      offset += ring.count;
      return dots;
    });
  }, []);

  const hasEntered = useRef(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (phase < 2 || hasEntered.current) return;
    hasEntered.current = true;

    // Wait for memoji to fade in (~0.5s item duration), then expand rings
    const timeout = setTimeout(async () => {
      // Entrance: stagger each ring from center outward
      const ringEls = scope.current?.querySelectorAll<HTMLElement>("[data-ring]");
      if (!ringEls) return;

      for (let i = ringEls.length - 1; i >= 0; i--) {
        const delay = (ringEls.length - 1 - i) * 0.12;
        animate(
          ringEls[i],
          { scale: 1, opacity: 1 },
          { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay },
        );
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [phase, animate, scope]);

  return (
    <div
      ref={scope}
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        className="absolute origin-center"
        style={{ width: CONTAINER_SIZE, height: CONTAINER_SIZE, scale }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {rings.map((dots, ringIndex) => (
          <motion.div
            key={ringIndex}
            data-ring={ringIndex}
            className="absolute inset-0"
            style={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [null, 1, 1.08, 0.94, 1],
            }}
            transition={{
              scale: {
                duration: BREATHE_DURATION,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                className="absolute rounded-full"
                style={{
                  width: dot.size,
                  height: dot.size,
                  backgroundColor: dot.color,
                  left: dot.cx - dot.size / 2,
                  top: dot.cy - dot.size / 2,
                  boxShadow: `0 2px 6px ${dot.color}88, inset 0 -1px 2px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.3)`,
                }}
                animate={{
                  scale: [1, 1.5, 0.6, 1],
                  opacity: [0.75, 1, 0.4, 0.75],
                }}
                transition={{
                  duration: WAVE_DURATION,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot.waveDelay,
                }}
              />
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
