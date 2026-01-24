export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  color: string; // Accent color for this project
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
    image: "/projects/lumina.jpg",
    color: "#C9A87C",
  },
  {
    id: "velocity-auto",
    title: "Velocity Auto",
    subtitle: "Drive the future.",
    category: "Brand & Digital",
    year: "2024",
    description:
      "Bold automotive branding that speaks to a new generation of electric vehicle enthusiasts.",
    image: "/projects/velocity.jpg",
    color: "#4A7C7E",
  },
  {
    id: "botanica",
    title: "Botanica",
    subtitle: "Nature, refined.",
    category: "Visual Identity",
    year: "2023",
    description:
      "Organic skincare brand identity rooted in sustainability and natural beauty.",
    image: "/projects/botanica.jpg",
    color: "#7D8471",
  },
  {
    id: "nova-finance",
    title: "Nova Finance",
    subtitle: "Your money, modernized.",
    category: "Brand Strategy",
    year: "2023",
    description:
      "Fintech startup branding that makes complex financial services feel approachable.",
    image: "/projects/nova.jpg",
    color: "#5B6CF9",
  },
  {
    id: "artisan-coffee",
    title: "Artisan Coffee Co.",
    subtitle: "Crafted with passion.",
    category: "Full Rebrand",
    year: "2023",
    description:
      "From bean to brand — a complete identity for specialty coffee roasters.",
    image: "/projects/artisan.jpg",
    color: "#8B5A3C",
  },
];
