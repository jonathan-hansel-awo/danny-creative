"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useTouchDevice, useReducedMotion } from "@/hooks/useDeviceDetection";

/**
 * Spark State Types
 */
type SparkState = "default" | "hover" | "button" | "text" | "hidden";

interface SparkConfig {
  size: number;
  glowIntensity: number;
  pulseSpeed: number;
}

const SPARK_CONFIGS: Record<SparkState, SparkConfig> = {
  default: { size: 12, glowIntensity: 1, pulseSpeed: 2 },
  hover: { size: 20, glowIntensity: 1.5, pulseSpeed: 1.5 },
  button: { size: 24, glowIntensity: 2, pulseSpeed: 1.2 },
  text: { size: 10, glowIntensity: 0.6, pulseSpeed: 2.5 },
  hidden: { size: 0, glowIntensity: 0, pulseSpeed: 2 },
};

/**
 * The Spark - Signature cursor companion
 *
 * A glowing amber orb that follows the cursor, representing creative energy.
 * Features:
 * - Smooth cursor following with lerp interpolation
 * - Interactive states (grows on buttons, dims on text)
 * - Continuous breathing animation
 * - Click feedback
 * - Hidden on touch devices
 */
export function Spark() {
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();
  const position = useMousePosition({ lerp: 0.12, smooth: true });

  const [sparkState, setSparkState] = useState<SparkState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sparkRef = useRef<HTMLDivElement>(null);

  // Detect what element the cursor is hovering over
  const detectHoverState = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target) {
      setSparkState("default");
      return;
    }

    // Check for data attribute first (explicit spark behavior)
    const sparkHover = target.closest("[data-spark]");
    if (sparkHover) {
      const sparkType = sparkHover.getAttribute("data-spark") as SparkState;
      if (sparkType && SPARK_CONFIGS[sparkType]) {
        setSparkState(sparkType);
        return;
      }
    }

    // Check for interactive elements
    const isButton =
      target.closest("button") ||
      target.closest("a[href]") ||
      target.closest('[role="button"]') ||
      target.closest(".btn");

    if (isButton) {
      setSparkState("button");
      return;
    }

    // Check for links
    const isLink = target.closest("a");
    if (isLink) {
      setSparkState("hover");
      return;
    }

    // Check for clickable/interactive elements
    const isInteractive =
      target.closest("[data-spark-hover]") ||
      target.closest(".card") ||
      target.closest("[role='link']") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("select");

    if (isInteractive) {
      setSparkState("hover");
      return;
    }

    // Check for large text blocks
    const isTextBlock =
      target.closest("p") ||
      target.closest("article") ||
      target.closest("blockquote");

    const computedStyle = window.getComputedStyle(target);
    const fontSize = parseFloat(computedStyle.fontSize);

    if (isTextBlock && fontSize >= 16) {
      setSparkState("text");
      return;
    }

    // Default state
    setSparkState("default");
  }, []);

  // Handle click effects
  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  // Show spark after initial mouse movement
  const handleFirstMove = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    window.addEventListener("mousemove", detectHoverState);
    window.addEventListener("mousemove", handleFirstMove, { once: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", detectHoverState);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isTouchDevice,
    prefersReducedMotion,
    detectHoverState,
    handleMouseDown,
    handleMouseUp,
    handleFirstMove,
  ]);

  // Don't render on touch devices or if user prefers reduced motion
  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  const config = SPARK_CONFIGS[sparkState];
  const clickScale = isClicking ? 0.7 : 1;
  const finalSize = config.size * clickScale;

  // Calculate glow based on state
  const glowBase = `rgba(232, 165, 75, ${0.6 * config.glowIntensity})`;
  const glowOuter = `rgba(232, 165, 75, ${0.3 * config.glowIntensity})`;

  return (
    <div
      ref={sparkRef}
      className="pointer-events-none fixed z-spark"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      aria-hidden="true"
    >
      {/* Main spark orb */}
      <div
        className="rounded-full bg-spark"
        style={{
          width: finalSize,
          height: finalSize,
          boxShadow: `
            0 0 ${8 * config.glowIntensity}px ${glowBase},
            0 0 ${16 * config.glowIntensity}px ${glowOuter}
          `,
          transition: `
            width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            height 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease
          `,
          animation: `spark-breathe ${config.pulseSpeed}s ease-in-out infinite`,
        }}
      />

      {/* Outer glow ring (for button state) */}
      {sparkState === "button" && (
        <div
          className="absolute rounded-full border border-spark/30"
          style={{
            width: finalSize + 16,
            height: finalSize + 16,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "spark-breathe 1.5s ease-in-out infinite reverse",
          }}
        />
      )}
    </div>
  );
}

/**
 * SparkTrail - Optional trailing particles effect
 * Can be enabled for extra visual flair
 */
export function SparkTrail() {
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();
  const position = useMousePosition({ lerp: 0.08, smooth: true });

  const [trail, setTrail] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (position.x === 0 && position.y === 0) return;

      setTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: position.x, y: position.y, id: trailIdRef.current++ },
        ].slice(-5); // Keep only last 5 particles
        return newTrail;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [position, isTouchDevice, prefersReducedMotion]);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[99]"
      aria-hidden="true"
    >
      {trail.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-spark-light"
          style={{
            left: particle.x,
            top: particle.y,
            width: 4 + index * 1.5,
            height: 4 + index * 1.5,
            transform: "translate(-50%, -50%)",
            opacity: ((index + 1) / trail.length) * 0.4,
            transition: "opacity 0.1s ease",
          }}
        />
      ))}
    </div>
  );
}

export default Spark;
