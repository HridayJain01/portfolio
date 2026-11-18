import { site } from "@/content/site";
import { resolveMedia } from "@/lib/media";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrubText from "@/components/ui/ScrubText";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Counter from "@/components/ui/Counter";
import Portrait from "./Portrait";
import Avatar from "@/components/ui/Avatar";
import { pad } from "@/lib/utils";

export default function About() {
  const { about } = site;
  const portrait = resolveMedia(about.portrait);
  return (
    <section id="about" aria-labelledby="about-title" className="container-x section-pad">
      <div className="flex items-center justify-between gap-4">
        <SectionLabel index="02" label="About" />
        <Avatar
          src={resolveMedia(about.avatar)}
          name={site.name}
          monogram={site.monogram}
          size={52}
          className="lg:hidden"
        />
      </div>
      <h2 id="about-title" className="sr-only">
        About
      </h2>

      <div className="mt-6 grid gap-14 lg:mt-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <ScrubText
            text={about.statement}
            className="text-[clamp(1.4rem,3.7vw,3.6rem)] font-normal leading-[1.15] tracking-[-0.025em]"
          />
        </div>
        <div className="hidden lg:col-span-4 lg:block lg:pl-6">
          <Portrait src={portrait} monogram={site.monogram} name={site.name} caption={site.location} />
        </div>
      </div>

      <Reveal
        className="mt-10 grid grid-cols-3 border-y border-line lg:mt-[clamp(4rem,9vw,8rem)] lg:border-b-0"
        stagger={0.12}
      >
        {about.stats.map((s) => (
          <div
            key={s.label}
            data-reveal-item
            className="border-r border-line px-3 py-5 first:pl-0 last:border-r-0 sm:px-8 sm:py-8"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="headline block text-[clamp(2.1rem,8vw,7.5rem)] tabular-nums"
            />
            <p className="eyebrow mt-2 text-[0.6rem] leading-snug text-mute sm:mt-4 sm:text-[0.72rem]">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-12 grid gap-5 lg:mt-[clamp(5rem,10vw,9rem)] lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-mute">What I do</p>
          <RevealText
            as="h3"
            text="Design, code & *everything* in between."
            className="headline mt-6 hidden max-w-sm text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1] lg:block"
          />
        </div>
        <Reveal as="ul" className="border-t border-line lg:col-span-8" stagger={0.1}>
          {about.services.map((s, i) => (
            <li key={s.title} data-reveal-item className="row group relative isolate border-b border-line">
              <span className="row-fill" />
              <div className="grid grid-cols-[2rem_1fr] items-baseline gap-x-3 gap-y-1 py-4 transition-[padding] duration-700 ease-out-expo md:grid-cols-12 md:gap-4 md:px-2 md:py-7 md:group-hover:px-6">
                <span className="row-mute eyebrow text-dim md:col-span-1">{pad(i + 1)}</span>
                <span className="text-[clamp(1.25rem,3vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.03em] md:col-span-5">
                  {s.title}
                </span>
                <span className="row-mute col-start-2 text-[0.9rem] leading-snug text-mute md:col-span-6 md:col-start-7 md:text-base">
                  {s.text}
                </span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
