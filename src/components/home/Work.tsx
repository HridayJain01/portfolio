import type { Project } from "@/content/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import WorkStack from "@/components/work/WorkStack";
import WorkCard from "@/components/work/WorkCard";

export default function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-title" className="container-x scroll-mt-0 py-[clamp(6rem,12vw,11rem)]">
      <div className="mb-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel index="01" label="Selected work" />
          <RevealText
            id="work-title"
            text="Selected *work*"
            className="headline mt-8 text-[clamp(3.5rem,11vw,11rem)]"
          />
        </div>
        <Reveal className="lg:col-span-4">
          <p className="max-w-sm text-lg leading-relaxed text-mute lg:ml-auto">
            A few recent products I designed and built end to end. Every card plays a live demo; open one for the full
            story.
          </p>
        </Reveal>
      </div>
      <WorkStack>
        {projects.map((p, i) => (
          <WorkCard key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </WorkStack>
    </section>
  );
}
