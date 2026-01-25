"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { Service } from "@/data/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

interface ServiceCardProps {
  service: Service;
  isActive: boolean;
  onClick: () => void;
}

export function ServiceCard({ service, isActive, onClick }: ServiceCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Animate details when expanding/collapsing
  useEffect(() => {
    if (!detailsRef.current) return;

    if (isActive) {
      // Expand
      gsap.fromTo(
        detailsRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
      );

      // Stagger in the detail items
      const items = detailsRef.current.querySelectorAll(".detail-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    } else {
      // Collapse
      gsap.to(detailsRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }
  }, [isActive]);

  return (
    <div
      className="border-b transition-all duration-500 cursor-pointer group"
      style={{
        borderColor: isActive ? "#D4940F" : "rgba(0,0,0,0.08)",
      }}
      onClick={onClick}
    >
      {/* Main row - always visible */}
      <div className="flex items-center gap-6 py-6 md:py-8" data-spark-hover>
        {/* Number */}
        <span
          className="text-sm font-medium tabular-nums transition-colors duration-300"
          style={{
            color: isActive ? "#D4940F" : "#AAAAAA",
            fontFamily: "Inter, sans-serif",
            minWidth: "28px",
          }}
        >
          {service.number}
        </span>

        {/* Icon */}
        <ServiceIcon icon={service.icon} isActive={isActive} />

        {/* Title & Description */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl md:text-2xl mb-1 transition-colors duration-300"
            style={{
              color: isActive ? "#0F0F0F" : "#4A4A4A",
              fontFamily: "Tenor Sans, Georgia, serif",
            }}
          >
            {service.title}
          </h3>
          <p
            className="text-sm md:text-base transition-colors duration-300 line-clamp-1 md:line-clamp-none"
            style={{
              color: isActive ? "#4A4A4A" : "#8A8A8A",
            }}
          >
            {service.description}
          </p>
        </div>

        {/* Expand indicator */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
          style={{
            backgroundColor: isActive ? "#D4940F" : "transparent",
            border: isActive ? "none" : "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isActive ? "#FFFFFF" : "#8A8A8A"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-500"
            style={{
              transform: isActive ? "rotate(45deg)" : "rotate(0deg)",
            }}
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
      </div>

      {/* Expandable details */}
      <div
        ref={detailsRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={contentRef} className="pb-8 pl-[76px] md:pl-[100px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            {service.details.map((detail, index) => (
              <div
                key={index}
                className="detail-item flex items-center gap-3"
                style={{ opacity: 0 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#D4940F" }}
                />
                <span className="text-sm" style={{ color: "#4A4A4A" }}>
                  {detail}
                </span>
              </div>
            ))}
          </div>

          {/* Learn more link */}
          <button
            className="mt-6 flex items-center gap-2 text-sm font-medium transition-colors duration-300 hover:gap-3"
            style={{ color: "#D4940F" }}
            onClick={(e) => {
              e.stopPropagation();
              // Handle learn more click
            }}
            data-spark-hover
          >
            <span>Learn more</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
