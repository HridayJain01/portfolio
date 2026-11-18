"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { isProgrammaticScroll, setScrollLock } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import Clock from "@/components/ui/Clock";
import Magnetic from "@/components/ui/Magnetic";
import { contact, site } from "@/content/site";

const LINKS = [
  { href: "/#work", label: "Work", match: "/work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Writing", match: "/blog" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);

  // hide on scroll down, show on scroll up (state only changes when it actually flips)
  useEffect(() => {
    let lastY = window.scrollY;
    let isHidden = false;
    let isScrolled = false;
    const hide = (v: boolean) => {
      if (v !== isHidden) {
        isHidden = v;
        setHidden(v);
      }
    };
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 40 !== isScrolled) {
        isScrolled = y > 40;
        setScrolled(isScrolled);
      }
      // jumps and link-driven glides (anchor links, route changes): keep the nav visible
      if (Math.abs(y - lastY) > 400 || isProgrammaticScroll()) hide(false);
      else if (y > lastY + 6 && y > 200) hide(true);
      else if (y < lastY - 6 || y < 200) hide(false);
      lastY = y;
    };
    // reveal when the cursor approaches the top edge
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.clientY < 90) hide(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    const init = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(init);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  // mobile menu timeline
  useEffect(() => {
    const el = overlay.current;
    if (!el) return;
    const items = el.querySelectorAll(".menu-item");
    const fades = el.querySelectorAll(".menu-fade");
    tl.current = gsap
      .timeline({ paused: true })
      .set(el, { visibility: "visible" })
      .fromTo(
        el,
        { clipPath: "circle(0% at 100% 0%)" },
        { clipPath: "circle(150% at 100% 0%)", duration: 1.1, ease: "expo.inOut" },
      )
      .fromTo(items, { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.06, ease: "expo.out" }, "-=0.55")
      .fromTo(fades, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.8");
    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      setScrollLock("menu", true);
      t.timeScale(1).play();
      const first = overlay.current?.querySelector<HTMLElement>("a");
      window.setTimeout(() => first?.focus({ preventScroll: true }), 400);
    } else {
      setScrollLock("menu", false);
      t.timeScale(1.6).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (match?: string) => (match ? pathname.startsWith(match) : false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] text-bone transition-transform duration-700 ease-out-expo",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[calc(var(--nav-h)+2.5rem)] bg-gradient-to-b from-ink/90 via-ink/60 to-transparent transition-opacity duration-700",
            scrolled && !open ? "opacity-100" : "opacity-0",
          )}
        />
        <nav aria-label="Main" className="container-x relative grid h-[var(--nav-h)] grid-cols-12 items-center gap-4">
          <div className="col-span-6 md:col-span-3">
            <TLink
              href="/"
              transitionLabel="Home"
              className="roll-trigger inline-flex items-start gap-1 text-[0.95rem] font-medium tracking-tight"
            >
              <Roll>{site.name}</Roll>
              <span className="text-[0.6rem] leading-none">©</span>
            </TLink>
          </div>

          <div className="eyebrow hidden items-center gap-3 md:col-span-3 md:flex">
            <span className="pulse-dot" aria-hidden="true" />
            <span>{site.availability}</span>
          </div>

          <div className="eyebrow hidden items-center gap-2 lg:col-span-2 lg:flex">
            <span className="text-bone/60">Local</span>
            <Clock timeZone={site.timeZone} className="tabular-nums" />
          </div>

          <ul className="col-span-6 hidden items-center justify-end gap-7 text-[0.9rem] md:col-span-6 md:flex lg:col-span-4">
            {LINKS.map((l) => (
              <li key={l.label}>
                <TLink
                  href={l.href}
                  transitionLabel={l.label}
                  className="roll-trigger relative inline-flex items-center"
                  aria-current={isActive(l.match) ? "page" : undefined}
                >
                  <Roll>{l.label}</Roll>
                  {isActive(l.match) && (
                    <span className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-bone" />
                  )}
                </TLink>
              </li>
            ))}
          </ul>

          <div className="col-span-6 flex justify-end md:hidden">
            <Magnetic strength={0.25}>
              <button
                ref={toggleBtn}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex items-center gap-3 rounded-full py-2 pl-3 text-[0.9rem]"
              >
                <span>{open ? "Close" : "Menu"}</span>
                <span className="relative block h-3 w-6" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute left-0 top-0.5 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                      open && "top-1.5 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute bottom-0.5 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                      open && "bottom-1.5 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </Magnetic>
          </div>
        </nav>
      </header>

      <div
        ref={overlay}
        id="mobile-menu"
        className="invisible fixed inset-0 z-[55] flex flex-col justify-between bg-ink-2 px-[var(--gutter)] pb-10 pt-[calc(var(--nav-h)+2rem)] md:hidden"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_100%_0%,rgb(138_108_255/0.25),transparent_70%)]" />
        <ul className="relative flex flex-col gap-1">
          {LINKS.map((l, i) => (
            <li key={l.label} className="overflow-hidden">
              <TLink
                href={l.href}
                transitionLabel={l.label}
                onClick={() => setOpen(false)}
                className="menu-item headline flex items-baseline gap-4 py-1 text-[clamp(3rem,15vw,5.5rem)]"
              >
                <span className="eyebrow translate-y-[-1.2em] text-mute">0{i + 1}</span>
                {l.label}
              </TLink>
            </li>
          ))}
        </ul>
        <div className="relative space-y-6">
          <a
            href={contact.href}
            {...(contact.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="menu-fade block text-xl"
          >
            {contact.display}
          </a>
          <ul className="menu-fade flex flex-wrap gap-x-6 gap-y-2 text-mute">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-fade eyebrow flex items-center gap-3 text-mute">
            <span className="pulse-dot" /> {site.availability}
          </div>
        </div>
      </div>
    </>
  );
}
