"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const hasAnimatedRef = useRef(false);
  const hasSetupScrollRef = useRef(false);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  // Entrance animation
  useEffect(() => {
    if (loadingPhase !== "content-revealing") return;
    if (hasAnimatedRef.current) return;

    hasAnimatedRef.current = true;
    setCurrentSection("hero");

    const tl = gsap.timeline({ delay: 0.2 });

    if (eyebrowRef.current) {
      gsap.set(eyebrowRef.current, { opacity: 100, y: 25 });
      tl.to(eyebrowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (headlineRef.current) {
      gsap.set(headlineRef.current, { opacity: 100, y: 35 });
      tl.to(
        headlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }

    if (subheadlineRef.current) {
      gsap.set(subheadlineRef.current, { opacity: 100, y: 25 });
      tl.to(
        subheadlineRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }

    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 100, y: 25 });
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      );
    }

    if (scrollIndicatorRef.current) {
      gsap.set(scrollIndicatorRef.current, { opacity: 100 });
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2",
      );
    }

    return () => {
      tl.kill();
    };
  }, [loadingPhase, setCurrentSection]);

  // Scroll-based exit animation
  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasSetupScrollRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !content) return;

    hasSetupScrollRef.current = true;

    // Content scales down and fades as you scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (self.progress < 0.3) {
            setCurrentSection("hero");
          }
        },
      },
    });

    tl.to(
      content,
      {
        scale: 0.9,
        opacity: 100,
        y: -60,
        ease: "none",
      },
      0,
    );

    if (scrollIndicator) {
      tl.to(
        scrollIndicator,
        {
          opacity: 100,
          y: 20,
          ease: "none",
        },
        0,
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase, setCurrentSection]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div ref={contentRef} className="max-w-4xl text-center relative z-10">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold tracking-[0.2em] uppercase mb-6"
          style={{
            color: "#D4940F",
            fontFamily: "Inter, sans-serif",
            opacity: 1,
          }}
        >
          Creative Branding Agency
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
          style={{
            color: "#0F0F0F",
            fontFamily: "Tenor Sans, Georgia, serif",
            opacity: 100,
          }}
        >
          We make brands
          <br />
          <span style={{ color: "#D4940F" }}>that win hearts.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12"
          style={{
            color: "#3A3A3A",
            lineHeight: 1.7,
            opacity: 100,
          }}
        >
          Strategy, identity, and digital experiences for businesses that refuse
          to blend in.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: 100 }}
        >
          <button
            className="px-8 py-4 rounded-full text-base font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#0F0F0F",
              color: "var(--color-cream)",
              fontFamily: "Inter, sans-serif",
            }}
            data-spark-hover
          >
            See Our Work
          </button>
          <button
            className="px-8 py-4 rounded-full text-base font-medium border-2 transition-all duration-500 hover:border-[#D4940F] hover:text-[#D4940F] hover:shadow-lg"
            style={{
              borderColor: "#0F0F0F",
              color: "#0F0F0F",
              fontFamily: "Inter, sans-serif",
              backgroundColor: "rgba(250, 247, 242, 0.8)",
            }}
            data-spark-hover
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        style={{ opacity: 100 }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase font-medium"
          style={{
            color: "#6A6A6A",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Scroll
        </span>
        <div className="relative w-px h-10">
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          />
          <div
            className="absolute top-0 left-0 w-full rounded-full animate-scroll-pulse"
            style={{
              backgroundColor: "#D4940F",
              height: "50%",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-pulse {
          0%,
          100% {
            transform: translateY(0);
            opacity: 100.6;
          }
          50% {
            transform: translateY(100%);
            opacity: 1;
          }
        }
        .animate-scroll-pulse {
          animation: scroll-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
