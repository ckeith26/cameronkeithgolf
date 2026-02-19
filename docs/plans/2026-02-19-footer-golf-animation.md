# Footer Golf Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a looping stick-figure golf animation strip to the bottom of the footer.

**Architecture:** Single `"use client"` component (`GolfAnimation.tsx`) using SVG elements animated with Framer Motion. The component renders below existing footer content inside `Footer.tsx`. All animation is declarative via Framer Motion variants and keyframe arrays.

**Tech Stack:** React 19, Framer Motion 12, Tailwind CSS 4, SVG

---

### Task 1: Create the GolfAnimation component with static SVG scene

**Files:**
- Create: `src/components/layout/GolfAnimation.tsx`

**Step 1: Create static SVG with all scene elements**

Build the full static scene: ground line, stick figure golfer (left side), flag + hole (right side), ball at golfer's feet. Use the project's color tokens (`#71717a` for foreground-subtle, `#10b981` for accent/flag). ViewBox `0 0 800 60` for a wide strip. The stick figure is ~50px tall: circle head (r=4), line body, two arm lines, two leg lines. Club is a line from the hand area.

```tsx
"use client";

import { motion } from "framer-motion";

const COLOR = "#71717a";       // foreground-subtle
const ACCENT = "#10b981";      // accent green for flag
const BALL_COLOR = "#fafafa";  // foreground white

export function GolfAnimation() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 800 70"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ground line */}
        <line x1="0" y1="65" x2="800" y2="65" stroke={COLOR} strokeWidth="1" strokeOpacity="0.3" />

        {/* Flag + hole on right */}
        <rect x="680" y="63" width="20" height="4" rx="1" fill={COLOR} fillOpacity="0.5" />
        <line x1="690" y1="30" x2="690" y2="63" stroke={COLOR} strokeWidth="1.5" />
        <polygon points="690,30 710,37 690,44" fill={ACCENT} fillOpacity="0.7" />

        {/* Golfer group — positioned at left */}
        <g transform="translate(80, 15)">
          {/* Head */}
          <circle cx="0" cy="0" r="4" fill="none" stroke={COLOR} strokeWidth="1.5" />
          {/* Body */}
          <line x1="0" y1="4" x2="0" y2="25" stroke={COLOR} strokeWidth="1.5" />
          {/* Left leg */}
          <line x1="0" y1="25" x2="-7" y2="48" stroke={COLOR} strokeWidth="1.5" />
          {/* Right leg */}
          <line x1="0" y1="25" x2="7" y2="48" stroke={COLOR} strokeWidth="1.5" />
          {/* Arms + club — this group rotates during swing */}
          <g>
            {/* Left arm */}
            <line x1="0" y1="10" x2="-10" y2="20" stroke={COLOR} strokeWidth="1.5" />
            {/* Right arm */}
            <line x1="0" y1="10" x2="10" y2="20" stroke={COLOR} strokeWidth="1.5" />
            {/* Club */}
            <line x1="10" y1="20" x2="18" y2="12" stroke={COLOR} strokeWidth="1.5" />
          </g>
        </g>

        {/* Ball */}
        <circle cx="95" cy="61" r="3" fill={BALL_COLOR} />
      </svg>
    </div>
  );
}
```

**Step 2: Verify it renders**

Add it to Footer.tsx temporarily after the existing content `div`, inside the `<footer>` tag, and check the dev server.

---

### Task 2: Animate the golf swing

**Files:**
- Modify: `src/components/layout/GolfAnimation.tsx`

**Step 1: Animate the arms/club group with a swing motion**

Wrap the arms+club `<g>` in a `<motion.g>` with `transformOrigin` at the shoulder (0, 10). Animate `rotate` through keyframes: backswing (raise club back), then swing through. Use a Framer Motion variant with `transition: { repeat: Infinity, repeatDelay: 4, duration: 0.6 }` and keyframes `[0, -60, 30, 0]` for the rotation.

**Step 2: Add a subtle body dip during the swing**

Wrap the entire golfer `<g>` in `<motion.g>` and add a small `translateY` keyframe (`[0, 0, 2, 0]`) synced to the same timing.

---

### Task 3: Animate the ball flight arc

**Files:**
- Modify: `src/components/layout/GolfAnimation.tsx`

**Step 1: Replace the static ball with a motion.circle**

The ball should:
- Start at the golfer's feet (cx=95, cy=61)
- Launch on an arc to the hole (cx=690, cy=63)
- Use Framer Motion keyframes for `cx` and `cy` to create a parabolic arc
- `cx` keyframes: `[95, 250, 400, 550, 680, 690, 690]`
- `cy` keyframes: `[61, 20, 10, 20, 50, 63, 63]` (arc up then down, small bounce)
- Delay the ball launch ~0.4s after the swing starts (so the club "hits" first)
- Duration ~1.5s for flight
- Ball opacity: 1 during flight, 0 after reaching hole (sinks into cup)

**Step 2: Sync timing with the swing**

Total loop: swing (0.6s) + ball flight (1.5s delayed 0.4s from swing start) + celebration (1s) + pause (2s) ≈ 5.5s total. Use `transition.delay` and `repeatDelay` to keep everything in sync.

---

### Task 4: Animate the celebration

**Files:**
- Modify: `src/components/layout/GolfAnimation.tsx`

**Step 1: Add celebration keyframes to the golfer**

After the ball reaches the hole (~2s into the loop):
- Arms go up: rotate arms group to raise both arms overhead
- Golfer jumps: `translateY` keyframes `[0, 0, ..., -8, 0, -6, 0]` for 2-3 small bounces
- Time this to start after ball reaches hole and end before the loop pause

**Step 2: Reset all elements to starting position before loop repeats**

All keyframe arrays should end at their starting values so the loop is seamless.

---

### Task 5: Integrate into Footer and add reduced-motion support

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/GolfAnimation.tsx`

**Step 1: Add GolfAnimation to Footer**

```tsx
import { GolfAnimation } from "./GolfAnimation";

// Inside the <footer> tag, after the existing content div:
<GolfAnimation />
```

**Step 2: Add reduced-motion support**

Use `useReducedMotion()` from Framer Motion (already used elsewhere in the project). If true, render the static scene only (golfer standing, ball at feet, no animation).

**Step 3: Verify the full loop**

Check in the browser that the sequence plays: swing → ball arc → ball into hole → celebration → pause → repeat. Confirm the animation is subtle and muted, matching the site's aesthetic.
