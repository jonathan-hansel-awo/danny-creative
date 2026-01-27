"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/stores/useStore";
import { useReducedMotion } from "@/components/ui/ReducedMotion";

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  birth: number;
}

export function Spark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const lastMouse = useRef({ x: 0, y: 0, time: 0 });
  const frameRef = useRef<number | null>(null);
  const isHovering = useRef(false);

  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCursorPosition = useStore((s) => s.setCursorPosition);

  const { prefersReducedMotion } = useReducedMotion();

  useEffect(() => {
    // Don't render on touch devices, during loading, or if reduced motion is preferred
    if (isTouchDevice || loadingPhase !== "complete" || prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    sparkPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPos.current = { ...sparkPos.current };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastMouse.current.time;

      if (dt > 0) {
        velocity.current = {
          x: ((e.clientX - lastMouse.current.x) / dt) * 16,
          y: ((e.clientY - lastMouse.current.y) / dt) * 16,
        };
      }

      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
      targetPos.current = { x: e.clientX, y: e.clientY };

      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2,
      );
      if (speed > 3 && particles.current.length < 10) {
        particles.current.push({
          x: sparkPos.current.x,
          y: sparkPos.current.y,
          opacity: Math.min(speed / 12, 0.7),
          size: 3 + Math.random() * 4,
          birth: now,
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current = !!(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button, a, [data-spark-hover]")
      );
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const now = performance.now();

      sparkPos.current.x += (targetPos.current.x - sparkPos.current.x) * 0.08;
      sparkPos.current.y += (targetPos.current.y - sparkPos.current.y) * 0.08;

      setCursorPosition({ ...sparkPos.current });

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw trail particles
      particles.current = particles.current.filter((p) => {
        const age = now - p.birth;
        if (age > 400) return false;

        const progress = age / 400;
        const opacity = p.opacity * (1 - progress);
        const size = p.size * (1 - progress * 0.5);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          size * 2,
        );
        gradient.addColorStop(0, `rgba(232, 165, 75, ${opacity})`);
        gradient.addColorStop(1, "rgba(232, 165, 75, 0)");

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      const speed = Math.sqrt(
        velocity.current.x ** 2 + velocity.current.y ** 2,
      );
      let size = 14;
      if (isHovering.current) {
        size = 24;
      } else if (speed > 4) {
        size = 14 + Math.min(speed * 0.5, 6);
      }

      const breathe = Math.sin(now / 1500) * 0.06 + 1;
      size *= breathe;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        sparkPos.current.x,
        sparkPos.current.y,
        0,
        sparkPos.current.x,
        sparkPos.current.y,
        size + 20,
      );
      outerGlow.addColorStop(0, "rgba(232, 165, 75, 0.35)");
      outerGlow.addColorStop(0.5, "rgba(232, 165, 75, 0.12)");
      outerGlow.addColorStop(1, "rgba(232, 165, 75, 0)");

      ctx.beginPath();
      ctx.arc(
        sparkPos.current.x,
        sparkPos.current.y,
        size + 20,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Inner spark
      const innerGlow = ctx.createRadialGradient(
        sparkPos.current.x,
        sparkPos.current.y,
        0,
        sparkPos.current.x,
        sparkPos.current.y,
        size,
      );
      innerGlow.addColorStop(0, "#FFF9F0");
      innerGlow.addColorStop(0.35, "#E8A54B");
      innerGlow.addColorStop(1, "rgba(232, 165, 75, 0.5)");

      ctx.beginPath();
      ctx.arc(sparkPos.current.x, sparkPos.current.y, size, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(
        sparkPos.current.x,
        sparkPos.current.y,
        size * 0.35,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "#FFFDF8";
      ctx.fill();

      velocity.current.x *= 0.92;
      velocity.current.y *= 0.92;

      frameRef.current = requestAnimationFrame(animate);
    };

    document.body.classList.add("has-spark");
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-spark");
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isTouchDevice, loadingPhase, prefersReducedMotion, setCursorPosition]);

  if (isTouchDevice || loadingPhase !== "complete" || prefersReducedMotion) {
    return null;
  }

  return <canvas ref={canvasRef} className="spark-cursor" aria-hidden="true" />;
}
