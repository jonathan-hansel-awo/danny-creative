"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "coral" | "outline";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, string> = {
    default: "bg-light-text/10 text-light-text/70",
    coral: "bg-coral/10 text-coral",
    outline: "bg-transparent border border-current/30",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center",
        "font-body font-medium",
        "rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
