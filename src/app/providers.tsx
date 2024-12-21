"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { useCommonStore } from "@/stores/useStore";

import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { getConfig } from "@/lib/wagmi";
import { EnumTheme } from "@/shared/enums";
import Welcome from "@/components/welcome/welcome";
import { usePathname } from "next/navigation";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const { theme } = useCommonStore();
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  // 只有第一次加载是Home的时候，才显示Welcome组件
  useEffect(() => {
    if (pathname !== '/') {
      setIsShowWelcome(false);
    }
  }, [pathname]);

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          theme={theme === EnumTheme.Dark ? darkTheme() : lightTheme()}
        >
          {props.children}
        </RainbowKitProvider>
        {pathname === '/' && isShowWelcome && <Welcome onMount={() => setIsShowWelcome(false)} />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
