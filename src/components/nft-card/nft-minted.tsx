import "./nft-card.scss";

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
        <img src={data.tokenURI} alt="nft" />
      </div>
      <div className="mt-4 px-4">
        <div className="flex justify-end items-center">
          <button className="btn-primary" onClick={handleTransfer}>
              Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
