---
title: "Creating a Currency Token"
slug: "../creating-a-currency-token"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Similarly to [Tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md), "Currency Tokens" are also digital assets that can be traded, sold, or used on the Enjin Blockchain. However, unlike standard tokens, currency tokens support fractional values, allowing them to be divided into smaller units, just like traditional currencies.

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to process transactions and at least 0.01 ENJ for the <GlossaryTerm id="token_account_deposit" />.
You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) to place the tokens in.
:::

Enjin Blockchain allows you to create customized <GlossaryTerm id="token_id" /> structures. This flexibility enables you to organize your tokens in various ways that suit your needs.

A token becomes a currency by setting its `behavior` field to `{ type: IS_CURRENCY, name, symbol, decimalCount }`:

- **Name:** The token name (e.g. Gold Coins).
- **Symbol:** A short symbol that represents the token (e.g. GOLD).
- **Decimals:** Max amount of decimals supported for this token (e.g. 2 would mean the token can support up to 2 decimals, like 5.75 Gold Coins).

:::warning Important Note on Decimals Support
The `decimalCount` property specifies how token balances should be displayed in applications, but it does not allow for actual fractional values on the Enjin Blockchain.
This means that for a token with "Decimals: 2", the balance should be divided by 100 (10^2) when displayed in applications.
For example, for the Gold Coins token example mentioned above, a balance of 1,575 Gold Coins should be shown as 15.75 (1,575/100) in apps.
Similarly, when minting tokens, to mint 4.80 Gold Coins, the minted supply parameter should be set to 480 (4.8 \* 10^2).
:::

:::tip Token ID Structure [Best Practices](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md)
Before minting the Mainnet versions of your Tokens, that will be used in your live economy. Make sure to take a look at the [best practices for Token ID structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md).
:::

**There are two ways to use the <GlossaryTerm id="create_asset" /> functionalities:**

