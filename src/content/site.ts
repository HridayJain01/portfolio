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
  name: "Hriday Jain",
  /** Two or three letters, used for the favicon-style mark and the portrait fallback. */
  monogram: "HJ",
  role: "Application Developer",
  /** Your production URL, used for SEO and social cards. */
  url: "https://portfolio-nu-silk-vcg1sjrwmn.vercel.app",
  /** Leave empty to use the phone number (WhatsApp) for "Get in touch". */
  email: "" as string,
  phone: "+91 90041 31915",
  location: "Worli, Mumbai",
  /** IANA time zone for the live clock in the nav. */
  timeZone: "Asia/Kolkata",
  availability: "Open to collaborations",
  description:
    "Portfolio of Hriday Jain, an application developer in Mumbai building fast, reliable web products with the MERN stack, Java and AI-assisted workflows.",

  hero: {
    lines: ["I build *digital*", "products [reel] people", "*love* to use."],
    intro:
      "Application developer from Mumbai with six years of turning ideas into fast, reliable products, from fintech and analytics to e-commerce.",
    /** Short muted loop shown inside the headline pill. Drop the file in /public/videos. */
    showreel: "/videos/showreel.mp4",
    showreelPoster: "",
  },

  marquee: [
    "Full-Stack Development",
    "MERN Stack",
    "Java",
    "Product Thinking",
    "AI-Assisted Development",
    "Rapid Prototyping",
  ],

  about: {
    statement:
      "I'm a developer from Mumbai who has spent six years turning *ideas into working products.* I've built across fintech, analytics and e-commerce, won two hackathons, and today I work on enterprise banking software at Oracle Financial Services. I care about clean code, fast interfaces and shipping things *people actually use.*",
    /** Background-removed portrait (transparent PNG) in /public/images, or empty for the monogram placeholder. */
    portrait: "/images/portrait.png",
    /** Small round head-and-shoulders crop used on phones and in the hero. */
    avatar: "/images/avatar.png",
    stats: [
      { value: 6, suffix: "+", label: "Years building digital products" },
      { value: 4, suffix: "", label: "Companies & clients" },
      { value: 2, suffix: "×", label: "Hackathon winner" },
    ],
    services: [
      {
        title: "Full-Stack Web Apps",
        text: "End-to-end products on the MERN stack: React front ends, Node & Express APIs, MongoDB data.",
      },
      {
        title: "Enterprise Java",
        text: "Reliable, maintainable application code for large financial systems.",
      },
      {
        title: "Product Thinking",
        text: "Scoping, prioritising and shipping features with users and business goals in mind.",
      },
      {
        title: "AI-Assisted Development",
        text: "Using modern AI tooling to prototype fast and get working software in front of people sooner.",
      },
    ],
  },

  tools: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Java",
    "Next.js",
    "Tailwind CSS",
    "SQL",
    "REST APIs",
    "Git & GitHub",
    "AI-assisted workflows",
  ],

  /** Put your résumé at /public/resume.pdf. If the file is missing, the button links to LinkedIn instead. */
  resume: "/resume.pdf",

  socials: [
    { label: "GitHub", href: "https://github.com/HridayJain01" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hriday-jain-5791071a6/" },
    { label: "Instagram", href: "https://www.instagram.com/_hridayyyy_/" },
  ],

  contact: {
    kicker: "Have a project in mind?",
    title: "Let's make something *unforgettable.*",
  },
} as const;

export type Site = typeof site;

const digits = site.phone.replace(/\D/g, "");

/** How people reach you: email if set, otherwise WhatsApp / phone. */
export const contact = {
  href: site.email ? `mailto:${site.email}` : `https://wa.me/${digits}`,
  external: !site.email,
  display: site.email || site.phone,
  /** Used if copying to the clipboard isn't allowed. */
  fallbackHref: site.email ? `mailto:${site.email}` : `tel:+${digits}`,
  kind: site.email ? "email address" : "phone number",
};

export const linkedin = site.socials.find((s) => s.label === "LinkedIn")?.href;
