---
title: "Transactions"
slug: "transactions"
description: "Use the Enjin API to perform transactions mutations, enabling the creation and modification of blockchain transactions, including asset transfers."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is an overview of some of the most commonly used operations in the Enjin Platform Schema. 

## AcknowledgeEvents

The `AcknowledgeEvents` mutation allows you to confirm the processing of specific events by acknowledging them and removing them from the cache. This helps maintain cache integrity and ensures efficient system operation by eliminating unnecessary data.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AcknowledgeEvents{
    AcknowledgeEvents(
        uuids: ["25f506ef-92a1-40a9-b034-60f9ab5045da"]
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "AcknowledgeEvents": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use this mutation when you want to:

- Ensure that certain events have been successfully processed or recognized.
- Remove processed events from the cache to prevent it from growing excessively.
- Optimize system performance by clearing unnecessary data from the cache.

## UpdateTransaction

The `UpdateTransaction` mutation enables you to update an existing transaction with new information. This is useful for maintaining accurate transaction records and tracking the lifecycle of transactions.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UpdateTransaction{
    UpdateTransaction(
        id: 7
        signedAtBlock: 320100
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "UpdateTransaction": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `UpdateTransaction` mutation when you want to:

- Update the state, transaction ID, signed block, or transaction hash of an existing transaction.
- Ensure that off-chain transaction records accurately reflect on-chain details.
- Track the progress and lifecycle of a transaction.
- Respond dynamically to events, such as block confirmations or transaction finality.

## RetryTransactions

The `RetryTransactions` mutation provides a mechanism to retry transactions that have previously failed. This is particularly useful for addressing transaction failures caused by temporary issues such as network congestion or gas price spikes.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RetryTransactions{
  RetryTransactions(ids: [175])
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "RetryTransactions": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `RetryTransactions` mutation when:

- You want to re-attempt processing of transactions that previously failed.
- Transactions have failed due to temporary issues like network congestion or gas price spikes.
- Avoid the need to manually re-create and resubmit each transaction, saving time and effort.
