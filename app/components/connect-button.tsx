"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import { ChevronsUpDown, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import Image from "next/image";

// Define wallet connectors with their IDs, names, and icons
const WALLET_CONNECTORS = [
  { id: "argentX", name: "Argent X", icon: "/assets/argent.svg" },
  { id: "braavos", name: "Braavos", icon: "/assets/braavos.svg" },
] as const;

type ConnectButtonVariant = "default" | "navbar";

interface ConnectButtonProps {
  variant?: ConnectButtonVariant;
}

const truncateAddress = (address?: string) => {
  if (!address || address.length < 10) return "Invalid Address";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ConnectButton({ variant = "default" }: ConnectButtonProps) {
  const { connect, connectors, error: connectError } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle connection errors with toast notifications and UI display
  useEffect(() => {
    if (connectError) {
      const message =
        "Failed to connect wallet. Please ensure the wallet is installed and try again.";
      setErrorMessage(message);
      toast.error(message);
    }
  }, [connectError]);

  const handleConnect = () => {
    setErrorMessage(null);
    setIsWalletModalOpen(true);
  };

  const handleWalletSelect = async (connectorId: string) => {
    try {
      const connector = connectors.find((c) => c.id === connectorId);
      if (!connector) {
        const message = `No connector found for ${connectorId}. Please ensure the wallet is installed.`;
        setErrorMessage(message);
        toast.error(message);
        return;
      }
      await connect({ connector });
      setIsWalletModalOpen(false);
      toast.success("Wallet connected successfully!");
    } catch (error) {
      console.error("Connection failed:", error);
      const message =
        "Connection failed. Please try again or check wallet installation.";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  const handleDisconnect = () => {
    setIsDisconnectModalOpen(true);
  };

  const confirmDisconnect = () => {
    disconnect();
    setIsDropdownOpen(false);
    setIsDisconnectModalOpen(false);
    toast.success("Wallet disconnected successfully!");
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {isConnected && address ? (
          <div
            className={cn(
              "relative z-40",
              variant === "default" ? "mx-auto w-fit" : ""
            )}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "flex items-center gap-2 border-2 border-[#1A5D1A] text-[#1A5D1A] font-extrabold transition-colors hover:bg-green-50",
                variant === "navbar"
                  ? "rounded-[8px] px-4 py-2"
                  : "rounded-[8px] px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl"
              )}
              aria-label="Account menu"
            >
              {truncateAddress(address)}
              <ChevronsUpDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div
                className={cn(
                  "absolute right-0 mt-2 bg-white shadow-lg z-50 border border-[#1A5D1A]",
                  variant === "default"
                    ? "rounded-[8px] px-8 py-3 sm:py-4 md:py-5 text-base font-extrabold w-fit"
                    : "rounded-[8px] w-48"
                )}
              >
                <button
                  onClick={handleDisconnect}
                  className="w-full text-left px-4 py-2 bg-[#1A5D1A] text-white font-extrabold hover:bg-green-700 transition-colors rounded-[8px]"
                >
                  Disconnect Wallet
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className={cn(
              "bg-[#1A5D1A] text-white font-extrabold transition-colors hover:bg-green-700",
              variant === "navbar"
                ? "rounded-[8px] px-4 py-2"
                : "rounded-[8px] px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 text-base sm:text-lg md:text-xl"
            )}
            aria-label="Connect wallet"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Wallet Selection Modal */}
      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-[#374151]">
          <DialogHeader>
            <DialogTitle className="text-[#1A5D1A] font-extrabold text-xl">
              Connect a Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-[#555555] font-medium">
              Select your preferred wallet to connect
            </p>
            <div className="space-y-3">
              {connectors.map((connector) => {
                const wallet = WALLET_CONNECTORS.find(
                  (w) => w.id === connector.id
                ) || {
                  id: connector.id,
                  name: connector.name || connector.id,
                  icon: "/default-wallet.png", // Fallback icon
                };
                return (
                  <Card
                    key={wallet.id}
                    onClick={() => handleWalletSelect(wallet.id)}
                    className={cn(
                      "cursor-pointer hover:bg-green-50 p-4 transition-colors border-[#1A5D1A]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {wallet.icon && (
                        <Image
                          src={wallet.icon}
                          alt={wallet.name}
                          width={28}
                          height={28}
                          className="rounded-md"
                        />
                      )}
                      <div className="text-sm text-[#374151] font-medium">
                        <h2 className="text-sm font-extrabold text-[#1A5D1A]">
                          {wallet.name}
                        </h2>
                        <p>Connect with {wallet.name} wallet</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Disconnect Modal */}
      <Dialog
        open={isDisconnectModalOpen}
        onOpenChange={setIsDisconnectModalOpen}
      >
        <DialogContent className="bg-white text-[#374151]">
          <DialogHeader>
            <DialogTitle className="text-[#1A5D1A] font-extrabold">
              Disconnect Wallet
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[#555555] font-medium">
              Are you sure you want to disconnect your wallet?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setIsDisconnectModalOpen(false)}
                className="border-[#1A5D1A] text-[#1A5D1A] font-extrabold hover:bg-green-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDisconnect}
                className="bg-[#1A5D1A] text-white font-extrabold hover:bg-green-700"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
