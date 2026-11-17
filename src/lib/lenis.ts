import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (el === null) return;
  if (instance) {
    instance.scrollTo(el, { duration: 1.6, immediate, force: true });
    return;
  }
  if (typeof el === "number") window.scrollTo({ top: el, behavior: immediate ? "auto" : "smooth" });
  else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}
