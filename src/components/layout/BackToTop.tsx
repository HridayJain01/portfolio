"use client";

import { scrollToTarget } from "@/lib/scroll";
import { ArrowUpRight } from "@/components/ui/icons";
import Roll from "@/components/ui/Roll";

export default function BackToTop({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(0)}
      aria-label="Back to top"
      className="roll-trigger group inline-flex shrink-0 items-center gap-2 text-bone"
    >
      {compact ? <span>Top</span> : <Roll>Back to top</Roll>}
      <span className="grid size-9 place-items-center rounded-full border border-line transition-all duration-500 group-hover:-translate-y-1 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
        <ArrowUpRight className="size-4 -rotate-45" />
      </span>
    </button>
  );
}
