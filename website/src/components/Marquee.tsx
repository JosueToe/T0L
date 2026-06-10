"use client";

import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/motion";

export function Marquee() {
  const reducedMotion = usePrefersReducedMotion();
  const items = [...siteConfig.marqueeItems, ...siteConfig.marqueeItems];

  return (
    <section
      aria-label="Partners and capabilities"
      className="overflow-hidden border-y border-white/8 py-8"
    >
      <div
        className={`flex w-max items-center gap-0 whitespace-nowrap ${reducedMotion ? "" : "marquee-track"}`}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center"
          >
            <span className="px-10 text-[clamp(2rem,5vw,4rem)] font-semibold tracking-tight text-text/60">
              {item}
            </span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent/70" aria-hidden />
          </span>
        ))}
      </div>
    </section>
  );
}
