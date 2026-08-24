---
title: "Batching Transactions"
slug: "batching-transactions"
description: "Submit several on-chain actions as a single transaction with CreateBatchTransaction, and choose how the batch behaves when one of its calls fails using batchMode."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`CreateBatchTransaction` submits several on-chain actions as **one** transaction. Instead of sending each action separately — paying a separate fee and tracking a separate <GlossaryTerm id="transaction" /> for each — you pass a list of actions and the platform bundles them into a single batched extrinsic.

:::info One batch, one signer
A batch is a single extrinsic, so **every action in it is signed by one account**. You can't, for example, burn one player's tokens and mint from the game's collection in the same batch — those need two different signers. Set the signer for the whole batch with `signerExternalId` / `signerAddress` (see [Signing as a managed wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md#signing-transactions)), or leave it to the [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md).
:::

## Example: crafting an item

Crafting is a good example of why batching matters. To craft a sword, a player's recipe consumes several ingredients at once — say **3 Wood, 2 Iron, and 1 Blueprint**. You <GlossaryTerm id="burn" /> all three from the player's wallet in one batch.

The important part is what happens on failure. If you sent three separate burns and the player turned out to be one Iron short, the Wood and Blueprint would already be gone — the player loses ingredients and gets nothing. Batching makes the whole thing **all-or-nothing**: if any single burn can't go through, the entire batch reverts and none of the ingredients are consumed.

That behaviour is the default. `batchMode` defaults to `ALL_OR_NOTHING`, so the example below doesn't set it — the three burns either all succeed or all revert together.

