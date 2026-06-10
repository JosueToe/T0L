"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

export function CustomCursor() {
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [touchDevice, setTouchDevice] = useState(true);

  const x = useSpring(0, { stiffness: reducedMotion ? 1000 : 280, damping: 28 });
  const y = useSpring(0, { stiffness: reducedMotion ? 1000 : 280, damping: 28 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 1024;
    const disabled = coarse || narrow;
    setTouchDevice(disabled);

    if (disabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
    };
  }, [visible, x, y]);

  if (touchDevice) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ x, y, opacity: visible ? 1 : 0 }}
    >
      <Image
        src="/brand/cursor.png"
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
        priority
      />
    </motion.div>
  );
}
