"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { coverScreen } from "@/lib/curtain";
import { scrollToTarget } from "@/lib/lenis";

type Props = ComponentProps<typeof Link> & {
  /** Text shown on the page-transition curtain. */
  transitionLabel?: string;
};

/**
 * Drop-in `next/link` that plays the curtain transition between pages
 * and smooth-scrolls for in-page hash links.
 */
export default function TLink({ href, onClick, transitionLabel, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (rest.target && rest.target !== "_self") return;

    const raw = typeof href === "string" ? href : `${href.pathname ?? pathname}${href.hash ? `#${href.hash}` : ""}`;
    const url = new URL(raw, window.location.href);
    if (url.origin !== window.location.origin) return;

    e.preventDefault();

    if (url.pathname === pathname) {
      if (url.hash) {
        scrollToTarget(decodeURIComponent(url.hash));
        window.history.replaceState(null, "", url.hash);
      } else {
        scrollToTarget(0);
      }
      return;
    }

    coverScreen(transitionLabel).then(() => {
      router.push(url.pathname + url.search + url.hash);
    });
  };

  return <Link href={href} onClick={handle} {...rest} />;
}
