---
title: "Working with Events"
slug: "working-with-events"
description: "How to read the on-chain events emitted by transactions through the Enjin Platform API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In the blockchain ecosystem, "events" are the on-chain log entries emitted by extrinsics — they're how the chain reports what actually happened: token transfers, collection creation, marketplace listing IDs, balance changes, and so on. Monitoring them is essential for any application that needs to react to state changes — for example, unlocking an in-game item the moment the user receives the corresponding NFT.

## How events are exposed

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

1. **Poll** [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) until `state` is `FINALIZED`. While the transaction is still `PENDING` or awaiting inclusion in a block, `extrinsic` is `null`.
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
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"query GetTransactionEvents($uuid: String!) { GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) { state extrinsic { hash success events { id name collectionId tokenId data } } } }","variables":{"uuid":"06303d39-6ba9-4c81-8500-55bcca9e9512"}}'
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
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

axios.post('https://platform.beta.enjin.io/graphql', {
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
    'https://platform.beta.enjin.io/graphql',
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
            "id": "0011955161-4471c-000003",
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

You can also follow your transactions in the [Platform UI](https://platform.beta.enjin.io/transactions): the Transactions page shows each transaction's state and extrinsic hash as it moves on-chain.

:::info Real-time event streaming
Push-based event delivery (WebSockets), which removes the need to poll, is planned but not yet available — see [WebSocket Events](/03-api-reference/03-websocket-events.md).
:::
