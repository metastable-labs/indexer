import * as env from "env-var";

export default () => ({
  APP: {
    PORT: env.get("PORT").default(3007).asInt(),
    ENVIRONMENT: env.get("NODE_ENV").default("development").asString(),
    LOG_LEVEL: env.get("LOG_LEVEL").default("info").asString(),
  },
  DATABASE: {
    PG_URL: env.get("DATABASE_URL").default(".ponder/pglite").asString(),
  },
  NETWORKS: {
    MAINNET_RPC_URL: env.get("RPC_URL").required().asString(),
  },
  SQS: {
    REGION: env.get("AWS_SQS_REGION").required().asString(),
    ACCESS_KEY: env.get("AWS_ACCESS_KEY_ID").required().asString(),
    SECRET_KEY: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
    QUEUE_URL: env.get("SQS_QUEUE_URL").required().asString(),
  },
});
