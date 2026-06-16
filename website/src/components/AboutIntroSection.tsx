"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ParallaxStripes } from "@/components/ParallaxStripes";
import { AboutTaglineTypewriter } from "@/components/AboutTaglineTypewriter";
import { usePrefersReducedMotion } from "@/lib/motion";

const HEADLINE_WORDS = [
  "Built",
  "for",
  "teams",
  "that",
  "need",
  "things",
  "done",
  "right.",
];

const popEase = [0.22, 1, 0.36, 1] as const;

function PopWord({
  word,
  index,
  baseDelay = 0.15,
  reducedMotion,
}: {
  word: string;
  index: number;
  baseDelay?: number;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <span className="mr-[0.25em]">{word}</span>;
  }

  return (
    <motion.span
      className="inline-block mr-[0.25em]"
      style={{ textShadow: "0 2px 12px rgba(0,0,0,0.85), 0 1px 3px rgba(0,0,0,0.95)" }}
      initial={{ opacity: 0, y: 50, rotateX: -40 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.65, ease: popEase, delay: baseDelay + index * 0.06 }}
    >
      {word}
    </motion.span>
  );
}

export function AboutIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bodyParagraphs = [
    "T0L LLC is an IT and development partner for businesses that value reliability over hype. We support day-to-day technology needs while building websites, software, and mobile apps that hold up under real use.",
    "Our approach is straightforward: understand the business outcome, scope the work clearly, deliver in iterations, and stay available after launch. No disappearing acts, no unnecessary complexity.",
    "Whether you need managed IT, a new web presence, or a custom platform, we focus on clean architecture, accessible interfaces, and maintainable code your team can live with long term.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative -mt-24 overflow-hidden bg-[#0d0d0d] pt-24"
      aria-label="About T0L LLC"
    >
      <ParallaxStripes scrollYProgress={scrollYProgress} />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/55 to-bg/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/60 via-transparent to-bg/40" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-6 pb-14 pt-2 lg:px-10 lg:pb-16 lg:pt-3">
        <motion.p
          className="text-xs font-semibold tracking-[0.2em] uppercase text-accent"
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: popEase, delay: 0.05 }}
        >
          About
        </motion.p>

        <h1 className="mt-5 min-w-0 text-[clamp(1.75rem,3.8vw,4.25rem)] font-bold leading-[1.08] tracking-tight">
          {HEADLINE_WORDS.map((word, i) => (
            <PopWord
              key={word + i}
              word={word}
              index={i}
              baseDelay={0.12}
              reducedMotion={reducedMotion}
            />
          ))}
        </h1>

        <motion.div
          className="mt-4 space-y-1.5 max-w-3xl"
          initial={reducedMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, ease: popEase, delay: 0.65 }}
          style={{ transformOrigin: "left" }}
        >
          <div className="h-[3px] w-full bg-text/70" />
          <div className="h-[2px] w-3/4 bg-text/30" />
        </motion.div>

        <div className="mt-14 grid min-w-0 grid-cols-1 items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16 xl:gap-20">
          <motion.div
            className="flex w-full min-w-0 max-w-full flex-col items-center"
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: popEase, delay: 0.55 }}
          >
            <Image
              src="/brand/logo-wordmark.png"
              alt="T0L LLC"
              width={640}
              height={213}
              className="h-auto w-full max-w-[min(100%,18rem)] drop-shadow-2xl sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 640px"
              priority
            />
            <AboutTaglineTypewriter />
          </motion.div>

          <div className="mx-auto min-w-0 w-full max-w-2xl space-y-7 lg:mx-0 lg:max-w-none lg:pt-2">
            {bodyParagraphs.map((text, i) => (
              <motion.p
                key={i}
                className={
                  i === 0
                    ? "break-words text-lg font-semibold leading-snug text-text sm:text-xl md:text-2xl lg:text-[1.65rem] lg:leading-snug"
                    : "break-words text-base font-medium leading-relaxed text-text/90 sm:text-lg md:text-xl"
                }
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: popEase, delay: 0.75 + i * 0.12 }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
