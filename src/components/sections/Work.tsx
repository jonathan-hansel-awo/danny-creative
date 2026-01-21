"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/ui/ProjectCard";
import Link from "next/link";

const projects = [
  {
    title: "Bloom Hotels",
    category: "Hospitality",
    year: "2024",
    image: "/images/projects/bloom.jpg",
    href: "/work/bloom-hotels",
  },
  {
    title: "Velocity Auto",
    category: "Automotive",
    year: "2024",
    image: "/images/projects/velocity.jpg",
    href: "/work/velocity-auto",
  },
  {
    title: "Greenhouse Cafe",
    category: "Food & Beverage",
    year: "2023",
    image: "/images/projects/greenhouse.jpg",
    href: "/work/greenhouse-cafe",
  },
  {
    title: "Summit Retail",
    category: "Retail",
    year: "2023",
    image: "/images/projects/summit.jpg",
    href: "/work/summit-retail",
  },
];

export function Work() {
  return (
    <section id="work" className="section-padding">
      <div className="container-lg">
        {/* Header */}
        <SectionHeader
          eyebrow="Selected Work"
          headline="Brands we've brought to life."
          className="mb-16"
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="reveal-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-ui text-ink hover:text-spark transition-colors duration-300 group"
            data-spark-hover
          >
            View All Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
