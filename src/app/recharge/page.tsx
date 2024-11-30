"use client";
import {
  useAccount,
  useBalance,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useWatchContractEvent,
  useWaitForTransactionReceipt,
} from "wagmi";
import usdtAbi from "@/abi/USDT";
import nftAbi from "@/abi/NFTMIR";
import "./recharge.scss";
import { useEffect, useState } from "react";
import UsdtApprove from "@/components/usdt-approve/usdt-approve";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


export default function RechargePage() {
  const { address: currentAddress } = useAccount();
  const [userid, setUserid] = useState<string>("");
  const [rechargeAmount, setRechargeAmount] = useState<string>("");
  const [referral, setReferral] = useState<string>("");
  const { toast } = useToast();

  const {
    data: hash,
    isPending: writeIsPending,
    isSuccess: writeIsSuccess,
    isError: writeIsError,
    writeContract,
  } = useWriteContract();

  // 获取当前用户授权USDT的额度
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: usdtAbi.contractAddress,
    abi: usdtAbi.abi,
    functionName: "allowance",
    args: [
      currentAddress as `0x${string}`,
      nftAbi.contractAddress,
    ],
  });

  const { data: usdtBalance, refetch: refetchUsdtBalance } = useBalance({
    address: currentAddress,
    token: usdtAbi.contractAddress,
  });

  const onApproveHandler = () => {};
  const onApproveSuccess = () => {
    refetchAllowance();
  };
  const onApproveError = (error: any) => {
    console.log("onApproveError", error);
  };

  // TODO: learn more 。。。
  const {
    data: rechargeData,
    error: rechargeError,
    isPending: rechargeIsPending,
    isSuccess: rechargeIsSuccess,
    isLoading: rechargeIsLoading,
  } = useSimulateContract({
    address: nftAbi.contractAddress as `0x${string}`,
    abi: nftAbi.abi,
    functionName: "recharge",
    args: [
      BigInt(userid),
      BigInt(rechargeAmount) * BigInt(10 ** usdtAbi.contractDecimals),
    ],
  });

  const onRecharge = async () => {
    if (
      Number(allowanceData) <
      Number(rechargeAmount) * 10 ** usdtAbi.contractDecimals
    ) {
      alert("授权额度不足");
      return;
    }
    if (rechargeAmount && userid) {
      await writeContract(rechargeData!.request);
      console.log("writeIsPending 🚀🚀🚀", writeIsPending);
      console.log("writeIsSuccess 🚀🚀🚀", writeIsSuccess);
      console.log("writeIsError 🔴🔴🔴", writeIsError);
      if (rechargeIsSuccess) {
        console.log("rechargeIsSuccess 🚀🚀🚀", rechargeIsSuccess);
      } else {
        console.log("error 🚀🚀🚀", rechargeError);
      }
    } else {
      alert("请输入正确的用户id和充值金额");
    }
  };
  const {
    isLoading: isRechargeLoading,
    isSuccess: isRechargeSuccess,
    error: isRechargeError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isRechargeSuccess) {
      console.log("isRechargeSuccess 🟢🟢🟢", isRechargeSuccess);
      refetchUsdtBalance();
      refetchAllowance();
      toast({
        title: "Success",
        description: "You have successfully recharged.",
      });
    }
    if (isRechargeError) {
      toast({
        title: "Error",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }, [isRechargeSuccess, isRechargeError]);

  const [needApprove, setNeedApprove] = useState(false);
  useEffect(() => {
    setNeedApprove(
      Number(allowanceData) <
        Number(rechargeAmount) * 10 ** usdtAbi.contractDecimals
    ); // TODO: 精度问题
  }, [allowanceData, rechargeAmount]);

  return (
    <div className="recharge-page common-page">
      <div className="recharge-page-content">
        <div className="recharge-form">
          <div className="recharge-form-title">
            <h1 className="recharge-form-title-text">Buy G coins</h1>
            <p className="recharge-form-title-desc">
              Buy G coins for your WECHAT MINI PROGRAM {allowanceData}
            </p>
          </div>
          <div className="recharge-form-allowance">
            <span className="iconfont icon-balance icon-licai relative top-[-2px]"></span>
            ${usdtBalance?.formatted || "0"}
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">User ID</label>
            <input
              className="recharge-form-item-input"
              type="text"
              value={userid}
              placeholder="Wechat MP Userid"
              onChange={(e) => setUserid(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">Amount</label>
            <input
              className="recharge-form-item-input"
              type="text"
              placeholder="Tether USDT"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">Referral</label>
            <input
              className="recharge-form-item-input"
              type="text"
              placeholder="Referral Wallet Address"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
            />
          </div>
          <div className="recharge-form-actions">
            {needApprove ? (
              <UsdtApprove
                className="recharge-actions-button"
                onApprove={() => onApproveHandler()}
                onSuccess={onApproveSuccess}
                onError={onApproveError}
                amount={rechargeAmount}
              />
            ) : currentAddress ? (
              <Button
                className="recharge-actions-button"
                size="lg"
                onClick={onRecharge}
                disabled={isRechargeLoading}
              >
                {isRechargeLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isRechargeLoading ? "Recharging..." : "Recharge"}
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
