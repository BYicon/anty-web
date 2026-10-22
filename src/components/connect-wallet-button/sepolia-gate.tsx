"use client";

import { type ReactNode } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import ConnectWalletButton from "./connect-wallet-button";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { transactionErrorMessage } from "@/hooks/use-sepolia-transaction";

export function SepoliaGate({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { address, chainId } = useAccount();
  const { switchChainAsync, isPending } = useSwitchChain();
  const { toast } = useToast();

  if (!address) return <ConnectWalletButton className={className} />;
  if (chainId === APP_CHAIN_ID) return children;

  return (
    <Button
      type="button"
      className={className}
      disabled={isPending}
      onClick={async () => {
        try {
          await switchChainAsync({ chainId: APP_CHAIN_ID });
        } catch (error) {
          toast({
            title: "Could not switch network",
            description: transactionErrorMessage(error),
            variant: "destructive",
          });
        }
      }}
    >
      {isPending ? "Switching network..." : "Switch to Sepolia"}
    </Button>
  );
}
