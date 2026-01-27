"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";
import { team } from "@/data/team";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInnerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasInitializedRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const gallery = galleryRef.current;
    const galleryInner = galleryInnerRef.current;

    if (!section || !header || !gallery || !galleryInner) return;

    hasInitializedRef.current = true;

    // Calculate scroll distance
    const getScrollWidth = () => {
      return galleryInner.scrollWidth - window.innerWidth + 100;
    };

    // Header animation
    gsap.fromTo(
      header,
      { opacity: 0, y: 50 },
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

    // Horizontal scroll - RIGHT TO LEFT (reversed)
    // Gallery starts positioned to the right and moves left as you scroll
    const scrollWidth = getScrollWidth();

    // Set initial position to the right
    gsap.set(galleryInner, { x: -scrollWidth });

    const scrollTween = gsap.to(galleryInner, {
      x: 0, // Move to 0 (left to right appearance)
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.isActive) {
            setCurrentSection("team");
          }

          // Calculate active index (reversed)
          const progress = 1 - self.progress; // Reverse progress
          const memberWidth = 1 / team.length;
          const currentIndex = Math.min(
            Math.floor(progress / memberWidth),
            team.length - 1,
          );

          setActiveIndex(currentIndex);
        },
        onEnterBack: () => {
          setCurrentSection("team");
        },
      },
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [loadingPhase, setCurrentSection]);

  return (
    <section
      ref={sectionRef}
      id="team"
      className="relative"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <div className="relative h-screen overflow-hidden">
        {/* Section Header - Fixed position */}
        <div
          ref={headerRef}
          className="absolute top-12 md:top-16 right-6 md:right-12 z-10 text-right"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: "#D4940F" }}
          >
            The People
          </p>
          <h2
            className="text-2xl md:text-3xl"
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
          className="absolute bottom-8 right-6 md:right-12 z-10 flex items-baseline gap-1"
          style={{
            fontFamily: "Inter, sans-serif",
          }}
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

        {/* Horizontal Gallery - Starts from right */}
        <div
          ref={galleryRef}
          className="absolute top-0 right-0 h-full w-full overflow-hidden"
        >
          <div
            ref={galleryInnerRef}
            className="h-full flex items-center"
            style={{
              paddingRight: "8vw",
              willChange: "transform",
            }}
          >
            {/* Intro Card */}
            <div className="flex-shrink-0 w-[50vw] h-full flex items-center justify-center">
              <div className="max-w-md text-center px-6">
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
                  className="text-3xl md:text-4xl mb-4"
                  style={{
                    color: "#0F0F0F",
                    fontFamily: "Tenor Sans, Georgia, serif",
                  }}
                >
                  The creative minds behind the magic
                </h3>
                <p className="text-base" style={{ color: "#6A6A6A" }}>
                  A small team with big ideas. We&apos;re passionate, dedicated, and
                  obsessed with creating brands that matter.
                </p>
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

            {/* End CTA */}
            <div className="flex-shrink-0 w-[40vw] h-full flex items-center justify-center">
              <div className="text-center px-6">
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
                    View Careers
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating shapes */}
          <div
            className="absolute w-64 h-64 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(212,148,15,0.3) 0%, transparent 70%)",
              top: "10%",
              left: "5%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-48 h-48 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(212,148,15,0.2) 0%, transparent 70%)",
              bottom: "15%",
              right: "10%",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
        </div>
      </div>

      {/* Add keyframes for floating animation */}
      <style jsx>{`
        @keyframes float {
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
