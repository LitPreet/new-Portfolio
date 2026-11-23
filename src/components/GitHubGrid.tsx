"use client";

import { motion } from "motion/react";
import { levelColor as color } from "./levels";

type Day = { date: string; count: number; level: number };

/** Squares ripple in column by column when the grid scrolls into view.
 *  Phones show the latest ~26 weeks so squares stay a tappable size. */
export function GitHubGrid({ weeks }: { weeks: (Day | null)[][] }) {
  const n = weeks.length;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      className="flex gap-[3px]"
    >
      {weeks.map((w, i) => (
        <div key={i} className={`flex flex-1 flex-col gap-[3px] ${i < n - 26 ? "max-sm:hidden" : ""}`}>
          {Array.from({ length: 7 }, (_, j) => {
            const d = w[j];
            return (
              <motion.span
                key={j}
                title={d ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}` : undefined}
                variants={{
                  hidden: { opacity: 0, scale: 0.4 },
                  show: { opacity: 1, scale: 1, transition: { delay: i * 0.012 + j * 0.02, duration: 0.3 } },
                }}
                className="aspect-square w-full rounded-[2px]"
                style={{ background: d ? color(d.level) : "transparent" }}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}
