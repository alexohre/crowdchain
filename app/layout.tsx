import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <Navbar />
        <main>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1A5D1A",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                fontSize: "16px",
              },
              duration: 3000,
            }}
          />
        </main>
        <Footer />
      </body>
    </html>
  );
}
