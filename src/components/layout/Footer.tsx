import Link from "next/link";

const footerLinks = {
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-ink/10">
      {/* Main Footer */}
      <div className="container-xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-[1.75rem] text-ink inline-flex items-center mb-4"
            >
              Danny
              <span
                className="inline-block w-2 h-2 rounded-full bg-spark ml-0.5 mb-1"
                style={{ boxShadow: "0 0 4px rgba(232, 165, 75, 0.6)" }}
              />
            </Link>
            <p className="text-body-sm text-ink-light max-w-[280px]">
              The creative spark behind bold brands. Strategy, identity, and
              digital experiences that make people take notice.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-ui text-sm font-medium text-ink mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-ink-light hover:text-spark transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-ui text-sm font-medium text-ink mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-sm text-ink-light hover:text-spark transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui text-sm font-medium text-ink mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@dannycreative.com"
                  className="text-body-sm text-ink-light hover:text-spark transition-colors duration-300"
                >
                  hello@dannycreative.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-body-sm text-ink-light hover:text-spark transition-colors duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ink/10">
        <div className="container-xl py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption text-ink-muted">
            © {new Date().getFullYear()} Danny Creative. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-caption text-ink-muted hover:text-spark transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-caption text-ink-muted hover:text-spark transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}