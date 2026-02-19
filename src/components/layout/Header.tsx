"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 right-0 left-0 z-50 mx-auto max-w-[1200px] px-6 md:px-8">
      <div className="flex items-center justify-between rounded-full border border-border bg-background/80 px-6 py-3 backdrop-blur-md">
        <Link href="/" className="font-mono text-lg font-semibold text-accent">
          Cameron Keith
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm text-foreground-muted transition-colors hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/cameron-keith-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1 text-sm text-foreground-muted transition-colors hover:border-accent/40 hover:text-foreground"
          >
            Resume
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mt-2 overflow-hidden rounded-2xl border border-border bg-background/80 backdrop-blur-md transition-[max-height] duration-300 md:hidden ${mobileOpen ? "max-h-96" : "max-h-0 border-0"}`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-background-elevated hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/cameron-keith-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-2 text-sm text-foreground-muted transition-colors hover:bg-background-elevated hover:text-foreground"
          >
            Resume (PDF)
          </a>
        </nav>
      </div>
    </header>
  );
}
