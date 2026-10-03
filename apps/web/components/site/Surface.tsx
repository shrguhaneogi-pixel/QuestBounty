import type { ReactNode } from "react";

export function Surface({
  title,
  phase,
  children,
}: {
  title: string;
  phase: string;
  children: ReactNode;
}) {
  return (
    <section className="qb-field flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="mb-4 rounded-full border border-line bg-panel px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {phase}
      </p>
      <h1 className="text-3xl font-semibold uppercase tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{children}</p>
    </section>
  );
}
