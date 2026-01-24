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
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  scrollVelocity: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),

  cursorPosition: { x: 0, y: 0 },
  isHoveringInteractive: false,
  setCursorPosition: (pos) => set({ cursorPosition: pos }),
  setIsHoveringInteractive: (hovering) =>
    set({ isHoveringInteractive: hovering }),

  isTouchDevice: false,
  setIsTouchDevice: (isTouch) => set({ isTouchDevice: isTouch }),

  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
