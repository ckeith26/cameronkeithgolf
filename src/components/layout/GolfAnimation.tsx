"use client";

import { motion, useReducedMotion } from "framer-motion";

// ── Colors ──
const COLOR_SUBTLE = "#71717a"; // foreground-subtle: stick figure, ground, hole
const COLOR_ACCENT = "#10b981"; // accent green: flag
const COLOR_BALL = "#fafafa"; // foreground white: ball

// ── Timing ──
// Total loop is 5.5s. Every animation uses the full loop duration with
// `times` arrays (0–1 fractions) to place keyframes at exact moments.
// This keeps all repeating animations perfectly synchronized.
const LOOP = 5.5;

/** Convert a time in seconds to a 0–1 fraction of the loop. */
const t = (s: number) => Math.round((s / LOOP) * 10000) / 10000;

// Phase boundaries (seconds):
//   Swing:       0.0 – 0.6
//   Ball flight: 0.4 – 1.9
//   Celebration: 2.0 – 3.0
//   Pause:       3.0 – 5.5

export function GolfAnimation() {
  const prefersReducedMotion = useReducedMotion();

  // ── Static scene elements (ground, hole, flag) ──
  const staticScene = (
    <>
      {/* Ground line */}
      <line
        x1={0}
        y1={65}
        x2={800}
        y2={65}
        stroke={COLOR_SUBTLE}
        strokeWidth={1.5}
        opacity={0.3}
      />

      {/* Hole rect */}
      <rect
        x={680}
        y={63}
        width={20}
        height={4}
        fill={COLOR_SUBTLE}
        stroke={COLOR_SUBTLE}
        strokeWidth={1}
      />

      {/* Flagpole */}
      <line
        x1={690}
        y1={30}
        x2={690}
        y2={63}
        stroke={COLOR_SUBTLE}
        strokeWidth={1.5}
      />

      {/* Flag triangle */}
      <polygon
        points="690,30 710,37 690,44"
        fill={COLOR_ACCENT}
        opacity={0.7}
      />
    </>
  );

  // ── Reduced motion: static scene, golfer standing, ball at feet ──
  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 800 70"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
        >
          {staticScene}

          {/* Static golfer */}
          <g
            transform="translate(80,15)"
            stroke={COLOR_SUBTLE}
            strokeWidth={1.5}
            fill="none"
          >
            <circle cx={0} cy={4} r={4} />
            <line x1={0} y1={4} x2={0} y2={25} />
            <line x1={0} y1={25} x2={-7} y2={48} />
            <line x1={0} y1={25} x2={7} y2={48} />
            <g>
              <line x1={0} y1={10} x2={-10} y2={20} />
              <line x1={0} y1={10} x2={10} y2={20} />
              <line x1={10} y1={20} x2={18} y2={12} />
            </g>
          </g>

          <circle cx={95} cy={61} r={3} fill={COLOR_BALL} />
        </svg>
      </div>
    );
  }

  // ── Animated scene ──
  // All animations share `duration: LOOP` and `repeat: Infinity` with
  // `ease: "linear"` so the `times` placement is exact.
  const baseTransition = {
    duration: LOOP,
    repeat: Infinity,
    ease: "linear" as const,
  };

  // ── Combined times array for golfer body (swing dip + celebration jumps) ──
  // 10 keyframes: rest → swing dip → rest → celebration jumps → rest
  const golferTimes = [
    0,        // 0.0s  rest
    t(0.2),   // 0.2s  swing starts
    t(0.4),   // 0.4s  dip (impact)
    t(0.6),   // 0.6s  recover
    t(2.0),   // 2.0s  hold rest until celebration
    t(2.25),  // 2.25s first jump up
    t(2.5),   // 2.5s  land
    t(2.75),  // 2.75s second jump up
    t(3.0),   // 3.0s  land
    1,        // 5.5s  hold rest (loops back to 0)
  ];

  const golferY = [0, 0, 2, 0, 0, -8, 0, -6, 0, 0];

  // ── Combined times array for arms+club (swing rotation + celebration raise) ──
  const armsTimes = [
    0,        // 0.0s  rest
    t(0.2),   // 0.2s  backswing
    t(0.4),   // 0.4s  follow-through
    t(0.6),   // 0.6s  return to rest
    t(1.9),   // 1.9s  hold rest (wait for ball to sink)
    t(2.0),   // 2.0s  begin celebration raise
    t(2.25),  // 2.25s arms overhead
    t(2.75),  // 2.75s still overhead
    t(3.0),   // 3.0s  arms back down
    1,        // 5.5s  hold rest
  ];

  const armsRotate = [0, -60, 30, 0, 0, 0, -150, -150, 0, 0];

  // ── Ball flight times ──
  // 9 keyframes: wait at feet → fly arc → sink into cup → hold invisible → reset
  const ballTimes = [
    0,        // 0.0s  at feet
    t(0.4),   // 0.4s  launch
    t(0.65),  // 0.65s rising
    t(0.9),   // 0.9s  peak
    t(1.15),  // 1.15s descending
    t(1.55),  // 1.55s approaching hole
    t(1.75),  // 1.75s at the cup
    t(1.9),   // 1.9s  sunk
    1,        // 5.5s  reset
  ];

  const ballCx = [95, 95, 250, 400, 550, 680, 690, 690, 95];
  const ballCy = [61, 61, 20, 10, 20, 50, 63, 63, 61];
  const ballOpacity = [1, 1, 1, 1, 1, 1, 0.5, 0, 1];

  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 70"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto"
      >
        {staticScene}

        {/* ── Animated golfer ── */}
        <g transform="translate(80,15)" stroke={COLOR_SUBTLE} strokeWidth={1.5} fill="none">
          <motion.g
            animate={{ y: golferY }}
            transition={{ y: { ...baseTransition, times: golferTimes } }}
          >
            {/* Head */}
            <circle cx={0} cy={4} r={4} />
            {/* Body */}
            <line x1={0} y1={4} x2={0} y2={25} />
            {/* Left leg */}
            <line x1={0} y1={25} x2={-7} y2={48} />
            {/* Right leg */}
            <line x1={0} y1={25} x2={7} y2={48} />

            {/* Arms + club group: swing rotation then celebration raise */}
            <motion.g
              style={{ transformBox: "fill-box", transformOrigin: "0px 10px" }}
              animate={{ rotate: armsRotate }}
              transition={{ rotate: { ...baseTransition, times: armsTimes } }}
            >
              {/* Left arm */}
              <line x1={0} y1={10} x2={-10} y2={20} />
              {/* Right arm */}
              <line x1={0} y1={10} x2={10} y2={20} />
              {/* Club */}
              <line x1={10} y1={20} x2={18} y2={12} />
            </motion.g>
          </motion.g>
        </g>

        {/* ── Animated ball ── */}
        <motion.circle
          r={3}
          fill={COLOR_BALL}
          animate={{
            cx: ballCx,
            cy: ballCy,
            opacity: ballOpacity,
          }}
          transition={{
            cx: { ...baseTransition, times: ballTimes },
            cy: { ...baseTransition, times: ballTimes },
            opacity: { ...baseTransition, times: ballTimes },
          }}
        />
      </svg>
    </div>
  );
}
