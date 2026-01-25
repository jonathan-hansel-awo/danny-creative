export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: "compass" | "palette" | "monitor" | "play" | "camera" | "rocket";
}

export const services: Service[] = [
  {
    id: "strategy",
    number: "01",
    title: "Brand Strategy",
    description:
      "We uncover what makes your brand unique and build a roadmap for growth.",
    details: [
      "Market & competitor analysis",
      "Brand positioning",
      "Audience research",
      "Brand architecture",
    ],
    icon: "compass",
  },
  {
    id: "identity",
    number: "02",
    title: "Visual Identity",
    description:
      "Logos, color systems, and design language that capture your essence.",
    details: [
      "Logo design",
      "Color & typography systems",
      "Brand guidelines",
      "Visual asset creation",
    ],
    icon: "palette",
  },
  {
    id: "digital",
    number: "03",
    title: "Digital Experience",
    description:
      "Beautiful, functional websites that convert visitors into customers.",
    details: [
      "Website design & development",
      "E-commerce solutions",
      "Web applications",
      "Digital product design",
    ],
    icon: "monitor",
  },
  {
    id: "motion",
    number: "04",
    title: "Motion & Animation",
    description:
      "Dynamic content that brings your brand to life across platforms.",
    details: [
      "Brand animations",
      "Video production",
      "Social media content",
      "Interactive experiences",
    ],
    icon: "play",
  },
  {
    id: "content",
    number: "05",
    title: "Content Creation",
    description: "Photography, copywriting, and assets that tell your story.",
    details: [
      "Brand photography",
      "Copywriting & messaging",
      "Social media strategy",
      "Content planning",
    ],
    icon: "camera",
  },
  {
    id: "launch",
    number: "06",
    title: "Campaign Launch",
    description: "Strategic rollouts that make an impact from day one.",
    details: [
      "Launch strategy",
      "Marketing campaigns",
      "Brand activations",
      "Performance tracking",
    ],
    icon: "rocket",
  },
];
