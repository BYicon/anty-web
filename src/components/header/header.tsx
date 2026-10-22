"use client";

import ThemeToggle from "../theme-toggle/theme-toggle";
import "./header.scss";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import nftAbi from "@/abis/NFTMIR";
import { APP_CHAIN_ID } from "@/lib/wagmi";

export default function Header() {
  const { address, chainId } = useAccount();
  const { data: waitingForRedeem } = useReadContract({
    chainId: APP_CHAIN_ID,
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    query: { enabled: Boolean(address) && chainId === APP_CHAIN_ID },
  });

  return (
    <header className="main-header">
      <Link href="/" className="flex shrink-0 items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Anty home"
          className="w-10 h-10 border rounded-full"
        />
        <span className="hidden sm:inline text-sm font-bold">Anty</span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <nav className="main-nav">
          <Link href="/recharge">Recharge</Link>
          <Link href="/nfts" className="relative">
            NFTs
            {Boolean(waitingForRedeem?.length) && (
              <span className="waiting-nft-count">
                {waitingForRedeem?.length}
              </span>
            )}
          </Link>
        </nav>
        <ThemeToggle />
        <ConnectButton
          label="Connect"
          chainStatus="icon"
          accountStatus="avatar"
          showBalance={false}
        />
      </div>
    </header>
  );
}
