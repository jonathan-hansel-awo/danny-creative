"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [orderedTestimonials, setOrderedTestimonials] = useState(testimonials);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  // Move to next testimonial
  const nextTestimonial = useCallback(() => {
    setOrderedTestimonials((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, []);

  // Move to previous testimonial
  const prevTestimonial = useCallback(() => {
    setOrderedTestimonials((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, -1);
      return [last, ...rest];
    });
  }, []);

  // Auto-advance timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(timer);
  }, [nextTestimonial]);

  // Scroll animations
  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasAnimatedRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !header || !cardsContainer) return;

    hasAnimatedRef.current = true;

    // Header animation
    gsap.fromTo(
      header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 50%",
          scrub: 1,
        },
      },
    );

    // Cards container animation
    gsap.fromTo(
      cardsContainer,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 80%",
          end: "top 55%",
          scrub: 1,
        },
      },
    );

    // Section tracking
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setCurrentSection("testimonials"),
      onEnterBack: () => setCurrentSection("testimonials"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === section ||
          trigger.vars.trigger === cardsContainer
        ) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase, setCurrentSection]);

  return (
    <section
  ref={sectionRef}
  id="testimonials"
      className="relative py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 md:mb-20"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D4940F" }}
          >
            Kind Words
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{
              color: "#0F0F0F",
              fontFamily: "Tenor Sans, Georgia, serif",
            }}
          >
            What our partners say.
          </h2>
        </div>

        {/* Cards Stack */}
        <div
          ref={cardsContainerRef}
          className="relative max-w-3xl mx-auto"
          style={{ opacity: 0 }}
        >
          {/* Card container with fixed height */}
          <div className="relative h-[400px] md:h-[350px]">
            {orderedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === 0}
                index={index}
                totalCards={testimonials.length}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Previous button */}
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "transparent",
              }}
              data-spark-hover
              aria-label="Previous testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4A4A4A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, index) => {
                const isActive = orderedTestimonials[0].id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      const currentIndex = orderedTestimonials.findIndex(
                        (ot) => ot.id === t.id,
                      );
                      if (currentIndex > 0) {
                        setOrderedTestimonials((prev) => {
                          const reordered = [...prev];
                          const item = reordered.splice(currentIndex, 1)[0];
                          reordered.unshift(item);
                          return reordered;
                        });
                      }
                    }}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "#D4940F"
                        : "rgba(0,0,0,0.15)",
                      transform: isActive ? "scale(1.2)" : "scale(1)",
                    }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Next button */}
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "transparent",
              }}
              data-spark-hover
              aria-label="Next testimonial"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4A4A4A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
