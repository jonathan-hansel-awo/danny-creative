"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

const stats = [
  { value: "50+", label: "Brands Launched" },
  { value: "8", label: "Years of Craft" },
  { value: "100%", label: "Passion" },
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container-md">
        {/* Header */}
        <div data-reveal>
          <SectionHeader
            eyebrow="About Us"
            headline=""
            align="center"
            className="mb-12"
          />
        </div>

        {/* Pull Quote */}
        <blockquote
          className="text-center mb-12"
          data-reveal
          data-reveal-delay="100"
        >
          <p className="font-display text-display-md leading-tight tracking-[-0.01em] text-ink">
            &quot;We believe the best brands don&apos;t just look good —{" "}
            <span className="text-spark">they make people feel something.</span>
            &quot;
          </p>
        </blockquote>

        {/* Body Text */}
        <div
          className="max-w-[640px] mx-auto text-center mb-16"
          data-reveal
          data-reveal-delay="200"
        >
          <p className="text-body-lg text-ink-light mb-6">
            Danny Creative is a branding agency for businesses that want to
            stand out. We work with hotels, retail, automotive, and everything
            in between — any company brave enough to be memorable.
          </p>
          <p className="text-body text-ink-light">
            Based in the heart of creativity, we&apos;ve spent years helping brands
            find their voice and share it with the world. Our approach blends
            strategic thinking with creative excellence, digging deep to
            understand your vision, your audience, and your market.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-[600px] mx-auto stagger-children">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center" data-reveal="scale">
              <div className="font-display text-display-md text-spark mb-2">
                {stat.value}
              </div>
              <div className="font-ui text-caption uppercase tracking-wider text-ink-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
