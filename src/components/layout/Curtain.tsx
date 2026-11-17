"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { gate } from "@/lib/gate";
import { registerCurtain } from "@/lib/curtain";
import { setScrollLock } from "@/lib/scroll";

/**
 * Page-transition curtain. TLink calls cover(), which sweeps a panel up over the
 * screen; once the new route renders, the panel lifts away and the gate opens.
 */
export default function Curtain() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const covered = useRef(false);
  const last = useRef(pathname);
  const safety = useRef<number | undefined>(undefined);
  const revealRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = () => {
      const el = root.current;
      if (!el || !covered.current) return;
      covered.current = false;
      window.clearTimeout(safety.current);
      setScrollLock("curtain", false);
      if (window.location.hash) {
        const target = document.querySelector(decodeURIComponent(window.location.hash));
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo(0, top);
        }
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
      gate.open();
      if (reduce) {
        gsap.set(el, { visibility: "hidden" });
        return;
      }
      gsap
        .timeline()
        .to(label.current, { yPercent: -110, duration: 0.5, ease: "expo.in" })
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.25")
        .set(el, { visibility: "hidden" });
    };

    registerCurtain({
      cover: (text) =>
        new Promise<void>((resolve) => {
          const el = root.current;
          if (!el) return resolve();
          if (label.current) label.current.textContent = text ?? "";
          gate.close();
          setScrollLock("curtain", true);
          covered.current = true;
          // never leave the screen covered if navigation stalls
          safety.current = window.setTimeout(reveal, 6000);
          if (reduce) {
            gsap.set(el, { visibility: "visible", clipPath: "inset(0% 0% 0% 0%)" });
            return resolve();
          }
          gsap
            .timeline({ onComplete: () => resolve() })
            .set(el, { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" })
            .set(label.current, { yPercent: 110 })
            .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
            .to(label.current, { yPercent: 0, duration: 0.7, ease: "expo.out" }, "-=0.35");
        }),
    });

    revealRef.current = reveal;
    return () => {
      registerCurtain(null);
      window.clearTimeout(safety.current);
    };
  }, []);

  useEffect(() => {
    if (pathname === last.current) return;
    last.current = pathname;
    if (!covered.current) return;
    // two frames so the new page has laid out before we lift the curtain
    let id2 = 0;
    const id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => revealRef.current());
    });
    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, [pathname]);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="invisible fixed inset-0 z-[80] grid place-items-center bg-ink-2"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,rgb(138_108_255/0.18),transparent_70%)]" />
      <span className="absolute inset-x-0 bottom-0 h-px bg-accent/60" />
      <span className="overflow-hidden px-6 text-center">
        <span ref={label} className="headline block text-[clamp(2.5rem,8vw,7rem)]" />
      </span>
    </div>
  );
}
