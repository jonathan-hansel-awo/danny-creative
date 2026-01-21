'use client';

import { cn } from '@/lib/utils';
import { useLenis } from '@/hooks/useLenis';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

export default function Footer() {
  const { scrollTo } = useLenis();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        scrollTo(target as HTMLElement, { offset: -80 });
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-bg text-light-text">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Logo & Description */}
          <div className="lg:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(0, { duration: 1.5 });
              }}
              className="inline-block text-3xl font-display mb-4"
            >
              Danny<span className="text-coral">.</span>
            </a>
            <p className="text-light-text/70 max-w-sm leading-relaxed">
              A creative branding agency obsessed with making brands that people
              can&apos;t stop talking about. Bold strategies, stunning visuals,
              unforgettable experiences.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      'text-light-text/70',
                      'transition-colors duration-300',
                      'hover:text-coral'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'text-light-text/70',
                      'transition-colors duration-300',
                      'hover:text-coral'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-text/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-light-text/50">
              © {currentYear} Danny Creative. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className={cn(
                  'text-sm text-light-text/50',
                  'transition-colors duration-300',
                  'hover:text-coral'
                )}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className={cn(
                  'text-sm text-light-text/50',
                  'transition-colors duration-300',
                  'hover:text-coral'
                )}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}