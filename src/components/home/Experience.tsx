import fs from "node:fs";
import path from "node:path";
import { linkedin, site } from "@/content/site";
import { experience } from "@/content/experience";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";
import ExperienceList from "./ExperienceList";

export default function Experience() {
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", site.resume.replace(/^\//, "")));

  return (
    <section id="experience" aria-labelledby="experience-title" className="container-x section-pad">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div>
          <SectionLabel index="03" label="Experience" />
          <RevealText
            id="experience-title"
            text="Places I've left *a mark*"
            className="headline mt-5 text-[clamp(2.5rem,8.5vw,9rem)] md:mt-8"
          />
        </div>
        <Reveal>
          <Magnetic strength={0.3}>
            {hasResume ? (
              <a href={site.resume} download className="btn-pill is-solid roll-trigger" data-cursor-label="PDF">
                Download résumé <ArrowDown className="size-4" />
              </a>
            ) : linkedin ? (
              <a href={linkedin} target="_blank" rel="noreferrer" className="btn-pill is-solid">
                View LinkedIn <ArrowUpRight className="size-4" />
              </a>
            ) : null}
          </Magnetic>
        </Reveal>
      </div>

      <ExperienceList roles={experience} />

      <Reveal className="mt-10 grid gap-4 md:mt-[clamp(4rem,8vw,7rem)] lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow text-mute lg:col-span-4">Toolbox</p>
        <ul className="flex flex-wrap gap-2 lg:col-span-8 lg:gap-2.5">
          {site.tools.map((t) => (
            <li
              key={t}
              data-reveal-item
              className="rounded-full border border-line px-3 py-1.5 text-[0.85rem] text-bone/85 transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink md:px-4 md:py-2.5 md:text-[0.95rem]"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
