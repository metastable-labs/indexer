import pino from "pino";
import config from "../config";

const appConfig = config();

export const logger = pino({
  level: appConfig.APP.LOG_LEVEL || "info",
  transport:
    appConfig.APP.ENVIRONMENT !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: true,
            ignore: "pid,hostname",
          },
        }
      : undefined,
});
