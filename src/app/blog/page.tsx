import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { BlogPostPreview } from "@/components/sections/BlogPostPreview";
import { ScrollReveal } from "@/components/interactive/ScrollReveal";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on AI research, engineering, and competing at the highest level. By Cameron Keith.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageLayout>
      <SectionContainer className="py-16 md:py-24">
        <ScrollReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Writing about AI research, software engineering, competitive golf, and
            the things I learn along the way.
          </p>
        </ScrollReveal>

        {posts.length > 0 ? (
          <div className="mt-12 space-y-4">
            {posts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <BlogPostPreview
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  tags={post.tags}
                  slug={post.slug}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <p className="mt-12 text-base text-foreground-muted">
              More posts coming soon.
            </p>
          </ScrollReveal>
        )}
      </SectionContainer>
    </PageLayout>
  );
}
