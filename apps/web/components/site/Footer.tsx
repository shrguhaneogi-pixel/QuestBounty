import { ENV, shortAddress } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-widest text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>QuestBounty · {ENV.network}</span>
        <span>
          {ENV.programId ? `program ${shortAddress(ENV.programId)}` : "program id unset"}
        </span>
      </div>
    </footer>
  );
}
