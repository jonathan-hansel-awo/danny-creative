"use client";

import { useRef, useEffect, useState } from "react";

interface ProjectImageProps {
  color: string;
  title: string;
  isActive: boolean;
  isRevealed: boolean;
}

export function ProjectImage({
  color,
  title,
  isActive,
  isRevealed,
}: ProjectImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, adjustColor(color, -30));

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle noise texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 15;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    // Add geometric shapes
    ctx.globalAlpha = 0.1;

    // Circle
    ctx.beginPath();
    ctx.arc(
      canvas.width * 0.7,
      canvas.height * 0.3,
      canvas.width * 0.2,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // Rectangle
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      canvas.width * 0.1,
      canvas.height * 0.6,
      canvas.width * 0.3,
      canvas.height * 0.25,
    );

    ctx.globalAlpha = 1;
  }, [color, dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Clip mask for reveal animation */}
      <div
        className="absolute inset-0 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          clipPath: isRevealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
          style={{
            transform: isActive ? "scale(1)" : "scale(1.1)",
            transition: "transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3) 100%)",
          opacity: isRevealed ? 1 : 0,
          transition: "opacity 0.8s ease-out 0.3s",
        }}
      />
    </div>
  );
}

// Helper function to adjust color brightness
function adjustColor(color: string, amount: number): string {
  const hex = color.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
