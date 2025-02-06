import Image, { StaticImageData } from "next/image";
import { ChevronDownIcon } from "lucide-react";

export default function CoinLabel({
  selectedCoin,
  setShowCoinList,
  disabled
}: {
  selectedCoin: {
    name: string;
    icon: StaticImageData;
    code: string;
  };
  disabled?: boolean;
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
      {disabled ? null : <ChevronDownIcon size={18} />}
    </div>
  );
}
