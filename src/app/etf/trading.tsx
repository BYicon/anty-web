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

export default function Trading() {
  const [isInvest, setIsInvest] = useState(true);
  const [eth, setEth] = useState(0);
  const [btc, setBtc] = useState(0);
  return (
    <Card>
      <CardContent>
        <CardHeader>Invest</CardHeader>
        <CardContent>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">invest</TabsTrigger>
              <TabsTrigger value="password">withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardContent className="space-y-8">
                  <div className="flex items-center my-4">
                    <Switch />
                    <Label className="ml-2">with underlying tokens</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-10">You receive</Label>
                    <TradingInput label="SETF" />
                  </div>
                  <div className="flex items-center justify-center h-px w-full bg-gray-200 my-16">
                    <ArrowDownIcon
                      className={cn(
                        "w-8 h-8 cursor-pointer bg-white text-primary rounded-full border border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-800",
                        isInvest ? "-rotate-180" : "rotate-0"
                      )}
                      onClick={() => setIsInvest(!isInvest)}
                    />
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="input-10">You pay {eth}</Label>
                    <TradingInput type="number" label="BTC" onChange={(e) => setBtc(Number(e.target.value))} />
                    <TradingInput type="number" label="ETH" onChange={(e) => setEth(Number(e.target.value))} />
                  </div>
                  <Button size="lg" className="w-full h-12 rounded-full">
                    Invest
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
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
