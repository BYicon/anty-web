import Image, { StaticImageData } from "next/image";
import { ChevronDownIcon } from "lucide-react";

export default function CoinLabel({
  selectedCoin,
  setShowCoinList,
}: {
  selectedCoin: {
    name: string;
    icon: StaticImageData;
    code: string;
  };
  setShowCoinList?: (show: boolean) => void;
}) {
  return (
    <div
      className="flex items-center cursor-pointer hover:bg-gray-100 rounded-xl p-2"
      onClick={() => setShowCoinList?.(true)}
    >
      <Image
        src={selectedCoin.icon}
        alt={selectedCoin.name}
        width={28}
        height={28}
      />
      <span className="ml-2">{selectedCoin.name}</span>
      <ChevronDownIcon size={18} />
    </div>
  );
}
