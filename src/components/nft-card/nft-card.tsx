import "./nft-card.scss";

function padTokenId(tokenId: number) {
  return tokenId.toString().padStart(8, "0");
}

export default function NftCard({
  id,
  tokenId,
}: {
  id: string;
  tokenId: number;
}) {
  const cardNumber = padTokenId(tokenId);
  return (
    <div className="nft-card" id={id}>
      <div className="card-title">NFT Membership Card</div>
      <div className="card-number" id="cardNumber">
        {cardNumber}
      </div>
      <div className="nft-card-mask">
        <div className="nft-card-id">NO.{cardNumber}</div>
        <div className="nft-card-status">waiting for redeem</div>
        <div className="btn-primary">Redeem</div>
      </div>
    </div>
  );
}
