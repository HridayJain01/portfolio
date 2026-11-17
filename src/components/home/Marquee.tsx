"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Spark } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

function Track({ items, size }: { items: readonly string[]; size: "lg" | "sm" }) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <Fragment key={item}>
          <span
            className={cn(
              size === "lg"
                ? "headline px-[0.35em] text-[clamp(2.4rem,8vw,8.5rem)]"
                : "eyebrow px-5 text-[0.78rem] text-mute",
              size === "lg" && i % 2 === 1 && "serif-em text-outline [-webkit-text-stroke-width:1.5px]",
            )}
          >
            {item}
          </span>
          <Spark
            className={cn(
              "shrink-0",
              size === "lg" ? "size-[clamp(1.1rem,3vw,3rem)] text-accent" : "size-2.5 text-dim",
            )}
          />
        </Fragment>
      ))}
    </div>
  );
  return (
    <>
      {content}
      {content}
    </>
  );
}

/**
 * Infinite marquee that speeds up with scroll velocity and flips direction when
 * you scroll back up. Only animates while on screen.
 */
export default function Marquee({ items, sub }: { items: readonly string[]; sub: readonly string[] }) {
  const root = useRef<HTMLElement>(null);
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const wrap = gsap.utils.wrap(-50, 0);
        const tracks = [
          { el: rowA.current, x: 0, dir: -1, speed: 0.024 },
          { el: rowB.current, x: -50, dir: 1, speed: 0.032 },
        ]
          .filter((t): t is { el: HTMLDivElement; x: number; dir: number; speed: number } => Boolean(t.el))
          .map((t) => ({ ...t, set: gsap.quickSetter(t.el, "xPercent") }));

        let velocity = 0;
        let scrollDir = 1;
        let boost = 0;
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            velocity = self.getVelocity();
            if (Math.abs(velocity) > 30) scrollDir = velocity > 0 ? 1 : -1;
          },
        });

        const tick = (_t: number, dt: number) => {
          boost += (Math.min(Math.abs(velocity) / 450, 5) - boost) * 0.1;
          velocity *= 0.92; // settle once scrolling stops
          const k = (dt / 16.67) * (1 + boost) * scrollDir;
          for (const t of tracks) {
            t.x = wrap(t.x + t.dir * t.speed * k);
            t.set(t.x);
          }
        };

        let running = false;
        const io = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting && !running) {
            gsap.ticker.add(tick);
            running = true;
          } else if (!entry.isIntersecting && running) {
            gsap.ticker.remove(tick);
            running = false;
          }
        });
        io.observe(el);

        return () => {
          io.disconnect();
          if (running) gsap.ticker.remove(tick);
          st.kill();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="What I do"
      className="relative overflow-hidden border-y border-line py-[clamp(1.25rem,3.5vw,3.25rem)]"
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden="true">
        <div ref={rowA} className="marquee-track">
          <Track items={items} size="lg" />
        </div>
        <div ref={rowB} className="marquee-track mt-[clamp(1rem,2.5vw,2rem)] hidden sm:flex">
          <Track items={sub} size="sm" />
        </div>
      </div>
    </section>
  );
}
