"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { gate } from "@/lib/gate";
import { cn } from "@/lib/utils";

/** Fades + lifts its children (or each `[data-reveal-item]` inside, staggered) into view. */
export default function Reveal({
  children,
  className,
  y = 48,
  delay = 0,
  stagger = 0.08,
  start = "top 88%",
  intro = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  /** Play on page reveal instead of on scroll (for above-the-fold content; pair with className "intro-fade"). */
  intro?: boolean;
  as?: "div" | "section" | "ul" | "ol" | "li" | "header" | "p" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      const items = el.querySelectorAll("[data-reveal-item]");
      const targets = items.length ? items : [el];
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.set(targets, { opacity: 0, y });
        const cancel = gate.when(
          contextSafe(() => {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 1.4,
              delay,
              stagger,
              ease: "expo.out",
              scrollTrigger: intro ? undefined : { trigger: el, start, once: true },
            });
          }),
        );
        return () => cancel();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={cn(className)}>
      {children}
    </Comp>
  );
}
