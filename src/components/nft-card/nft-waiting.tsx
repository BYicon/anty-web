import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import "./nft-card.scss";
import { useEffect, useState } from "react";
import { uploadImage } from "@/http/api";
import nftAbi from "@/abis/NFTMIR";
import html2canvas from "html2canvas";
import { createIcon } from "@/shared/blockies";
import { generateHash, padTokenId } from "@/shared/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

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
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

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
        scale: 2,
      })
        .then((canvas) => {
          if (canvas) {
            canvas.toBlob(async (blob) => {
              if (blob) {
                const url = await uploadImage(
                  new File([blob], "image.png", { type: "image/png" })
                );
                resolve(url);
              }
            }, "image/png");
          }
        })
        .catch((err) => {
          setLoading(false);
          reject(err);
        });
    });
  }

  const handleRedeem = async () => {
    setLoading(true);
    const img = await generateImage();
    console.log("img", img);
    onRedeem && onRedeem();
    await writeContract({
      address: nftAbi.contractAddress,
      abi: nftAbi.abi,
      functionName: "redeem",
      args: [BigInt(tokenId), img as string],
    });
    setLoading(false);
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
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
        action: (
          <ToastAction altText="Try again" onClick={handleRedeem}>
            Try again
          </ToastAction>
        ),
      });
      onRedeemError && onRedeemError();
    }
  }, [isRedeemSuccess, isRedeemError]);

  return (
    <div className="nft-card hover:scale-105 transition-all duration-300">
      <div className="nft-card-content">
        <div className="card-title">VIP</div>
        <div className="card-number" id="cardNumber">
          NO.{cardNumber}
        </div>
        <div className="text-md text-gray-500 mt-2">
          <span className="text-black">status:</span> waiting for redeem
        </div>
      </div>
      <div className="mt-4 px-4">
        <div className="flex items-center">
          <Button
            onClick={handleRedeem}
            className="w-full h-10"
            disabled={isRedeemLoading || loading}
          >
            {isRedeemLoading || loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              ""
            )}
            {isRedeemLoading || loading ? "Redeeming..." : "Redeem"}
          </Button>
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
