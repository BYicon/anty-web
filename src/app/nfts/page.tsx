"use client";
import {
  useAccount,
  useReadContract,
} from "wagmi";
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
import confetti from "canvas-confetti";
import "./nfts.scss";
import { Skeleton } from "@/components/ui/skeleton";
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
