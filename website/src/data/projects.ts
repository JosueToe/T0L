import { hostedSites } from "@/data/hostedSites";

export type ProjectCategory = "Websites" | "Apps" | "Software";

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  featured: boolean;
  thumbnail: string;
  heroImage: string;
  gallery: string[];
  siteUrl?: string;
  overview: {
    problem: string;
    solution: string;
  };
  results: string[];
}

function hostedSiteToProject(
  site: (typeof hostedSites)[number]
): Project {
  return {
    slug: site.slug,
    title: site.name,
    year: site.year,
    category: "Websites",
    featured: site.featured ?? false,
    thumbnail: site.thumbnail,
    heroImage: site.thumbnail,
    gallery: [site.thumbnail],
    siteUrl: site.url,
    overview: {
      problem: `${site.name} needed a professional web presence that reflected their ${site.industry.toLowerCase()} brand and made it easy for customers to understand services and get in touch.`,
      solution:
        "We designed and launched a responsive website with clear service messaging, strong visual hierarchy, and reliable hosting. The build prioritizes performance, mobile usability, and straightforward updates.",
    },
    results: [
      `Live site at ${site.url.replace(/^https?:\/\//, "")}`,
      "Professional brand presentation across desktop and mobile",
      "Reliable hosting with SSL and ongoing support",
      site.description,
    ],
  };
}

const websiteProjects = hostedSites.map(hostedSiteToProject);

const otherProjects: Project[] = [
  {
    slug: "secqr-photo-transfer",
    title: "Secqr Photo Transfer",
    year: "2025",
    category: "Apps",
    featured: true,
    thumbnail: "/projects/secqr-thumb.png",
    heroImage: "/projects/secqr-thumb.png",
    gallery: [
      "/projects/secqr-1.png",
      "/projects/secqr-2.png",
      "/projects/secqr-3.png",
      "/projects/secqr-4.png",
    ],
    siteUrl: "https://apps.microsoft.com/detail/9NCM683963GL?hl=en-us&gl=US&ocid=pdpshare",
    overview: {
      problem:
        "Sending photos or short videos between devices meant digging through email, WhatsApp, or Discord just to get a file from your phone to your computer. Slow, messy, and requiring accounts you may not want to use.",
      solution:
        "Secqr lets you generate a QR code on your computer, scan it with your phone, and your photos or short videos instantly download. No accounts, no cables, no apps needed. Built specifically to solve that everyday Windows frustration.",
    },
    results: [
      "Instant photo and video transfer via QR code scan",
      "No accounts, no cloud storage, no third-party apps required",
      "Works seamlessly on Windows computers",
      "Available on the Microsoft Store",
    ],
  },
  {
    slug: "edutube",
    title: "EduTube",
    year: "2026",
    category: "Software",
    featured: true,
    thumbnail: "/projects/edutube-thumb.png",
    heroImage: "/projects/edutube-thumb.png",
    gallery: [
      "/projects/edutube-1.png",
      "/projects/edutube-2.png",
      "/projects/edutube-3.png",
      "/projects/edutube-4.png",
    ],
    siteUrl: "https://edutubes.netlify.app/",
    overview: {
      problem:
        "Giving students access to YouTube meant exposing them to ads, Shorts, algorithm rabbit holes, and content that has no place in a classroom. Teachers had no control over what students actually watched.",
      solution:
        "EduTube gives teachers a curated, restricted YouTube experience. Students join via a class code and can only watch playlists the teacher has approved. No ads, no Shorts, no inappropriate recommendations. Teachers build and manage the content, students just learn.",
    },
    results: [
      "Students access only teacher-approved video content",
      "Class code system for easy student onboarding",
      "No ads, no Shorts, no algorithm-driven distractions",
      "Teachers manage playlists with full control",
    ],
  },
  {
    slug: "steps-dismissal-system",
    title: "STEPS Dismissal System",
    year: "2026",
    category: "Software",
    featured: true,
    thumbnail: "/projects/steps-logo-new.png",
    heroImage: "/projects/steps-logo-new.png",
    gallery: ["/projects/steps-logo-new.png"],
    overview: {
      problem:
        "The existing dismissal system was slow, buggy, and required IT involvement for basic admin tasks. Staff couldn't easily manage parent records, track tardies, or pull reports without jumping through hoops.",
      solution:
        "We rebuilt STEPS from the ground up with AI-powered check-in and check-out, real-time student tracking, and a full admin dashboard. Staff can now manage parents, make record edits, and generate analytical reports on tardies, pickups, and attendance without needing a tech to step in.",
    },
    results: [
      "AI-assisted student check-in and check-out",
      "Analytical reports on tardies, pickups, and attendance",
      "Admin can manage and edit parent records independently",
      "Faster, smoother dismissal with fewer bugs than the previous system",
      "Deployed at St. Thomas Episcopal Parish School",
    ],
  },
];

export const projects: Project[] = [...websiteProjects, ...otherProjects];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
