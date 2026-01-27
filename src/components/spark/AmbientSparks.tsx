'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/stores/useStore';

interface AmbientSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
}

export function AmbientSparks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<AmbientSpark[]>([]);
  const frameRef = useRef<number | null>(null);
  const scrollVelocityRef = useRef(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const loadingPhase = useStore((s) => s.loadingPhase);
  const scrollVelocity = useStore((s) => s.scrollVelocity);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update scroll velocity ref (to avoid stale closure)
  useEffect(() => {
    scrollVelocityRef.current = scrollVelocity;
  }, [scrollVelocity]);

  useEffect(() => {
    // Only show on touch devices after loading
    if (!isTouchDevice || loadingPhase !== 'complete' || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Create sparks distributed across the screen
      sparksRef.current = Array.from({ length: 5 }, () => ({
        x: canvas.width * 0.15 + Math.random() * canvas.width * 0.7,
        y: canvas.height * 0.15 + Math.random() * canvas.height * 0.7,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: 5 + Math.random() * 4,
        opacity: 0.4 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;

      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current scroll velocity
      const currentScrollVelocity = scrollVelocityRef.current;

      sparksRef.current.forEach((spark) => {
        // Base drift movement
        spark.x += spark.vx;
        spark.y += spark.vy;

        // Move in the direction of scroll (opposite to scroll direction for parallax feel)
        const scrollInfluence = currentScrollVelocity * 0.15;
        spark.y -= scrollInfluence;

        // Gentle randomness to drift
        spark.vx += (Math.random() - 0.5) * 0.02;
        spark.vy += (Math.random() - 0.5) * 0.02;

        // Dampen velocity
        spark.vx *= 0.98;
        spark.vy *= 0.98;

        // Clamp velocity
        const maxVelocity = 0.5;
        spark.vx = Math.max(-maxVelocity, Math.min(maxVelocity, spark.vx));
        spark.vy = Math.max(-maxVelocity, Math.min(maxVelocity, spark.vy));

        // Soft boundary wrapping
        const padding = 50;
        if (spark.x < -padding) spark.x = canvas.width + padding;
        if (spark.x > canvas.width + padding) spark.x = -padding;
        if (spark.y < -padding) spark.y = canvas.height + padding;
        if (spark.y > canvas.height + padding) spark.y = -padding;

        // Breathing animation
        const breathe = Math.sin(now / 2000 + spark.phase) * 0.15 + 1;
        const size = spark.size * breathe;

        // Outer glow
        const glow = ctx.createRadialGradient(
          spark.x,
          spark.y,
          0,
          spark.x,
          spark.y,
          size * 3
        );
        glow.addColorStop(0, `rgba(232, 165, 75, ${spark.opacity * 0.4})`);
        glow.addColorStop(0.5, `rgba(232, 165, 75, ${spark.opacity * 0.15})`);
        glow.addColorStop(1, 'rgba(232, 165, 75, 0)');

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        const core = ctx.createRadialGradient(
          spark.x,
          spark.y,
          0,
          spark.x,
          spark.y,
          size
        );
        core.addColorStop(0, `rgba(255, 253, 248, ${spark.opacity})`);
        core.addColorStop(0.4, `rgba(232, 165, 75, ${spark.opacity})`);
        core.addColorStop(1, `rgba(232, 165, 75, ${spark.opacity * 0.3})`);

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, size, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isTouchDevice, loadingPhase, prefersReducedMotion]);

  if (!isTouchDevice || loadingPhase !== 'complete' || prefersReducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
