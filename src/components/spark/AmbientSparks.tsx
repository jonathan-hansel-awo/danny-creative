"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/stores/useStore";

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

  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const loadingPhase = useStore((s) => s.loadingPhase);
  const scrollVelocity = useStore((s) => s.scrollVelocity);

  useEffect(() => {
    // Only show on touch devices after loading
    if (!isTouchDevice || loadingPhase !== "complete") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Create sparks
      sparksRef.current = Array.from({ length: 5 }, () => ({
        x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
        y: canvas.height * 0.2 + Math.random() * canvas.height * 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 5 + Math.random() * 4,
        opacity: 0.5 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;

      const now = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current.forEach((spark) => {
        // Update position
        spark.x += spark.vx;
        spark.y += spark.vy - scrollVelocity * 0.2;

        // Bounce
        if (spark.x < 40 || spark.x > canvas.width - 40) spark.vx *= -1;
        if (spark.y < 40 || spark.y > canvas.height - 40) spark.vy *= -1;
        spark.x = Math.max(40, Math.min(canvas.width - 40, spark.x));
        spark.y = Math.max(40, Math.min(canvas.height - 40, spark.y));

        // Breathing
        const breathe = Math.sin(now / 2000 + spark.phase) * 0.12 + 1;
        const size = spark.size * breathe;

        // Glow
        const glow = ctx.createRadialGradient(
          spark.x,
          spark.y,
          0,
          spark.x,
          spark.y,
          size * 3,
        );
        glow.addColorStop(0, `rgba(232, 165, 75, ${spark.opacity * 0.4})`);
        glow.addColorStop(1, "rgba(232, 165, 75, 0)");

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
          size,
        );
        core.addColorStop(0, "#FFFDF8");
        core.addColorStop(0.5, "#E8A54B");
        core.addColorStop(1, "rgba(232, 165, 75, 0.2)");

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, size, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isTouchDevice, loadingPhase, scrollVelocity]);

  if (!isTouchDevice || loadingPhase !== "complete") {
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
