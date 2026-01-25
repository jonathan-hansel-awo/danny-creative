export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    quote:
      "Working with Danny Creative transformed how we think about our brand. They didn't just design a logo — they gave us a story to tell.",
    author: "Sarah Chen",
    title: "Founder",
    company: "Lumina Hotels",
    initials: "SC",
  },
  {
    id: "marcus-webb",
    quote:
      "The team understood our vision from day one. Our new identity has helped us stand out in a crowded market and connect with customers on a deeper level.",
    author: "Marcus Webb",
    title: "CEO",
    company: "Velocity Auto",
    initials: "MW",
  },
  {
    id: "elena-rodriguez",
    quote:
      "Professional, creative, and genuinely invested in our success. The brand they created for us has exceeded every expectation.",
    author: "Elena Rodriguez",
    title: "Marketing Director",
    company: "Botanica",
    initials: "ER",
  },
  {
    id: "james-okonkwo",
    quote:
      "Danny Creative doesn't just build brands — they build relationships. They took the time to truly understand who we are and what we stand for.",
    author: "James Okonkwo",
    title: "Co-founder",
    company: "Nova Finance",
    initials: "JO",
  },
];
