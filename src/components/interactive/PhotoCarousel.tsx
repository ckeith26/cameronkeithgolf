"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface PhotoCarouselProps {
  photos: { src: string; alt: string }[];
  speed?: number; // seconds for one full cycle
}

export function PhotoCarousel({ photos, speed = 60 }: PhotoCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div
        className="flex gap-3"
        style={{
          animation: `scroll-left ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {/* Render photos twice for seamless loop */}
        {[...photos, ...photos].map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="relative aspect-[4/5] w-48 flex-shrink-0 overflow-hidden rounded-lg border border-border sm:w-56 lg:w-64"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 192px, (max-width: 1024px) 224px, 256px"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
