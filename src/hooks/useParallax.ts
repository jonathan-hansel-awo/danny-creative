"use client";

import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseParallaxOptions {
  speed?: number;
  direction?: "vertical" | "horizontal";
  offset?: [
    "start end" | "start start" | "end start" | "end end",
    "start end" | "start start" | "end start" | "end end",
  ];
}

interface UseParallaxReturn {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<string>;
  x: MotionValue<string>;
  progress: MotionValue<number>;
}

export function useParallax({
  speed = 0.5,
  direction = "vertical",
  offset = ["start end", "end start"],
}: UseParallaxOptions = {}): UseParallaxReturn {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const parallaxOffset = (1 - speed) * 100;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "vertical"
      ? [`${parallaxOffset}px`, `${-parallaxOffset}px`]
      : ["0px", "0px"],
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "horizontal"
      ? [`${parallaxOffset}px`, `${-parallaxOffset}px`]
      : ["0px", "0px"],
  );

  return {
    ref: ref as React.RefObject<HTMLDivElement>,
    y,
    x,
    progress: scrollYProgress,
  };
}
