/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { lerp } from "@/lib/utils";

interface FluidDistortionProps {
  className?: string;
  intensity?: number;
  radius?: number;
  enabled?: boolean;
}

export default function FluidDistortion({
  className = "",
  intensity = 20,
  radius = 150,
  enabled = true,
}: FluidDistortionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mousePosition = useMousePosition(0.08);
  const currentIntensity = useRef(0);
  const targetIntensity = useRef(0);
  const lastMouseMove = useRef(Date.now());

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Track mouse activity
    const handleMouseMove = () => {
      lastMouseMove.current = Date.now();
      targetIntensity.current = intensity;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Decay intensity when mouse stops
      const timeSinceMove = Date.now() - lastMouseMove.current;
      if (timeSinceMove > 100) {
        targetIntensity.current = lerp(targetIntensity.current, 0, 0.05);
      }

      currentIntensity.current = lerp(
        currentIntensity.current,
        targetIntensity.current,
        0.1,
      );

      ctx.clearRect(0, 0, width, height);

      if (currentIntensity.current > 0.5) {
        // Draw distortion ripple effect
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          radius,
        );

        const alpha = (currentIntensity.current / intensity) * 0.08;
        gradient.addColorStop(0, `rgba(224, 122, 95, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(224, 122, 95, ${alpha * 0.5})`);
        gradient.addColorStop(1, "rgba(224, 122, 95, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add subtle ring
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, radius * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(224, 122, 95, ${alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled, intensity, radius, mousePosition]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 2, mixBlendMode: "screen" }}
    />
  );
}
