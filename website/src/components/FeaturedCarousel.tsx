"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { featuredProjects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/lib/motion";

const AUTO_ADVANCE_MS = 5500;

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const getSlides = useCallback(() => {
    const el = trackRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>("[data-slide]"));
  }, []);

  const scrollToSlide = useCallback(
    (index: number, behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth") => {
      const el = trackRef.current;
      const slides = getSlides();
      if (!el || !slides.length) return;

      const slide = slides[index];
      const targetLeft =
        slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;

      el.scrollTo({ left: targetLeft, behavior });
    },
    [getSlides, reducedMotion]
  );

  const getActiveIndex = useCallback(() => {
    const el = trackRef.current;
    const slides = getSlides();
    if (!el || !slides.length) return 0;

    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let activeIndex = 0;
    let nearestDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - slideCenter);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        activeIndex = index;
      }
    });

    return activeIndex;
  }, [getSlides]);

  const advanceSlide = useCallback(() => {
    if (isDraggingRef.current || reducedMotion) return;
    const slides = getSlides();
    if (!slides.length) return;
    const nextIndex = (getActiveIndex() + 1) % slides.length;
    scrollToSlide(nextIndex);
  }, [getActiveIndex, getSlides, reducedMotion, scrollToSlide]);

  const snapToNearest = useCallback(
    (behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth") => {
      scrollToSlide(getActiveIndex(), behavior);
    },
    [getActiveIndex, reducedMotion, scrollToSlide]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: 0,
    };

    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!isDraggingRef.current || !el) return;

    const dx = e.clientX - dragState.current.startX;
    dragState.current.moved = Math.max(
      dragState.current.moved,
      Math.abs(dx)
    );

    if (dragState.current.moved > 3) {
      e.preventDefault();
    }

    el.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }

    el.style.cursor = "grab";
    el.style.scrollSnapType = "";

    if (dragState.current.moved > 8) {
      snapToNearest();
    }
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.cursor = "grab";
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(advanceSlide, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [advanceSlide, reducedMotion]);

  const handleLinkClick = (e: React.MouseEvent) => {
    if (dragState.current.moved > 8) {
      e.preventDefault();
    }
  };

  return (
    <section className="relative">
      <div className="mb-6 flex items-end justify-between px-6 lg:px-10">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-text/50">
            Featured Work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Selected projects
          </h2>
        </div>
        <p className="text-xs tracking-[0.2em] uppercase text-accent">
          Drag to Explore
        </p>
      </div>

      <div
        ref={trackRef}
        className={`featured-carousel flex gap-6 overflow-x-auto px-6 pb-6 lg:px-10 ${
          isDragging ? "is-dragging snap-none" : "snap-x snap-mandatory"
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="region"
        aria-label="Featured projects carousel"
      >
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            data-slide
            className="group w-[85vw] shrink-0 snap-center md:w-[70vw] lg:w-[55vw]"
          >
            <Link
              href={`/work/${project.slug}`}
              data-cursor="link"
              className="block select-none"
              draggable={false}
              onClick={handleLinkClick}
            >
              <div className="cut-frame relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className={`object-cover transition duration-700 ${
                    isDragging ? "scale-100" : "group-hover:scale-[1.03]"
                  }`}
                  sizes="(max-width: 768px) 85vw, 55vw"
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />
              </div>
              <div className="mt-5 grid grid-cols-[1fr_auto_auto] items-baseline gap-4 border-t border-white/10 pt-4">
                <h3 className="text-xl font-semibold tracking-tight transition group-hover:text-accent">
                  {project.title}
                </h3>
                <span className="text-sm text-text/50">{project.year}</span>
                <span className="text-sm text-text/50">{project.category}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
