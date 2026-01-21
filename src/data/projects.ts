import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "lumina-hotels",
    title: "Lumina Hotels",
    category: "Brand Identity",
    year: "2024",
    image: "/images/projects/lumina.jpg",
    video: "/videos/projects/lumina.mp4", // Optional hover video
    href: "/work/lumina-hotels",
  },
  {
    id: "vertex-auto",
    title: "Vertex Auto",
    category: "Digital Experience",
    year: "2024",
    image: "/images/projects/vertex.jpg",
    href: "/work/vertex-auto",
  },
  {
    id: "bloom-co",
    title: "Bloom & Co",
    category: "Campaign",
    year: "2023",
    image: "/images/projects/bloom.jpg",
    href: "/work/bloom-co",
  },
  {
    id: "echo-studios",
    title: "Echo Studios",
    category: "Visual Identity",
    year: "2023",
    image: "/images/projects/echo.jpg",
    href: "/work/echo-studios",
  },
  {
    id: "nordic-retail",
    title: "Nordic Retail",
    category: "Brand Strategy",
    year: "2023",
    image: "/images/projects/nordic.jpg",
    href: "/work/nordic-retail",
  },
  {
    id: "catalyst-finance",
    title: "Catalyst Finance",
    category: "Digital Experience",
    year: "2023",
    image: "/images/projects/catalyst.jpg",
    href: "/work/catalyst-finance",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getFeaturedProjects(count: number = 6): Project[] {
  return projects.slice(0, count);
}
