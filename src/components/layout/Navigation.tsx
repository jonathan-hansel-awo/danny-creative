'use client';

import { useRef, useEffect, useState } from 'react';
import { useStore } from '@/stores/useStore';
import Link from 'next/link';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const loadingPhase = useStore((s) => s.loadingPhase);

  // Track scroll position for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't show until loading is complete
  if (loadingPhase !== 'complete') {
    return null;
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: isScrolled
            ? 'rgba(250, 247, 242, 0.9)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 group"
              data-spark-hover
            >
              <span
                className="text-xl font-normal"
                style={{
                  color: '#0F0F0F',
                  fontFamily: 'Tenor Sans, Georgia, serif',
                }}
              >
                Danny
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: '#D4940F',
                  boxShadow: '0 0 6px rgba(212,148,15,0.5)',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium transition-colors duration-300 hover:text-[#D4940F] group"
                  style={{ color: '#4A4A4A' }}
                  data-spark-hover
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: '#D4940F' }}
                  />
                </a>
              ))}

              <button
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#0F0F0F',
                  color: 'var(--color-cream)',
                }}
                data-spark-hover
              >
                Let&apos;s Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              data-spark-hover
            >
              <span
                className="w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: '#0F0F0F',
                  transform: isMobileMenuOpen
                    ? 'rotate(45deg) translateY(4px)'
                    : 'none',
                }}
              />
              <span
                className="w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: '#0F0F0F',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: '#0F0F0F',
                  transform: isMobileMenuOpen
                    ? 'rotate(-45deg) translateY(-4px)'
                    : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          backgroundColor: 'var(--color-cream)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className="text-3xl transition-all duration-300"
              style={{
                color: '#0F0F0F',
                fontFamily: 'Tenor Sans, Georgia, serif',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              data-spark-hover
            >
              {link.label}
            </a>
          ))}

          <button
            className="mt-4 px-8 py-4 rounded-full text-base font-medium transition-all duration-300"
            style={{
              backgroundColor: '#D4940F',
              color: 'white',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen
                ? 'translateY(0)'
                : 'translateY(20px)',
              transitionDelay: isMobileMenuOpen
                ? `${navLinks.length * 100}ms`
                : '0ms',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
            data-spark-hover
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>
    </>
  );
}