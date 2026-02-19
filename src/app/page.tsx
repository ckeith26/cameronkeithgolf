import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/Card";
import { ProjectCardFeatured } from "@/components/sections/ProjectCardFeatured";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { Terminal } from "@/components/interactive/Terminal";

import { featuredProjects } from "@/data/projects";

const quickLinks = [
  {
    title: "Projects",
    description: "AI systems, full-stack apps, and research papers.",
    href: "/projects",
  },
  {
    title: "Golf",
    description: "D1 collegiate career, stats, and swing breakdown.",
    href: "/golf",
  },
  {
    title: "Blog",
    description: "Writing on AI, engineering, and competing.",
    href: "/blog",
  },
];

export default function Home() {
  const highlighted = featuredProjects.slice(0, 2);

  return (
    <PageLayout>
      {/* ── Hero Text ── */}
      <SectionContainer className="py-24">
        <ScrollReveal>
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            Cameron Keith
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground-muted">
            D1 Golfer. AI Engineer. Building at the intersection.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">
            I am a Dartmouth student-athlete, AI researcher, and startup founder
            turning the discipline of competitive golf into engineering that
            matters.
          </p>
        </ScrollReveal>
      </SectionContainer>

      {/* ── Terminal ── */}
      <SectionContainer className="pb-24">
        <ScrollReveal>
          <Terminal />
        </ScrollReveal>
      </SectionContainer>

      {/* ── Quick-Link Cards ── */}
      <SectionContainer className="pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((link, index) => (
            <ScrollReveal key={link.href} delay={index * 0.1}>
              <Link href={link.href} className="group block">
                <Card hover className="flex h-full flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {link.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {link.description}
                    </p>
                  </div>
                  <span className="mt-4 inline-block text-foreground-subtle transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>

      {/* ── Featured Highlights ── */}
      <SectionContainer className="pb-24">
        <ScrollReveal>
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            Featured Work
          </h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          {highlighted.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.1}>
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
      </SectionContainer>
    </PageLayout>
  );
}
