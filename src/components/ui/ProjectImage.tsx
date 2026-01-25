"use client";

import { useEffect, useRef } from "react";

interface ProjectImageProps {
  color: string;
  accentColor: string;
  isRevealed: boolean;
}

export function ProjectImage({
  color,
  accentColor,
  isRevealed,
}: ProjectImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasDrawnRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasDrawnRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    hasDrawnRef.current = true;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const width = rect.width;
    const height = rect.height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, accentColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle noise
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 20;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    // Decorative shapes
    ctx.globalAlpha = 0.1;

    // Large circle
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.35, width * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // Rectangle
    ctx.fillStyle = "#000000";
    ctx.fillRect(width * 0.08, height * 0.55, width * 0.35, height * 0.3);

    // Small circle
    ctx.beginPath();
    ctx.arc(width * 0.25, height * 0.25, width * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    ctx.globalAlpha = 1;
  }, [color, accentColor]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Reveal mask */}
      <div
        className="absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          clipPath: isRevealed ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Subtle overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.2) 100%)",
          opacity: isRevealed ? 1 : 0,
        }}
      />
    </div>
  );
}
