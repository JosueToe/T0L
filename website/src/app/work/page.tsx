import type { Metadata } from "next";
import { WorkServicesExplorer } from "@/components/WorkServicesExplorer";
import { seoKeywords } from "@/data/seo";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse T0L LLC services: IT support in Miami from $100/hr, web design and hosting from $120/year, and custom software and mobile app development for Miami, South Florida, and businesses across the United States.",
  keywords: [
    ...seoKeywords,
    "IT support Miami $100 per hour",
    "web design portfolio Miami",
    "software development company South Florida",
  ],
  alternates: { canonical: "/work" },
  openGraph: {
    title: "IT Support, Web & Software Development Services | T0L LLC Miami",
    description:
      "IT support, web design, and custom software development in Miami and South Florida. View our portfolio and service details.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-6 pb-16 lg:px-10 lg:pt-8 lg:pb-24">
      <WorkServicesExplorer />
    </div>
  );
}
