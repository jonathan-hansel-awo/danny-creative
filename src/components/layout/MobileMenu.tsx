"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-mobile-menu transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`absolute inset-0 bg-cream flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[1.75rem] text-ink flex items-center"
            onClick={onClose}
          >
            Danny
            <span
              className="inline-block w-2 h-2 rounded-full bg-spark ml-0.5 mb-1"
              style={{ boxShadow: "0 0 4px rgba(232, 165, 75, 0.6)" }}
            />
          </Link>

          {/* Close Button */}
          <button
            className="w-10 h-10 flex items-center justify-center"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-ink"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-[2rem] text-ink hover:text-spark transition-colors duration-300 ${
                isOpen ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: `${index * 100 + 100}ms` }}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}

          <div
            className={`mt-4 ${isOpen ? "animate-fade-up" : ""}`}
            style={{ animationDelay: `${links.length * 100 + 200}ms` }}
          >
            <Button size="lg" onClick={onClose}>
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
