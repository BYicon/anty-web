"use client";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import nftAbi from "@/abis/NFTMIR";
import signatureDropAbi from "@/abis/SignatureDrop";
import { useEffect, useState } from "react";
import NftCardWaiting from "@/components/nft-card/nft-waiting";
import NftCardMinted from "@/components/nft-card/nft-minted";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import confetti from "canvas-confetti";
import "./nfts.scss";
import { Skeleton } from "@/components/ui/skeleton";
import { get } from "@/shared/request";
import { useToast } from "@/components/ui/use-toast";


export default function NftsPage() {
  const { toast } = useToast();
  const { address: currentAddress } = useAccount();
  const {
    isPending: isUserNftsPending,
    data: userNfts,
    refetch: refetchUserNfts,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getNFTsByUser",
    args: [currentAddress as `0x${string}`],
  });

  const {
    isPending: isWaitingForRedeemPending,
    data: waitingForRedeem,
    refetch: refetchWaitingForRedeem,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress as `0x${string}`],
  });

  const {
    data: hash,
    writeContract,
  } = useWriteContract();
  
  const onRedeemSuccess = () => {
    refetchWaitingForRedeem();
    refetchUserNfts();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.7 },
    });
  };
  const onRedeemError = () => {};

  const {
    isLoading: isClaiming,
    isSuccess: isClaimingSuccess,
    error: claimError,
  } = useWaitForTransactionReceipt({
    hash,
  });


  useEffect(() => {
    get("/airdrop/sign", {
      params: {
        recipient: currentAddress,
      },
    })
      .then(async ({data}) => {
        console.log("signature 🚀🚀🚀", data);
        
        await writeContract({
          address: signatureDropAbi.contractAddress,
          abi: signatureDropAbi.abi,
          functionName: "claim",
          args: [
            currentAddress as `0x${string}`,
            BigInt(data.amount),
            BigInt(data.nonce),
            BigInt(data.deadline),
            data.signature,
          ],
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      });
  }, []);

  useEffect(() => {
    if (isClaimingSuccess) {
      console.log("isClaimingSuccess 🚀🚀🚀", isClaimingSuccess);
      toast({
        title: "Success",
        description: "You have successfully claimed.",
      });
    }
    if (claimError) {
      console.log("claimError 🔴🔴🔴", claimError);
      toast({
        title: "Error",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }, [isClaimingSuccess, claimError]);

  return (
    <div className="common-page nfts-page">
      <Card className="nfts-list mb-8">
        <CardHeader>
          <CardTitle>Owned</CardTitle>
          <CardDescription>total {userNfts?.length || 0} NFTs</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-8 min-h-[230px]">
          {isUserNftsPending ? (
            <>
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
            </>
          ) : userNfts && userNfts.length > 0 ? (
            userNfts.map((item: any) => (
              <NftCardMinted key={item.tokenID} data={item} />
            ))
          ) : (
            <div className="flex w-full justify-center items-center h-full text-2xl font-bold text-gray-500">
              no data
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="nfts-list">
        <CardHeader>
          <CardTitle>Waiting For Redeem</CardTitle>
          <CardDescription>
            total {waitingForRedeem?.length || 0} waiting for redeem
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-4 gap-8 min-h-[230px]">
          {isWaitingForRedeemPending ? (
            <>
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
              <Skeleton className="w-64 h-[230px]" />
            </>
          ) : waitingForRedeem && waitingForRedeem.length > 0 ? (
            (waitingForRedeem as any).map((item: any) => (
              <NftCardWaiting
                key={item}
                id={`card-${item}`}
                tokenId={item}
                onRedeem={onRedeem}
                onRedeemSuccess={onRedeemSuccess}
                onRedeemError={onRedeemError}
              />
            ))
          ) : (
            <div className="flex w-full justify-center items-center h-full text-2xl font-bold text-gray-500">
              No data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
