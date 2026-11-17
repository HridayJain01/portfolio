"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import GenerativeArt from "./GenerativeArt";
import { Expand, Muted, Pause, Play, Volume } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
};

/**
 * Case-study player.
 *  - Starts as a muted preview loop (`src`) while on screen.
 *  - "Play demo" restarts the full demo (`fullSrc`, falls back to `src`) with sound and controls.
 *  - Custom scrubber, mute, fullscreen, keyboard shortcuts (space/k, m, f, ←/→).
 */
export default function VideoPlayer({
  src,
  fullSrc,
  poster,
  title,
  accent,
  seed,
}: {
  src?: string;
  fullSrc?: string;
  poster?: string;
  title: string;
  accent: string;
  seed: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const scrub = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<number | undefined>(undefined);

  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState<"preview" | "full">("preview");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [idle, setIdle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fullFailed, setFullFailed] = useState(false);

  const wantsFull = mode === "full" && !!fullSrc && !fullFailed;
  const activeSrc = wantsFull ? fullSrc : src;

  // preview: autoplay muted while visible; always pause when hidden/unmounted
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
          setFailed(true);
          return;
        }
        if (mode !== "preview") {
          if (!entry.isIntersecting) v.pause();
          return;
        }
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      v.pause();
    };
  }, [mode, activeSrc]);

  // smooth progress bar via rAF (no re-render per frame)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = video.current;
      const bar = scrub.current;
      if (v && bar && v.duration) bar.style.setProperty("--p", String(v.currentTime / v.duration));
      raf = requestAnimationFrame(tick);
    };
    if (mode === "full") raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  const poke = useCallback(() => {
    setIdle(false);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setIdle(true), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(hideTimer.current), []);

  // entering full mode (or swapping to the fallback source): play from the start with sound
  useEffect(() => {
    if (mode !== "full") return;
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {
      // sound blocked by the browser: keep playing muted
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  }, [mode, activeSrc]);

  const startFull = () => {
    setMode("full");
    setMuted(false);
    poke();
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (mode === "preview") return startFull();
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    poke();
  };

  const toggleMute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    poke();
  };

  const fullscreen = () => {
    const el = wrap.current;
    const v = video.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});
    else v?.webkitEnterFullscreen?.();
  };

  const seekFromPointer = (clientX: number) => {
    const v = video.current;
    const bar = scrub.current;
    if (!v || !bar || !v.duration) return;
    const r = bar.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    v.currentTime = p * v.duration;
    bar.style.setProperty("--p", String(p));
  };

  const onKey = (e: React.KeyboardEvent) => {
    const v = video.current;
    if (!v) return;
    const k = e.key.toLowerCase();
    if (k === " " || k === "k") {
      e.preventDefault();
      toggle();
    } else if (k === "m") toggleMute();
    else if (k === "f") fullscreen();
    else if (k === "arrowright" && mode === "full") v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
    else if (k === "arrowleft" && mode === "full") v.currentTime = Math.max(0, v.currentTime - 5);
  };

  if (!src || failed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line">
        <GenerativeArt accent={accent} seed={seed} label="Demo video coming soon" />
      </div>
    );
  }

  const showControls = mode === "full" && (!playing || !idle || dragging);

  return (
    <div
      ref={wrap}
      tabIndex={0}
      role="region"
      aria-label={`${title} demo video player`}
      onKeyDown={onKey}
      onPointerMove={mode === "full" ? poke : undefined}
      className={cn(
        "group/player relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line",
        "[&:fullscreen]:rounded-none",
        mode === "full" && playing && idle && !dragging && "cursor-none",
      )}
    >
      <video
        ref={video}
        key={activeSrc}
        src={activeSrc}
        poster={poster || undefined}
        muted={muted}
        loop={mode === "preview"}
        playsInline
        preload="metadata"
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setMode("preview");
          setMuted(true);
        }}
        onError={() => {
          if (wantsFull && fullSrc !== src) setFullFailed(true);
          else setFailed(true);
        }}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCur(e.currentTarget.currentTime)}
        className="h-full w-full object-cover"
      />

      {/* Preview overlay: big play button */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/70 via-ink/10 to-transparent transition-opacity duration-700",
          mode === "preview" ? "opacity-100" : "opacity-0",
        )}
      >
        <button
          type="button"
          onClick={startFull}
          data-cursor-label="Play"
          aria-label={`Play the ${title} demo with sound`}
          className={cn(
            "group/btn pointer-events-auto relative grid size-[clamp(5.5rem,10vw,8.5rem)] place-items-center rounded-full bg-bone text-ink transition-transform duration-700 ease-out-expo hover:scale-110",
            mode !== "preview" && "pointer-events-none",
          )}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-bone/30 [animation-duration:2.4s]" />
          <Play className="relative ml-1 size-[32%]" />
        </button>
        <span className="eyebrow absolute bottom-5 left-5 flex items-center gap-2 text-bone/80">
          <span className="size-1.5 rounded-full bg-accent" /> Play demo · with sound
        </span>
      </div>

      {/* Full controls */}
      <div
        className={cn(
          "absolute inset-x-3 bottom-3 transition-all duration-500 ease-out-expo sm:inset-x-5 sm:bottom-5",
          showControls ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        )}
      >
        <div className="glass flex items-center gap-3 rounded-full px-3 py-2 sm:gap-4 sm:px-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-bone text-ink transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
          </button>
          <span className="eyebrow w-[5.5rem] shrink-0 tabular-nums text-bone/80">
            {fmt(cur)} / {fmt(dur)}
          </span>
          <div
            ref={scrub}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(dur)}
            aria-valuenow={Math.round(cur)}
            aria-valuetext={`${fmt(cur)} of ${fmt(dur)}`}
            data-dragging={dragging}
            className="scrub flex-1 cursor-pointer"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setDragging(true);
              seekFromPointer(e.clientX);
            }}
            onPointerMove={(e) => dragging && seekFromPointer(e.clientX)}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
          >
            <span className="scrub-fill" />
          </div>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="grid size-9 shrink-0 place-items-center rounded-full text-bone transition-colors hover:bg-white/10"
          >
            {muted ? <Muted className="size-5" /> : <Volume className="size-5" />}
          </button>
          <button
            type="button"
            onClick={fullscreen}
            aria-label="Fullscreen"
            className="grid size-9 shrink-0 place-items-center rounded-full text-bone transition-colors hover:bg-white/10"
          >
            <Expand className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
