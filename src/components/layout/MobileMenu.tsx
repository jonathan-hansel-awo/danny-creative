'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  links: Array<{ label: string; href: string }>;
  onLinkClick: (href: string) => void;
  onClose: () => void;
}

export default function MobileMenu({ links, onLinkClick, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const focusableElements = menu.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => window.removeEventListener('keydown', handleTab);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={menuRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        "fixed inset-0 z-[var(--z-overlay)]",
        "bg-dark-bg",
        "flex flex-col items-center justify-center",
        "px-6",
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Close button */}
      <motion.button
        variants={itemVariants}
        onClick={onClose}
        className={cn(
          "absolute top-6 right-6",
          "w-10 h-10 flex items-center justify-center",
          "text-dark-text",
        )}
        aria-label="Close menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </motion.button>

      {/* Logo */}
      <motion.div
        variants={itemVariants}
        className="absolute top-6 left-6 text-2xl font-display text-dark-text"
      >
        Danny<span className="text-coral">.</span>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, index) => (
          <motion.a
            key={link.href}
            variants={itemVariants}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              onLinkClick(link.href);
            }}
            className={cn(
              "text-3xl font-display text-dark-text",
              "transition-colors duration-300",
              "hover:text-coral",
            )}
          >
            {link.label}
          </motion.a>
        ))}

        <motion.div variants={itemVariants} className="mt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onLinkClick("#contact")}
          >
            Let&apos;s Talk
          </Button>
        </motion.div>
      </nav>

      {/* Social Links */}
      <motion.div
        variants={itemVariants}
        className="absolute bottom-10 flex gap-6"
      >
        {["Instagram", "Twitter", "LinkedIn"].map((social) => (
          <a
            key={social}
            href="#"
            className={cn(
              "text-sm font-body text-dark-text/60",
              "transition-colors duration-300",
              "hover:text-coral",
            )}
          >
            {social}
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}