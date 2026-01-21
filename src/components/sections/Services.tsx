"use client";

import { cn } from "@/lib/utils";
import RoomSection from "@/components/effects/RoomSection";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import { services } from "@/data/services";
import { siteCopy } from "@/data/copy";

export default function Services() {
  const copy = siteCopy.services;

  return (
    <RoomSection id="services" room="light" className="py-32 md:py-40">
      {/* Transition gradient from dark */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-dark-bg), var(--color-light-bg))",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <SectionHeader
            eyebrow={copy.eyebrow}
            headline={
              <>
                {copy.headline[0]}
                <br />
                <span className="text-coral">{copy.headline[1]}</span>
              </>
            }
            subhead={copy.subhead}
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
