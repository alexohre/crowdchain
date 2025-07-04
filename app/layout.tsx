import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { StarknetProvider } from "./components/starknet-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
});

export const metadata: Metadata = {
  title: "CrowdChain - Decentralized Crowdfunding",
  description:
    "A decentralized crowdfunding platform built on blockchain technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StarknetProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </StarknetProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
