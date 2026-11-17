"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { Spark } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee that speeds up with scroll velocity and flips direction
 * when you scroll back up.
 */
function Row({
  items,
  reverse = false,
  size = "lg",
}: {
  items: readonly string[];
  reverse?: boolean;
  size?: "lg" | "sm";
}) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let x = reverse ? -50 : 0;
        let dir = 1;
        let boost = 0;
        const base = size === "lg" ? 0.022 : 0.03; // % of track per frame-ish
        const wrap = gsap.utils.wrap(-50, 0);
        const set = gsap.quickSetter(el, "xPercent");
        const tick = (_t: number, delta: number) => {
          const lenis = getLenis();
          if (lenis) {
            const v = lenis.velocity;
            if (Math.abs(v) > 0.1) dir = v > 0 ? 1 : -1;
            boost += (Math.min(Math.abs(v) * 0.35, 6) - boost) * 0.08;
          }
          const step = base * (1 + boost) * dir * (delta / 16.67);
          x = wrap(x + (reverse ? step : -step));
          set(x);
        };
        gsap.ticker.add(tick);
        return () => gsap.ticker.remove(tick);
      });
      return () => mm.revert();
    },
    { scope: track },
  );

  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span
            className={cn(
              size === "lg"
                ? "headline px-[0.35em] text-[clamp(3.25rem,9vw,9rem)]"
                : "eyebrow px-6 text-[0.8rem] text-mute",
              size === "lg" && i % 2 === 1 && "serif-em text-outline [-webkit-text-stroke-width:1.5px]",
            )}
          >
            {item}
          </span>
          <Spark
            className={cn(
              "spin-slow shrink-0 text-accent",
              size === "lg" ? "size-[clamp(1.5rem,3.5vw,3.25rem)]" : "size-3 text-dim",
            )}
          />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div ref={track} className="marquee-track">
        {content}
        {content}
      </div>
    </div>
  );
}

export default function Marquee({ items, sub }: { items: readonly string[]; sub: readonly string[] }) {
  return (
    <section aria-label="What I do" className="relative border-y border-line py-[clamp(2rem,4vw,3.5rem)]">
      <p className="sr-only">{items.join(", ")}</p>
      <Row items={items} />
      <div className="mt-[clamp(1.25rem,2.5vw,2rem)]">
        <Row items={sub} reverse size="sm" />
      </div>
    </section>
  );
}
