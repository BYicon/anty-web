import { getBalance } from "@/shared/helper";
import create from "zustand";

interface StoreState {
  account: string;
  balance: string;
  setAccount: (account: string) => void;
  setBalance: (balance: string) => void;
}

const useWalletStore = create<StoreState>((set) => ({
  account: "",
  balance: "0",
  setAccount: async (account: string) => {
    set({ account });
    const balance = await getBalance(account);
    set({ balance });
  },
  setBalance: (balance: string) => set({ balance }),
}));



export default useWalletStore;
