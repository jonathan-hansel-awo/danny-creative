/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/stores/useStore";

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
  const frameRef = useRef<number | undefined>(undefined);

  const isTouchDevice = useStore((s) => s.isTouchDevice);
  const setCursorPosition = useStore((s) => s.setCursorPosition);
  const isHoveringInteractive = useStore((s) => s.isHoveringInteractive);
  const setIsHoveringInteractive = useStore((s) => s.setIsHoveringInteractive);
  const loadingPhase = useStore((s) => s.loadingPhase);

  const handleMouseMove = useCallback((e: MouseEvent) => {
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

    // Spawn trail particle if moving fast enough
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    if (speed > 3 && particles.current.length < 12) {
      particles.current.push({
        x: sparkPos.current.x,
        y: sparkPos.current.y,
        opacity: Math.min(speed / 10, 0.8),
        size: 4 + Math.random() * 4,
        birth: now,
      });
    }
  }, []);

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button, a, [data-spark-hover]");
      setIsHoveringInteractive(!!interactive);
    },
    [setIsHoveringInteractive],
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = performance.now();

    // Smooth follow (lerp)
    sparkPos.current.x += (targetPos.current.x - sparkPos.current.x) * 0.08;
    sparkPos.current.y += (targetPos.current.y - sparkPos.current.y) * 0.08;
    setCursorPosition(sparkPos.current);

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

    // Calculate spark size
    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    let size = 16;
    if (isHoveringInteractive) size = 28;
    else if (speed > 5) size = 16 + Math.min(speed, 8);

    // Breathing animation
    const breathe = Math.sin(now / 1500) * 0.05 + 1;
    size *= breathe;

    // Outer glow
    const outerGlow = ctx.createRadialGradient(
      sparkPos.current.x,
      sparkPos.current.y,
      0,
      sparkPos.current.x,
      sparkPos.current.y,
      size + 24,
    );
    outerGlow.addColorStop(0, "rgba(232, 165, 75, 0.4)");
    outerGlow.addColorStop(0.5, "rgba(232, 165, 75, 0.15)");
    outerGlow.addColorStop(1, "rgba(232, 165, 75, 0)");

    ctx.beginPath();
    ctx.arc(sparkPos.current.x, sparkPos.current.y, size + 24, 0, Math.PI * 2);
    ctx.fillStyle = outerGlow;
    ctx.fill();

    // Inner glow
    const innerGlow = ctx.createRadialGradient(
      sparkPos.current.x,
      sparkPos.current.y,
      0,
      sparkPos.current.x,
      sparkPos.current.y,
      size,
    );
    innerGlow.addColorStop(0, "#FFF9F0");
    innerGlow.addColorStop(0.3, "#E8A54B");
    innerGlow.addColorStop(1, "rgba(232, 165, 75, 0.6)");

    ctx.beginPath();
    ctx.arc(sparkPos.current.x, sparkPos.current.y, size, 0, Math.PI * 2);
    ctx.fillStyle = innerGlow;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(sparkPos.current.x, sparkPos.current.y, size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFDF8";
    ctx.fill();

    // Decay velocity
    velocity.current.x *= 0.95;
    velocity.current.y *= 0.95;

    frameRef.current = requestAnimationFrame(animate);
  }, [isHoveringInteractive, setCursorPosition]);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    sparkPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetPos.current = { ...sparkPos.current };

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
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseOver, animate]);

if (isTouchDevice || loadingPhase !== "complete") return null;

return <canvas ref={canvasRef} className="spark-cursor" aria-hidden="true" />;
}
