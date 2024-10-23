"use client";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { useState } from "react";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    // const network = await handleNetworkSwitch();
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });

    // setCurrentAccount(accounts[0]);
    // setError("");
  };

  return (
    <main className="min-h-screen p-4 flex flex-col">
      <Nav />
      <div className="flex flex-1 flex-col items-center justify-center"></div>
      <Footer />
    </main>
  );
}
