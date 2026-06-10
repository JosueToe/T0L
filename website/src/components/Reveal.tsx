"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, revealTransition, staggerContainer } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  stagger?: boolean;
  delay?: number;
}

export function Reveal({
  children,
  className = "",
  as = "div",
  stagger = false,
  delay = 0,
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as];

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerContainer : fadeUp}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={revealTransition}
    >
      {children}
    </motion.div>
  );
}
