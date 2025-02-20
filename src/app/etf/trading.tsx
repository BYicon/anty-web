"use client";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon, Loader2 } from "lucide-react";
import { TradingInput } from "@/components/ui/trading-input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EnumTradingType } from "@/shared/enums";
import { COIN_LIST } from "@/shared/constants";
import CoinSelect from "@/components/coin-select/coin-select";
import ETFAbi from "@/abis/ETF";
import erc20Abi from "@/abis/ERC20";

import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import CoinLabel from "@/components/coin-select/coin-label";
import { StaticImageData } from "next/image";
import { formatUnits, parseUnits } from "viem";
import { useToast } from "@/components/ui/use-toast";

// 定义 TokenDetail 类型
export interface TokenDetail {
  address: string;
  symbol: string;
  decimals: number;
  available?: string; // 用户的代币余额
  payAmount?: string; // 投资所需的代币数量
  allowance?: bigint; // 用户对 ETF 合约的授权额度
}

export default function Trading() {
  const { address: currentAddress } = useAccount();
  const [tradingType, setTradingType] = useState(EnumTradingType.INVEST);
  const [withUnderlyingTokens, setWithUnderlyingTokens] = useState(false);
  const [etf, setEtf] = useState("");
  const [tokens, setTokens] = useState<TokenDetail[]>([]);

  const isInvest = useMemo(
    () => tradingType === EnumTradingType.INVEST,
    [tradingType]
  );

  const { data: tokensData, isLoading: isTokensLoading } = useReadContract({
    abi: ETFAbi.abi,
    address: ETFAbi.contractAddress,
    functionName: "getTokens",
  });

  const symbolDecimalsReads = useMemo(() => {
    if (!tokensData?.length) return [];

    return tokensData.flatMap((tokenAddress: string) => [
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi.abi,
        functionName: "symbol",
      },
      {
        address: tokenAddress as `0x${string}`,
        abi: erc20Abi.abi,
        functionName: "decimals",
      },
    ]);
  }, [tokensData]);

  const { data: symbolDecimalsData } = useReadContracts({
    contracts: symbolDecimalsReads as any,
  });

  const processedTokens = useMemo(() => {
    if (!symbolDecimalsData?.length || !tokensData?.length) return [];

    return tokensData.map((tokenAddress, index) => ({
      address: tokenAddress,
      symbol: symbolDecimalsData[index * 2]?.result as string,
      decimals: symbolDecimalsData[index * 2 + 1]?.result as number,
    }));
  }, [symbolDecimalsData, tokensData]);

  useEffect(() => {
    if (processedTokens.length) setTokens(processedTokens);
  }, [processedTokens]);

  const { data: investTokenAmounts, refetch: refetchInvestTokenAmounts } =
    useReadContract({
      abi: ETFAbi.abi,
      address: ETFAbi.contractAddress,
      functionName: "getInvestTokenAmounts",
      args: [parseUnits(etf || "0", 18)],
    });

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      refetchInvestTokenAmounts();
      console.log("refetchInvestTokenAmounts");
    }, 1000);
  }, [etf]);

  useEffect(() => {
    console.log("investTokenAmounts", investTokenAmounts);
    if (investTokenAmounts) {
      setTokens((prevTokens) =>
        prevTokens.map((token, index) => ({
          ...token,
          payAmount: formatUnits(investTokenAmounts[index], token.decimals),
        }))
      );
    }
  }, [investTokenAmounts]);

  // 4. 简化输入框自动聚焦逻辑
  useEffect(() => {
    document.getElementById("etf")?.focus();
  }, [isInvest]);

  const handleToggle = () => {
    setTradingType(isInvest ? EnumTradingType.REDEEM : EnumTradingType.INVEST);
  };

  const onEtfValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtf(e.target.value);
  };

  // 构建获取 allowance 的读取请求，仅在连接钱包时
  const allowanceReads = useMemo(() => {
    if (!tokensData || !Array.isArray(tokensData) || !currentAddress) {
      return [];
    }

    return tokensData.map((tokenAddress: string) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi.abi,
      functionName: "allowance",
      args: [currentAddress, ETFAbi.contractAddress],
    }));
  }, [tokensData, currentAddress]);

  // 使用 useReadContracts 获取 allowances
  const { data: allowanceData, refetch: refetchAllowanceData } =
    useReadContracts({
      contracts: allowanceReads as any,
    });

  const { toast } = useToast();
  const { writeContract } = useWriteContract();
  const handleInvest = async () => {
    console.log("allowanceData 🚀🚀🚀", allowanceData);
    if (etf && Number(etf) > 0) {
      writeContract({
        address: ETFAbi.contractAddress,
        abi: ETFAbi.abi,
        functionName: "invest",
        args: [currentAddress ?? "0x", parseUnits(etf || "0", 18)],
      });
    } else {
      toast({
        title: "Please enter a valid amount",
        description: "Please enter a valid amount",
      });
    }
  };

  const [showCoinList, setShowCoinList] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState<(typeof COIN_LIST)[0]>(
    COIN_LIST[0]
  );

  return (
    <Card>
      <CardContent>
        <CardHeader>Invest</CardHeader>
        <CardContent>
          <Tabs
            defaultValue={EnumTradingType.INVEST}
            value={tradingType}
            className="w-full"
            onValueChange={(value) => setTradingType(value as EnumTradingType)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={EnumTradingType.INVEST}>Invest</TabsTrigger>
              <TabsTrigger value={EnumTradingType.REDEEM}>Redeem</TabsTrigger>
            </TabsList>
            <Card className="mt-4">
              <CardContent className="space-y-8">
                <div className="flex items-center my-4">
                  <Switch
                    checked={withUnderlyingTokens}
                    onCheckedChange={(value) => setWithUnderlyingTokens(value)}
                  />
                  <Label className="ml-2">with underlying tokens</Label>
                </div>
                {/* 添加动画容器 */}
                <div className="relative">
                  {/* SETF */}
                  <div
                    className={cn(
                      "space-y-4 transition-transform duration-300 ease-in-out",
                      isInvest
                        ? !withUnderlyingTokens
                          ? "translate-y-[400px]"
                          : "translate-y-[200px]"
                        : "translate-y-0"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="text-sm font-bold select-none">
                        {tradingType === EnumTradingType.INVEST
                          ? "You receive"
                          : "You pay"}
                      </div>
                      <TradingInput
                        id="etf"
                        label="AntyETF"
                        value={etf || ""}
                        onChange={onEtfValueChange}
                      />
                    </div>
                  </div>
                  {/* 箭头 */}
                  <div
                    className={cn(
                      "flex items-center justify-center h-px w-full bg-gray-200 my-14",
                      isInvest && !withUnderlyingTokens
                        ? "translate-y-[230px]"
                        : "translate-y-0"
                    )}
                  >
                    <ArrowDownIcon
                      className={cn(
                        "w-8 h-8 cursor-pointer bg-white text-primary rounded-full border border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-800"
                      )}
                      onClick={handleToggle}
                    />
                  </div>
                  {/* coins  */}
                  <div
                    className={cn(
                      "space-y-4 transition-transform duration-300 ease-in-out min-h-[308px]",
                      isInvest ? "translate-y-[-200px]" : "translate-y-0"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="text-sm font-bold select-none">
                        {tradingType === EnumTradingType.INVEST
                          ? "You pay"
                          : "You receive"}
                      </div>
                      {withUnderlyingTokens ? (
                        <TradingInput
                          type="number"
                          label={
                            <CoinSelect
                              selectedCoin={selectedCoin}
                              setSelectedCoin={setSelectedCoin}
                              showCoinList={showCoinList}
                              setShowCoinList={setShowCoinList}
                            />
                          }
                          onChange={(e) => {}}
                        />
                      ) : (
                        <React.Fragment>
                          {isTokensLoading ? (
                            <div className="flex items-center justify-center h-full">
                              <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                          ) : (
                            tokens?.map((item, index) => (
                              <TradingInput
                                id={item.symbol}
                                type="number"
                                value={item.payAmount || ""}
                                readOnly={true}
                                key={item.symbol}
                                onChange={() => {}}
                                label={
                                  <CoinLabel
                                    disabled={true}
                                    selectedCoin={
                                      COIN_LIST.find(
                                        (coin) => coin.code === item.symbol
                                      ) as {
                                        name: string;
                                        icon: StaticImageData;
                                        code: string;
                                      }
                                    }
                                  />
                                }
                              />
                            ))
                          )}
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>

                {!isInvest ? (
                  <Button size="lg" className="w-full h-12 rounded-xl">
                    Redeem
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-xl"
                    onClick={handleInvest}
                  >
                    Invest
                  </Button>
                )}
              </CardContent>
            </Card>
          </Tabs>
        </CardContent>
      </CardContent>
    </Card>
  );
}
