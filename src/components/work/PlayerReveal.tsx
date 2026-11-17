"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { gate } from "@/lib/gate";

/** Wipes the case-study player up into view on page entry, then parallaxes it gently. */
export default function PlayerReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true }).fromTo(
          el,
          { clipPath: "inset(30% 6% 0% 6% round 2rem)", y: 80, opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0rem)",
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "expo.out",
            clearProps: "clipPath",
          },
        );
        const cancel = gate.when(() => tl.delay(0.45).play());
        return () => cancel();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="intro-fade will-change-transform">
      {children}
    </div>
  );
}
