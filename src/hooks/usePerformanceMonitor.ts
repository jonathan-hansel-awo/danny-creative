"use client";

import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
}

export function usePerformanceMonitor(enabled = false): PerformanceMetrics {
  const metrics = useRef<PerformanceMetrics>({ fps: 60, frameTime: 16.67 });
  const frameCount = useRef(0);
  // eslint-disable-next-line react-hooks/purity
  const lastTime = useRef(performance.now());

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;

    const measure = () => {
      frameCount.current++;
      const now = performance.now();
      const delta = now - lastTime.current;

      if (delta >= 1000) {
        metrics.current = {
          fps: Math.round((frameCount.current * 1000) / delta),
          frameTime: delta / frameCount.current,
        };

        if (metrics.current.fps < 30) {
          console.warn("Low FPS detected:", metrics.current.fps);
        }

        frameCount.current = 0;
        lastTime.current = now;
      }

      animationId = requestAnimationFrame(measure);
    };

    animationId = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(animationId);
  }, [enabled]);

  return metrics.current;
}
