interface TimelineEntryProps {
  role: string;
  org: string;
  dateRange: string;
  description: string;
  bullets?: string[];
  current?: boolean;
}

export function TimelineEntry({
  role,
  org,
  dateRange,
  description,
  bullets = [],
  current = false,
}: TimelineEntryProps) {
  return (
    <div className="relative pl-8">
      {/* Dot */}
      <div
        className={`absolute top-2 left-0 h-3.5 w-3.5 rounded-full border-2 ${
          current
            ? "border-accent bg-accent"
            : "border-border bg-background"
        }`}
      />

      <div className="pb-8">
        <p className="font-mono text-xs text-foreground-subtle">{dateRange}</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{role}</h3>
        <p className="text-sm text-foreground-muted">{org}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          {description}
        </p>
        {bullets.length > 0 && (
          <ul className="mt-2 space-y-1">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-foreground-muted"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground-subtle" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
