"use client";

import { useEffect, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="container-lg text-center py-32">
        {/* Eyebrow */}
        <p
          className={`font-ui text-[0.8125rem] font-medium tracking-[0.1em] uppercase text-spark mb-6 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          Creative Branding Agency
        </p>

        {/* Headline */}
        <h1 className="font-display text-display-xl leading-[1] tracking-[-0.02em] mb-8">
          <span className="block overflow-hidden">
            <span
              className={`block transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
              style={{ transitionDelay: "550ms" }}
            >
              <span className="text-ink">We make brands</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className={`block transition-all duration-700 ease-out ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-full"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              <span className="text-spark">people remember.</span>
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className={`font-display text-body-lg text-ink-light max-w-[560px] mx-auto mb-12 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          Strategy, identity, and digital experiences for businesses that refuse
          to blend in.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <ButtonLink href="#work" variant="primary">
            See Our Work
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Let&apos;s Talk
          </ButtonLink>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "1600ms" }}
        >
          <span className="font-ui text-[0.75rem] tracking-wider uppercase text-ink-muted">
            Scroll
          </span>
          <div className="w-px h-8 bg-ink-muted/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-spark animate-scroll-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
