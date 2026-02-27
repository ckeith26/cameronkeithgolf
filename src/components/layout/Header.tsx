"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/navigation";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1200px] px-6 pt-4 md:px-8">
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-background/65 px-4 py-3 shadow-[0_14px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-6">
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
          <Link
            href="/"
            className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-accent sm:text-sm"
          >
            Cameron Keith
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-accent/35 bg-accent/10 text-foreground"
                      : "border-transparent text-foreground-muted hover:border-border hover:bg-background-elevated/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/cameron-keith-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent transition-colors hover:border-accent/45 hover:bg-accent/15 hover:text-foreground"
            >
              Resume
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md border border-border/80 bg-background-card/70 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={`block h-0.5 w-4 bg-foreground transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-4 bg-foreground transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-2xl border bg-background/75 shadow-[0_14px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[max-height,opacity,border-color] duration-300 md:hidden ${
          mobileOpen ? "max-h-96 border-white/10 opacity-100" : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`rounded-md border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                isActive(item.href)
                  ? "border-accent/30 bg-accent/10 text-foreground"
                  : "border-transparent text-foreground-muted hover:border-border hover:bg-background-elevated/80 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/cameron-keith-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent transition-colors hover:border-accent/45 hover:bg-accent/15 hover:text-foreground"
          >
            Resume (PDF)
          </a>
        </nav>
      </div>
    </header>
  );
}
