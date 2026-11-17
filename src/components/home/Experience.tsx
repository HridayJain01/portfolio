import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
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
    <section id="experience" aria-labelledby="experience-title" className="container-x py-[clamp(6rem,12vw,11rem)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel index="03" label="Experience" />
          <RevealText
            id="experience-title"
            text="Places I've left *a mark*"
            className="headline mt-8 text-[clamp(3.25rem,9vw,9rem)]"
          />
        </div>
        <Reveal className="flex lg:col-span-4 lg:justify-end">
          <Magnetic strength={0.3}>
            {hasResume ? (
              <a href={site.resume} download className="btn-pill is-solid roll-trigger" data-cursor-label="PDF">
                Download résumé <ArrowDown className="size-4" />
              </a>
            ) : (
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent("Résumé request")}`}
                className="btn-pill is-solid"
              >
                Request résumé <ArrowUpRight className="size-4" />
              </a>
            )}
          </Magnetic>
        </Reveal>
      </div>

      <ExperienceList roles={experience} />

      <Reveal className="mt-[clamp(4rem,8vw,7rem)] grid gap-8 lg:grid-cols-12">
        <p className="eyebrow text-mute lg:col-span-4">Toolbox</p>
        <ul className="flex flex-wrap gap-2.5 lg:col-span-8">
          {site.tools.map((t) => (
            <li
              key={t}
              data-reveal-item
              className="rounded-full border border-line px-4 py-2.5 text-[0.95rem] text-bone/85 transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink"
            >
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
