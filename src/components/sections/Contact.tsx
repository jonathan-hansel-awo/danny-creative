'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useStore } from '@/stores/useStore';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (loadingPhase !== 'complete') return;
    if (hasAnimatedRef.current) return;

    const section = sectionRef.current;
    const content = contentRef.current;
    const spark = sparkRef.current;

    if (!section || !content) return;

    hasAnimatedRef.current = true;

    // Content animation
    const contentElements = content.querySelectorAll('.animate-in');
    gsap.fromTo(
      contentElements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    // Spark finale animation
    if (spark) {
      gsap.fromTo(
        spark,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: section,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Continuous pulse animation
      gsap.to(spark, {
        scale: 1.1,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1,
      });
    }

    // Section tracking
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => setCurrentSection('contact'),
      onEnterBack: () => setCurrentSection('contact'),
    });

    return () => {
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
      id="contact"
      className="relative py-32 md:py-40 lg:py-52 overflow-hidden"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orb */}
        <div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(212,148,15,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(212,148,15,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div ref={contentRef}>
          {/* The Spark Finale */}
          <div
            ref={sparkRef}
            className="mx-auto mb-12 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle, #F5D49B 0%, #D4940F 50%, #B8820D 100%)",
              boxShadow:
                "0 0 60px rgba(212,148,15,0.5), 0 0 120px rgba(212,148,15,0.3)",
              opacity: 0,
              transform: "scale(0)",
            }}
          >
            {/* Inner glow */}
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              style={{
                background: "radial-gradient(circle, #FFF9F0 0%, #F5D49B 100%)",
              }}
            />
          </div>

          {/* Eyebrow */}
          <p
            className="animate-in text-sm font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: "#D4940F", opacity: 0 }}
          >
            Let&apos;s Connect
          </p>

          {/* Headline */}
          <h2
            className="animate-in text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{
              color: "#0F0F0F",
              fontFamily: "Tenor Sans, Georgia, serif",
              opacity: 0,
            }}
          >
            Ready to create something
            <br className="hidden md:block" /> amazing?
          </h2>

          {/* Subheadline */}
          <p
            className="animate-in text-lg md:text-xl mb-12 max-w-xl mx-auto"
            style={{ color: "#4A4A4A", lineHeight: 1.7, opacity: 0 }}
          >
            Every great brand starts with a conversation. Tell us about your
            vision, and let&apos;s bring it to life together.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-in flex flex-col sm:flex-row gap-4 justify-center mb-16"
            style={{ opacity: 0 }}
          >
            <button
              className="group relative px-10 py-5 rounded-full text-lg font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: "#D4940F",
                color: "white",
                fontFamily: "Inter, sans-serif",
              }}
              data-spark-hover
            >
              <span className="relative z-10">Start a Conversation</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #E8A54B 0%, #D4940F 100%)",
                }}
              />
            </button>

            <button
              className="px-10 py-5 rounded-full text-lg font-medium border-2 transition-all duration-500 hover:border-[#D4940F] hover:text-[#D4940F]"
              style={{
                borderColor: "#0F0F0F",
                color: "#0F0F0F",
                fontFamily: "Inter, sans-serif",
                backgroundColor: "transparent",
              }}
              data-spark-hover
            >
              View Our Work
            </button>
          </div>

          {/* Alternative contact */}
          <div className="animate-in" style={{ opacity: 0 }}>
            <p className="text-sm mb-3" style={{ color: "#8A8A8A" }}>
              Prefer email?
            </p>
            <a
              href="mailto:hello@dannycreative.com"
              className="text-lg font-medium transition-colors duration-300 hover:text-[#D4940F]"
              style={{ color: "#0F0F0F" }}
              data-spark-hover
            >
              hello@dannycreative.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}