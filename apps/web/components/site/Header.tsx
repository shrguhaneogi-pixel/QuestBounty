import Link from "next/link";

const NAV = [
  { label: "Quests", href: "/quests" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Create", href: "/create" },
  { label: "Profile", href: "/profile" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30"
          >
            <span className="size-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-foreground">
            Quest<span className="text-accent">Bounty</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Wallet connection is wired in Phase 3"
          className="cursor-not-allowed rounded-md border border-line bg-panel px-3.5 py-2 font-mono text-xs uppercase tracking-widest text-muted"
        >
          Connect
        </button>
      </div>
    </header>
  );
}
