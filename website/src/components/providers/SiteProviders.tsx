"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReset } from "@/components/ScrollReset";
import { LenisContext } from "@/components/providers/LenisContext";

export function SiteProviders({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const l = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    setLenis(l);

    let frame = 0;
    const raf = (time: number) => {
      l.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Auto-resize Lenis whenever the document height changes (tab switches,
    // modals opening/closing, dynamic content) so scroll bounds never go stale
    const ro = new ResizeObserver(() => l.resize());
    ro.observe(document.body);

    // Pause Lenis when tab is hidden, resume when visible again
    const onVisibilityChange = () => {
      if (document.hidden) {
        l.stop();
      } else {
        l.start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      l.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      <ScrollReset />
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </LenisContext.Provider>
  );
}
