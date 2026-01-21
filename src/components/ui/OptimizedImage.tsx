"use client";

import { useState, useEffect, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
  lowQualitySrc?: string;
  containerClassName?: string;
  showSkeleton?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  containerClassName = "",
  showSkeleton = true,
  className = "",
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before in view
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      {/* Skeleton loader */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-dark-text/5">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-text/5 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* Low quality placeholder (blur-up technique) */}
      {lowQualitySrc && !isLoaded && isInView && (
        <Image
          src={lowQualitySrc}
          alt=""
          fill={props.fill}
          className={cn("blur-lg scale-105", className)}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            className,
          )}
          onLoad={() => setIsLoaded(true)}
          priority={priority}
          {...props}
        />
      )}
    </div>
  );
}
