import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { resolveMedia } from "@/lib/media";
import DemoVideo from "@/components/media/DemoVideo";
import TLink from "@/components/ui/TLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { pad } from "@/lib/utils";

export default function WorkCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <li className="work-card md:even:mt-[clamp(3rem,6vw,6rem)]">
      <TLink
        href={`/work/${p.slug}`}
        transitionLabel={p.title}
        data-cursor-label="View"
        aria-label={`${p.title}: view case study`}
        className="group block"
        style={{ "--a": p.accent } as CSSProperties}
      >
        <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line">
          <div className="work-media absolute inset-x-0 -inset-y-[6%]">
            <div className="absolute inset-0 transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]">
              <DemoVideo
                src={resolveMedia(p.video)}
                poster={resolveMedia(p.poster)}
                accent={p.accent}
                seed={p.slug}
                title={p.title}
              />
            </div>
          </div>
          <span className="eyebrow absolute left-4 top-4 hidden rounded-full bg-ink/70 px-2.5 py-1.5 text-bone/80 md:block">
            {pad(index + 1)}
          </span>
          <span className="absolute bottom-4 right-4 hidden translate-y-2 items-center gap-2 rounded-full bg-bone px-4 py-2.5 text-sm text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 md:inline-flex">
            View case study <ArrowUpRight className="size-4" />
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4 md:mt-6">
          <h3 className="text-[clamp(1.6rem,3.2vw,3.25rem)] font-medium leading-none tracking-[-0.035em]">{p.title}</h3>
          <span className="eyebrow shrink-0 text-mute">
            <span className="hidden md:inline">{p.category} · </span>
            {p.year}
          </span>
        </div>
        <p className="mt-2 line-clamp-1 text-[0.95rem] text-mute md:mt-3 md:line-clamp-2 md:text-lg">{p.tagline}</p>
      </TLink>
    </li>
  );
}
