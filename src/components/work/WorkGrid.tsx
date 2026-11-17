"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Two-column project grid (one column on phones). Cards rise in as they enter and
 * each video drifts gently inside its frame. Nothing pins, so scrolling stays free.
 */
export default function WorkGrid({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".work-card", el);
        gsap.set(cards, { opacity: 0, y: 60 });
        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "expo.out", overwrite: true }),
        });
        cards.forEach((card) => {
          const media = card.querySelector(".work-media");
          if (!media) return;
          gsap.fromTo(
            media,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ul
      ref={ref}
      className="grid gap-y-10 md:grid-cols-2 md:gap-x-[clamp(1.25rem,2.5vw,2.5rem)] md:gap-y-[clamp(2.5rem,5vw,5rem)]"
    >
      {children}
    </ul>
  );
}
