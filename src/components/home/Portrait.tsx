"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import GenerativeArt from "@/components/media/GenerativeArt";

/**
 * Cut-out portrait with depth: a warm backlight and outlined initials sit behind the
 * photo, and each layer drifts at its own speed as you scroll. Warms to full colour on hover.
 */
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
          { clipPath: "inset(14% 10% 14% 10% round 2rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2rem)",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "center 55%", scrub: true },
          },
        );
        const st = { trigger: el, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(el.querySelector(".pt-bg"), { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: st });
        gsap.fromTo(el.querySelector(".pt-type"), { yPercent: 40 }, { yPercent: -25, ease: "none", scrollTrigger: st });
        gsap.fromTo(
          el.querySelector(".pt-subject"),
          { yPercent: 4 },
          { yPercent: -2, ease: "none", scrollTrigger: st },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <figure>
      <div ref={ref} className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink-2 ring-1 ring-line">
        {src ? (
          <>
            <div className="pt-bg absolute -inset-[10%] will-change-transform" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(38%_32%_at_50%_40%,rgb(255_107_61/0.55),transparent_72%),radial-gradient(60%_45%_at_15%_92%,rgb(138_108_255/0.5),transparent_70%),radial-gradient(45%_40%_at_92%_75%,rgb(255_107_61/0.22),transparent_70%)]" />
              <div className="ga-grid absolute inset-0 opacity-70" />
            </div>
            <span
              aria-hidden="true"
              className="pt-type serif-em text-outline pointer-events-none absolute inset-x-0 top-[3%] text-center text-[clamp(8rem,14vw,15rem)] leading-none will-change-transform [-webkit-text-stroke-color:rgb(243_239_231/0.4)]"
            >
              {monogram}
            </span>
            <div className="pt-subject absolute inset-x-0 bottom-0 top-[12%] will-change-transform">
              <Image
                src={src}
                alt={`Portrait of ${name}`}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover object-[50%_0%] contrast-[1.04] grayscale-[35%] transition-[filter,transform] duration-700 ease-out-expo group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
          </>
        ) : (
          <GenerativeArt accent="#ff6b3d" seed="portrait" variant="portrait" monogram={monogram} />
        )}
      </div>
      <figcaption className="eyebrow mt-4 flex justify-between text-mute">
        <span>{name}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
