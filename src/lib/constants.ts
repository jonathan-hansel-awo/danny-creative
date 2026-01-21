export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    verySlow: 1.2,
  },
  ease: {
    outExpo: [0.19, 1, 0.22, 1],
    outQuad: [0.25, 0.46, 0.45, 0.94],
    outCubic: [0.33, 1, 0.68, 1],
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const Z_INDEX = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  cursor: 500,
  max: 9999,
} as const;

export const PARALLAX_SPEEDS = {
  background: 0.2,
  far: 0.4,
  mid: 0.6,
  near: 0.8,
  base: 1,
  foreground: 1.1,
} as const;

export const PARTICLE_CONFIG = {
  countDesktop: 50,
  countMobile: 25,
  minSize: 2,
  maxSize: 6,
  cursorRadius: 150,
  driftSpeed: 0.3,
} as const;

export const COLORS = {
  dark: {
    bg: "#0a0a0a",
    text: "#f5f0e8",
  },
  light: {
    bg: "#faf9f6",
    text: "#1a1a1a",
  },
  coral: {
    default: "#e07a5f",
    dark: "#c96a4f",
    light: "#e8998d",
  },
} as const;
