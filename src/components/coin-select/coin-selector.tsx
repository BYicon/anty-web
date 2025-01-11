import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COIN_LIST } from "@/shared/constants";
import Image from "next/image";

function CoinSelector({
  selectedCoin,
  setSelectedCoin,
  setShowCoinList,
}: {
  selectedCoin: typeof COIN_LIST[0];
  setSelectedCoin: (coin: typeof COIN_LIST[0]) => void;
  setShowCoinList: (show: boolean) => void;
}) {
  return (
    <div className="space-y-2 w-[300px]">
      {/* <Label htmlFor="select-32">Token select</Label> */}
      <Select defaultValue={selectedCoin?.code} onValueChange={(value) => {
        const coin = COIN_LIST.find((coin) => coin.code === value);
        if (coin) {
          setSelectedCoin(coin);
          setShowCoinList(false);
        }
      }}>
        <SelectTrigger
          className="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
        >
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          {COIN_LIST.map((coin) => (
            <SelectItem value={coin.code}>
              <span className="flex items-center gap-2">
                <Image src={coin.icon} alt={coin.name} width={20} height={20} />
                <span className="truncate">{coin.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { CoinSelector };
