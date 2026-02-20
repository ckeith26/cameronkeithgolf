import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardCompactProps {
  title: string;
  description: string;
  techStack: string[];
  slug: string;
  date?: string;
}

export function ProjectCardCompact({
  title,
  description,
  techStack,
  slug,
  date,
}: ProjectCardCompactProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="flex h-full flex-col rounded-lg border border-border bg-background-card p-5 transition-all duration-200 hover:scale-[1.02] hover:border-accent/40"
    >
      <h3 className="font-semibold text-foreground line-clamp-2 min-h-[3em]">{title}</h3>
      {date && (
        <p className="mt-0.5 text-xs text-foreground-subtle">{date}</p>
      )}
      <p className="mt-1 line-clamp-1 text-sm text-foreground-muted">
        {description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
        {techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </Link>
  );
}
