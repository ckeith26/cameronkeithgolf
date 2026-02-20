"use client";

import { useState, useMemo } from "react";
import { ProjectCardFeatured } from "./ProjectCardFeatured";
import { ProjectCardCompact } from "./ProjectCardCompact";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import type { Project } from "@/data/projects";

interface ProjectListProps {
  projects: Project[];
}

const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

function parseDateValue(s: string): number {
  const t = s.trim().toLowerCase();
  if (t === "present") return Infinity;
  for (const [month, num] of Object.entries(MONTHS)) {
    if (t.startsWith(month)) {
      const year = parseInt(t.match(/\d{4}/)?.[0] || "0");
      return year * 100 + num;
    }
  }
  const year = parseInt(t);
  return !isNaN(year) ? year * 100 + 12 : 0;
}

function getDateBounds(dateStr: string) {
  const parts = dateStr.split(/\s*[–\-]\s*/);
  const start = parseDateValue(parts[0]);
  const end = parts.length > 1 ? parseDateValue(parts[parts.length - 1]) : start;
  return { start, end };
}

function sortByDate(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    const aD = getDateBounds(a.date);
    const bD = getDateBounds(b.date);
    if (bD.end !== aD.end) return bD.end - aD.end;
    return bD.start - aD.start;
  });
}

export function ProjectList({ projects }: ProjectListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const base = query.trim()
      ? projects.filter((p) => {
          const q = query.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.techStack.some((t) => t.toLowerCase().includes(q)) ||
            p.category.toLowerCase().includes(q)
          );
        })
      : projects;
    return sortByDate(base);
  }, [projects, query]);

  const featured = filtered.filter((p) => p.featured);
  const archive = filtered.filter((p) => !p.featured);

  return (
    <>
      <div className="mt-8">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, tech, or category..."
            className="w-full rounded-lg border border-border bg-background-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/60 transition-colors"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-foreground-muted">
          No projects match &ldquo;{query}&rdquo;
        </p>
      )}

      {featured.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1} className="h-full">
              <ProjectCardFeatured
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                links={project.links}
                slug={project.slug}
                date={project.date}
              />
            </ScrollReveal>
          ))}
        </div>
      )}

      {archive.length > 0 && (
        <>
          <ScrollReveal>
            <h2 className="mt-16 text-2xl font-semibold text-foreground">
              More Projects
            </h2>
          </ScrollReveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archive.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 0.1} className="h-full">
                <ProjectCardCompact
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  slug={project.slug}
                  date={project.date}
                />
              </ScrollReveal>
            ))}
          </div>
        </>
      )}
    </>
  );
}
