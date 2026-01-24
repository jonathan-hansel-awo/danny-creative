"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  progress: number; // 0-1, how much this card is in view
}

export function ProjectCard({
  project,
  index,
  isActive,
  progress,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Reveal animation when card becomes active
  useEffect(() => {
    if (isActive && !isRevealed) {
      const timer = setTimeout(() => setIsRevealed(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isActive, isRevealed]);

  // Parallax effect on content
  useEffect(() => {
    if (!contentRef.current) return;

    const offset = (progress - 0.5) * 30; // -15px to +15px
    gsap.to(contentRef.current, {
      y: offset,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [progress]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] md:w-[70vw] h-full flex items-center px-4 md:px-8"
      style={{
        opacity: isActive ? 1 : 0.3,
        transition: "opacity 0.8s ease-out",
      }}
    >
      <div className="w-full h-[70vh] md:h-[75vh] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        {/* Image */}
        <div
          className="w-full md:w-[60%] h-[40vh] md:h-full relative"
          style={{
            transform: `perspective(1000px) rotateY(${isActive ? 0 : 5}deg)`,
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <ProjectImage
            color={project.color}
            title={project.title}
            isActive={isActive}
            isRevealed={isRevealed}
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="w-full md:w-[40%] flex flex-col justify-center"
        >
          {/* Category & Year */}
          <div
            className="flex items-center gap-4 mb-4"
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <span
              className="text-sm tracking-[0.15em] uppercase"
              style={{
                color: "var(--color-spark)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {project.category}
            </span>
            <span
              className="text-sm"
              style={{
                color: "var(--color-ink-muted)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-4xl md:text-5xl lg:text-6xl mb-3"
            style={{
              color: "var(--color-ink)",
              fontFamily: "Tenor Sans, Georgia, serif",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl mb-6"
            style={{
              color: "var(--color-ink-light)",
              fontFamily: "Tenor Sans, Georgia, serif",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-base mb-8 max-w-md"
            style={{
              color: "var(--color-ink-muted)",
              lineHeight: 1.7,
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
            }}
          >
            {project.description}
          </p>

          {/* View Project Link */}
          <div
            style={{
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
            }}
          >
            <button
              className="group flex items-center gap-3 text-base font-medium"
              style={{
                color: "var(--color-ink)",
                fontFamily: "Inter, sans-serif",
              }}
              data-spark-hover
            >
              <span>View Project</span>
              <svg
                className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
