"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor: a precise dot plus a trailing ring that grows over links and
 * shows a label over anything with `data-cursor-label="..."`.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"default" | "link" | "label">("default");
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = ring.current;
    const d = dot.current;
    if (!r || !d) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    let isHidden = true;
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      gsap.set(d, { x: e.clientX, y: e.clientY });
      rx(e.clientX);
      ry(e.clientY);
      if (isHidden) {
        isHidden = false;
        setHidden(false);
      }
    };

    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor-label]");
      if (labelled) {
        setLabel(labelled.dataset.cursorLabel ?? "");
        setState("label");
        return;
      }
      if (t?.closest("a, button, [role='button'], [role='slider'], label, summary")) {
        setState("link");
        return;
      }
      setState("default");
    };

    const leave = () => {
      isHidden = true;
      setHidden(true);
    };
    const enter = () => {
      isHidden = false;
      setHidden(false);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor" data-hidden={hidden} aria-hidden="true">
        <div className="cursor-ring" data-state={state}>
          <span className="cursor-label">{label}</span>
        </div>
      </div>
      <div ref={dot} className="cursor" data-hidden={hidden || state !== "default"} aria-hidden="true">
        <div className="cursor-dot" />
      </div>
    </>
  );
}
