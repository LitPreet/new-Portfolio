"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Fragment } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts in the first time it scrolls into view. */
export function Reveal({ delay = 0, className, children, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, ease, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Small spaced-out mono label above each section. */
export function Label({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-baseline justify-between">
      <h2 className="font-mono text-[11.5px] font-medium tracking-[0.18em] text-ink-3 uppercase">{children}</h2>
      {right}
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={`inline-block transition-transform duration-200 ${className}`}
      aria-hidden
    >
      <path d="M1 6h9.5M6.5 2l4 4-4 4" />
    </svg>
  );
}

const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders text with [label](url) segments as dashed-underline links. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(linkRe)) {
    parts.push(<Fragment key={last}>{text.slice(last, m.index)}</Fragment>);
    parts.push(
      <a key={m.index + "l"} href={m[2]} target="_blank" rel="noopener" className="dash">
        {m[1]}
      </a>,
    );
    last = (m.index ?? 0) + m[0].length;
  }
  parts.push(<Fragment key="end">{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
