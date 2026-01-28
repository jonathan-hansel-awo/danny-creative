export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  image?: string; // Will be added later
  color: string;
  accentColor: string;
}

export const team: TeamMember[] = [
  {
    id: "danny",
    name: "Daniel Slink",
    role: "Founder & Creative Director",
    bio: "With over a decade of experience in branding and design, Daniel founded Danny Creative with a simple mission: help businesses become unforgettable. His approach combines strategic thinking with bold creativity.",
    quote:
      "Great brands aren't built—they're discovered. Our job is to find the spark that was always there.",
    image: "/images/team/danny.jpg",
    color: "#D4940F",
    accentColor: "#F5D49B",
  },
  {
    id: "martha",
    name: "Martha Smith",
    role: "Design Lead",
    bio: "Martha brings 8 years of visual design expertise to the team. Her keen eye for detail and passion for typography has shaped some of our most iconic brand identities.",
    quote:
      "Design is not just what it looks like—it's how it makes people feel.",
    color: "#4A7C7E",
    accentColor: "#8BB8BA",
  },
  {
    id: "phoebe",
    name: "Phoebe Lane",
    role: "Design Lead",
    bio: "Phoebe brings a unique blend of artistic vision and meticulous attention to detail to every project. With a background in fine arts and digital design, she transforms brand concepts into stunning visual identities.",
    quote:
      "Design is storytelling without words. Every color, every line, every space has something to say.",
    color: "#D4940F",
    accentColor: "#F5D49B",
  },
  {
    id: "ephraim",
    name: "Ephraim Lincoln",
    role: "Strategy Director",
    bio: "Ephraim combines analytical thinking with creative intuition. He helps brands find their position in the market and develop strategies that drive real results.",
    quote:
      "Strategy without creativity is boring. Creativity without strategy is chaos.",
    color: "#7B8D6E",
    accentColor: "#B5C4A8",
  },
];
