"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const WORDS = ["Reliability", "Speed", "Support"];
const TYPE_SPEED = 55;
const DELETE_SPEED = 28;
const PAUSE_AFTER_TYPE = 1400;
const PAUSE_BEFORE_NEXT = 180;

export function AboutTaglineTypewriter() {
  const reducedMotion = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setCharCount(WORDS[0].length);
      return;
    }

    const word = WORDS[idx % WORDS.length];

    if (!deleting) {
      if (charCount < word.length) {
        const t = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (charCount > 0) {
      const t = setTimeout(() => setCharCount((c) => c - 1), DELETE_SPEED);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % WORDS.length);
      setDeleting(false);
    }, PAUSE_BEFORE_NEXT);
    return () => clearTimeout(t);
  }, [charCount, deleting, idx, reducedMotion]);

  const currentWord = WORDS[idx % WORDS.length].slice(0, charCount);

  if (reducedMotion) {
    return (
      <p className="mt-3 text-center text-sm font-bold tracking-[0.18em] uppercase text-accent md:mt-4 md:text-base">
        Reliability · Speed · Support
      </p>
    );
  }

  return (
    <div
      className="mt-3 min-h-[1.25rem] text-center text-sm font-bold tracking-[0.18em] uppercase text-accent md:mt-4 md:min-h-[1.5rem] md:text-base"
      aria-live="polite"
    >
      <span className="inline-block min-w-[9.5rem] md:min-w-[11rem]">
        {currentWord}
        <span className="animate-[blink_0.75s_step-end_infinite]">▌</span>
      </span>
    </div>
  );
}
