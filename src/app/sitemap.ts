import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/blog`, priority: 0.7 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, priority: 0.9 })),
    ...getAllPosts().map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
