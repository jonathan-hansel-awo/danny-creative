"use client";

import { ReactNode, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Spark } from "@/components/spark/Spark";
import { AmbientSparks } from "@/components/spark/AmbientSparks";
import { Loader } from "@/components/loader/Loader";
import { Navigation } from "@/components/layout/Navigation";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";
import { useStore } from "@/stores/useStore";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((m) => m.Scene),
  { ssr: false },
);

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ClientWrapper({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  const loadingPhase = useStore((s) => s.loadingPhase);

  useDeviceDetection();

  if (!isClient) {
    return <div className="fixed inset-0 z-[9999] bg-[#1A1A1A]" />;
  }

  const showContent =
    loadingPhase === "content-revealing" || loadingPhase === "complete";

  return (
    <>
      <Loader />
      <Scene />
      <Navigation />
      <Spark />
      <AmbientSparks />
      <SmoothScrollProvider>
        <main
          className="content-layer transition-opacity duration-700"
          style={{ opacity: showContent ? 1 : 0 }}
        >
          {children}
        </main>
      </SmoothScrollProvider>
    </>
  );
}
