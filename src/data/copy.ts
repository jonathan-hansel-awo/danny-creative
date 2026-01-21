export const siteCopy = {
  // Meta
  meta: {
    title: "Danny Creative | Creative Branding Agency",
    description:
      "We create brands that move people. Bold strategies, stunning visuals, and experiences that leave a lasting impression.",
    keywords: [
      "branding agency",
      "creative agency",
      "brand strategy",
      "visual identity",
      "digital experience",
      "motion design",
    ],
  },

  // Hero
  hero: {
    eyebrow: "Creative Branding Agency",
    headline: ["We Create Brands", "That Move People"],
    subhead:
      "Bold strategies. Stunning visuals. Experiences that leave a lasting impression. We transform visions into movements.",
    cta: {
      primary: "Explore Our Work",
      secondary: "Get in Touch",
    },
  },

  // About
  about: {
    eyebrow: "About Us",
    headline: ["Creativity With", "Purpose"],
    lead: "We believe brands should do more than exist—they should inspire. Every project we take on is an opportunity to create something that resonates, connects, and endures.",
    body: "Our approach blends strategic thinking with creative excellence. We dig deep to understand your vision, your audience, and your market—then craft experiences that cut through the noise and make people take notice.",
    link: "Learn more about our story",
  },

  // Work
  work: {
    eyebrow: "Selected Work",
    headline: ["Projects That", "Speak Volumes"],
    subhead:
      "A glimpse into the brands we've helped transform. Each project is a story of collaboration, creativity, and impact.",
    cta: "View All Projects",
  },

  // Services
  services: {
    eyebrow: "Services",
    headline: ["What We", "Do"],
    subhead:
      "End-to-end creative services designed to elevate your brand at every stage of its journey.",
  },

  // Testimonials
  testimonials: {
    eyebrow: "Testimonials",
    headline: ["Words From Those", "We've Helped"],
  },

  // Contact
  contact: {
    eyebrow: "Let's Create",
    headline: ["Ready to Build", "Something Amazing?"],
    subhead:
      "Whether you're launching a startup or reimagining an established brand, we're here to make it unforgettable. Let's start a conversation.",
    cta: "Start a Conversation",
    email: "hello@dannycreative.com",
    phone: "+1 (555) 123-4567",
    address: "123 Creative Street, New York, NY 10001",
    form: {
      name: "Your name",
      email: "Your email",
      message: "Tell us about your project",
      submit: "Send Message",
      success: "Thank you! We'll be in touch soon.",
    },
  },

  // Footer
  footer: {
    tagline:
      "A creative branding agency obsessed with making brands that people can't stop talking about. Bold strategies, stunning visuals, unforgettable experiences.",
    copyright: "© {year} Danny Creative. All rights reserved.",
  },
};

// Helper to get current year
export function getFooterCopyright(): string {
  return siteCopy.footer.copyright.replace(
    "{year}",
    new Date().getFullYear().toString(),
  );
}
