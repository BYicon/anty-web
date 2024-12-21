'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { useCommonStore } from '@/stores/useStore';

import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';

import { getConfig } from '@/lib/wagmi'
import { EnumTheme } from '@/shared/enums';

export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const { theme } = useCommonStore();
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode theme={theme === EnumTheme.Dark ? darkTheme() : lightTheme()}>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
