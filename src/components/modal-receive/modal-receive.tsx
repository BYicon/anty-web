"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import erc20Abi from "@/abis/MIR";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import { useSepoliaTransaction } from "@/hooks/use-sepolia-transaction";
import { SepoliaGate } from "@/components/connect-wallet-button/sepolia-gate";
import { TransactionLink } from "@/components/transaction-link";

export default function ModalReceive({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { address, chainId } = useAccount();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { run, writeContractAsync, isPending, hash } = useSepoliaTransaction();
  const { data: hasClaimed } = useReadContract({
    chainId: APP_CHAIN_ID,
    address: erc20Abi.contractAddress,
    abi: erc20Abi.abi,
    functionName: "claims",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    query: { enabled: Boolean(address) && chainId === APP_CHAIN_ID },
  });

  useEffect(() => {
    setOpen(
      Boolean(address) && chainId === APP_CHAIN_ID && hasClaimed === false,
    );
  }, [address, chainId, hasClaimed]);

  async function onClaim() {
    const receipt = await run((account) =>
      writeContractAsync({
        account,
        chainId: APP_CHAIN_ID,
        address: erc20Abi.contractAddress,
        abi: erc20Abi.abi,
        functionName: "registerClaim",
      }),
    );
    if (receipt) {
      setOpen(false);
      await queryClient.invalidateQueries();
      toast({
        title: "Tokens claimed",
        description: "Your token claim was confirmed on Sepolia.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim your test tokens</DialogTitle>
          <DialogDescription>
            Claim Anty once per wallet on Sepolia. You will need Sepolia ETH for
            gas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <TransactionLink hash={hash} />
          <SepoliaGate>
            <Button
              type="button"
              disabled={isPending || hasClaimed !== false}
              onClick={onClaim}
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isPending ? "Claiming..." : "Claim Anty"}
            </Button>
          </SepoliaGate>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
