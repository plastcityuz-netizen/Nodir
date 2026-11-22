"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion sozlamalari: foydalanuvchi “reduced motion” tanlagan bo‘lsa,
 * transform va layout animatsiyalari avtomatik soddalashadi.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
