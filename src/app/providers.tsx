"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { getConfig } from "@/lib/wagmi";
import Welcome from "@/components/welcome/welcome";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";


export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const [isShowWelcome, setIsShowWelcome] = useState(true);
  const { theme } = useTheme();
  // 只有第一次加载是Home的时候，才显示Welcome组件
  useEffect(() => {
    if (pathname !== "/") {
      setIsShowWelcome(false);
    }
  }, [pathname]);

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            coolMode
            theme={theme === "dark" ? darkTheme() : lightTheme()}
          >
            {props.children}
          </RainbowKitProvider>
        {pathname === "/" && isShowWelcome && (
          <Welcome onMount={() => setIsShowWelcome(false)} />
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
