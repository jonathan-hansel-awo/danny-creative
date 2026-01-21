"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  gradient?: string;
}

export default function ImagePlaceholder({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  className = "",
  containerClassName = "",
  gradient = "from-coral/20 via-dark-bg to-coral/10",
}: ImagePlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Gradient placeholder */}
      <motion.div
        className={cn(
          "absolute inset-0",
          `bg-gradient-to-br ${gradient}`,
          "transition-opacity duration-500",
        )}
        animate={{ opacity: isLoaded && !hasError ? 0 : 1 }}
      />

      {/* Shimmer effect while loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-dark-text/40 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
}
