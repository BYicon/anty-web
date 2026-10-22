"use client";

import { useRef, useState } from "react";
import { type Address, type Hash } from "viem";
import { useConfig, useWriteContract } from "wagmi";
import { getAccount, waitForTransactionReceipt } from "wagmi/actions";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import { useToast } from "@/components/ui/use-toast";
import { confirmSepoliaTransaction } from "@/lib/transaction";

export function transactionErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (/user rejected|user denied/i.test(error.message))
      return "You cancelled the wallet request.";
    return "shortMessage" in error && typeof error.shortMessage === "string"
      ? error.shortMessage
      : error.message;
  }
  return "The transaction could not be completed. Please try again.";
}

export function useSepoliaTransaction() {
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();
  const { toast } = useToast();
  const busy = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [hash, setHash] = useState<Hash>();
  const [error, setError] = useState<string>();

  async function run(submit: (account: Address) => Promise<Hash>) {
    if (busy.current) return;
    busy.current = true;
    setIsPending(true);
    setError(undefined);
    setHash(undefined);
    try {
      return await confirmSepoliaTransaction({
        session: getAccount(config),
        submit,
        onSubmitted: setHash,
        wait: (submittedHash) =>
          waitForTransactionReceipt(config, {
            chainId: APP_CHAIN_ID,
            hash: submittedHash,
            confirmations: 1,
            timeout: 180_000,
          }),
      });
    } catch (cause) {
      const message = transactionErrorMessage(cause);
      setError(message);
      toast({
        title: "Transaction failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      busy.current = false;
      setIsPending(false);
    }
  }

  return { run, writeContractAsync, isPending, hash, error };
}
