"use client";

import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  jsonRpcProvider
} from "@starknet-react/core";
import type { ReactNode } from "react";

interface StarknetProviderProps {
  children: ReactNode;
}

const provider = jsonRpcProvider({
  rpc: () => ({
    // ✅ Replace with your preferred working RPC endpoint
    nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_8" // or Infura, Blast, etc.
  })
});

export function StarknetProvider({ children }: StarknetProviderProps) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical"
  });

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect={true}
    >
      {children}
    </StarknetConfig>
  );
}
