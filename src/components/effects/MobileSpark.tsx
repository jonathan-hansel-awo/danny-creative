"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useTouchDevice, useReducedMotion } from "@/hooks/useDeviceDetection";

/**
 * Ripple effect data structure
 */
interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

/**
 * MobileTapRipple - Spark-colored ripple effect on tap
 *
 * Creates an expanding amber ring wherever the user taps,
 * bringing The Spark's energy to touch interactions.
 */
export function MobileTapRipple() {
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  const handleTouch = useCallback(
    (event: TouchEvent) => {
      // Don't create ripples on interactive elements (they have their own glow)
      const target = event.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]') ||
        target.closest(".btn") ||
        target.closest(".card") ||
        target.closest("[data-spark-glow]") ||
        target.closest("input") ||
        target.closest("textarea");

      if (isInteractive) return;

      const touch = event.touches[0];
      if (!touch) return;

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    []
  );

  useEffect(() => {
    if (!isTouchDevice || prefersReducedMotion) return;

    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouch);
  }, [isTouchDevice, prefersReducedMotion, handleTouch]);

  // Only render on touch devices
  if (!isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99] overflow-hidden"
      aria-hidden="true"
    >
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute animate-tap-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-spark/60 animate-tap-ripple-ring" />
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-spark/20 animate-tap-ripple-glow" />
        </div>
      ))}
    </div>
  );
}

/**
 * useSparkGlow - Hook to add glow effect to interactive elements
 *
 * Returns handlers to attach to elements for tap glow effect
 */
export function useSparkGlow() {
  const [isGlowing, setIsGlowing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerGlow = useCallback(() => {
    setIsGlowing(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsGlowing(false);
    }, 400);
  }, []);

  const glowHandlers = {
    onTouchStart: triggerGlow,
    onMouseDown: triggerGlow,
  };

  const glowClassName = isGlowing ? "spark-glow-active" : "";

  return { isGlowing, glowHandlers, glowClassName, triggerGlow };
}

/**
 * SparkGlowWrapper - Wrapper component that adds glow effect to children
 *
 * Wrap any interactive element to give it the spark glow on tap/click
 */
interface SparkGlowWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
}

export function SparkGlowWrapper({
  children,
  className = "",
  as: Component = "div",
  disabled = false,
}: SparkGlowWrapperProps) {
  const { glowHandlers, glowClassName } = useSparkGlow();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || disabled) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      className={`spark-glow-element ${glowClassName} ${className}`}
      {...glowHandlers}
      data-spark-glow
    >
      {children}
    </Component>
  );
}

/**
 * MobileSparkEffects - Combined mobile effects component
 *
 * Include this once in your layout to enable all mobile spark effects
 */
export function MobileSparkEffects() {
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isTouchDevice || prefersReducedMotion) return;

    // Add global touch handlers for interactive elements
    const handleTouchStart = (event: TouchEvent) => {
      const target = event.target as HTMLElement;

      // Find the closest interactive element
      const interactive = target.closest(
        'button, a, [role="button"], .btn, .card, [data-spark-glow], input, textarea, select'
      ) as HTMLElement | null;

      if (interactive && !interactive.classList.contains("spark-glow-active")) {
        interactive.classList.add("spark-glow-active");

        const removeGlow = () => {
          interactive.classList.remove("spark-glow-active");
        };

        // Remove after animation
        setTimeout(removeGlow, 400);

        // Also remove on touch end (in case it's a quick tap)
        interactive.addEventListener("touchend", removeGlow, { once: true });
        interactive.addEventListener("touchcancel", removeGlow, { once: true });
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isTouchDevice, prefersReducedMotion]);

  return <MobileTapRipple />;
}

export default MobileSparkEffects;
