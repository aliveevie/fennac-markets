import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygon } from "wagmi/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "Fennac",
  projectId: "2c36ad052ffbb4d42ea115856c0fa089",
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});
