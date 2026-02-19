import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Badge } from "@/components/ui/Badge";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = getAllPosts();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return { title: "Post Not Found" };

  return {
    title: meta.title,
    description: meta.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const wordCount = 250; // approximate for read time
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-foreground-muted transition-colors hover:text-accent"
        >
          &larr; Back to Blog
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
          {post.meta.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm text-foreground-muted">
            {post.meta.date}
          </span>
          <span className="text-sm text-foreground-subtle">
            {readTime} min read
          </span>
        </div>

        {post.meta.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        <article className="prose-custom mt-10 max-w-3xl">
          {post.content}
        </article>
      </SectionContainer>
    </PageLayout>
  );
}
