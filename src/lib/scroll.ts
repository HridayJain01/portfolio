/**
 * Native-scroll helpers. The page uses the browser's own scrolling (no JS scroll
 * hijacking), so scrolling stays on the compositor thread and never stutters
 * when the main thread is busy.
 */

let programmaticUntil = 0;

/** True while a scroll we started ourselves (link, back-to-top) is still gliding. */
export function isProgrammaticScroll() {
  return performance.now() < programmaticUntil;
}

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  programmaticUntil = performance.now() + 1500;
  let top: number;
  if (typeof target === "number") {
    top = target;
  } else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: immediate || reduce ? "auto" : "smooth" });
}

/**
 * Named scroll locks (preloader, menu, page transition). Each owner toggles its own
 * key, so overlapping locks can never leave the page stuck.
 */
const locks = new Set<string>();

export function setScrollLock(key: string, locked: boolean) {
  if (locked) locks.add(key);
  else locks.delete(key);
  document.documentElement.classList.toggle("scroll-locked", locks.size > 0);
}
