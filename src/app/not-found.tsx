import Link from "next/link";
import { SectionContainer } from "@/components/ui/SectionContainer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SectionContainer className="text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-foreground-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-mono text-sm text-accent hover:underline"
        >
          &larr; Back to home
        </Link>
      </SectionContainer>
    </div>
  );
}
