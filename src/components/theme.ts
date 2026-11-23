"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const query = "(prefers-color-scheme: dark)";
const EVENT = "themechange";

export const ACCENTS = [
  { id: "emerald", label: "Emerald", swatch: "#0f7a55" },
  { id: "blue", label: "Blue", swatch: "#2f55e4" },
  { id: "violet", label: "Violet", swatch: "#6d3fdb" },
  { id: "rose", label: "Rose", swatch: "#c92a62" },
] as const;
export type Accent = (typeof ACCENTS)[number]["id"];

function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    mq.removeEventListener("change", cb);
    window.removeEventListener(EVENT, cb);
  };
}

const root = () => document.documentElement;

function isDark() {
  const t = root().dataset.theme;
  return t ? t === "dark" : window.matchMedia(query).matches;
}

function currentAccent(): Accent {
  return (root().dataset.accent as Accent) || "emerald";
}

/** Current theme, following the OS until the visitor picks one. */
export function useDark() {
  return useSyncExternalStore(subscribe, isDark, () => false);
}

export function useAccent() {
  return useSyncExternalStore(subscribe, currentAccent, () => "emerald" as Accent);
}

function save(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

/**
 * Applies a change with a circular reveal growing from (x, y).
 * Falls back to an instant swap where View Transitions aren't supported
 * or the visitor prefers reduced motion.
 */
function withReveal(apply: () => void, x: number, y: number) {
  const run = () => {
    apply();
    window.dispatchEvent(new Event(EVENT));
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduce) return run();

  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const t = document.startViewTransition(() => flushSync(run));
  t.ready.then(() => {
    root().animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}

export function toggleTheme(x = innerWidth, y = 0) {
  const next = isDark() ? "light" : "dark";
  withReveal(() => {
    root().dataset.theme = next;
    save("theme", next);
  }, x, y);
}

export function setAccent(accent: Accent, x = innerWidth / 2, y = innerHeight) {
  if (accent === currentAccent()) return;
  withReveal(() => {
    if (accent === "emerald") delete root().dataset.accent;
    else root().dataset.accent = accent;
    save("accent", accent);
  }, x, y);
}
