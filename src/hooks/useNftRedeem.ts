import { useAccount, useReadContract } from "wagmi";
import nftAbi from "@/abi/NFTMIR.json";
import { useEffect } from "react";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
export const useNftRedeem = () => {
    const { address } = useAccount();
    const { data: waitingForRedeem, refetch: refetchWaitingForRedeem } = useReadContract({
        address: NFT_ADDRESS,
        abi: nftAbi.abi,
        functionName: "getWaitingForRedeem",
        args: [address],
    });
    useEffect(() => {
    }, [waitingForRedeem]);

    return {
        waitingForRedeem,
        refetchWaitingForRedeem,
    }
}
