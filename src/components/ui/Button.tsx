"use client";

import { forwardRef, useRef, useState, ReactNode, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  magnetic?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href,
      onClick,
      disabled = false,
      loading = false,
      magnetic = false,
      fullWidth = false,
      icon,
      iconPosition = "right",
      className = "",
      type = "button",
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetic || !buttonRef.current || disabled || loading) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      setMagneticOffset({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
      setMagneticOffset({ x: 0, y: 0 });
    };

    const isDisabled = disabled || loading;

    const baseStyles = cn(
      "relative inline-flex items-center justify-center",
      "font-body font-medium",
      "rounded-full",
      "transition-all duration-300 ease-out-quad",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      fullWidth && "w-full",
    );

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        "bg-coral text-white",
        "shadow-glow-coral-sm",
        !isDisabled && "hover:shadow-glow-coral-md hover:bg-coral-dark",
        !isDisabled && "active:scale-[0.98]",
        isDisabled && "opacity-60",
      ),
      secondary: cn(
        "bg-transparent",
        "border border-current/30",
        !isDisabled && "hover:border-coral hover:text-coral hover:bg-coral/5",
        !isDisabled && "active:scale-[0.98]",
        isDisabled && "opacity-50",
      ),
      ghost: cn(
        "bg-transparent",
        !isDisabled && "hover:text-coral",
        !isDisabled && "active:scale-[0.98]",
        isDisabled && "opacity-50",
      ),
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "px-5 py-2.5 text-sm gap-2",
      md: "px-7 py-3 text-base gap-2",
      lg: "px-9 py-4 text-lg gap-3",
    };

    const combinedStyles = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className,
    );

    const iconSize: Record<ButtonSize, string> = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-5 h-5",
    };

    const content = (
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        animate={{
          x: magneticOffset.x * 0.5,
          y: magneticOffset.y * 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <LoadingSpinner className={iconSize[size]} />
              <span>Loading...</span>
            </motion.span>
          ) : (
            <motion.span
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              {icon && iconPosition === "left" && (
                <span className={iconSize[size]}>{icon}</span>
              )}
              {children}
              {icon && iconPosition === "right" && (
                <span className={iconSize[size]}>{icon}</span>
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    );

    const motionProps = {
      animate: {
        x: magneticOffset.x,
        y: magneticOffset.y,
        scale: isPressed ? 0.98 : 1,
      },
      transition: { type: "spring", stiffness: 400, damping: 25 },
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
    };

    if (href && !isDisabled) {
      return (
        <motion.a
          ref={buttonRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={combinedStyles}
          {...motionProps}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={combinedStyles}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;

// Loading Spinner Component
function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
