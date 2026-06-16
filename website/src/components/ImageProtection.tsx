"use client";

import { useEffect } from "react";

/**
 * Discourages casual image save/drag on the public site.
 * Note: determined users can still capture assets via devtools or screenshots.
 */
export function ImageProtection() {
  useEffect(() => {
    const blockMediaAction = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (target.closest("img, video, picture")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockMediaAction);
    document.addEventListener("dragstart", blockMediaAction);

    return () => {
      document.removeEventListener("contextmenu", blockMediaAction);
      document.removeEventListener("dragstart", blockMediaAction);
    };
  }, []);

  return null;
}
