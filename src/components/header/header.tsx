"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import { useCommonStore } from "@/stores/useStore";
import "./header.scss";
import { EnumTheme } from "@/shared/enums";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

console.log("process.env", process.env.NODE_ENV);
const Header = () => {
  const { theme, initTheme } = useCommonStore();
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWalletHandler = () => {
    // 连接metamask
    connect({ connector: connectors[0] });
    console.log("connect", connectors);
  };

  // const disconnectWalletHandler = () => {
  //   disconnect();
  // };

  // const [showSwitchChain, setShowSwitchChain] = useState(false);
  // const currentChainId = useChainId();
  // const { chains, switchChain } = useSwitchChain();
  
  // const openSwitchChain = () => {
  //   setShowSwitchChain(true);
  // };

  // // 切换网络按钮
  // const switchChainHandler = (chainId: number) => {
  //   switchChain({ chainId: chainId as any });
  //   setShowSwitchChain(false);
  // };

  // const handleCloseSwitchChain = () => {
  //   document.addEventListener("click", (e) => {
  //     if (!(e.target as HTMLElement)?.closest("#switch-chain-list") && e.target !== document.getElementById("switch-chain-btn")) {
  //       setShowSwitchChain(false);
  //     }
  //   });
  // };

  useEffect(() => {
    // 设置主题
    initTheme();
    // handleCloseSwitchChain();
    console.log("account", account);
  }, []);

  return (
    <header className="main-header">
      <div className="text-2xl z-10 max-w-5xl items-center justify-between font-mono text-sm flex fs-20">
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
          <Link href="/about" className="hover:text-blue-500">
            About
          </Link>
        </nav>
        <ThemeToggle />
        <ConnectButton />
        {/* 切换网络按钮 */}
        {/* <div className="relative">
          <button
            className="border border-gray-300 rounded-md p-2 text-xs"
            id="switch-chain-btn"
            type="button"
            onClick={openSwitchChain}
          >
            Switch Chain
          </button>
          {showSwitchChain && (
          <div id="switch-chain-list" className="flex flex-col border border-gray-300 rounded-md min-w-20 bg-white shadow-md absolute top-10">
            {chains.map((chain) => (
              <div
                className={`hover:text-blue-500 hover:bg-gray-100 fs-14 cursor-pointer py-2 px-4 ${chain.id === currentChainId ? "text-blue-500 cursor-default bg-gray-100" : ""}`}
                key={chain.id}
                onClick={() => switchChainHandler(chain.id)}
              >
                {chain.name}
              </div>
              ))}
            </div>
          )}
        </div>
        {account.address ? (
          <>
            <span className="text-sm ml-8">
              {(account.address || "").slice(0, 4)}...
              {(account.address || "").slice(-4)}
            </span>
            <button
              className="border border-gray-300 rounded-md p-2 text-xs"
              type="button"
              onClick={disconnectWalletHandler}
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            className="border border-gray-300 rounded-md p-2 text-xs"
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </button>
        )} */}
      </div>
    </header>
  );
};

export default Header;
