"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import "./header.scss";
import Link from "next/link";
import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import nftAbi from "@/abis/NFTMIR";
import { isWhiteRoute } from "@/shared/helper";

const Header = () => {
  const { address } = useAccount();
  const router = useRouter();

  const {
    data: waitingForRedeem,
    refetch: refetchWaitingForRedeem,
  } = useReadContract({
    address: nftAbi.contractAddress,
    abi: nftAbi.abi,
    functionName: "getWaitingForRedeem",
    args: [address as `0x${string}`],
  });

  const goHome = () => {
    router.push("/");
  };

  useEffect(() => {

    // const lang = getISOLang();
    // const htmlLang = document.documentElement.lang;

    // if (lang !== htmlLang) {
    //   document.documentElement.lang = lang;
    // }

    // console.log("lang 🚀🚀🚀", lang);
    if (!address) {
      if (!isWhiteRoute(window.location.pathname)) {
        router.push("/");
      }
    }
  }, []);

  return (
    <header className="main-header">
      <div
        className="text-2xl z-10 max-w-5xl items-center justify-between font-mono text-sm flex fs-20 cursor-pointer"
        onClick={goHome}
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-10 h-10 border rounded-full"
        />
        <span className="text-sm ml-2">Anty</span>
      </div>
      <div className="flex items-center gap-4">
        <nav className="main-nav">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/recharge" className="hover:text-blue-500">
            Recharge
          </Link>
          {/* <Link href="/etf" className="hover:text-blue-500">
            ETF
          </Link> */}
          {address && (
            <>
              {/* <Link href="/tasks" className="hover:text-blue-500">
                Tasks
              </Link> */}
              {/* 新的nft数量提示 */}
              <Link href="/nfts" className="relative hover:text-blue-500">
                NFTs
                {
                  waitingForRedeem && waitingForRedeem?.length > 0 && (
                    <span className="waiting-nft-count">
                      {waitingForRedeem?.length}
                    </span>
                  )
                }
              </Link>
            </>
          )}
        </nav>
        <ThemeToggle />
        {/* <div className="eth-price">
          <span>$</span>
          <span>{ethereumRealTimePrice?.price || "0"}</span>
        </div> */}
        {address ? (
          <ConnectButton />
        ) : (
          <ConnectButton.Custom>
            {({ openConnectModal, authenticationStatus, mounted }) => {
              return (
                <Button
                  size="sm"
                  // className="text-xs h-8 text-gray-500 border border-gray-500 rounded-md px-4 py-2 bg-white"
                  // variant="secondary"
                  onClick={openConnectModal}
                >
                  Connect Wallet
                </Button>
              );
            }}
          </ConnectButton.Custom>
        )}
      </div>
    </header>
  );
};

export default Header;
