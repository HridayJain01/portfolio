"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import FitText from "@/components/ui/FitText";

/** The full-width name at the very bottom; letters rise as it scrolls into view. */
export default function GiantName({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelector(".giant"),
          { yPercent: 60, opacity: 0.2 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 0.8 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="my-4 overflow-hidden md:my-8" aria-hidden="true">
      <div className="giant will-change-transform">
        <FitText
          text={name}
          className="headline select-none bg-gradient-to-b from-bone to-bone/25 bg-clip-text text-transparent"
        />
      </div>
    </div>
  );
}
