import type { Metadata } from "next";
import { HeroSlider } from "@/components/HeroSlider";
import { TypewriterStatement } from "@/components/TypewriterStatement";
import { Marquee } from "@/components/Marquee";
import { ClientLogos } from "@/components/ClientLogos";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { defaultDescription, seoKeywords } from "@/data/seo";

export const metadata: Metadata = {
  title: { absolute: "TOL Tech" },
  description: defaultDescription,
  keywords: seoKeywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: "T0L LLC | IT Support, Web & Software Development in Miami & South Florida",
    description: defaultDescription,
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO SLIDER ── */}
      <HeroSlider />

      {/* ── 2. TYPEWRITER STATEMENT + SERVICES ── */}
      <section className="overflow-hidden border-b border-white/8">
        <TypewriterStatement />
      </section>

      {/* ── 4. MARQUEE BAND ── */}
      <div className="bg-bg">
        <Marquee />
      </div>

      {/* ── 5. CLIENTS ── */}
      <section className="border-t border-white/8 bg-surface/40 pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mb-12 flex items-baseline justify-between gap-4">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Trusted by growing teams
              </h2>
              <span className="hidden text-sm text-text/40 sm:block">
                Partnerships
              </span>
            </div>
          </Reveal>
          <Reveal>
            <ClientLogos />
          </Reveal>
          <hr className="mt-16 border-white/10" />
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="pt-6 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:pl-40 lg:pr-10">
          <CTASection />
        </div>
      </section>
    </>
  );
}
