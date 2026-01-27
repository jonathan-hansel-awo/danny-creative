import { create } from 'zustand';

interface StoreState {
  // Scroll
  scrollProgress: number;
  scrollVelocity: number;
  setScrollProgress: (progress: number) => void;
  setScrollVelocity: (velocity: number) => void;

  // Cursor
  cursorPosition: { x: number; y: number };
  setCursorPosition: (position: { x: number; y: number }) => void;

  // Device
  isTouchDevice: boolean;
  setIsTouchDevice: (isTouch: boolean) => void;

  // Loading
  loadingPhase: 'initial' | 'spark-emerging' | 'spark-born' | 'content-revealing' | 'complete';
  setLoadingPhase: (phase: StoreState['loadingPhase']) => void;

  // Scene
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  // Sections
  currentSection: 'hero' | 'work' | 'services' | 'about' | 'team' | 'testimonials' | 'contact';
  setCurrentSection: (section: StoreState['currentSection']) => void;

  // Work section
  activeProjectIndex: number;
  setActiveProjectIndex: (index: number) => void;
  workProgress: number;
  setWorkProgress: (progress: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Scroll
  scrollProgress: 0,
  scrollVelocity: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setScrollVelocity: (velocity) => set({ scrollVelocity: velocity }),

  // Cursor
  cursorPosition: { x: 0, y: 0 },
  setCursorPosition: (position) => set({ cursorPosition: position }),

  // Device
  isTouchDevice: false,
  setIsTouchDevice: (isTouch) => set({ isTouchDevice: isTouch }),

  // Loading
  loadingPhase: 'initial',
  setLoadingPhase: (phase) => set({ loadingPhase: phase }),

  // Scene
  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),

  // Sections
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),

  // Work section
  activeProjectIndex: 0,
  setActiveProjectIndex: (index) => set({ activeProjectIndex: index }),
  workProgress: 0,
  setWorkProgress: (progress) => set({ workProgress: progress }),
}));