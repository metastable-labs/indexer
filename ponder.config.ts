import { createConfig } from "ponder";
import { http } from "viem";
import { StrategyContractAbi } from "./abis/StrategyContractAbi";
import { EngineContractAbi } from "./abis/EngineContractAbi";
import config from "./src/config";

const appConfig = config();
export default createConfig({
  database: {
    kind: "postgres",
    connectionString: appConfig.DATABASE.PG_URL,
  },
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(appConfig.NETWORKS.MAINNET_RPC_URL),
    },
  },
  contracts: {
    StrategyContract: {
      network: "mainnet",
      abi: StrategyContractAbi,
      address: "0x30Ef1A443D24F6DD626f356a55f635766D441998",
      startBlock: 24563479,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0x94A4D03f2823BC0A183e49636A1896B2754C5c3B",
      startBlock: 24563479,
    },
  },
});
