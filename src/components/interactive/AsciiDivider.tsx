"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  DIVIDER_ART,
  ASCII_COLORS,
  getCharColor,
  NEURAL_NODE_CHARS,
  type DividerVariant,
} from "@/data/ascii-frames";

interface AsciiDividerProps {
  variant: DividerVariant;
  /** Enable left-to-right column-based reveal (ideal for neuralNet) */
  positionAwareReveal?: boolean;
  className?: string;
}

const CHAR_DELAY_MS = 30;
const COLUMN_REVEAL_TOTAL_MS = 2000; // total time for position-aware reveal

/** Inject node pulse keyframes once */
function useNodePulseAnimation() {
  useEffect(() => {
    const id = "ascii-node-pulse";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
@keyframes ascii-node-pulse {
  0%, 100% { color: ${ASCII_COLORS.node}; }
  50% { color: #34d399; text-shadow: 0 0 6px ${ASCII_COLORS.node}40; }
}`;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
}

export function AsciiDivider({
  variant,
  positionAwareReveal = false,
  className,
}: AsciiDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullText = DIVIDER_ART[variant];
  const totalChars = fullText.length;
  const lines = fullText.split("\n");

  const [revealedCount, setRevealedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useNodePulseAnimation();

  // Calculate max column for position-aware reveal timing
  const maxCol = positionAwareReveal
    ? Math.max(...lines.map((l) => l.length))
    : 0;

  // IntersectionObserver trigger
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
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Standard typing reveal (non position-aware)
  useEffect(() => {
    if (!hasStarted || prefersReducedMotion || positionAwareReveal) return;

    let count = 0;
    const id = setInterval(() => {
      count++;
      setRevealedCount(count);
      if (count >= totalChars) clearInterval(id);
    }, CHAR_DELAY_MS);

    return () => clearInterval(id);
  }, [hasStarted, prefersReducedMotion, totalChars, positionAwareReveal]);

  // ── Position-Aware Reveal Mode ──
  if (positionAwareReveal) {
    const isVisible = hasStarted || prefersReducedMotion;

    return (
      <div
        ref={containerRef}
        className={`flex justify-center py-4 ${className ?? ""}`}
        aria-hidden="true"
      >
        <pre className="font-mono text-xs sm:text-sm select-none text-center">
          {lines.map((line, lineIdx) => (
            <div key={lineIdx} className="leading-tight whitespace-pre">
              {Array.from(line).map((char, colIdx) => {
                if (char === " ") return <span key={colIdx}> </span>;

                const isNode = NEURAL_NODE_CHARS.has(char);
                const delay = maxCol > 0
                  ? (colIdx / maxCol) * COLUMN_REVEAL_TOTAL_MS
                  : 0;

                // Color: nodes get emerald, connections get connection color
                let color: string;
                if (isNode) {
                  color = ASCII_COLORS.node;
                } else if (
                char === "-" || char === "\\" || char === "/" ||
                char === "|" || char === ">" || char === "X" ||
                char === "─" || char === "│" || char === "┬" ||
                char === "┼" || char === "┴"
              ) {
                  color = ASCII_COLORS.connection;
                } else {
                  color = ASCII_COLORS[getCharColor(char)];
                }

                return (
                  <span
                    key={colIdx}
                    style={{
                      color,
                      opacity: prefersReducedMotion ? 1 : (isVisible ? 1 : 0),
                      transition: `opacity 0.3s ease-out`,
                      transitionDelay: prefersReducedMotion ? "0ms" : `${delay}ms`,
                      ...(isNode && isVisible && !prefersReducedMotion
                        ? {
                            animation: "ascii-node-pulse 2s ease-in-out infinite",
                            animationDelay: `${delay + 300}ms`,
                          }
                        : {}),
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </pre>
      </div>
    );
  }

  // ── Standard Typing Reveal Mode ──
  const displayCount = prefersReducedMotion ? totalChars : revealedCount;
  const visibleText = fullText.slice(0, displayCount);
  const visibleLines = visibleText.split("\n");

  return (
    <div
      ref={containerRef}
      className={`flex justify-center py-4 ${className ?? ""}`}
      aria-hidden="true"
    >
      <pre className="font-mono text-xs sm:text-sm select-none text-center">
        {visibleLines.map((line, lineIdx) => (
          <div key={lineIdx} className="leading-tight whitespace-pre">
            {Array.from(line).map((char, charIdx) => {
              if (char === " ") return <span key={charIdx}> </span>;
              const colorKey = getCharColor(char);
              return (
                <span key={charIdx} style={{ color: ASCII_COLORS[colorKey] }}>
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </pre>
    </div>
  );
}
