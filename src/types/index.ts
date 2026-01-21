export type Room = "dark" | "light";

export type AnimationType =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale";

export interface ParallaxConfig {
  speed: number;
  direction?: "vertical" | "horizontal";
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  driftSpeed: number;
  oscillationFrequency: number;
  oscillationAmplitude: number;
}

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year?: string;
  image: string;
  video?: string;
  href: string;
}

export interface Service {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}
