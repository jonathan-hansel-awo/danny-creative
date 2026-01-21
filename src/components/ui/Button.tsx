'use client';

import { forwardRef, useRef, useState, ReactNode, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { lerp } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  magnetic?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      href,
      onClick,
      disabled = false,
      magnetic = false,
      className = '',
      type = 'button',
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic || !buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMagneticOffset({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
    };

    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'font-body font-medium',
      'rounded-full',
      'transition-all duration-300 ease-out-quad',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    );

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        'bg-coral text-white',
        'shadow-glow-coral-sm hover:shadow-glow-coral-md',
        'hover:scale-[1.02] active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-transparent',
        'border border-current/30',
        'hover:border-coral hover:text-coral',
        'hover:bg-coral/5',
        'active:scale-[0.98]'
      ),
      ghost: cn(
        'bg-transparent',
        'hover:text-coral',
        'active:scale-[0.98]'
      ),
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'px-6 py-2.5 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-10 py-4 text-lg',
    };

    const combinedStyles = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const content = (
      <motion.span
        className="relative z-10 flex items-center gap-2"
        style={{
          x: magneticOffset.x,
          y: magneticOffset.y,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        {children}
      </motion.span>
    );

    if (href) {
      return (
        <a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={combinedStyles}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
          }}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
        }}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;