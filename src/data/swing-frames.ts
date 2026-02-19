export const SWING_FRAMES = {
  directory: "/frames/swing",
  totalFrames: 93,
  format: "webp",
  placeholder: "/frames/swing/placeholder-blur.webp",
  getFramePath: (index: number): string => {
    const padded = String(index + 1).padStart(3, "0");
    return `/frames/swing/frame-${padded}.webp`;
  },
} as const;
