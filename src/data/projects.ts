export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  color: string;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "lumina-hotels",
    title: "Lumina Hotels",
    subtitle: "Luxury hospitality, reimagined.",
    category: "Brand Identity",
    year: "2024",
    description:
      "A complete brand transformation for a boutique hotel chain seeking to capture the essence of modern luxury.",
    color: "#C9A87C",
    accentColor: "#8B7355",
  },
  {
    id: "velocity-auto",
    title: "Velocity Auto",
    subtitle: "Drive the future.",
    category: "Brand & Digital",
    year: "2024",
    description:
      "Bold automotive branding that speaks to a new generation of electric vehicle enthusiasts.",
    color: "#4A7C7E",
    accentColor: "#2D5658",
  },
  {
    id: "botanica",
    title: "Botanica",
    subtitle: "Nature, refined.",
    category: "Visual Identity",
    year: "2023",
    description:
      "Organic skincare brand identity rooted in sustainability and natural beauty.",
    color: "#7D8471",
    accentColor: "#5A6150",
  },
  {
    id: "nova-finance",
    title: "Nova Finance",
    subtitle: "Your money, modernized.",
    category: "Brand Strategy",
    year: "2023",
    description:
      "Fintech startup branding that makes complex financial services feel approachable.",
    color: "#5B6CF9",
    accentColor: "#3D4DB8",
  },
  {
    id: "artisan-coffee",
    title: "Artisan Coffee Co.",
    subtitle: "Crafted with passion.",
    category: "Full Rebrand",
    year: "2023",
    description:
      "From bean to brand — a complete identity for specialty coffee roasters.",
    color: "#8B5A3C",
    accentColor: "#5C3D28",
  },
];
