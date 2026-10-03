import Link from "next/link";

const LOOP = [
  "Discover",
  "Accept",
  "Build",
  "Submit Proof",
  "Verify",
  "Earn",
  "Reputation",
  "Unlock",
];

export default function HomePage() {
  return (
    <>
      <section className="qb-field relative flex flex-1 flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-accent">
          Solana Quest &amp; Bounty Protocol
        </p>
        <h1 className="max-w-4xl text-balance text-5xl font-semibold uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl">
          Turn contribution into <span className="text-accent">progression.</span>
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Complete quests. Prove your work. Earn rewards. Build an on-chain
          reputation that belongs to your wallet — not to a platform.
        </p>
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/quests"
            className="rounded-md bg-accent px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            Enter Quest Universe
          </Link>
          <Link
            href="/create"
            className="rounded-md border border-line bg-panel px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-foreground backdrop-blur transition-colors hover:border-accent/40"
          >
            Create a Quest
          </Link>
        </div>
      </section>

      <section aria-label="Product loop" className="border-t border-line py-10">
        <ul className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {LOOP.map((step, i) => (
            <li key={step} className="flex items-center gap-6">
              {i > 0 && (
                <span aria-hidden className="text-line">
                  →
                </span>
              )}
              <span className={i === 0 ? "text-accent" : undefined}>{step}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
