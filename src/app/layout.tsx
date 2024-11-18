import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as dotenv from "dotenv";
import "../../public/iconfont/iconfont.css";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";

import { getConfig } from "@/config/wagmi";
import { Providers } from "@/app/providers";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.scss";

dotenv.config();

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mirror",
  description: "mirror coin",
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
    <html>
      <body className={`${inter.className} min-h-screen`}>
        <Providers initialState={initialState}>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
