import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

interface BlogPostPreviewProps {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export function BlogPostPreview({
  title,
  date,
  excerpt,
  tags,
  slug,
}: BlogPostPreviewProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block rounded-lg border border-border bg-background-card p-6 transition-colors hover:border-accent/40"
    >
      <p className="font-mono text-xs text-foreground-subtle">{date}</p>
      <h3 className="mt-1 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground-muted">
        {excerpt}
      </p>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
