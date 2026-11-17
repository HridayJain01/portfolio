"use client";

import { useEffect, useRef } from "react";

/** Thin accent bar across the top of the screen showing how far you've read. */
export default function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = bar.current;
      if (!el) return;
      const article = el.closest("article");
      if (!article) return;
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span aria-hidden="true" className="fixed inset-x-0 top-0 z-[65] h-[3px]">
      <span ref={bar} className="block h-full origin-left scale-x-0 bg-accent" />
    </span>
  );
}
