"use client";

import { useStore } from "@/stores/useStore";
import { projects } from "@/data/projects";

export function WorkProgress() {
  const currentSection = useStore((s) => s.currentSection);
  const activeProjectIndex = useStore((s) => s.activeProjectIndex);
  const workProgress = useStore((s) => s.workProgress);

  const isVisible = currentSection === "work";
  const totalProgress = (activeProjectIndex + workProgress) / projects.length;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(-50%) translateY(${isVisible ? 0 : 20}px)`,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                index <= activeProjectIndex ? "#D4940F" : "rgba(0,0,0,0.15)",
              transform:
                index === activeProjectIndex ? "scale(1.5)" : "scale(1)",
            }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-4 bg-black/10" />

      {/* Counter */}
      <div
        className="text-sm tabular-nums font-medium"
        style={{ color: "#6A6A6A" }}
      >
        <span style={{ color: "#0F0F0F" }}>
          {String(activeProjectIndex + 1).padStart(2, "0")}
        </span>
        <span className="mx-1 opacity-40">/</span>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
