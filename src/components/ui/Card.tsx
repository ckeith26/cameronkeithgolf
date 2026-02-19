interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-background-card p-6 ${hover ? "transition-all duration-200 hover:border-accent/40" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
