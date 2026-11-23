"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { chat, profile } from "@/content";

/**
 * "Let's talk" — a scripted chat that plays out once it scrolls into view,
 * with a typing indicator before each message.
 */
export function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const total = chat.length;
  const done = reduce || shown >= total;
  const visible = reduce ? total : shown;

  useEffect(() => {
    if (!inView || done) return;
    const prev = chat[shown - 1];
    const next = chat[shown];
    const len = "text" in next ? next.text.length : 20;
    // same-speaker follow-ups come quicker; a new speaker "types" a bit first
    const wait = shown === 0 ? 300 : (prev?.from === next.from ? 450 : 900) + Math.min(len * 12, 600);
    const t = setTimeout(() => setShown((s) => s + 1), wait);
    return () => clearTimeout(t);
  }, [inView, shown, done]);

  const next = chat[visible];

  return (
    <div ref={ref} className="flex min-h-[200px] flex-col">
      {chat.slice(0, visible).map((m, i) => {
        const prev = chat[i - 1];
        const gap = prev && prev.from !== m.from ? "mt-4" : i === 0 ? "" : "mt-1.5";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            style={{ originX: m.from === "me" ? 0 : 1, originY: 1 }}
            className={`${gap} ${m.from === "me" ? "self-start" : "self-end"} max-w-[86%] sm:max-w-[80%]`}
          >
            {"text" in m ? (
              <p
                className={`rounded-[18px] px-3.5 py-2 text-[14.5px] leading-snug ${
                  m.from === "me" ? "rounded-bl-[6px] bg-soft text-ink" : "rounded-br-[6px] bg-bubble text-white"
                }`}
              >
                {m.text}
              </p>
            ) : m.kind === "email" ? (
              <EmailCard />
            ) : (
              <Socials />
            )}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {!done && inView && next && (
          <motion.div
            key={`typing-${visible}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className={`mt-2 flex gap-1 rounded-[18px] px-3.5 py-3 ${
              next.from === "me" ? "self-start bg-soft" : "self-end bg-bubble"
            }`}
            aria-hidden
          >
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className={`size-1.5 rounded-full ${next.from === "me" ? "bg-ink-3" : "bg-white/80"}`}
                animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* screen readers / no-JS get the full contact info immediately */}
      <p className="sr-only">
        Email {profile.email}. LinkedIn {profile.links.linkedin}. GitHub {profile.links.github}.
      </p>
    </div>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  // press "C" anywhere (outside inputs) to copy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "c" || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      copy();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy]);

  return (
    <div className="w-[300px] max-w-full space-y-1.5">
      <a href={`mailto:${profile.email}`} className="block rounded-[14px] bg-soft px-3.5 py-2.5 text-[14.5px] text-ink">
        {profile.email}
      </a>
      <motion.button
        type="button"
        onClick={copy}
        whileTap={{ scale: 0.97 }}
        className="flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-[12px] border border-line text-[14px] text-ink hover:border-ink-3"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "y" : "n"}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={`inline-flex items-center gap-2 ${copied ? "text-accent" : ""}`}
          >
            {copied ? (
              "Copied ✓"
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <rect x="9" y="9" width="12" height="12" rx="2" />
                  <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                </svg>
                Copy
                <kbd className="hidden rounded border border-line px-1 font-mono text-[10px] text-ink-3 sm:inline">C</kbd>
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function Socials() {
  return (
    <div className="w-[300px] max-w-full space-y-1.5">
      <motion.a
        whileTap={{ scale: 0.97 }}
        href={profile.links.linkedin}
        target="_blank"
        rel="noopener"
        className="flex h-11 items-center justify-center gap-2 rounded-[12px] border border-line text-[14px] text-ink hover:border-ink-3"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z" />
        </svg>
        Connect on LinkedIn
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.97 }}
        href={profile.links.github}
        target="_blank"
        rel="noopener"
        className="flex h-11 items-center justify-center gap-2 rounded-[12px] border border-line text-[14px] text-ink hover:border-ink-3"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
        </svg>
        See my GitHub
      </motion.a>
    </div>
  );
}
