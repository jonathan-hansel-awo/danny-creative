"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import ParallaxWrapper from "@/components/effects/ParallaxWrapper";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="hero"
      className={cn(
        "relative min-h-screen w-full",
        "flex items-center justify-center",
        "bg-dark-bg text-dark-text",
        "overflow-hidden",
      )}
    >
      {/* Background gradient for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(224, 122, 95, 0.03) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants}>
          <span
            className={cn(
              "inline-block",
              "text-label font-body font-medium uppercase tracking-[0.2em]",
              "text-dark-text/60",
              "mb-6",
            )}
          >
            Creative Branding Agency
          </span>
        </motion.div>

        {/* Headline */}
        <ParallaxWrapper speed={0.95}>
          <motion.h1
            variants={itemVariants}
            className={cn(
              "font-display",
              "text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-display-xl",
              "leading-[1.1]",
              "mb-8",
            )}
          >
            <span className="block">We Create Brands</span>
            <span className="block text-coral">That Win Hearts</span>
          </motion.h1>
        </ParallaxWrapper>

        {/* Subhead */}
        <ParallaxWrapper speed={0.9}>
          <motion.p
            variants={itemVariants}
            className={cn(
              "text-body-l font-body",
              "text-dark-text/70",
              "max-w-2xl mx-auto",
              "mb-12",
            )}
          >
            Bold strategies. Stunning visuals. Experiences that leave a lasting
            impression. We transform visions into movements.
          </motion.p>
        </ParallaxWrapper>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" href="#work" magnetic>
            Explore Our Work
          </Button>
          <Button variant="secondary" size="lg" href="#contact">
            Get in Touch
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
        }}
      />
    </section>
  );
}
