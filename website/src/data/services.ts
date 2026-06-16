import type { ProjectCategory } from "./projects";

export interface Service {
  id: string;
  title: string;
  shortTitle?: string;
  summary: string;
  outcomes: string[];
  projectCategories?: ProjectCategory[];
  partnersPanel?: {
    label: string;
    description: string;
  };
}

export const services: Service[] = [
  {
    id: "web-design",
    title: "Web Design",
    projectCategories: ["Websites"],
    summary:
      "Fast, accessible websites and web apps built for conversion, clarity, and long-term maintainability. Web design, hosting, and domain purchase start at $120/year. Every package includes hosting, SSL, daily backups, and ongoing support.",
    outcomes: [
      "Web design, hosting, and domain purchase from $120/year",
      "Modern stacks with clean handoff documentation",
      "Performance-minded builds from day one",
      "Content structures your team can own",
    ],
  },
  {
    id: "software-mobile",
    title: "Software & Mobile Development",
    shortTitle: "Software & Apps",
    projectCategories: ["Software", "Apps"],
    summary:
      "Custom software, internal tools, integrations, and mobile apps for iOS and Android, built for how your teams and customers actually work.",
    outcomes: [
      "Workflows mapped to real day-to-day operations",
      "Reliable APIs, data models, and integrations",
      "Consistent UX across web, iOS, and Android",
      "Secure auth, data handling, and release cadence you can plan around",
    ],
  },
  {
    id: "it-support",
    title: "IT Support & Services",
    shortTitle: "IT Support",
    summary:
      "On-site and remote IT support across Miami and South Florida for homes, businesses, and everything in between. Device setup, network design, security hardening, virus removal, and ongoing maintenance. We handle it all at $100/hr with no retainer required. Serving Miami-Dade, Broward, and Palm Beach County.",
    outcomes: [
      "On-site and remote support at $100/hr with no retainer required",
      "Serving Miami, Hialeah, Coral Gables, Fort Lauderdale, and surrounding areas",
      "Help for home users, small businesses, and larger organizations alike",
      "Device setup, troubleshooting, and repairs",
      "Network design, Wi-Fi optimization, and security hardening",
      "Virus removal, data recovery, and system cleanup",
      "Faster issue resolution with clear, upfront estimates",
      "Ongoing maintenance plans available for businesses",
    ],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We align on goals, constraints, and success metrics before writing a line of code.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Scope, timeline, and architecture are defined with clear milestones and ownership.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative delivery with review checkpoints. No black-box development cycles.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Staging, QA, deployment, and handoff documentation so your team is never stranded.",
  },
  {
    step: "05",
    title: "Support",
    description:
      "Monitoring, maintenance, and improvements based on real usage, not assumptions.",
  },
];
