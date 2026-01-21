"use client";

import { useState, useEffect, useCallback } from "react";
import { lerp } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(smoothing: number = 0.1) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      setMousePosition((prev) => {
        const x = lerp(prev.x, targetPosition.x, smoothing);
        const y = lerp(prev.y, targetPosition.y, smoothing);

        return {
          x,
          y,
          normalizedX: (x / window.innerWidth) * 2 - 1,
          normalizedY: (y / window.innerHeight) * 2 - 1,
        };
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [targetPosition, smoothing]);

  return mousePosition;
}
