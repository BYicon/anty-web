"use client";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
} from "wagmi";
import nftAbi from "@/abi/NFTMIR";
import { useEffect, useRef, useState } from "react";
import NftCardWaiting from "@/components/nft-card/nft-waiting";
import NftCardMinted from "@/components/nft-card/nft-minted";
import Loading from "@/components/loading/loading";
import "./nfts.scss";

export default function NftsPage() {
  const { address: currentAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("loading...");

  const {
    data: userNfts,
    error: userNftsError,
    refetch: refetchUserNfts,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getTokensWithURI",
    args: [currentAddress as `0x${string}`],
  });


  const {
    data: waitingForRedeem,
    error: waitingForRedeemError,
    refetch: refetchWaitingForRedeem,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress as `0x${string}`],
  });

  const onRedeem = () => {
    refetchWaitingForRedeem();
    refetchUserNfts();
  };

  useEffect(() => {
    if (userNfts) {
      console.log("userNfts", userNfts);

    }
  }, [userNfts]);

  return (
    <div className="nfts-page">
      {userNfts && userNfts.length > 0 && (
        <>
          <div className="nft-list-title">Owned</div>
          <div className="nft-list">
          {
          (userNfts as any).map((item: any) => (
            <NftCardMinted key={item.tokenID} data={item} />
            ))
          }
          </div>
        </>
      )}
      {waitingForRedeem && waitingForRedeem.length > 0 && (
        <>
          <div className="nft-list-title">Waiting for redeem</div>
          <div className="nft-list">
          {(waitingForRedeem as any).map((item: any) => (
            <NftCardWaiting key={item} id={`card-${item}`} tokenId={item} onRedeem={onRedeem} />
          ))}
          </div>
        </>
      )}
      <Loading loading={isLoading} loadingText={loadingText} />
    </div>
  );
}
