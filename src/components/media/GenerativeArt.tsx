import type { CSSProperties } from "react";
import { cn, seeded } from "@/lib/utils";

/**
 * Animated placeholder artwork, shown wherever a video or image hasn't been
 * added yet. Deterministic per `seed`, so every project gets its own look.
 */
export default function GenerativeArt({
  accent = "#ff6b3d",
  seed = "seed",
  variant = "window",
  label,
  monogram,
  className,
}: {
  accent?: string;
  seed?: string;
  variant?: "window" | "portrait" | "plain";
  label?: string;
  monogram?: string;
  className?: string;
}) {
  const rand = seeded(seed);
  const blobs = [
    { color: accent, size: 48 + rand() * 18, x: 40 + rand() * 30, y: -15 + rand() * 25, dur: 18 + rand() * 8 },
    { color: "#6d4dff", size: 40 + rand() * 18, x: -10 + rand() * 25, y: 35 + rand() * 30, dur: 22 + rand() * 8 },
    {
      color: `color-mix(in oklab, ${accent} 55%, #ffffff)`,
      size: 26 + rand() * 14,
      x: 25 + rand() * 40,
      y: 45 + rand() * 25,
      dur: 26 + rand() * 8,
    },
  ];
  const tilt = (rand() - 0.5) * 4;

  return (
    <div className={cn("ga", className)} style={{ "--a": accent } as CSSProperties} aria-hidden="true">
      {blobs.map((b, i) => (
        <span
          key={i}
          className="ga-blob"
          style={{
            width: `${b.size}%`,
            left: `${b.x}%`,
            top: `${b.y}%`,
            background: `radial-gradient(circle at 35% 35%, ${b.color}, transparent 66%)`,
            opacity: i === 2 ? 0.45 : 0.85,
            animationDuration: `${b.dur}s`,
            animationDelay: `${-i * 5}s`,
          }}
        />
      ))}
      <div className="ga-grid" />

      {variant === "window" && (
        <div
          className="ga-window left-[34%] top-[14%] w-[min(60%,760px)] max-md:left-[11%] max-md:top-[11%] max-md:w-[78%]"
          style={{ aspectRatio: "16 / 10", rotate: `${tilt}deg` }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="size-2.5 rounded-full bg-white/25" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="ga-bar ml-4 h-2 w-1/4" />
          </div>
          <div className="grid h-[calc(100%-2.6rem)] grid-cols-[22%_1fr] gap-4 p-4">
            <div className="flex flex-col gap-2.5">
              {[70, 55, 80, 45, 60].map((w, i) => (
                <span key={i} className="ga-bar h-2" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-3">
              <span
                className="ga-bar h-3 w-2/5"
                style={{ background: `color-mix(in oklab, ${accent} 70%, transparent)` }}
              />
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="ga-shimmer rounded-xl border border-white/10 bg-white/[0.06]" />
                ))}
                <div className="ga-shimmer col-span-2 rounded-xl border border-white/10 bg-white/[0.05]" />
                <div
                  className="rounded-xl"
                  style={{
                    background: `linear-gradient(140deg, ${accent}, color-mix(in oklab, ${accent} 30%, #6d4dff))`,
                    opacity: 0.85,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {variant === "portrait" && monogram && (
        <span className="absolute inset-0 grid place-items-center serif-em text-[clamp(6rem,16vw,14rem)] leading-none text-bone/90 mix-blend-overlay">
          {monogram}
        </span>
      )}

      {label && (
        <span className="eyebrow absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-2 text-bone/70 backdrop-blur-md">
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
          {label}
        </span>
      )}
    </div>
  );
}
