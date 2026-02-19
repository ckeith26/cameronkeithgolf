import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { TimelineEntry } from "@/components/sections/TimelineEntry";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Work & Research",
  description:
    "AI/ML internships, research at Dartmouth's SEE Lab, and founding Brama AI. Cameron Keith's professional experience.",
};

export default function WorkPage() {
  return (
    <PageLayout>
      <SectionContainer className="py-24">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Work &amp; Research
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground-muted">
            My career sits at the intersection of AI/ML and quantitative finance.
            From founding an autonomous investment-agent startup to publishing
            security research, each role has deepened my conviction that rigorous
            engineering can solve real problems at scale.
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

      <SectionContainer className="pb-0">
        <div className="relative">
          {/* Continuous vertical line spanning the full timeline */}
          <div className="absolute top-2 left-[7px] bottom-0 w-px bg-border" />
          {experiences.map((exp, index) => (
            <ScrollReveal key={`${exp.org}-${exp.role}`} delay={index * 0.1}>
              <TimelineEntry
                role={exp.role}
                org={exp.org}
                dateRange={exp.dateRange}
                description={exp.description}
                bullets={exp.bullets}
                current={exp.current}
              />
            </ScrollReveal>
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
