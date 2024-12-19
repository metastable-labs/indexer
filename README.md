# Dev Indexer Events - SQS Queue

This repository provides guidelines for starting and consuming events to/from the Indexer Events SQS queue. These events originate from smart contract listeners and are published to the queue for downstream processing.

## SQS Queue Details

- **Queue URL:** https://sqs.eu-west-2.amazonaws.com/445567075963/dev-indexer-events
- **Region:** eu-west-2

## Prerequisites

### AWS Credentials

To interact with the queue, you will need the following:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Credentials will be provided securely via a private channel.

### Polling Mechanism

Use your preferred tool or SDK to poll the queue:

- **AWS CLI**
- **AWS SDKs** (e.g., Node.js, Python, etc.)
- Any compatible SQS client for your programming language.

### AWS CLI Configuration

Ensure that the AWS CLI is installed and configured to use the provided credentials and the `eu-west-2` region.

## Environment Setup

Before starting the application, ensure the following environment variables are configured:

```
NODE_ENV=development
PORT=3007
LOG_LEVEL=info
RPC_URL=https://example.com/infura
DATABASE_URL=postgres://username:password@localhost:5432/liquid_indexer
AWS_SQS_REGION=eu-west-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
SQS_QUEUE_URL=https://sqs.eu-west-2.amazonaws.com/445567075963/dev-indexer-events
DATABASE_SCHEMA=public
```

Add these variables to a `.env` file at the root of your project or export them directly in your environment.

## Sample Event Data

### CreateStrategy Event

```json
{
  "eventName": "CreateStrategy",
  "eventData": {
    "strategyId": "0x123abc456def...",
    "curator": "0x456abc789def...",
    "name": "Sample Strategy",
    "description": "This is a detailed description of the strategy.",
    "steps": [
      {
        "connector": "0x123456789abc...",
        "actionType": 1,
        "assetsIn": ["0xabc123...", "0xdef456..."],
        "assetOut": "0x789abc...",
        "amountRatio": "1000"
      }
    ],
    "minDeposit": "500",
    "maxTVL": "1000000",
    "performanceFee": "5",
    "blockNumber": 12345678,
    "transactionHash": "0xabcdef123456789..."
  }
}
```

### Join Event

```json
{
  "eventName": "Join",
  "eventData": {
    "strategyId": "0x123abc456def...",
    "depositor": "0x789abc123def...",
    "tokenAddress": ["0xabc123...", "0xdef456..."],
    "amount": ["100", "200"],
    "blockNumber": 12345679,
    "transactionHash": "0xabcdef789456123..."
  }
}
```

## How to Start the Application

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   pnpm dev
   ```

   The application will start on the port specified in the `PORT` environment variable (default: 3007).

## How to Poll the Queue

- Use the SQS Queue URL and region provided above.
- Set up a polling mechanism using AWS CLI or any SDK compatible with SQS.
- Process each message according to your application logic.
