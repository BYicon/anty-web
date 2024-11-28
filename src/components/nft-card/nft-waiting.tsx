import {
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import "./nft-card.scss";
import nftAbi from "@/abi/NFTMIR";
import { useEffect, useState } from "react";
import { uploadToIPFS } from "@/http/api";
import html2canvas from "html2canvas";
import { createIcon } from "@/shared/blockies";
import { generateHash, padTokenId } from "@/shared/utils";

export default function NftCard({
  id,
  tokenId,
  onRedeem,
  onRedeemSuccess,
  onRedeemError,
}: {
  id: string;
  tokenId: number;
  onRedeem?: () => void;
  onRedeemSuccess?: () => void;
  onRedeemError?: () => void;
}) {
  const cardNumber = padTokenId(tokenId);
  const { data: tx, writeContract } = useWriteContract();

  function generateImage() {
    const cardElement = document.getElementById(id) as HTMLElement;
    const seed = generateHash(cardNumber);
    const canvas = createIcon({
      seed,
      size: 5,
      scale: 30,
    });
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.opacity = "0.6";
    cardElement.style.background = `url(${canvas.toDataURL()}) no-repeat center center`;
    cardElement.style.backgroundSize = "cover";
    return new Promise((resolve, reject) => {
      html2canvas(cardElement, {
        scale: 2
      }).then((canvas) => {
        if (canvas) {
          canvas.toBlob(async (blob) => {
            if (blob) {
              uploadToIPFS(new File([blob], "image.png", { type: "image/png" })).then((url) => {
                resolve(url);
              }).catch((err) => reject(err));
            }
          }, "image/png");
        }
      });
    });
  }

  const handleRedeem = async () => {
    const img = await generateImage();
    onRedeem && onRedeem();
    await writeContract({
      address: nftAbi.contractAddress,
      abi: nftAbi.abi,
      functionName: "redeem",
      args: [BigInt(tokenId), img as string],
    });
  };

  const {
    isLoading: isRedeemLoading,
    isSuccess: isRedeemSuccess,
    error: isRedeemError,
  } = useWaitForTransactionReceipt({
    hash: tx,
  });

  useEffect(() => {
    if (isRedeemSuccess) {
      onRedeemSuccess && onRedeemSuccess();
    }
    if (isRedeemError) {
      onRedeemError && onRedeemError();
    }
  }, [isRedeemSuccess, isRedeemError]);

  // TODO: 为什么会接受到多次
  // useWatchContractEvent({
  //   address: nftAbi.contractAddress,
  //   abi: nftAbi.abi,
  //   eventName: "Redeem",
  //   onLogs(logs) {
  //     console.log("Redeem event logs 🔵🔵🔵", logs);
  //     onRedeem && onRedeem();
  //   },
  //   onError(error) {
  //     console.log("Redeem event error 🔴🔴🔴", error);
  //   },
  // });

  return (
    <div className="nft-card">
      <div className="nft-card-content">
        <div className="card-title">NFT Membership Card</div>
        <div className="card-number" id="cardNumber">
          {cardNumber}
        </div>
        <div className="text-md text-gray-500 mt-2">
          <span className="text-black">status:</span> waiting for redeem
        </div>
      </div>
      <div className="mt-4 px-4">
        <div className="flex justify-end items-center">
          <button className="btn-primary" disabled={isRedeemLoading} onClick={handleRedeem}>
            {isRedeemLoading ? "Redeeming..." : "Redeem"}
          </button>
        </div>
      </div>
      {/* 用户生成图片 */}
      <div className="nft-card-content-user" id={id}>
        <img className="card-logo" src="/images/logo.png" alt="nft" />
        <div className="card-title">VIP</div>
        <div className="card-number" id="cardNumber">
          NO.{cardNumber}
        </div>
        <div className="card-date">
          {/* TODO:使用链上时间 */}
          {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
