import type { Metadata } from "next";
import { AboutIntroSection } from "@/components/AboutIntroSection";
import { AboutContactSection } from "@/components/AboutContactSection";

export const metadata: Metadata = {
  title: "About & Contact | IT & Software Development Partner in Miami, South Florida",
  description:
    "About T0L LLC: Miami-based IT support, web development, and software development partner serving South Florida and clients across the United States. Contact us for a quote.",
  keywords: [
    "T0L LLC Miami",
    "IT company South Florida",
    "software development contact Miami",
    "web development agency Florida",
    "IT support contact Miami",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About T0L LLC | Miami IT Support & Software Development",
    description:
      "Learn about T0L LLC and get in touch for IT support, web development, or custom software in Miami, South Florida, and nationwide.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />
      <AboutContactSection />
    </>
  );
}
