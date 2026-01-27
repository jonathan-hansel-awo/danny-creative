"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  const quote =
    "We believe the best brands don't just look good — they make people feel something.";

  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasAnimatedRef.current) return;

    const section = sectionRef.current;
    const quoteEl = quoteRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !quoteEl) return;

    hasAnimatedRef.current = true;

    // Split quote into words and wrap each
    const words = quote.split(" ");
    quoteEl.innerHTML = words
      .map(
        (word, i) =>
          `<span class="quote-word" style="opacity: 0.15;">${word}</span>`,
      )
      .join(" ");

    const wordElements = quoteEl.querySelectorAll(".quote-word");

    // Word-by-word reveal on scroll
    const quoteTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "center center",
        scrub: 1,
        onEnter: () => setCurrentSection("about"),
        onEnterBack: () => setCurrentSection("about"),
      },
    });

    wordElements.forEach((word, index) => {
      quoteTl.to(
        word,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        index * 0.05,
      );
    });

    // Content fade in after quote
    if (content) {
      gsap.fromTo(
        content,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );
    }

    // Stats counter animation
    if (stats) {
      const statNumbers = stats.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-value") || "0", 10);

        gsap.fromTo(
          stat,
          { innerText: "0" },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: stats,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      gsap.fromTo(
        stats,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === section ||
          trigger.vars.trigger === content ||
          trigger.vars.trigger === stats
        ) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase, setCurrentSection]);

  return (
    <section
      ref={sectionRef}
        id="about"
      className="relative py-32 md:py-40 lg:py-52"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <p
          className="text-sm font-medium tracking-[0.2em] uppercase mb-8 text-center"
          style={{ color: "#D4940F" }}
        >
          About Us
        </p>

        {/* Main Quote - Word by Word Reveal */}
        <h2
          ref={quoteRef}
          className="text-3xl md:text-4xl lg:text-5xl text-center leading-snug md:leading-snug lg:leading-snug mb-16 md:mb-20"
          style={{
            color: "#0F0F0F",
            fontFamily: "Tenor Sans, Georgia, serif",
            fontStyle: "italic",
          }}
        >
          {quote}
        </h2>

        {/* Content */}
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
          style={{ opacity: 0 }}
        >
          <p
            className="text-lg md:text-xl leading-relaxed mb-6"
            style={{ color: "#4A4A4A" }}
          >
            Danny Creative is a branding agency for businesses that want to
            stand out. We work with hotels, retail, automotive, and everything
            in between — any company brave enough to be memorable.
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{ color: "#4A4A4A" }}
          >
            Based in the heart of the city, we&apos;ve spent over a decade helping
            brands find their voice and share it with the world.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          <div className="text-center">
            <div
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-2"
              style={{
                color: "#D4940F",
                fontFamily: "Tenor Sans, Georgia, serif",
              }}
            >
              <span className="stat-number" data-value="50">
                0
              </span>
              <span>+</span>
            </div>
            <p
              className="text-sm uppercase tracking-wider"
              style={{ color: "#6A6A6A" }}
            >
              Brands Launched
            </p>
          </div>

          <div className="text-center">
            <div
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-2"
              style={{
                color: "#D4940F",
                fontFamily: "Tenor Sans, Georgia, serif",
              }}
            >
              <span className="stat-number" data-value="12">
                0
              </span>
            </div>
            <p
              className="text-sm uppercase tracking-wider"
              style={{ color: "#6A6A6A" }}
            >
              Years Experience
            </p>
          </div>

          <div className="text-center">
            <div
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-2"
              style={{
                color: "#D4940F",
                fontFamily: "Tenor Sans, Georgia, serif",
              }}
            >
              <span className="stat-number" data-value="100">
                0
              </span>
              <span>%</span>
            </div>
            <p
              className="text-sm uppercase tracking-wider"
              style={{ color: "#6A6A6A" }}
            >
              Passion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
