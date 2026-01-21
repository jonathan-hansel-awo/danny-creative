'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import RoomSection from '@/components/effects/RoomSection';
import SectionHeader from '@/components/ui/SectionHeader';
import RevealOnScroll from '@/components/effects/RevealOnScroll';
import ParallaxWrapper from '@/components/effects/ParallaxWrapper';

const stats = [
  { value: '50+', label: 'Brands Transformed' },
  { value: '8', label: 'Years of Craft' },
  { value: '12', label: 'Industry Awards' },
];

export default function About() {
  return (
    <RoomSection
      id="about"
      room="light"
      className="py-32 md:py-40"
    >
      {/* Transition gradient from dark */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0a0a0a, #faf9f6)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Header */}
          <div>
            <SectionHeader
              eyebrow="About Us"
              headline={
                <>
                  Creativity With
                  <br />
                  <span className="text-coral">Purpose</span>
                </>
              }
              align="left"
            />
          </div>

          {/* Right Column - Content */}
          <div className="lg:pt-8">
            <RevealOnScroll animation="fade-up" delay={0.2}>
              <p className="text-body-l font-body leading-relaxed mb-6">
                We believe brands should do more than exist—they should inspire.
                Every project we take on is an opportunity to create something
                that resonates, connects, and endures.
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fade-up" delay={0.3}>
              <p className="text-body-m font-body text-light-text/70 leading-relaxed mb-10">
                Our approach blends strategic thinking with creative excellence.
                We dig deep to understand your vision, your audience, and your
                market—then craft experiences that cut through the noise and
                make people take notice.
              </p>
            </RevealOnScroll>

            <RevealOnScroll animation="fade-up" delay={0.4}>
              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center gap-2',
                  'text-coral font-body font-medium',
                  'group'
                )}
              >
                Learn more about our story
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </RevealOnScroll>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-16 border-t border-light-text/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={0.1 * index}
              />
            ))}
          </div>
        </div>
      </div>
    </RoomSection>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
}

function StatItem({ value, label, delay = 0 }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <RevealOnScroll animation="fade-up" delay={delay}>
      <div ref={ref} className="text-center sm:text-left">
        <ParallaxWrapper speed={0.95}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
            className="text-[3rem] md:text-[4rem] font-display text-coral leading-none mb-2"
          >
            {value}
          </motion.div>
        </ParallaxWrapper>
        <div className="text-body-s font-body text-light-text/60 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </RevealOnScroll>
  );
}