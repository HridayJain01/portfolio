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
            className="row group relative isolate grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 py-5 transition-[padding] duration-700 ease-out-expo md:grid-cols-12 md:gap-y-3 md:px-2 md:py-10 md:hover:px-6"
          >
            <span className="row-fill" />
            <span className="row-mute eyebrow text-mute md:col-span-2">
              {formatDate(p.date)}
              <span className="md:hidden"> · {p.readingTime} min</span>
            </span>
            <span className="col-start-1 row-start-2 md:col-span-6 md:col-start-auto md:row-start-auto">
              <span className="block text-[clamp(1.2rem,3vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                {p.title}
              </span>
              <span className="row-mute mt-3 hidden max-w-xl text-mute md:block">{p.excerpt}</span>
            </span>
            <span className="row-mute eyebrow hidden text-mute md:col-span-3 md:block md:justify-self-end">
              {p.tags.join(" · ")} · {p.readingTime} min
            </span>
            <span className="col-start-2 row-span-2 row-start-1 self-center md:col-span-1 md:col-start-auto md:row-span-1 md:row-start-auto md:justify-self-end">
              <span className="grid size-9 place-items-center rounded-full border border-current/20 transition-transform duration-700 ease-out-expo group-hover:rotate-45 md:size-11">
                <ArrowUpRight className="size-4 md:size-5" />
              </span>
            </span>
          </TLink>
        </li>
      ))}
    </Reveal>
  );
}
