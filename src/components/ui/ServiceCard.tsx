import { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  number?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  number,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`bg-cream-dark rounded-xl p-8 transition-all duration-300 ease-smooth hover:translate-y-[-4px] hover:shadow-md group ${className}`}
      data-spark-hover
    >
      {/* Number (optional) */}
      {number && (
        <span className="font-ui text-[0.8125rem] font-medium text-spark mb-4 block">
          {number}
        </span>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-spark/10 flex items-center justify-center mb-6 text-spark transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.5rem] text-ink mb-3">{title}</h3>

      {/* Description */}
      <p className="text-body-sm text-ink-light leading-relaxed">
        {description}
      </p>
    </div>
  );
}
