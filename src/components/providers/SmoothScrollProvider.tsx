"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollProgress = useStore((s) => s.setScrollProgress);
  const setScrollVelocity = useStore((s) => s.setScrollVelocity);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.2,
    });

    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const handleScroll = () => {
      if (!lenisRef.current) return;
      const { progress, velocity } = lenisRef.current;
      setScrollProgress(progress);
      setScrollVelocity(velocity);
    };

    lenisRef.current.on("scroll", handleScroll);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove(() => {});
    };
  }, [setScrollProgress, setScrollVelocity]);

  return <>{children}</>;
}
