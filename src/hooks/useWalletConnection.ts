import { networks } from "@/shared/networks";
import { useWalletStore} from "@/stores/useStore";

/**
 * 钱包
 * @returns
 */
export const useWalletConnection = () => {
  const { setAccount } = useWalletStore();
  const connectWallet = async (networkName: string) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[networkName],
          },
        ],
      });
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return {
    connectWallet,
  };
};
