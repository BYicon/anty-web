"use client";
import { useAccount } from "wagmi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Portfolio from "./portfolio";
import Info from "./info";
import Trading from "./trading";
import SnowScreen from "@/components/snow-screen/snow-screen";

export default function ETFPage() {
  const { address: currentAddress } = useAccount();

  return (
    <div className="common-page">
      <SnowScreen
        count={25}
        minSize={0.5}
        maxSize={1.5}
      />
      <div className="flex gap-4 w-[1400px] mx-auto relative z-10">
        <Card className="flex-1 relative z-10">
          <CardHeader>
            <CardTitle>Anty ETF</CardTitle>
            <CardDescription>Make crypto simple</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Info />
            <Portfolio />
          </CardContent>
        </Card>
        <div className="w-[500px] relative z-10">
          <Trading />
        </div>
      </div>
    </div>
  );
}
