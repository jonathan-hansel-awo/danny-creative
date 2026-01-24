/* eslint-disable prefer-const */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [animationStarted, setAnimationStarted] = useState(false);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setHeroAnimationComplete = useStore((s) => s.setHeroAnimationComplete);

  useEffect(() => {
    if (loadingPhase !== "content-revealing" || animationStarted) return;

    setAnimationStarted(true);

    // Set initial states
    const elements = [
      eyebrowRef.current,
      headlineRef.current,
      subheadlineRef.current,
      ctaRef.current,
      scrollIndicatorRef.current,
    ].filter(Boolean);

    gsap.set(elements, { opacity: 0, y: 40 });

    // Get headline words
    const headline = headlineRef.current;
    if (headline) {
      const text = headline.innerHTML;
      const words = text
        .split(/(<br\s*\/?>|\s+)/)
        .filter((word) => word.trim() && !word.match(/<br\s*\/?>/));

      // Wrap each word in a span
      let wordIndex = 0;
      headline.innerHTML = text.replace(/(\S+)/g, (match) => {
        if (match.match(/<[^>]+>/)) return match; // Skip HTML tags
        return `<span class="hero-word" style="display: inline-block; opacity: 0; transform: translateY(40px);">${match}</span>`;
      });
    }

    // Create timeline
    const tl = gsap.timeline({
      delay: 0.3, // Small delay after loader starts fading
      onComplete: () => setHeroAnimationComplete(true),
    });

    // Eyebrow
    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Headline words - staggered
    const words = headline?.querySelectorAll(".hero-word");
    if (words) {
      tl.to(
        words,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.4",
      );
    }

    // Subheadline
    tl.to(
      subheadlineRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.5",
    );

    // CTAs
    tl.to(
      ctaRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    );

    // Scroll indicator (delayed)
    tl.to(
      scrollIndicatorRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.2",
    );

    return () => {
      tl.kill();
    };
  }, [loadingPhase, animationStarted, setHeroAnimationComplete]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-4xl text-center">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-sm font-medium tracking-[0.2em] uppercase mb-6 opacity-0"
          style={{
            color: "var(--color-spark)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Creative Branding Agency
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 opacity-0"
          style={{
            color: "var(--color-ink)",
            fontFamily: "Tenor Sans, Georgia, serif",
          }}
        >
          We make brands
          <br />
          <span style={{ color: "var(--color-spark)" }}>people remember.</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-0"
          style={{
            color: "var(--color-ink-light)",
            lineHeight: 1.7,
          }}
        >
          Strategy, identity, and digital experiences for businesses that refuse
          to blend in.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
        >
          <button
            className="group relative px-8 py-4 rounded-full text-base font-medium overflow-hidden transition-all duration-700"
            style={{
              backgroundColor: "var(--color-ink)",
              color: "var(--color-cream)",
              fontFamily: "Inter, sans-serif",
            }}
            data-spark-hover
          >
            <span className="relative z-10">See Our Work</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ backgroundColor: "var(--color-spark)" }}
            />
          </button>
          <button
            className="px-8 py-4 rounded-full text-base font-medium border-2 transition-all duration-700"
            style={{
              borderColor: "var(--color-ink)",
              color: "var(--color-ink)",
              fontFamily: "Inter, sans-serif",
              backgroundColor: "transparent",
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{
            color: "var(--color-ink-muted)",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </div>

      <style jsx>{`
        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(
            to bottom,
            var(--color-spark) 0%,
            var(--color-spark) 50%,
            transparent 50%,
            transparent 100%
          );
          background-size: 1px 16px;
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }
      `}</style>
    </section>
  );
}
