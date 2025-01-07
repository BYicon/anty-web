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
import { useBalance, useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import erc20Abi from '@/abis/MIR';
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const ModalReceive = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { address: currentAddress } = useAccount();
  const { toast } = useToast();
  const {
    data: hash,
    writeContract,
  } = useWriteContract();

  const { data: erc20Balance, refetch: refetcherc20Balance } = useBalance({
    address: currentAddress,
    token: erc20Abi.contractAddress,
    });


  const { data: hasClaimed } = useReadContract({
    address: erc20Abi.contractAddress,
    abi: erc20Abi.abi,
    functionName: "claims",
    args: [currentAddress as `0x${string}`],
  });


  useEffect(() => {
    if(hasClaimed === false) {
      setOpen(true);
    };
  }, [hasClaimed]);

  const onClaim = async () => {
    await writeContract({
      address: erc20Abi.contractAddress,
      abi: erc20Abi.abi,
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
      refetcherc20Balance();
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
