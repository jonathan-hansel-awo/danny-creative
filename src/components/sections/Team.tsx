"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";
import { team } from "@/data/team";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInnerRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);
  const hasInitializedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  // Calculate the scroll width dynamically
  const getScrollWidth = useCallback(() => {
    if (!galleryInnerRef.current) return 0;
    const contentWidth = galleryInnerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    return Math.max(0, contentWidth - viewportWidth);
  }, []);

  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasInitializedRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const gallery = galleryRef.current;
    const galleryInner = galleryInnerRef.current;

    if (!section || !header || !gallery || !galleryInner) return;

    hasInitializedRef.current = true;

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
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      },
    );

    // Calculate initial scroll width
    const scrollWidth = getScrollWidth();

    // Horizontal scroll animation
    // We scroll from x: -scrollWidth (content off to the right) to x: 0 (content at normal position)
    // This creates a right-to-left reveal as you scroll down
    scrollTweenRef.current = gsap.fromTo(
      galleryInner,
      { x: -scrollWidth },
      {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.isActive) {
              setCurrentSection("team");
            }

            // Progress: 0 = start (content on right), 1 = end (content scrolled to normal)
            const progress = self.progress;

            // For right-to-left scroll, we invert the progress for index calculation
            const invertedProgress = 1 - progress;

            // Estimate widths for index calculation
            const introWidth = 560;
            const memberCardWidth = 860;
            const totalScrollWidth = getScrollWidth();

            // Calculate position based on inverted progress
            const currentPosition = invertedProgress * totalScrollWidth;

            if (currentPosition < introWidth) {
              setActiveIndex(0);
            } else {
              const positionInMembers = currentPosition - introWidth;
              const memberIndex = Math.floor(
                positionInMembers / memberCardWidth,
              );
              setActiveIndex(
                Math.min(Math.max(0, memberIndex), team.length - 1),
              );
            }
          },
          onEnter: () => setCurrentSection("team"),
          onEnterBack: () => setCurrentSection("team"),
          onRefreshInit: (self) => {
            // Reset position before refresh calculations
            gsap.set(galleryInner, {
              x: -getScrollWidth() * (1 - self.progress),
            });
          },
        },
      },
    );

    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);

      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
      }

      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase, setCurrentSection, getScrollWidth]);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <div className="relative h-screen overflow-hidden">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="absolute top-12 right-12 z-10 text-right"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: "#D4940F" }}
          >
            The People
          </p>
          <h2
            className="text-3xl"
            style={{
              color: "#0F0F0F",
              fontFamily: "Tenor Sans, Georgia, serif",
            }}
          >
            Meet the Team
          </h2>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="transition-all duration-500"
              style={{
                width: index === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor:
                  index === activeIndex ? "#D4940F" : "rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-8 right-12 z-10 flex items-baseline gap-1"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span
            className="text-3xl font-light tabular-nums"
            style={{ color: "#D4940F" }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-lg" style={{ color: "#8A8A8A" }}>
            /
          </span>
          <span className="text-lg tabular-nums" style={{ color: "#8A8A8A" }}>
            {String(team.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal Gallery */}
        <div
          ref={galleryRef}
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
        >
          <div
            ref={galleryInnerRef}
            className="h-full flex items-center"
            style={{
              willChange: "transform",
              paddingLeft: "5vw",
              paddingRight: "5vw",
            }}
          >

            {/* End CTA */}
            <div
              className="flex-shrink-0 h-full flex items-center justify-center"
              style={{ padding: "0 80px" }}
            >
              <div style={{ width: "350px" }} className="text-center">
                <p
                  className="text-sm tracking-[0.2em] uppercase mb-6"
                  style={{ color: "#8A8A8A" }}
                >
                  Want to join the team?
                </p>
                <button
                  className="group flex items-center gap-3 mx-auto text-xl font-medium transition-all duration-500"
                  style={{ color: "#D4940F" }}
                  data-spark-hover
                >
                  <svg
                    className="w-6 h-6 transition-transform duration-500 group-hover:-translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <span className="group-hover:underline underline-offset-4">
                    Vacancies Opening Soon
                  </span>
                </button>
              </div>
            </div>

            {/* Team Member Cards */}
            {team.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                index={index}
                isActive={index === activeIndex}
                totalMembers={team.length}
              />
            ))}
            {/* Intro Card */}
            <div
              className="flex-shrink-0 h-full flex items-center justify-center"
              style={{ padding: "0 80px" }}
            >
              <div style={{ width: "400px" }} className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4940F 0%, #F5D49B 100%)",
                    boxShadow: "0 0 40px rgba(212,148,15,0.3)",
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3
                  className="text-4xl mb-4"
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "Tenor Sans, Georgia, serif",
                  }}
                >
                  The creative minds behind the magic
                </h3>
                <p className="text-base" style={{ color: "#6A6A6A" }}>
                  A small team with big ideas. Passionate, dedicated, and
                  obsessed with creating brands that matter.
                </p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(212,148,15,0.3) 0%, transparent 70%)",
              top: "10%",
              left: "5%",
              animation: "teamFloat 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-48 h-48 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(212,148,15,0.2) 0%, transparent 70%)",
              bottom: "15%",
              right: "10%",
              animation: "teamFloat 10s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes teamFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
