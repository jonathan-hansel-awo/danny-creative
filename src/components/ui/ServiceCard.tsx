"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative p-8 h-full",
        "rounded-2xl",
        "border border-light-text/10",
        "bg-transparent",
        "transition-all duration-500 ease-out-quad",
        "group",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 40px rgba(26, 26, 26, 0.08)",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Icon/Number */}
      <motion.div
        className={cn(
          "text-[2.5rem] font-display text-coral",
          "mb-6",
          "transition-transform duration-500",
        )}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      >
        {service.icon}
      </motion.div>

      {/* Title */}
      <h3
        className={cn("text-display-s font-display", "text-light-text", "mb-4")}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-body-m font-body",
          "text-light-text/60",
          "leading-relaxed",
        )}
      >
        {service.description}
      </p>

      {/* Hover accent line */}
      <motion.div
        className="absolute bottom-0 left-8 right-8 h-px bg-coral"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
}
