"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PhotoCarouselProps {
  photos: { src: string; alt: string }[];
  interval?: number;
}

export function PhotoCarousel({ photos, interval = 4000 }: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, isHovered]);

  // Show 5 photos at a time on desktop, 3 on tablet, 1 on mobile
  const visibleCount = 5;

  const getVisibleIndices = () => {
    const indices: number[] = [];
    for (let i = 0; i < visibleCount; i++) {
      indices.push((current + i) % photos.length);
    }
    return indices;
  };

  const visible = getVisibleIndices();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background-card text-foreground-subtle transition-colors hover:border-accent/40 hover:text-accent"
        aria-label="Previous photos"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background-card text-foreground-subtle transition-colors hover:border-accent/40 hover:text-accent"
        aria-label="Next photos"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Photo strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((index, i) => (
          <div
            key={`${index}-${i}`}
            className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border"
          >
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex justify-center gap-1">
        {Array.from({ length: Math.ceil(photos.length / visibleCount) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i * visibleCount)}
            className={`h-1.5 rounded-full transition-all ${
              Math.floor(current / visibleCount) === i
                ? "w-6 bg-accent"
                : "w-1.5 bg-foreground-subtle/30"
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
