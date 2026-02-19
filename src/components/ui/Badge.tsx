interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-background-elevated px-2 py-0.5 font-mono text-xs text-foreground-muted ${className}`}
    >
      {children}
    </span>
  );
}
