"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Pulls its child toward the cursor, then springs back. Fine pointers only. */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(i, "x", { duration: 1, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(i, "y", { duration: 1, ease: "elastic.out(1, 0.35)" });

    const move = (e: PointerEvent) => {
      const r = o.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    o.addEventListener("pointermove", move);
    o.addEventListener("pointerleave", leave);
    return () => {
      o.removeEventListener("pointermove", move);
      o.removeEventListener("pointerleave", leave);
      gsap.set(i, { x: 0, y: 0 });
    };
  }, [strength]);

  return (
    <span ref={outer} className={cn("inline-block", className)}>
      <span ref={inner} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  );
}
