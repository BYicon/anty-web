import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon } from "lucide-react";
import { TradingInput } from "@/components/ui/trading-input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EnumTradingType } from "@/shared/enums";

export default function Trading() {
  const [tradingType, setTradingType] = useState(EnumTradingType.INVEST);
  const [eth, setEth] = useState(0);
  const [btc, setBtc] = useState(0);
  const [link, setLink] = useState(0);
  // 处理切换函数
  const handleToggle = () => {
    const newType =
      tradingType === EnumTradingType.INVEST
        ? EnumTradingType.REDEEM
        : EnumTradingType.INVEST;
    setTradingType(newType);
  };
  return (
    <Card>
      <CardContent>
        <CardHeader>Invest</CardHeader>
        <CardContent>
          <Tabs
            defaultValue={tradingType}
            className="w-full"
            onValueChange={(value) => setTradingType(value as EnumTradingType)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={EnumTradingType.INVEST}>Invest</TabsTrigger>
              <TabsTrigger value={EnumTradingType.REDEEM}>Redeem</TabsTrigger>
            </TabsList>
            <TabsContent value={EnumTradingType.INVEST}>
              <Card>
                <CardContent className="space-y-8">
                  <div className="flex items-center my-4">
                    <Switch />
                    <Label className="ml-2">with underlying tokens</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-bold select-none">
                      You receive
                    </div>
                    <TradingInput label="SETF" />
                  </div>
                  <div className="flex items-center justify-center h-px w-full bg-gray-200 my-16">
                    <ArrowDownIcon
                      className={cn(
                        "w-8 h-8 cursor-pointer bg-white text-primary rounded-full border border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-800",
                        tradingType === EnumTradingType.INVEST
                          ? "-rotate-180"
                          : "rotate-0"
                      )}
                      onClick={handleToggle}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm font-bold select-none">You pay</div>
                    <TradingInput
                      type="number"
                      label="BTC"
                      onChange={(e) => setBtc(Number(e.target.value))}
                    />
                    <TradingInput
                      type="number"
                      label="ETH"
                      onChange={(e) => setEth(Number(e.target.value))}
                    />
                    <TradingInput
                      type="number"
                      label="LINK"
                      onChange={(e) => setLink(Number(e.target.value))}
                    />
                  </div>
                  <Button size="lg" className="w-full h-12 rounded-xl">
                    Invest
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value={EnumTradingType.REDEEM}>
              <Card>
                <CardHeader></CardHeader>
                <CardContent className="space-y-10">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </CardContent>
    </Card>
  );
}
