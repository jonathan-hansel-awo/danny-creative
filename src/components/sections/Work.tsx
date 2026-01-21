"use client";

import { cn } from "@/lib/utils";
import RoomSection from "@/components/effects/RoomSection";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import { Project } from "@/types";

const projects: Project[] = [
  {
    id: "1",
    title: "Lumina Hotels",
    category: "Brand Identity",
    year: "2024",
    image: "/images/projects/lumina.jpg",
    href: "/work/lumina-hotels",
  },
  {
    id: "2",
    title: "Vertex Auto",
    category: "Digital Experience",
    year: "2024",
    image: "/images/projects/vertex.jpg",
    href: "/work/vertex-auto",
  },
  {
    id: "3",
    title: "Bloom & Co",
    category: "Campaign",
    year: "2023",
    image: "/images/projects/bloom.jpg",
    href: "/work/bloom-co",
  },
  {
    id: "4",
    title: "Echo Studios",
    category: "Visual Identity",
    year: "2023",
    image: "/images/projects/echo.jpg",
    href: "/work/echo-studios",
  },
  {
    id: "5",
    title: "Nordic Retail",
    category: "Brand Strategy",
    year: "2023",
    image: "/images/projects/nordic.jpg",
    href: "/work/nordic-retail",
  },
  {
    id: "6",
    title: "Catalyst Finance",
    category: "Digital Experience",
    year: "2023",
    image: "/images/projects/catalyst.jpg",
    href: "/work/catalyst-finance",
  },
];

export default function Work() {
  return (
    <RoomSection id="work" room="dark" className="py-32 md:py-40">
      {/* Transition gradient from light */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #faf9f6, #0a0a0a)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <SectionHeader
            eyebrow="Selected Work"
            headline={
              <>
                Projects That
                <br />
                <span className="text-coral">Speak Volumes</span>
              </>
            }
            subhead="A glimpse into the brands we've helped transform. Each project is a story of collaboration, creativity, and impact."
            align="left"
          />
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <RevealOnScroll
              key={project.id}
              animation="scale"
              delay={index * 0.1}
              threshold={0.1}
            >
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll animation="fade-up" delay={0.3}>
          <div className="mt-16 text-center">
            <Button variant="secondary" size="lg" href="/work">
              View All Projects
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </RoomSection>
  );
}
