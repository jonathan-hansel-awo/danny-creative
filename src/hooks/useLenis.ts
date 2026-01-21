/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

export function useLenis(callback?: (lenis: Lenis) => void) {
  useEffect(() => {
    const lenis = (window as any).lenis as Lenis | undefined;

    if (lenis && callback) {
      callback(lenis);
    }
  }, [callback]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
      },
    ) => {
      const lenis = (window as any).lenis as Lenis | undefined;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.2,
          immediate: options?.immediate ?? false,
        });
      }
    },
    [],
  );

  return { scrollTo };
}
