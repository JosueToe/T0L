"use client";

import { useEffect, useState } from "react";

/** Devices that support precise mouse hover (desktop/laptop with a mouse). */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export function supportsFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

export function useFinePointer(): boolean {
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return finePointer;
}
