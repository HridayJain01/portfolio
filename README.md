# Portfolio

A cinematic, motion-rich personal portfolio built with **Next.js 16**, **Tailwind CSS 4**, **GSAP** and a hand-written **WebGL** shader.

- **Liquid-satin WebGL hero** that reacts to the cursor, with a kinetic headline and an inline showreel pill
- **First-visit preloader** and **page-transition curtain** between every route
- **Smooth scrolling** (Lenis) with scroll-driven reveals, scrubbed text, parallax and counters
- **Stacked project cards**, each playing its own **demo video**, linking to full **case-study pages** with a custom video player (play with sound, scrub, mute, fullscreen, keyboard shortcuts) and a grid of short feature clips
- **About**, **Experience** (expandable timeline + résumé download), **Writing** (Markdown blog) and a **Contact** footer with copy-to-clipboard email
- Magnetic buttons, custom cursor, film grain, rolling-text hovers and a velocity-reactive marquee
- Accessible by default: semantic HTML, keyboard support, a skip link, visible focus, and full **`prefers-reduced-motion`** support (animations, autoplay and the preloader switch off)
- Every page is statically prerendered: fast, SEO-friendly, with generated Open Graph image, sitemap and robots.txt

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # ESLint
npm run typecheck            # TypeScript
npm run format               # Prettier
```

---

## Make it yours (no code required)

All content lives in a handful of plain files:

| What | File |
| --- | --- |
| Name, role, email, socials, hero text, about, stats, services, tools | `src/content/site.ts` |
| Projects and their demo videos | `src/content/projects.ts` |
| Work history | `src/content/experience.ts` |
| Blog posts | `content/posts/*.md` |
| Portrait, posters, other images | `public/images/` |
| Demo videos | `public/videos/` |
| Résumé | `public/resume.pdf` |

Text wrapped in `*asterisks*` is set in the italic serif accent face, e.g. `"Selected *work*"`.
In the hero lines, the token `[reel]` drops the looping showreel pill into the headline.

### Adding demo videos

Each project in `src/content/projects.ts` already points at video paths, for example:

```ts
video: "/videos/lumen.mp4",          // short muted loop: card + case-study hero
videoFull: "/videos/lumen-full.mp4", // optional longer demo WITH sound ("Play demo")
poster: "/images/lumen.jpg",         // optional still shown before the video loads
clips: [
  { src: "/videos/lumen-1.mp4", caption: "Inline suggestions appear as you pause" },
],
```

Drop files with those names into `public/videos/` and they appear automatically. Until a file exists, an animated generative placeholder is shown in its place, so you can add videos one at a time. You can also point `src` at any hosted `.mp4` URL. The hero showreel lives at `site.hero.showreel` (default `/videos/showreel.mp4`).

**Recommended export:** MP4 (H.264), 1600 to 1920 px wide, 5 to 20 s for loops, under ~8 MB each. To compress any screen recording:

```bash
# muted loop for cards/clips
ffmpeg -i input.mov -vf "scale=1600:-2,fps=30" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart lumen.mp4

# full demo with sound
ffmpeg -i input.mov -vf "scale=1920:-2" -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k -movflags +faststart lumen-full.mp4
```

### Adding a project

Copy an entry in `src/content/projects.ts`, give it a new `slug`, and it gets a card on the home page plus its own page at `/work/<slug>`. `accent` sets the project's highlight colour.

### Writing a post

Create `content/posts/my-post.md`:

```md
---
title: "My post"
date: "2026-11-01"
excerpt: "One-line summary shown in lists."
tags: ["Design"]
---

Your **Markdown** here.
```

---

## Customising the look

- **Colours & fonts:** design tokens are at the top of `src/app/globals.css` (`--color-accent`, `--color-ink`, …). Fonts are loaded in `src/app/layout.tsx` (Geist, Geist Mono, Instrument Serif).
- **Hero shader:** `src/components/media/ShaderCanvas.tsx`. The palette (`ink`, `indigo`, `violet`, `ember`) and fold scale (`p * 0.52`) are easy to tweak.
- **Motion:** shared timing lives in GSAP timelines inside each component. Global smooth-scroll feel is the `lerp` value in `src/components/layout/SmoothScroll.tsx`.

## Project structure

```
src/
  app/                 routes: home, /work/[slug], /blog, /blog/[slug], OG image, sitemap
  components/
    home/              hero, marquee, work, about, experience, writing
    layout/            nav, footer, preloader, page curtain, cursor, smooth scroll
    media/             WebGL shader, demo video, video player, generative placeholders
    ui/                reveal text, magnetic, counters, links, icons
    work/              project cards, case study, post list
  content/             ← your content
  lib/                 helpers (motion gate, posts, text parsing)
content/posts/         ← your blog posts (Markdown)
public/videos/         ← your demo videos
```

## Deploy

The easiest path is [Vercel](https://vercel.com/new): import the GitHub repo and click deploy, no configuration needed. Any Node host works too: run `npm run build` and then `npm start`.

Remember to set `site.url` in `src/content/site.ts` to your real domain for correct social previews and sitemap.
