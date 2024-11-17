import { getBalance } from "@/shared/helper";
import { create} from "zustand";
import { EnumTheme } from "@/shared/enums";

interface ICommonStoreState {
  theme: EnumTheme;
  setTheme: () => void;
  initTheme: () => void;
}

interface IWalletStoreState {
  account: string;
  balance: string;
  setAccount: (account: string) => void;
  setBalance: (balance: string) => void;
}

export const useWalletStore = create<IWalletStoreState>((set) => ({
  account: "",
  balance: "0",
  setAccount: async (account: string) => {
    set({ account });
    const balance = await getBalance(account);
    set({ balance });
  },
  setBalance: (balance: string) => set({ balance }),
}));

export const useCommonStore = create<ICommonStoreState>((set, get) => ({
  theme: EnumTheme.Light,
  setTheme: () => {
    const theme = get().theme === EnumTheme.Light ? EnumTheme.Dark : EnumTheme.Light;
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  },
  initTheme: () => {
    const theme = localStorage.getItem('theme') as EnumTheme || EnumTheme.Light;
    set({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  }
}));

