"use client";

import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
  index: number;
  totalCards: number;
}

export function TestimonialCard({
  testimonial,
  isActive,
  index,
  totalCards,
}: TestimonialCardProps) {
  // Calculate stacking offset
  const stackOffset = isActive ? 0 : (index + 1) * 8;
  const stackScale = isActive ? 1 : 1 - (index + 1) * 0.03;
  const stackOpacity = isActive ? 1 : Math.max(0.3, 1 - (index + 1) * 0.2);

  return (
    <div
      className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transform: `translateY(${stackOffset}px) scale(${stackScale})`,
        opacity: stackOpacity,
        zIndex: totalCards - index,
      }}
    >
      <div
        className="w-full h-full rounded-3xl p-8 md:p-12 flex flex-col justify-between"
        style={{
          backgroundColor: "var(--color-warm-white)",
          boxShadow: isActive
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Quote mark */}
        <div
          className="text-8xl md:text-9xl leading-none select-none"
          style={{
            color: "#D4940F",
            opacity: 0.15,
            fontFamily: "Georgia, serif",
          }}
        >
          &quot;
        </div>

        {/* Quote text */}
        <blockquote
          className="text-xl md:text-2xl lg:text-3xl leading-relaxed -mt-8 md:-mt-12"
          style={{
            color: "#0F0F0F",
            fontFamily: "Tenor Sans, Georgia, serif",
          }}
        >
          {testimonial.quote}
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center gap-4 mt-8">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              backgroundColor: "#D4940F",
              color: "white",
            }}
          >
            {testimonial.initials}
          </div>

          {/* Name & Title */}
          <div>
            <p className="font-medium" style={{ color: "#0F0F0F" }}>
              {testimonial.author}
            </p>
            <p className="text-sm" style={{ color: "#6A6A6A" }}>
              {testimonial.title}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
