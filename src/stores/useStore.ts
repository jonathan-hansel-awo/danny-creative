import { create } from "zustand";

interface AppState {
  // Scroll
  scrollProgress: number;
  scrollVelocity: number;
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;

  // Cursor
  cursorPosition: { x: number; y: number };
  isHoveringInteractive: boolean;
  setCursorPosition: (pos: { x: number; y: number }) => void;
  setIsHoveringInteractive: (hovering: boolean) => void;

  // Device
  isTouchDevice: boolean;
  setIsTouchDevice: (isTouch: boolean) => void;

  // Loading & Animation States
  loadingPhase:
    | "initial"
    | "spark-emerging"
    | "spark-born"
    | "content-revealing"
    | "complete";
  isLoaded: boolean;
  heroAnimationComplete: boolean;
  setLoadingPhase: (phase: AppState["loadingPhase"]) => void;
  setIsLoaded: (loaded: boolean) => void;
  setHeroAnimationComplete: (complete: boolean) => void;

  // Scene
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  // Scroll
  scrollProgress: 0,
  scrollVelocity: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),

  // Cursor
  cursorPosition: { x: 0, y: 0 },
  isHoveringInteractive: false,
  setCursorPosition: (pos) => set({ cursorPosition: pos }),
  setIsHoveringInteractive: (hovering) =>
    set({ isHoveringInteractive: hovering }),

  // Device
  isTouchDevice: false,
  setIsTouchDevice: (isTouch) => set({ isTouchDevice: isTouch }),

  // Loading & Animation States
  loadingPhase: "initial",
  isLoaded: false,
  heroAnimationComplete: false,
  setLoadingPhase: (phase) => set({ loadingPhase: phase }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setHeroAnimationComplete: (complete) =>
    set({ heroAnimationComplete: complete }),

  // Scene
  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),
}));
