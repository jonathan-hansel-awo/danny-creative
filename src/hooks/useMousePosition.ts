"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionOptions {
  /** Lerp factor for smooth following (0-1, lower = more lag) */
  lerp?: number;
  /** Whether to use RAF for smooth updates */
  smooth?: boolean;
}

/**
 * Hook to track mouse position with optional smooth interpolation.
 * Uses requestAnimationFrame for 60fps updates when smooth mode is enabled.
 *
 * @param options Configuration options
 * @returns Current mouse position { x, y }
 */
export function useMousePosition(
  options: UseMousePositionOptions = {}
): MousePosition {
  const { lerp = 0.12, smooth = true } = options;

  // Raw mouse position (updated immediately on mousemove)
  const rawPosition = useRef<MousePosition>({ x: 0, y: 0 });

  // Smoothed position (interpolated towards raw position)
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  // Animation frame ref for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Track if we've received any mouse input
  const hasMouseInput = useRef(false);

  // Update raw position on mouse move
  const handleMouseMove = useCallback((event: MouseEvent) => {
    rawPosition.current = { x: event.clientX, y: event.clientY };
    hasMouseInput.current = true;
  }, []);

  // Animation loop for smooth interpolation
  useEffect(() => {
    if (!smooth) {
      // Without smooth mode, directly update position on mousemove
      const handleDirectMove = (event: MouseEvent) => {
        setPosition({ x: event.clientX, y: event.clientY });
      };

      window.addEventListener("mousemove", handleDirectMove);
      return () => window.removeEventListener("mousemove", handleDirectMove);
    }

    // With smooth mode, use RAF for interpolation
    window.addEventListener("mousemove", handleMouseMove);

    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      if (hasMouseInput.current) {
        // Linear interpolation towards target
        currentX += (rawPosition.current.x - currentX) * lerp;
        currentY += (rawPosition.current.y - currentY) * lerp;

        setPosition({ x: currentX, y: currentY });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lerp, smooth, handleMouseMove]);

  return position;
}

/**
 * Hook to track mouse position relative to an element.
 *
 * @param elementRef Ref to the target element
 * @returns Position relative to element center, normalized (-1 to 1)
 */
export function useRelativeMousePosition(
  elementRef: React.RefObject<HTMLElement>
): MousePosition & { isInside: boolean } {
  const [relativePosition, setRelativePosition] = useState({
    x: 0,
    y: 0,
    isInside: false,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to -1 to 1 range
      const x = (event.clientX - centerX) / (rect.width / 2);
      const y = (event.clientY - centerY) / (rect.height / 2);

      // Check if mouse is inside element
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      setRelativePosition({ x, y, isInside });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [elementRef]);

  return relativePosition;
}
