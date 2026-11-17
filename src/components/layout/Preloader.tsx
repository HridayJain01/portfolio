"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { gate } from "@/lib/gate";
import { getLenis } from "@/lib/lenis";

/**
 * First-visit intro: a counter runs to 100 while the name rises in,
 * then the panel lifts away and the gate opens for the page's entrance.
 * Skipped for the rest of the session and for reduced-motion users.
 */
export default function Preloader({ name, role }: { name: string; role: string }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el) return;

    if (html.hasAttribute("data-seen")) {
      el.style.display = "none";
      gate.open();
      return;
    }

    html.classList.add("is-loading");
    getLenis()?.stop();
    const letters = el.querySelectorAll(".pl-letter");
    const fades = el.querySelectorAll(".pl-fade");
    const n = { v: 0 };

    const finish = () => {
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
      html.classList.remove("is-loading");
      html.setAttribute("data-seen", "");
      getLenis()?.start();
      gate.open();
    };

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(letters, { yPercent: 110 }, { yPercent: 0, duration: 1.3, stagger: 0.035 }, 0.15)
      .fromTo(fades, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.3)
      .to(
        n,
        {
          v: 100,
          duration: 2,
          ease: "power3.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(3, "0");
          },
        },
        0,
      )
      .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: "power3.inOut" }, 0)
      .addLabel("out", "+=0.15")
      .to(letters, { yPercent: -110, duration: 0.9, stagger: 0.02, ease: "expo.in" }, "out")
      .to(fades, { opacity: 0, duration: 0.4, ease: "power2.in" }, "out")
      .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.15, ease: "expo.inOut" }, "out+=0.55")
      .add(finish, "out+=0.95")
      .set(el, { display: "none" });

    return () => {
      tl.kill();
      if (html.classList.contains("is-loading")) finish();
    };
  }, []);

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[90] flex-col justify-between bg-ink p-[var(--gutter)] text-bone"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_55%,rgb(255_107_61/0.14),transparent_70%)]" />
      <div className="eyebrow pl-fade relative flex justify-between text-mute">
        <span>{role}</span>
        <span>Portfolio</span>
      </div>
      <div className="relative self-center text-center">
        <div className="headline flex justify-center overflow-hidden text-[clamp(3rem,10vw,9rem)]">
          {Array.from(name).map((ch, i) => (
            <span key={i} className="pl-letter inline-block whitespace-pre">
              {ch}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="flex items-end justify-between">
          <span className="eyebrow pl-fade text-mute">Loading experience</span>
          <span ref={count} className="headline text-[clamp(3.5rem,9vw,8rem)] tabular-nums leading-none">
            000
          </span>
        </div>
        <span className="mt-6 block h-px w-full bg-line">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-accent" />
        </span>
      </div>
    </div>
  );
}
