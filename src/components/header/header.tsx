"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle/theme-toggle";
import { useCommonStore } from "@/stores/useStore";
import "./header.scss";
import { EnumTheme } from "@/shared/enums";
import Link from "next/link";
import { useAccount} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

console.log("process.env", process.env.NODE_ENV);
const Header = () => {
  const { theme, initTheme } = useCommonStore();
  const account = useAccount();

  useEffect(() => {
    initTheme();
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
      </div>
    </header>
  );
};

export default Header;
