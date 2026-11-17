import { site } from "@/content/site";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrubText from "@/components/ui/ScrubText";
import Reveal from "@/components/ui/Reveal";
import RevealText from "@/components/ui/RevealText";
import Counter from "@/components/ui/Counter";
import Portrait from "./Portrait";
import { pad } from "@/lib/utils";

export default function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="container-x py-[clamp(6rem,12vw,11rem)]">
      <SectionLabel index="02" label="About" />
      <h2 id="about-title" className="sr-only">
        About
      </h2>

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <ScrubText
            text={about.statement}
            className="text-[clamp(1.75rem,3.7vw,3.6rem)] font-normal leading-[1.12] tracking-[-0.025em]"
          />
        </div>
        <div className="lg:col-span-4 lg:pl-6">
          <Portrait src={about.portrait} monogram={site.monogram} name={site.name} caption={site.location} />
        </div>
      </div>

      <Reveal className="mt-[clamp(4rem,9vw,8rem)] grid border-t border-line sm:grid-cols-3" stagger={0.12}>
        {about.stats.map((s) => (
          <div
            key={s.label}
            data-reveal-item
            className="border-b border-line py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
          >
            <Counter
              value={s.value}
              suffix={s.suffix}
              className="headline block text-[clamp(4rem,8vw,7.5rem)] tabular-nums"
            />
            <p className="eyebrow mt-4 text-mute">{s.label}</p>
          </div>
        ))}
      </Reveal>

      <div className="mt-[clamp(5rem,10vw,9rem)] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-mute">What I do</p>
          <RevealText
            as="h3"
            text="Design, code & *everything* in between."
            className="headline mt-6 max-w-sm text-[clamp(2.25rem,3.6vw,3.5rem)] leading-[1]"
          />
        </div>
        <Reveal as="ul" className="border-t border-line lg:col-span-8" stagger={0.1}>
          {about.services.map((s, i) => (
            <li key={s.title} data-reveal-item className="row group relative isolate border-b border-line">
              <span className="row-fill" />
              <div className="grid grid-cols-12 items-baseline gap-4 px-2 py-7 transition-[padding] duration-700 ease-out-expo md:group-hover:px-6">
                <span className="row-mute eyebrow col-span-2 text-dim md:col-span-1">{pad(i + 1)}</span>
                <span className="col-span-10 text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.03em] md:col-span-5">
                  {s.title}
                </span>
                <span className="row-mute col-span-12 text-mute md:col-span-6 md:col-start-7">{s.text}</span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
