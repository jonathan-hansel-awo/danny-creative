"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale";

interface RevealOnScrollProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

const variants: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function RevealOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  once = true,
  className = "",
}: RevealOnScrollProps) {
  const { ref, isInView } = useInView({ threshold, once });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
