"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useStore } from "@/stores/useStore";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const loadingPhase = useStore((s) => s.loadingPhase);
  const setCurrentSection = useStore((s) => s.setCurrentSection);

  // Scroll-triggered animations
  useEffect(() => {
    if (loadingPhase !== "complete") return;
    if (hasAnimatedRef.current) return;

    const section = sectionRef.current;
    const header = headerRef.current;
    const list = listRef.current;

    if (!section || !header || !list) return;

    hasAnimatedRef.current = true;

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
          start: "top 70%",
          end: "top 40%",
          scrub: 1,
        },
      },
    );

    // Service cards stagger animation
    const cards = list.querySelectorAll(".service-card-wrapper");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: list,
          start: "top 75%",
          end: "top 45%",
          scrub: 1,
        },
      },
    );

    // Track section
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setCurrentSection("services"),
      onEnterBack: () => setCurrentSection("services"),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section || trigger.vars.trigger === list) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase, setCurrentSection]);

  const handleServiceClick = (serviceId: string) => {
    setActiveServiceId(activeServiceId === serviceId ? null : serviceId);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20" style={{ opacity: 0 }}>
          <p
            className="text-sm font-medium tracking-[0.2em] uppercase mb-4"
            style={{ color: "#D4940F" }}
          >
            What We Do
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6"
            style={{
              color: "#0F0F0F",
              fontFamily: "Tenor Sans, Georgia, serif",
            }}
          >
            Everything your brand
            <br className="hidden md:block" /> needs to shine.
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "#4A4A4A", lineHeight: 1.7 }}
          >
            From strategy to launch, we offer a complete suite of branding
            services tailored to your unique needs.
          </p>
        </div>

        {/* Services List */}
        <div ref={listRef}>
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card-wrapper"
              style={{ opacity: 0 }}
            >
              <ServiceCard
                service={service}
                isActive={activeServiceId === service.id}
                onClick={() => handleServiceClick(service.id)}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-base mb-6" style={{ color: "#6A6A6A" }}>
            Not sure what you need? Let&apos;s figure it out together.
          </p>
          <button
            className="px-8 py-4 rounded-full text-base font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: "#0F0F0F",
              color: "var(--color-cream)",
              fontFamily: "Inter, sans-serif",
            }}
            data-spark-hover
          >
            Schedule a Discovery Call
          </button>
        </div>
      </div>
    </section>
  );
}
