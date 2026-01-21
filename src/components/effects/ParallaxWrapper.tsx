"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number; // 0 = no movement, 1 = normal, >1 = faster, <1 = slower
  direction?: "vertical" | "horizontal";
  className?: string;
}

export default function ParallaxWrapper({
  children,
  speed = 0.1,
  direction = "vertical",
  className = "",
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offset based on speed
  // speed of 0.5 means element moves at half the scroll speed (appears to lag behind)
  // speed of 1.5 means element moves faster than scroll
  const offset = (1 - speed) * 100;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical" ? [`${offset}px`, `${-offset}px`] : ["0px", "0px"],
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal"
      ? [`${offset}px`, `${-offset}px`]
      : ["0px", "0px"],
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ x, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
