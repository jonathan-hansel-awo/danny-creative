/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, createElement } from "react";
import { JSX } from "react/jsx-runtime";

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * useScrollReveal - Initialize scroll-triggered reveal animations
 * 
 * Watches for elements with `data-reveal` attribute and adds
 * `revealed` class when they enter the viewport.
 * 
 * Usage:
 * 1. Call this hook once in a parent component (ClientWrapper)
 * 2. Add `data-reveal` to any element you want to animate
 * 3. Optionally add `data-reveal-delay="200"` for staggered delays
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -50px 0px", once = true } = options;
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in StrictMode
    if (initialized.current) return;
    initialized.current = true;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Show all elements immediately
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            
            // Get optional delay from data attribute
            const delay = el.dataset.revealDelay;
            
            if (delay) {
              setTimeout(() => {
                el.classList.add("revealed");
              }, parseInt(delay, 10));
            } else {
              el.classList.add("revealed");
            }

            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe all reveal elements
    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    // Re-observe when new elements are added (for dynamic content)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.hasAttribute("data-reveal")) {
              observer.observe(node);
            }
            node.querySelectorAll("[data-reveal]").forEach((el) => {
              observer.observe(el);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, once]);
}

/**
 * Reveal component wrapper for cleaner JSX
 */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay,
  className = "",
  as: Component = "div",
}: RevealProps) {
  return createElement(
    Component as any,
    {
      "data-reveal": true,
      "data-reveal-delay": delay,
      className: `reveal-base ${className}`,
    },
    children
  );
}