"use client";

import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/components/providers/LenisContext";

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  ariaLabelledBy: string;
  children: ReactNode;
}

export function ModalShell({
  open,
  onClose,
  ariaLabelledBy,
  children,
}: ModalShellProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;

    const savedScroll = window.scrollY;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      requestAnimationFrame(() => {
        lenis?.start();
        lenis?.resize();
        lenis?.scrollTo(savedScroll, { immediate: true });
      });
    };
  }, [open, onClose, lenis]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy}
          className="fixed inset-0 z-[100] flex flex-col bg-bg/85 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-text/50">
              Details
            </p>
            <button
              type="button"
              onClick={onClose}
              className="cut-corner flex min-h-11 items-center gap-2 bg-accent px-4 py-2.5 text-sm font-bold tracking-wide text-bg transition hover:brightness-110"
              aria-label="Close"
            >
              <span className="text-base leading-none" aria-hidden>
                ✕
              </span>
              Close
            </button>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6"
            data-lenis-prevent
            onClick={handleBackdropClick}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <motion.div
              ref={panelRef}
              className="cut-frame mx-auto w-full max-w-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
