import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as dotenv from "dotenv";
import "../../public/iconfont/iconfont.css";
import StyledComponentsRegistry from "./_lib/AntdRegistry";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
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
  return (
    <html>
      <body className={`${inter.className} min-h-screen`}>
        <StyledComponentsRegistry>
          <Header />
            {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
