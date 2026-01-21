/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MotionContextType {
  motionEnabled: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [motionEnabled, setMotionEnabled] = useState(true);

  // Sync with system preference on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("motionEnabled");
    if (savedPreference !== null) {
      setMotionEnabled(savedPreference === "true");
    } else {
      setMotionEnabled(!prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  const toggleMotion = () => {
    setMotionEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("motionEnabled", String(newValue));
      return newValue;
    });
  };

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (context === undefined) {
    throw new Error("useMotion must be used within a MotionProvider");
  }
  return context;
}
