---
title: "Working with Events"
slug: "working-with-events"
description: "Receive Enjin Platform notifications through WebSocket or Event Inbox, deduplicate and acknowledge deliveries, and read on-chain transaction events."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the blockchain ecosystem, "events" are the on-chain log entries emitted by extrinsics — they're how the chain reports what actually happened: token transfers, collection creation, marketplace listing IDs, balance changes, and so on. Monitoring them is essential for any application that needs to react to state changes — for example, unlocking an in-game item the moment the user receives the corresponding NFT.

## Choosing how to receive events

The platform provides notifications for changes relevant to your account, alongside the on-chain event logs you can read from a transaction's extrinsic.

| Approach | Use it when |
| --- | --- |
| [WebSocket through Pusher](/03-api-reference/03-websocket-events.md) | Your application needs notifications as changes happen. |
| [Event Inbox](#event-inbox) | You want to poll for on-chain notifications at a convenient time, or recover notifications missed during a connection outage. |
| [Transaction and extrinsic queries](#reading-a-transactions-events) | You need a transaction's on-chain outcome and detailed event logs. |

WebSocket and Event Inbox can share the same handler for eligible on-chain notifications: both expose the same event names and notification data. Event Inbox captures notifications automatically, without requiring a WebSocket subscription. It covers notifications for your eligible wallets and collections, rather than every event on the blockchain.

Platform lifecycle notifications such as `TransactionStateChanged` and `WalletLinked` are delivered over WebSocket separately. See the [notification reference](/03-api-reference/03-websocket-events.md#on-chain-notifications) for the distinction and supported inbox events.

## Event Inbox {#event-inbox}

Event Inbox retains notifications for **14 days** from dispatch. It supports both periodic polling and recovery alongside real-time delivery. Unacknowledged notifications expire and are automatically purged after 14 days, so choose a polling and retry schedule that processes them within that window. Historical events are not backfilled.

### Polling and acknowledging

1. Call [`GetPendingEvents`](/03-api-reference/01-queries/09-event-inbox-queries.md#getpendingevents) for a network and chain. It returns the oldest pending notifications first, up to `limit` (`1`–`100`, default `100`). The default network is `ENJIN` and the default chain is `MATRIX`.
2. For each entry, use its `uuid` to check whether your application has already processed the delivery. Dispatch new notifications to your handler using `event` and `payload`.
3. Persist the successful processing result and the delivery UUID. Then call [`AcknowledgeEvents`](/03-api-reference/02-mutations/09-event-inbox-mutations.md#acknowledgeevents) with the successfully processed UUIDs, including any you had already processed on a previous attempt.
4. Query again to retrieve the next batch. Continue until the result is `[]`, then wait until your next scheduled poll. Repeat for each network and chain your application uses.

`GetPendingEvents` returns a list of objects with `uuid`, `event`, and `payload`. Reading them does not remove them. **There is no pagination**: acknowledgment is how you advance beyond the oldest pending notifications.

`AcknowledgeEvents` accepts `1`–`100` distinct, valid UUIDs across any network or chain. It returns the number newly acknowledged; retrying UUIDs that are already acknowledged does not count them again. If processing fails, leave those notifications unacknowledged for retry. If acknowledgment fails after processing succeeds, retry acknowledgment without repeating the business action.

### Deduplicating deliveries

Use the delivery **`uuid`** as the deduplication key. The same delivery has the same UUID in both transports:

| Transport | Event name | Delivery UUID | Notification data |
| --- | --- | --- | --- |
| Event Inbox | Entry's `event` | Entry's top-level `uuid` | Entry's `payload` JSON object |
| Pusher client library | Callback's event name | Callback payload's `uuid` | Callback payload, including `uuid` |
| Raw WebSocket | Frame's `event` | `uuid` inside the decoded `data` | Parse the frame, then its JSON-encoded `data` string |

The inbox `payload` contains the same notification data as Pusher, with the delivery UUID exposed separately. Event names match exactly, for example `BalancesTransfer`; they differ from the spaced `name` values on extrinsic event logs described below.

Store processed UUIDs durably so deduplication survives restarts. Coordinate the UUID record with the business action, for example in one database transaction, and use the UUID as an idempotency key for external actions where supported. When WebSocket and polling handlers run concurrently, enforce uniqueness atomically so they cannot both process the same delivery. Keep deduplication records for at least the inbox retention window.

The delivery UUID identifies a notification, not a transaction. In the separate `TransactionCreated` and `TransactionStateChanged` lifecycle payloads, `uuid` remains the **transaction UUID** used with `GetTransaction`; do not acknowledge those UUIDs through Event Inbox.

### Recovering after a WebSocket disconnect

After the Pusher subscription succeeds on initial connection or reconnection, drain Event Inbox for each relevant network and chain while continuing to receive live notifications. Route both through the same deduplication and processing logic. This handles overlap between live delivery and recovery without applying the same action twice.

Acknowledge successfully processed on-chain notifications received over WebSocket too, using the delivery UUID in their payload. This keeps the inbox focused on work still outstanding. A periodic inbox poll can also recover missed notifications while the application remains connected.

For lifecycle notifications outside Event Inbox, query the relevant resource after reconnecting — for example, use `GetTransaction` to refresh outstanding transactions.

## How on-chain event logs are exposed {#how-events-are-exposed}

Once a transaction has been included in a block, the platform exposes the extrinsic that carried it — and every event that extrinsic emitted — through the `extrinsic` field on the `Transaction` type:

```graphql
{
  extrinsic {         # null until the transaction is included in a block
    id                # "blockNumber-extrinsicIndex", e.g. "11955161-2"
    hash              # the extrinsic hash
    success           # whether the extrinsic succeeded on-chain
    events {
      id              # the event ID
      name            # human-readable name, e.g. "MultiTokens Collection Created"
      collectionId    # the related collection ID, when the event concerns one
      tokenId         # the related token ID (canonical "collectionId-tokenId" form)
      data            # trimmed JSON payload with the event's key values
    }
  }
}
```

A few things to know about the fields:

- **`name`** is the pallet and event name with spaces — `MultiTokens Collection Created`, `MultiTokens Minted`, `Marketplace Listing Created`, `Balances Transfer`, and so on. Note that on-chain event names are conventionally written in dotted form (`MultiTokens.CollectionCreated`), including elsewhere in these docs — the platform's `name` field is the same event with the words spaced out, so match against the spaced form when filtering.
- **`collectionId` / `tokenId`** are filled in when the event relates to a specific collection or token, so you can match events to your assets without parsing `data`.
- **`data`** carries the event's key values as JSON — the IDs your application usually needs. For example, `MultiTokens Collection Created` carries `{"collectionId": "124587"}`, `MultiTokens Minted` carries `{"amount": "1"}`, and `Marketplace Listing Created` carries the full listing (`id`, `price`, `amount`, `type`). Events whose meaning is fully captured by the other fields have an empty `data` payload.
- The platform surfaces the events relevant to the action itself; low-level bookkeeping events (fee payments and similar) are not included.

## Reading a transaction's events

The flow after submitting any [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction) mutation is:

1. **Wait** for the transaction to reach `FINALIZED` — either poll [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction), or subscribe to the [`TransactionStateChanged`](/03-api-reference/03-websocket-events.md#transactionstatechanged) WebSocket event to be notified the moment the state changes. While the transaction is still `PENDING` or awaiting inclusion in a block, `extrinsic` is `null`.
2. **Check** `extrinsic.success` to confirm the on-chain outcome (a failed extrinsic emits no events).
3. **Read** `extrinsic.events` and pick out the ones you care about by `name`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransactionEvents($uuid: String!) {
  GetTransaction(
    network: CANARY
    chain: MATRIX
    uuid: $uuid
  ) {
    state
    extrinsic {
      hash
      success
      events {
        id
        name
        collectionId
        tokenId
        data
      }
    }
  }
}
```

**Variables:**

```json
{
  "uuid": "06303d39-6ba9-4c81-8500-55bcca9e9512"
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```bash
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"query GetTransactionEvents($uuid: String!) { GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) { state extrinsic { hash success events { id name collectionId tokenId data } } } }","variables":{"uuid":"06303d39-6ba9-4c81-8500-55bcca9e9512"}}'
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <YOUR_API_TOKEN>'
  },
  body: JSON.stringify({
    query: `
      query GetTransactionEvents($uuid: String!) {
        GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
          state
          extrinsic {
            hash
            success
            events {
              id
              name
              collectionId
              tokenId
              data
            }
          }
        }
      }
    `,
    variables: { uuid: '06303d39-6ba9-4c81-8500-55bcca9e9512' }
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
const axios = require('axios');

axios.post('https://platform.enjin.io/graphql', {
  query: `
    query GetTransactionEvents($uuid: String!) {
      GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
        state
        extrinsic {
          hash
          success
          events {
            id
            name
            collectionId
            tokenId
            data
          }
        }
      }
    }
  `,
  variables: { uuid: '06303d39-6ba9-4c81-8500-55bcca9e9512' }
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <YOUR_API_TOKEN>'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
query GetTransactionEvents($uuid: String!) {
  GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
    state
    extrinsic {
      hash
      success
      events {
        id
        name
        collectionId
        tokenId
        data
      }
    }
  }
}
'''

variables = {'uuid': '06303d39-6ba9-4c81-8500-55bcca9e9512'}

response = requests.post(
    'https://platform.enjin.io/graphql',
    json={'query': query, 'variables': variables},
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <YOUR_API_TOKEN>'
    }
)
print(response.json())
```
  </TabItem>
</Tabs>

## Example: picking up a new collection ID

Some values only exist once the chain executes the transaction — the `collectionId` assigned by `createCollection` is the classic case. Events are how you read them.

Submitting the collection creation returns a transaction in `PENDING` state, with no extrinsic yet:

```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "06303d39-6ba9-4c81-8500-55bcca9e9512",
      "action": "MultiTokens.create_collection",
      "state": "PENDING",
      "extrinsic": null
    }
  }
}
```

Polling `GetTransactionEvents` (the query above) with that `uuid` eventually returns `FINALIZED`, and the new collection's ID appears in the `MultiTokens Collection Created` event — both on the event itself and in its `data` payload:

```json
{
  "data": {
    "GetTransaction": {
      "state": "FINALIZED",
      "extrinsic": {
        "hash": "0xb3a2a733cf24df07fbbbffdf4447959ce66fd78ed46bc78e10c4991004b43b3b",
        "success": true,
        "events": [
          {
            "id": "1234567-2",
            "name": "MultiTokens Attribute Set",
            "collectionId": "124587",
            "tokenId": null,
            "data": []
          },
          {
            "id": "1234567-3",
            "name": "MultiTokens Collection Created",
            "collectionId": "124587",
            "tokenId": null,
            "data": {
              "collectionId": "124587"
            }
          }
        ]
      }
    }
  }
}
```

The same pattern applies to every chain-assigned value: the token ID in `MultiTokens Token Created` after a mint into a new token, the listing in `Marketplace Listing Created` after [`createListing`](/03-api-reference/02-mutations/06-marketplace-mutations.md#createlisting), the group ID after [`createTokenGroup`](/03-api-reference/02-mutations/07-token-groups-mutations.md#createtokengroup), and so on.

:::tip Reacting to transfers
Transfer-style events (`MultiTokens Transferred`, `MultiTokens Minted`, `Balances Transfer`) carry the related `collectionId` / `tokenId`, which is usually all you need to react in-game — e.g. unlocking the item that corresponds to the token the player just received.
:::

## Other ways to look events up

Events hang off the extrinsic, so any query that returns an `Extrinsic` returns them too:

- [`GetExtrinsic(hash:)`](/03-api-reference/01-queries/01-transactions-queries.md#getextrinsic) — when you have an extrinsic hash rather than a platform transaction `uuid`.
- [`GetBlock` / `GetBlocks`](/03-api-reference/01-queries/01-transactions-queries.md#getblock) — read every extrinsic (and its events) in a given block.

You can also follow your transactions in the [Platform UI](https://platform.enjin.io/transactions): the Transactions page shows each transaction's state and extrinsic hash as it moves on-chain.

:::tip Notifications and recovery
Use [WebSocket Events](/03-api-reference/03-websocket-events.md) for real-time notifications and [Event Inbox](#event-inbox) to poll for eligible on-chain notifications or recover missed deliveries. Query the transaction or extrinsic when you need its detailed on-chain event logs.
:::
