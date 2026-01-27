"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function LoadingSpinner({
  size = "md",
  color = "#D4940F",
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`${sizes[size]} relative`}>
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-20"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-1/4 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
