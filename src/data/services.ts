import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "brand-strategy",
    icon: "01",
    title: "Brand Strategy",
    description:
      "We dive deep into your vision, audience, and market to craft positioning that commands attention and drives meaningful connection.",
    href: "/services/brand-strategy",
  },
  {
    id: "visual-identity",
    icon: "02",
    title: "Visual Identity",
    description:
      "Logos, color systems, typography—every visual element engineered to be instantly recognizable and impossible to forget.",
    href: "/services/visual-identity",
  },
  {
    id: "digital-experience",
    icon: "03",
    title: "Digital Experience",
    description:
      "Websites and apps that don't just look stunning—they feel alive, responsive, and deeply engaging at every touchpoint.",
    href: "/services/digital-experience",
  },
  {
    id: "motion-animation",
    icon: "04",
    title: "Motion & Animation",
    description:
      "Movement that tells your story. From micro-interactions to full campaigns, we make brands breathe and come alive.",
    href: "/services/motion-animation",
  },
  {
    id: "content-creation",
    icon: "05",
    title: "Content Creation",
    description:
      "Photography, video, and written content that captures your essence and speaks directly to your audience.",
    href: "/services/content-creation",
  },
  {
    id: "campaign-launch",
    icon: "06",
    title: "Campaign Launch",
    description:
      "Strategic rollouts across every channel. We don't just create—we ensure the world sees it and responds.",
    href: "/services/campaign-launch",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
