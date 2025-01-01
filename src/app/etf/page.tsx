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
import Right from "./right";

export default function ETFPage() {
  const { address: currentAddress } = useAccount();

  return (
    <div className="common-page flex gap-4">
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
      <Card className="w-[600px]">
        <Right />
      </Card>
    </div>
  );
}
