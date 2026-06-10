"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const SKILLS = [
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

export function ServicesCylinder() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={ref} className="relative overflow-hidden py-16">
      <div className="mb-6 px-6 lg:px-10">
        <p className="text-xs tracking-[0.2em] uppercase text-text/40">
          Services, skills &amp; expertise
        </p>
      </div>

      <motion.ul
        style={reducedMotion ? undefined : { y }}
        className="space-y-0 px-6 lg:px-10"
      >
        {[...SKILLS, ...SKILLS].map((skill, i) => (
          <li
            key={`${skill}-${i}`}
            className="group flex items-center justify-between border-t border-white/8 py-5 first:border-t-0"
          >
            <span className="text-2xl font-semibold tracking-tight text-text/70 transition-colors duration-300 group-hover:text-text md:text-3xl lg:text-4xl">
              {skill}
            </span>
            <span className="ml-6 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100">
              →
            </span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
