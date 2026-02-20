"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { SWING_FRAMES } from "@/data/swing-frames";
import { preloadFrames } from "@/lib/frame-preloader";

interface SwingCanvasProps {
  className?: string;
}

export function SwingCanvas({ className }: SwingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = frames[Math.min(index, frames.length - 1)];
    if (!frame) return;

    // Size canvas to container
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set canvas drawing size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Set canvas display size
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw frame centered, maintaining aspect ratio
    const imgAspect = frame.naturalWidth / frame.naturalHeight;
    const containerAspect = rect.width / rect.height;

    let drawWidth: number;
    let drawHeight: number;

    if (containerAspect > imgAspect) {
      // Container is wider - fit to height
      drawHeight = rect.height;
      drawWidth = drawHeight * imgAspect;
    } else {
      // Container is taller - fit to width
      drawWidth = rect.width;
      drawHeight = drawWidth / imgAspect;
    }

    const x = (rect.width - drawWidth) / 2;
    const y = (rect.height - drawHeight) / 2;

    ctx.drawImage(frame, x, y, drawWidth, drawHeight);

    currentFrameRef.current = index;
  }, []);

  // Preload frames
  useEffect(() => {
    let cancelled = false;

    preloadFrames(
      SWING_FRAMES.totalFrames,
      SWING_FRAMES.getFramePath,
      (loadedCount, total) => {
        if (!cancelled) {
          setProgress(Math.round((loadedCount / total) * 100));
        }
      }
    ).then((frames) => {
      if (!cancelled) {
        framesRef.current = frames;
        setLoaded(true);
        // Draw first frame immediately
        drawFrame(0);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [drawFrame]);

  // Scroll-linked animation
  useEffect(() => {
    if (!loaded || prefersReducedMotion) return;

    function onScroll() {
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollHeight = window.innerHeight * 1.5;

        // Progress: 0 when container top is at viewport bottom, 1 when scrolled past
        const rawProgress = -rect.top / scrollHeight;
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));

        const frameIndex = Math.floor(
          clampedProgress * (SWING_FRAMES.totalFrames - 1)
        );

        if (frameIndex !== currentFrameRef.current) {
          drawFrame(frameIndex);
        }

        // Fade out near end
        const canvas = canvasRef.current;
        if (canvas) {
          if (clampedProgress > 0.95) {
            const fadeProgress = (clampedProgress - 0.95) / 0.05;
            canvas.style.opacity = String(1 - fadeProgress);
          } else {
            canvas.style.opacity = "1";
          }
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial draw based on current scroll position
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, prefersReducedMotion, drawFrame]);

  // Handle resize
  useEffect(() => {
    if (!loaded) return;

    function onResize() {
      drawFrame(currentFrameRef.current);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, drawFrame]);

  // Reduced motion: just show first frame
  useEffect(() => {
    if (loaded && prefersReducedMotion) {
      drawFrame(0);
    }
  }, [loaded, prefersReducedMotion, drawFrame]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
          <div className="text-center">
            <div className="text-[#a1a1aa] font-mono text-sm">
              Loading swing... {progress}%
            </div>
            <div className="mt-2 w-48 h-1 bg-[#27272a] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#10b981] rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
