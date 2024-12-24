import { create} from "zustand";
import { EnumTheme } from "@/shared/enums";

interface ICommonStoreState {
  theme: EnumTheme;
  setTheme: () => void;
  initTheme: () => void;
}

export const useCommonStore = create<ICommonStoreState>((set, get) => ({
  theme: EnumTheme.Dark,
  setTheme: () => {
    const theme = get().theme === EnumTheme.Light ? EnumTheme.Dark : EnumTheme.Light;
    set({ theme });
    localStorage.setItem('theme', theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(theme === EnumTheme.Dark ? EnumTheme.Light : EnumTheme.Dark);
  },
  initTheme: () => {
    const theme = localStorage.getItem('theme') as EnumTheme || EnumTheme.Light;
    set({ theme });
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove(theme === EnumTheme.Dark ? EnumTheme.Light : EnumTheme.Dark);
  }
}));

