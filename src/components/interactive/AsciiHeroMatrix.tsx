"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const FALLBACK_IMAGE = "/images/hero-first-frame.jpg";
const VIDEO_SOURCE = "/videos/video.mp4";
const ASCII_RAMP = " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const TARGET_FPS = 60;
const SOURCE_FPS = 60;
const PLAYBACK_RATE = 0.8;
const PLAYBACK_START_SEC = 0.43;
const PLAYBACK_END_SEC = 2.35;
const CELL_SIZE_DESKTOP = 8;
const CELL_SIZE_MOBILE = 6;
const SOURCE_ZOOM = 1.16;
const SOURCE_OFFSET_X_MOBILE = -0.52;
const SOURCE_OFFSET_Y = 0.12;
const SOURCE_OFFSET_Y_MOBILE_DELTA = 0.08;
const SUBJECT_FOCUS_X = 0.53;
const SUBJECT_FOCUS_Y = 0.58;
const SUBJECT_MASK_CENTER_X = 0.52;
const SUBJECT_MASK_CENTER_Y = 0.58;
const SUBJECT_MASK_RADIUS_X = 0.38;
const SUBJECT_MASK_RADIUS_Y = 0.62;
const SUBJECT_GRAY_LIFT = 52;
const SUBJECT_ALPHA_GAIN = 1.5;

interface AsciiCell {
  charIndex: number;
  gray: number;
  alpha: number;
  subjectMask: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement | HTMLVideoElement,
  cols: number,
  rows: number,
  sourceOffsetX = 0,
  sourceOffsetY = SOURCE_OFFSET_Y
) {
  const sourceWidth = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth;
  const sourceHeight = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight;
  if (sourceWidth === 0 || sourceHeight === 0) return;

  const coverScale = Math.max(cols / sourceWidth, rows / sourceHeight);
  const scale = coverScale * SOURCE_ZOOM;
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const desiredX = cols * 0.5 - drawWidth * SUBJECT_FOCUS_X + cols * sourceOffsetX;
  const desiredY = rows * 0.5 - drawHeight * SUBJECT_FOCUS_Y + rows * sourceOffsetY;
  const minX = Math.min(0, cols - drawWidth);
  const maxX = Math.max(0, cols - drawWidth);
  const minY = Math.min(0, rows - drawHeight);
  const maxY = Math.max(0, rows - drawHeight);
  const drawX = clamp(desiredX, minX, maxX);
  const drawY = clamp(desiredY, minY, maxY);

  ctx.clearRect(0, 0, cols, rows);
  ctx.drawImage(source, drawX, drawY, drawWidth, drawHeight);
}

