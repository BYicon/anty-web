import { useAccount, useReadContract } from "wagmi";
import nftAbi from "@/abi/NFTMIR.json";
import { useEffect } from "react";

const NFT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as `0x${string}`;
export const useNftRedeem = () => {
    const { address: currentAddress } = useAccount();
    const { data: waitingForRedeem, error: waitingForRedeemError, refetch: refetchWaitingForRedeem } = useReadContract({
        address: NFT_ADDRESS,
        abi: nftAbi.abi,
        functionName: "getWaitingForRedeem",
        args: [currentAddress],
    });
    console.log("waitingForRedeemError 🟢🟢🟢", waitingForRedeemError);
    console.log("currentAddress 🟢🟢🟢", currentAddress);
    return {
        waitingForRedeem,
        refetchWaitingForRedeem,
    }
}
