import type { PostMeta } from "@/lib/posts";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import PostList from "@/components/work/PostList";
import { ArrowUpRight } from "@/components/ui/icons";

export default function Writing({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section id="writing" aria-labelledby="writing-title" className="container-x section-pad">
      <div className="flex items-end justify-between gap-6">
        <div>
          <SectionLabel index="04" label="Writing" />
          <RevealText
            id="writing-title"
            text="Notes on *craft*"
            className="headline mt-5 text-[clamp(2.5rem,8.5vw,9rem)] md:mt-8"
          />
        </div>
        <Reveal className="hidden md:block">
          <Magnetic strength={0.3}>
            <TLink href="/blog" transitionLabel="Writing" className="btn-pill roll-trigger">
              <Roll>All writing</Roll>
              <ArrowUpRight className="size-4" />
            </TLink>
          </Magnetic>
        </Reveal>
      </div>
      <PostList posts={posts} className="mt-8 md:mt-[clamp(3rem,6vw,5rem)]" />
      <TLink
        href="/blog"
        transitionLabel="Writing"
        className="mt-6 inline-flex items-center gap-2 text-bone/85 md:hidden"
      >
        All writing <ArrowUpRight className="size-4" />
      </TLink>
    </section>
  );
}
