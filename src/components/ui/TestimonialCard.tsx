interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  title,
  company,
  className = "",
}: TestimonialCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Large Quote Mark */}
      <div
        className="absolute top-0 left-0 font-display text-[120px] leading-none text-spark/20 select-none pointer-events-none"
        aria-hidden="true"
      >
        &quot;
      </div>

      {/* Quote Content */}
      <blockquote className="relative pt-12">
        <p className="font-display text-[1.5rem] leading-relaxed text-ink italic mb-8">
          {quote}
        </p>

        {/* Attribution */}
        <footer className="font-ui text-sm">
          <span className="font-medium text-ink">{author}</span>
          <span className="text-ink-muted">
            {" "}
            · {title} at {company}
          </span>
        </footer>
      </blockquote>
    </div>
  );
}
