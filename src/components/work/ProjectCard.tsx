"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Project } from "@/data/projects";
import { ProjectImage } from "@/components/ui/ProjectImage";

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
}

export function ProjectCard({ project, index, isActive }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mark as revealed once active
  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRevealed(true);
    }
  }, [isActive, isRevealed]);

  // Content animation when active
  useEffect(() => {
    if (!isActive || !contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".animate-item");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[85vw] md:w-[75vw] lg:w-[70vw] h-full flex  items-center px-4 md:px-8"
    >
      <div
        className="w-full h-[75vh] md:h-[70vh] flex flex-col lg:flex-row gap-8 mt-16 lg:gap-12 items-center transition-opacity duration-700"
        style={{ opacity: isActive ? 1 : 0.25 }}
      >
        {/* Image */}
        <div
          className="w-full lg:w-[58%] h-[35vh] md:h-[45vh] lg:h-full relative"
          style={{
            transform: `perspective(1000px) rotateY(${isActive ? 0 : 3}deg)`,
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <ProjectImage
            color={project.color}
            accentColor={project.accentColor}
            isRevealed={isRevealed}
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="w-full lg:w-[42%] flex flex-col justify-center"
        >
          {/* Category & Year */}
          <div
            className="flex items-center gap-4 mb-4 animate-item"
            style={{ opacity: 0 }}
          >
            <span
              className="text-sm font-medium tracking-[0.15em] uppercase"
              style={{ color: "#D4940F" }}
            >
              {project.category}
            </span>
            <span className="text-sm" style={{ color: "#8A8A8A" }}>
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-3xl md:text-4xl lg:text-5xl mb-3 animate-item"
            style={{
              color: "#0F0F0F",
              fontFamily: "Tenor Sans, Georgia, serif",
              opacity: 0,
            }}
          >
            {project.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-xl md:text-2xl mb-6 animate-item"
            style={{
              color: "#4A4A4A",
              fontFamily: "Tenor Sans, Georgia, serif",
              opacity: 0,
            }}
          >
            {project.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-base mb-8 max-w-md leading-relaxed animate-item"
            style={{ color: "#6A6A6A", opacity: 0 }}
          >
            {project.description}
          </p>

          {/* View Project Link */}
          <div className="animate-item" style={{ opacity: 0 }}>
            <button
              className="group flex items-center gap-3 text-base font-medium transition-colors duration-300"
              style={{ color: "#0F0F0F" }}
              data-spark-hover
            >
              <span className="group-hover:text-[#D4940F] transition-colors duration-300">
                View Project
              </span>
              <svg
                className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#D4940F]"
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