export function AsciiHeroMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackImageRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasVideoRef = useRef(false);
  const revealedRef = useRef(false);
  const cellsRef = useRef<AsciiCell[]>([]);
  const luminanceRef = useRef<Float32Array | null>(null);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);
  const cellSizeRef = useRef(CELL_SIZE_DESKTOP);
  const viewportRef = useRef({ width: 0, height: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = document.createElement("canvas");
    const offscreenCtx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!offscreenCtx) return;
    offscreenRef.current = offscreen;

    let animationFrameId = 0;
    let lastRenderTime = 0;
    let lastSourceTime = 0;
    const renderInterval = 1000 / TARGET_FPS;
    const sourceInterval = 1000 / SOURCE_FPS;

    const revealCanvas = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = "1";
      }
    };

    const ensureLayout = () => {
      const offscreenCanvas = offscreenRef.current;
      const wrapper = wrapperRef.current;
      if (!offscreenCanvas || !wrapper) return;

      const viewportWidth = wrapper.clientWidth;
      const viewportHeight = wrapper.clientHeight;
      const cellSize = viewportWidth < 768 ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;
      const cols = Math.max(1, Math.floor(viewportWidth / cellSize));
      const rows = Math.max(1, Math.floor(viewportHeight / cellSize));
      const sizeChanged =
        colsRef.current !== cols ||
        rowsRef.current !== rows ||
        viewportRef.current.width !== viewportWidth ||
        viewportRef.current.height !== viewportHeight;

      if (!sizeChanged) return;

      cellSizeRef.current = cellSize;
      colsRef.current = cols;
      rowsRef.current = rows;
      viewportRef.current = { width: viewportWidth, height: viewportHeight };

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewportWidth * dpr);
      canvas.height = Math.floor(viewportHeight * dpr);
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      offscreenCanvas.width = cols;
      offscreenCanvas.height = rows;

      const total = cols * rows;
      if (cellsRef.current.length !== total) {
        const cells = new Array<AsciiCell>(total);
        for (let i = 0; i < total; i++) {
          cells[i] = {
            charIndex: 0,
            gray: 0,
            alpha: 0.08,
            subjectMask: 0,
          };
        }
        cellsRef.current = cells;
      }
      if (!luminanceRef.current || luminanceRef.current.length !== total) {
        luminanceRef.current = new Float32Array(total);
      }
    };

    const sampleSourceToAscii = (sourceImage: HTMLImageElement | HTMLVideoElement) => {
      if (sourceImage instanceof HTMLImageElement) {
        if (!sourceImage.complete || sourceImage.naturalWidth === 0 || sourceImage.naturalHeight === 0) return;
      } else {
        if (sourceImage.videoWidth === 0 || sourceImage.videoHeight === 0 || sourceImage.readyState < 2) return;
      }
      ensureLayout();
      if (colsRef.current === 0 || rowsRef.current === 0) return;

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const total = cols * rows;
      const offscreenCanvas = offscreenRef.current;
      if (!offscreenCanvas) return;
      const isMobileViewport = viewportRef.current.width < 768;
      const sourceOffsetX = isMobileViewport ? SOURCE_OFFSET_X_MOBILE : 0;
      const sourceOffsetY = isMobileViewport
        ? SOURCE_OFFSET_Y + SOURCE_OFFSET_Y_MOBILE_DELTA
        : SOURCE_OFFSET_Y;

      drawCoverImage(offscreenCtx, sourceImage, cols, rows, sourceOffsetX, sourceOffsetY);
      const imageData = offscreenCtx.getImageData(0, 0, cols, rows).data;
      const luminance = luminanceRef.current;
      if (!luminance || luminance.length !== total) return;

      for (let i = 0; i < total; i++) {
        const p = i * 4;
        const r = imageData[p];
        const g = imageData[p + 1];
        const b = imageData[p + 2];
        luminance[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }

      const cells = cellsRef.current;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;

          const left = luminance[y * cols + Math.max(0, x - 1)];
          const right = luminance[y * cols + Math.min(cols - 1, x + 1)];
          const up = luminance[Math.max(0, y - 1) * cols + x];
          const down = luminance[Math.min(rows - 1, y + 1) * cols + x];
          const gradient = Math.abs(right - left) + Math.abs(down - up);
          const edgeBoost = clamp((gradient - 8) / 70, 0, 1);

          const tone = clamp(1 - luminance[idx] / 255 + edgeBoost * 0.28, 0, 1);
          const nx = x / cols;
          const ny = y / rows;
          const dx = (nx - SUBJECT_MASK_CENTER_X) / SUBJECT_MASK_RADIUS_X;
          const dy = (ny - SUBJECT_MASK_CENTER_Y) / SUBJECT_MASK_RADIUS_Y;
          const region = clamp(1 - Math.sqrt(dx * dx + dy * dy), 0, 1);
          const detail = clamp(edgeBoost * 0.9 + (1 - luminance[idx] / 255) * 0.35, 0, 1);
          const subjectMask = clamp(region * 0.9 + detail * 0.35, 0, 1);
          const cell = cells[idx];
          cell.charIndex = Math.floor(tone * (ASCII_RAMP.length - 1));
          const boostedGray = clamp(luminance[idx] + SUBJECT_GRAY_LIFT * subjectMask, 0, 255);
          cell.gray = Math.round(boostedGray);
          cell.alpha = clamp(0.16 + tone * 0.84 + edgeBoost * 0.12, 0.08, 1);
          cell.subjectMask = subjectMask;
        }
      }
    };

    const fallbackImage = new Image();
    fallbackImage.src = FALLBACK_IMAGE;
    fallbackImageRef.current = fallbackImage;

    const onFallbackLoad = () => {
      if (!hasVideoRef.current) {
        sampleSourceToAscii(fallbackImage);
      }
    };
    fallbackImage.addEventListener("load", onFallbackLoad);

    const video = document.createElement("video");
    video.src = VIDEO_SOURCE;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.loop = false;
    videoRef.current = video;

    const onVideoReady = () => {
      if (video.videoWidth === 0 || video.videoHeight === 0) return;
      hasVideoRef.current = true;
      revealCanvas();
      video.playbackRate = PLAYBACK_RATE;
      if (!prefersReducedMotion) {
        if (video.currentTime < PLAYBACK_START_SEC || video.currentTime > PLAYBACK_END_SEC) {
          video.currentTime = PLAYBACK_START_SEC;
        }
        void video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = PLAYBACK_START_SEC;
      }
      sampleSourceToAscii(video);
    };

    const onTimeUpdate = () => {
      if (!prefersReducedMotion && video.currentTime >= PLAYBACK_END_SEC) {
        video.currentTime = PLAYBACK_START_SEC;
      }
    };

    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("canplay", onVideoReady);
    video.addEventListener("timeupdate", onTimeUpdate);

    const onResize = () => {
      ensureLayout();
      const sourceVideo = videoRef.current;
      if (hasVideoRef.current && sourceVideo) {
        sampleSourceToAscii(sourceVideo);
      } else if (fallbackImageRef.current) {
        sampleSourceToAscii(fallbackImageRef.current);
      }
    };
    window.addEventListener("resize", onResize);
    ensureLayout();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (colsRef.current === 0 || rowsRef.current === 0 || cellsRef.current.length === 0) return;

      const sourceVideo = videoRef.current;
      if (hasVideoRef.current && sourceVideo) {
        if (!prefersReducedMotion) {
          if (sourceVideo.playbackRate !== PLAYBACK_RATE) {
            sourceVideo.playbackRate = PLAYBACK_RATE;
          }
          if (sourceVideo.paused) {
            void sourceVideo.play().catch(() => undefined);
          }
          if (sourceVideo.currentTime < PLAYBACK_START_SEC || sourceVideo.currentTime >= PLAYBACK_END_SEC) {
            sourceVideo.currentTime = PLAYBACK_START_SEC;
          }
          if (!lastSourceTime) lastSourceTime = time;
          const sourceDelta = time - lastSourceTime;
          if (sourceDelta >= sourceInterval) {
            lastSourceTime = time - (sourceDelta % sourceInterval);
            sampleSourceToAscii(sourceVideo);
          }
        } else {
          sourceVideo.pause();
          if (Math.abs(sourceVideo.currentTime - PLAYBACK_START_SEC) > 0.04) {
            sourceVideo.currentTime = PLAYBACK_START_SEC;
          }
          sampleSourceToAscii(sourceVideo);
        }
      }

      if (!lastRenderTime) lastRenderTime = time;
      const deltaTime = time - lastRenderTime;
      if (deltaTime < renderInterval) return;
      lastRenderTime = time - (deltaTime % renderInterval);

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const cellSize = cellSizeRef.current;
      const viewport = viewportRef.current;
      const cells = cellsRef.current;

      ctx.fillStyle = "#050607";
      ctx.fillRect(0, 0, viewport.width, viewport.height);

      ctx.font = `500 ${cellSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          const cell = cells[idx];
          const charIndex = cell.charIndex;
          const alpha = clamp(cell.alpha * cell.subjectMask * SUBJECT_ALPHA_GAIN, 0, 1);
          if (alpha < 0.03) continue;

          const gray = cell.gray;
          ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${alpha})`;
          ctx.fillText(ASCII_RAMP[charIndex], x * cellSize, y * cellSize);
        }
      }

      const vignette = ctx.createRadialGradient(
        viewport.width * 0.5,
        viewport.height * 0.56,
        viewport.width * 0.1,
        viewport.width * 0.5,
        viewport.height * 0.56,
        viewport.width * 0.8
      );
      vignette.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      vignette.addColorStop(0.6, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, viewport.width, viewport.height);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      fallbackImage.removeEventListener("load", onFallbackLoad);
      video.removeEventListener("loadeddata", onVideoReady);
      video.removeEventListener("canplay", onVideoReady);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.pause();
      video.removeAttribute("src");
      video.load();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ opacity: 0, transition: "opacity 0.6s ease-in" }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
