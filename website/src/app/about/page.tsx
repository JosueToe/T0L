import type { Metadata } from "next";
import { AboutIntroSection } from "@/components/AboutIntroSection";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/data/site";

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

      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
        <Reveal className="grid gap-10 border-t border-white/10 pt-16 md:grid-cols-3">
          {[
            {
              title: "Reliability",
              text: "Systems and deliverables designed for uptime, clarity, and support.",
            },
            {
              title: "Speed",
              text: "Disciplined sprints and clear milestones. Momentum without chaos.",
            },
            {
              title: "Outcomes",
              text: "We measure success by how your team operates after go-live.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-bold tracking-tight text-accent md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base font-medium leading-relaxed text-text/80 md:text-lg">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>

        <section id="contact" className="mt-24 scroll-mt-28 border-t border-white/10 pt-24">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
              Contact
            </p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              Let&apos;s talk about your project.
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-text/85 md:text-xl">
              {siteConfig.responseTime} Share a few details and we will follow up
              with next steps.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-2">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal>
              <div className="cut-frame space-y-10 bg-surface/60 p-10">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    data-cursor="link"
                    className="mt-3 block text-xl font-semibold tracking-tight hover:text-accent md:text-2xl"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50">
                    Phone
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                    {siteConfig.phone}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50">
                    Response
                  </p>
                  <p className="mt-3 text-lg font-medium text-text/85">
                    {siteConfig.responseTime}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
