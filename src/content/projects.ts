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
    slug: "dearte",
    title: "DeArte",
    tagline: "A B2B jewellery commerce platform for trade buyers.",
    category: "E-commerce · B2B",
    year: "2026",
    role: "Full-stack developer",
    client: "DeArte Jewellery",
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    accent: "#d9a441",
    video: "/videos/dearte.mp4",
    videoFull: "/videos/dearte-full.mp4",
    links: { repo: "https://github.com/HridayJain01/dearte" },
    summary:
      "DeArte's online platform lets verified trade buyers browse collections and place orders, while the team runs products, catalogues, promotions and orders from one admin dashboard.",
    challenge:
      "Wholesale jewellery buying ran on printed catalogues, calls and chat messages. DeArte needed a secure online space for trade buyers and a simple way for the team to keep products and orders up to date.",
    outcome:
      "A full-stack MERN platform: a buyer storefront, an admin dashboard backed by MongoDB, Cloudinary-hosted product media, secure cookie-based sign-in and WhatsApp Business messaging for buyer updates.",
    highlights: [
      { value: "2", label: "Apps: storefront & admin" },
      { value: "B2B", label: "Built for trade buyers" },
      { value: "MERN", label: "Designed & built end to end" },
    ],
    features: [
      "Buyer storefront with collections, catalogues and orders",
      "Admin dashboard for products, promotions and orders",
      "Cloudinary uploads for product photography",
      "WhatsApp Business messaging integration",
    ],
    clips: [
      { src: "/videos/dearte-1.mp4", caption: "Browsing collections as a trade buyer" },
      { src: "/videos/dearte-2.mp4", caption: "Managing products from the admin dashboard" },
    ],
  },
  {
    slug: "self-healing-elt",
    title: "Self-Healing ELT",
    tagline: "A data pipeline that diagnoses and fixes its own errors with AI.",
    category: "AI · Data Engineering",
    year: "2026",
    role: "AI & backend developer",
    stack: ["Python", "FastAPI", "Pandas", "Gemini API"],
    accent: "#34d399",
    video: "/videos/self-healing-elt.mp4",
    videoFull: "/videos/self-healing-elt-full.mp4",
    links: { repo: "https://github.com/HridayJain01/self-healing-elt" },
    summary:
      "An agentic AI system that watches an ELT pipeline's logs, works out why a run failed and applies a fix automatically, learning from every successful repair.",
    challenge:
      "Data pipelines break all the time: missing values, duplicates, schema drift, bad date formats. Engineers lose hours digging through logs and patching the same problems again and again.",
    outcome:
      "The agent detects errors in real time, fixes known ones instantly with locally learned rules, and asks Gemini to diagnose new ones, turning each successful fix into a new rule. A web dashboard shows every incident and how it was resolved.",
    highlights: [
      { value: "3", label: "Error families fixed automatically" },
      { value: "10×", label: "Faster with learned local rules" },
      { value: "Agentic", label: "Detect, diagnose, fix, learn" },
    ],
    features: [
      "Real-time log monitoring and error detection",
      "Gemini-powered diagnosis that writes the fix",
      "Learns local rules from every successful repair",
      "Dashboard of incidents and resolutions",
    ],
    clips: [
      { src: "/videos/self-healing-elt-1.mp4", caption: "A broken run being diagnosed and fixed live" },
      { src: "/videos/self-healing-elt-2.mp4", caption: "The incidents dashboard" },
    ],
  },
  {
    slug: "star-learners",
    title: "Star Learners",
    tagline: "A children's book-lending library, run online.",
    category: "Web app · Education",
    year: "2026",
    role: "Full-stack developer",
    client: "Star Learners Library",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    accent: "#5aa9ff",
    video: "/videos/star-learners.mp4",
    videoFull: "/videos/star-learners-full.mp4",
    links: { repo: "https://github.com/HridayJain01/SLL_Dev" },
    summary:
      "A full-stack platform for a children's lending library: parents pick a membership tier and borrow books for their kids, while the owner manages the catalogue, members and payments.",
    challenge:
      "Memberships, book availability and payments were tracked by hand, which made renewals, reminders and follow-ups slow and easy to get wrong.",
    outcome:
      "A TypeScript MERN app with membership tiers, WhatsApp-based payments, a searchable catalogue with Cloudinary covers, email and web-push reminders, and an admin dashboard with Excel exports.",
    highlights: [
      { value: "2", label: "Portals: parents & admin" },
      { value: "TS", label: "TypeScript end to end" },
      { value: "Push", label: "Email & web-push reminders" },
    ],
    features: [
      "Membership tiers and book borrowing for parents",
      "Searchable catalogue with cover images",
      "WhatsApp-based payment flow",
      "Admin dashboard with Excel export",
    ],
    clips: [
      { src: "/videos/star-learners-1.mp4", caption: "A parent borrowing a book" },
      { src: "/videos/star-learners-2.mp4", caption: "The library owner's dashboard" },
    ],
  },
  {
    slug: "luvall-sports",
    title: "LuvAll Sports",
    tagline: "One platform that runs a pickleball academy end to end.",
    category: "Sports · Web platform",
    year: "2026",
    role: "Full-stack developer",
    client: "LuvAll Sports",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "Docker"],
    accent: "#b8e335",
    video: "/videos/luvall-sports.mp4",
    videoFull: "/videos/luvall-sports-full.mp4",
    summary:
      "A marketing website plus student, coach and admin portals that replaced the academy's Google Forms and spreadsheets with one system.",
    challenge:
      "Enrolments, attendance, make-up classes, coach hours and payments were spread across forms and spreadsheets, so nobody could easily see who had paid, which batches had space or what coaches were owed.",
    outcome:
      "A MERN platform with a CMS-driven public site, live batch seat counts, UPI payment verification, mobile-first attendance for coaches, finance and payouts for admins, and reports with Excel export.",
    highlights: [
      { value: "4", label: "Portals in one system" },
      { value: "UPI", label: "Payments verified in-app" },
      { value: "0", label: "Spreadsheets left to juggle" },
    ],
    features: [
      "Live batch seat counts and online enrolment",
      "Mobile-first attendance and earnings for coaches",
      "Finance: UPI checks, payouts and ledgers",
      "Reports with charts and Excel export",
    ],
    clips: [
      { src: "/videos/luvall-sports-1.mp4", caption: "Enrolling in a batch as a student" },
      { src: "/videos/luvall-sports-2.mp4", caption: "Marking attendance from the coach portal" },
    ],
  },
  {
    slug: "crumb",
    title: "Crumb",
    tagline: "An easy health journal: snap, say or type what you ate.",
    category: "AI · Health PWA",
    year: "2026",
    role: "Full-stack & AI developer",
    stack: ["React", "TypeScript", "Firebase", "Gemini", "Cloud Run"],
    accent: "#ff8a5b",
    video: "/videos/crumb.mp4",
    videoFull: "/videos/crumb-full.mp4",
    links: { repo: "https://github.com/HridayJain01/Crumb" },
    summary:
      "Crumb turns a sentence, a photo or a voice note into an itemised meal with honest estimates, adds your steps and workouts, and suggests one or two useful next steps.",
    challenge: "Food trackers demand tedious searching and fake precision, so most people give up within days.",
    outcome:
      "Built for the Google AI / Cloud Builder Hackathon as an installable PWA on Google Cloud. Gemini interprets the meal while tested code does all the maths, and an on-device parser keeps it working offline.",
    highlights: [
      { value: "3", label: "Ways to log: snap, say, type" },
      { value: "PWA", label: "Installable & works offline" },
      { value: "±", label: "Honest ranges, no fake precision" },
    ],
    features: [
      "Log a meal from a sentence, photo or voice",
      "One-tap repeats of your usual meals",
      "Steps, workouts and daily energy in one place",
      "Gentle suggestions instead of guilt",
    ],
    clips: [
      { src: "/videos/crumb-1.mp4", caption: "Logging a meal from a single sentence" },
      { src: "/videos/crumb-2.mp4", caption: "Daily summary and suggestions" },
    ],
  },
  {
    slug: "engiverse",
    title: "EngiVerse",
    tagline: "A marketplace where engineering projects get AI code reviews.",
    category: "AI · Marketplace",
    year: "2025",
    role: "Developer, team project",
    stack: ["React", "TypeScript", "Supabase", "FastAPI", "Gemini"],
    accent: "#8a6cff",
    video: "/videos/engiverse.mp4",
    videoFull: "/videos/engiverse-full.mp4",
    links: { repo: "https://github.com/sarvesh8804/EngiVerse" },
    summary:
      "Students upload their engineering projects to a shared marketplace. The platform analyses the code, generates a quality report with AI, and mentors can step in to guide.",
    challenge: "Student projects are hard to discover and rarely get structured feedback on code quality or security.",
    outcome:
      "A React and Supabase marketplace with project uploads and a mentor area, backed by a FastAPI service that runs linters and security scanners (Pylint, Bandit, Semgrep, ESLint) and asks Gemini to turn the results into a readable report.",
    highlights: [
      { value: "4+", label: "Code-analysis tools combined" },
      { value: "AI", label: "Gemini-written project reports" },
      { value: "Team", label: "Collaborative build" },
    ],
    features: [
      "Upload a project straight from GitHub",
      "Automated code-quality and security analysis",
      "AI-generated project reports",
      "Mentor area for guidance",
    ],
    clips: [
      { src: "/videos/engiverse-1.mp4", caption: "Uploading a project for review" },
      { src: "/videos/engiverse-2.mp4", caption: "The AI-generated project report" },
    ],
  },
];

