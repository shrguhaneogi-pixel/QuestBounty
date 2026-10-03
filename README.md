# QuestBounty

**Turn contribution into progression.**

QuestBounty is a Solana-powered quest and bounty protocol: discover quests, accept
work, submit proof, get verified, earn rewards, and build an on-chain contribution
history — presented as an interactive 3D Quest Universe where every visual element
maps to real protocol state (*form follows protocol*).

```text
DISCOVER → ACCEPT → BUILD → SUBMIT PROOF → VERIFY → EARN → REPUTATION → UNLOCK
```

> Status: **Phase 0 — foundation.** The program is a build-validated skeleton;
> contract logic lands in Phases 1–2, client/UI in 3–4, 3D in 5–8.
> Do not use on mainnet; everything targets **devnet**.

---

## Repository layout

```text
quest-bounty/
├── apps/
│   └── web/                  # Next.js 16 (App Router) + React 19 + Tailwind v4
│       ├── app/              # routes: /, /quests, /dashboard, /create, /profile
│       ├── components/       # UI components (3D scene components arrive Phase 5)
│       ├── hooks/            # Solana/data hooks (Phase 3)
│       ├── lib/              # env, constants, program client (Phase 3)
│       └── store/            # Zustand app state (Phase 4)
├── programs/
│   └── quest_bounty/         # Anchor program (crate: quest_bounty)
│       ├── src/lib.rs
│       └── Cargo.toml
├── tests/                    # Anchor (mocha + ts) program tests (Phase 1)
├── Anchor.toml
├── .env.example
└── package.json              # npm workspaces: apps/*
```

## Pinned toolchain (verified on this machine, 2026-10-03)

| Tool | Version | Install location |
|---|---|---|
| Node.js | 24.21.0 LTS ("Krypton") | `~/.local/opt/node-v24.21.0-linux-x64` (symlinked into `~/.local/bin`) |
| npm | 11.19.0 | with Node |
| Rust | 1.99.0 (host) | `~/.cargo` — SBF builds use platform-tools' own rustc 1.95.0 |
| Solana CLI (Agave) | 4.3.0 | `~/.local/share/solana/install/active_release` (symlinked into `~/.local/bin`) |
| cargo-build-sbf | 4.4.0 | with Solana CLI |
| SBF platform-tools | v1.57 | `~/.cache/solana/v1.57/platform-tools` |
| anchor-cli | **0.31.0** | npm `@coral-xyz/anchor-cli@0.31.2` (see caveat below) |
| anchor-lang (program) | `=0.31.0` | Cargo |

**anchor-cli caveat (verified 2026-10-03):** `avm` is effectively unavailable
(its standalone repo is gone; the crates.io build fails against Fedora 44's
OpenSSL via stale `openssl-sys`). The npm CLI packages are also mispacked
(`0.31.0` ships a macOS arm64 binary; `0.31.2` ships the correct linux-x64
binary but version-labels it `0.31.0`, which the wrapper script rejects; the
wrapper is bypassed by symlinking the ELF directly).

Anchor 0.31's toolchain gate resolves the *required* version from
`anchor-lang` in the program `Cargo.toml` and determines the *current* version
**from the invoked binary's filename** (`anchor-<x.y.z>` → `x.y.z`; a bare
`anchor` name falls through to an avm-managed install check and aborts).
The working recipe is therefore to run the binary under its versioned name:

```bash
npm run setup:anchor-shim   # links .localbin/anchor-0.31.0 -> installed ELF
npm run build:program       # .localbin/anchor-0.31.0 build  ✓ verified end-to-end
```

(Alternative: `ln -s <ELF> ~/.avm/bin/anchor-0.31.0`. Anchor enforces
CLI↔`anchor-lang` version parity, so keep both at **0.31.0**. Upgrading means
re-verifying all four: CLI, `anchor-lang`, `anchor-spl`, and
`@coral-xyz/anchor` JS client — pin the client to the same `0.31.x` line.)

## Keypairs (all live **outside** the repo — never commit secrets)

| File | Purpose |
|---|---|
| `~/.config/solana/id.json` | devnet payer wallet (throwaway, devnet SOL only) |
| `~/.config/solana/quest_bounty-keypair.json` | program deploy keypair |

Program ID (public): `H49TxiF1wQBq58JRd2ztqDnZxcG9AGLrn6wiZvaWEngW`
(declared in `programs/quest_bounty/src/lib.rs` and `Anchor.toml`).

## Environment variables

Copy `.env.example` to `apps/web/.env.local`. Only public frontend values live in
env files (`NEXT_PUBLIC_SOLANA_NETWORK`, `NEXT_PUBLIC_RPC_URL`,
`NEXT_PUBLIC_PROGRAM_ID`). Private keys are **never** placed in env files.

## Commands

```bash
npm run setup:anchor-shim   # one-time per clone (see anchor-cli caveat)

npm run dev:web          # Next.js dev server
npm run build:web        # production build (web)
npm run lint:web         # eslint
npm run typecheck:web    # tsc --noEmit

npm run build:program    # anchor build → target/deploy/quest_bounty.so + IDL + types
npm run test:program     # program tests (local validator; Phase 1+)
npm run deploy:devnet    # anchor deploy to devnet
```

Devnet funding:

```bash
solana airdrop 2 $(solana-keygen pubkey ~/.config/solana/id.json) --url https://api.devnet.solana.com
```

(If the public airdrop faucet rate-limits, use https://faucet.solana.com.)

## Protocol design (target — see master spec)

Instructions (Phase 1–2): `initialize_user`, `create_quest`, `accept_quest`,
`submit_quest`, `verify_quest`, `reject_submission`, `claim_reward`.

State machine: `OPEN → ACCEPTED → SUBMITTED → VERIFIED → COMPLETED`, with
`REJECTED → ACCEPTED`, `EXPIRED`, `CANCELLED` terminal branches. Invalid
transitions are impossible by program check.

Reputation is deterministic: Easy=10, Medium=25, Hard=50, Epic=100, updated only
by the program on verified completion.

## Known audit notes (Phase 0)

- `npm audit` flags dev-tooling transitive advisories (fast-glob/braces DoS)
  reachable only through the ESLint stack; the only registry "fix" is a
  semver-major downgrade of `eslint-config-next`, which would break Next 16
  linting. Accepted as dev-only risk; no production surface.
- No third-party JS runtime dependencies are installed yet (wallet adapter,
  R3F, Zustand, Zod, Framer Motion arrive in their respective phases).

## Roadmap (out of MVP scope, by design)

Cross-chain, ZK proofs, DAO governance, tokenomics, NFT markets, autonomous
agents, decentralized reviewer networks, complex reputation economics.

## License

MIT — see [LICENSE](./LICENSE).
