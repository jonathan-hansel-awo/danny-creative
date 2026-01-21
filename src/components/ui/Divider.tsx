"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  gradient?: boolean;
}

export default function Divider({
  orientation = "horizontal",
  className = "",
  gradient = false,
}: DividerProps) {
  const baseStyles =
    orientation === "horizontal" ? "w-full h-px" : "h-full w-px";

  const colorStyles = gradient
    ? "bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
    : "bg-current opacity-10";

  return <div className={cn(baseStyles, colorStyles, className)} />;
}
