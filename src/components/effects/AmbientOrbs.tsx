"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useDeviceDetection";

/**
 * Orb configuration type
 */
interface OrbConfig {
  id: number;
  size: number;
  color: string;
  opacity: number;
  top: string;
  left: string;
  driftAnimation: string;
  driftDuration: number;
  breatheDuration: number;
  delay: number;
  blur: number;
}

/**
 * Default orb configurations
 * These create a balanced, ambient atmosphere across the viewport
 */
const DEFAULT_ORBS: OrbConfig[] = [
  {
    id: 1,
    size: 500,
    color: "var(--color-spark-light)",
    opacity: 0.2,
    top: "5%",
    left: "10%",
    driftAnimation: "orb-drift-1",
    driftDuration: 35,
    breatheDuration: 10,
    delay: 0,
    blur: 100,
  },
  {
    id: 2,
    size: 400,
    color: "var(--color-cream-dark)",
    opacity: 0.25,
    top: "60%",
    left: "75%",
    driftAnimation: "orb-drift-2",
    driftDuration: 45,
    breatheDuration: 12,
    delay: 2,
    blur: 90,
  },
  {
    id: 3,
    size: 600,
    color: "var(--color-spark)",
    opacity: 0.12,
    top: "30%",
    left: "55%",
    driftAnimation: "orb-drift-3",
    driftDuration: 55,
    breatheDuration: 14,
    delay: 4,
    blur: 120,
  },
  {
    id: 4,
    size: 350,
    color: "var(--color-coral)",
    opacity: 0.1,
    top: "75%",
    left: "20%",
    driftAnimation: "orb-drift-4",
    driftDuration: 40,
    breatheDuration: 11,
    delay: 1,
    blur: 80,
  },
  {
    id: 5,
    size: 450,
    color: "var(--color-spark-light)",
    opacity: 0.18,
    top: "15%",
    left: "80%",
    driftAnimation: "orb-drift-1",
    driftDuration: 50,
    breatheDuration: 13,
    delay: 3,
    blur: 100,
  },
];

/**
 * Mobile-optimized orb configurations (fewer, more subtle)
 */
const MOBILE_ORBS: OrbConfig[] = [
  {
    id: 1,
    size: 300,
    color: "var(--color-spark-light)",
    opacity: 0.15,
    top: "10%",
    left: "5%",
    driftAnimation: "orb-drift-1",
    driftDuration: 40,
    breatheDuration: 12,
    delay: 0,
    blur: 80,
  },
  {
    id: 2,
    size: 350,
    color: "var(--color-spark)",
    opacity: 0.1,
    top: "50%",
    left: "70%",
    driftAnimation: "orb-drift-2",
    driftDuration: 50,
    breatheDuration: 14,
    delay: 2,
    blur: 90,
  },
  {
    id: 3,
    size: 250,
    color: "var(--color-coral)",
    opacity: 0.08,
    top: "80%",
    left: "30%",
    driftAnimation: "orb-drift-3",
    driftDuration: 45,
    breatheDuration: 11,
    delay: 1,
    blur: 70,
  },
];

interface AmbientOrbsProps {
  /** Custom orb configurations (overrides defaults) */
  orbs?: OrbConfig[];
  /** Whether to use mobile-optimized orbs on small screens */
  responsive?: boolean;
  /** Additional CSS class for the container */
  className?: string;
}

/**
 * AmbientOrbs - Floating gradient orbs background
 *
 * Creates atmospheric depth with large, soft, animated gradient orbs
 * that drift slowly across the background.
 *
 * Features:
 * - 5 orbs on desktop, 3 on mobile
 * - Unique drift patterns per orb
 * - Breathing scale animation
 * - Respects reduced motion preference
 * - No pointer interaction (purely decorative)
 */
export function AmbientOrbs({
  orbs,
  responsive = true,
  className = "",
}: AmbientOrbsProps) {
  const prefersReducedMotion = useReducedMotion();

  // Determine which orbs to use based on screen size
  // This is handled via CSS for SSR compatibility
  const desktopOrbs = orbs || DEFAULT_ORBS;
  const mobileOrbs = orbs || MOBILE_ORBS;

  // If reduced motion, render static orbs without animation
  if (prefersReducedMotion) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        {desktopOrbs.slice(0, 3).map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              opacity: orb.opacity * 0.7,
              filter: `blur(${orb.blur}px)`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Desktop Orbs */}
      {responsive && (
        <div className="hidden md:block">
          {desktopOrbs.map((orb) => (
            <Orb key={`desktop-${orb.id}`} config={orb} />
          ))}
        </div>
      )}

      {/* Mobile Orbs */}
      {responsive && (
        <div className="block md:hidden">
          {mobileOrbs.map((orb) => (
            <Orb key={`mobile-${orb.id}`} config={orb} />
          ))}
        </div>
      )}

      {/* Non-responsive (use desktop orbs) */}
      {!responsive &&
        desktopOrbs.map((orb) => <Orb key={orb.id} config={orb} />)}
    </div>
  );
}

/**
 * Individual Orb component
 */
function Orb({ config }: { config: OrbConfig }) {
  const style = useMemo(
    () => ({
      width: config.size,
      height: config.size,
      top: config.top,
      left: config.left,
      background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
      opacity: config.opacity,
      filter: `blur(${config.blur}px)`,
      animation: `
        ${config.driftAnimation} ${config.driftDuration}s ease-in-out infinite,
        orb-breathe ${config.breatheDuration}s ease-in-out infinite
      `,
      animationDelay: `${config.delay}s, ${config.delay * 0.5}s`,
    }),
    [config]
  );

  return <div className="absolute rounded-full will-change-transform" style={style} />;
}

/**
 * useAmbientOrbs - Hook for programmatic orb control
 *
 * Returns functions to dynamically adjust orb behavior
 * (for future enhancements like section-based color changes)
 */
export function useAmbientOrbs() {
  // Placeholder for future functionality
  // Could include:
  // - setOrbColors(colors: string[])
  // - setOrbIntensity(intensity: number)
  // - pauseAnimation()
  // - resumeAnimation()

  return {
    // Future API here
  };
}

/**
 * AmbientOrbsStatic - Non-animated version for performance-critical pages
 */
export function AmbientOrbsStatic({ className = "" }: { className?: string }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Static gradient overlay */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 212, 155, 0.15) 0%, transparent 70%)",
          filter: "blur(100px)",
          transform: "translate(-20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 165, 75, 0.1) 0%, transparent 70%)",
          filter: "blur(120px)",
          transform: "translate(20%, 20%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 116, 97, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

export default AmbientOrbs;
