/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStore } from "@/stores/useStore";

export function Loader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      delay: number;
    }>
  >([]);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setLoadingPhase = useStore((s) => s.setLoadingPhase);
  const sceneReady = useStore((s) => s.sceneReady);

  // Animation configuration
  const config = {
    phases: {
      initial: { duration: 500 }, // Pure black
      sparkEmerging: { duration: 1000 }, // Spark fades in, pulses
      sparkBorn: { duration: 1500 }, // Particles burst out, background warms
      contentRevealing: { duration: 800 }, // Loader fades out
    },
    spark: {
      initialSize: 0,
      maxSize: 30,
      finalSize: 16,
    },
    particles: {
      count: 40,
      maxRadius: 300,
    },
  };

  // Initialize particles
  const initParticles = useCallback(
    (centerX: number, centerY: number) => {
      particlesRef.current = Array.from(
        { length: config.particles.count },
        (_, i) => {
          const angle =
            (i / config.particles.count) * Math.PI * 2 + Math.random() * 0.5;
          const speed = 1 + Math.random() * 2;
          return {
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 3 + Math.random() * 5,
            opacity: 0.6 + Math.random() * 0.4,
            delay: Math.random() * 300,
          };
        },
      );
    },
    [config.particles.count],
  );

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = performance.now();
    const elapsed = now - startTimeRef.current;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Clear with background color based on phase
    let bgOpacity = 1;
    if (loadingPhase === "spark-born") {
      const phaseElapsed =
        elapsed -
        config.phases.initial.duration -
        config.phases.sparkEmerging.duration;
      const progress = Math.min(
        phaseElapsed / config.phases.sparkBorn.duration,
        1,
      );
      bgOpacity = 1 - progress * 0.5; // Fade to 50% opacity
    } else if (loadingPhase === "content-revealing") {
      const phaseElapsed =
        elapsed -
        config.phases.initial.duration -
        config.phases.sparkEmerging.duration -
        config.phases.sparkBorn.duration;
      const progress = Math.min(
        phaseElapsed / config.phases.contentRevealing.duration,
        1,
      );
      bgOpacity = 0.5 - progress * 0.5; // Fade to 0%
    } else if (loadingPhase === "complete") {
      bgOpacity = 0;
    }

    // Background
    ctx.fillStyle = `rgba(26, 26, 26, ${bgOpacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate spark properties based on phase
    let sparkSize = 0;
    let sparkOpacity = 0;
    let sparkGlow = 0;
    let showParticles = false;

    if (loadingPhase === "initial") {
      // Nothing visible yet
    } else if (loadingPhase === "spark-emerging") {
      const phaseElapsed = elapsed - config.phases.initial.duration;
      const progress = Math.min(
        phaseElapsed / config.phases.sparkEmerging.duration,
        1,
      );

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      sparkSize = config.spark.maxSize * eased;
      sparkOpacity = eased;
      sparkGlow = eased;

      // Pulse effect
      const pulse = Math.sin(phaseElapsed / 200) * 0.1 + 1;
      sparkSize *= pulse;
    } else if (loadingPhase === "spark-born") {
      const phaseElapsed =
        elapsed -
        config.phases.initial.duration -
        config.phases.sparkEmerging.duration;
      const progress = Math.min(
        phaseElapsed / config.phases.sparkBorn.duration,
        1,
      );

      // Spark shrinks to final size
      sparkSize =
        config.spark.maxSize +
        (config.spark.finalSize - config.spark.maxSize) * progress;
      sparkOpacity = 1;
      sparkGlow = 1 - progress * 0.3;
      showParticles = true;

      // Pulse
      const pulse = Math.sin(phaseElapsed / 150) * 0.05 + 1;
      sparkSize *= pulse;
    } else if (loadingPhase === "content-revealing") {
      const phaseElapsed =
        elapsed -
        config.phases.initial.duration -
        config.phases.sparkEmerging.duration -
        config.phases.sparkBorn.duration;
      const progress = Math.min(
        phaseElapsed / config.phases.contentRevealing.duration,
        1,
      );

      sparkSize = config.spark.finalSize * (1 - progress);
      sparkOpacity = 1 - progress;
      sparkGlow = 0.7 * (1 - progress);
      showParticles = true;
    }

    // Draw particles
    if (showParticles) {
      const phaseElapsed =
        elapsed -
        config.phases.initial.duration -
        config.phases.sparkEmerging.duration;

      particlesRef.current.forEach((p) => {
        const particleElapsed = phaseElapsed - p.delay;
        if (particleElapsed < 0) return;

        // Update position
        const progress = Math.min(particleElapsed / 2000, 1);
        const currentX = centerX + p.vx * particleElapsed * 0.15;
        const currentY = centerY + p.vy * particleElapsed * 0.15;

        // Fade out as they travel
        const fadeProgress = Math.min(particleElapsed / 1500, 1);
        const opacity = p.opacity * (1 - fadeProgress);

        if (opacity <= 0) return;

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          p.size * 2,
        );
        gradient.addColorStop(0, `rgba(232, 165, 75, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(232, 165, 75, ${opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(232, 165, 75, 0)");

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw particle core
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 253, 248, ${opacity})`;
        ctx.fill();
      });
    }

    // Draw spark
    if (sparkSize > 0 && sparkOpacity > 0) {
      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        sparkSize * 3,
      );
      outerGlow.addColorStop(
        0,
        `rgba(232, 165, 75, ${sparkGlow * 0.6 * sparkOpacity})`,
      );
      outerGlow.addColorStop(
        0.5,
        `rgba(232, 165, 75, ${sparkGlow * 0.2 * sparkOpacity})`,
      );
      outerGlow.addColorStop(1, "rgba(232, 165, 75, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, sparkSize * 3, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      // Inner glow
      const innerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        sparkSize,
      );
      innerGlow.addColorStop(0, `rgba(255, 249, 240, ${sparkOpacity})`);
      innerGlow.addColorStop(0.3, `rgba(232, 165, 75, ${sparkOpacity})`);
      innerGlow.addColorStop(1, `rgba(232, 165, 75, ${sparkOpacity * 0.6})`);

      ctx.beginPath();
      ctx.arc(centerX, centerY, sparkSize, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, sparkSize * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 253, 248, ${sparkOpacity})`;
      ctx.fill();
    }

    if (loadingPhase !== "complete") {
      frameRef.current = requestAnimationFrame(animate);
    }
  }, [loadingPhase, config]);

  // Phase progression
  useEffect(() => {
    if (!sceneReady) return;

    startTimeRef.current = performance.now();

    const canvas = canvasRef.current;
    if (canvas) {
      initParticles(canvas.width / 2, canvas.height / 2);
    }

    // Phase 1: Initial (black screen)
    setLoadingPhase("initial");

    // Phase 2: Spark emerging
    const timer1 = setTimeout(() => {
      setLoadingPhase("spark-emerging");
    }, config.phases.initial.duration);

    // Phase 3: Spark born (particles burst)
    const timer2 = setTimeout(() => {
      setLoadingPhase("spark-born");
    }, config.phases.initial.duration + config.phases.sparkEmerging.duration);

    // Phase 4: Content revealing
    const timer3 = setTimeout(
      () => {
        setLoadingPhase("content-revealing");
      },
      config.phases.initial.duration +
        config.phases.sparkEmerging.duration +
        config.phases.sparkBorn.duration,
    );

    // Phase 5: Complete
    const timer4 = setTimeout(
      () => {
        setLoadingPhase("complete");
      },
      config.phases.initial.duration +
        config.phases.sparkEmerging.duration +
        config.phases.sparkBorn.duration +
        config.phases.contentRevealing.duration,
    );

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [sceneReady, setLoadingPhase, initParticles, config]);

  // Start animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width / 2, canvas.height / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [animate, initParticles]);

  // Hide loader when complete
  if (loadingPhase === "complete") {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        opacity: loadingPhase === "content-revealing" ? 0 : 1,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
