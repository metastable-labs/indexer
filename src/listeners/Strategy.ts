import { ponder } from "ponder:registry";
import type { EventArgs, EventContext } from "@/generated";
import { sendToSQS } from "../utils/sqs";
import { logger } from "../utils/logger";

ponder.on(
  "StrategyContract:CreateStrategy",
  async ({
    event,
    context,
  }: {
    event: EventArgs["StrategyContract:CreateStrategy"];
    context: EventContext;
  }) => {
    try {
      const {
        strategyId,
        curator,
        name,
        strategyDescription,
        steps,
        minDeposit,
        maxTVL,
        performanceFee,
      } = event.args;

      const eventData = {
        strategyId,
        curator,
        name,
        description: strategyDescription,
        steps: steps.map((step: any) => ({
          ...step,
          amountRatio: step.amountRatio.toString(),
        })),
        minDeposit: minDeposit.toString(),
        maxTVL: maxTVL.toString(),
        performanceFee: performanceFee.toString(),
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      };

      logger.info("StrategyContract: CreateStrategy event detected", eventData);

      //   await context.db.insert("contract_events").values({
      //     contractName: "StrategyContract",
      //     blockNumber: eventData.blockNumber,
      //     eventName: "CreateStrategy",
      //     eventData,
      //   });

      await sendToSQS("CreateStrategy", eventData);
      logger.info(
        "CreateStrategy: CreateStrategy event processed successfully",
        eventData
      );
    } catch (error) {
      logger.error("Error processing StrategyContract:CreateStrategy event", {
        error: error instanceof Error ? error.message : String(error),
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      });
      throw error;
    }
  }
);
