// ── ASCII Art Data ──────────────────────────────────────────
// Golf scene compositing data, neural network art, character grid pool

/** Color tokens used by the rendering components */
export const ASCII_COLORS = {
  golfer: "#a1a1aa",    // zinc-400 - muted figure
  ball: "#10b981",      // emerald-500 - accent
  flag: "#10b981",      // emerald-500 - accent
  ground: "#71717a",    // zinc-500 - subtle
  terrain: "#3f3f46",   // zinc-700 - contours
  default: "#a1a1aa",   // zinc-400
  node: "#10b981",      // emerald-500 - neural net nodes
  connection: "#52525b", // zinc-600 - neural net connections
} as const;

// ── Golf Scene - Panoramic Landscape ─────────────────────
// 18 lines tall, max 58 chars wide
// The golfer region is composited at rows 4-11, cols 10-18

export const GOLF_LANDSCAPE: string[] = [
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                                          ",
  "                                           ___            ",
  "    __                                   /   |      F     ",
  "  /    \\          . .    .    .  .      /    |      |     ",
  " /      \\___  .      .     .     . __/      |______|     ",
  "/            \\___. . .  . .  . . /                        ",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
];

/** Golfer region: composited onto rows 4-11, starting at col 10 */
export interface GolferKeyframe {
  /** Rows of golfer art - composited at GOLFER_ROW_OFFSET */
  rows: string[];
}

export const GOLFER_ROW_OFFSET = 4;
export const GOLFER_COL_OFFSET = 10;

export const GOLFER_KEYFRAMES: GolferKeyframe[] = [
  // 0: Address
  { rows: [
    "        ",
    "   @    ",
    "  /|\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 1: Takeaway
  { rows: [
    "        ",
    "   @    ",
    "  /|_   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 2: Backswing mid
  { rows: [
    "      / ",
    "   @ /  ",
    "  /|/   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 3: Backswing top
  { rows: [
    "   __/  ",
    "   @    ",
    "  /|\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 4: Downswing start
  { rows: [
    "    /   ",
    "   @/   ",
    "  /|\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 5: Downswing mid
  { rows: [
    "        ",
    "   @|   ",
    "  /|\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 6: Downswing low
  { rows: [
    "        ",
    "   @    ",
    "  /|\\   ",
    "   | \\  ",
    "  / \\ \\ ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 7: Impact
  { rows: [
    "        ",
    "   @    ",
    "  /|\\   ",
    "   |    ",
    "  / \\___",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 8: Follow-through low
  { rows: [
    "        ",
    "   @    ",
    "  /|\\   ",
    "   | /  ",
    "  / /   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 9: Follow-through high
  { rows: [
    "    /   ",
    "   @/   ",
    "  /|\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
  // 10: Finish position
  { rows: [
    "   __/  ",
    "   @    ",
    "   |\\   ",
    "   |    ",
    "  / \\   ",
    "   |    ",
    "  _|    ",
    " / |    ",
  ]},
];

/** Ball arc positions: [row, col] on the landscape grid */
export const BALL_ARC: [number, number][] = [
  [11, 19],  // launch
  [9, 22],
  [7, 26],
  [5, 30],
  [4, 33],
  [3, 36],   // apex
  [3, 39],
  [4, 42],
  [5, 44],
  [7, 46],
  [9, 48],
  [11, 50],
  [13, 52],  // landing near flag
  [14, 53],  // at pin
];

/** Trail character for ball flight */
export const BALL_TRAIL_CHAR = "·";
export const BALL_CHAR = "o";
export const FLAG_COL = 53;

/**
 * Character-level color classification for the golf scene.
 */
export function getCharColor(char: string): keyof typeof ASCII_COLORS {
  if (char === "o" || char === "·") return "ball";
  if (char === "F") return "flag";
  if (char === "." || char === "~") return "ground";
  if (char === "_" && false) return "terrain"; // handled contextually
  if (char === "@" || char === "/" || char === "\\" || char === "|") return "golfer";
  return "default";
}

/**
 * Contextual color for golf landscape characters.
 * Uses row position to distinguish terrain from golfer.
 */
export function getSceneCharColor(
  char: string,
  row: number,
  col: number,
  isGolferRegion: boolean
): keyof typeof ASCII_COLORS {
  if (char === " ") return "default";
  if (char === "o" || char === "·") return "ball";
  if (char === "F") return "flag";
  if (char === "~") return "ground";
  if (char === ".") return "ground";
  // Terrain contours (lower rows)
  if (row >= 12 && !isGolferRegion) {
    if (char === "_" || char === "/" || char === "\\" || char === "|") return "terrain";
  }
  // Golfer region chars
  if (isGolferRegion) {
    if (char === "@" || char === "/" || char === "\\" || char === "|" || char === "_") return "golfer";
  }
  return "default";
}

// ── Neural Network ASCII Art ─────────────────────────────
// 10 lines, ~50 chars wide

export const NEURAL_NET_ART: string[] = [
  "    golf ── O ─\\   /─ O ─\\   /─ O ── build     ",
  "                \\ /       \\ /                    ",
  "     cs  ── O ───X─── O ───X─── O ── compete    ",
  "                / \\       / \\                    ",
  "    econ ── O ─/   \\─ O ─/   \\─ O ── research  ",
  "                                                  ",
  "          input     hidden      output            ",
];

/** Characters that represent nodes in the neural network */
export const NEURAL_NODE_CHARS = new Set(["O"]);
export const NEURAL_LABEL_CHARS = new Set([
  "g", "o", "l", "f", "c", "s", "e", "n", "b", "u", "i", "d",
  "m", "p", "t", "r", "a", "h", "k", "w", "x",
]);

// ── Character Grid Pool ──────────────────────────────────

export const CHAR_POOL = "$%0123456789+-*/=~^{}[]<>|&@#".split("");

// ── Divider Variants ─────────────────────────────────────
// (kept for backwards compat, neuralNet uses NEURAL_NET_ART directly)

export const DIVIDER_ART = {
  golfBall: [
    "        . o .        ",
    "      '       '      ",
    "        ' . '        ",
  ].join("\n"),

  flagPin: [
    "          F          ",
    "         /|          ",
    "  ....../ |......    ",
    "          |          ",
  ].join("\n"),

  neuralNet: NEURAL_NET_ART.join("\n"),
} as const;

export type DividerVariant = keyof typeof DIVIDER_ART;
