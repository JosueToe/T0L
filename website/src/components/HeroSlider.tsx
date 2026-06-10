"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { ParallaxStripes } from "@/components/ParallaxStripes";

const LINE1_WORDS = ["Technology", "that", "runs", "your", "business"];
const LINE2 = "without the headaches.";

export function HeroSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[calc(100vh-6rem)] min-h-[600px] w-full overflow-hidden bg-[#0d0d0d]"
      aria-label="Hero"
    >
      <ParallaxStripes scrollYProgress={scrollYProgress} />

      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/50 to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/30 to-transparent" />

      <div className="absolute inset-0 flex items-center px-6 lg:px-12">
        <div className="flex-1 min-w-0">
          <h1 className="text-[clamp(2rem,4.2vw,5rem)] font-semibold leading-[1.08] tracking-tight text-text">
            <span className="block">
              {LINE1_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)" }}
                  initial={{ opacity: 0, y: 50, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.07 }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="block whitespace-nowrap"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)" }}
              initial={{ opacity: 0, y: 50, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 + LINE1_WORDS.length * 0.07 }}
            >
              {LINE2}
            </motion.span>
          </h1>

          <motion.div
            className="mt-4 space-y-1.5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.85 }}
            style={{ transformOrigin: "left" }}
          >
            <div className="h-[3px] w-full bg-text/70" />
            <div className="h-[2px] w-3/4 bg-text/30" />
          </motion.div>

          <div className="mt-5 flex items-start gap-4 lg:gap-6">
            <motion.div
              className="shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
            >
              <Image
                src="/brand/cursor.png"
                alt=""
                width={120}
                height={120}
                className="h-28 w-auto lg:h-36"
                aria-hidden
              />
            </motion.div>

            <div>
              <motion.p
                className="max-w-lg text-lg font-medium leading-relaxed text-text md:text-xl"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
              >
                We keep your IT stable and secure, build websites that convert, and
                ship custom apps and tools that save time. Backed by SLAs and
                predictable monthly costs.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-wrap gap-4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 1.15 }}
              >
                <Link
                  href="/about#contact"
                  data-cursor="link"
                  className="cut-corner inline-block bg-accent px-8 py-4 text-base font-semibold tracking-wide text-bg transition hover:brightness-110"
                >
                  Schedule a Call
                </Link>
                <Link
                  href="/work"
                  data-cursor="link"
                  className="cut-corner inline-block border border-white/30 px-8 py-4 text-base font-medium tracking-wide text-text backdrop-blur-sm transition hover:border-accent/60 hover:text-accent"
                >
                  Explore Services
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="hidden lg:flex shrink-0 items-center justify-center pl-10 xl:pl-16"
          initial={{ opacity: 0, x: 80, scale: 0.88 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <Image
            src="/brand/logo-wordmark.png"
            alt="T0L LLC"
            width={520}
            height={156}
            className="w-[clamp(280px,28vw,520px)] h-auto drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
