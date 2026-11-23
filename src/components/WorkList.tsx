"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import type { WorkItem } from "@/content";
import { Arrow, ease } from "./ui";

/** Two-column list: accent meta on the left, title + description on the right. */
export function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="space-y-6"
    >
      {items.map((it) => (
        <Row key={it.meta + it.title} it={it} />
      ))}
    </motion.ul>
  );
}

function Row({ it }: { it: WorkItem }) {
  // Hover preview that trails the cursor (desktop only — phones never fire hover).
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });

  const titleInner = (
    <>
      {it.title}
      {it.href && <Arrow className="ml-1 -translate-y-px group-hover:translate-x-0.5" />}
    </>
  );

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
      }}
      className="grid grid-cols-[88px_1fr] gap-x-3 sm:grid-cols-[102px_1fr]"
    >
      <div className="pt-[1px]">
        <div className="font-mono text-[13px] leading-tight text-accent">{it.meta}</div>
        {it.sub && <div className="mt-0.5 text-[11px] text-ink-3">{it.sub}</div>}
      </div>

      <div
        className="relative min-w-0"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left + 16);
          y.set(e.clientY - r.top + 16);
        }}
      >
        {it.title &&
          (it.href ? (
            <a
              href={it.href}
              target="_blank"
              rel="noopener"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
              onPointerLeave={() => setHover(false)}
              className="group inline-flex items-center text-[15px] text-ink hover:text-accent"
            >
              {titleInner}
            </a>
          ) : (
            <span className="text-[15px] text-ink">{titleInner}</span>
          ))}

        <p className={`${it.title ? "mt-1.5" : ""} text-[15px] leading-[1.45] text-ink-2`}>{it.desc}</p>

        {it.links && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {it.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-1 py-1 text-[13px] text-accent"
              >
                {l.label}
                <Arrow className="group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        )}

        <AnimatePresence>
          {hover && it.preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute top-0 left-0 z-30 w-[280px] overflow-hidden rounded-lg border border-line bg-bg p-1 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]"
            >
              <Image src={it.preview} alt="" width={560} height={350} className="rounded-md" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
