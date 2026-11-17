"use client";

import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Scales a single line of text to exactly fill its container's width. */
export default function FitText({ text, className }: { text: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const b = box.current;
    const l = line.current;
    if (!b || !l) return;
    const fit = () => {
      l.style.fontSize = "100px";
      const w = l.scrollWidth;
      if (w > 0) l.style.fontSize = `${(100 * b.clientWidth) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(b);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [text]);

  return (
    <div ref={box} className={cn("w-full overflow-hidden", className)}>
      <span ref={line} className="block w-max whitespace-nowrap text-[18vw] leading-[0.8]">
        {text}
      </span>
    </div>
  );
}
