/* eslint-disable react-hooks/purity */
"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollProgress {
  progress: number; // 0 to 1
  scrollY: number;
  direction: "up" | "down" | null;
  velocity: number;
}

export function useScrollProgress(): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    scrollY: 0,
    direction: null,
    velocity: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let rafId: number;
    let lastY = 0;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      const now = Date.now();
      const deltaTime = now - lastTime.current;
      const deltaY = scrollY - lastY;
      const velocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0;

      const direction = deltaY > 0 ? "down" : deltaY < 0 ? "up" : null;

      setScrollData({
        progress,
        scrollY,
        direction,
        velocity,
      });

      lastY = scrollY;
      lastTime.current = now;
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollData;
}

// Helper ref for the effect
import { useRef } from "react";
