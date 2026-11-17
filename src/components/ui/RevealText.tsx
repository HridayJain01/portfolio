"use client";

import { useRef, type ElementType } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { gate } from "@/lib/gate";
import { plain } from "@/lib/text";
import SplitWords from "./SplitWords";

/**
 * A heading whose words rise out of masks.
 *  - mode "scroll": plays when it scrolls into view
 *  - mode "intro":  plays as soon as the page is revealed (above-the-fold titles)
 */
export default function RevealText({
  text,
  as: Tag = "h2",
  className,
  mode = "scroll",
  delay = 0,
  stagger = 0.06,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: "scroll" | "intro";
  delay?: number;
  stagger?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;
      const words = el.querySelectorAll(".mask-inner");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // y:0 resets any px offset parsed from the CSS pre-hide state (.intro-word)
        gsap.set(words, { y: 0, yPercent: 115 });
        // contextSafe: animations created later (when the gate opens) are still cleaned up with the component
        const play = contextSafe(() =>
          gsap.to(words, { y: 0, yPercent: 0, duration: 1.4, stagger, delay, ease: "expo.out", overwrite: true }),
        );
        let cancel = () => {};
        if (mode === "intro") {
          cancel = gate.when(play);
        } else {
          cancel = gate.when(
            contextSafe(() => {
              gsap.to(words, {
                yPercent: 0,
                duration: 1.3,
                stagger,
                delay,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              });
            }),
          );
        }
        return () => cancel();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className} aria-label={plain(text)}>
      <SplitWords text={text} wordClassName={mode === "intro" ? "intro-word" : undefined} />
    </Tag>
  );
}
