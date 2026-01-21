"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollProgress {
  /** Scroll progress from 0 to 1 */
  progress: number;
  /** Current scroll Y position in pixels */
  scrollY: number;
  /** Document height minus viewport height */
  maxScroll: number;
  /** Scroll direction: 1 = down, -1 = up, 0 = none */
  direction: -1 | 0 | 1;
  /** Scroll velocity (pixels per frame) */
  velocity: number;
}

/**
 * useScrollProgress - Track scroll position and progress
 *
 * Useful for:
 * - Progress indicators
 * - Parallax effects
 * - Show/hide elements based on scroll direction
 * - Scroll-linked animations
 */
export function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    maxScroll: 0,
    direction: 0,
    velocity: 0,
  });

  const lastScrollY = useCallback(() => {
    let last = 0;
    return {
      get: () => last,
      set: (val: number) => {
        last = val;
      },
    };
  }, [])();

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      const lastY = lastScrollY.get();
      const velocity = scrollY - lastY;
      const direction = velocity > 0 ? 1 : velocity < 0 ? -1 : 0;

      lastScrollY.set(scrollY);

      setProgress({
        progress: Math.min(1, Math.max(0, currentProgress)),
        scrollY,
        maxScroll,
        direction,
        velocity,
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Initial calculation
    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [lastScrollY]);

  return progress;
}

/**
 * useElementScrollProgress - Track scroll progress relative to an element
 *
 * Returns 0 when element enters viewport from bottom,
 * returns 1 when element exits viewport from top.
 */
export function useElementScrollProgress(
  elementRef: React.RefObject<HTMLElement>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let ticking = false;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element enters from bottom (progress = 0) to exits from top (progress = 1)
      const elementProgress = 1 - rect.bottom / (windowHeight + rect.height);

      setProgress(Math.min(1, Math.max(0, elementProgress)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [elementRef]);

  return progress;
}
