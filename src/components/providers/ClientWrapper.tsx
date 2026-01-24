/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { Spark } from "@/components/spark/Spark";
import { AmbientSparks } from "@/components/spark/AmbientSparks";
import { Loader } from "@/components/loader/Loader";
import { useDeviceDetection } from "@/hooks/useDeviceDetection";

const Scene = dynamic(
  () => import("@/components/three/Scene").then((m) => m.Scene),
  {
    ssr: false,
  },
);

export function ClientWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useDeviceDetection();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Show black screen before hydration
    return (
      <div
        className="fixed inset-0 z-[9999]"
        style={{ backgroundColor: "#1A1A1A" }}
      />
    );
  }

  return (
    <>
      {/* Loader */}
      <Loader />

      {/* 3D Background */}
      <Scene />

      {/* Cursor Effects */}
      <Spark />
      <AmbientSparks />

      {/* Smooth Scroll Content */}
      <SmoothScrollProvider>
        <main className="content-layer">{children}</main>
      </SmoothScrollProvider>
    </>
  );
}
