import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
  className?: string;
}

export function ProjectCard({
  title,
  category,
  year,
  image,
  href,
  className = "",
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={`group block bg-warm-white rounded-xl overflow-hidden transition-all duration-300 ease-smooth hover:translate-y-[-4px] hover:shadow-md ${className}`}
      data-spark-hover
    >
      {/* Image Container */}
      <div className="aspect-video relative overflow-hidden bg-cream-dark">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-center justify-center">
          <span className="text-cream font-ui text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            View Project →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-display text-[1.25rem] text-ink mb-1 group-hover:text-spark transition-colors duration-300">
              {title}
            </h3>
            <p className="text-body-sm text-ink-muted">{category}</p>
          </div>
          <span className="font-ui text-[0.8125rem] text-ink-muted">
            {year}
          </span>
        </div>
      </div>
    </Link>
  );
}
