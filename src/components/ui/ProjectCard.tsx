"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mouse position for lighting effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for mouse tracking
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position to gradient position
  const gradientX = useTransform(x, (val) => `${val}%`);
  const gradientY = useTransform(y, (val) => `${val}%`);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    mouseX.set(xPercent);
    mouseY.set(yPercent);
  };

  // Play video on hover
  useEffect(() => {
    if (!videoRef.current || !project.video) return;

    if (isHovered) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, project.video]);

  return (
    <motion.a
      ref={cardRef}
      href={project.href}
      className={cn(
        "group relative block",
        "rounded-2xl overflow-hidden",
        "bg-dark-text/5",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* Placeholder / Skeleton */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br from-coral/10 via-dark-bg to-coral/5",
            "transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Main Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>

        {/* Video Preview (if available) */}
        {project.video && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Dynamic lighting effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [gradientX, gradientY],
              ([x, y]) =>
                `radial-gradient(circle at ${x} ${y}, rgba(224, 122, 95, 0.2) 0%, transparent 50%)`,
            ),
          }}
        />

        {/* Vignette overlay */}
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-transparent",
            "transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-60",
          )}
        />

        {/* View Project CTA */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className={cn(
              "px-6 py-3 rounded-full",
              "bg-white/10 backdrop-blur-md",
              "text-white text-sm font-body font-medium",
              "border border-white/20",
              "flex items-center gap-2",
            )}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            View Project
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-6">
        <motion.h3
          className="text-display-s font-display mb-2"
          animate={{ color: isHovered ? "#e07a5f" : "#f5f0e8" }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>
        <div className="flex items-center gap-2 text-body-s text-dark-text/60">
          <span>{project.category}</span>
          {project.year && (
            <>
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{project.year}</span>
            </>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-coral to-coral-light"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: "left" }}
      />

      {/* Corner glow on hover */}
      <motion.div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224, 122, 95, 0.3) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      />
    </motion.a>
  );
}
