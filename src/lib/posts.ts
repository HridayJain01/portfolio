import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
};

function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

function read(slug: string) {
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: readingTime(content),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => read(f.replace(/\.md$/, ""))?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const post = read(slug);
  if (!post) return null;
  const html = marked.parse(post.content, { async: false, gfm: true }) as string;
  return { meta: post.meta, html };
}
