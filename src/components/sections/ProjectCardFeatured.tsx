import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectCardFeaturedProps {
  title: string;
  description: string;
  techStack: string[];
  links?: {
    github?: string;
    live?: string;
    paper?: string;
  };
  image?: string;
  slug: string;
  date?: string;
}

export function ProjectCardFeatured({
  title,
  description,
  techStack,
  links = {},
  image,
  slug,
  date,
}: ProjectCardFeaturedProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background-card transition-all duration-200 hover:scale-[1.02] hover:border-accent/40">
      {image && (
        <Link href={`/projects/${slug}`} className="block">
          <div className="relative aspect-video w-full bg-background-elevated">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/projects/${slug}`}>
          <h3 className="text-xl font-semibold text-foreground hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>
        {date && (
          <p className="mt-1 text-xs text-foreground-subtle">{date}</p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {links.github && (
            <Button variant="secondary" size="sm" href={links.github}>
              GitHub
            </Button>
          )}
          {links.live && (
            <Button variant="primary" size="sm" href={links.live}>
              Live Demo
            </Button>
          )}
          {links.paper && (
            <Button variant="ghost" size="sm" href={links.paper}>
              Paper
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
