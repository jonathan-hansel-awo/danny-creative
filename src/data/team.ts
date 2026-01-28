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
    name: "Martha Sink",
    role: "Design Lead",
    bio: "Martha brings 8 years of visual design expertise to the team. Her keen eye for detail and passion for typography has shaped some of our most iconic brand identities.",
    quote:
      "Design is not just what it looks like—it's how it makes people feel.",
    color: "#4A7C7E",
    accentColor: "#8BB8BA",
  },
  {
    id: "ephraim",
    name: "Ephraim Link",
    role: "Strategy Director",
    bio: "Ephraim combines analytical thinking with creative intuition. He helps brands find their position in the market and develop strategies that drive real results.",
    quote:
      "Strategy without creativity is boring. Creativity without strategy is chaos.",
    color: "#7D6B8F",
    accentColor: "#B8A9C4",
  },
];
