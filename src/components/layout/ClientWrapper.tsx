"use client";

import { Spark } from "@/components/effects/Spark";
import { MobileSparkEffects } from "@/components/effects/MobileSpark";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";

interface ClientWrapperProps {
  children: React.ReactNode;
}

/**
 * ClientWrapper - Wraps the application with client-side effects
 *
 * This component handles:
 * - The Spark cursor companion (desktop)
 * - Mobile tap ripple and glow effects (mobile)
 * - Ambient background orbs (atmospheric depth)
 * - Smooth scroll provider (to be added later)
 * - Any other global client-side effects
 */
export function ClientWrapper({ children }: ClientWrapperProps) {
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
