import type { PostMeta } from "@/lib/posts";
import Reveal from "@/components/ui/Reveal";
import TLink from "@/components/ui/TLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn, formatDate } from "@/lib/utils";

export default function PostList({ posts, className }: { posts: PostMeta[]; className?: string }) {
  return (
    <Reveal as="ul" className={cn("border-t border-line", className)} stagger={0.08}>
      {posts.map((p) => (
        <li key={p.slug} data-reveal-item className="border-b border-line">
          <TLink
            href={`/blog/${p.slug}`}
            transitionLabel={p.title}
            data-cursor-label="Read"
            className="row group relative isolate grid grid-cols-12 items-center gap-x-4 gap-y-3 px-2 py-8 transition-[padding] duration-700 ease-out-expo md:py-10 md:hover:px-6"
          >
            <span className="row-fill" />
            <span className="row-mute eyebrow col-span-12 text-mute md:col-span-2">{formatDate(p.date)}</span>
            <span className="col-span-11 md:col-span-6">
              <span className="block text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                {p.title}
              </span>
              <span className="row-mute mt-3 block max-w-xl text-mute">{p.excerpt}</span>
            </span>
            <span className="row-mute eyebrow col-span-8 text-mute md:col-span-3 md:justify-self-end">
              {p.tags.join(" · ")} — {p.readingTime} min
            </span>
            <span className="col-span-4 justify-self-end md:col-span-1">
              <span className="grid size-11 place-items-center rounded-full border border-current/20 transition-transform duration-700 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </span>
          </TLink>
        </li>
      ))}
    </Reveal>
  );
}
