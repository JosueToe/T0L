"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ParallaxStripes } from "@/components/ParallaxStripes";
import { Reveal } from "@/components/Reveal";

export function AboutIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative -mt-24 overflow-hidden bg-[#0d0d0d] pt-24"
      aria-label="About T0L LLC"
    >
      <ParallaxStripes scrollYProgress={scrollYProgress} />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-2 lg:px-10 lg:pb-20 lg:pt-3">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent">
            About
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
            Built for teams that need things done right.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="flex items-center justify-center lg:justify-start">
              <Image
                src="/brand/logo-wordmark.png"
                alt="T0L LLC"
                width={480}
                height={160}
                className="h-auto w-full max-w-sm drop-shadow-2xl md:max-w-md"
                priority
              />
            </div>
          </Reveal>

          <Reveal>
            <div className="space-y-8">
              <p className="text-xl font-medium leading-relaxed text-text md:text-2xl md:leading-relaxed">
                T0L LLC is an IT and development partner for businesses that value
                reliability over hype. We support day-to-day technology needs
                while building websites, software, and mobile apps that hold up
                under real use.
              </p>
              <p className="text-lg leading-relaxed text-text/85 md:text-xl">
                Our approach is straightforward: understand the business outcome,
                scope the work clearly, deliver in iterations, and stay available
                after launch. No disappearing acts, no unnecessary complexity.
              </p>
              <p className="text-lg leading-relaxed text-text/85 md:text-xl">
                Whether you need managed IT, a new web presence, or a custom
                platform, we focus on clean architecture, accessible interfaces,
                and maintainable code your team can live with long term.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
