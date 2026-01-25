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

  // Loading
  loadingPhase:
    | "initial"
    | "spark-emerging"
    | "spark-born"
    | "content-revealing"
    | "complete";
  sceneReady: boolean;
  setLoadingPhase: (phase: AppState["loadingPhase"]) => void;
  setSceneReady: (ready: boolean) => void;

  // Current Section
  currentSection:
    | "hero"
    | "work"
    | "services"
    | "about"
    | "testimonials"
    | "contact";
  setCurrentSection: (section: AppState["currentSection"]) => void;

  // Work Section
  activeProjectIndex: number;
  workProgress: number;
  setActiveProjectIndex: (index: number) => void;
  setWorkProgress: (progress: number) => void;
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

  // Loading
  loadingPhase: "initial",
  sceneReady: false,
  setLoadingPhase: (phase) => set({ loadingPhase: phase }),
  setSceneReady: (ready) => set({ sceneReady: ready }),

  // Current Section
  currentSection: "hero",
  setCurrentSection: (section) => set({ currentSection: section }),

  // Work Section
  activeProjectIndex: 0,
  workProgress: 0,
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
  setWorkProgress: (progress) => set({ workProgress: progress }),
}));
