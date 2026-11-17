import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import Magnetic from "@/components/ui/Magnetic";
import SectionLabel from "@/components/ui/SectionLabel";
import VideoPlayer from "@/components/media/VideoPlayer";
import DemoVideo from "@/components/media/DemoVideo";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/icons";
import { pad } from "@/lib/utils";
import { resolveMedia } from "@/lib/media";
import PlayerReveal from "./PlayerReveal";

export default function CaseStudy({
  project: p,
  next,
  index,
  total,
}: {
  project: Project;
  next: Project;
  index: number;
  total: number;
}) {
  return (
    <article style={{ "--a": p.accent } as CSSProperties}>
      {/* ── Header ── */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+clamp(1.25rem,6vw,5rem))]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 opacity-70"
          style={{
            background: `radial-gradient(50% 60% at 85% 0%, color-mix(in oklab, ${p.accent} 30%, transparent), transparent 70%)`,
          }}
        />
        <div className="container-x relative">
          <Reveal
            intro
            y={20}
            className="intro-fade eyebrow flex flex-wrap items-center justify-between gap-4 text-mute"
          >
            <TLink
              href="/#work"
              transitionLabel="Work"
              className="roll-trigger inline-flex items-center gap-2 text-bone"
            >
              <ArrowLeft className="size-4" />
              <Roll>All work</Roll>
            </TLink>
            <span>
              ({pad(index + 1)}/{pad(total)}) · {p.category} · {p.year}
            </span>
          </Reveal>

          <RevealText
            as="h1"
            mode="intro"
            text={p.title}
            className="headline mt-[clamp(1.75rem,6vw,5rem)] text-[clamp(4.5rem,17vw,18rem)] leading-[0.85]"
          />

          <div className="mt-6 grid gap-8 pb-10 md:mt-10 md:gap-10 md:pb-[clamp(3rem,6vw,5rem)] lg:grid-cols-12">
            <RevealText
              as="p"
              mode="intro"
              delay={0.25}
              stagger={0.02}
              text={p.tagline}
              className="text-[clamp(1.3rem,2.8vw,2.6rem)] leading-[1.15] tracking-[-0.02em] lg:col-span-7"
            />
            <Reveal intro delay={0.45} y={24} className="intro-fade self-end lg:col-span-5">
              <MetaGrid project={p} />
            </Reveal>
          </div>
        </div>
      </header>

      {/* ── Main demo ── */}
      <section aria-label="Demo video" className="container-x">
        <PlayerReveal>
          <VideoPlayer
            src={resolveMedia(p.video)}
            fullSrc={resolveMedia(p.videoFull)}
            poster={resolveMedia(p.poster)}
            title={p.title}
            accent={p.accent}
            seed={p.slug}
          />
        </PlayerReveal>
      </section>

      {/* ── Overview ── */}
      <section aria-labelledby="overview" className="container-x section-pad">
        <SectionLabel index="01" label="Overview" />
        <div className="mt-6 grid gap-12 md:mt-10 lg:grid-cols-12">
          <RevealText
            id="overview"
            text={p.summary}
            stagger={0.015}
            className="text-[clamp(1.35rem,3.2vw,3rem)] font-normal leading-[1.15] tracking-[-0.025em] lg:col-span-9"
          />
        </div>
        <Reveal
          className="mt-10 grid gap-8 md:mt-[clamp(4rem,8vw,7rem)] md:grid-cols-2 md:gap-12 lg:gap-20"
          stagger={0.12}
        >
          <div data-reveal-item>
            <h2 className="eyebrow flex items-center gap-3 text-mute">
              <span className="size-1.5 rounded-full" style={{ background: p.accent }} /> The challenge
            </h2>
            <p className="mt-3 leading-relaxed text-bone/80 md:mt-5 md:text-xl">{p.challenge}</p>
          </div>
          <div data-reveal-item>
            <h2 className="eyebrow flex items-center gap-3 text-mute">
              <span className="size-1.5 rounded-full" style={{ background: p.accent }} /> The outcome
            </h2>
            <p className="mt-3 leading-relaxed text-bone/80 md:mt-5 md:text-xl">{p.outcome}</p>
          </div>
        </Reveal>
      </section>

      {/* ── Impact ── */}
      <section aria-label="Impact" className="container-x">
        <Reveal
          className="grid grid-cols-3 overflow-hidden rounded-[var(--radius-card)] border border-line"
          stagger={0.12}
        >
          {p.highlights.map((h) => (
            <div
              key={h.label}
              data-reveal-item
              className="relative border-r border-line p-[clamp(0.9rem,3vw,2.75rem)] last:border-r-0"
            >
              <p className="headline text-[clamp(1.6rem,6.5vw,6.5rem)]" style={{ color: p.accent }}>
                {h.value}
              </p>
              <p className="eyebrow mt-2 text-[0.6rem] leading-snug text-mute sm:mt-4 sm:text-[0.72rem]">{h.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Feature clips ── */}
      {p.clips && p.clips.length > 0 && (
        <section aria-labelledby="clips" className="container-x section-pad">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="02" label="In motion" />
              <RevealText
                id="clips"
                text="Feature *highlights*"
                className="headline mt-5 text-[clamp(2.25rem,6.5vw,6.5rem)] md:mt-8"
              />
            </div>
            <Reveal as="ul" className="space-y-2 md:space-y-3 lg:col-span-5" stagger={0.06}>
              {p.features.map((f) => (
                <li
                  key={f}
                  data-reveal-item
                  className="flex items-center gap-4 border-b border-line pb-2 text-[0.95rem] text-bone/85 md:pb-3 md:text-lg"
                >
                  <span className="size-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                  {f}
                </li>
              ))}
            </Reveal>
          </div>
          <Reveal
            className="mt-8 grid gap-6 md:mt-[clamp(3rem,6vw,5rem)] md:grid-cols-2 md:gap-[clamp(1rem,2vw,1.75rem)]"
            stagger={0.15}
            y={80}
          >
            {p.clips.map((c, i) => (
              <figure key={c.src} data-reveal-item className={i % 2 === 1 ? "md:mt-[clamp(3rem,8vw,8rem)]" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink-2 ring-1 ring-line">
                  <DemoVideo
                    src={resolveMedia(c.src)}
                    poster={resolveMedia(c.poster)}
                    accent={p.accent}
                    seed={`${p.slug}-${i}`}
                    title={c.caption}
                    label="Clip coming soon"
                    expandable
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-3 md:mt-4 md:gap-4">
                  <span className="eyebrow text-dim">{pad(i + 1)}</span>
                  <span className="text-bone/85 md:text-lg">{c.caption}</span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </section>
      )}

      {/* ── Next project ── */}
      <section
        aria-label="Next project"
        className="pb-10 pt-2 md:pb-[clamp(3rem,6vw,5rem)] md:pt-[clamp(3rem,6vw,5rem)]"
      >
        <div className="container-x">
          <TLink
            href={`/work/${next.slug}`}
            transitionLabel={next.title}
            data-cursor-label="Next"
            className="group relative block overflow-hidden rounded-[var(--radius-card)] ring-1 ring-line"
          >
            <div className="absolute inset-0 transition-transform duration-[1.6s] ease-out-expo group-hover:scale-105">
              <DemoVideo
                src={resolveMedia(next.video)}
                poster={resolveMedia(next.poster)}
                accent={next.accent}
                seed={next.slug}
                title={next.title}
                variant="plain"
              />
            </div>
            <div className="absolute inset-0 bg-ink/55 transition-colors duration-700 group-hover:bg-ink/30" />
            <div className="relative flex min-h-[clamp(13rem,45vw,36rem)] flex-col justify-between p-[clamp(1.25rem,3.5vw,3.5rem)]">
              <span className="eyebrow text-bone/80">Next project</span>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <span className="headline text-[clamp(3rem,12vw,12rem)] leading-[0.85]">{next.title}</span>
                <span className="grid size-[clamp(3rem,7vw,6rem)] place-items-center rounded-full bg-bone text-ink transition-transform duration-700 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight className="size-[40%]" />
                </span>
              </div>
            </div>
          </TLink>
        </div>
      </section>
    </article>
  );
}

function MetaGrid({ project: p }: { project: Project }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-sm md:gap-x-8 md:gap-y-6 md:pt-6">
      <div>
        <dt className="eyebrow text-dim">Role</dt>
        <dd className="mt-2 text-bone/90">{p.role}</dd>
      </div>
      <div>
        <dt className="eyebrow text-dim">{p.client ? "Client" : "Year"}</dt>
        <dd className="mt-2 text-bone/90">{p.client ?? p.year}</dd>
      </div>
      <div>
        <dt className="eyebrow text-dim">Stack</dt>
        <dd className="mt-2 text-bone/90">{p.stack.join(", ")}</dd>
      </div>
      <div>
        <dt className="eyebrow text-dim">Links</dt>
        <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
          {p.links?.live && (
            <Magnetic strength={0.2}>
              <a
                href={p.links.live}
                target="_blank"
                rel="noreferrer"
                className="roll-trigger inline-flex items-center gap-1 text-bone"
              >
                <Roll>Live site</Roll> <ArrowUpRight className="size-3.5" />
              </a>
            </Magnetic>
          )}
          {p.links?.repo && (
            <Magnetic strength={0.2}>
              <a
                href={p.links.repo}
                target="_blank"
                rel="noreferrer"
                className="roll-trigger inline-flex items-center gap-1 text-bone"
              >
                <Roll>Source</Roll> <ArrowUpRight className="size-3.5" />
              </a>
            </Magnetic>
          )}
          {!p.links?.live && !p.links?.repo && <span className="text-mute">Private</span>}
        </dd>
      </div>
    </dl>
  );
}
