import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as dotenv from 'dotenv'
import "./globals.css";

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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
