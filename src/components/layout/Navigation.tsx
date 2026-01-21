'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRoom } from '@/context/RoomContext';
import { useLenis } from '@/hooks/useLenis';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { room } = useRoom();
  const { scrollTo } = useLenis();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      scrollTo(target as HTMLElement, { offset: -80 });
    }
    setIsMobileMenuOpen(false);
  };

  const bgColor = isScrolled
    ? room === 'dark'
      ? 'bg-dark-bg/90 backdrop-blur-lg'
      : 'bg-light-bg/90 backdrop-blur-lg'
    : 'bg-transparent';

  const textColor = room === 'dark' ? 'text-dark-text' : 'text-light-text';
  const logoAccent = 'text-coral';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[var(--z-sticky)]',
          'transition-all duration-500',
          bgColor,
          isScrolled ? 'py-4' : 'py-6'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0, { duration: 1.5 });
            }}
            className={cn(
              'text-2xl font-display font-normal tracking-tight',
              'transition-colors duration-300',
              textColor
            )}
          >
            Danny<span className={logoAccent}>.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => handleNavClick(link.href)}
                textColor={textColor}
              />
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick('#contact')}
              magnetic
            >
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn('md:hidden relative w-10 h-10 flex items-center justify-center', textColor)}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            links={navLinks}
            onLinkClick={handleNavClick}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Nav Link Component
interface NavLinkProps {
  href: string;
  label: string;
  onClick: () => void;
  textColor: string;
}

function NavLink({ href, label, onClick, textColor }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        'relative text-sm font-body font-medium tracking-wide',
        'transition-colors duration-300',
        textColor,
        'opacity-80 hover:opacity-100',
        'group'
      )}
    >
      {label}
      <span
        className={cn(
          'absolute -bottom-1 left-0 w-0 h-px',
          'bg-coral',
          'transition-all duration-300 ease-out-quad',
          'group-hover:w-full'
        )}
      />
    </a>
  );
}

// Hamburger Icon Component
interface HamburgerIconProps {
  isOpen: boolean;
}

function HamburgerIcon({ isOpen }: HamburgerIconProps) {
  return (
    <div className="relative w-6 h-4">
      <span
        className={cn(
          'absolute left-0 w-6 h-0.5 bg-current',
          'transition-all duration-300 ease-out-quad',
          isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-current',
          'transition-all duration-300 ease-out-quad',
          isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
        )}
      />
      <span
        className={cn(
          'absolute left-0 w-6 h-0.5 bg-current',
          'transition-all duration-300 ease-out-quad',
          isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
        )}
      />
    </div>
  );
}