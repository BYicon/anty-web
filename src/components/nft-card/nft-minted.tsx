import "./nft-card.scss";
import { nftImageSource } from "@/lib/nft-image";

interface NftCardData {
  tokenID: bigint;
  tokenURI: string;
}

export default function NftCard({ data }: { data: NftCardData }) {
  return (
    <div className="nft-card">
      <div className="nft-card-content">
        <img
          className="w-full rounded-t-lg"
          src={nftImageSource(data.tokenURI)}
          alt={"Anty NFT #" + data.tokenID.toString()}
        />
      </div>
      <div className="mt-4 px-4 text-sm">
        NFT #{data.tokenID.toString()} · Sepolia
      </div>
    </div>
  );
}
