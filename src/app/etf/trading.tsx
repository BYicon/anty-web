'use client'
import React, { useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownIcon } from "lucide-react";
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
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContracts,
} from "wagmi";

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
  const [tradingType, setTradingType] = useState(EnumTradingType.INVEST);
  const [withUnderlyingTokens, setWithUnderlyingTokens] = useState(false);
  const [etf, setEtf] = useState("");
  const [tokens, setTokens] = useState<TokenDetail[]>([]);

  // 读取 ETF 合约中的 tokens
  const { data: tokensData } = useReadContract({
    abi: ETFAbi.abi,
    address: ETFAbi.contractAddress,
    functionName: "getTokens",
  });

  // 构建获取 symbol 和 decimals 的读取请求
  const symbolDecimalsReads = useMemo(() => {
    if (!tokensData || !Array.isArray(tokensData)) {
      return [];
    }

    const symbolCalls = tokensData.map((tokenAddress: string) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi.abi,
      functionName: "symbol",
    }));

    const decimalsCalls = tokensData.map((tokenAddress: string) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi.abi,
      functionName: "decimals",
    }));

    return [...symbolCalls, ...decimalsCalls];
  }, [tokensData]);

  // 使用 useReadContracts 获取 symbol 和 decimals
  const { data: symbolDecimalsData, refetch: refetchSymbolDecimals } = useReadContracts({
    contracts: symbolDecimalsReads as any,
  });

  useEffect(() => {
    refetchSymbolDecimals();
  }, [symbolDecimalsReads]);

  const { writeContract } = useWriteContract();

  useEffect(() => {
    console.log("symbolDecimalsData 🚀🚀🚀", symbolDecimalsData);
    console.log("tokensData 🚀🚀🚀", tokensData);
    if (
      symbolDecimalsData &&
      Array.isArray(symbolDecimalsData) &&
      tokensData &&
      Array.isArray(tokensData)
    ) {
      const tokensWithDetails: TokenDetail[] = tokensData.map(
        (tokenAddress, index) => {
          const symbol = symbolDecimalsData[index]?.result as string;
          const decimals = symbolDecimalsData[index + tokensData.length]
            ?.result as number;

          return {
            address: tokenAddress,
            symbol,
            decimals,
          };
        }
      );
      console.log("tokensWithDetails 🚀🚀🚀", tokensWithDetails);
      setTokens(tokensWithDetails);
    }
  }, [symbolDecimalsData, tokensData]);

  const [selectedCoin, setSelectedCoin] = useState<(typeof COIN_LIST)[0]>(
    COIN_LIST[0]
  );

  const isInvest = useMemo(() => {
    const _isInvest = tradingType === EnumTradingType.INVEST ? true : false;
    return _isInvest;
  }, [tradingType]);

  // TODO: 待优化
  useEffect(() => {
    const focusInput = document.getElementById('etf');
    if(focusInput) {
      setTimeout(() => {
        focusInput.focus();
      });
    }
  }, [isInvest]);


  // 修改切换函数
  const handleToggle = () => {
    const newType = isInvest ? EnumTradingType.REDEEM : EnumTradingType.INVEST;
    setTradingType(newType);
  };

  const [showCoinList, setShowCoinList] = useState(false);

  const onEtfValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEtf(e.target.value);
  };

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
                        value={etf}
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
                      "space-y-4 transition-transform duration-300 ease-in-out",
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
                          {tokens?.map((item, index) => (
                            <TradingInput
                              id={item.symbol}
                              type="number"
                              label={item.symbol}
                              value={item.payAmount}
                              disabled={true}
                              key={item.symbol}
                              onChange={() => {}}
                            />
                          ))}
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
                  <Button size="lg" className="w-full h-12 rounded-xl">
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
