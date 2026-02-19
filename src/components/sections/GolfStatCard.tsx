import Image from "next/image";

interface GolfStatCardProps {
  label: string;
  value: string;
  description?: string;
  logo?: string;
  href?: string;
}

export function GolfStatCard({ label, value, description, logo, href }: GolfStatCardProps) {
  const content = (
    <div className={`flex h-full flex-col rounded-lg border border-border bg-background-card p-5 text-center${href ? " transition-all duration-200 hover:border-accent/40" : ""}`}>
      <p className="text-2xl font-bold text-accent">{value}</p>
      <p className="mt-1 inline-flex items-center justify-center gap-2 font-medium text-foreground">
        {label}
        {logo && (
          <Image src={logo} alt="" width={24} height={24} className="inline-block" />
        )}
      </p>
      {description && (
        <p className="mt-auto pt-1 text-sm text-foreground-muted">{description}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
