import { useWaitForTransactionReceipt } from "wagmi";
import usdtAbi from "@/abi/USDT";
import nftAbi from "@/abi/NFTMIR";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { parseUnits } from "viem";

export default function UsdtApprove(props: {
  className?: string;
  amount: string | number;
  onApprove?: () => void;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  const { address: currentAddress } = useAccount();
  const {
    data: approveData,
    error: simulateError,
    isSuccess: approveIsSuccess,
    isLoading: approveIsLoading,
    isPending: approveIsPending,
  } = useSimulateContract({
    address: usdtAbi.contractAddress,
    abi: usdtAbi.abi,
    functionName: "approve",
    args: [
      nftAbi.contractAddress,
      parseUnits(props.amount.toString(), usdtAbi.contractDecimals),
    ],
  });

  const { data: hash, writeContract } = useWriteContract();
  const onApproveHandler = async () => {
    props.onApprove && props.onApprove();
    if (currentAddress) {
      const result = await writeContract(approveData!.request);
      console.log("result 🚀🚀🚀", result);
      if (approveIsSuccess) {
        console.log("approveIsSuccess 🚀🚀🚀", approveIsSuccess);
      } else {
        console.log("error 🔴🔴🔴", simulateError);
      }
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
  //   address: usdtAbi.contractAddress as `0x${string}`,
  //   abi: usdtAbi.abi,
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
