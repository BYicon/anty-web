import { useWaitForTransactionReceipt } from "wagmi";
import usdtAbi from "@/abi/USDT";
import nftAbi from "@/abi/NFTMIR";
import { useAccount, useWriteContract, useSimulateContract } from "wagmi";
import { useEffect } from "react";

export default function UsdtApprove(props: {
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
    args: [nftAbi.contractAddress, BigInt(+props.amount * 10 ** 18)],
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

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: isConfirmError } =
    useWaitForTransactionReceipt({
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
    <div>
      <button
        className="btn-secondary w-[360px] h-[56px]"
        type="button"
        disabled={isConfirming}
        onClick={onApproveHandler}
      >
        Approve{isConfirming ? "..." : ""}
      </button>
    </div>
  );
}
