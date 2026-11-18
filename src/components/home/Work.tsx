import { sideProjects, type Project } from "@/content/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import WorkGrid from "@/components/work/WorkGrid";
import WorkCard from "@/components/work/WorkCard";
import SideProjects from "@/components/work/SideProjects";

export default function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="container-x section-pad">
      <div className="mb-8 flex items-end justify-between gap-10 md:mb-[clamp(3rem,6vw,5rem)]">
        <div>
          <SectionLabel index="01" label="Selected work" />
          <RevealText
            id="work-title"
            text="Selected *work*"
            className="headline mt-5 text-[clamp(2.75rem,8.5vw,9rem)] md:mt-8"
          />
        </div>
        <Reveal className="hidden max-w-sm pb-3 lg:block">
          <p className="text-lg leading-relaxed text-mute">
            Recent products I designed and built end to end. Each one plays a live demo; open it for the full story.
          </p>
        </Reveal>
      </div>
      <WorkGrid>
        {projects.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i} />
        ))}
      </WorkGrid>
      <SideProjects items={sideProjects} />
    </section>
  );
}
