import type { Metadata } from "next";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { AsciiDivider } from "@/components/interactive/AsciiDivider";
import { aboutContent } from "@/data/about";
import { education } from "@/data/experience";
import { coursework } from "@/data/coursework";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Cameron Keith, from Bay Area junior golf to Dartmouth D1 athlete and AI engineer.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <SectionContainer className="py-24">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            About
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground-muted">
            {aboutContent.intro}
          </p>
          <a
            href="/cameron-keith-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-background-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Resume (PDF)
          </a>
        </ScrollReveal>
      </SectionContainer>

      {/* ── Narrative Sections ── */}
      {aboutContent.sections.map((section, index) => (
        <SectionContainer key={section.heading} className="pb-16">
          <ScrollReveal delay={index * 0.1}>
            <h2 className="text-2xl font-semibold text-foreground">
              {section.heading}
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-foreground-muted">
              {section.body}
            </p>
          </ScrollReveal>
        </SectionContainer>
      ))}

      <SectionContainer className="pb-16">
        <AsciiDivider variant="neuralNet" positionAwareReveal />
      </SectionContainer>

      {/* ── Education ── */}
      <SectionContainer className="pb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-foreground">Education</h2>
          <div className="mt-6 space-y-1">
            <p className="text-lg font-medium text-foreground">
              {education.school}
            </p>
            <p className="text-sm text-foreground-muted">{education.degree}</p>
            <p className="text-sm text-foreground-muted">
              GPA: {education.gpa}
            </p>
            <p className="font-mono text-xs text-foreground-subtle">
              {education.dateRange}
            </p>
            <p className="text-sm text-foreground-muted">
              Intended: {education.intendedGrad}
            </p>
          </div>
          {/* ── Citations for Meritorious Performance ── */}
          <h3 className="mt-10 text-lg font-semibold text-foreground">
            Citations for Meritorious Performance
          </h3>
          <div className="mt-4 space-y-6">
            {education.citations.map((citation) => (
              <div
                key={citation.course}
                className="rounded-lg border border-border bg-background-elevated p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {citation.course}
                  </p>
                  <p className="font-mono text-xs text-foreground-subtle">
                    {citation.term}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted italic">
                  &ldquo;{citation.description}&rdquo;
                </p>
                <p className="mt-2 text-xs text-foreground-subtle">
                  - {citation.professor}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionContainer>

      {/* ── Coursework ── */}
      <SectionContainer className="pb-16">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-foreground">Coursework</h2>
          <div className="mt-8 space-y-10">
            {coursework.map((category) => (
              <div key={category.label}>
                <h3 className="mb-4 text-sm font-medium tracking-wider text-foreground-subtle">
                  {category.label}
                </h3>
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  style={{ gridAutoFlow: "column", gridTemplateRows: `repeat(${Math.ceil(category.courses.length / 3)}, minmax(0, 1fr))` }}
                >
                  {category.courses.map((course) => (
                    <Link
                      key={course.code}
                      href={`/courses/${course.slug}`}
                      className="rounded-md border border-border bg-background-elevated px-4 py-3 transition-all duration-200 hover:scale-[1.02] hover:border-accent/40"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-mono text-xs text-accent">
                          {course.code}
                        </p>
                        <p className="font-mono text-xs text-foreground-subtle">
                          {course.term}
                        </p>
                      </div>
                      <p className="mt-0.5 text-sm text-foreground-muted">
                        {course.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </SectionContainer>

      <SectionContainer className="pb-16">
        <Divider />
      </SectionContainer>

      {/* ── Interests ── */}
      <SectionContainer className="pb-24">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-foreground">Interests</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {aboutContent.interests.map((interest) => (
              <Badge key={interest}>{interest}</Badge>
            ))}
          </div>
        </ScrollReveal>
      </SectionContainer>
    </PageLayout>
  );
}
