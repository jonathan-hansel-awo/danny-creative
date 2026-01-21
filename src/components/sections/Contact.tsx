'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import RoomSection from '@/components/effects/RoomSection';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import RevealOnScroll from '@/components/effects/RevealOnScroll';

export default function Contact() {
  return (
    <RoomSection
      id="contact"
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

      {/* Decorative glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(224, 122, 95, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <SectionHeader
          eyebrow="Let's Create"
          headline={
            <>
              Ready to Build
              <br />
              <span className="text-coral">Something Amazing?</span>
            </>
          }
          subhead="Whether you're launching a startup or reimagining an established brand, we're here to make it unforgettable. Let's start a conversation."
          align="center"
        />

        {/* CTA */}
        <RevealOnScroll animation="scale" delay={0.3}>
          <div className="mt-12">
            <Button
              variant="primary"
              size="lg"
              href="mailto:hello@dannycreative.com"
              magnetic
              className="shadow-glow-coral-md hover:shadow-glow-coral-lg"
            >
              Start a Conversation
            </Button>
          </div>
        </RevealOnScroll>

        {/* Alternative contact options */}
        <RevealOnScroll animation="fade-up" delay={0.4}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="mailto:hello@dannycreative.com"
              className={cn(
                'text-body-m font-body text-light-text/70',
                'hover:text-coral transition-colors duration-300'
              )}
            >
              hello@dannycreative.com
            </a>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-light-text/30" />
            <a
              href="#"
              className={cn(
                'text-body-m font-body text-light-text/70',
                'hover:text-coral transition-colors duration-300'
              )}
            >
              Schedule a Call
            </a>
          </div>
        </RevealOnScroll>

        {/* Optional: Contact Form */}
        <RevealOnScroll animation="fade-up" delay={0.5}>
          <div className="mt-20 pt-16 border-t border-light-text/10">
            <ContactForm />
          </div>
        </RevealOnScroll>
      </div>
    </RoomSection>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after delay
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="grid gap-6">
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className={cn(
              'w-full px-0 py-4',
              'bg-transparent',
              'border-0 border-b border-light-text/20',
              'text-light-text placeholder:text-light-text/40',
              'font-body text-body-m',
              'focus:outline-none focus:border-coral',
              'transition-colors duration-300'
            )}
          />
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            placeholder="Your email"
            className={cn(
              'w-full px-0 py-4',
              'bg-transparent',
              'border-0 border-b border-light-text/20',
              'text-light-text placeholder:text-light-text/40',
              'font-body text-body-m',
              'focus:outline-none focus:border-coral',
              'transition-colors duration-300'
            )}
          />
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            name="message"
            value={formState.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your project"
            rows={4}
            className={cn(
              'w-full px-0 py-4',
              'bg-transparent',
              'border-0 border-b border-light-text/20',
              'text-light-text placeholder:text-light-text/40',
              'font-body text-body-m',
              'focus:outline-none focus:border-coral',
              'transition-colors duration-300',
              'resize-none'
            )}
          />
        </div>

        {/* Submit */}
        <div className="mt-4">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </div>

        {/* Success message */}
        {isSubmitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-coral text-body-m"
          >
            Thank you! We&apos;ll be in touch soon.
          </motion.p>
        )}
      </div>
    </form>
  );
}