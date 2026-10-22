"use client";

import erc20Abi from "@/abis/MIR";
import nftAbi from "@/abis/NFTMIR";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { formatUnits } from "viem";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import { useSepoliaTransaction } from "@/hooks/use-sepolia-transaction";
import { TransactionLink } from "@/components/transaction-link";
import { useRef } from "react";

export default function TokenApprove({
  amount,
  disabled,
  className,
  onSuccess,
  onBusyChange,
}: {
  amount: bigint;
  disabled?: boolean;
  className?: string;
  onSuccess?: () => Promise<unknown> | void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const { run, writeContractAsync, isPending, hash } = useSepoliaTransaction();
  const submitting = useRef(false);
  const isRevoke = amount === 0n;
  const actionLabel = isRevoke ? "Revoke allowance" : "Approve this amount";
  const pendingLabel = isRevoke ? "Revoking..." : "Approving...";

  async function approve() {
    if (amount < 0n || submitting.current) return;
    submitting.current = true;
    onBusyChange?.(true);
    try {
      const receipt = await run((account) =>
        writeContractAsync({
          account,
          chainId: APP_CHAIN_ID,
          address: erc20Abi.contractAddress,
          abi: erc20Abi.abi,
          functionName: "approve",
          args: [nftAbi.contractAddress, amount],
        }),
      );
      if (receipt) await onSuccess?.();
    } finally {
      submitting.current = false;
      onBusyChange?.(false);
    }
  }

  return (
    <div className="w-full space-y-2">
      <p className="text-xs break-all text-muted-foreground">
        {isRevoke
          ? "Remove Anty authorization for"
          : `Authorize ${formatUnits(amount, erc20Abi.contractDecimals)} Anty for`}{" "}
        {nftAbi.contractAddress} on Sepolia.
      </p>
      <Button
        className={className}
        type="button"
        variant={isRevoke ? "outline" : "secondary"}
        disabled={disabled || isPending || amount < 0n}
        onClick={approve}
      >
        {isPending && <Loader2 className="mr-2 animate-spin" />}
        {isPending ? pendingLabel : actionLabel}
      </Button>
      <TransactionLink hash={hash} />
    </div>
  );
}
