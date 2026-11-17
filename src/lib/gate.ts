/**
 * The "gate" holds entrance animations until the screen is actually visible:
 * closed while the preloader or a page-transition curtain covers the page,
 * opened the moment the content is revealed.
 */
type Fn = () => void;

let open = false;
const waiters = new Set<Fn>();

export const gate = {
  isOpen: () => open,
  open() {
    open = true;
    const list = [...waiters];
    waiters.clear();
    list.forEach((fn) => fn());
  },
  close() {
    open = false;
  },
  /** Runs `fn` now if the gate is open, otherwise as soon as it opens. Returns a cancel function. */
  when(fn: Fn) {
    if (open) {
      fn();
      return () => {};
    }
    waiters.add(fn);
    return () => {
      waiters.delete(fn);
    };
  },
};
