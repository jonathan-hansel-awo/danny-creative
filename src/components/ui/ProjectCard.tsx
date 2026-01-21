'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <a
      ref={cardRef}
      href={project.href}
      className={cn(
        'group relative block',
        'rounded-2xl overflow-hidden',
        'bg-dark-text/5'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden">
        {/* Placeholder gradient (replace with actual image) */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-linear-to-br from-coral/20 via-dark-bg to-coral/10',
            'transition-transform duration-700 ease-out-quad'
          )}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Actual image would go here */}
        {/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out-quad group-hover:scale-105"
        /> */}

        {/* Hover overlay with distortion effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(224, 122, 95, 0.15) 0%, transparent 50%)`
              : 'transparent',
          }}
        />

        {/* Vignette */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-linear-to-t from-dark-bg/90 via-dark-bg/20 to-transparent',
            'transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-70'
          )}
        />

        {/* View Project CTA */}
        <motion.div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-500'
          )}
        >
          <span
            className={cn(
              'px-6 py-3 rounded-full',
              'bg-dark-text/10 backdrop-blur-sm',
              'text-dark-text text-sm font-body font-medium',
              'border border-dark-text/20',
              'flex items-center gap-2'
            )}
          >
            View Project
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="text-display-s font-display mb-2 group-hover:text-coral transition-colors duration-300">
          {project.title}
        </h3>
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

      {/* Bottom highlight on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-coral"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'left' }}
      />
    </a>
  );
}