import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/posts";
import { resolveMedia } from "@/lib/media";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Work from "@/components/home/Work";
import About from "@/components/home/About";
import Experience from "@/components/home/Experience";
import Writing from "@/components/home/Writing";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <Hero
        projectCount={projects.length}
        showreel={resolveMedia(site.hero.showreel)}
        showreelPoster={resolveMedia(site.hero.showreelPoster)}
        avatar={resolveMedia(site.about.avatar)}
      />
      <Marquee items={site.marquee} sub={site.tools} />
      <Work projects={projects} />
      <About />
      <Experience />
      <Writing posts={posts} />
    </>
  );
}
