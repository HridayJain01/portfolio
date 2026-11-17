import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import TLink from "@/components/ui/TLink";
import Roll from "@/components/ui/Roll";
import ReadingProgress from "@/components/work/ReadingProgress";
import { ArrowLeft, ArrowUpRight } from "@/components/ui/icons";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: { type: "article", title: post.meta.title, description: post.meta.excerpt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, html } = post;
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const next = all[(i + 1) % all.length];

  return (
    <article className="relative">
      <ReadingProgress />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(45%_55%_at_15%_0%,rgb(255_107_61/0.14),transparent_70%)]"
      />
      <header className="container-x relative pt-[calc(var(--nav-h)+clamp(1.5rem,8vw,6rem))]">
        <Reveal intro y={16} className="intro-fade eyebrow flex flex-wrap items-center justify-between gap-4 text-mute">
          <TLink
            href="/blog"
            transitionLabel="Writing"
            className="roll-trigger inline-flex items-center gap-2 text-bone"
          >
            <ArrowLeft className="size-4" />
            <Roll>All writing</Roll>
          </TLink>
          <span>
            {formatDate(meta.date)} · {meta.readingTime} min read
          </span>
        </Reveal>
        <RevealText
          as="h1"
          mode="intro"
          stagger={0.04}
          text={meta.title}
          className="headline mx-auto mt-[clamp(1.75rem,7vw,6rem)] max-w-[16ch] text-center text-[clamp(2.6rem,8vw,8.5rem)]"
        />
        <Reveal intro delay={0.4} className="intro-fade mx-auto mt-6 max-w-2xl text-center md:mt-10">
          <p className="text-lg leading-relaxed text-mute md:text-xl">{meta.excerpt}</p>
          <ul className="mt-8 hidden justify-center gap-2 sm:flex">
            {meta.tags.map((t) => (
              <li key={t} className="eyebrow rounded-full border border-line px-3 py-2 text-mute">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      <div className="container-x relative py-[clamp(2.5rem,9vw,8rem)]">
        <Reveal className="mx-auto max-w-[68ch]" y={30}>
          <div className="prose-art" dangerouslySetInnerHTML={{ __html: html }} />
        </Reveal>
      </div>

      {next && next.slug !== slug && (
        <div className="container-x pb-[clamp(4rem,8vw,7rem)]">
          <TLink
            href={`/blog/${next.slug}`}
            transitionLabel={next.title}
            data-cursor-label="Read"
            className="group mx-auto block max-w-5xl border-t border-line pt-10"
          >
            <span className="eyebrow text-mute">Read next</span>
            <span className="mt-6 flex items-end justify-between gap-6">
              <span className="headline text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] transition-transform duration-700 ease-out-expo group-hover:translate-x-3">
                {next.title}
              </span>
              <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line transition-all duration-700 ease-out-expo group-hover:rotate-45 group-hover:border-bone group-hover:bg-bone group-hover:text-ink">
                <ArrowUpRight className="size-6" />
              </span>
            </span>
          </TLink>
        </div>
      )}
    </article>
  );
}
