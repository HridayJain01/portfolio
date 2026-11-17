"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Sticky card stack: each project card pins near the top while the next one
 * slides over it; the card underneath sinks back and dims.
 */
export default function WorkStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(".work-item", el);
        items.forEach((item, i) => {
          const card = item.querySelector(".work-card");
          const media = item.querySelector(".work-media");
          const dim = item.querySelector(".work-dim");
          const info = item.querySelectorAll(".work-info");

          gsap.fromTo(
            media,
            { scale: 1.28 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "top 15%", scrub: true },
            },
          );
          gsap.fromTo(
            info,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 1.3,
              ease: "expo.out",
              scrollTrigger: { trigger: item, start: "top 60%", once: true },
            },
          );

          const next = items[i + 1];
          if (next) {
            const st = { trigger: next, start: "top bottom", end: "top 15%", scrub: true };
            gsap.to(card, { scale: 0.9, ease: "none", scrollTrigger: st });
            gsap.to(dim, { opacity: 0.7, ease: "none", scrollTrigger: st });
          }
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="flex flex-col gap-[12vh]">
      {children}
    </ul>
  );
}
