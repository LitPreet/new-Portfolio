"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { bio, headline, profile, rotating } from "@/content";
import { RichText, ease } from "./ui";

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export function Intro() {
  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
    >
      <StatusPill />

      <motion.div variants={item} className="mt-7">
        <Identity />
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-10 text-[clamp(34px,10vw,46px)] leading-[1.02] font-semibold tracking-[-0.035em]"
      >
        <Headline />
      </motion.h1>

      <motion.p variants={item} className="mt-3 text-[17px] text-ink-2">
        Frontend engineer who <Rotator />
      </motion.p>

      <div className="mt-7 space-y-[14px] text-[15px] leading-[1.5] text-ink">
        {bio.map((p, i) => (
          <motion.p key={i} variants={item}>
            <RichText text={p} />
          </motion.p>
        ))}
      </div>
    </motion.header>
  );
}

function StatusPill() {
  return (
    <motion.div
      variants={item}
      className="inline-flex items-center rounded-full border border-line bg-soft p-[3px] text-[12.5px] font-medium"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1.5 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
        <span className="relative flex size-1.5">
          <motion.span
            className="absolute inset-0 rounded-full bg-[#22a35a]"
            animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative size-1.5 rounded-full bg-[#22a35a]" />
        </span>
        Open to work
      </span>
      <a href={profile.resume} target="_blank" rel="noopener" className="px-3 py-1.5 text-ink-3 hover:text-ink">
        Resume
      </a>
    </motion.div>
  );
}

/** Photo frame + name, side by side. Set profile.photo once public/me.jpg exists. */
function Identity() {
  return (
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ rotate: -3, scale: 1.03 }}
        whileTap={{ rotate: -3, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="shrink-0 rounded-[12px] border border-line bg-bg p-1 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
      >
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={profile.name}
            width={196}
            height={196}
            priority
            className="size-[86px] rounded-[8px] object-cover sm:size-[98px]"
          />
        ) : (
          <div
            aria-hidden
            className="grid size-[86px] place-items-center rounded-[8px] bg-accent-soft font-mono text-[22px] font-medium text-accent sm:size-[98px]"
          >
            {profile.initials}
          </div>
        )}
      </motion.div>
      <div className="min-w-0">
        <NameSwap />
        <p className="text-[15px] text-ink-2">{profile.role}</p>
      </div>
    </div>
  );
}

/** Headline with the {braced} word in accent, with speed lines streaking behind it. */
function Headline() {
  const [before, word, after] = headline.split(/[{}]/);
  return (
    <>
      {before}
      <span className="relative inline-block text-accent">
        <span aria-hidden className="absolute top-1/2 right-full mr-1 flex -translate-y-1/2 flex-col items-end gap-[5px]">
          {[22, 34, 16].map((w, i) => (
            <motion.span
              key={i}
              className="block h-[3px] rounded-full bg-accent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: [0, w, 0], opacity: [0, 0.7, 0], x: [16, 0, -10] }}
              transition={{ duration: 1.1, delay: 1 + i * 0.12, repeat: Infinity, repeatDelay: 3.2, ease: "easeOut" }}
            />
          ))}
        </span>
        <motion.span
          className="inline-block"
          animate={{ x: [0, 10, 0], skewX: [0, -12, 0] }}
          transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatDelay: 3.7, ease }}
        >
          {word}
        </motion.span>
      </span>
      {after}
    </>
  );
}

/** Cycles through phrases, each sliding up as the next arrives. */
function Rotator() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % rotating.length), 2400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <span className="relative grid overflow-hidden align-bottom sm:inline-grid">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="col-start-1 row-start-1 font-medium whitespace-nowrap text-ink"
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Name flips to Devanagari on hover / tap. It flips once by itself after load as a hint. */
function NameSwap() {
  const [native, setNative] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const a = setTimeout(() => setNative(true), 2600);
    const b = setTimeout(() => setNative(false), 4400);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduce]);

  return (
    <p className="text-[22px] leading-tight font-semibold tracking-[-0.02em]">
      <button
        type="button"
        onClick={() => setNative((v) => !v)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setNative(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setNative(false)}
        aria-label={profile.name}
        className="relative inline-grid cursor-pointer text-left"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={native ? "hi" : "en"}
            lang={native ? "hi" : "en"}
            aria-hidden
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease }}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {native ? profile.nameNative : profile.name}
          </motion.span>
        </AnimatePresence>
      </button>
    </p>
  );
}
