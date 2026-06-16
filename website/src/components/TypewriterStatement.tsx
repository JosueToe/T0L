"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const TAGLINES = [
  "Clean builds.",
  "Reliable systems.",
  "Business solutions.",
  "Every time.",
];

const SERVICES = [
  "Managed IT Support",
  "Web Design & Development",
  "Custom Software",
  "Mobile Apps for iOS & Android",
  "Network & Security",
  "Cloud & Hosting",
  "Process Automation",
  "API Integrations",
  "SEO & Performance",
  "Ongoing Maintenance",
  "Help Desk Coverage",
  "System Migrations",
];

const TYPE_SPEED_TAGLINE = 45;
const TYPE_SPEED_SERVICE = 28;
const DELETE_SPEED = 16;
const PAUSE_AFTER_TAGLINE = 460;
const PAUSE_BEFORE_DELETE = 1200;
const PAUSE_BEFORE_NEXT = 160;

type Phase = "taglines" | "cycling";

export function TypewriterStatement() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const [taglineDone, setTaglineDone] = useState(0);
  const [taglineChar, setTaglineChar] = useState(0);

  const [phase, setPhase] = useState<Phase>("taglines");
  const [svcIdx, setSvcIdx] = useState(0);
  const [svcChar, setSvcChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setTaglineDone(TAGLINES.length);
      setPhase("cycling");
      setSvcChar(SERVICES[0].length);
      setStarted(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  // Tagline typing
  useEffect(() => {
    if (!started || phase !== "taglines") return;
    if (taglineDone >= TAGLINES.length) { setPhase("cycling"); return; }
    const line = TAGLINES[taglineDone];
    if (taglineChar < line.length) {
      const t = setTimeout(() => setTaglineChar((c) => c + 1), TYPE_SPEED_TAGLINE);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setTaglineDone((d) => d + 1); setTaglineChar(0); }, PAUSE_AFTER_TAGLINE);
      return () => clearTimeout(t);
    }
  }, [started, phase, taglineDone, taglineChar]);

  // Service cycling
  useEffect(() => {
    if (!started || phase !== "cycling") return;
    const service = SERVICES[svcIdx % SERVICES.length];
    if (!deleting) {
      if (svcChar < service.length) {
        const t = setTimeout(() => setSvcChar((c) => c + 1), TYPE_SPEED_SERVICE);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setDeleting(true), PAUSE_BEFORE_DELETE);
        return () => clearTimeout(t);
      }
    } else {
      if (svcChar > 0) {
        const t = setTimeout(() => setSvcChar((c) => c - 1), DELETE_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => { setSvcIdx((i) => (i + 1) % SERVICES.length); setDeleting(false); }, PAUSE_BEFORE_NEXT);
        return () => clearTimeout(t);
      }
    }
  }, [started, phase, svcIdx, svcChar, deleting]);

  const currentService = SERVICES[svcIdx % SERVICES.length].slice(0, svcChar);

  return (
    <div
      ref={containerRef}
      className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-28"
    >
      {/* LEFT — stacked taglines */}
      <div className="flex flex-col justify-center border-b border-white/8 pb-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
        <div>
          {TAGLINES.map((line, i) => {
            if (taglineDone > i) {
              return (
                <div
                  key={i}
                  className="text-[clamp(1.5rem,3.8vw,4.2rem)] font-semibold leading-[1.12] tracking-tight text-text"
                >
                  {line}
                </div>
              );
            }
            if (taglineDone === i) {
              return (
                <div
                  key={i}
                  className="text-[clamp(1.5rem,3.8vw,4.2rem)] font-semibold leading-[1.12] tracking-tight text-text"
                >
                  {line.slice(0, taglineChar)}
                  {phase === "taglines" && (
                    <span className="animate-[blink_0.75s_step-end_infinite] text-accent">▌</span>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* RIGHT — logo + "is all about" + cycling service */}
      <div className="flex flex-col justify-between pt-12 lg:pl-16 lg:pt-0">
        {/* Logo */}
        <div className="flex flex-1 items-center">
          <Image
            src="/brand/logo-wordmark.png"
            alt="T0L LLC"
            width={420}
            height={126}
            className="h-auto w-full max-w-[280px] opacity-95 sm:max-w-[340px] md:max-w-[420px]"
          />
        </div>

        {/* Divider + label + typewriter — anchored to the bottom */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="mb-3 text-xs tracking-[0.22em] uppercase text-text/40">
            is all about
          </p>
          <div className="min-h-[2.2rem]">
            <span className="text-[clamp(1.2rem,2.4vw,2rem)] font-medium text-text/85">
              {currentService}
            </span>
            <span className="animate-[blink_0.75s_step-end_infinite] text-accent text-[clamp(1.2rem,2.4vw,2rem)]">
              ▌
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
