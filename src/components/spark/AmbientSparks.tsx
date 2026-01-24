/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useRef, useCallback } from "react";
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
  const sparks = useRef<AmbientSpark[]>([]);
  const frameRef = useRef<number | undefined>(undefined);

  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const scrollVelocity = useStore((s) => s.scrollVelocity);

  const initSparks = useCallback((w: number, h: number) => {
    sparks.current = Array.from({ length: 5 }, () => ({
      x: w * 0.2 + Math.random() * w * 0.6,
      y: h * 0.2 + Math.random() * h * 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 6 + Math.random() * 4,
      opacity: 0.5 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = performance.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparks.current.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy - scrollVelocity * 0.3;

      // Bounce
      if (s.x < 50 || s.x > canvas.width - 50) s.vx *= -1;
      if (s.y < 50 || s.y > canvas.height - 50) s.vy *= -1;
      s.x = Math.max(50, Math.min(canvas.width - 50, s.x));
      s.y = Math.max(50, Math.min(canvas.height - 50, s.y));

      const breathe = Math.sin(now / 2000 + s.phase) * 0.15 + 1;
      const size = s.size * breathe;

      // Glow
      const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size * 3);
      glow.addColorStop(0, `rgba(232, 165, 75, ${s.opacity * 0.5})`);
      glow.addColorStop(1, "rgba(232, 165, 75, 0)");
      ctx.beginPath();
      ctx.arc(s.x, s.y, size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, size);
      core.addColorStop(0, "#FFFDF8");
      core.addColorStop(0.5, "#E8A54B");
      core.addColorStop(1, "rgba(232, 165, 75, 0.3)");
      ctx.beginPath();
      ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();
    });

    frameRef.current = requestAnimationFrame(animate);
  }, [scrollVelocity]);

  useEffect(() => {
    if (!isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSparks(canvas.width, canvas.height);
    };
    resize();

    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isTouchDevice, initSparks, animate]);

  if (!isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
    />
  );
}
