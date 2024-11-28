import { create} from "zustand";
import { EnumTheme } from "@/shared/enums";

interface ICommonStoreState {
  theme: EnumTheme;
  setTheme: () => void;
  initTheme: () => void;
}

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

