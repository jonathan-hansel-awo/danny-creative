/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRoom } from "@/context/RoomContext";
import { useMotion } from "@/context/MotionContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import LazyFluidDistortion from "@/components/effects/LazyFluidDistortion";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { room } = useRoom();
  const { motionEnabled } = useMotion();
  const isMobile = useIsMobile();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration to prevent SSR mismatch
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Reduce effects on mobile for performance
  const showDistortion = isHydrated && motionEnabled && !isMobile;

  return (
    <>
      {showDistortion && <LazyFluidDistortion enabled={showDistortion} />}
      {children}
    </>
  );
}
