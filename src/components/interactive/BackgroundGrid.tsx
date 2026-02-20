"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { CHAR_POOL } from "@/data/ascii-frames";

const CELL_SIZE_PX = 18;
const CYCLE_INTERVAL_MS = 250;
const CELLS_PER_CYCLE = 6;

// ── Secret Messages ──
// Transformer architectures, quant algorithms, AI research terms
const SECRET_MESSAGES = [
  "attention is all you need",
  "Q K V",
  "softmax(QK/√d)V",
  "∇L(θ)",
  "black-scholes",
  "monte carlo",
  "backpropagation",
  "self-attention",
  "residual stream",
  "layer norm",
  "positional encoding",
  "feed forward",
  "multi-head attention",
  "gradient descent",
  "adam optimizer",
  "cross entropy",
  "KL divergence",
  "latent space",
  "embedding dim=512",
  "dropout p=0.1",
  "batch norm",
  "skip connection",
  "vanishing gradient",
  "RLHF",
  "transformer block",
  "mean reversion",
  "sharpe ratio",
  "kelly criterion",
  "pairs trading",
  "stat arb",
  "vol surface",
  "delta hedging",
  "greeks: Δ Γ Θ Ν",
  "E[r] = rf + β(rm-rf)",
  "σ√t",
  "log returns",
  "covariance matrix",
  "eigenportfolio",
  "risk parity",
  "α = r - β·rm",
  "P(x|θ) = ∏ p(xi|θ)",
  "H(p,q) = -Σp·log(q)",
  "∂L/∂w",
  "ReLU(x) = max(0,x)",
  "GELU",
  "rope embeddings",
  "flash attention",
  "kv cache",
  "beam search k=4",
  "temperature=0.7",
  "top_p nucleus",
  "chain of thought",
  "in-context learning",
  "d_model=768",
  "n_heads=12",
  "n_layers=96",
  "context_len=128k",
];

const MESSAGE_INTERVAL_MS = 4000;   // new message every 4s
const MESSAGE_FADE_MS = 2500;       // visible for 2.5s before fading

// Colors
const COLOR_DIM = "#141414";
const COLOR_MED = "#1a1a1a";
const COLOR_ACCENT = "#10b98135";   // emerald at ~21% for twinkle
const COLOR_MSG = "#10b98138";      // emerald at ~22% for secret messages

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function randomColor(): string {
  const r = Math.random();
  if (r < 0.75) return COLOR_DIM;
  if (r < 0.93) return COLOR_MED;
  return COLOR_ACCENT;
}

/** Inject twinkle + message keyframes once */
function useGridAnimations() {
  useEffect(() => {
    const id = "bg-grid-animations";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
@keyframes bg-twinkle {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.7; }
}
@keyframes bg-msg-appear {
  0% { opacity: 0; }
  15% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes bg-wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}`;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);
}

export function BackgroundGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<HTMLSpanElement[]>([]);
  const originalChars = useRef<string[]>([]);
  const originalColors = useRef<string[]>([]);
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });
  const prefersReducedMotion = useReducedMotion();

  useGridAnimations();

  const measure = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setDimensions({
      cols: Math.ceil(w / CELL_SIZE_PX),
      rows: Math.ceil(h / CELL_SIZE_PX),
    });
  }, []);

  useEffect(() => {
    measure();
    const handler = () => measure();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [measure]);

  // Character cycling via direct DOM mutation
  useEffect(() => {
    if (prefersReducedMotion) return;
    const { cols, rows } = dimensions;
    if (cols === 0 || rows === 0) return;

    const totalCells = cols * rows;
    const id = setInterval(() => {
      for (let i = 0; i < CELLS_PER_CYCLE; i++) {
        const idx = Math.floor(Math.random() * totalCells);
        const cell = cellRefs.current[idx];
        if (cell && !cell.dataset.msg) {
          cell.textContent = randomChar();
        }
      }
    }, CYCLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion, dimensions]);

  // Secret message system
  useEffect(() => {
    if (prefersReducedMotion) return;
    const { cols, rows } = dimensions;
    if (cols === 0 || rows === 0) return;

    const id = setInterval(() => {
      const msg = SECRET_MESSAGES[Math.floor(Math.random() * SECRET_MESSAGES.length)];
      if (msg.length > cols - 4) return; // skip if too wide

      // Pick a random row and starting column
      const row = Math.floor(Math.random() * rows);
      const maxStart = cols - msg.length;
      const startCol = Math.floor(Math.random() * maxStart);

      // Write the message into cells
      const affectedIndices: number[] = [];
      for (let c = 0; c < msg.length; c++) {
        const idx = row * cols + startCol + c;
        const cell = cellRefs.current[idx];
        if (!cell) continue;

        affectedIndices.push(idx);

        // Save original state
        originalChars.current[idx] = cell.textContent || "";
        originalColors.current[idx] = cell.style.color;

        // Set message character
        cell.textContent = msg[c];
        cell.style.color = msg[c] === " " ? COLOR_DIM : COLOR_MSG;
        cell.dataset.msg = "1";
        cell.style.animation = `bg-msg-appear ${MESSAGE_FADE_MS}ms ease-in-out forwards`;
      }

      // Restore after fade
      setTimeout(() => {
        for (const idx of affectedIndices) {
          const cell = cellRefs.current[idx];
          if (!cell) continue;
          cell.textContent = randomChar();
          cell.style.color = originalColors.current[idx] || COLOR_DIM;
          cell.style.animation = "";
          delete cell.dataset.msg;
        }
      }, MESSAGE_FADE_MS);
    }, MESSAGE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion, dimensions]);

  const { cols, rows } = dimensions;
  const totalCells = cols * rows;

  if (cols === 0) return null;

  return (
    <div
      ref={gridRef}
      className="fixed inset-0 z-0 overflow-hidden select-none"
      style={{ pointerEvents: "none", willChange: "transform" }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE_PX}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE_PX}px)`,
          width: "100%",
          height: "100%",
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: "0.6rem",
          lineHeight: 1,
        }}
      >
        {Array.from({ length: totalCells }, (_, i) => {
          const color = randomColor();
          const isAccent = color === COLOR_ACCENT;
          const shouldTwinkle =
            !prefersReducedMotion &&
            (isAccent || (color === COLOR_MED && Math.random() < 0.08));

          const col = i % cols;
          const waveDelay = (col / cols) * 3; // 3s spread across columns
          const waveDuration = 4 + (col % 5) * 0.4; // slight variation per column

          const animations: string[] = [];
          if (!prefersReducedMotion) {
            animations.push(`bg-wave ${waveDuration}s ease-in-out ${waveDelay}s infinite`);
          }
          if (shouldTwinkle) {
            animations.push(`bg-twinkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 5}s infinite`);
          }

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
                ...(animations.length > 0
                  ? { animation: animations.join(", ") }
                  : {}),
              }}
            >
              {randomChar()}
            </span>
          );
        })}
      </div>
    </div>
  );
}
