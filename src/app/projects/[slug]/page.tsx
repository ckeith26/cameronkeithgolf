import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

const categoryLabels: Record<string, string> = {
  "ai-ml": "AI / ML",
  "full-stack": "Full Stack",
  research: "Research",
  systems: "Systems",
  other: "Other",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const hasLinks =
    (project.links.github && project.links.github !== "#") ||
    (project.links.live && project.links.live !== "#") ||
    (project.links.paper && project.links.paper !== "#");

  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          &larr; Back to Projects
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-foreground-muted">
            {project.date}
          </span>
          <Badge>{categoryLabels[project.category] ?? project.category}</Badge>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {project.longDescription ? (
          <div className="mt-8 max-w-3xl space-y-4">
            {project.longDescription.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground-muted">
            {project.description}
          </p>
        )}

        {hasLinks && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.github && project.links.github !== "#" && (
              <Button variant="secondary" href={project.links.github}>
                GitHub
              </Button>
            )}
            {project.links.live && project.links.live !== "#" && (
              <Button variant="primary" href={project.links.live}>
                Live Site
              </Button>
            )}
            {project.links.paper && project.links.paper !== "#" && (
              <Button variant="ghost" href={project.links.paper}>
                Paper
              </Button>
            )}
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
}
