"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import {
  GOLF_LANDSCAPE,
  GOLFER_KEYFRAMES,
  GOLFER_ROW_OFFSET,
  GOLFER_COL_OFFSET,
  BALL_ARC,
  BALL_CHAR,
  BALL_TRAIL_CHAR,
  ASCII_COLORS,
  getSceneCharColor,
} from "@/data/ascii-frames";

interface AsciiSwingAnimationProps {
  className?: string;
}

// ── Timing ──
const REVEAL_STAGGER_MS = 35;       // per-row delay for landscape reveal
const SWING_FRAME_MS = 130;         // per golfer keyframe
const BALL_STEP_MS = 60;            // per ball arc position
const PAUSE_AFTER_REVEAL_MS = 300;
const PAUSE_AFTER_SWING_MS = 200;

type Phase = "idle" | "reveal" | "swing" | "flight" | "complete";

/**
 * Compose a single display frame by overlaying golfer + ball onto the landscape.
 */
function composeScene(
  golferIdx: number | null,
  ballIdx: number | null
): string[][] {
  // Deep copy landscape
  const grid = GOLF_LANDSCAPE.map((row) => row.split(""));

  // Overlay golfer keyframe
  if (golferIdx !== null && golferIdx < GOLFER_KEYFRAMES.length) {
    const kf = GOLFER_KEYFRAMES[golferIdx];
    for (let r = 0; r < kf.rows.length; r++) {
      const targetRow = GOLFER_ROW_OFFSET + r;
      if (targetRow >= grid.length) break;
      for (let c = 0; c < kf.rows[r].length; c++) {
        const ch = kf.rows[r][c];
        if (ch !== " ") {
          const targetCol = GOLFER_COL_OFFSET + c;
          if (targetCol < grid[targetRow].length) {
            grid[targetRow][targetCol] = ch;
          }
        }
      }
    }
  }

  // Overlay ball + trail
  if (ballIdx !== null) {
    // Trail dots for previous positions
    const trailStart = Math.max(0, ballIdx - 3);
    for (let t = trailStart; t < ballIdx; t++) {
      const [br, bc] = BALL_ARC[t];
      if (br < grid.length && bc < grid[br].length) {
        grid[br][bc] = BALL_TRAIL_CHAR;
      }
    }
    // Current ball position
    const [br, bc] = BALL_ARC[ballIdx];
    if (br < grid.length && bc < grid[br].length) {
      grid[br][bc] = BALL_CHAR;
    }
  }

  return grid;
}

export function AsciiSwingAnimation({ className }: AsciiSwingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealedRows, setRevealedRows] = useState<Set<number>>(new Set());
  const [golferIdx, setGolferIdx] = useState<number | null>(null);
  const [ballIdx, setBallIdx] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const totalRows = GOLF_LANDSCAPE.length;

  // IntersectionObserver — auto-play on viewport enter
  useEffect(() => {
    if (hasStarted) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Phase 1: Landscape reveal (bottom-to-top)
  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;
    setPhase("reveal");

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < totalRows; i++) {
      const rowIdx = totalRows - 1 - i; // bottom-to-top
      timeouts.push(
        setTimeout(() => {
          setRevealedRows((prev) => new Set(prev).add(rowIdx));
        }, i * REVEAL_STAGGER_MS)
      );
    }

    // Transition to swing phase after all rows revealed
    timeouts.push(
      setTimeout(() => {
        setPhase("swing");
      }, totalRows * REVEAL_STAGGER_MS + PAUSE_AFTER_REVEAL_MS)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [hasStarted, prefersReducedMotion, totalRows]);

  // Phase 2: Swing sequence
  useEffect(() => {
    if (phase !== "swing") return;

    setGolferIdx(0);
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      if (frame >= GOLFER_KEYFRAMES.length) {
        clearInterval(id);
        setTimeout(() => setPhase("flight"), PAUSE_AFTER_SWING_MS);
        return;
      }
      setGolferIdx(frame);
    }, SWING_FRAME_MS);

    return () => clearInterval(id);
  }, [phase]);

  // Phase 3: Ball flight
  useEffect(() => {
    if (phase !== "flight") return;

    setBallIdx(0);
    let step = 0;
    const id = setInterval(() => {
      step++;
      if (step >= BALL_ARC.length) {
        clearInterval(id);
        setPhase("complete");
        return;
      }
      setBallIdx(step);
    }, BALL_STEP_MS);

    return () => clearInterval(id);
  }, [phase]);

  // Compose the current scene
  const grid = useMemo(() => {
    if (prefersReducedMotion) {
      // Show final state: golfer at finish, ball at pin
      return composeScene(
        GOLFER_KEYFRAMES.length - 1,
        BALL_ARC.length - 1
      );
    }
    return composeScene(golferIdx, ballIdx);
  }, [golferIdx, ballIdx, prefersReducedMotion]);

  // For reduced motion, show all rows
  const isRowVisible = (rowIdx: number) => {
    if (prefersReducedMotion) return true;
    if (phase === "idle") return false;
    return revealedRows.has(rowIdx);
  };

  return (
    <div
      ref={containerRef}
      className={`flex justify-center overflow-hidden ${className ?? ""}`}
      aria-label="ASCII animation of a golf swing on a panoramic course"
      role="img"
    >
      <pre className="font-mono text-[0.5rem] sm:text-xs md:text-sm select-none leading-tight">
        {grid.map((row, rowIdx) => {
          const visible = isRowVisible(rowIdx);
          return (
            <div
              key={rowIdx}
              className="whitespace-pre"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease-out",
              }}
            >
              {row.map((char, colIdx) => {
                if (char === " ") return <span key={colIdx}> </span>;

                const isGolferRegion =
                  rowIdx >= GOLFER_ROW_OFFSET &&
                  rowIdx < GOLFER_ROW_OFFSET + 8 &&
                  colIdx >= GOLFER_COL_OFFSET &&
                  colIdx < GOLFER_COL_OFFSET + 8;

                const colorKey = getSceneCharColor(
                  char,
                  rowIdx,
                  colIdx,
                  isGolferRegion
                );

                return (
                  <span key={colIdx} style={{ color: ASCII_COLORS[colorKey] }}>
                    {char}
                  </span>
                );
              })}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
