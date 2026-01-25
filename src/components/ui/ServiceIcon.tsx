"use client";

interface ServiceIconProps {
  icon: "compass" | "palette" | "monitor" | "play" | "camera" | "rocket";
  isActive: boolean;
}

export function ServiceIcon({ icon, isActive }: ServiceIconProps) {
  const baseClasses = "transition-all duration-700";
  const activeColor = "#D4940F";
  const inactiveColor = "#8A8A8A";
  const color = isActive ? activeColor : inactiveColor;

  const iconSize = 32;
  const strokeWidth = 1.5;

  const icons = {
    compass: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
        style={{
          transform: isActive ? "rotate(0deg)" : "rotate(-20deg)",
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <polygon
          points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
          fill={isActive ? activeColor : "none"}
          fillOpacity={isActive ? 0.2 : 0}
          style={{ transition: "all 0.5s ease" }}
        />
      </svg>
    ),
    palette: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
      >
        <circle
          cx="13.5"
          cy="6.5"
          r="2.5"
          fill={isActive ? activeColor : "none"}
          fillOpacity={0.3}
        />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
      </svg>
    ),
    monitor: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        {isActive && (
          <rect
            x="5"
            y="6"
            width="14"
            height="8"
            fill={activeColor}
            fillOpacity={0.15}
            style={{ transition: "all 0.5s ease" }}
          />
        )}
      </svg>
    ),
    play: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
      >
        <circle cx="12" cy="12" r="10" />
        <polygon
          points="10 8 16 12 10 16 10 8"
          fill={isActive ? activeColor : "none"}
          fillOpacity={isActive ? 0.3 : 0}
          style={{ transition: "all 0.5s ease" }}
        />
      </svg>
    ),
    camera: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle
          cx="12"
          cy="13"
          r="4"
          fill={isActive ? activeColor : "none"}
          fillOpacity={isActive ? 0.2 : 0}
          style={{ transition: "all 0.5s ease" }}
        />
      </svg>
    ),
    rocket: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
        style={{
          transform: isActive ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <path
          d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
          fill={isActive ? activeColor : "none"}
          fillOpacity={isActive ? 0.2 : 0}
        />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  };

  return (
    <div
      className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500"
      style={{
        backgroundColor: isActive ? "rgba(212, 148, 15, 0.1)" : "transparent",
      }}
    >
      {icons[icon]}
    </div>
  );
}
