"use client";

import { cn } from "@/lib/utils";
import RoomSection from "@/components/effects/RoomSection";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/effects/RevealOnScroll";
import { getFeaturedProjects } from "@/data/projects";
import { siteCopy } from "@/data/copy";

export default function Work() {
  const projects = getFeaturedProjects(6);
  const copy = siteCopy.work;

  return (
    <RoomSection id="work" room="dark" className="py-32 md:py-40">
      {/* Transition gradient from light */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-light-bg), var(--color-dark-bg))",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 md:mb-20">
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

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <RevealOnScroll
              key={project.id}
              animation="scale"
              delay={index * 0.1}
              threshold={0.1}
            >
              <ProjectCard project={project} priority={index < 2} />
            </RevealOnScroll>
          ))}
        </div>

        {/* CTA */}
        <RevealOnScroll animation="fade-up" delay={0.3}>
          <div className="mt-16 text-center">
            <Button variant="secondary" size="lg" href="/work">
              {copy.cta}
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </RoomSection>
  );
}
