/**
 * ─────────────────────────────────────────────────────────────────────
 *  PROJECTS: each entry becomes a stacked card on the home page and a
 *  full case-study page at /work/<slug>.
 *
 *  DEMO VIDEOS
 *  Drop your files in /public/videos using the paths below (or change them).
 *  Until a file exists, a generative placeholder is shown automatically,
 *  so you can add videos one at a time.
 *
 *    video      Short muted loop (5–20s) for the card and the case-study hero.
 *    videoFull  Optional longer demo WITH sound. Plays when someone hits
 *               "Play demo" on the case study. Falls back to `video`.
 *    poster     Optional still image shown before the video loads.
 *    clips      Any number of short feature clips with captions.
 *
 *  Tip: export MP4 (H.264), 1600–1920px wide, under ~8 MB. See README.md
 *  for a one-line ffmpeg command that does this for you.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Clip = {
  src: string;
  poster?: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  client?: string;
  stack: string[];
  /** Brand colour for highlights and the placeholder artwork. */
  accent: string;
  video?: string;
  videoFull?: string;
  poster?: string;
  links?: { live?: string; repo?: string };
  summary: string;
  challenge: string;
  outcome: string;
  highlights: { value: string; label: string }[];
  features: string[];
  clips?: Clip[];
};

export const projects: Project[] = [
  {
    slug: "lumen",
    title: "Lumen",
    tagline: "An AI writing studio that thinks with you, not for you.",
    category: "AI · Web App",
    year: "2026",
    role: "Product design, Frontend, Motion",
    client: "Lumen Labs",
    stack: ["Next.js", "TypeScript", "Tailwind", "Edge Functions"],
    accent: "#ff6b3d",
    video: "/videos/lumen.mp4",
    videoFull: "/videos/lumen-full.mp4",
    poster: "",
    links: { live: "https://example.com", repo: "https://github.com/" },
    summary:
      "Lumen is a calm, focused writing environment where an assistant suggests structure, sharpens arguments and keeps your voice intact.",
    challenge:
      "Most AI writing tools flatten everyone into the same voice. The brief: build an assistant that feels like a thoughtful editor sitting next to you, present when needed and invisible when not.",
    outcome:
      "A distraction-free editor with inline, explainable suggestions and a motion language that never interrupts flow. Beta users wrote 2.4× longer sessions and retention doubled in the first month.",
    highlights: [
      { value: "2.4×", label: "Longer writing sessions" },
      { value: "92%", label: "Suggestion acceptance" },
      { value: "48k", label: "Waitlist sign-ups" },
    ],
    features: [
      "Inline suggestions with one-key accept",
      "Voice profile that learns your style",
      "Outline mode with drag-to-restructure",
      "Offline-first sync across devices",
    ],
    clips: [
      { src: "/videos/lumen-1.mp4", caption: "Inline suggestions appear as you pause" },
      { src: "/videos/lumen-2.mp4", caption: "Restructure an essay by dragging the outline" },
    ],
  },
  {
    slug: "orbit",
    title: "Orbit",
    tagline: "Real-time analytics for teams who ship every day.",
    category: "SaaS · Dashboard",
    year: "2025",
    role: "Lead designer, Design system",
    client: "Orbit Inc.",
    stack: ["React", "D3", "WebSockets", "Figma"],
    accent: "#8a6cff",
    video: "/videos/orbit.mp4",
    poster: "",
    links: { live: "https://example.com" },
    summary:
      "Orbit turns raw product events into live, explorable stories, so every team can answer its own questions in seconds.",
    challenge:
      "Dashboards were dense, slow and owned by a single data team. Product managers waited days for answers that should take seconds.",
    outcome:
      "A modular canvas of live widgets, natural-language queries and a 120-component design system. Time-to-insight dropped from days to under a minute.",
    highlights: [
      { value: "< 60s", label: "Time to first insight" },
      { value: "120", label: "System components" },
      { value: "+38%", label: "Weekly active teams" },
    ],
    features: [
      "Live widgets streaming over WebSockets",
      "Ask questions in plain English",
      "Shareable, embeddable reports",
      "Dark-first, colour-blind-safe charts",
    ],
    clips: [
      { src: "/videos/orbit-1.mp4", caption: "Building a live board in under a minute" },
      { src: "/videos/orbit-2.mp4", caption: "Natural-language queries" },
    ],
  },
  {
    slug: "pulse",
    title: "Pulse",
    tagline: "A fitness companion that adapts to how you actually feel.",
    category: "Mobile · Health",
    year: "2025",
    role: "Product design, iOS prototyping",
    stack: ["Swift", "SwiftUI", "HealthKit", "Rive"],
    accent: "#2ee6a6",
    video: "/videos/pulse.mp4",
    poster: "",
    links: { live: "https://example.com" },
    summary:
      "Pulse reads sleep, stress and recovery signals, then reshapes each day's training plan so you never overdo it or fall behind.",
    challenge:
      "Fitness apps push the same plan whether you slept four hours or nine. People burn out, feel guilty and quit by week three.",
    outcome:
      "An adaptive plan with a living 'readiness' orb, playful Rive animations and gentle nudges. Users kept their streaks 3× longer than the category average.",
    highlights: [
      { value: "3×", label: "Longer streaks" },
      { value: "4.9", label: "App Store rating" },
      { value: "Top 10", label: "Health & Fitness" },
    ],
    features: [
      "Daily readiness score from HealthKit",
      "Plans that rebalance automatically",
      "Haptic, animated workout guidance",
      "Apple Watch companion",
    ],
    clips: [
      { src: "/videos/pulse-1.mp4", caption: "The readiness orb reacting to recovery data" },
      { src: "/videos/pulse-2.mp4", caption: "A guided workout with haptics" },
    ],
  },
  {
    slug: "atlas",
    title: "Atlas",
    tagline: "Plan trips together: maps, budgets and memories in one place.",
    category: "Consumer · Travel",
    year: "2024",
    role: "Founder, Design & Engineering",
    stack: ["Next.js", "Mapbox", "Supabase", "Framer Motion"],
    accent: "#4cc3ff",
    video: "/videos/atlas.mp4",
    poster: "",
    links: { live: "https://example.com", repo: "https://github.com/" },
    summary:
      "Atlas is a collaborative trip planner where friends drop places on a shared map, split costs and relive the journey afterwards.",
    challenge:
      "Group trips live across ten chats, three spreadsheets and a dozen screenshots. Nobody knows the plan and somebody always overpays.",
    outcome:
      "A single shared map with real-time cursors, smart itineraries and automatic expense splitting, used by 20k travellers in its first year.",
    highlights: [
      { value: "20k", label: "Travellers in year one" },
      { value: "$1.2M", label: "Expenses split" },
      { value: "68", label: "Countries explored" },
    ],
    features: [
      "Real-time collaborative map",
      "Drag-and-drop itineraries",
      "Automatic expense splitting",
      "Trip recap stories",
    ],
    clips: [
      { src: "/videos/atlas-1.mp4", caption: "Friends planning together in real time" },
      { src: "/videos/atlas-2.mp4", caption: "Auto-generated trip recap" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
