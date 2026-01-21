"use client";

import { useState, useEffect, useCallback } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    quote:
      "Working with Danny Creative transformed how we think about our brand. They didn't just design a logo — they gave us a story to tell.",
    author: "Sarah Chen",
    title: "Founder",
    company: "Bloom Hotels",
  },
  {
    quote:
      "The team understood our vision from day one. Our new identity has helped us stand out in a crowded market.",
    author: "Marcus Webb",
    title: "CEO",
    company: "Velocity Auto",
  },
  {
    quote:
      "Professional, creative, and genuinely invested in our success. Couldn't recommend them more highly.",
    author: "Elena Rodriguez",
    title: "Marketing Director",
    company: "Summit Retail",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);

  return (
    <section id="testimonials" className="section-padding bg-cream-dark">
      <div className="container-md">
        {/* Header */}
        <div data-reveal>
          <SectionHeader
            eyebrow="Kind Words"
            headline="What our partners say."
            align="center"
            className="mb-16"
          />
        </div>

        {/* Testimonial */}
        <div
          className="max-w-[720px] mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-reveal
          data-reveal-delay="150"
        >
          <div className="relative min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className={`transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                }`}
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-spark scale-110"
                    : "bg-ink-muted/30 hover:bg-ink-muted/50"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
