'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useStore } from '@/stores/useStore';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/work/ProjectCard';

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);
  const setActiveProjectIndex = useStore((s) => s.setActiveProjectIndex);
  const setWorkProgress = useStore((s) => s.setWorkProgress);
  const activeProjectIndex = useStore((s) => s.activeProjectIndex);

  useEffect(() => {
    if (loadingPhase !== 'complete') return;
    if (hasInitializedRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const gallery = galleryRef.current;

    if (!section || !header || !gallery) return;

    hasInitializedRef.current = true;

    // Calculate scroll distance
    const getScrollWidth = () => {
      return gallery.scrollWidth - window.innerWidth + 100;
    };

    // Header fade in
    gsap.fromTo(
      header,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );

    // Horizontal scroll
    const scrollTween = gsap.to(gallery, {
      x: () => -getScrollWidth(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        pin: true,
        scrub: 1.5, // Slow, smooth scrub
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Update current section
          if (self.isActive) {
            setCurrentSection('work');
          }

          // Calculate active project
          const progress = self.progress;
          const projectWidth = 1 / projects.length;
          const currentIndex = Math.min(
            Math.floor(progress / projectWidth),
            projects.length - 1
          );

          setActiveProjectIndex(currentIndex);

          // Progress within current project
          const projectProgress = (progress % projectWidth) / projectWidth;
          setWorkProgress(Math.min(projectProgress, 1));
        },
        onLeave: () => {
          // Reset when leaving section
        },
        onEnterBack: () => {
          setCurrentSection('work');
        },
      },
    });

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
      window.removeEventListener('resize', handleResize);
    };
  }, [loadingPhase, setCurrentSection, setActiveProjectIndex, setWorkProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="relative h-screen overflow-hidden">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="absolute top-12 md:top-16 left-6 md:left-12 z-10"
          style={{ opacity: 0 }}
        >
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-2"
            style={{ color: '#D4940F' }}
          >
            Selected Work
          </p>
          <h2
            className="text-2xl md:text-3xl"
            style={{
              color: '#0F0F0F',
              fontFamily: 'Tenor Sans, Georgia, serif',
            }}
          >
            Brands we've brought to life.
          </h2>
        </div>

        {/* Horizontal Gallery */}
        <div
          ref={galleryRef}
          className="absolute top-0 left-0 h-full flex items-center"
          style={{
            paddingLeft: '8vw',
            willChange: 'transform',
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isActive={index === activeProjectIndex}
            />
          ))}

          {/* End CTA */}
          <div className="flex-shrink-0 w-[40vw] h-full flex items-center justify-center">
            <div className="text-center">
              <p
                className="text-sm tracking-[0.2em] uppercase mb-6"
                style={{ color: '#8A8A8A' }}
              >
                Want to see more?
              </p>
              <button
                className="group flex items-center gap-3 mx-auto text-xl font-medium transition-all duration-500"
                style={{ color: '#D4940F' }}
                data-spark-hover
              >
                <span className="group-hover:underline underline-offset-4">
                  View All Projects
                </span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2"
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
  );
}