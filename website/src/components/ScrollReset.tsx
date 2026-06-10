"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLenis } from "@/components/providers/LenisContext";

export function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (lenis) {
      // Scroll to 0 immediately, then resize after the new page has rendered
      // so Lenis recalculates scroll bounds for the new page's height.
      lenis.scrollTo(0, { immediate: true });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          lenis.resize();
        });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, lenis]);

  return null;
}
