---
title: "Using the Enjin Platform"
slug: "using-the-enjin-platform"
description: "Discover how the Enjin Platform simplifies blockchain asset management for developers, enabling seamless integration of tokenized assets in games and applications."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info What you'll need:
Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) to pay for <GlossaryTerm id="transaction_fees" /> and for <GlossaryTerm id="storage_deposit" />s.
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
:::

## 1. Set Up an <GlossaryTerm id="enjin_platform" /> Account

To get started, go ahead and create an account on the [Enjin Platform Cloud](https://platform.beta.enjin.io/) and **verify your email address.**

The Enjin Platform is chain-agnostic — a single dashboard covers both networks. Use the **network selector in the top-right corner** of the platform UI to switch between **Canary** (testnet) and **Enjin** (mainnet). We recommend starting on Canary while you build and test.

### Things you should know

- <GlossaryTerm id="enjin_blockchain" /> is <GlossaryTerm id="immutable" />, which is why we recommend building your initial proof-of-concept on Enjin <GlossaryTerm id="canary" /> <GlossaryTerm id="testnet" /> – the fast and free environment for testing Enjin's tools.
- Every "<GlossaryTerm id="mutation" />" request (i.e, minting a <GlossaryTerm id="token" />) must be signed by a <GlossaryTerm id="wallet_account" />. On the Enjin Platform, signing is handled automatically by the [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) (or, optionally, by a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) that you select per-transaction).

## 2. Set Up an API Token

