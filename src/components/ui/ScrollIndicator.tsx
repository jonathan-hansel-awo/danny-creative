"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({
  className = "",
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2",
            "flex flex-col items-center gap-3",
            className,
          )}
        >
          <span className="text-label font-body uppercase tracking-widest opacity-60">
            Scroll
          </span>
          <motion.div
            className="w-px h-16 bg-linear-to-b from-current to-transparent opacity-50"
            animate={{
              scaleY: [1, 0.6, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
