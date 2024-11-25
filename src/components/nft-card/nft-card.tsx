import { useSimulateContract, useWatchContractEvent, useWriteContract } from "wagmi";
import "./nft-card.scss";
import nftAbi from '@/abi/NFTMIR';
import { useState } from "react";
import { uploadToIPFS } from "@/http/api";
import html2canvas from "html2canvas";

function padTokenId(tokenId: number) {
  return tokenId.toString().padStart(8, "0");
}

const MAIN_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS as `0x${string}`;

export default function NftCard({
  id,
  tokenId,
  onRedeem,
}: {
  id: string;
  tokenId: number;
  onRedeem?: () => void;
}) {
  const cardNumber = padTokenId(tokenId);
  const { writeContract } = useWriteContract();
  const [tx, setTx] = useState<any>(null);


  function generateImage() {
    const cardElement = document.getElementById(id) as HTMLElement;
    return new Promise((resolve, reject) => {
      html2canvas(cardElement, {
        scale: 2,
    }).then((canvas) => {
      console.log(canvas);
      if (canvas) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            // TODO: 处理圆角问题，去掉按钮等
            uploadToIPFS(new File([blob], "image.png", { type: "image/png" })).then((url) => {
              console.log(url);
              resolve(url);
            }).catch((err) => reject(err));
          }
        }, 'image/png'); // Specify the image type
        };
      });
    });
  }

  const {
    data: redeemData,
    error: redeemError,
    isPending: redeemIsPending,
    isSuccess: redeemIsSuccess,
    isLoading: redeemIsLoading,
  } = useSimulateContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "redeem",
    args: [BigInt(tokenId), 'https://ioby.cn/'],
  });

  const handleRedeem = async () => {
    const img = await generateImage();
    console.log('img 🚀🚀🚀', img);
    const tx = await writeContract({
      ...redeemData!.request,
      args: [BigInt(tokenId), img as string],
    });
    console.log('tx 🚀🚀🚀', tx);
  };


  useWatchContractEvent({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    eventName: "Redeem",
    onLogs(logs) {
      console.log("Redeem event logs 🔵🔵🔵", logs);
      onRedeem && onRedeem();
    },
    onError(error) {
      console.log("Redeem event error 🔴🔴🔴", error);
    },
  });

  return (
    <div className="nft-card" id={id}>
      <div className="card-title">NFT Membership Card</div>
      <div className="card-number" id="cardNumber">
        {cardNumber}
      </div>
      <div className="nft-card-mask">
        <div className="nft-card-id">NO.{cardNumber}</div>
        <div className="nft-card-status">waiting for redeem {tx}</div>
        <div className="btn-primary" onClick={handleRedeem}>Redeem</div>
      </div>
    </div>
  );
}
