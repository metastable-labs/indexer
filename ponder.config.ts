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
      address: "0x40D5f2a449FeA5b12C52dD16CbA5698161C18916",
      startBlock: 25114610,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0x68b57A15B43D3342d2a2680447c8525522c1dE6F",
      startBlock: 25114610,
    },
  },
});
