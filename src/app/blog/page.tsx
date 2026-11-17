import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import PostList from "@/components/work/PostList";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and essays on design, motion, engineering and shipping products.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <section className="container-x relative pb-[clamp(3.5rem,9vw,9rem)] pt-[calc(var(--nav-h)+clamp(1.5rem,8vw,7rem))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(50%_60%_at_80%_0%,rgb(138_108_255/0.18),transparent_70%)]"
      />
      <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal intro y={16} className="intro-fade eyebrow text-mute">
            ({String(posts.length).padStart(2, "0")}) Writing
          </Reveal>
          <RevealText
            as="h1"
            mode="intro"
            text="Notes on *craft*"
            className="headline mt-5 text-[clamp(3.25rem,13vw,13rem)] md:mt-8"
          />
        </div>
        <Reveal intro delay={0.4} className="intro-fade hidden md:block lg:col-span-4">
          <p className="max-w-sm text-lg leading-relaxed text-mute lg:ml-auto">
            Essays and field notes on design, motion, engineering and the craft of shipping products people love.
          </p>
        </Reveal>
      </div>
      <PostList posts={posts} className="relative mt-8 md:mt-[clamp(3rem,7vw,6rem)]" />
    </section>
  );
}
