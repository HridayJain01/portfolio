import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import DemoVideo from "@/components/media/DemoVideo";
import TLink from "@/components/ui/TLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { pad } from "@/lib/utils";

export default function WorkCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <li className="work-item sticky" style={{ top: `calc(var(--nav-h) + ${index * 0.9}rem)` } as CSSProperties}>
      <article
        className="work-card group relative h-[min(82svh,56rem)] min-h-[32rem] origin-top overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line"
        style={{ "--a": project.accent } as CSSProperties}
      >
        <div className="work-media absolute inset-0 will-change-transform">
          <div className="absolute inset-0 transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]">
            <DemoVideo
              src={project.video}
              poster={project.poster}
              accent={project.accent}
              seed={project.slug}
              title={project.title}
            />
          </div>
        </div>

        {/* legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" />
        <div className="work-dim pointer-events-none absolute inset-0 bg-ink opacity-0" />

        <div className="pointer-events-none relative z-[1] flex h-full flex-col justify-between p-[clamp(1.25rem,3vw,3rem)]">
          <div className="work-info eyebrow flex items-center justify-between gap-4 text-bone/80">
            <span>
              ({pad(index + 1)}/{pad(total)})
            </span>
            <span className="hidden sm:inline">{project.category}</span>
            <span>{project.year}</span>
          </div>

          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="work-info eyebrow mb-4 flex items-center gap-2 text-bone/70">
                <span className="size-2 rounded-full" style={{ background: project.accent }} />
                {project.role}
              </p>
              <h3 className="work-info headline text-[clamp(3.5rem,10vw,10rem)]">{project.title}</h3>
              <p className="work-info mt-4 max-w-xl text-[clamp(1.05rem,1.4vw,1.35rem)] leading-snug text-bone/80">
                {project.tagline}
              </p>
            </div>
            <div className="work-info flex flex-col gap-5 lg:col-span-4 lg:items-end">
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {project.stack.slice(0, 3).map((s) => (
                  <li
                    key={s}
                    className="eyebrow rounded-full border border-white/15 bg-black/20 px-3 py-2 text-bone/80 backdrop-blur-md"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-3 self-start rounded-full bg-bone px-5 py-3 text-sm text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-1 lg:self-end">
                View case study
                <ArrowUpRight className="size-4 transition-transform duration-700 ease-out-expo group-hover:rotate-45" />
              </span>
            </div>
          </div>
        </div>

        <TLink
          href={`/work/${project.slug}`}
          transitionLabel={project.title}
          data-cursor-label="View"
          aria-label={`${project.title}: view case study`}
          className="absolute inset-0 z-[2] rounded-[inherit]"
        />
      </article>
    </li>
  );
}
