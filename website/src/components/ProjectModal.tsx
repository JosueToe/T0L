"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { useLenis } from "@/components/providers/LenisContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const lenis = useLenis();

  // Reset slide index when project changes
  useEffect(() => { setSlide(0); }, [project]);

  // Use gallery for slideshow; if gallery is just the logo/thumb, fall back to thumbnail only
  const slides = project
    ? project.gallery.length > 0 && project.gallery[0] !== project.thumbnail
      ? project.gallery
      : [project.thumbnail]
    : [];

  // Auto-advance slideshow every 3s when there are multiple images
  useEffect(() => {
    if (!project || slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlide((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  useEffect(() => {
    if (!project) return;
    // Save exact scroll position before locking
    const savedScroll = window.scrollY;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      // Re-sync Lenis to the saved position so it doesn't clamp or drift
      requestAnimationFrame(() => {
        lenis?.start();
        lenis?.resize();
        lenis?.scrollTo(savedScroll, { immediate: true });
      });
    };
  }, [project, onClose, lenis]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            ref={modalRef}
            className="cut-frame my-8 w-full max-w-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Slideshow / thumbnail */}
            <div className="relative h-56 w-full bg-bg/80 overflow-hidden md:h-64">
              <button
                type="button"
                data-cursor="link"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-white/15 bg-bg/90 text-text transition hover:border-accent/50 hover:text-accent"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Crossfade between gallery images */}
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

              {/* Dot indicators — only shown when multiple images */}
              {slides.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
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
              {/* Header */}
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
                <span className="text-sm text-text/40 shrink-0 pt-1">{project.year}</span>
              </div>

              {/* Overview */}
              <div className="mb-6 space-y-4">
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-text/40 mb-2">The Problem</p>
                  <p className="leading-relaxed text-muted">{project.overview.problem}</p>
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-text/40 mb-2">Our Solution</p>
                  <p className="leading-relaxed text-muted">{project.overview.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h3 className="text-base font-semibold tracking-tight mb-4">Results</h3>
                <ul className="space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3 text-sm text-text/85">
                      <span className="mt-0.5 shrink-0 text-accent" aria-hidden>✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row">
                {project.siteUrl ? (
                  <a
                    href={project.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="cut-corner flex-1 border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-text transition hover:border-accent/50 hover:text-accent text-center"
                  >
                    {project.siteUrl.includes("microsoft.com") ? "View on Microsoft Store ↗" : "Visit Project ↗"}
                  </a>
                ) : (
                  <span className="flex-1 px-6 py-3.5 text-sm text-text/40 text-center border border-white/10">
                    Private web app with no public link
                  </span>
                )}
                <a
                  href="/about#contact"
                  data-cursor="link"
                  className="cut-corner flex-1 bg-accent px-6 py-3.5 text-sm font-semibold tracking-wide text-bg transition hover:brightness-110 text-center"
                >
                  Start a Similar Project
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
