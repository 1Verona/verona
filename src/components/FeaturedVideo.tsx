import { useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import { type Lang, t } from "../i18n";

interface FeaturedVideoProps {
  phase: number;
  lang: Lang;
}

const ease = [0.25, 1, 0.5, 1] as const;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function FeaturedVideo({ phase, lang }: FeaturedVideoProps) {
  const tr = t[lang].featuredVideo;
  const videoRef  = useRef<HTMLVideoElement | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [volume, setVolume]           = useState(1);
  const [visible, setVisible]         = useState(false);

  const revealControls = useCallback(() => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 2500);
  }, []);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) videoRef.current.currentTime = val;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) videoRef.current.volume = val;
  };

  return (
    <motion.section
      id="featured-video"
      initial={{ opacity: 0, y: 28 }}
      animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: 0.5, ease }}
      className="mx-auto w-full max-w-5xl px-6 pb-28"
    >
      <div className="mb-10">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {tr.heading}
        </h2>
      </div>

      {/* 16:9 wrapper */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          paddingBottom: "56.25%",
          background: "#0a0a0a",
          boxShadow: "0 32px 64px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.18)",
          border: "1px solid rgba(255,255,255,0.07)",
          cursor: "pointer",
        }}
        onMouseMove={revealControls}
        onMouseEnter={revealControls}
        onMouseLeave={() => {
          if (hideTimer.current) clearTimeout(hideTimer.current);
          if (isPlaying) setVisible(false);
        }}
        onClick={togglePlay}
      >
        {/* Absolute fill layer */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src="/videos/video1-legenda.mp4"
            poster="/videos/video1-legenda-thumb.jpg"
            playsInline
            loop
            className="h-full w-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
            onLoadedMetadata={(e) => setDuration((e.target as HTMLVideoElement).duration)}
          />

          {/* Center play button — when paused */}
          {!isPlaying && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: "rgba(255,255,255,0.13)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21" />
                </svg>
              </div>
            </div>
          )}

          {/* Bottom controls */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0"
            style={{ opacity: visible || !isPlaying ? 1 : 0, transition: "opacity 0.4s" }}
          >
            <div
              className="pointer-events-auto flex flex-col gap-1 px-3 pb-2 pt-6"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
              onClick={(e) => e.stopPropagation()}
              onMouseMove={(e) => { e.stopPropagation(); revealControls(); }}
            >
              {/* Progress */}
              <div className="flex items-center gap-1.5">
                <span className="w-7 shrink-0 text-right font-mono text-[9px] text-white/50">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.05}
                  value={currentTime}
                  onChange={handleSeek}
                  className="video-range flex-1"
                  style={{ cursor: "pointer" }}
                />
                <span className="w-7 shrink-0 font-mono text-[9px] text-white/30">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Play + Volume */}
              <div className="flex items-center gap-2 pb-0.5">
                <button
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", lineHeight: 0 }}
                >
                  {isPlaying ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                      <rect x="5" y="4" width="4" height="16" rx="1" />
                      <rect x="15" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21" />
                    </svg>
                  )}
                </button>

                <svg width="10" height="10" viewBox="0 0 24 24" fill="white" style={{ opacity: volume === 0 ? 0.35 : 0.7, flexShrink: 0 }}>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  {volume > 0.05 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
                  {volume > 0.55 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />}
                </svg>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={handleVolume}
                  className="video-range"
                  style={{ width: 56, cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
