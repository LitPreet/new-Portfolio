"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, useSyncExternalStore } from "react";
import { contactLinks, profile } from "@/content";
import { Pixel, catAwakeRows, catPalette, catRows } from "./Pixel";
import { ACCENTS, setAccent, useAccent } from "./theme";
import { Label, Reveal } from "./ui";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
};

const MEOWS = ["mrrp?", "meow.", "5 more mins", "ship it 🚀", "prrr…", "no bugs here"];

export function Footer() {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "");

  return (
    <footer className="pt-20 pb-[calc(24px+env(safe-area-inset-bottom))]">
      <Reveal>
        <Label>Contact</Label>
        <ul className="flex flex-wrap gap-x-9 gap-y-3">
          {contactLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener"
                className="group inline-flex items-center gap-1 py-1 text-[15px]"
              >
                <span className="dash">{l.label}</span>
                <span className="text-[11px] text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 flex items-end justify-between gap-4">
        <div className="space-y-3 pb-2">
          <Swatches />
          <p className="font-mono text-[13px] text-ink-3 tabular-nums">
            {time || "--:--:-- --"} · {profile.location}
          </p>
        </div>
        <Cat />
      </div>
    </footer>
  );
}

/** Pick the site's accent color. The new color spreads out from the tapped swatch. */
function Swatches() {
  const accent = useAccent();
  return (
    <div className="flex items-center gap-2.5">
      <span className="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase">Paint</span>
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Accent color">
        {ACCENTS.map((a) => {
          const active = a.id === accent;
          return (
            <motion.button
              key={a.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={a.label}
              title={a.label}
              whileTap={{ scale: 0.85 }}
              whileHover={{ y: -2 }}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setAccent(a.id, r.left + r.width / 2, r.top + r.height / 2);
              }}
              className="relative grid size-8 place-items-center"
            >
              {active && (
                <motion.span
                  layoutId="swatch-ring"
                  className="absolute inset-1 rounded-[5px] border-2 border-ink"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                />
              )}
              <span className="size-3.5 rounded-[3px]" style={{ background: a.swatch }} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/** Sleeping cat on a laptop. Tap it and it wakes up for a moment. */
function Cat() {
  const [awake, setAwake] = useState(false);
  const [line, setLine] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const poke = () => {
    clearTimeout(timer.current);
    setLine((n) => (awake ? (n + 1) % MEOWS.length : n));
    setAwake(true);
    timer.current = setTimeout(() => setAwake(false), 2200);
  };

  return (
    <motion.button
      type="button"
      onClick={poke}
      aria-label="Wake the cat"
      className="relative mr-1 shrink-0 cursor-pointer"
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {awake ? (
          <motion.span
            key={`say-${line}`}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute right-6 -top-8 rounded-full rounded-br-sm bg-soft px-2.5 py-1 text-[12px] whitespace-nowrap text-ink"
          >
            {MEOWS[line]}
          </motion.span>
        ) : (
          <motion.span key="zzz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-hidden>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute font-mono font-bold text-ink-3"
                style={{ right: 50 - i * 2, top: -6, fontSize: 10 + i * 3 }}
                animate={{ opacity: [0, 1, 0], y: [0, -14 - i * 6], x: [0, 6 + i * 4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i, ease: "easeOut" }}
              >
                z
              </motion.span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        animate={awake ? { y: [0, -6, 0], scaleY: 1 } : { y: 0, scaleY: [1, 1.04, 1] }}
        transition={awake ? { duration: 0.35 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: 1 }}
      >
        <Pixel rows={awake ? catAwakeRows : catRows} palette={catPalette} scale={3} />
      </motion.div>
    </motion.button>
  );
}
