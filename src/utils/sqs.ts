import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { logger } from "./logger";
import config from "../config";

const appConfig = config();

const sqsClient = new SQSClient({
  region: appConfig.SQS.REGION,
  credentials: {
    accessKeyId: appConfig.SQS.ACCESS_KEY,
    secretAccessKey: appConfig.SQS.SECRET_KEY,
  },
});

export const sendToSQS = async (
  eventName: string,
  messageBody: object
): Promise<void> => {
  const params = {
    QueueUrl: appConfig.SQS.QUEUE_URL,
    MessageBody: JSON.stringify(
      {
        eventName,
        eventData: messageBody,
        timestamp: new Date().toISOString(),
      },
      (_, value) => (typeof value === "bigint" ? value.toString() : value)
    ),
  };

  try {
    const command = new SendMessageCommand(params);
    const result = await sqsClient.send(command);
    logger.info(`[SQS] Message sent successfully`, {
      messageId: result.MessageId,
      eventName,
    });
  } catch (error) {
    logger.error(`[SQS] Failed to send message`, {
      eventName,
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      `[SQS] Failed to send message for event '${eventName}': ${error}`
    );
  }
};
