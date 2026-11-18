"use client";

import { Fragment, useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { gate } from "@/lib/gate";
import { plain, tokenize } from "@/lib/text";
import { cn } from "@/lib/utils";
import ShaderCanvas from "@/components/media/ShaderCanvas";
import DemoVideo from "@/components/media/DemoVideo";
import Magnetic from "@/components/ui/Magnetic";
import Avatar from "@/components/ui/Avatar";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";

export default function Hero({
  projectCount,
  showreel,
  showreelPoster,
  avatar,
}: {
  projectCount: number;
  /** Resolved on the server: undefined when the file isn't in /public yet. */
  showreel?: string;
  showreelPoster?: string;
  avatar?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const title = site.hero.lines.map(plain).join(" ");

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.fromTo(q(".hero-canvas"), { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1, duration: 2.6 }, 0)
          .fromTo(
            q(".hero-word"),
            // y:0 resets the px offset GSAP would otherwise read from the CSS pre-hide state
            { y: 0, yPercent: 115, rotate: 3 },
            { y: 0, yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.075 },
            0.05,
          )
          .fromTo(
            q(".hero-reel"),
            { clipPath: "inset(0% 50% 0% 50% round 999px)" },
            { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 1.5, ease: "expo.inOut" },
            0.55,
          )
          .fromTo(q(".hero-fade"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.4, stagger: 0.09 }, 0.75);
        const cancel = gate.when(() => tl.play());

        // scroll-out parallax
        const st = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".hero-title"), { yPercent: -22, opacity: 0.1, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero-bg"), { yPercent: 25, scale: 1.08, ease: "none", scrollTrigger: st });
        gsap.to(q(".hero-bottom"), { opacity: 0, y: -40, ease: "none", scrollTrigger: { ...st, end: "40% top" } });

        return () => cancel();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden pt-[var(--nav-h)]"
    >
      {/* WebGL background */}
      <div className="hero-bg absolute inset-0 -z-0 will-change-transform">
        <div className="hero-canvas intro-fade absolute inset-0">
          <ShaderCanvas />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_8_10/0.55)_0%,rgb(8_8_10/0.15)_45%,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/30 to-ink/75 md:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex flex-1 flex-col justify-end pb-12 pt-8 md:justify-center md:py-10">
        <div className="hero-fade intro-fade eyebrow mb-6 flex items-center gap-3 text-bone/70 md:mb-10">
          <Avatar src={avatar} name={site.name} monogram={site.monogram} size={40} />
          <span>
            {site.name} <span className="text-bone/40">·</span> {site.role}
          </span>
        </div>

        <h1
          aria-label={title}
          className="hero-title headline text-[clamp(3.1rem,10.4vw,12.5rem)] will-change-[transform,opacity]"
        >
          {site.hero.lines.map((line, li) => {
            const tokens = tokenize(line);
            return (
              <span key={li} className="block">
                {tokens.map((t, i) => (
                  <Fragment key={i}>
                    {t.reel ? (
                      <TLink
                        href="#work"
                        aria-label="Jump to selected work"
                        data-cursor-label="Watch"
                        className="hero-reel intro-clip relative mx-[0.04em] inline-block h-[0.74em] w-[1.75em] translate-y-[0.02em] overflow-hidden rounded-full align-baseline ring-1 ring-white/15"
                      >
                        <DemoVideo
                          src={showreel}
                          poster={showreelPoster}
                          preload="auto"
                          accent="#ff6b3d"
                          seed="showreel"
                          variant="plain"
                          title="Showreel"
                        />
                      </TLink>
                    ) : (
                      <span className="mask" aria-hidden="true">
                        <span className={cn("mask-inner hero-word intro-word", t.em && "serif-em pr-[0.04em]")}>
                          {t.text}
                        </span>
                      </span>
                    )}
                    {i < tokens.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            );
          })}
        </h1>

        <div className="mt-7 grid gap-6 md:mt-14 md:grid-cols-12 md:items-end md:gap-8">
          <p className="hero-fade intro-fade max-w-md text-[clamp(1rem,1.35vw,1.3rem)] leading-relaxed text-bone/75 md:col-span-6 lg:col-span-4">
            {site.hero.intro}
          </p>
          <div className="hero-fade intro-fade flex items-center gap-2 sm:gap-3 md:col-span-6 md:justify-end lg:col-span-8">
            <Magnetic>
              <TLink href="#work" className="btn-pill is-solid roll-trigger" data-cursor-label="Explore">
                <Roll>View work</Roll>
                <ArrowDown className="size-4" />
              </TLink>
            </Magnetic>
            <Magnetic>
              <TLink href="#contact" className="btn-pill roll-trigger">
                <Roll>Let&apos;s talk</Roll>
                <ArrowUpRight className="size-4" />
              </TLink>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-bottom container-x relative hidden pb-7 sm:block">
        <div className="hero-fade intro-fade eyebrow flex items-center justify-between gap-6 border-t border-white/10 pt-5 text-bone/60">
          <span className="flex items-center gap-3">
            <span className="relative block h-8 w-px overflow-hidden bg-white/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(0.76,0,0.24,1)_infinite] bg-bone" />
            </span>
            Scroll to explore
          </span>
          <span className="hidden sm:inline">{site.location}</span>
          <span>({String(projectCount).padStart(2, "0")}) Selected projects</span>
        </div>
      </div>
    </section>
  );
}
