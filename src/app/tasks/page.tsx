"use client";
import "./tasks.scss";
import { Button } from "@/components/ui/button";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import mirAbi from "@/abi/MIR";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const { address: currentAddress } = useAccount();
  const [canCheckIn, setCanCheckIn] = useState(true);
  const { data: checkInTime, refetch: refetchCheckInTime } = useReadContract({
    address: mirAbi.contractAddress,
    abi: mirAbi.abi,
    functionName: "lastDailyCheck",
    args: [currentAddress as `0x${string}`],
  });

  const { data: hash, writeContract, error: checkInError } = useWriteContract();
  const checkInHandler = async () => {
    console.log("checkInError 🚀🚀🚀", checkInError);
    console.log("checkInTime 🚀🚀🚀", checkInTime);
    await writeContract({
      address: mirAbi.contractAddress,
      abi: mirAbi.abi,
      functionName: "dailyCheck",
    });
  };

  const { isSuccess: isCheckInSuccess, isPending: isCheckInPending } =
    useWaitForTransactionReceipt({
      hash: hash,
    });

  useEffect(() => {
    console.log("isCheckInSuccess 🚀🚀🚀", isCheckInSuccess);
    refetchCheckInTime();
  }, [isCheckInSuccess]);

  useEffect(() => {
    if(checkInTime && (Date.now() / 1000 - checkInTime < 86400)) {
      setCanCheckIn(false);
    }
  }, [checkInTime]);

  return (
    <div className="tasks-page common-page">
      <Button disabled={!canCheckIn} type="button" onClick={checkInHandler}>Check In</Button>
      <div>{canCheckIn}</div>
    </div>
  );
}
