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
      address: "0xdD55a5c41C7FBE91e520ff6c8E14656b155A89E8",
      startBlock: 23911733,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0xa1f8E7DD401ad584F689710a81DF9F7f3056ca6C",
      startBlock: 23911733,
    },
  },
});
