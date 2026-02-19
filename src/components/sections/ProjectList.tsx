"use client";

import { useState, useMemo } from "react";
import { ProjectCardFeatured } from "./ProjectCardFeatured";
import { ProjectCardCompact } from "./ProjectCardCompact";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import type { Project } from "@/data/projects";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return projects;
    const q = query.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
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
                />
              </ScrollReveal>
            ))}
          </div>
        </>
      )}
    </>
  );
}
