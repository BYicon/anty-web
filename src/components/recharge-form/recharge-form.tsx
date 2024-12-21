"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import "./recharge-form.scss";
import TokenApprove from "../token-approve/token-approve";
import { useEffect, useState } from "react";
import mirAbi from "@/abis/MIR";
import nftAbi from "@/abis/NFTMIR";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useToast } from "../ui/use-toast";
import ConnectWalletButton from "../connect-wallet-button/connect-wallet-button";
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
      userid: "10086",
      amount: undefined,
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

  const {
    data: waitingForRedeem,
    refetch: refetchWaitingForRedeem,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [currentAddress as `0x${string}`],
  });

  // 获取当前用户ERC20的授权额度
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: mirAbi.contractAddress,
    abi: mirAbi.abi,
    functionName: "allowance",
    args: [currentAddress as `0x${string}`, nftAbi.contractAddress],
  });

  const { data: mirBalance, refetch: refetchMirBalance, isError: isMirBalanceError, error: mirBalanceMessage } = useBalance({
    address: currentAddress,
    token: mirAbi.contractAddress,
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
        description: "Please approve ERC20 first.",
        variant: "destructive",
      });
      return;
    };
    const amount = parseUnits(values.amount.toString() || "0", mirAbi.contractDecimals);
    await writeContract({
      address: nftAbi.contractAddress,
      abi: nftAbi.abi,
      functionName: "recharge",
      args: [
        values.userid || 0,
        amount,
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
      refetchMirBalance();
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
      mirAbi.contractDecimals
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
            <CardDescription className="recharge-form-title-des11c">
              Buy G coins for your WECHAT MINI PROGRAM.
            </CardDescription>
            <div className="recharge-form-allowance">
            <span className="iconfont icon-balance icon-licai relative top-[-2px]"></span>
              MIR {formatUnits(mirBalance?.value || BigInt(0), mirAbi.contractDecimals)}
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
                      placeholder="MIR Amount"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) =>
                        onAmountChange(field, Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>You can mint 1 NFT by consuming 10 MIR Tokens.</FormDescription> 
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="referral"
              render={({ field }) => (
                <FormItem className="relative mt-8">
                  <FormLabel className="recharge-label">Referral(optional)</FormLabel>
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
              <TokenApprove
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
