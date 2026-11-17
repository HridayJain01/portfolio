"use client";

import { useId, useState } from "react";
import type { Role } from "@/content/experience";
import Reveal from "@/components/ui/Reveal";
import { Plus } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export default function ExperienceList({ roles }: { roles: Role[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <Reveal as="ul" className="mt-8 border-t border-line md:mt-[clamp(3rem,6vw,5rem)]" stagger={0.08}>
      {roles.map((r, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        return (
          <li key={r.company + r.period} data-reveal-item className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="row group relative isolate grid w-full grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 text-left transition-[padding] duration-700 ease-out-expo md:grid-cols-12 md:px-2 md:py-9 md:hover:px-6"
            >
              <span className="row-fill" />
              <span className="row-mute eyebrow hidden text-mute md:col-span-2 md:block">{r.period}</span>
              <span className="text-[clamp(1.35rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.035em] md:col-span-5">
                {r.company}
              </span>
              <span className="row-mute hidden text-mute md:col-span-4 md:block">
                {r.role} <span className="hidden text-dim xl:inline">· {r.location}</span>
              </span>
              <span className="row-start-1 col-start-2 justify-self-end md:col-span-1 md:col-start-auto md:row-start-auto">
                <span
                  className={cn(
                    "grid size-9 place-items-center rounded-full border border-current/20 transition-transform duration-700 ease-out-expo md:size-11",
                    isOpen && "rotate-[135deg]",
                  )}
                >
                  <Plus className="size-4 md:size-5" />
                </span>
              </span>
              <span className="row-mute col-span-2 text-[0.85rem] text-mute md:hidden">
                {r.role} · {r.period}
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-label={`${r.company} details`}
              className="grid transition-[grid-template-rows] duration-700 ease-out-expo"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-5 pb-6 md:grid-cols-12 md:gap-8 md:px-6 md:pb-10">
                  <p className="leading-relaxed text-bone/80 md:col-span-5 md:col-start-3 md:text-lg">{r.summary}</p>
                  <div className="md:col-span-5">
                    <ul className="space-y-2 md:space-y-3">
                      {r.achievements.map((a) => (
                        <li key={a} className="flex gap-3 text-[0.95rem] text-mute md:text-base">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-6 hidden flex-wrap gap-2 md:flex">
                      {r.tags.map((t) => (
                        <li key={t} className="eyebrow rounded-full border border-line px-3 py-2 text-mute">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </Reveal>
  );
}
