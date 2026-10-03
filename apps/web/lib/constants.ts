export type SolanaNetwork = "devnet" | "localnet";

const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK ?? "devnet") as SolanaNetwork;

export const ENV = {
  network,
  rpcUrl:
    process.env.NEXT_PUBLIC_RPC_URL ??
    (network === "localnet"
      ? "http://127.0.0.1:8899"
      : "https://api.devnet.solana.com"),
  programId: process.env.NEXT_PUBLIC_PROGRAM_ID ?? "",
} as const;

export const shortAddress = (address: string, chars = 4): string =>
  address.length > chars * 2 + 1
    ? `${address.slice(0, chars)}…${address.slice(-chars)}`
    : address;
