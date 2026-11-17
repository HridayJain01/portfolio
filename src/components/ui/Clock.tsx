"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 10_000);
  return () => window.clearInterval(id);
}

/** Live local time in a given IANA time zone. Renders a placeholder on the server. */
export default function Clock({ timeZone, className }: { timeZone: string; className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());
      } catch {
        return "--:--";
      }
    },
    () => "--:--",
  );
  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}

const noop = () => () => {};

/** Current year, client-side (keeps the server render free of clock reads). */
export function Year() {
  const year = useSyncExternalStore(
    noop,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <>{year}</>;
}
