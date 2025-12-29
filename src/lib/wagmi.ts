import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { metaMask } from "@wagmi/connectors";

const { connectors } = getDefaultWallets({
  appName: "Fennac",
  projectId: "2c36ad052ffbb4d42ea115856c0fa089",
  chains: [polygon],
});

export const config = createConfig({
  chains: [polygon],
  connectors: [
    // Explicitly add MetaMask first to ensure it's prioritized and detected
    metaMask({
      dappMetadata: {
        name: "Fennac",
      },
    }),
    // Add other connectors from RainbowKit (MetaMask may be included but this ensures priority)
    ...connectors,
  ],
  transports: {
    [polygon.id]: http(),
  },
  ssr: false,
});
