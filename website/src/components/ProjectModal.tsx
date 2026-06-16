"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { ModalShell } from "@/components/ModalShell";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [project]);

  const slides = project
    ? project.gallery.length > 0 && project.gallery[0] !== project.thumbnail
      ? project.gallery
      : [project.thumbnail]
    : [];

  useEffect(() => {
    if (!project || slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlide((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [project, slides.length]);

  return (
    <ModalShell
      open={!!project}
      onClose={onClose}
      ariaLabelledBy="project-modal-title"
    >
      {project && (
        <>
          <div className="relative h-48 w-full overflow-hidden bg-bg/80 sm:h-56 md:h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <Image
                  src={slides[slide]}
                  alt={`${project.title} screenshot ${slide + 1}`}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority={slide === 0}
                />
              </motion.div>
            </AnimatePresence>

            {slides.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-5 bg-accent" : "w-1.5 bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2
                  id="project-modal-title"
                  className="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {project.title}
                </h2>
                <span className="mt-3 inline-block border border-accent/30 bg-accent/10 px-3 py-1 text-xs tracking-[0.12em] uppercase text-accent">
                  {project.category}
                </span>
              </div>
              <span className="shrink-0 pt-1 text-sm text-text/40">
                {project.year}
              </span>
            </div>

            <div className="mb-6 space-y-4">
              <div>
                <p className="mb-2 text-xs tracking-[0.15em] uppercase text-text/40">
                  The Problem
                </p>
                <p className="leading-relaxed text-muted">
                  {project.overview.problem}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs tracking-[0.15em] uppercase text-text/40">
                  Our Solution
                </p>
                <p className="leading-relaxed text-muted">
                  {project.overview.solution}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-base font-semibold tracking-tight">
                Results
              </h3>
              <ul className="space-y-3">
                {project.results.map((result) => (
                  <li
                    key={result}
                    className="flex items-start gap-3 text-sm text-text/85"
                  >
                    <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
                      ✓
                    </span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
              {project.siteUrl ? (
                <a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cut-corner flex-1 border border-white/20 px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-text transition hover:border-accent/50 hover:text-accent"
                >
                  {project.siteUrl.includes("microsoft.com")
                    ? "View on Microsoft Store ↗"
                    : "Visit Project ↗"}
                </a>
              ) : (
                <span className="flex-1 border border-white/10 px-6 py-3.5 text-center text-sm text-text/40">
                  Private web app with no public link
                </span>
              )}
              <a
                href="/about#contact"
                className="cut-corner flex-1 bg-accent px-6 py-3.5 text-center text-sm font-semibold tracking-wide text-bg transition hover:brightness-110"
              >
                Start a Similar Project
              </a>
            </div>
          </div>
        </>
      )}
    </ModalShell>
  );
}
