"use client";
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
} from "wagmi";
import mainAbi from "@/abi/NFTMIR.json";
import { useEffect, useRef, useState } from "react";
import NftCard from "@/components/nft-card/nft-card";
import html2canvas from "html2canvas";
import Loading from "@/components/loading/loading";
import "./nfts.scss";

const MAIN_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS as `0x${string}`;

export default function NftsPage() {
  const { address: currentAddress } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("loading...");

  // const { waitingForRedeem, refetchWaitingForRedeem } = useNftRedeem();
  const {
    data: waitingForRedeem,
    error: waitingForRedeemError,
    refetch: refetchWaitingForRedeem,
    queryKey
  } = useReadContract({
    address: MAIN_CONTRACT_ADDRESS,
    abi: mainAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress],
  });

  const onRedeem = () => {
    refetchWaitingForRedeem();
  }

  useEffect(() => {
    console.log(queryKey);
  }, []);

  return (
    <div className="nfts-page">
      <div className="nfts-page-content-nft">
        {waitingForRedeem &&
          (waitingForRedeem as any).map((item: any) => (
            <NftCard key={item} id={`card-${item}`} tokenId={item} onRedeem={onRedeem} />
          ))}
      </div>
      <Loading loading={isLoading} loadingText={loadingText} />
    </div>
  );
}
