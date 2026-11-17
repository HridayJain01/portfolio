/**
 * ─────────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit this file to make the portfolio yours.
 *
 *  Text wrapped in *asterisks* is set in the italic serif accent face.
 *  In the hero lines, the token [reel] drops an inline looping video pill
 *  into the headline (it plays `hero.showreel`).
 * ─────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Your Name",
  /** Two or three letters, used for the favicon-style mark and the portrait fallback. */
  monogram: "YN",
  role: "Product Designer & Engineer",
  /** Your production URL, used for SEO and social cards. */
  url: "https://your-domain.com",
  email: "hello@your-domain.com",
  location: "Your City, Country",
  /** IANA time zone for the live clock in the nav, e.g. "Asia/Kolkata", "Europe/London". */
  timeZone: "UTC",
  availability: "Available for new projects",
  description: "Portfolio of Your Name, a product designer and engineer crafting fast, beautiful digital products.",

  hero: {
    lines: ["I build *digital*", "products [reel] people", "*love* to use."],
    intro:
      "Designer & engineer turning ambitious ideas into products that feel effortless, from the first sketch to the last pixel of polish.",
    /** Short muted loop shown inside the headline pill. Drop the file in /public/videos. */
    showreel: "/videos/showreel.mp4",
    showreelPoster: "",
  },

  marquee: [
    "Product Design",
    "Frontend Engineering",
    "Motion & Interaction",
    "Creative Coding",
    "Design Systems",
    "Rapid Prototyping",
  ],

  about: {
    statement:
      "I'm a designer who codes. I turn *messy, ambitious ideas* into products that feel simple, fast and a little bit magical. I care about the details nobody asks for: the easing of a button, the weight of a word, the half-second that makes something feel *alive.*",
    /** Path to a portrait image in /public/images, or leave empty for the generative placeholder. */
    portrait: "",
    stats: [
      { value: 6, suffix: "+", label: "Years designing & shipping" },
      { value: 40, suffix: "+", label: "Products launched" },
      { value: 12, suffix: "", label: "Awards & features" },
    ],
    services: [
      {
        title: "Product Design",
        text: "Research, flows, interface and interaction design, shaped into systems that scale.",
      },
      {
        title: "Frontend Engineering",
        text: "Production-grade React & Next.js, obsessively fast and accessible by default.",
      },
      {
        title: "Motion & Interaction",
        text: "Choreographed transitions and micro-interactions that make products feel tactile.",
      },
      {
        title: "Creative Development",
        text: "WebGL, shaders and generative visuals for launches that people remember.",
      },
    ],
  },

  tools: [
    "Figma",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "WebGL / GLSL",
    "Node.js",
    "Framer",
    "Blender",
    "Swift",
    "PostgreSQL",
  ],

  /** Put your résumé at /public/resume.pdf. If the file is missing, the button becomes "Request résumé". */
  resume: "/resume.pdf",

  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X / Twitter", href: "https://x.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],

  contact: {
    kicker: "Have a project in mind?",
    title: "Let's make something *unforgettable.*",
  },
} as const;

export type Site = typeof site;
