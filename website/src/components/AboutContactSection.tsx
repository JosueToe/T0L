"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/motion";

const CONTACT_HEADLINE = ["Let's", "talk", "about", "your", "project."];
const popEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: popEase, delay },
  }),
};

const contactCards = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hint: "Best for project details",
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`,
    hint: "Miami & South Florida",
  },
  {
    label: "Response",
    value: siteConfig.responseTime,
    hint: "Fast, direct follow-up",
  },
];

export function AboutContactSection() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
      <section id="contact" className="scroll-mt-28 pt-10 lg:pt-12">
        <div className="relative overflow-hidden cut-frame border border-accent/20 bg-surface/30 p-6 sm:p-8 md:p-10 lg:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent/5 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-start">
            <div>
              <motion.div
                className="mb-8"
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: popEase }}
              >
                <motion.p
                  className="text-xs font-semibold tracking-[0.2em] uppercase text-accent"
                  initial={reducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.6 }}
                  variants={fadeUp}
                  custom={0}
                >
                  Contact
                </motion.p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5 md:gap-6">
                  <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 md:h-20 md:w-20">
                    <Image
                      src="/brand/cursor.png"
                      alt=""
                      fill
                      className="object-contain drop-shadow-lg"
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-2xl font-bold leading-[1.08] tracking-tight sm:text-3xl md:text-5xl lg:text-[3.25rem]">
                    {CONTACT_HEADLINE.map((word, i) =>
                      reducedMotion ? (
                        <span key={word + i} className="mr-[0.25em]">
                          {word}
                        </span>
                      ) : (
                        <motion.span
                          key={word + i}
                          className="inline-block mr-[0.25em]"
                          initial={{ opacity: 0, y: 50, rotateX: -40 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{
                            duration: 0.65,
                            ease: popEase,
                            delay: 0.08 + i * 0.07,
                          }}
                        >
                          {word}
                        </motion.span>
                      )
                    )}
                  </h2>
                </div>
              </motion.div>

              <motion.p
                className="max-w-xl text-lg font-medium leading-relaxed text-text/90 md:text-xl"
                initial={reducedMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={0.35}
              >
                Ready for reliable IT, a new website, or custom software? Reach
                out and we will help you figure out the right next step.
              </motion.p>

              <motion.div
                className="mt-6 flex flex-wrap gap-2"
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: popEase, delay: 0.4 }}
              >
                {["IT Support", "Web Design", "Software & Apps"].map((tag) => (
                  <span
                    key={tag}
                    className="border border-accent/25 bg-accent/10 px-3 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="mt-10 space-y-4"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: popEase, delay: 0.5 }}
              >
                {contactCards.map((card) => (
                  <div
                    key={card.label}
                    className="group border-l-2 border-accent/50 bg-bg/40 px-5 py-4 transition hover:border-accent hover:bg-bg/60"
                  >
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text/45">
                      {card.label}
                    </p>
                    {"href" in card && card.href ? (
                      <Link
                        href={card.href}
                        data-cursor="link"
                        className="mt-2 block text-lg font-bold tracking-tight text-text transition group-hover:text-accent md:text-xl"
                      >
                        {card.value}
                      </Link>
                    ) : (
                      <p className="mt-2 text-lg font-bold tracking-tight text-text md:text-xl">
                        {card.value}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-text/50">{card.hint}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="mt-4 lg:mt-12 xl:mt-14"
              initial={reducedMotion ? false : { opacity: 0, x: 32, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: popEase, delay: 0.35 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
