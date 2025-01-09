import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as dotenv from "dotenv";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { getConfig } from "@/lib/wagmi";
import { ThemeProvider } from "./themeProvider";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";
import { Toaster } from "@/components/ui/toaster";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anty",
  description: "explore web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get("cookie")
  );
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers initialState={initialState}>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </Providers>
        </ThemeProvider>
        {/* <script
          data-goatcounter="https://anty.goatcounter.com/count"
          async
          src="//gc.zgo.at/count.js"
        ></script> */}
      </body>
    </html>
  );
}
