"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { gate } from "@/lib/gate";

/** Counts up from zero when scrolled into view. Server-renders the final value. */
export default function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const obj = { v: 0 };
      el.textContent = `0${suffix}`;
      const cancel = gate.when(
        contextSafe(() => {
          gsap.to(obj, {
            v: value,
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
        }),
      );
      return () => {
        cancel();
        el.textContent = `${value}${suffix}`;
      };
    },
    { scope: ref, dependencies: [value, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
