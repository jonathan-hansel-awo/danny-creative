"use client";

import { Spark } from "@/components/effects/Spark";
import { MobileSparkEffects } from "@/components/effects/MobileSpark";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ClientWrapperProps {
  children: React.ReactNode;
}

/**
 * ClientWrapper - Wraps the application with client-side effects
 *
 * This component handles:
 * - Scroll-triggered reveal animations
 * - The Spark cursor companion (desktop)
 * - Mobile tap ripple and glow effects (mobile)
 * - Ambient background orbs (atmospheric depth)
 */
export function ClientWrapper({ children }: ClientWrapperProps) {
  // Initialize scroll reveal animations globally
  useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
    once: true,
  });

  return (
    <>
      {/* Ambient Background Orbs - Behind everything */}
      <AmbientOrbs />

      {/* The Spark - Desktop cursor companion */}
      <Spark />

      {/* Mobile Spark Effects - Tap ripple and element glow */}
      <MobileSparkEffects />

      {/* Main content */}
      {children}
    </>
  );
}

export default ClientWrapper;
