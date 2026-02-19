interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section className={`mx-auto max-w-[1200px] px-6 md:px-8 ${className}`}>
      {children}
    </section>
  );
}
