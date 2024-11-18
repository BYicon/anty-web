"use client";
import {
  useAccount,
  useBalance,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
} from "wagmi";
import usdtAbi from "@/abi/USDT.json";
import mainAbi from "@/abi/NFTMIR.json";
import "./recharge.scss";
import { useState } from "react";
import UsdtApprove from "@/components/usdt-approve/usdt-approve";

const USDT_ADDRESS = process.env
  .NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`;
const MAIN_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS as `0x${string}`;

export default function Recharge() {
  const { address: currentAddress } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const [useid, setUserid] = useState<string>("");
  const [rechargeAmount, setRechargeAmount] = useState<string>("");
  const [inviter, setInviter] = useState<string>("");

  // 获取当前用户授权USDT的额度
  const {
    data: allowanceData,
    refetch: refetchAllowance,
    error: allowanceError,
    isSuccess: allowanceIsSuccess,
  } = useReadContract({
    address: USDT_ADDRESS,
    abi: usdtAbi.abi,
    functionName: "allowance",
    args: [currentAddress, MAIN_CONTRACT_ADDRESS],
  });

  const { data: usdtBalance, refetch: refetchUsdtBalance } = useBalance({
    address: currentAddress,
    token: USDT_ADDRESS,
  });

  const onApprove = () => {
    refetchAllowance();
  };

  const {
    data: rechargeData,
    error: rechargeError,
    isPending: rechargeIsPending,
    isSuccess: rechargeIsSuccess,
    isLoading: rechargeIsLoading,
  } = useSimulateContract({
    address: MAIN_CONTRACT_ADDRESS,
    abi: mainAbi.abi,
    functionName: "recharge",
    args: [useid, currentAddress, +rechargeAmount * 10 ** 18],
  });
  
  const onRecharge = async () => {
    if(Number(allowanceData) < Number(rechargeAmount) * 10 ** 18) {
      alert('授权额度不足');
      return;
    }
    if (rechargeAmount && useid){
      await writeContract(rechargeData!.request);
      if (rechargeIsSuccess) {
        console.log("rechargeIsSuccess 🚀🚀🚀", rechargeIsSuccess);
      } else {
        console.log("error 🚀🚀🚀", rechargeError);
      }
    } else {
      alert("请输入正确的用户id和充值金额");
    }
  };
  useWatchContractEvent({
    address: MAIN_CONTRACT_ADDRESS,
    abi: mainAbi.abi,
    eventName: "Recharge",
    onLogs(logs) {
      console.log("Recharge event logs 🔵🔵🔵", logs);
      refetchUsdtBalance();
      refetchAllowance();
    },
    onError(error) {
      console.log("Recharge event error 🔴🔴🔴", error);
    },
  });

  return (
    <div className="recharge-page">
      <div>
        余额：{usdtBalance?.formatted} {usdtBalance?.symbol}
      </div>
      <div>授权额度：{Number(allowanceData) / 10 ** 18}</div>
      <div className="recharge-page-content">
        <div className="recharge-form">
          <div className="recharge-form-item">
            <label className="text-sm font-bold">Userid</label>
            <input
              className="recharge-form-item-input"
              type="text"
              value={useid}
              placeholder="Wechat MP Userid"
              onChange={(e) => setUserid(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="text-sm font-bold">Amount</label>
            <input
              className="recharge-form-item-input"
              type="text"
              placeholder="Recharge USDT Amount"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="text-sm font-bold">Inviter</label>
            <input
              className="recharge-form-item-input"
              type="text"
              placeholder="Wallet Address"
              value={inviter}
              onChange={(e) => setInviter(e.target.value)}
            />
          </div>
          <div className="recharge-form-actions">
            <UsdtApprove onApprove={onApprove} />
            <button
              className="btn-primary w-[180px] mt-4"
              type="button"
              onClick={onRecharge}
            >
              Recharge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
