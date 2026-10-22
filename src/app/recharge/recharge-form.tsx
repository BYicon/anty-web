"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { formatUnits, parseUnits } from "viem";
import { Loader2, Wallet } from "lucide-react";
import erc20Abi from "@/abis/MIR";
import nftAbi from "@/abis/NFTMIR";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TradingInput } from "@/components/ui/trading-input";
import { useToast } from "@/components/ui/use-toast";
import TokenApprove from "@/components/token-approve/token-approve";
import { SepoliaGate } from "@/components/connect-wallet-button/sepolia-gate";
import { TransactionLink } from "@/components/transaction-link";
import { useSepoliaTransaction } from "@/hooks/use-sepolia-transaction";
import { APP_CHAIN_ID } from "@/lib/wagmi";
import { rechargeSchema, type RechargeValues } from "@/lib/recharge";

export default function RechargeForm() {
  const { address, chainId } = useAccount();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isApproving, setIsApproving] = useState(false);
  const { run, writeContractAsync, isPending, hash } = useSepoliaTransaction();
  const form = useForm<RechargeValues>({
    resolver: zodResolver(rechargeSchema),
    mode: "onChange",
    defaultValues: { userid: "", amount: "" },
  });
  const parsed = rechargeSchema.safeParse(form.watch());
  const amount = parsed.success
    ? parseUnits(parsed.data.amount, erc20Abi.contractDecimals)
    : 0n;
  const enabled = Boolean(address) && chainId === APP_CHAIN_ID;
  const account = address ?? "0x0000000000000000000000000000000000000000";
  const allowance = useReadContract({
    chainId: APP_CHAIN_ID,
    address: erc20Abi.contractAddress,
    abi: erc20Abi.abi,
    functionName: "allowance",
    args: [account, nftAbi.contractAddress],
    query: { enabled },
  });
  const balance = useReadContract({
    chainId: APP_CHAIN_ID,
    address: erc20Abi.contractAddress,
    abi: erc20Abi.abi,
    functionName: "balanceOf",
    args: [account],
    query: { enabled },
  });
  const readError = allowance.isError || balance.isError;
  const ready =
    enabled &&
    allowance.data !== undefined &&
    balance.data !== undefined &&
    !readError;
  const insufficientBalance = ready && amount > balance.data!;
  const needApprove = ready && amount > 0n && amount !== allowance.data!;
  const busy = isPending || isApproving || form.formState.isSubmitting;

  async function onSubmit(values: RechargeValues) {
    const receipt = await run(async (sender) => {
      const [freshAllowance, freshBalance] = await Promise.all([
        allowance.refetch(),
        balance.refetch(),
      ]);
      const exactAmount = parseUnits(values.amount, erc20Abi.contractDecimals);
      if (
        freshAllowance.data === undefined ||
        freshBalance.data === undefined ||
        freshAllowance.isError ||
        freshBalance.isError
      )
        throw new Error(
          "Could not verify your balance and allowance. Please retry.",
        );
      if (freshAllowance.data !== exactAmount)
        throw new Error("Approve this amount before recharging.");
      if (freshBalance.data < exactAmount)
        throw new Error("Insufficient Anty balance.");
      return writeContractAsync({
        account: sender,
        chainId: APP_CHAIN_ID,
        address: nftAbi.contractAddress,
        abi: nftAbi.abi,
        functionName: "recharge",
        args: [BigInt(values.userid), exactAmount],
      });
    });
    if (receipt) {
      await queryClient.invalidateQueries();
      toast({
        title: "Recharge confirmed",
        description: "Your recharge transaction was confirmed on Sepolia.",
      });
    }
  }

  return (
    <Card className="w-full max-w-[520px] px-2 sm:px-6 common-bg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle className="recharge-form-title">Buy G coins</CardTitle>
            <CardDescription>
              Sepolia testnet · Enter the recipient&apos;s mini program user ID.
            </CardDescription>
            <div className="recharge-form-allowance">
              <Wallet className="w-4 h-4" />
              Anty balance:{" "}
              {balance.data !== undefined
                ? formatUnits(balance.data, erc20Abi.contractDecimals)
                : "—"}
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TradingInput
                      label="User ID"
                      aria-label="Mini program user ID"
                      inputMode="numeric"
                      maxLength={78}
                      disabled={busy}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TradingInput
                      label="Anty"
                      aria-label="Anty amount"
                      inputMode="decimal"
                      maxLength={16}
                      placeholder="1.000000"
                      disabled={busy}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {insufficientBalance && (
              <p role="alert" className="text-sm text-destructive">
                Insufficient Anty balance.
              </p>
            )}
            {readError && (
              <div role="alert" className="text-sm">
                <p>Could not load your balance or allowance.</p>
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => {
                    void allowance.refetch();
                    void balance.refetch();
                  }}
                >
                  Retry
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-3">
            <SepoliaGate className="w-full h-12 rounded-xl">
              {needApprove ? (
                <TokenApprove
                  amount={amount}
                  disabled={busy || !parsed.success || insufficientBalance}
                  className="w-full h-12 rounded-xl"
                  onBusyChange={setIsApproving}
                  onSuccess={() => queryClient.invalidateQueries()}
                />
              ) : (
                <Button
                  className="w-full h-12 rounded-xl"
                  size="lg"
                  disabled={
                    busy || !ready || !parsed.success || insufficientBalance
                  }
                >
                  {isPending && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  {isPending ? "Recharging..." : "Recharge"}
                </Button>
              )}
            </SepoliaGate>
            {ready && allowance.data! > 0n && (
              <TokenApprove
                amount={0n}
                disabled={busy}
                className="w-full"
                onBusyChange={setIsApproving}
                onSuccess={() => queryClient.invalidateQueries()}
              />
            )}
            <TransactionLink hash={hash} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
