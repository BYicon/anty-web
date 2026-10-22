"use client";

import { useAccount, useReadContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import nftAbi from "@/abis/NFTMIR";
import NftCardWaiting from "@/components/nft-card/nft-waiting";
import NftCardMinted from "@/components/nft-card/nft-minted";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SepoliaGate } from "@/components/connect-wallet-button/sepolia-gate";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import confetti from "canvas-confetti";
import "./nfts.scss";
import { Skeleton } from "@/components/ui/skeleton";

export default function NftsPage() {
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const enabled = Boolean(address) && chainId === APP_CHAIN_ID;
  const account = address ?? "0x0000000000000000000000000000000000000000";
  const owned = useReadContract({
    chainId: APP_CHAIN_ID,
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getNFTsByUser",
    args: [account],
    query: { enabled },
  });
  const waiting = useReadContract({
    chainId: APP_CHAIN_ID,
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [account],
    query: { enabled },
  });

  function onRedeemSuccess() {
    void queryClient.invalidateQueries();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void confetti({ particleCount: 100, spread: 100, origin: { y: 0.7 } });
    }
  }

  return (
    <div className="common-page nfts-page">
      <SepoliaGate>
        <Card className="nfts-list mb-8">
          <CardHeader>
            <CardTitle>Owned NFTs</CardTitle>
            <CardDescription>
              Sepolia · {owned.data?.length ?? 0} NFTs
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-8 min-h-[230px]">
            {owned.isPending ? (
              <Skeleton className="w-64 h-[230px]" />
            ) : owned.isError ? (
              <div role="alert">
                <p>Could not load your NFTs.</p>
                <Button variant="outline" onClick={() => void owned.refetch()}>
                  Retry
                </Button>
              </div>
            ) : owned.data?.length ? (
              owned.data.map((item) => (
                <NftCardMinted key={item.tokenID.toString()} data={item} />
              ))
            ) : (
              <p>No NFTs yet.</p>
            )}
          </CardContent>
        </Card>
        <Card className="nfts-list">
          <CardHeader>
            <CardTitle>Waiting for mint</CardTitle>
            <CardDescription>
              {waiting.data?.length ?? 0} NFTs available to mint on Sepolia
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-8 min-h-[230px]">
            {waiting.isPending ? (
              <Skeleton className="w-64 h-[230px]" />
            ) : waiting.isError ? (
              <div role="alert">
                <p>Could not load your mint eligibility.</p>
                <Button
                  variant="outline"
                  onClick={() => void waiting.refetch()}
                >
                  Retry
                </Button>
              </div>
            ) : waiting.data?.length ? (
              waiting.data.map((tokenId) => (
                <NftCardWaiting
                  key={tokenId.toString()}
                  id={"card-" + tokenId.toString()}
                  tokenId={tokenId}
                  onRedeemSuccess={onRedeemSuccess}
                />
              ))
            ) : (
              <p>No NFTs waiting for mint.</p>
            )}
          </CardContent>
        </Card>
      </SepoliaGate>
    </div>
  );
}
