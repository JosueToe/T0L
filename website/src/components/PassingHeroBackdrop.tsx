"use client";

import Image from "next/image";
import { featuredProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/lib/motion";

const slides = [
  ...featuredProjects.map((p) => ({
    src: p.thumbnail,
    alt: p.title,
  })),
  ...featuredProjects.map((p) => ({
    src: p.thumbnail,
    alt: p.title,
  })),
];

export function PassingHeroBackdrop() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-bg"
    >
      <div
        className={`flex h-full w-max items-stretch gap-4 ${
          reducedMotion ? "" : "passing-hero-track"
        }`}
      >
        {slides.map((slide, i) => (
          <div
            key={`${slide.alt}-${i}`}
            className="relative h-full w-[72vw] shrink-0 md:w-[55vw] lg:w-[45vw]"
          >
            <Image
              src={slide.src}
              alt=""
              fill
              className="object-cover"
              sizes="55vw"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-bg/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/20 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
    </div>
  );
}
