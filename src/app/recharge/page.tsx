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
import { useEffect, useRef, useState } from "react";
import UsdtApprove from "@/components/usdt-approve/usdt-approve";
import { useNftRedeem } from "@/hooks/useNftRedeem";
import NftCard from "@/components/nft-card/nft-card";
import html2canvas from "html2canvas";
import Loading from "@/components/loading/loading";

const USDT_ADDRESS = process.env
  .NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`;
const MAIN_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS as `0x${string}`;

export default function Recharge() {
  const { address: currentAddress } = useAccount();
  const { data: hash, isPending: writeIsPending, isSuccess: writeIsSuccess, isError: writeIsError, writeContract } = useWriteContract();
  const [useid, setUserid] = useState<string>("");
  const [rechargeAmount, setRechargeAmount] = useState<string>("");
  const [referral, setReferral] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("loading...");

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

  const onApproveHandler = () => {
    setIsLoading(true);
    setLoadingText("approving...");
  }

  // 授权成功
  const onApproveSuccess = () => {
    setIsLoading(false);
    refetchAllowance();
  }
  const onApproveError = (error: any) => {
    setIsLoading(false);
  }

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
    args: [useid, +rechargeAmount * 10 ** 18],
  });

  const onRecharge = async () => {
    if (Number(allowanceData) < Number(rechargeAmount) * 10 ** 18) {
      alert("授权额度不足");
      return;
    }
    if (rechargeAmount && useid) {
      setIsLoading(true);
      setLoadingText("recharging...");
      const res = await writeContract(rechargeData!.request);
      console.log('res 🟢🟢🟢', res);
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
  useWatchContractEvent({
    address: MAIN_CONTRACT_ADDRESS,
    abi: mainAbi.abi,
    eventName: "Recharge",
    onLogs(logs) {
      console.log("Recharge event logs 🔵🔵🔵", logs);
      refetchUsdtBalance();
      refetchAllowance();
      setIsLoading(false);
      if(logs.length > 0) { 
        const mintableTokenIds = (logs[0] as any).args.mintableTokenIds;
        if(mintableTokenIds.length > 0) {
          alert(`恭喜获得${mintableTokenIds.join(",")}，共${mintableTokenIds.length}个NFT`);
        }
      }
    },
    onError(error) {
      setIsLoading(false);
      console.log("Recharge event error 🔴🔴🔴", error);
    },
  });

  const [needApprove, setNeedApprove] = useState(false);
  useEffect(() => {
    setNeedApprove(Number(allowanceData) < Number(rechargeAmount) * 10 ** 18); // TODO: 精度问题
  }, [allowanceData, rechargeAmount]);


  // const { waitingForRedeem, refetchWaitingForRedeem } = useNftRedeem();


  function generateImage() {
      const cardElement = document.getElementById("card-12") as HTMLElement;
      html2canvas(cardElement, {
        scale: 2,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        console.log(imgData);
        // For demonstration, let's display the image
        const imgElement = document.createElement("img");
        imgElement.src = imgData;
        document.body.appendChild(imgElement);
      });
  }

  return (
    <div className="recharge-page">
      <div className="recharge-page-content">
        <div className="recharge-form">
          <div className="recharge-form-title">
            <h1 className="recharge-form-title-text">
              Buy G coins
            </h1>
            <p className="recharge-form-title-desc">
              Buy G coins for your WECHAT MINI PROGRAM
            </p>
          </div>
          <div className="recharge-form-allowance">
              <span className="iconfont icon-balance icon-licai relative top-[-2px]"></span>${usdtBalance?.formatted || "0"}
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">USER ID</label>
            <input
              className="recharge-form-item-input"
              type="text"
              value={useid}
              placeholder="Wechat MP Userid"
              onChange={(e) => setUserid(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">AMOUNT</label>
            <input
              className="recharge-form-item-input"
              type="text"
              placeholder="USDT"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
          </div>
          <div className="recharge-form-item">
            <label className="recharge-form-item-label">REFERRAL</label>
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
              <UsdtApprove onApprove={() => onApproveHandler()} onSuccess={onApproveSuccess} onError={onApproveError} amount={rechargeAmount} />
            ) : (
              <button
                className="btn-primary h-[56px] w-[360px]"
                type="button"
                onClick={onRecharge}
              >
                Recharge
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <NftCard id="card-12" tokenId={12} />
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button> */}
      <Loading loading={isLoading} loadingText={loadingText} />
    </div>
  );
}
