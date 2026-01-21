"use client";

import dynamic from "next/dynamic";

const FluidDistortion = dynamic(() => import("./FluidDistortion"), {
  ssr: false,
  loading: () => null,
});

interface LazyFluidDistortionProps {
  className?: string;
  intensity?: number;
  radius?: number;
  enabled?: boolean;
}

export default function LazyFluidDistortion(props: LazyFluidDistortionProps) {
  return <FluidDistortion {...props} />;
}
