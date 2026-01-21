"use client";

import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative">
      {/* Large quote mark */}
      <div
        className={cn(
          "absolute -top-8 -left-4 md:-left-8",
          "text-[8rem] md:text-[10rem] leading-none",
          "font-display text-coral/20",
          "select-none pointer-events-none",
        )}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <blockquote
        className={cn(
          "relative z-10",
          "text-[1.5rem] md:text-[1.75rem] lg:text-[2rem]",
          "font-display leading-relaxed",
          "text-dark-text",
          "mb-10",
        )}
      >
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-4">
        {/* Avatar placeholder */}
        <div
          className={cn(
            "w-14 h-14 rounded-full",
            "bg-linear-to-br from-coral to-coral-dark",
            "flex items-center justify-center",
            "text-white font-display text-lg",
          )}
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div>
          <div className="font-body font-medium text-dark-text">
            {testimonial.name}
          </div>
          <div className="text-body-s text-dark-text/60">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}
