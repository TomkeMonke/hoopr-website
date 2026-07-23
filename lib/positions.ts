/**
 * Shared position data. Keep in sync with dictionaries[locale].positions.
 * `slug` maps to /training/[position] and to the dictionary key.
 */
export const POSITION_SLUGS = [
  "point-guard",
  "shooting-guard",
  "small-forward",
  "power-forward",
  "center",
] as const;
export type PositionSlug = (typeof POSITION_SLUGS)[number];

/** Render order for focus-breakdown bars (PositionPicker + position pages). */
export const FOCUS_CATEGORIES = ["strength", "cardio", "agility", "flexibility"] as const;
export type FocusCategory = (typeof FOCUS_CATEGORIES)[number];

export type PositionFocus = Record<FocusCategory, number>;

export interface PositionData {
  slug: PositionSlug;
  /** Tints for the phone-frame glow + accent UI on the position page */
  accent: string;
  /** Focus % breakdown - must sum to 100 */
  focus: PositionFocus;
}

export const POSITIONS: Record<PositionSlug, PositionData> = {
  "point-guard": {
    slug: "point-guard",
    accent: "#F2711C",
    focus: { strength: 15, cardio: 35, agility: 35, flexibility: 15 },
  },
  "shooting-guard": {
    slug: "shooting-guard",
    accent: "#FF9142",
    focus: { strength: 25, cardio: 25, agility: 35, flexibility: 15 },
  },
  "small-forward": {
    slug: "small-forward",
    accent: "#E8A44A",
    focus: { strength: 30, cardio: 25, agility: 30, flexibility: 15 },
  },
  "power-forward": {
    slug: "power-forward",
    accent: "#E8623A",
    focus: { strength: 40, cardio: 15, agility: 25, flexibility: 20 },
  },
  center: {
    slug: "center",
    accent: "#D98A2B",
    focus: { strength: 45, cardio: 10, agility: 20, flexibility: 25 },
  },
};

export function isPositionSlug(value: string): value is PositionSlug {
  return (POSITION_SLUGS as readonly string[]).includes(value);
}
