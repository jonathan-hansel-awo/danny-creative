"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

export default function TestimonialCard({
  testimonial,
  isActive = true,
}: TestimonialCardProps) {
  // Generate initials for avatar fallback
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Large decorative quote mark */}
      <motion.div
        className={cn(
          "absolute -top-4 -left-2 md:-top-8 md:-left-8",
          "text-[6rem] md:text-[10rem] leading-none",
          "font-display text-coral/10",
          "select-none pointer-events-none",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        &ldquo;
      </motion.div>

      {/* Quote text */}
      <motion.blockquote
        className={cn(
          "relative z-10",
          "text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] lg:text-[2rem]",
          "font-display leading-[1.4]",
          "text-dark-text",
          "mb-10",
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {testimonial.quote}
      </motion.blockquote>

      {/* Attribution */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Avatar */}
        <div
          className={cn(
            "relative w-14 h-14 rounded-full overflow-hidden",
            "bg-linear-to-br from-coral to-coral-dark",
            "flex items-center justify-center",
            "ring-2 ring-coral/20 ring-offset-2 ring-offset-dark-bg",
          )}
        >
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-white font-display text-lg">{initials}</span>
          )}
        </div>

        {/* Name and role */}
        <div>
          <div className="font-body font-medium text-dark-text text-lg">
            {testimonial.name}
          </div>
          <div className="text-body-s text-dark-text/50 flex items-center gap-1">
            <span>{testimonial.role}</span>
            <span className="text-coral">·</span>
            <span className="text-coral">{testimonial.company}</span>
          </div>
        </div>
      </motion.div>

      {/* Decorative line */}
      <motion.div
        className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-coral via-coral/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformOrigin: "top" }}
      />
    </motion.div>
  );
}
