// All copy lives here so you can edit the site without touching components.

export const profile = {
  name: "Anjana",
  email: "anjananjana8@gmail.com",
  github: "https://github.com/anjana2023", 
  linkedin: "https://www.linkedin.com/in/anjana-p-447534243/",
  intro:
    "I’m a software engineer who enjoys building practical web apps. I work with React, Node.js, and MongoDB, and I’m looking for a MERN Stack or Frontend Developer role anywhere in the UAE.",
  stats: [
    { value: "2+", label: "Years experience" },
    { value: "4", label: "Products shipped" },
    { value: "15+", label: "Interfaces built" },
  ],
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export type Project = {
  index: string;
  year: string;
  name: string;
  kind: string;
  description: string;
  tags: string[];
  // Glow colour behind the project (CSS colour)
  glow: string;
  // Accent used for the index label + italic subtitle
  accent: string;
  // Put screenshots in /public/projects and list them here (main, side, small)
  shots: [string, string, string];
};

// Order of `shots`: [main (large), side (top-right), small (bottom-left)].
export const projects: Project[] = [
  { 
    index: "01",
    year: "2025",
    name: "Sailor",
    kind: "Multi-Cloud Orchestration Platform",
    description:
      "One workspace to manage AWS, Azure and Google Cloud — dashboards, workflow automation and resource management.",
    tags: ["Next.js", "TypeScript", "Zustand", "Material UI", "MongoDB"],
    accent: "oklch(0.75 0.16 230)",
    glow: "oklch(0.75 0.16 230 / 0.38)",
    shots: [
      "/projects/5.png",
      "/projects/6.png",
      "/projects/costManagement.png",
    ],
  },
  {
    index: "02",
    year: "2025",
    name: "HR Agent",
    kind: "AI-Powered Recruitment",
    description:
      "Candidate management, AI-assisted screening and role-based access control, end to end.",
    tags: ["Next.js", "TypeScript", "Python", "FastAPI", "MongoDB"],
    accent: "oklch(0.88 0.2 125)",
    glow: "oklch(0.88 0.2 125 / 0.32)",
    shots: [
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
    ],
  },
  {
    index: "03",
    year: "2024",
    name: "BookInn",
    kind: "Hotel Management & Booking",
    description:
      "Role-based dashboards for guests, hotel owners and admins, with payments and booking workflows.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    accent: "oklch(0.72 0.17 45)",
    glow: "oklch(0.72 0.17 45 / 0.38)",
    shots: [
      "/projects/Screenshot%20%281%29.png",
      "/projects/Screenshot%20%282%29.png",
      "/projects/Screenshot%20%283%29.png",
    ],
  },
  {
    index: "04",
    year: "2023",
    name: "ShoeKy",
    kind: "E-Commerce Platform",
    description:
      "Product listing, cart, checkout and order management with a payment gateway.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    accent: "oklch(0.7 0.2 350)",
    glow: "oklch(0.7 0.2 350 / 0.38)",
    shots: [
      "/projects/Screenshot%20%285%29.png",
      "/projects/Screenshot%20%284%29.png",
      "/projects/Screenshot%20%286%29.png",
    ],
  },
];

export const experience = [
  {
    period: "Nov 2024 — Present",
    company: "Bootlabs",
    role: "Software Engineer",
    summary:
      "Enterprise apps with Next.js, Node.js and PostgreSQL. Scalable frontend architecture, REST APIs with auth & RBAC, AI features with FastAPI, CI/CD on GitHub Actions.",
  },
  {
    period: "2023 — 2024",
    company: "Brototype",
    role: "MERN Stack Developer",
    summary:
      "Responsive React apps, reusable UI components, API integration, authentication and state management.",
  },
];

export const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express",
  "FastAPI", "Python", "MongoDB", "PostgreSQL", "Tailwind CSS", "Material UI",
  "Redux Toolkit", "Zustand", "Docker", "GitHub Actions", "REST APIs", "Figma",
];

export const contactTopics = ["Freelance", "Full-time role", "Collaboration", "Other"];
