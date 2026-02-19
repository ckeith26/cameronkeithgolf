import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { ProjectList } from "@/components/sections/ProjectList";
import { GitHubContributions } from "@/components/sections/GitHubContributions";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "AI agents, encrypted messaging, ML competitions, and more. Cameron Keith's technical project portfolio.",
};

export default function ProjectsPage() {
  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            A selection of things I have built -- from AI research tools to
            full-stack platforms. Each project taught me something new about
            engineering at the intersection of software and finance.
          </p>
        </ScrollReveal>

        <div className="mt-12">
          <ScrollReveal>
            <GitHubContributions />
          </ScrollReveal>
        </div>

        <ProjectList projects={projects} />
      </SectionContainer>
    </PageLayout>
  );
}
