"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { CHAR_POOL } from "@/data/ascii-frames";

interface CharacterGridProps {
  className?: string;
}

const ROWS = 8;
const CELL_MIN_PX = 12;
const CYCLE_INTERVAL_MS = 150;
const CELLS_PER_CYCLE = 4;

// Color tiers
const COLOR_DIM = "#27272a";
const COLOR_MED = "#52525b";
const COLOR_ACCENT = "#10b981";

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function randomColor(): string {
  const r = Math.random();
  if (r < 0.7) return COLOR_DIM;
  if (r < 0.9) return COLOR_MED;
  return COLOR_ACCENT;
}

/** Inject shimmer keyframes once */
function useShimmerAnimation() {
  useEffect(() => {
    const id = "character-grid-shimmer";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
@keyframes cg-shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}`;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
}

export function CharacterGrid({ className }: CharacterGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<HTMLSpanElement[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [cols, setCols] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useShimmerAnimation();

  // Measure columns from container width
  const measureCols = useCallback(() => {
    if (!gridRef.current) return;
    const width = gridRef.current.clientWidth;
    const computed = Math.floor(width / CELL_MIN_PX);
    setCols(Math.max(computed, 10));
  }, []);

  useEffect(() => {
    measureCols();
    const handler = () => measureCols();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [measureCols]);

  // IntersectionObserver trigger
  useEffect(() => {
    if (hasStarted) return;
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Character cycling via direct DOM mutation
  useEffect(() => {
    if (!hasStarted || prefersReducedMotion || cols === 0) return;

    const totalCells = ROWS * cols;
    const id = setInterval(() => {
      for (let i = 0; i < CELLS_PER_CYCLE; i++) {
        const idx = Math.floor(Math.random() * totalCells);
        const cell = cellRefs.current[idx];
        if (cell) {
          cell.textContent = randomChar();
        }
      }
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [hasStarted, prefersReducedMotion, cols]);

  const totalCells = ROWS * cols;

  return (
    <div
      ref={gridRef}
      className={`w-full overflow-hidden select-none ${className ?? ""}`}
      aria-hidden="true"
      style={{ height: `${ROWS * 24}px` }}
    >
      {cols > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, minmax(${CELL_MIN_PX}px, 1fr))`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            height: "100%",
            fontFamily: "var(--font-geist-mono, monospace)",
            fontSize: "0.7rem",
            lineHeight: 1,
          }}
        >
          {Array.from({ length: totalCells }, (_, i) => {
            const color = randomColor();
            const isAccent = color === COLOR_ACCENT;
            // Stagger shimmer delay for accent cells
            const shimmerDelay = isAccent && !prefersReducedMotion
              ? `${(i % 20) * 0.15}s`
              : undefined;

            return (
              <span
                key={i}
                ref={(el) => {
                  if (el) cellRefs.current[i] = el;
                }}
                style={{
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...(isAccent && !prefersReducedMotion
                    ? {
                        animation: `cg-shimmer 3s ease-in-out infinite`,
                        animationDelay: shimmerDelay,
                      }
                    : {}),
                }}
              >
                {randomChar()}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
