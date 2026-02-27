"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface ScrollSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  fullBleed?: boolean;
  parallax?: boolean;
  parallaxOffset?: number;
  gradientTop?: string;
  gradientBottom?: string;
}

export function ScrollSection({
  id,
  children,
  className = "",
  fullHeight = false,
  fullBleed = false,
  parallax = false,
  parallaxOffset = 20,
  gradientTop,
  gradientBottom,
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset]
  );

  const shouldAnimate = parallax && !prefersReducedMotion;
  const containerClass = fullBleed ? "w-full" : "mx-auto max-w-[1200px] px-6 md:px-8";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${fullHeight ? "min-h-screen" : ""} ${className}`}
    >
      {gradientTop && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32"
          style={{ background: gradientTop }}
        />
      )}

      {shouldAnimate ? (
        <motion.div
          className={containerClass}
          style={{ y }}
        >
          {children}
        </motion.div>
      ) : (
        <div className={containerClass}>{children}</div>
      )}

      {gradientBottom && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
          style={{ background: gradientBottom }}
        />
      )}
    </section>
  );
}
