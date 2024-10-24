"use client";
import {
  checkIfWalletIsConnected,
} from "@/shared/helper";
import { useWalletConnection } from "@/shared/hooks/useWalletConnection";
import useWalletStore from "@/stores/useStore";
import { useEffect } from "react";

console.log('process.env', process.env.NODE_ENV);

export const Nav = () => {
  const { account, balance, setAccount, setBalance } = useWalletStore();
  const { connectWallet } = useWalletConnection();

  const connectWalletHandler = () => {
    connectWallet(process.env.NEXT_PUBLIC_NETWORK_KEY as string);
  };

  useEffect(() => {
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
    <nav className="flex w-full items-center justify-between px-4 border-b border-gray-300 h-[72px]">
      <div className="text-2xl z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex fs-20">
        Logo
      </div>
      <div className="flex items-center gap-4">
        {account ? (
          <span className="text-sm">
            {account.slice(0, 4)}...{account.slice(-4)}:{balance}
          </span>
        ) : (
          <button
            className="border border-gray-300 rounded-md p-2"
            onClick={connectWalletHandler}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};
