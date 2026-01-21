"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import RoomSection from "@/components/effects/RoomSection";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import { Testimonial } from "@/types";

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Danny Creative didn't just rebrand us—they gave us a new identity that actually feels like who we are. The response from our customers has been overwhelming.",
    name: "Sarah Chen",
    role: "CEO",
    company: "Lumina Hotels",
  },
  {
    id: "2",
    quote:
      "Working with this team was unlike anything else. They pushed us creatively while staying true to our vision. The result? Pure magic.",
    name: "Marcus Webb",
    role: "Founder",
    company: "Vertex Auto",
  },
  {
    id: "3",
    quote:
      "The attention to detail is extraordinary. Every pixel, every animation, every word—it all matters to them. That level of care is rare.",
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Echo Studios",
  },
  {
    id: "4",
    quote:
      "They transformed how we present ourselves to the world. Our brand finally matches the quality of our service.",
    name: "James Liu",
    role: "Managing Partner",
    company: "Catalyst Finance",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <RoomSection id="testimonials" room="dark" className="py-32 md:py-40">
      {/* Transition gradient from light */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #faf9f6, #0a0a0a)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <SectionHeader
            eyebrow="Testimonials"
            headline={
              <>
                Words From Those
                <br />
                <span className="text-coral">We&apos;ve Helped</span>
              </>
            }
            align="left"
          />
        </div>

        {/* Testimonial Carousel */}
        <div ref={containerRef} className="relative">
          {/* Cards */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-3xl"
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <RevealOnScroll animation="fade-up" delay={0.3}>
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-dark-text/10">
              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      "transition-all duration-300",
                      index === activeIndex
                        ? "bg-coral w-8"
                        : "bg-dark-text/30 hover:bg-dark-text/50",
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={prevTestimonial}
                  className={cn(
                    "w-12 h-12 rounded-full",
                    "border border-dark-text/20",
                    "flex items-center justify-center",
                    "text-dark-text/60",
                    "transition-all duration-300",
                    "hover:border-coral hover:text-coral",
                  )}
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className={cn(
                    "w-12 h-12 rounded-full",
                    "border border-dark-text/20",
                    "flex items-center justify-center",
                    "text-dark-text/60",
                    "transition-all duration-300",
                    "hover:border-coral hover:text-coral",
                  )}
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </RoomSection>
  );
}
