'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useStore } from '@/stores/useStore';

const footerLinks = {
  navigation: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const loadingPhase = useStore((s) => s.loadingPhase);

  useEffect(() => {
    if (loadingPhase !== 'complete') return;
    if (hasAnimatedRef.current) return;

    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    hasAnimatedRef.current = true;

    // Animate footer content
    const columns = content.querySelectorAll('.footer-column');
    gsap.fromTo(
      columns,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === footer) {
          trigger.kill();
        }
      });
    };
  }, [loadingPhase]);

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-8"
      style={{
        backgroundColor: 'var(--color-cream-dark)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
        >
          {/* Brand Column */}
          <div className="footer-column lg:col-span-1" style={{ opacity: 0 }}>
            {/* Logo */}
            <div className="flex items-center gap-1 mb-4">
              <span
                className="text-2xl"
                style={{
                  color: '#0F0F0F',
                  fontFamily: 'Tenor Sans, Georgia, serif',
                }}
              >
                Danny
              </span>
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: '#D4940F',
                  boxShadow: '0 0 8px rgba(212,148,15,0.5)',
                }}
              />
            </div>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: '#6A6A6A' }}
            >
              The creative spark behind bold brands. We help businesses stand out 
              and connect with their audience.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {footerLinks.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: 'transparent',
                  }}
                  data-spark-hover
                  aria-label={link.label}
                >
                  <SocialIcon name={link.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-column" style={{ opacity: 0 }}>
            <h4
              className="text-sm font-medium tracking-wider uppercase mb-4"
              style={{ color: '#0F0F0F' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-base transition-colors duration-300 hover:text-[#D4940F]"
                    style={{ color: '#4A4A4A' }}
                    data-spark-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="footer-column" style={{ opacity: 0 }}>
            <h4
              className="text-sm font-medium tracking-wider uppercase mb-4"
              style={{ color: '#0F0F0F' }}
            >
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base transition-colors duration-300 hover:text-[#D4940F]"
                    style={{ color: '#4A4A4A' }}
                    data-spark-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-column" style={{ opacity: 0 }}>
            <h4
              className="text-sm font-medium tracking-wider uppercase mb-4"
              style={{ color: '#0F0F0F' }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@dannycreative.com"
                  className="text-base transition-colors duration-300 hover:text-[#D4940F]"
                  style={{ color: '#4A4A4A' }}
                  data-spark-hover
                >
                  hello@dannycreative.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-base transition-colors duration-300 hover:text-[#D4940F]"
                  style={{ color: '#4A4A4A' }}
                  data-spark-hover
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <address
                  className="text-base not-italic"
                  style={{ color: '#4A4A4A' }}
                >
                  123 Creative Street<br />
                  Design District<br />
                  New York, NY 10001
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <p className="text-sm" style={{ color: '#8A8A8A' }}>
            © {currentYear} Danny Creative. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-300 hover:text-[#D4940F]"
                style={{ color: '#8A8A8A' }}
                data-spark-hover
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg z-40"
          style={{
            backgroundColor: 'var(--color-warm-white)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}
          data-spark-hover
          aria-label="Back to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A4A4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      </div>
    </footer>
  );
}

// Social icon component
function SocialIcon({ name }: { name: string }) {
  const iconColor = '#4A4A4A';
  const size = 18;

  switch (name) {
    case 'Instagram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'Twitter':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      );
    case 'Dribbble':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
        </svg>
      );
    default:
      return null;
  }
}