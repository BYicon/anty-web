"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import { useCommonStore } from "@/stores/useStore";
import "./header.scss";
import { EnumTheme } from "@/shared/enums";
import Link from "next/link";
import { useAccount} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useQuery } from "@tanstack/react-query";
import { getEthereumRealTimePrice } from "@/http/api";
import { useRouter } from "next/navigation";
console.log("process.env", process.env.NODE_ENV);
const Header = () => {
  const { theme, initTheme } = useCommonStore();
  const account = useAccount();
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  // const { data: ethereumRealTimePrice } = useQuery({
  //   queryKey: ["ethereumRealTimePrice"],
  //   queryFn: getEthereumRealTimePrice,
  //   refetchInterval: 1000,
  // });

  useEffect(() => {
    initTheme();
    console.log("account", account);
  }, []);

  return (
    <header className="main-header">
      <div className="text-2xl z-10 max-w-5xl items-center justify-between font-mono text-sm flex fs-20 cursor-pointer" onClick={goHome}>
        <img
          src="/images/logo.png"
          alt="logo"
          className={`w-10 h-10 border rounded-full ${theme === EnumTheme.Light ? "" : "filter invert"}`}
        />
        <span className="text-sm ml-2">Anty｜MirrorCoin</span>
      </div>
      <div className="flex items-center gap-4">
        <nav className="main-nav">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/recharge" className="hover:text-blue-500">
            Recharge
          </Link>
          <Link href="/nfts" className="hover:text-blue-500">
            NFTs
          </Link>
        </nav>
        <ThemeToggle />
        {/* <div className="eth-price">
          <span>$</span>
          <span>{ethereumRealTimePrice?.price || "0"}</span>
        </div> */}
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;
