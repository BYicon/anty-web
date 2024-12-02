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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./recharge-form.scss";
import UsdtApprove from "@/components/usdt-approve/usdt-approve";
import { useEffect, useState } from "react";
import usdtAbi from "@/abi/USDT";
import nftAbi from "@/abi/NFTMIR";
import {
  useAccount,
  useBalance,
  useReadContract,
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useToast } from "@/components/ui/use-toast";
import ConnectWalletButton from "@/components/ConnectWalletButton/ConnectWalletButton";
import { Loader2 } from "lucide-react";
import { formatUnits, parseUnits } from "viem";

const formSchema = z.object({
  userid: z.string().min(2, {
    message: "userid must be at least 2 characters.",
  }),
  amount: z.number().min(1, {
    message: "Amount must be at least 1.",
  }),
  referral: z.string().optional(),
});

function RechargeForm() {
  const { address: currentAddress } = useAccount();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userid: "",
      amount: 10, // 默认为0
      referral: "",
    },
  });

  const {
    data: hash,
    isPending: writeIsPending,
    isSuccess: writeIsSuccess,
    isError: writeIsError,
    writeContract,
  } = useWriteContract();

  // 获取当前用户授权USDT的额度
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: usdtAbi.contractAddress,
    abi: usdtAbi.abi,
    functionName: "allowance",
    args: [currentAddress as `0x${string}`, nftAbi.contractAddress],
  });

  const { data: usdtBalance, refetch: refetchUsdtBalance } = useBalance({
    address: currentAddress,
    token: usdtAbi.contractAddress,
  });

  const onApproveHandler = () => {};
  const onApproveSuccess = () => {
    refetchAllowance();
  };
  const onApproveError = (error: any) => {
    console.log("onApproveError", error);
  };

  const onRecharge = async (values: any) => {
    if (needApprove) {
      toast({
        title: "Error",
        description: "Please approve USDT first.",
        variant: "destructive",
      });
      return;
    };
    await writeContract({
      address: nftAbi.contractAddress,
      abi: nftAbi.abi,
      functionName: "recharge",
      args: [
        BigInt(values.userid || 0), // TODO: 更改合约数字类型
        parseUnits(values.amount.toString() || "0", usdtAbi.contractDecimals),
      ],
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
      console.log("isRechargeSuccess 🟢🟢🟢", isRechargeSuccess);
      refetchUsdtBalance();
      refetchAllowance();
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
  const [amount, setAmount] = useState(0);

  const onAmountChange = (field: any, value: number) => {
    if (isNaN(value)) {
      value = 0;
    }
    value = parseFloat(value.toString());
    if (value < 0) {
      value = 0;
    };
    field.onChange(value);
    setAmount(value);
  };
  const [needApprove, setNeedApprove] = useState(false);
  useEffect(() => {
    const allowance = formatUnits(
      allowanceData || BigInt(0),
      usdtAbi.contractDecimals
    );
    setNeedApprove(Number(allowance) < Number(amount));
  }, [allowanceData, amount]);

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onRecharge(values);
  };

  return (
    <Card className="w-[520px] px-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader className="px-8 pb-0">
            <CardTitle className="recharge-form-title">Buy G coins</CardTitle>
            <CardDescription className="recharge-form-title-desc">
              Buy G coins for your WECHAT MINI PROGRAM.
            </CardDescription>
            <div className="recharge-form-allowance">
            <span className="iconfont icon-balance icon-licai relative top-[-2px]"></span>
              ${usdtBalance?.formatted || "0"}
            </div>
          </CardHeader>
          <CardContent className="px-8">
            <FormField
              control={form.control}
              name="userid"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="recharge-label">User ID</FormLabel>
                  <FormControl>
                    <Input
                      className="recharge-input"
                      placeholder="User ID"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your user ID.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative mt-8">
                  <FormLabel className="recharge-label">Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="recharge-input"
                      placeholder="USDT Amount"
                      {...field}
                      onChange={(e) =>
                        onAmountChange(field, Number(e.target.value))
                      }
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
                  <FormLabel className="recharge-label">Referral</FormLabel>
                  <FormControl>
                    <Input
                      className="recharge-input"
                      placeholder="Referral"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            {needApprove ? (
              <UsdtApprove
                className="recharge-actions-btn"
                onApprove={() => onApproveHandler()}
                onSuccess={onApproveSuccess}
                onError={onApproveError}
                amount={form.getValues("amount")}
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
