import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Operate() {
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
                <CardContent className="space-y-2">
                  <div className="flex items-center my-4">
                    <Switch />
                    <Label className="ml-2">with underlying tokens</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-10">You receive</Label>
                    <div className="relative">
                      <Input
                        className="peer pe-9"
                        placeholder="You receive ETF amount"
                        type="input"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        ETF
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-10">You pay</Label>
                    <div className="relative">
                      <Input
                        className="peer pe-9"
                        placeholder="BTC amount"
                        type="email"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        BTC
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-10">You pay</Label>
                    <div className="relative">
                      <Input
                        className="peer pe-9"
                        placeholder="ETF amount"
                        type="email"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        ETF
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-10">You pay</Label>
                    <div className="relative">
                      <Input
                        className="peer pe-9"
                        placeholder="Link"
                        type="email"
                      />
                      <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        Link
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader></CardHeader>
                <CardContent className="space-y-2">
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
