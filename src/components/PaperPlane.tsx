"use client";

import { motion, useReducedMotion } from "motion/react";
import { Pixel, planePalette, planeRows } from "./Pixel";

/** A pixel paper plane that drifts across the screen every so often. */
export function PaperPlane() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-[38%] z-20 overflow-hidden">
      <motion.div
        className="w-fit"
        initial={{ x: "-12vw", y: 0 }}
        animate={{
          x: ["-12vw", "112vw"],
          y: [0, -46, 8, -30, 14, -10],
          rotate: [-4, 4, -2, 5, -3, 0],
        }}
        transition={{ duration: 16, delay: 3, repeat: Infinity, repeatDelay: 14, ease: "linear" }}
      >
        <Pixel rows={planeRows} palette={planePalette} scale={3} />
      </motion.div>
    </div>
  );
}
