export interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
}

export const stats: Stat[] = [
  {
    id: "brands",
    value: "50",
    suffix: "+",
    label: "Brands Transformed",
  },
  {
    id: "years",
    value: "8",
    label: "Years of Craft",
  },
  {
    id: "awards",
    value: "12",
    label: "Industry Awards",
  },
];

export const heroStats: Stat[] = [
  {
    id: "projects",
    value: "150",
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    id: "clients",
    value: "50",
    suffix: "+",
    label: "Happy Clients",
  },
  {
    id: "countries",
    value: "12",
    label: "Countries Reached",
  },
];
