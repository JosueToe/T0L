"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { HostedSite } from "@/data/hostedSites";
import { useLenis } from "@/components/providers/LenisContext";

interface HostedSiteModalProps {
  site: HostedSite | null;
  onClose: () => void;
}

export function HostedSiteModal({ site, onClose }: HostedSiteModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!site) return;

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
  }, [site, onClose, lenis]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubscribe = () => {
    if (!site) return;
    window.open(site.stripePaymentLink, "_blank", "noopener,noreferrer");
  };

  const handleLivePreview = () => {
    if (!site) return;
    window.open(site.url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {site && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-bg/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hosted-site-modal-title"
        >
          <motion.div
            ref={modalRef}
            className="cut-frame my-8 w-full max-w-2xl overflow-hidden border border-white/10 bg-surface shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <button
                type="button"
                data-cursor="link"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center border border-white/15 bg-bg/90 text-text transition hover:border-accent/50 hover:text-accent"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="relative h-56 w-full bg-bg md:h-64">
                <Image
                  src={site.thumbnail}
                  alt={site.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 672px"
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2
                    id="hosted-site-modal-title"
                    className="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    {site.name}
                  </h2>
                  <span className="mt-3 inline-block border border-accent/30 bg-accent/10 px-3 py-1 text-xs tracking-[0.12em] uppercase text-accent">
                    {site.industry}
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-semibold text-accent">
                    ${site.yearlyPrice}
                    <span className="text-base font-normal text-muted">
                      /year
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text/50">
                    ${site.monthlyPrice.toFixed(2)}/mo
                  </p>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted">
                {site.description}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  What&apos;s included
                </h3>
                <ul className="mt-4 space-y-3">
                  {site.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-text/85"
                    >
                      <span
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    data-cursor="link"
                    onClick={handleSubscribe}
                    className="cut-corner flex-1 bg-accent px-6 py-3.5 text-sm font-semibold tracking-wide text-bg transition hover:brightness-110"
                  >
                    Subscribe · ${site.yearlyPrice}/year
                  </button>
                  <button
                    type="button"
                    data-cursor="link"
                    onClick={handleLivePreview}
                    className="cut-corner flex-1 border border-white/20 px-6 py-3.5 text-sm font-semibold tracking-wide text-text transition hover:border-accent/50 hover:text-accent"
                  >
                    Live Preview ↗
                  </button>
                </div>

                <p className="mt-4 text-center text-sm text-muted">
                  Premium hosting included. Secure payments by Stripe. Cancel
                  anytime.
                </p>
                <p className="mt-3 text-center text-xs leading-relaxed text-text/45">
                  Questions before subscribing?{" "}
                  <a
                    href="/about#contact"
                    data-cursor="link"
                    className="text-accent hover:underline"
                  >
                    Contact us
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
