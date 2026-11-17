"use client";

import { scrollToTarget } from "@/lib/lenis";
import { ArrowUpRight } from "@/components/ui/icons";
import Roll from "@/components/ui/Roll";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      className="roll-trigger group inline-flex items-center gap-2"
    >
      <Roll>Back to top</Roll>
      <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-500 group-hover:-translate-y-1 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
        <ArrowUpRight className="size-4 -rotate-45" />
      </span>
    </button>
  );
}
