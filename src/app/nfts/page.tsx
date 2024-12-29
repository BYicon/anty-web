"use client";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import nftAbi from "@/abis/NFTMIR";
import signatureDropAbi from "@/abis/SignatureDrop";
import { useEffect, useRef, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
// import { get } from "@/shared/request";
// import { formatUnits } from "viem";
// import { Button } from "@/components/ui/button";

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

  // const signatureInfo = useRef<{
  //   amount: bigint;
  //   nonce: bigint;
  //   deadline: bigint;
  //   signature: string;
  // }>({
  //   amount: BigInt(0),
  //   nonce: BigInt(0),
  //   deadline: BigInt(0),
  //   signature: "",
  // });

  const { data: hash, writeContract, error: claimError } = useWriteContract();

  const onRedeem = () => {};

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

  // const claim = async () => {
  //   console.log("signatureInfo.current 🚀🚀🚀", signatureInfo.current);
  //   await writeContract({
  //     address: signatureDropAbi.contractAddress,
  //     abi: signatureDropAbi.abi,
  //     functionName: "claim",
  //     args: [
  //       currentAddress as `0x${string}`,
  //       signatureInfo.current.amount,
  //       signatureInfo.current.nonce,
  //       signatureInfo.current.deadline,
  //       signatureInfo.current.signature as `0x${string}`,
  //     ],
  //   });
  // };

  // const {
  //   isLoading: isClaiming,
  //   isSuccess: isClaimingSuccess,
  //   error: writeContractError,
  // } = useWaitForTransactionReceipt({
  //   hash,
  // });

  // ethereum,request({method: "personal_sign", params:[account, hash]})
  useEffect(() => {
    // console.log("currentAddress 🚀🚀🚀", currentAddress);
    // window.ethereum.request({method: "personal_sign", params:[currentAddress, '0x62d62cb541e9ca76f26bb313f7b101b849e270d4608195b47c66474d9c97ef3c']}).then((res: any) => {
    //   console.log("signature wallet 🚀🚀🚀", res);
    // });
    // console.log("hash 🚀🚀🚀", hash);
    // get("/airdrop/sign", {
    //   params: {
    //     recipient: currentAddress,
    //   },
    // })
    //   .then(async ({data}) => {
    //     signatureInfo.current = data;
    //   })
    //   .catch((err) => {
    //     toast({
    //       title: "Error",
    //       description: err.message,
    //       variant: "destructive",
    //     });
    //   });
  }, []);

  useEffect(() => {
    if (isClaimingSuccess) {
      console.log("isClaimingSuccess 🚀🚀🚀", isClaimingSuccess);
      toast({
        title: "Success",
        description: "You have successfully claimed.",
      });
    }
    if (writeContractError) {
      console.log("writeContractError 🔴🔴🔴", writeContractError);
      toast({
        title: "Error",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }, [isClaimingSuccess, writeContractError, hash]);

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
