"use client";

import { Button, ButtonLink } from "@/components/ui/Button";

export function Contact() {
  return (
    <section id="contact" className="section-padding">
      <div className="container-md text-center">
        {/* Headline */}
        <h2 className="font-display text-display-lg leading-tight tracking-[-0.02em] text-ink mb-6">
          Ready to make something{" "}
          <span className="text-spark">amazing?</span>
        </h2>

        {/* Subheadline */}
        <p className="font-display text-body-lg text-ink-light mb-12 max-w-[480px] mx-auto">
          Let&apos;s talk about your brand.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6">
          <ButtonLink
            href="mailto:hello@dannycreative.com"
            variant="primary"
            size="lg"
          >
            Start a Conversation
          </ButtonLink>

          <p className="text-body-sm text-ink-muted">
            Or email us directly at{" "}
            <a
              href="mailto:hello@dannycreative.com"
              className="text-ink hover:text-spark transition-colors duration-300 underline-offset-4 hover:underline"
            >
              hello@dannycreative.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}