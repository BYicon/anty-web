import { type Address, type Hash, type TransactionReceipt } from "viem";
import { sepolia } from "viem/chains";

interface TransactionSession {
  address?: Address;
  chainId?: number;
}

export async function confirmSepoliaTransaction({
  session,
  submit,
  wait,
  onSubmitted,
}: {
  session: TransactionSession;
  submit: (account: Address) => Promise<Hash>;
  wait: (hash: Hash) => Promise<TransactionReceipt>;
  onSubmitted: (hash: Hash) => void;
}): Promise<TransactionReceipt> {
  if (!session.address) throw new Error("Connect your wallet first.");
  if (session.chainId !== sepolia.id)
    throw new Error("Switch your wallet to Sepolia first.");
  const hash = await submit(session.address);
  onSubmitted(hash);
  const receipt = await wait(hash);
  if (receipt.status !== "success")
    throw new Error("The transaction reverted on Sepolia.");
  return receipt;
}
