import { ponder } from "ponder:registry";
import type { EventArgs, EventContext } from "@/generated";
import { sendToSQS } from "../utils/sqs";
import { logger } from "../utils/logger";

ponder.on(
  "EngineContract:Join",
  async ({
    event,
    context,
  }: {
    event: EventArgs["EngineContract:Join"];
    context: EventContext;
  }) => {
    try {
      const { strategyId, depositor, tokenAddress, amount } = event.args;

      const eventData = {
        strategyId,
        depositor,
        tokenAddress,
        amount,
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      };

      logger.info("EngineContract: Join event detected", eventData);

      // await context.db.insert("contract_events").values({
      //   contractName: "EngineContract",
      //   blockNumber: eventData.blockNumber,
      //   eventName: "Join",
      //   eventData,
      // });

      await sendToSQS("Join", eventData);

      logger.info(
        "EngineContract: Join event processed successfully",
        eventData
      );
    } catch (error) {
      logger.error("Error processing EngineContract:Join event", {
        error: error instanceof Error ? error.message : String(error),
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      });
      throw error;
    }
  }
);

ponder.on(
  "EngineContract:Exit",
  async ({
    event,
    context,
  }: {
    event: EventArgs["EngineContract:Exit"];
    context: EventContext;
  }) => {
    try {
      const { strategyId, user } = event.args;

      const eventData = {
        strategyId,
        user,
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      };

      logger.info("EngineContract: Exit event detected", eventData);

      // await context.db.insert("contract_events").values({
      //   contractName: "EngineContract",
      //   blockNumber: eventData.blockNumber,
      //   eventName: "Join",
      //   eventData,
      // });

      await sendToSQS("Exit", eventData);

      logger.info(
        "EngineContract: Exit event processed successfully",
        eventData
      );
    } catch (error) {
      logger.error("Error processing EngineContract:Exit event", {
        error: error instanceof Error ? error.message : String(error),
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      });
      throw error;
    }
  }
);
