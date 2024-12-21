"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useBalance, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import mirAbi from '@/abi/MIR';
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const ModalReceive = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const { address: currentAddress } = useAccount();
  const { toast } = useToast();
  const {
    data: hash,
    isPending: writeIsPending,
    isSuccess: writeIsSuccess,
    isError: writeIsError,
    writeContract,
  } = useWriteContract();

  const { data: mirBalance, refetch: refetchMirBalance, isError: isMirBalanceError, error: mirBalanceMessage } = useBalance({
    address: currentAddress,
    token: mirAbi.contractAddress,
    });


  useEffect(() => {
    setOpen(Number(mirBalance?.value) <= 0);
  }, [mirBalance]);

  const onClaim = async () => {
    console.log("onClaim");
    await writeContract({
      address: mirAbi.contractAddress,
      abi: mirAbi.abi,
      functionName: "registerClaim",
    });
    console.log(hash);
  };

  const {
    isLoading: isClaimLoading,
    isSuccess: isClaimSuccess,
    error: isClaimError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isClaimSuccess) {
      refetchMirBalance();
      toast({
        title: "Success",
        description: "You have successfully claimed your tokens.",
      });
    }
  }, [isClaimSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Thank you for supporting this project!
          </DialogTitle>
          <DialogDescription>
            Would you like to claim your tokens now?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button  type="button" disabled={isClaimLoading} onClick={onClaim}>
            {isClaimLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isClaimLoading ? "Claiming..." : "Claim"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalReceive;