- [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
- [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**" and click the collection you want to mint the token into. From the collection page, click the "**Create Token**" button.

Fill in the standard token fields — Collection ID, Token ID, Initial Supply, and Recipient. See [Creating Tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md#option-a-using-the-enjin-dashboard) for the full breakdown of those fields.

To mark the token as a currency, expand the **Advanced Settings** section. Under **Other Options**, tick the **Is Currency** checkbox. Two additional fields appear:

- **Symbol -** A short symbol that represents the token (e.g. `GOLD`).
- **Decimal Count -** The number of decimal places this token should support when displayed in applications (e.g. `2` for a token like Gold Coins where balances should render with two decimals).

:::info Learn more about the arguments
For a comprehensive view and detail of all available arguments please refer to our [API Reference](/03-api-reference/03-api-reference.md).
:::

Once you're satisfied with the options, click the "**Create**" button to submit the request. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

Once your token is created, lets give it a new look by [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md).

## Option B. Using the Enjin API & SDKs

To create a currency token, use the standard `createToken` action with the `behavior` field set to `{ type: IS_CURRENCY, name, symbol, decimalCount }`. The rest of the input (recipient, collectionId, tokenId, initialSupply, etc.) follows the same shape as a regular [token create](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md#option-b-using-the-enjin-api--sdks).

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCurrencyToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"  # recipient of the initial supply
        collectionId: 2406         # collection to mint into
        tokenId: 1                 # the new token ID
        initialSupply: 1           # initial supply to mint
        listingForbidden: false
        infusion: 0
        anyoneCanInfuse: false
        behavior: {                # makes this token a currency
          type: IS_CURRENCY
          name: "Gold Coins"
          symbol: "GOLD"
          decimalCount: 2
        }
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
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation CreateCurrencyToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $initialSupply: BigInt!, $behavior: TokenBehaviorInput!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      createToken: {\r\n        recipient: $recipient\r\n        collectionId: $collectionId\r\n        tokenId: $tokenId\r\n        initialSupply: $initialSupply\r\n        listingForbidden: false\r\n        infusion: 0\r\n        anyoneCanInfuse: false\r\n        behavior: $behavior\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","collectionId":2406,"tokenId":1,"initialSupply":1,"behavior":{"type":"IS_CURRENCY","name":"Gold Coins","symbol":"GOLD","decimalCount":2}}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the CreateTransaction mutation, selecting createToken as the action
var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Enjin, // or Network.Canary for testnet
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            CreateToken = new CreateTokenInput
            {
                Recipient = "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", // recipient of the initial supply
                CollectionId = 2406,      // collection to mint into
                TokenId = 1,              // the new token ID
                InitialSupply = 1,        // initial supply to mint
                ListingForbidden = false,
                Infusion = 0,
                AnyoneCanInfuse = false,
                Behavior = new TokenBehaviorInput // makes this token a currency
                {
                    Type = TokenBehaviorType.IsCurrency,
                    Name = "Gold Coins",
                    Symbol = "GOLD",
                    DecimalCount = 2,
                },
            },
        });

// Send the mutation; poll GetTransaction by uuid to track its on-chain state
var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in Progress!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation CreateCurrencyToken(
        $recipient: String!
        $collectionId: BigInt!
        $tokenId: BigInt!
        $initialSupply: BigInt!
        $behavior: TokenBehaviorInput!
      ) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            createToken: {
              recipient: $recipient
              collectionId: $collectionId
              tokenId: $tokenId
              initialSupply: $initialSupply
              listingForbidden: false
              infusion: 0
              anyoneCanInfuse: false
              behavior: $behavior
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
      collectionId: 2406,
      tokenId: 1,
      initialSupply: 1,
      behavior: { type: "IS_CURRENCY", name: "Gold Coins", symbol: "GOLD", decimalCount: 2 }
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
    mutation CreateCurrencyToken(
      $recipient: String!
      $collectionId: BigInt!
      $tokenId: BigInt!
      $initialSupply: BigInt!
      $behavior: TokenBehaviorInput!
    ) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          createToken: {
            recipient: $recipient
            collectionId: $collectionId
            tokenId: $tokenId
            initialSupply: $initialSupply
            listingForbidden: false
            infusion: 0
            anyoneCanInfuse: false
            behavior: $behavior
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collectionId: 2406,
    tokenId: 1,
    initialSupply: 1,
    behavior: { type: "IS_CURRENCY", name: "Gold Coins", symbol: "GOLD", decimalCount: 2 }
  }
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN' }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation CreateCurrencyToken(
  $recipient: String!
  $collectionId: BigInt!
  $tokenId: BigInt!
  $initialSupply: BigInt!
  $behavior: TokenBehaviorInput!
) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: $recipient
        collectionId: $collectionId
        tokenId: $tokenId
        initialSupply: $initialSupply
        listingForbidden: false
        infusion: 0
        anyoneCanInfuse: false
        behavior: $behavior
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {
  'recipient': 'cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f',
  'collectionId': 2406,
  'tokenId': 1,
  'initialSupply': 1,
  'behavior': {'type': 'IS_CURRENCY', 'name': 'Gold Coins', 'symbol': 'GOLD', 'decimalCount': 2},
}

response = requests.post('https://platform.beta.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

The response includes the transaction's `uuid`, `action` (e.g. `MultiTokens.create_token`), and `state` (`PENDING` → `BROADCAST` → `FINALIZED`). Use `GetTransaction(network, chain, uuid: "<returned-uuid>")` to poll the current state.

Once it reaches `FINALIZED`, an event is emitted confirming the new currency token was created. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.

:::tip
For Token ID management, head to [Best Practices > TokenID Structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md)
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

`createToken` also accepts `cap`, `attributes`, and `groups` (token-group membership). To sign with a managed wallet instead of the Wallet Daemon, set `signerAddress` on `CreateTransaction`.
:::

:::tip What's next?
To add metadata to your token, go to the [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md) tutorial.
:::
