"use client";
import {
  useAccount,
  useBalance,
  useSimulateContract,
  useWriteContract,
} from "wagmi";
import usdtAbi from "@/abi/USDT.json";
import { useEffect } from "react";

const USDT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS as `0x${string}`;

export default function Recharge() {
  const { address } = useAccount();
  const {data: hash, isPending, writeContract } = useWriteContract();

  const { data: usdtBalance } = useBalance({
    address: address,
    token: USDT_ADDRESS,
  });

  useEffect(() => {
    console.log('usdtBalance 🚀🚀🚀', usdtBalance);
  }, [usdtBalance]);

  const {
    data: contractData,
    error: simulateError,
    isSuccess,
    isLoading,
  } = useSimulateContract({
    address: USDT_ADDRESS,
    abi: usdtAbi.abi,
    functionName: "transfer",
    args: ["0xxx", 10 * 10 ** 18],
  });

  const onRecharge = async () => {
    if(address) {
      const result = await writeContract(contractData!.request);
      console.log('result 🚀🚀🚀', result);
      if(isSuccess) {
        console.log('hash 🚀🚀🚀', hash);
      }
    }
  }



  return (
    <div>
      <div>余额：{usdtBalance?.formatted} {usdtBalance?.symbol}</div>
      <div className="common-section mt-16 max-w-5xl mx-auto">
        {/* 写一个可爱风格的表单布局, 卡片形式 卡片宽度500px 阴影 */}
        <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md w-full shadow-md p-16 bg-white">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Userid</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Recharge Amount</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Recharge Amount</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Inviter</label>
            <input
              className="border border-gray-300 rounded-md p-2 text-xs"
              type="text"
            />
          </div>
          <button
            className="border border-gray-300 rounded-md p-2 text-xs max-w-20 mx-auto"
            type="button"
            onClick={onRecharge}
          >
            Recharge
          </button>
        </div>
      </div>
    </div>
  );
}
