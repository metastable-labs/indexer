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
      address: "0x99d6D2dEf07Fb0082688272B547841045E431a9d",
      startBlock: 24696994,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0x94A4D03f2823BC0A183e49636A1896B2754C5c3B",
      startBlock: 24696994,
    },
  },
});
