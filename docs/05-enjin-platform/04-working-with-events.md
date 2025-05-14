---
title: "Working with Events"
slug: "working-with-events"
description: "Explore how to handle blockchain events within the Enjin platform, enabling real-time updates and interactions in your application."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the blockchain ecosystem, "events" refer to important actions or changes within the blockchain network. 

This includes things like creating or changing digital assets, transferring balances, and any other actions that alter the chain's state. These events are recorded on the blockchain, providing a transparent and unchangeable history of all activities.

Monitoring and analyzing these events helps users and developers understand the flow of transactions and respond to specific actions or conditions in the network. This is key for decentralized applications and games, enabling automated interactions and improving overall functionality.

:::warning Note on Address Formats in Platform Events
Please note that all account addresses included in platform events, such as channel names or any addresses within the event payload, are formatted as **public keys**.  
For example, in a "Transfer" event, the "from" account address appears in its public key format.  
If needed, you may use the [Account Format Transform tool](https://matrix.subscan.io/tools/format_transform) to convert between **SS58-encoded address format** (e.g., "cx...123" for the Canary Matrixchain or "cn...123" for the Canary Relaychain) and public key format.
:::

## Using Enjin Platform

To view events emitted from a transaction conducted on the platform, you can use the `GetTransaction` query as follows:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransaction {
  GetTransaction(id: 40000) {
    method
    state
    result
    events {
      edges {
        node {
          moduleld
          eventId
          params {
            type
            value
          }
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTransaction": {
      "method": "BatchTransfer",
      "state": "FINALIZED",
      "result": "EXTRINSIC_SUCCESS",
      "events": {
        "edges": [
          {
            "node": {
              "moduleId": "Balances",
              "eventId": "Withdraw",
              "params": [
                {
                  "type": "who",
                  "value": "f64fda4cb0352aff9394f0cc14495ca8cefffb8c8e9b37de058a1d4d4650c3313"
                },
                {
                  "type": "amount",
                  "value": "20675071170417823"
                }
              ]
            }
          },
          {
            "node": {
              "moduleId": "MultiTokens",
              "eventId": "CollectionAccountCreated",
              "params": [
                {
                  "type": "collection_id",
                  "value": "2155"
                },
                {
                  "type": "account",
                  "value": "303049fa4535f21acc5760521c6cc91f01ddf28ebf771da99effbf5c1031416F"
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```
  </TabItem>
</Tabs>

Our platform broadcasts network events through a `WebSocket` channel, similar to the recent events feature in Polkadot-JS. It's important to note that this channel includes not only network-wide events but also specific events from the Enjin Platform.

Learn more about [Websocket Events here](/05-enjin-platform/04-working-with-events.md).

![Platform Events](/img/guides/going-open-source/platform-events.png)

Our platform uses WebSockets to transmit real-time events, but since WebSockets can sometimes be unstable, there's a risk of missing events if your system loses connection. To address this, we also cache events in a query called `GetPendingEvents`. The most effective way to stay updated in real time and ensure no events are missed is to always `acknowledge` the events you receive.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetPendingEvents {
  GetPendingEvents(
    acknowledgeEvents: false,
    first: 50
  ) {
    edges {
      node {
        name
        data
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetPendingEvents": {
      "edges": [
        {
          "node": {
            "name": "platform:transaction-updated",
            "data": {
              "id": 179419,
              "state": "PROCESSING",
              "method": "BatchTransfer",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "4eace652-9c9f-4721-bfe3-1be6f7597c32",
              "transactionHash": null
            }
          }
        },
        {
          "node": {
            "name": "platform:transaction-updated",
            "data": {
              "id": 179417,
              "state": "PROCESSING",
              "method": "BatchTransfer",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "a3e62297-983e-4a14-81a9-975976302127",
              "transactionHash": null
            }
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

## Using Enjin Console

In the explorer tab, you can find the recent events emitted in the network. Those will appear as soon as they are emitted.

![Viewing events on Enjin Console](/img/guides/going-open-source/enjin-console-events.png)

You can also see the events emitted in a single block by querying the block directly

![Viewing events on Enjin Console](/img/guides/going-open-source/enjin-console-events-2.png)
