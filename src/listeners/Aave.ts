import { ponder } from "ponder:registry";
import { sendToSQS } from "../utils/sqs";
import { logger } from "../utils/logger";
import type { EventArgs, EventContext } from "@/generated";
import { replaceBigInts } from "../utils/replaceBigInts";

ponder.on(
  "AaveContract:Borrow",
  async ({
    event,
    context,
  }: {
    event: EventArgs["AaveContract:Borrow"];
    context: EventContext;
  }) => {
    try {
      const {
        reserve,
        onBehalfOf,
        referralCode,
        user,
        amount,
        interestRateMode,
        borrowRate,
      } = event.args;

      const eventData = replaceBigInts({
        reserve,
        onBehalfOf,
        referralCode,
        user,
        amount,
        interestRateMode,
        borrowRate,
        blockNumber: event.block.number,
        transactionHash: event.transaction.hash,
      });

      const id = event.transaction.hash;
      const createdAt = new Date().toISOString();

      // await context.db.insert("contract_events").values({
      //   id,
      //   contractName: "AaveContract",
      //   blockNumber: event.block.number,
      //   eventName: "Borrow",
      //   eventData,
      //   createdAt,
      // });

      await sendToSQS("Borrow", eventData);

      logger.info(
        "AaveContract: Borrow event processed successfully",
        eventData
      );
    } catch (error) {
      logger.error("Error processing AaveContract:Borrow event", {
        error: error instanceof Error ? error.message : String(error),
        blockNumber: event.block.number,
        transactionHash: event.transaction?.hash || "N/A",
      });
      throw error;
    }
  }
);
