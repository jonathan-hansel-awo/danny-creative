/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Spark } from "@/components/spark/Spark";
import { AmbientSparks } from "@/components/spark/AmbientSparks";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useStore } from "@/stores/useStore";

// Dynamic import Three.js scene to avoid SSR issues
const Scene = dynamic(
  () => import("@/components/three/Scene").then((m) => m.Scene),
  {
    ssr: false,
  },
);

export function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const setIsLoaded = useStore((s) => s.setIsLoaded);

  useDeviceDetection();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setIsLoaded(true), 300);
  }, [setIsLoaded]);

  if (!mounted) return null;

  return (
    <>
      <Scene />
      <Spark />
      <AmbientSparks />
      <SmoothScrollProvider>
        <main className="content-layer">{children}</main>
      </SmoothScrollProvider>
    </>
  );
}