Once your account is created, create a new API token by clicking the "**Create API Token**" button on the [Account Settings](https://platform.beta.enjin.io/settings) page.  
Copy and save that token somewhere safe — you'll need it to configure your <GlossaryTerm id="wallet_daemon" /> and to authenticate API requests.

:::tip Note
You can always revoke the token and create another one in the future.
:::

## 3. Set Up the Wallet Daemon

Every on-chain operation initiated through the Enjin Platform must be signed before it can be broadcast to the blockchain. The Enjin Wallet Daemon does this for you automatically.

To download and configure the Wallet Daemon, head over to the [Wallet Daemon Setup](/01-getting-started/06-using-wallet-daemon.md) page. The daemon needs to be configured with the API token you created in step 2 — that's how it knows which platform account to sign for.

Once the daemon is running and connected, your Platform account is ready to use.

:::info Signing with a Managed Wallet
On most transaction creation forms in the Platform UI, you can override the default signer using the **Transaction Options → Signing Account** field. Setting it to a Managed Wallet's address signs the transaction with that wallet's stored key instead of with the Wallet Daemon's wallet. See [Using Managed Wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) for details.
:::

## 4. Create Platform Requests

Now that the Platform account is set up, we can start creating platform requests.
In this example we will be creating a <GlossaryTerm id="collection" />.

**There are two ways to create Platform requests:**

- [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
- [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

:::info Which approach should I use?
Everything that can be done via the Platform's User Interface, can be done programmatically via the <GlossaryTerm id="graphql" /> API or any of the Platform <GlossaryTerm id="sdk" />s.
If you are just starting out, we recommend using the Platform User Interface as it's more user friendly.
However, if you need to make a Platform request programmatically, you can do that via the <GlossaryTerm id="enjin_platform_api" /> / <GlossaryTerm id="sdk" />s.
:::

### Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**" and click the "**Create Collection**" button.

![Create collection form on Enjin Platform](/img/getting-started/v3-create-collection-form.png)

From here, you can customize your collection's Mint Policy, Royalties, Explicit Royalty Currencies (optional), and Attributes.

#### Selecting the signing account

Toward the bottom of the form, the **Transaction Options** section lets you choose which wallet should sign this transaction. By default this is set to the Wallet Daemon's address, but you can paste a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address here to sign with that wallet instead.

![Transaction Options Signing Account field](/img/getting-started/v3-transaction-options-signing-account.png)

Once you're satisfied with the options, click the "**Create**" button at the bottom right to submit the request. You'll see a confirmation modal with the new transaction's UUID:

![Transaction Submitted modal showing the new transaction UUID](/img/getting-started/v3-transaction-submitted-modal.png)

Click **View Transaction** to jump straight to the Transactions page and watch it move from `PENDING` → `BROADCAST` → `FINALIZED` as the daemon signs and the chain finalizes it.

### Option B. Using the Enjin API & SDKs

To create a Platform request programmatically, use the <GlossaryTerm id="graphql" /> API, or one of the <GlossaryTerm id="sdk" />s.
This mutation will set up a new transaction that, once finalized on-chain, will produce a new collection. The collection's ID can be read from the transaction's events afterward.

:::info First time using the API?
For a step-by-step walkthrough of the endpoint, authentication, and the `network` / `chain` arguments used below, see [Using the Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md). If you're new to GraphQL itself, the [How to Use GraphQL](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md) guide is a good starting point.
:::

:::tip Test your requests in the GraphiQL Playground
[Open the Enjin Platform GraphiQL Playground](https://platform.beta.enjin.io/graphiql)
:::

:::tip Authentication
If you are not using the playground, you need to add your API token to the headers, prefixed with `Bearer`:
```
Authorization: Bearer <YOUR_API_TOKEN>
```
:::

Every on-chain action runs through a single `CreateTransaction` mutation. The specific action is selected by which field is set on the `transaction` argument — here, `createCollection`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollection {
  CreateTransaction(
    network: CANARY  # or ENJIN for mainnet
    chain: MATRIX
    transaction: {
      createCollection: {
        forceCollapsingSupply: false # Set to true to enforce collapsing supply mint policy
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```bash
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"mutation { CreateTransaction(network: CANARY, chain: MATRIX, transaction: { createCollection: { forceCollapsingSupply: false } }) { uuid action state } }"}'
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
      mutation CreateCollection($forceCollapsingSupply: Boolean) {
        CreateTransaction(
          network: CANARY
          chain: MATRIX
          transaction: {
            createCollection: { forceCollapsingSupply: $forceCollapsingSupply }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      forceCollapsingSupply: false
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

axios.post('https://platform.beta.enjin.io/graphql', {
  query: `
    mutation CreateCollection($forceCollapsingSupply: Boolean) {
      CreateTransaction(
        network: CANARY
        chain: MATRIX
        transaction: {
          createCollection: { forceCollapsingSupply: $forceCollapsingSupply }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    forceCollapsingSupply: false
  }
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
mutation CreateCollection($forceCollapsingSupply: Boolean) {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    transaction: {
      createCollection: { forceCollapsingSupply: $forceCollapsingSupply }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'forceCollapsingSupply': False}

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

The response includes a `uuid` you can use to query the transaction's status as it moves through the daemon-signing → broadcast → finalization lifecycle.

:::info Signing happens automatically
Once a request is created — whether through the dashboard or the API — the Wallet Daemon (or the [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) you specified in the `Signing Account` field) picks it up, signs it, and broadcasts it to the chain. There is no manual approval step. The transaction will move from `PENDING` → `BROADCAST` → `FINALIZED` as it's processed.
:::

## 5. Receive Transaction Information

There are 3 ways to receive the transaction status and information:

- [Receive Transaction Information Using the Platform User Interface](#receive-transaction-information-using-the-platform-user-interface)
- [Receive Transaction Information Using the Enjin API / SDKs](#receive-transaction-information-using-the-enjin-api--sdks)
- [Receive Transaction Information by Listening to Platform Websocket Events](#receive-transaction-information-by-listening-to-platform-websocket-events)

### Receive Transaction Information Using the Platform User Interface

To check the transaction status, head over to the [Transactions](https://platform.beta.enjin.io/transactions) page. Each row shows the transaction's `UUID`, `Action` (e.g. `MultiTokens.create_collection`), `State`, and `Extrinsic Hash` once it has been broadcast.

![Transactions page showing a finalized create_collection transaction](/img/getting-started/v3-transactions-page.png)

Once the state reaches `FINALIZED`, click the row's **Extrinsic Hash** link to open the transaction on Subscan (the blockchain explorer). The **Events** tab there lists everything the transaction emitted on-chain — for a collection-creation transaction, that's where you'll find the newly minted **collection ID**.

### Receive Transaction Information Using the Enjin API & SDKs

To receive transaction information programmatically, use the `GetTransaction` query. Pass the `uuid` returned by `CreateTransaction` and request whichever fields you need — `state`, `extrinsicHash`, `action`, and so on.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransactionStatus($uuid: String!) {
  GetTransaction(
    network: CANARY
    chain: MATRIX
    uuid: $uuid
  ) {
    uuid
    action
    state
    extrinsicHash
    createdAt
    updatedAt
  }
}
```

**Variables:**

```json
{
  "uuid": "12f22f91-82df-4b60-a90c-bf72b508a17c"
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```bash
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"query { GetTransaction(network: CANARY, chain: MATRIX, uuid: \"12f22f91-82df-4b60-a90c-bf72b508a17c\") { uuid action state extrinsicHash } }"}'
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
      query GetTransactionStatus($uuid: String!) {
        GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
          uuid
          action
          state
          extrinsicHash
        }
      }
    `,
    variables: { uuid: '12f22f91-82df-4b60-a90c-bf72b508a17c' }
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
    query GetTransactionStatus($uuid: String!) {
      GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
        uuid
        action
        state
        extrinsicHash
      }
    }
  `,
  variables: { uuid: '12f22f91-82df-4b60-a90c-bf72b508a17c' }
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
query GetTransactionStatus($uuid: String!) {
  GetTransaction(network: CANARY, chain: MATRIX, uuid: $uuid) {
    uuid
    action
    state
    extrinsicHash
  }
}
'''

variables = {'uuid': '12f22f91-82df-4b60-a90c-bf72b508a17c'}

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

**Response:**

```json
{
  "data": {
    "GetTransaction": {
      "uuid": "12f22f91-82df-4b60-a90c-bf72b508a17c",
      "action": "MultiTokens.create_collection",
      "state": "FINALIZED",
      "extrinsicHash": "0xd43b83...014b1365",
      "createdAt": "2026-05-07T16:36:33Z",
      "updatedAt": "2026-05-07T16:36:51Z"
    }
  }
}
```

A `state` of `FINALIZED` means the transaction has been included in a finalized block. To list multiple transactions instead of fetching one by UUID, use the cursor-paginated `GetTransactions` query — see [Pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination) for the response shape.

:::info Note
For the full list of platform states, check the [Enjin API → Important Arguments](/03-api-reference/04-important-arguments.md#state) page.
:::

### Receive Transaction Information by Listening to Platform Websocket Events

You can also subscribe to events via WebSocket — useful when you want to react to transaction state changes without polling. For more information, check out the [Websocket Events](/05-enjin-platform/03-working-with-events.md) guide.

:::tip What's Next?
Learn how to [Use the API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md).
:::
