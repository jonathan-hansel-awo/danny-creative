/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, Children, isValidElement, cloneElement } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  threshold?: number;
  className?: string;
}

export default function RevealGroup({
  children,
  staggerDelay = 0.1,
  threshold = 0.15,
  className = "",
}: RevealGroupProps) {
  const { ref, isInView } = useInView({ threshold });

  const childrenWithDelay = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as React.ReactElement<any>, {
        delay: index * staggerDelay,
        isInView,
      });
    }
    return child;
  });

  return (
    <div ref={ref} className={className}>
      {childrenWithDelay}
    </div>
  );
}
