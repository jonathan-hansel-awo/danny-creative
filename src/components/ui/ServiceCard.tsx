'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  expandable?: boolean;
}

export default function ServiceCard({ service, expandable = false }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      className={cn(
        'relative p-8 h-full',
        'rounded-2xl',
        'border border-light-text/10',
        'bg-transparent',
        'transition-colors duration-500',
        'group',
        expandable && 'cursor-pointer'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      layout
      whileHover={{
        y: -4,
        boxShadow: '0 16px 48px rgba(26, 26, 26, 0.1)',
        backgroundColor: '#ffffff',
      }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(224, 122, 95, 0.05) 0%, transparent 50%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon/Number */}
      <motion.div
        className={cn(
          'relative z-10',
          'text-[2.5rem] font-display text-coral',
          'mb-6'
        )}
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {service.icon}
      </motion.div>

      {/* Title */}
      <motion.h3
        className={cn(
          'relative z-10',
          'text-display-s font-display',
          'text-light-text',
          'mb-4'
        )}
        layout="position"
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className={cn(
          'relative z-10',
          'text-body-m font-body',
          'text-light-text/60',
          'leading-relaxed'
        )}
        layout="position"
      >
        {service.description}
      </motion.p>

      {/* Expanded content */}
      <AnimatePresence>
        {expandable && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 mt-6 pt-6 border-t border-light-text/10"
          >
            <p className="text-body-s text-light-text/50 mb-4">
              Our approach includes comprehensive research, strategic planning, 
              creative development, and meticulous execution.
            </p>
            {service.href && (
              <a
                href={service.href}
                className="inline-flex items-center gap-2 text-coral text-body-s font-medium group/link"
                onClick={(e) => e.stopPropagation()}
              >
                Learn more
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover indicator line */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-[2px] bg-linear-to-r from-coral via-coral to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Expand indicator */}
      {expandable && (
        <motion.div
          className="absolute top-6 right-6 w-6 h-6 flex items-center justify-center"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-4 h-4 text-light-text/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
}