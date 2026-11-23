"use client";

import { AnimatePresence, motion } from "motion/react";
import { Pixel, lampPalette, lampRows, starRows } from "./Pixel";
import { toggleTheme, useDark } from "./theme";

// where the little stars sit (relative to the button) when the lights are off
const STARS = [
  { x: -26, y: 6, s: 2, d: 0 },
  { x: 6, y: 46, s: 1.5, d: 0.6 },
  { x: 48, y: 58, s: 2, d: 1.2 },
  { x: -10, y: 70, s: 1.5, d: 1.8 },
  { x: 64, y: 2, s: 1.5, d: 0.9 },
];

/** Pixel desk lamp in the corner. Clicking it switches light / dark,
 *  with the new theme spreading out from the bulb. */
export function Lamp() {
  const dark = useDark();
  const on = !dark;

  return (
    <motion.button
      type="button"
      onClick={(e) => {
        const bulb = e.currentTarget.querySelector("svg")?.getBoundingClientRect();
        if (bulb) toggleTheme(bulb.left + bulb.width / 2, bulb.top + bulb.height * 0.45);
        else toggleTheme();
      }}
      aria-label={on ? "Turn the lights off (dark mode)" : "Turn the lights on (light mode)"}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      whileTap={{ scale: 0.94 }}
      className="group absolute top-3 right-4 flex items-start gap-2 sm:top-4 sm:-right-24"
    >
      <span className="relative mt-3 overflow-hidden rounded-full bg-soft px-2.5 py-1 text-[12px] font-medium whitespace-nowrap text-ink shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={on ? "off" : "on"}
            className="block"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {on ? "Lights off" : "Lights on"}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* twinkling stars once it's dark */}
      <AnimatePresence>
        {dark &&
          STARS.map((st, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute"
              style={{ left: st.x, top: st.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1], scale: 1 }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
              transition={{
                scale: { delay: 0.2 + i * 0.08, type: "spring", stiffness: 400, damping: 15 },
                opacity: { delay: 0.2 + st.d, duration: 2.4, repeat: Infinity, repeatType: "mirror" },
              }}
            >
              <Pixel rows={starRows} palette={{ s: "#ffe9a8" }} scale={st.s} />
            </motion.span>
          ))}
      </AnimatePresence>

      <span className="relative block">
        {/* warm glow under the shade */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute top-6 left-1/2 h-20 w-[76px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(255,196,92,0.45), transparent)" }}
          animate={{ opacity: on ? [0, 1, 0.5, 1] : 0 }}
          transition={{ duration: on ? 0.5 : 0.25, times: on ? [0, 0.3, 0.5, 1] : undefined }}
        />
        <motion.span
          className="relative block origin-bottom"
          whileHover={{ rotate: [-2, 2, -1, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Pixel rows={lampRows} palette={lampPalette(on)} scale={3.5} />
        </motion.span>
      </span>
    </motion.button>
  );
}
