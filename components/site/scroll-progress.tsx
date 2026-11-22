"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const left = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const progress = reduce ? scrollYProgress : smooth;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px]" aria-hidden>
      <motion.div
        style={{ scaleX: progress }}
        className="h-full origin-left bg-[linear-gradient(90deg,var(--emerald),var(--cyan)_55%,var(--violet))]"
      />
      <motion.span
        style={{ left }}
        className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_10px_2px_rgba(25,227,166,.6)]"
      />
    </div>
  );
}
