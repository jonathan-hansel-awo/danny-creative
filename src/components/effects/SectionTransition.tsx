"use client";

import { cn } from "@/lib/utils";
import { Room } from "@/types";

interface SectionTransitionProps {
  from: Room;
  to: Room;
  className?: string;
}

export default function SectionTransition({
  from,
  to,
  className = "",
}: SectionTransitionProps) {
  const gradientDirection = from === "dark" ? "to-b" : "to-t";

  const fromColor = from === "dark" ? "from-dark-bg" : "from-light-bg";
  const toColor = to === "dark" ? "to-dark-bg" : "to-light-bg";

  return (
    <div
      className={cn(
        "h-32 w-full",
        `bg-gradient-${gradientDirection}`,
        fromColor,
        toColor,
        className,
      )}
      aria-hidden="true"
    />
  );
}
