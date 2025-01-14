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
      address: "0xCBAa6be0d4c7A251a42E5AB323620bc143eF2e24",
      startBlock: 25030547,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0xFc31a7C508062909c5B79867Ff538DB369bEd65a",
      startBlock: 25030547,
    },
  },
});
