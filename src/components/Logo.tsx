import { useEffect, useRef } from "react";
import { motion, useAnimate } from "motion/react";

interface LogoProps {
  phase: number;
  onDrawComplete: () => void;
}

const PATH_1 = "M195 269H442L634.5 558.5L534.5 783.5L195 269Z";
const PATH_2 = "M634.5 558.5H788L889.5 350.5H732L634.5 558.5Z";

export default function Logo({ phase, onDrawComplete }: LogoProps) {
  const [scope, animate] = useAnimate();
  const hasRun = useRef(false);
  const isActive = phase >= 1;

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      // Fade in the container
      await animate(scope.current, { opacity: 1 }, { duration: 0.3 });

      // Draw path 1
      await animate(
        ".logo-path-1",
        { pathLength: 1 },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      );
      // Fill path 1 + start drawing path 2 in parallel
      animate(".logo-path-1", { fillOpacity: 1 }, { duration: 0.3 });
      await animate(
        ".logo-path-2",
        { pathLength: 1 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      );
      // Fill path 2
      await animate(".logo-path-2", { fillOpacity: 1 }, { duration: 0.25 });

      // Brief pause
      await new Promise((r) => setTimeout(r, 150));

      // Shrink and fly into navbar
      // Navbar: 290px wide, centered, top: 24px (pt-6), height: 48px
      // Logo target: 24px icon, vertically centered in navbar = top 24 + 12 = 36px
      // Horizontally: navbar left edge = calc(50% - 145px), plus px-5 (20px) padding = calc(50% - 125px)
      // We use transform: translate(-50%, -50%) for centering, so target the center point of where logo should be
      // Center of 24px logo = 36 + 12 = top 48px (with translate -50%), left = 50% - 145px + 20px + 12px = 50% - 113px
      await animate(
        scope.current,
        {
          top: "36px",
          left: "calc(50% - 109px)",
          width: "24px",
          height: "24px",
          marginLeft: "0px",
          marginTop: "0px",
        },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      );

      onDrawComplete();
    };

    run();
  }, [isActive]);

  return (
    <div
      ref={scope}
      className="fixed z-[60] pointer-events-none"
      style={{
        opacity: 0,
        top: "calc(50% - 100px)",
        left: "calc(50% - 100px)",
        marginLeft: "0px",
        marginTop: "0px",
        width: "200px",
        height: "200px",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          className="logo-path-1"
          d={PATH_1}
          stroke="#171717"
          strokeWidth="6"
          fill="#171717"
          initial={{ pathLength: 0, fillOpacity: 0 }}
        />
        <motion.path
          className="logo-path-2"
          d={PATH_2}
          stroke="#171717"
          strokeWidth="6"
          fill="#171717"
          initial={{ pathLength: 0, fillOpacity: 0 }}
        />
      </svg>
    </div>
  );
}
