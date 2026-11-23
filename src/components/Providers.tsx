"use client";

import { MotionConfig } from "motion/react";

/** reducedMotion="user" turns off transforms for people with "reduce motion" enabled. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
