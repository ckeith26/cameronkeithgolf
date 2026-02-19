interface CalloutProps {
  children: React.ReactNode;
  className?: string;
}

export function Callout({ children, className = "" }: CalloutProps) {
  return (
    <div
      className={`my-4 rounded-r-lg border-l-2 border-accent bg-background-elevated px-4 py-3 text-sm text-foreground-muted ${className}`}
    >
      {children}
    </div>
  );
}
