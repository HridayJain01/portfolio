"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import GenerativeArt from "@/components/media/GenerativeArt";

/** Portrait with a clip-reveal and slow parallax. Falls back to generative art. */
export default function Portrait({
  src,
  monogram,
  name,
  caption,
}: {
  src?: string;
  monogram: string;
  name: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el,
          { clipPath: "inset(18% 12% 18% 12% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo(
          el.querySelector(".portrait-inner"),
          { yPercent: -8, scale: 1.15 },
          {
            yPercent: 8,
            scale: 1.15,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure>
      <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-2 ring-1 ring-line">
        <div className="portrait-inner absolute inset-0">
          {src ? (
            <Image
              src={src}
              alt={`Portrait of ${name}`}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          ) : (
            <GenerativeArt accent="#ff6b3d" seed="portrait" variant="portrait" monogram={monogram} />
          )}
        </div>
      </div>
      <figcaption className="eyebrow mt-4 flex justify-between text-mute">
        <span>{name}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
