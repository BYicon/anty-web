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
import Operate from "./operate";

export default function ETFPage() {
  const { address: currentAddress } = useAccount();

  return (
    <div className="common-page">
      <div className="flex gap-4 w-[1400px] mx-auto">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>MIR ETF</CardTitle>
            <CardDescription>make crypto simple</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Info />
            <Portfolio />
          </CardContent>
        </Card>
        <div className="w-[500px]">
          <Operate />
        </div>
      </div>
    </div>
  );
}
