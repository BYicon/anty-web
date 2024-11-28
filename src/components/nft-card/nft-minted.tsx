import "./nft-card.scss";
import { Button } from "@/components/ui/button";
interface INftCard {
  tokenId: number;
  tokenURI: string;
}

export default function NftCard({
  data
}: {
  data: INftCard
}) {
  const handleTransfer = () => {
    alert('coming soon')
  };
  return (
    <div className="nft-card">
      <div className="nft-card-content">
        <img className="w-full rounded-t-lg" src={data.tokenURI} alt="nft" />
      </div>
      <div className="mt-4 px-4">
        <div className="flex items-center justify-center">
          <Button onClick={handleTransfer} className="w-full h-10">Transfer</Button>
        </div>
      </div>
    </div>
  );
}
