"use client";
import {
  checkIfWalletIsConnected,
} from "@/shared/helper";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useWalletStore } from "@/stores/useStore";
import { useEffect } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import { useCommonStore } from "@/stores/useStore";
import "./header.scss";
import { EnumTheme } from "@/shared/enums";
import Link from "next/link";

console.log('process.env', process.env.NODE_ENV);
const Header = () => {
  const { account, balance, setAccount } = useWalletStore();
  const { connectWallet } = useWalletConnection();
  const { theme, initTheme } = useCommonStore();
  const connectWalletHandler = () => {
    console.log('process.env.NEXT_PUBLIC_NETWORK_KEY', process.env.NEXT_PUBLIC_NETWORK_KEY);
    connectWallet(process.env.NEXT_PUBLIC_NETWORK_KEY as string);
  };

  useEffect(() => {
    // 设置主题
    initTheme();
    if (window.ethereum) {
      const _checkIfWalletIsConnected = async () => {
        const account = await checkIfWalletIsConnected();
        if (account) {
          setAccount(account);
        }
      };
      _checkIfWalletIsConnected();
      // 监听钱包地址变化
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("handleAccountsChanged accounts 🚀🚀🚀", accounts);
        setAccount(accounts[0] || "");
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else {
      console.log("No ethereum found~~");
    }
  }, []);

  return (
    <header className="main-header">
      <div className="text-2xl z-10 max-w-5xl items-center justify-between font-mono text-sm flex fs-20">
        <img src="/images/logo.png" alt="logo" className={`w-10 h-10 border rounded-full ${theme === EnumTheme.Light ? '' : 'filter invert'}`} />
        <span className="text-sm ml-2">Anty｜MirrorCoin</span>
      </div>
      <div className="flex items-center gap-4">
        <nav className="main-nav">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/recharge" className="hover:text-blue-500">Recharge</Link>
          <Link href="/about" className="hover:text-blue-500">About</Link>
        </nav>
        <ThemeToggle />
        {account ? (
          <span className="text-sm">
            {account.slice(0, 4)}...{account.slice(-4)}
          </span>
        ) : (
          <button
            className="border border-gray-300 rounded-md p-2 text-sm"
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
