export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const footerNavLinks: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Careers", href: "/careers" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://instagram.com/dannycreative",
    icon: "instagram",
  },
  {
    label: "Twitter",
    href: "https://twitter.com/dannycreative",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/dannycreative",
    icon: "linkedin",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/dannycreative",
    icon: "dribbble",
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];
