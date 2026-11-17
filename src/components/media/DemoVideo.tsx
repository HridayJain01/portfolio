"use client";

import { useEffect, useRef, useState } from "react";
import GenerativeArt from "./GenerativeArt";
import { Expand } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * A muted, looping demo clip. It starts downloading shortly before it scrolls into
 * view and only plays while it's substantially visible, so pages with many videos
 * stay light. Without a file (or if it fails to load) it shows generative art.
 */
export default function DemoVideo({
  src,
  poster,
  accent,
  seed,
  title,
  label,
  variant = "window",
  expandable = false,
  preload = "none",
  className,
}: {
  src?: string;
  poster?: string;
  accent?: string;
  seed?: string;
  title?: string;
  label?: string;
  variant?: "window" | "portrait" | "plain";
  expandable?: boolean;
  /** "none" (default) waits until the video is near the viewport; use "auto" above the fold. */
  preload?: "none" | "metadata" | "auto";
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // start fetching a little before it arrives on screen
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && v.preload === "none") v.preload = reduce ? "metadata" : "auto";
      },
      { rootMargin: "300px 0px" },
    );
    // play only while at least ~30% is visible
    const vis = new IntersectionObserver(
      ([entry]) => {
        // catches load/error events that fired before hydration
        if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
          setFailed(true);
          return;
        }
        if (v.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setReady(true);
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 },
    );
    near.observe(v);
    vis.observe(v);
    return () => {
      near.disconnect();
      vis.disconnect();
      v.pause();
    };
  }, [src]);

  const expand = () => {
    const v = ref.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!v) return;
    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else v.webkitEnterFullscreen?.();
  };

  if (!src || failed) {
    return (
      <GenerativeArt
        accent={accent}
        seed={seed ?? src ?? title}
        variant={variant}
        label={label}
        className={className}
      />
    );
  }

  return (
    <div className={cn("absolute inset-0", className)}>
      <video
        ref={ref}
        src={src}
        poster={poster || undefined}
        muted
        loop
        playsInline
        preload={preload}
        aria-label={title ? `${title}: demo video` : "Demo video"}
        onError={() => setFailed(true)}
        onLoadedData={() => setReady(true)}
        onPlaying={() => setReady(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-700",
          ready || poster ? "opacity-100" : "opacity-0",
        )}
      />
      {expandable && (
        <button
          type="button"
          onClick={expand}
          data-cursor-label="Expand"
          aria-label={title ? `Watch “${title}” fullscreen` : "Watch fullscreen"}
          className="glass absolute right-3 top-3 z-[3] grid size-10 place-items-center rounded-full text-bone transition-transform duration-500 hover:scale-110"
        >
          <Expand className="size-4" />
        </button>
      )}
    </div>
  );
}
