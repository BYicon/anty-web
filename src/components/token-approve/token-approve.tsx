import { useWaitForTransactionReceipt } from "wagmi";
import erc20Abi from "@/abis/MIR";
import nftAbi from "@/abis/NFTMIR";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { parseUnits } from "viem";

export default function TokenApprove(props: {
  className?: string;
  amount: string | number;
  onApprove?: () => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  const { address: currentAddress } = useAccount();

  const { data: hash, writeContract } = useWriteContract();
  const onApproveHandler = async () => {
    props.onApprove && props.onApprove();
    if (currentAddress) {
      const result = await writeContract({
        address: erc20Abi.contractAddress,
        abi: erc20Abi.abi,
        functionName: "approve",
        args: [
          nftAbi.contractAddress,
          parseUnits(props.amount.toString(), erc20Abi.contractDecimals),
        ],
      });
      console.log("result 🚀🚀🚀", result);
    }
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: isConfirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      console.log("isConfirmed 🟢🟢🟢", isConfirmed);
      props.onSuccess && props.onSuccess();
    }
    if (isConfirmError) {
      console.log("isConfirmError 🔴🔴🔴", isConfirmError);
      props.onError && props.onError(isConfirmError);
    }
  }, [isConfirmed, isConfirmError]);

  // useWatchContractEvent({
  //   address: erc20Abi.contractAddress as `0x${string}`,
  //   abi: erc20Abi.abi,
  //   eventName: "Approval",
  //   onLogs(logs) {
  //     console.log("Approval event logs 🔵🔵🔵", logs);
  //   }
  // })

  return (
    <Button
      className={`${props.className}`}
      type="button"
      variant="secondary"
      disabled={isConfirming}
      onClick={onApproveHandler}
    >
      {isConfirming ? <Loader2 className="animate-spin" /> : ""}
      Approve
    </Button>
  );
}
