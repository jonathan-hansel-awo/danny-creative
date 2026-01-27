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
    name: "Danny",
    role: "Founder & Creative Director",
    bio: "With over a decade of experience in branding and design, Danny founded Danny Creative with a simple mission: help businesses become unforgettable. His approach combines strategic thinking with bold creativity.",
    quote:
      "Great brands aren't built—they're discovered. Our job is to find the spark that was always there.",
    image: '/images/team/danny.jpg',
    color: "#D4940F",
    accentColor: "#F5D49B",
  },
  // Add more team members here later
  // {
  //   id: 'member-2',
  //   name: 'Team Member',
  //   role: 'Role',
  //   bio: 'Bio...',
  //   quote: 'Quote...',
  //   color: '#4A7C7E',
  //   accentColor: '#8BB8BA',
  // },
];
