"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { getRandomInRange, lerp } from "@/lib/utils";
import { PARTICLE_CONFIG } from "@/lib/constants";
import { Room, Particle } from "@/types";

interface ParticleFieldProps {
  room?: Room;
  className?: string;
}

export default function ParticleField({
  room = "dark",
  className = "",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const mousePosition = useMousePosition(0.08);

  // Colors based on room
  const getParticleColor = useCallback(
    (isAccent: boolean) => {
      if (isAccent) {
        return room === "dark"
          ? "rgba(224, 122, 95, 0.4)"
          : "rgba(224, 122, 95, 0.35)";
      }
      return room === "dark"
        ? "rgba(245, 240, 232, 0.25)"
        : "rgba(26, 26, 26, 0.2)";
    },
    [room],
  );

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile
        ? PARTICLE_CONFIG.countMobile
        : PARTICLE_CONFIG.countDesktop;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const isAccent = i < count * 0.15; // 15% accent particles
        particles.push({
          x: getRandomInRange(0, width),
          y: getRandomInRange(0, height),
          vx: 0,
          vy: 0,
          size: getRandomInRange(
            PARTICLE_CONFIG.minSize,
            PARTICLE_CONFIG.maxSize,
          ),
          opacity: getRandomInRange(0.3, 0.8),
          color: getParticleColor(isAccent),
          driftSpeed: getRandomInRange(0.1, PARTICLE_CONFIG.driftSpeed),
          oscillationFrequency: getRandomInRange(0.001, 0.003),
          oscillationAmplitude: getRandomInRange(0.3, 0.8),
        });
      }

      particlesRef.current = particles;
    },
    [getParticleColor],
  );

  // Update particle colors when room changes
  useEffect(() => {
    const particles = particlesRef.current;
    const accentCount = Math.floor(particles.length * 0.15);

    particles.forEach((particle, index) => {
      particle.color = getParticleColor(index < accentCount);
    });
  }, [room, getParticleColor]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Reinitialize particles on resize
      initParticles(window.innerWidth, window.innerHeight);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let time = 0;

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        // Ambient drift with oscillation
        time += 0.001;
        particle.x +=
          Math.sin(time * particle.oscillationFrequency * 1000) *
          particle.oscillationAmplitude;
        particle.y += particle.driftSpeed;

        // Cursor avoidance
        const dx = particle.x - mousePosition.x;
        const dy = particle.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = PARTICLE_CONFIG.cursorRadius;

        if (distance < maxDistance && distance > 0) {
          const force = (1 - distance / maxDistance) * 2;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }

        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Edge wrapping
        if (particle.y > height + 10) {
          particle.y = -10;
          particle.x = getRandomInRange(0, width);
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}
