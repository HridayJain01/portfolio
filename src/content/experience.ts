/**
 * EXPERIENCE: shown as an expandable list on the home page.
 * Newest first. `period` is free text, e.g. "2024 — Now".
 */

export type Role = {
  period: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  achievements: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    period: "2024 — Now",
    company: "Studio North",
    role: "Lead Product Engineer",
    location: "Remote",
    summary:
      "Leading a small team that designs and ships flagship launches for venture-backed startups, from brand moments to production apps.",
    achievements: [
      "Shipped 9 product launches, 3 featured as Site of the Day",
      "Built the studio's motion and component system used across every project",
      "Cut average page weight by 60% with a performance-first pipeline",
    ],
    tags: ["Next.js", "WebGL", "Design Systems"],
  },
  {
    period: "2022 — 2024",
    company: "Northwind Labs",
    role: "Senior Frontend Engineer",
    location: "Hybrid",
    summary: "Owned the web experience for a fast-growing fintech product used by 2M+ people every month.",
    achievements: [
      "Rebuilt onboarding, lifting activation by 27%",
      "Introduced visual regression testing and accessibility audits",
      "Mentored 6 engineers through the senior promotion track",
    ],
    tags: ["React", "TypeScript", "A11y"],
  },
  {
    period: "2020 — 2022",
    company: "Pixel & Co.",
    role: "Product Designer",
    location: "On-site",
    summary: "Designed mobile and web products end to end, from research and flows to high-fidelity prototypes.",
    achievements: [
      "Led design for a health app that reached #4 in its category",
      "Created a prototyping workflow that halved review cycles",
      "Ran 40+ usability sessions and turned insight into roadmap",
    ],
    tags: ["Figma", "Prototyping", "Research"],
  },
  {
    period: "2018 — 2020",
    company: "Independent",
    role: "Designer & Developer",
    location: "Worldwide",
    summary: "Partnered with founders and small brands to design, build and launch their first products.",
    achievements: [
      "Delivered 25+ websites and MVPs for clients in 8 countries",
      "Built a reputation for launch-day polish and on-time delivery",
    ],
    tags: ["Web Design", "Branding", "Webflow"],
  },
];