/**
 * HOBBY APPS: smaller things built for fun, shown as a compact grid under the
 * main projects. `video` is optional (a short muted loop, e.g. /videos/betzone.mp4).
 */
export type SideProject = {
  slug: string;
  title: string;
  tagline: string;
  stack: string[];
  accent: string;
  video?: string;
  href?: string;
};

export const sideProjects: SideProject[] = [
  {
    slug: "betzone",
    title: "Betzone",
    tagline: "Play-money sports betting and casino app with live football and cricket scores.",
    stack: ["React", "TypeScript", "Zustand"],
    accent: "#22c55e",
    video: "/videos/betzone.mp4",
  },
  {
    slug: "quickstock",
    title: "QuickStock",
    tagline: "A fast stock-market and business tycoon game with shared rooms.",
    stack: ["JavaScript", "Supabase", "PWA"],
    accent: "#f5b942",
    video: "/videos/quickstock.mp4",
    href: "https://github.com/HridayJain01/QuickStock",
  },
  {
    slug: "scrappy",
    title: "Scrappy",
    tagline: "A photo scrapbook that sorts itself with on-device AI.",
    stack: ["React", "ONNX Runtime", "PWA"],
    accent: "#ff7ab6",
    video: "/videos/scrappy.mp4",
    href: "https://github.com/HridayJain01/scrappy",
  },
  {
    slug: "kharcha-pani",
    title: "Kharcha Pani",
    tagline: "An offline spending tracker you just talk to: “chai 15, auto 40”.",
    stack: ["React", "Transformers.js", "PWA"],
    accent: "#4cc3ff",
    video: "/videos/kharcha-pani.mp4",
    href: "https://github.com/HridayJain01/kharcha-pani",
  },
  {
    slug: "1poker",
    title: "1Poker",
    tagline: "Private, phone-first poker rooms for friends, from Hold'em to Teen Patti.",
    stack: ["React", "Socket.IO", "Node.js"],
    accent: "#ef4444",
    video: "/videos/1poker.mp4",
    href: "https://github.com/HridayJain01/1Poker",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
