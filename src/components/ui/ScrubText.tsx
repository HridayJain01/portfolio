"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { plain, tokenize } from "@/lib/text";
import { cn } from "@/lib/utils";

/** A paragraph that lights up word by word as you scroll through it. */
export default function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = tokenize(text).filter((t) => !t.reel);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const words = el.querySelectorAll("[data-w]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} aria-label={plain(text)}>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <span data-w aria-hidden="true" className={cn(t.em && "serif-em text-accent")}>
            {t.text}
          </span>
          {i < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
