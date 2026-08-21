/**
 * Default cover polaroid placement — percentages of the stage.
 * Anchors are photo centers. Reload always restores this composition.
 */
export type CoverPhotoSlot = {
  top: number;
  left: number;
  width: string;
  rotate: number;
};

const W = {
  sm: "clamp(3.8rem, 9.2vw, 7.4rem)",
  md: "clamp(4.4rem, 10.8vw, 8.8rem)",
  lg: "clamp(4.9rem, 12vw, 9.8rem)",
} as const;

/**
 * Exact opening positions matching the approved cover screenshot.
 * Key = public image path.
 */
export const COVER_OPENING_LAYOUT: Record<string, CoverPhotoSlot> = {
  /* —— Left —— */
  "/chapters/01.jpg": {
    top: 11,
    left: 14,
    width: W.md,
    rotate: -8,
  },
  "/chapters/05.jpg": {
    top: 34,
    left: 8,
    width: W.lg,
    rotate: 4,
  },
  "/chapters/02.jpg": {
    top: 48,
    left: 9,
    width: W.md,
    rotate: 6,
  },
  "/chapters/09.jpg": {
    top: 54,
    left: 23,
    width: W.sm,
    rotate: 5,
  },
  "/chapters/03.jpg": {
    top: 76,
    left: 11,
    width: W.lg,
    rotate: 5,
  },
  "/chapters/04.jpg": {
    top: 82,
    left: 27,
    width: W.md,
    rotate: 4,
  },

  /* —— Right —— */
  "/chapters/07.jpg": {
    top: 12,
    left: 90,
    width: W.md,
    rotate: 6,
  },
  "/chapters/08.jpg": {
    top: 30,
    left: 92,
    width: W.md,
    rotate: 5,
  },
  "/chapters/06.jpg": {
    top: 10,
    left: 76,
    width: W.md,
    rotate: -5,
  },
  "/cover/extra-03.jpg": {
    top: 58,
    left: 91,
    width: W.md,
    rotate: 5,
  },
  "/chapters/10.jpg": {
    top: 80,
    left: 84,
    width: W.lg,
    rotate: 6,
  },
  "/chapters/11.jpg": {
    top: 42,
    left: 88,
    width: W.md,
    rotate: -4,
  },
  "/chapters/12.jpg": {
    top: 68,
    left: 74,
    width: W.sm,
    rotate: 5,
  },
};

/** Fallback ring if a new image is added without a slot yet */
export const COVER_LAYOUT_FALLBACK: CoverPhotoSlot[] = [
  { top: 18, left: 18, width: W.sm, rotate: -4 },
  { top: 70, left: 18, width: W.sm, rotate: 5 },
  { top: 18, left: 82, width: W.sm, rotate: 4 },
  { top: 70, left: 82, width: W.sm, rotate: -5 },
];
