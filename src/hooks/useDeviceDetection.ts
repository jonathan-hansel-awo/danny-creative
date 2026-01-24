"use client";

import { useEffect } from "react";
import { useStore } from "@/stores/useStore";

export function useDeviceDetection() {
  const setIsTouchDevice = useStore((s) => s.setIsTouchDevice);

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, [setIsTouchDevice]);
}
