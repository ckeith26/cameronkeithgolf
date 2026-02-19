import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { Callout } from "./Callout";
import { ImageWithCaption } from "./ImageWithCaption";

export const mdxComponents: MDXComponentsType = {
  h1: (props) => (
    <h1 className="mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-8 mb-3 text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-6 mb-2 text-foreground" {...props} />
  ),
  h4: (props) => (
    <h4 className="mt-4 mb-2 text-foreground" {...props} />
  ),
  p: (props) => (
    <p
      className="my-3 text-base leading-relaxed text-foreground-muted"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent-blue underline-offset-2 hover:underline"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-background-card p-4 font-mono text-sm"
      {...props}
    />
  ),
  code: (props) => {
    // Inline code (not inside <pre>)
    const isInline = typeof props.children === "string";
    if (isInline) {
      return (
        <code
          className="rounded bg-background-card px-1.5 py-0.5 font-mono text-sm text-accent"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-2 border-border pl-4 text-foreground-muted italic"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-3 list-disc space-y-1 pl-6 text-foreground-muted" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-3 list-decimal space-y-1 pl-6 text-foreground-muted"
      {...props}
    />
  ),
  li: (props) => <li className="text-base leading-relaxed" {...props} />,
  Callout,
  ImageWithCaption,
};
