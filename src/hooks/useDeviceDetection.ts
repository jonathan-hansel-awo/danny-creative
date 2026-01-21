"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if the current device supports touch input.
 * Used to hide cursor-based effects like The Spark on mobile devices.
 *
 * @returns {boolean} True if the device supports touch, false otherwise
 */
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-expect-error - msMaxTouchPoints is IE-specific
        navigator.msMaxTouchPoints > 0;

      // Also check if it's a device that primarily uses touch
      // Some laptops have touch screens but still use cursor
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      setIsTouchDevice(hasTouch && isMobileUA);
    };

    checkTouchDevice();

    // Re-check on resize (for responsive testing in dev tools)
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  return isTouchDevice;
}

/**
 * Hook to detect if user prefers reduced motion.
 * Used to disable animations for accessibility.
 *
 * @returns {boolean} True if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
