"use client";

import { ReactNode } from "react";
import { useRoom } from "@/context/RoomContext";
import { useMotion } from "@/context/MotionContext";
import ParticleField from "@/components/effects/ParticleField";
import FluidDistortion from "@/components/effects/FluidDistortion";

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const { room } = useRoom();
  const { motionEnabled } = useMotion();

  return (
    <>
      {motionEnabled && <ParticleField room={room} />}
      {motionEnabled && <FluidDistortion enabled={motionEnabled} />}
      {children}
    </>
  );
}
