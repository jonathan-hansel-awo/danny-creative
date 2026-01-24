"use client";

import { useStore } from "@/stores/useStore";
import { projects } from "@/data/projects";

export function WorkProgress() {
  const currentSection = useStore((s) => s.currentSection);
  const activeProjectIndex = useStore((s) => s.activeProjectIndex);
  const workProgress = useStore((s) => s.workProgress);

  // Only show during work section
  const isVisible = currentSection === "work";

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: `translateX(-50%) translateY(${isVisible ? 0 : 20}px)`,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Progress bar */}
      <div className="relative w-48 md:w-64 h-[2px] bg-[var(--color-ink)]/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
          style={{
            width: `${((activeProjectIndex + workProgress) / projects.length) * 100}%`,
            backgroundColor: "var(--color-spark)",
          }}
        />
      </div>

      {/* Counter */}
      <div
        className="text-sm tabular-nums"
        style={{
          color: "var(--color-ink-muted)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <span style={{ color: "var(--color-ink)" }}>
          {String(activeProjectIndex + 1).padStart(2, "0")}
        </span>
        <span className="mx-1">/</span>
        <span>{String(projects.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
