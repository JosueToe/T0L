"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { siteConfig, navLinks } from "@/data/site";
import Link from "next/link";

const LINE1 = "Ready to build";
const LINE2 = "something reliable?";
const HEADING = LINE1 + "\n" + LINE2;
const FULL_LENGTH = LINE1.length + LINE2.length;
const TYPE_SPEED = 40;
const START_DELAY = 300;

export function CTASection() {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const done = charCount >= FULL_LENGTH;

  // Start when scrolled into view
  useEffect(() => {
    if (reducedMotion) { setCharCount(FULL_LENGTH); setStarted(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!started || done) return;
    const delay = charCount === 0 ? START_DELAY : TYPE_SPEED;
    const t = setTimeout(() => setCharCount((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [started, charCount, done]);

  // How much of each line to show
  const visLine1 = HEADING.slice(0, Math.min(charCount, LINE1.length));
  const visLine2 = charCount > LINE1.length
    ? HEADING.slice(LINE1.length + 1, LINE1.length + 1 + (charCount - LINE1.length))
    : "";
  const typingLine1 = charCount <= LINE1.length;

  return (
    <div ref={ref} className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start">
      {/* Heading with typewriter — two lines */}
      <h2 className="-ml-4 text-[clamp(1.8rem,3.8vw,4rem)] font-semibold leading-[1.1] tracking-tight">
        <span className="block whitespace-nowrap">
          {visLine1}
          {typingLine1 && !done && (
            <span className="animate-[blink_0.75s_step-end_infinite] text-accent">▌</span>
          )}
        </span>
        <span className="block">
          {visLine2}
          {(!typingLine1 || done) && (
            <span className="animate-[blink_0.75s_step-end_infinite] text-accent">▌</span>
          )}
        </span>
      </h2>

      {/* Logo + button — center */}
      <div className="flex flex-col items-center pl-6 lg:pl-10">
        <div className="relative mb-6 h-36 w-36">
          <Image
            src="/brand/cursor.png"
            alt=""
            fill
            className="object-contain"
            aria-hidden
          />
        </div>
        <a
          href="/about#contact"
          data-cursor="link"
          className="cut-corner inline-block bg-accent px-10 py-4 text-lg font-semibold tracking-wide text-bg transition hover:brightness-110"
        >
          Get a Quote
        </a>
      </div>

      {/* Contact info — right */}
      <div className="space-y-4 pl-6 lg:pb-2 lg:pl-10">
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] uppercase text-text/40">
            Navigate
          </p>
          <ul className="space-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor="link"
                  className="text-sm text-text/70 transition hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] uppercase text-text/40">
            Contact
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor="link"
            className="block text-sm text-text/70 transition hover:text-accent"
          >
            {siteConfig.email}
          </a>
          <p className="mt-1 text-sm text-text/70">{siteConfig.phone}</p>
        </div>
        <p className="text-xs text-text/30">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </div>
  );
}