Because the ingredients live in the player's wallet, the batch is signed by that player's [managed wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) via `signerExternalId`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CraftItem($signerExternalId: String!, $transactions: [TransactionInput!]!) {
  CreateBatchTransaction(
    network: CANARY  # or ENJIN for mainnet
    chain: MATRIX
    signerExternalId: $signerExternalId  # the player's managed wallet signs the whole batch
    transactions: $transactions
    # batchMode omitted → defaults to ALL_OR_NOTHING: the batch reverts entirely if any burn fails
  ) {
    uuid
    action
    state
  }
}
```
**Variables:**
```json
{
  "signerExternalId": "docs-example-player",
  "transactions": [
    { "burnToken": { "collectionId": 36105, "tokenId": 1, "amount": 3 } },
    { "burnToken": { "collectionId": 36105, "tokenId": 2, "amount": 2 } },
    { "burnToken": { "collectionId": 36105, "tokenId": 3, "amount": 1 } }
  ]
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation CraftItem($signerExternalId: String!, $transactions: [TransactionInput!]!) {\r\n  CreateBatchTransaction(\r\n    network: CANARY\r\n    chain: MATRIX\r\n    signerExternalId: $signerExternalId\r\n    transactions: $transactions\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"signerExternalId":"docs-example-player","transactions":[{"burnToken":{"collectionId":36105,"tokenId":1,"amount":3}},{"burnToken":{"collectionId":36105,"tokenId":2,"amount":2}},{"burnToken":{"collectionId":36105,"tokenId":3,"amount":1}}]}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using System.Collections.Generic;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// One TransactionInput per ingredient, each burning from the player's wallet
var transactions = new List<TransactionInput>
{
    new TransactionInput { BurnToken = new BurnTokenInput { CollectionId = 36105, TokenId = 1, Amount = 3 } }, // Wood
    new TransactionInput { BurnToken = new BurnTokenInput { CollectionId = 36105, TokenId = 2, Amount = 2 } }, // Iron
    new TransactionInput { BurnToken = new BurnTokenInput { CollectionId = 36105, TokenId = 3, Amount = 1 } }, // Blueprint
};

// signerExternalId makes the platform sign the batch with the player's managed wallet.
// The SDK submits batches as ALL_OR_NOTHING, so a shortfall on any ingredient reverts them all.
var mutation = new MutationQueryBuilder()
    .WithCreateBatchTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Canary, // or Network.Enjin for mainnet
        chain: Chain.Matrix,
        transactions: transactions,
        signerExternalId: "docs-example-player");

var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateBatchTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation CraftItem($signerExternalId: String!, $transactions: [TransactionInput!]!) {
        CreateBatchTransaction(
          network: CANARY
          chain: MATRIX
          signerExternalId: $signerExternalId
          transactions: $transactions
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      signerExternalId: "docs-example-player",
      transactions: [
        { burnToken: { collectionId: 36105, tokenId: 1, amount: 3 } },
        { burnToken: { collectionId: 36105, tokenId: 2, amount: 2 } },
        { burnToken: { collectionId: 36105, tokenId: 3, amount: 1 } }
      ]
    }
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
    mutation CraftItem($signerExternalId: String!, $transactions: [TransactionInput!]!) {
      CreateBatchTransaction(
        network: CANARY
        chain: MATRIX
        signerExternalId: $signerExternalId
        transactions: $transactions
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    signerExternalId: "docs-example-player",
    transactions: [
      { burnToken: { collectionId: 36105, tokenId: 1, amount: 3 } },
      { burnToken: { collectionId: 36105, tokenId: 2, amount: 2 } },
      { burnToken: { collectionId: 36105, tokenId: 3, amount: 1 } }
    ]
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation CraftItem($signerExternalId: String!, $transactions: [TransactionInput!]!) {
  CreateBatchTransaction(
    network: CANARY
    chain: MATRIX
    signerExternalId: $signerExternalId
    transactions: $transactions
  ) {
    uuid
    action
    state
  }
}
'''

variables = {
  'signerExternalId': 'docs-example-player',
  'transactions': [
    {'burnToken': {'collectionId': 36105, 'tokenId': 1, 'amount': 3}},
    {'burnToken': {'collectionId': 36105, 'tokenId': 2, 'amount': 2}},
    {'burnToken': {'collectionId': 36105, 'tokenId': 3, 'amount': 1}},
  ],
}

response = requests.post('https://platform.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::tip Minting the crafted item is a separate transaction
Handing the player their new sword means **minting** it, and minting can only be signed by the collection owner (your game) — a different signer than the player's managed wallet that burned the ingredients. So the mint can't live in the same batch as the burns; run it as its own game-signed [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction) once the burn batch reaches `FINALIZED`. Pass an [`idempotencyKey`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction) on the mint so a retry never mints the reward twice.
:::

## Batch modes

`batchMode` controls what happens when one of the calls in a batch fails. It takes one of three values and defaults to `ALL_OR_NOTHING`.

| Mode | On-chain call | Behaviour on failure | Use it for |
| :--- | :--- | :--- | :--- |
| **`ALL_OR_NOTHING`** (default) | `Utility.batch_all` | Any failure reverts the **entire** batch — it's atomic. | Crafting, atomic swaps — anything where a partial result is unacceptable. |
| **`HALT_ON_ERROR`** | `Utility.batch` | Runs the calls in order and **stops** at the first failure. Calls that already executed are **kept, not reverted**. | Ordered steps where later calls depend on earlier ones and there's no harm in the completed prefix. |
| **`CONTINUE_ON_ERROR`** | `Utility.force_batch` | Runs **every** call and simply skips the ones that fail. | Bulk, independent actions where one bad entry shouldn't block the rest. |

:::warning `HALT_ON_ERROR` and `CONTINUE_ON_ERROR` are not atomic
Only `ALL_OR_NOTHING` reverts completed work. With the other two modes, some calls can succeed while others fail, leaving the batch **partially applied**. Inspect the transaction's events once it's `FINALIZED` to see exactly which calls went through. See [Working with Events](/05-enjin-platform/03-working-with-events.md).
:::

### Example: sweeping multiple listings with `CONTINUE_ON_ERROR`

A player wants to buy several marketplace listings at once. Listings are a shared resource — between the moment the player loads their cart and the moment the batch lands, another buyer might fill one or the seller might cancel it. With `CONTINUE_ON_ERROR` the batch fills every listing that's still available and skips the ones that are gone, instead of failing the whole purchase over a single unavailable item.

```graphql
mutation SweepListings($signerExternalId: String!, $transactions: [TransactionInput!]!) {
  CreateBatchTransaction(
    network: CANARY  # or ENJIN for mainnet
    chain: MATRIX
    signerExternalId: $signerExternalId  # the buyer's managed wallet signs
    batchMode: CONTINUE_ON_ERROR  # fill whatever's still available; skip listings already sold or cancelled
    transactions: $transactions
  ) {
    uuid
    action
    state
  }
}
```
**Variables:**
```json
{
  "signerExternalId": "docs-example-player",
  "transactions": [
    { "fillListing": { "id": "0xListingIdA", "amount": 1 } },
    { "fillListing": { "id": "0xListingIdB", "amount": 1 } },
    { "fillListing": { "id": "0xListingIdC", "amount": 1 } }
  ]
}
```

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md), or the [`CreateBatchTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createbatchtransaction) reference. This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::
