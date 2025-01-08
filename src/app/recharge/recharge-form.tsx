"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import TokenApprove from "@/components/token-approve/token-approve";
import { useEffect, useState } from "react";
import erc20Abi from "@/abis/MIR";
import nftAbi from "@/abis/NFTMIR";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import ConnectWalletButton from "@/components/connect-wallet-button/connect-wallet-button";
import { Loader2, Wallet } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
import { TradingInput } from "@/components/ui/trading-input";

const formSchema = z.object({
  userid: z.string().min(2, {
    message: "userid must be at least 2 characters.",
  }),
  amount: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Amount must be at least 1.",
    })
    .refine((val) => val <= 100000000, {
      message: "Amount must be at most 100000000.",
    }),
  referral: z.string().optional(),
});

function RechargeForm() {
  const { address: currentAddress } = useAccount();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "10086",
      amount: 0.0,
      referral: "",
    },
  });

  const amount = form.watch("amount");

  const { data: hash, writeContract } = useWriteContract();

  const { refetch: refetchWaitingForRedeem } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress as `0x${string}`],
  });

  // 获取当前用户ERC20的授权额度
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: erc20Abi.contractAddress,
    abi: erc20Abi.abi,
    functionName: "allowance",
    args: [currentAddress as `0x${string}`, nftAbi.contractAddress],
  });

  const { data: erc20Balance, refetch: refetchTokenBalance } = useBalance({
    address: currentAddress,
    token: erc20Abi.contractAddress,
  });

  const onApproveHandler = () => {};
  const onApproveSuccess = () => {
    refetchAllowance();
  };
  const onApproveError = (error: any) => {
    console.log("onApproveError", error);
  };

  const onRecharge = async (values: any) => {
    const _amount = parseUnits(
      values.amount.toString() || "0",
      erc20Abi.contractDecimals
    );
    await writeContract({
      address: nftAbi.contractAddress,
      abi: nftAbi.abi,
      functionName: "recharge",
      args: [values.userid || 0, _amount],
    });
  };
  const {
    isLoading: isRechargeLoading,
    isSuccess: isRechargeSuccess,
    error: isRechargeError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isRechargeSuccess) {
      refetchTokenBalance();
      refetchAllowance();
      refetchWaitingForRedeem();
      toast({
        title: "Success",
        description: "You have successfully recharged.",
      });
    }
    if (isRechargeError) {
      toast({
        title: "Error",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  }, [isRechargeSuccess, isRechargeError]);

  const [needApprove, setNeedApprove] = useState(false);
  useEffect(() => {
    const allowance = formatUnits(
      allowanceData || BigInt(0),
      erc20Abi.contractDecimals
    );
    setNeedApprove(Number(allowance) < Number(amount));
  }, [allowanceData, amount]);

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onRecharge(values);
  };

  return (
    <Card className="w-[520px] px-8 common-bg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="px-8 pb-0">
            <CardTitle className="recharge-form-title">Buy G coins</CardTitle>
            <CardDescription className="text-xs">
              Buy G coins for your WECHAT MINI PROGRAM.
            </CardDescription>
            <div className="recharge-form-allowance">
              <Wallet className="w-4 h-4" />
              <span>
                {formatUnits(
                  erc20Balance?.value || BigInt(0),
                  erc20Abi.contractDecimals
                )}
              </span>
            </div>
          </CardHeader>
          <CardContent className="px-8">
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem className="relative mt-8">
                  <FormControl>
                    <TradingInput label="User ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative mt-8">
                  <FormControl>
                    <TradingInput
                      type="number"
                      label="Anty"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referral"
              render={({ field }) => (
                <FormItem className="relative mt-8">
                  <FormControl>
                    <TradingInput label="Referral" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {needApprove ? (
              <TokenApprove
                className="recharge-actions-btn"
                onApprove={() => onApproveHandler()}
                onSuccess={onApproveSuccess}
                onError={onApproveError}
              />
            ) : currentAddress ? (
              <Button
                className="recharge-actions-btn"
                size="lg"
                disabled={isRechargeLoading}
              >
                {isRechargeLoading && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isRechargeLoading ? "Recharging..." : "Recharge"}
              </Button>
            ) : (
              <ConnectWalletButton className="recharge-actions-btn" />
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

export default RechargeForm;
