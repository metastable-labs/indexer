import { index, onchainTable } from "ponder";

export const contractEvents = onchainTable(
  "contract_events",
  (t) => ({
    id: t.text().primaryKey(),
    contractName: t.varchar().notNull(),
    blockNumber: t.bigint().notNull(),
    eventName: t.varchar().notNull(),
    eventData: t.jsonb().notNull(),
    createdAt: t.timestamp().notNull(),
  }),
  (table) => ({
    blockNumberx: index().on(table.blockNumber),
  })
);
