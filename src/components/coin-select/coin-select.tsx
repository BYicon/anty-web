import { StaticImageData } from "next/image";
import CoinLabel from "./coin-label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CoinSelector } from "./coin-selector";

export default function CoinSelect({
  selectedCoin,
  setSelectedCoin,
  setShowCoinList,
  showCoinList,
}: {
  selectedCoin: {
    name: string;
    icon: StaticImageData;
    code: string;
  };
  setSelectedCoin: (coin: {
    name: string;
    icon: StaticImageData;
    code: string;
  }) => void;
  setShowCoinList: (show: boolean) => void;
  showCoinList: boolean;
}) {
  return (
    <div>
      <Dialog open={showCoinList} onOpenChange={setShowCoinList}>
        <DialogTrigger>
          <CoinLabel
            selectedCoin={selectedCoin}
          />
        </DialogTrigger>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle>Select Token</DialogTitle>
            {/* <DialogDescription>Select token</DialogDescription> */}
          </DialogHeader>
          <CoinSelector selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} setShowCoinList={setShowCoinList} />
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}




