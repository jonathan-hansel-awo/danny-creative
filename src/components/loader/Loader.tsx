"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/stores/useStore";

export function Loader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [localPhase, setLocalPhase] = useState<
    | "initial"
    | "spark-emerging"
    | "spark-born"
    | "content-revealing"
    | "complete"
  >("initial");

  const sceneReady = useStore((s) => s.sceneReady);
  const setLoadingPhase = useStore((s) => s.setLoadingPhase);

  // Phase timing (in ms)
  const TIMINGS = {
    initial: 300,
    sparkEmerging: 800,
    sparkBorn: 1200,
    contentRevealing: 600,
  };

  // Sync local phase to global store
  useEffect(() => {
    setLoadingPhase(localPhase);
  }, [localPhase, setLoadingPhase]);

  // Phase progression
  useEffect(() => {
    // Force start after 1.5s even if scene isn't ready
    const forceStartTimer = setTimeout(() => {
      if (localPhase === "initial") {
        setLocalPhase("spark-emerging");
      }
    }, 1500);

    if (!sceneReady && localPhase === "initial") {
      return () => clearTimeout(forceStartTimer);
    }

    // If scene is ready or we're past initial, start the sequence
    if (localPhase === "initial") {
      const timer = setTimeout(() => {
        setLocalPhase("spark-emerging");
      }, TIMINGS.initial);
      return () => {
        clearTimeout(forceStartTimer);
        clearTimeout(timer);
      };
    }

    if (localPhase === "spark-emerging") {
      const timer = setTimeout(() => {
        setLocalPhase("spark-born");
      }, TIMINGS.sparkEmerging);
      return () => clearTimeout(timer);
    }

    if (localPhase === "spark-born") {
      const timer = setTimeout(() => {
        setLocalPhase("content-revealing");
      }, TIMINGS.sparkBorn);
      return () => clearTimeout(timer);
    }

    if (localPhase === "content-revealing") {
      const timer = setTimeout(() => {
        setLocalPhase("complete");
      }, TIMINGS.contentRevealing);
      return () => clearTimeout(timer);
    }

    return () => clearTimeout(forceStartTimer);
  }, [sceneReady, localPhase]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    startTimeRef.current = performance.now();

    const animate = () => {
      if (!ctx || !canvas) return;

      const now = performance.now();
      const elapsed = now - startTimeRef.current;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Background
      let bgOpacity = 1;
      if (localPhase === "content-revealing") {
        bgOpacity = 0.3;
      } else if (localPhase === "complete") {
        bgOpacity = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgba(26, 26, 26, ${bgOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spark properties
      let sparkSize = 0;
      let sparkOpacity = 0;

      if (localPhase === "spark-emerging") {
        const progress = Math.min((elapsed % 1000) / TIMINGS.sparkEmerging, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        sparkSize = 25 * eased;
        sparkOpacity = eased;
      } else if (localPhase === "spark-born") {
        sparkSize = 25;
        sparkOpacity = 1;
        // Pulse
        const pulse = Math.sin(elapsed / 150) * 0.15 + 1;
        sparkSize *= pulse;
      } else if (localPhase === "content-revealing") {
        sparkSize = 20;
        sparkOpacity = 0.6;
      }

      // Draw spark
      if (sparkSize > 0 && sparkOpacity > 0) {
        // Outer glow
        const outerGradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          sparkSize * 3,
        );
        outerGradient.addColorStop(
          0,
          `rgba(232, 165, 75, ${sparkOpacity * 0.5})`,
        );
        outerGradient.addColorStop(
          0.5,
          `rgba(232, 165, 75, ${sparkOpacity * 0.2})`,
        );
        outerGradient.addColorStop(1, "rgba(232, 165, 75, 0)");

        ctx.beginPath();
        ctx.arc(centerX, centerY, sparkSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Inner glow
        const innerGradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          sparkSize,
        );
        innerGradient.addColorStop(0, `rgba(255, 250, 240, ${sparkOpacity})`);
        innerGradient.addColorStop(0.4, `rgba(232, 165, 75, ${sparkOpacity})`);
        innerGradient.addColorStop(
          1,
          `rgba(232, 165, 75, ${sparkOpacity * 0.5})`,
        );

        ctx.beginPath();
        ctx.arc(centerX, centerY, sparkSize, 0, Math.PI * 2);
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(centerX, centerY, sparkSize * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 253, 248, ${sparkOpacity})`;
        ctx.fill();
      }

      if (localPhase !== "complete") {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [localPhase]);

  // Don't render when complete
  if (localPhase === "complete") {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
