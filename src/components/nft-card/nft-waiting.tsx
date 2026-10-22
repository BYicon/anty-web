"use client";

import "./nft-card.scss";
import { useRef, useState } from "react";
import { uploadImage } from "@/http/api";
import nftAbi from "@/abis/NFTMIR";
import html2canvas from "html2canvas";
import { createIcon } from "@/shared/blockies";
import { generateHash, padTokenId } from "@/shared/utils";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import { canvasToBlob } from "@/lib/nft-image";
import { useSepoliaTransaction } from "@/hooks/use-sepolia-transaction";
import { SepoliaGate } from "@/components/connect-wallet-button/sepolia-gate";
import { TransactionLink } from "@/components/transaction-link";

export default function NftCard({
  id,
  tokenId,
  onRedeem,
  onRedeemSuccess,
  onRedeemError,
}: {
  id: string;
  tokenId: bigint;
  onRedeem?: () => void;
  onRedeemSuccess?: () => void;
  onRedeemError?: () => void;
}) {
  const cardNumber = padTokenId(tokenId);
  const { run, writeContractAsync, isPending, hash } = useSepoliaTransaction();
  const uploadedImage = useRef<string>();
  const [isMinted, setIsMinted] = useState(false);

  async function generateImage(): Promise<string> {
    if (uploadedImage.current) return uploadedImage.current;
    const cardElement = document.getElementById(id);
    if (!cardElement)
      throw new Error("Could not find the NFT card. Please refresh the page.");
    const canvas = createIcon({
      seed: generateHash(cardNumber),
      size: 5,
      scale: 30,
    });
    cardElement.style.backgroundImage = "url(" + canvas.toDataURL() + ")";
    cardElement.style.backgroundSize = "cover";
    const image = await html2canvas(cardElement, { scale: 2 });
    const blob = await canvasToBlob(image);
    const url = await uploadImage(
      new File([blob], "image.png", { type: "image/png" }),
    );
    uploadedImage.current = url;
    return url;
  }

  async function handleRedeem() {
    const receipt = await run(async (account) => {
      const img = await generateImage();
      onRedeem?.();
      return writeContractAsync({
        account,
        chainId: APP_CHAIN_ID,
        address: nftAbi.contractAddress,
        abi: nftAbi.abi,
        functionName: "redeem",
        args: [tokenId, img],
      });
    });
    if (receipt) {
      setIsMinted(true);
      onRedeemSuccess?.();
    } else onRedeemError?.();
  }

  return (
    <div className="nft-card">
      <div className="nft-card-content">
        <div className="card-title">VIP</div>
        <div className="card-number">NO.{cardNumber}</div>
        <div className="text-sm text-gray-600 mt-2">
          Waiting for mint · Sepolia
        </div>
      </div>
      <div className="mt-4 px-4 space-y-2">
        <SepoliaGate className="w-full">
          <Button
            onClick={handleRedeem}
            className="w-full h-10"
            disabled={isPending || isMinted}
          >
            {isPending && <Loader2 className="mr-2 animate-spin" />}
            {isMinted ? "Minted" : isPending ? "Minting..." : "Mint NFT"}
          </Button>
        </SepoliaGate>
        <TransactionLink hash={hash} />
      </div>
      <div className="nft-card-content-user" id={id} aria-hidden="true">
        <img className="card-logo" src="/images/logo.png" alt="" />
        <div className="card-title">VIP</div>
        <div className="card-number">NO.{cardNumber}</div>
        <div className="card-date">Sepolia testnet</div>
      </div>
    </div>
  );
}
