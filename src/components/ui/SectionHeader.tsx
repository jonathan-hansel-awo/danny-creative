interface SectionHeaderProps {
  eyebrow: string;
  headline: string;
  subheadline?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  headline,
  subheadline,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses = align === "center" ? "text-center mx-auto" : "";

  return (
    <header className={`max-w-[672px] ${alignmentClasses} ${className}`}>
      {/* Eyebrow */}
      <p className="font-ui text-[0.8125rem] font-medium tracking-[0.1em] uppercase text-spark mb-4">
        {eyebrow}
      </p>

      {/* Headline */}
      <h2 className="font-display text-display-lg leading-[1.05] tracking-[-0.02em] text-ink mb-6">
        {headline}
      </h2>

      {/* Subheadline (optional) */}
      {subheadline && (
        <p className="text-body-lg leading-relaxed text-ink-light">
          {subheadline}
        </p>
      )}
    </header>
  );
}
