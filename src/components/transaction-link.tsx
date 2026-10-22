import { type Hash } from "viem";

export function TransactionLink({ hash }: { hash?: Hash }) {
  if (!hash) return null;
  return (
    <a
      className="text-sm underline"
      href={`https://sepolia.etherscan.io/tx/${hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View transaction on Sepolia
    </a>
  );
}
