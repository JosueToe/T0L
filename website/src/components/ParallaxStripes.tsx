"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

export const STRIPS = [
  { id: 0, h: "14%", x: "-8%", pattern: "accent-fine", dir: 1 },
  { id: 1, h: "22%", x: "0%", pattern: "dark-bold", dir: -1 },
  { id: 2, h: "16%", x: "-4%", pattern: "white-med", dir: 1 },
  { id: 3, h: "20%", x: "0%", pattern: "accent-bold", dir: -1 },
  { id: 4, h: "14%", x: "-6%", pattern: "dark-fine", dir: 1 },
  { id: 5, h: "14%", x: "0%", pattern: "white-fine", dir: -1 },
] as const;

export const PATTERN_STYLES: Record<string, React.CSSProperties> = {
  "accent-fine": {
    background:
      "repeating-linear-gradient(90deg,#d4a017 0px,#d4a017 3px,#1a1a1a 3px,#1a1a1a 18px)",
  },
  "dark-bold": {
    background:
      "repeating-linear-gradient(90deg,#111 0px,#111 8px,#d4a017 8px,#d4a017 14px,#111 14px,#111 30px,#f0ebe0 30px,#f0ebe0 34px)",
  },
  "white-med": {
    background:
      "repeating-linear-gradient(90deg,#e8e0d0 0px,#e8e0d0 5px,#2a2a2a 5px,#2a2a2a 22px)",
  },
  "accent-bold": {
    background:
      "repeating-linear-gradient(90deg,#d4a017 0px,#d4a017 10px,#0d0d0d 10px,#0d0d0d 20px,#e8e0d0 20px,#e8e0d0 24px,#0d0d0d 24px,#0d0d0d 38px)",
  },
  "dark-fine": {
    background:
      "repeating-linear-gradient(90deg,#1c1c1c 0px,#1c1c1c 2px,#d4a017 2px,#d4a017 6px,#1c1c1c 6px,#1c1c1c 14px)",
  },
  "white-fine": {
    background:
      "repeating-linear-gradient(90deg,#f0ebe0 0px,#f0ebe0 4px,#0d0d0d 4px,#0d0d0d 16px,#d4a017 16px,#d4a017 19px,#0d0d0d 19px,#0d0d0d 32px)",
  },
};

function ParallaxStrip({
  strip,
  scrollYProgress,
}: {
  strip: (typeof STRIPS)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const travel = 14 * strip.dir;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${travel}%`]);

  return (
    <motion.div
      className="absolute w-[120%] -left-[10%]"
      style={{
        height: strip.h,
        top: `${(STRIPS.indexOf(strip) / STRIPS.length) * 100}%`,
        x,
        ...PATTERN_STYLES[strip.pattern],
      }}
    />
  );
}

export function ParallaxStripes({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="absolute inset-0">
      {STRIPS.map((strip) => (
        <ParallaxStrip key={strip.id} strip={strip} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}
