import type { CSSProperties, ReactNode } from "react";
import type { SideProject } from "@/content/projects";
import { resolveMedia } from "@/lib/media";
import Reveal from "@/components/ui/Reveal";
import DemoVideo from "@/components/media/DemoVideo";
import { ArrowUpRight } from "@/components/ui/icons";

/** Compact grid of smaller hobby builds: 2 columns on phones, 3 on desktop. */
export default function SideProjects({ items }: { items: SideProject[] }) {
  if (!items.length) return null;
  return (
    <div className="mt-16 md:mt-[clamp(5rem,9vw,8rem)]">
      <div className="mb-6 flex items-end justify-between gap-6 md:mb-10">
        <div>
          <p className="eyebrow text-mute">Hobby apps & experiments</p>
          <h3 className="mt-3 text-[clamp(1.75rem,3.5vw,3.25rem)] font-medium leading-none tracking-[-0.035em]">
            Built for <span className="serif-em">fun</span>
          </h3>
        </div>
        <p className="hidden max-w-xs text-mute md:block">
          Side builds where I try new ideas, from on-device AI to real-time multiplayer.
        </p>
      </div>

      <Reveal as="ul" className="grid grid-cols-2 gap-x-3 gap-y-7 md:gap-x-5 lg:grid-cols-3" stagger={0.08} y={40}>
        {items.map((p) => {
          const card: ReactNode = (
            <>
              <div className="relative aspect-video overflow-hidden rounded-[clamp(0.9rem,1.6vw,1.5rem)] bg-ink-2 ring-1 ring-line">
                <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]">
                  <DemoVideo
                    src={resolveMedia(p.video)}
                    accent={p.accent}
                    seed={p.slug}
                    title={p.title}
                    variant="plain"
                  />
                </div>
                <span className="serif-em pointer-events-none absolute bottom-2 left-3 text-[clamp(1.6rem,3.2vw,2.6rem)] leading-none text-bone/85">
                  {p.title.charAt(0)}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <h4 className="text-[clamp(1.05rem,1.8vw,1.6rem)] font-medium leading-tight tracking-[-0.02em]">
                  {p.title}
                </h4>
                {p.href ? (
                  <ArrowUpRight className="size-4 shrink-0 text-mute transition-transform duration-500 group-hover:rotate-45 group-hover:text-bone" />
                ) : (
                  <span className="eyebrow shrink-0 text-dim">Private</span>
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-[0.85rem] leading-snug text-mute md:text-[0.95rem]">{p.tagline}</p>
              <p className="eyebrow mt-3 hidden text-dim md:block">{p.stack.join(" · ")}</p>
            </>
          );
          return (
            <li key={p.slug} data-reveal-item style={{ "--a": p.accent } as CSSProperties}>
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="GitHub"
                  aria-label={`${p.title} on GitHub`}
                  className="group block"
                >
                  {card}
                </a>
              ) : (
                <div className="group">{card}</div>
              )}
            </li>
          );
        })}
      </Reveal>
    </div>
  );
}
