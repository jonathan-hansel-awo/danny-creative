"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkProgress } from "@/components/work/WorkProgress";

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const setCurrentSection = useStore((s) => s.setCurrentSection);
  const setActiveProjectIndex = useStore((s) => s.setActiveProjectIndex);
  const setWorkProgress = useStore((s) => s.setWorkProgress);
  const activeProjectIndex = useStore((s) => s.activeProjectIndex);
  const loadingPhase = useStore((s) => s.loadingPhase);

  useEffect(() => {
    if (loadingPhase !== "complete") return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    const gallery = galleryRef.current;

    if (!section || !container || !header || !gallery) return;

    // Calculate total scroll distance for horizontal scroll
    const getScrollWidth = () => {
      return gallery.scrollWidth - window.innerWidth + window.innerWidth * 0.15;
    };

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(gallery, {
      x: () => -getScrollWidth(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update section
          if (self.isActive) {
            setCurrentSection("work");
          }

          // Calculate which project is active
          const progress = self.progress;
          const projectWidth = 1 / projects.length;
          const currentIndex = Math.min(
            Math.floor(progress / projectWidth),
            projects.length - 1,
          );

          setActiveProjectIndex(currentIndex);

          // Progress within current project (0-1)
          const projectProgress = (progress % projectWidth) / projectWidth;
          setWorkProgress(projectProgress);
        },
      },
    });

    // Header animation (fade in when section enters)
    gsap.fromTo(
      header,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      },
    );

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
      window.removeEventListener("resize", handleResize);
    };
  }, [loadingPhase, setCurrentSection, setActiveProjectIndex, setWorkProgress]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[var(--color-cream)]"
        style={{ minHeight: "100vh" }}
      >
        <div ref={containerRef} className="relative h-screen overflow-hidden">
          {/* Section Header */}
          <div
            ref={headerRef}
            className="absolute top-12 md:top-16 left-6 md:left-12 z-10"
          >
            <p
              className="text-sm tracking-[0.2em] uppercase mb-2"
              style={{
                color: "var(--color-spark)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Selected Work
            </p>
            <h2
              className="text-2xl md:text-3xl"
              style={{
                color: "var(--color-ink)",
                fontFamily: "Tenor Sans, Georgia, serif",
              }}
            >
              Brands we&apos;ve brought to life.
            </h2>
          </div>

          {/* Horizontal Gallery */}
          <div
            ref={galleryRef}
            className="absolute top-0 mt-12 left-0 h-full flex items-center pl-[10vw]"
            style={{ willChange: "transform" }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeProjectIndex}
                progress={
                  index === activeProjectIndex
                    ? useStore.getState().workProgress
                    : 0
                }
              />
            ))}

            {/* End spacer */}
            <div className="flex-shrink-0 w-[30vw] h-full flex items-center justify-center">
              <div className="text-center">
                <p
                  className="text-sm tracking-[0.2em] uppercase mb-4"
                  style={{
                    color: "var(--color-ink-muted)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Want to see more?
                </p>
                <button
                  className="group flex items-center gap-3 mx-auto text-lg font-medium"
                  style={{
                    color: "var(--color-spark)",
                    fontFamily: "Inter, sans-serif",
                  }}
                  data-spark-hover
                >
                  <span>View All Projects</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress indicator - only visible during work section */}
      <WorkProgress />
    </>
  );
}
