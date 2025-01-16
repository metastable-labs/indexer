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
      address: "0x681510010e7A44869a51135C01ee4B0071a91ec3",
      startBlock: 25114610,
    },

    EngineContract: {
      network: "mainnet",
      abi: EngineContractAbi,
      address: "0xcB7198EF5AdAE20083692bBc71c561456A536705",
      startBlock: 25114610,
    },
  },
});
