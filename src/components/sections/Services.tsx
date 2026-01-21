"use client";

import { cn } from "@/lib/utils";
import RoomSection from "@/components/effects/RoomSection";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import { Service } from "@/types";

const services: Service[] = [
  {
    id: "1",
    icon: "01",
    title: "Brand Strategy",
    description:
      "We dive deep into your vision, audience, and market to craft positioning that commands attention and drives meaningful connection.",
  },
  {
    id: "2",
    icon: "02",
    title: "Visual Identity",
    description:
      "Logos, color systems, typography—every visual element engineered to be instantly recognizable and impossible to forget.",
  },
  {
    id: "3",
    icon: "03",
    title: "Digital Experience",
    description:
      "Websites and apps that don't just look stunning—they feel alive, responsive, and deeply engaging at every touchpoint.",
  },
  {
    id: "4",
    icon: "04",
    title: "Motion & Animation",
    description:
      "Movement that tells your story. From micro-interactions to full campaigns, we make brands breathe and come alive.",
  },
  {
    id: "5",
    icon: "05",
    title: "Content Creation",
    description:
      "Photography, video, and written content that captures your essence and speaks directly to your audience.",
  },
  {
    id: "6",
    icon: "06",
    title: "Campaign Launch",
    description:
      "Strategic rollouts across every channel. We don't just create—we ensure the world sees it and responds.",
  },
];

export default function Services() {
  return (
    <RoomSection id="services" room="light" className="py-32 md:py-40">
      {/* Transition gradient from dark */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a, #faf9f6)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <SectionHeader
            eyebrow="Services"
            headline={
              <>
                What We
                <br />
                <span className="text-coral">Do</span>
              </>
            }
            subhead="End-to-end creative services designed to elevate your brand at every stage of its journey."
            align="left"
          />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service.id}
              animation="fade-up"
              delay={index * 0.1}
              threshold={0.1}
            >
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </RoomSection>
  );
}
