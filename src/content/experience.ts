/**
 * EXPERIENCE: shown as an expandable list on the home page.
 * Newest first. `period` is free text, e.g. "Jun 2026 — Now".
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
    period: "Jun 2026 — Now",
    company: "Oracle Financial Services",
    role: "Application Developer",
    location: "Mumbai",
    summary:
      "Building and maintaining features for enterprise banking software used by financial institutions, inside a large, quality-focused engineering team.",
    achievements: [
      "Develop and enhance application modules in a large Java codebase",
      "Fix production issues and take part in code reviews and testing",
      "Work within agile release cycles alongside QA and product teams",
    ],
    tags: ["Java", "SQL", "Enterprise Banking"],
  },
  {
    period: "Nov 2025 — Jun 2026",
    company: "DeArte Jewellery",
    role: "Full Stack Developer",
    location: "Mumbai",
    summary:
      "Built DeArte's B2B jewellery commerce platform: a storefront for trade buyers and an admin dashboard for the team, end to end.",
    achievements: [
      "Shipped the buyer storefront and admin dashboard in React with a Node, Express and MongoDB backend",
      "Implemented secure cookie-based authentication and Cloudinary-powered product media",
      "Integrated WhatsApp Business messaging for buyer communication",
    ],
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    period: "Mar 2025 — Sep 2025",
    company: "Intellimark Analytics",
    role: "Product Manager & Developer",
    location: "Mumbai",
    summary:
      "Owned product direction and built features hands-on, bridging what users needed with what the engineering team shipped.",
    achievements: [
      "Defined requirements, priorities and the roadmap for product releases",
      "Built and shipped features alongside the development team",
      "Worked directly with stakeholders to turn feedback into improvements",
    ],
    tags: ["Product Management", "Full-Stack"],
  },
  {
    period: "6 months",
    company: "Etcetra Tech Ltd",
    role: "Freelance Developer",
    location: "Remote",
    summary: "Delivered web development work for Etcetra Tech as an independent freelancer.",
    achievements: [
      "Built and delivered client features on agreed timelines",
      "Handled requirements, development and handover independently",
    ],
    tags: ["Freelance", "Web Development"],
  },
];
