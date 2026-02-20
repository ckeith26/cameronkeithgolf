import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { coursework } from "@/data/coursework";

const allCourses = coursework.flatMap((cat) => cat.courses);

function formatTerm(term: string): string {
  const year = `20${term.slice(0, 2)}`;
  const season: Record<string, string> = {
    W: "Winter",
    S: "Spring",
    X: "Summer",
    F: "Fall",
  };
  return `${season[term.slice(2)] ?? term.slice(2)} ${year}`;
}

export function generateStaticParams() {
  return allCourses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = allCourses.find((c) => c.slug === slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.code}: ${course.title}`,
    description: course.description,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = allCourses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <Link
          href="/about"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          &larr; Back to About
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
          {course.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-accent">{course.code}</span>
          <span className="font-mono text-sm text-foreground-muted">
            {formatTerm(course.term)}
          </span>
          <Badge>{course.category}</Badge>
          {course.distributive && <Badge>{course.distributive}</Badge>}
        </div>

        <div className="mt-8 max-w-3xl space-y-4">
          {course.description.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-foreground-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
