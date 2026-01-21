"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import RevealOnScroll from "@/components/effects/RevealOnScroll";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: ReactNode;
  subhead?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subhead,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignmentStyles = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <div className={cn("max-w-3xl", alignmentStyles[align], className)}>
      {eyebrow && (
        <RevealOnScroll animation="fade-up" delay={0}>
          <span
            className={cn(
              "inline-block",
              "text-label font-body font-semibold uppercase tracking-wider",
              "text-coral",
              "mb-4",
            )}
          >
            {eyebrow}
          </span>
        </RevealOnScroll>
      )}

      <RevealOnScroll animation="fade-up" delay={0.1}>
        <h2
          className={cn(
            "font-display",
            "text-display-l",
            "leading-tight",
            "mb-6",
            // Responsive sizing
            "text-[2rem] sm:text-[2.5rem] md:text-display-l",
          )}
        >
          {headline}
        </h2>
      </RevealOnScroll>

      {subhead && (
        <RevealOnScroll animation="fade-up" delay={0.2}>
          <p
            className={cn(
              "text-body-l font-body",
              "opacity-70",
              "max-w-xl",
              align === "center" && "mx-auto",
            )}
          >
            {subhead}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
