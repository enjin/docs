---
title: "Melting / Destroying Tokens and Collections"
slug: "burning-destroying-tokens"
description: "Understand the process of burning or destroying tokens in the Enjin ecosystem, allowing you to permanently remove assets from circulation."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

"Melting" (often called "Burning") refers to the process of decreasing a token's supply and removing it from circulation, or in some cases, even removing the token from the blockchain entirely.
Melting a token with <GlossaryTerm id="enj_infusion" /> releases the Infused ENJ to the holder.

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.
You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) or a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to melt/destroy.
:::

**There are two ways to Melt a token:**

1. [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

### Melting token's supply

[Locate the token in the dashboard](/01-getting-started/04-using-the-enjin-platform.md#finding-tokens), click the **3 vertical dots** (**⋮**), then click "**Burn Token**".

![The Burn Token form](/img/getting-started/v3-burn-token-form.png)

Insert the amount of tokens to melt, and click on the "**Burn Token**" button.

The Transaction Request will then appear in the "**Transactions**" menu. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

### Destroying a token and removing it from the Blockchain

:::info  To destroy a token, these requirements must be met:
- The caller is the collection owner
- The token has no attributes
  - If the token has attributes, you can remove the attributes by clicking the **3 vertical dots** (**⋮**) next to the token, followed by "**Remove Attribute**", selecting the attribute to remove and submitting the transaction. This needs to be done for all attributes.
- The token has 0 supply
  - If the token has supply, you can follow the above guide [Burning token's supply](#melting-tokens-supply) to remove all token supply (as long as you own all of the token's supply)
  Note - you can remove the supply and destroy the token in the same melt transaction.
:::

Melting a token and destroying it are two different actions.
The action demonstrated above is the action of melting a token, which decreases it's circulating supply.
While destroying a token removes the token from the blockchain, and retrieves the <GlossaryTerm id="storage_deposit" /> to the collection owner.

To destroy a token, follow the above instructions for Melting a token, but make sure to tick the `Remove Token Storage` checkbox.

### Destroying a collection

:::info To destroy a collection, these requirements must be met:
- The caller is the collection owner
- The collection has no attributes
  - If the collection has attributes, you can remove the attributes by clicking the **3 vertical dots** (**⋮**) next to the collection, followed by "**Remove Attribute**", selecting the attribute to remove and submitting the transaction. This needs to be done for all attributes.
- The collection has 0 tokens **in storage**
  - If the collection has some tokens, you can follow the above guide [Destroying a token and removing it from the Blockchain](#destroying-a-token-and-removing-it-from-the-blockchain) for each of the tokens in the collection, to destroy them all.
:::

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**", **locate the collection** you wish to destroy, click the **3 vertical dots** (**⋮**) on its row, then click "**Destroy Collection**".

Confirm by clicking the "**Destroy Collection**" button.

A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

## Option B. Using the Enjin API & SDKs

Burning is the `burnToken` discriminator action on `CreateTransaction`. The same action handles both "melt some supply" and "destroy the token entirely" — set `removeTokenStorage: true` to destroy.

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

### Melting token's supply

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BurnToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      burnToken: {
        collectionId: 68844
        tokenId: 0
        amount: 1
        removeTokenStorage: false  # set true to also destroy the token (see below)
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
-d '{"query":"mutation BurnToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { burnToken: { collectionId: $collectionId, tokenId: $tokenId, amount: $amount, removeTokenStorage: false } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":68844,"tokenId":0,"amount":1}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the burn params
var burnParams = new BurnParamsInput()
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0)) // Set the token id.
    .SetAmount(1); // Set the amount to burn.

// Set up the mutation
var burn = new Burn()
    .SetCollectionId(68844) // Set the collection id.
    .SetParams(burnParams); // Set the burn params.

// Define and assign the return data fragment to the mutation
var burnFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

burn.Fragment(burnFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBurn(burn);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Snippet In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation BurnToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            burnToken: {
              collectionId: $collectionId
              tokenId: $tokenId
              amount: $amount
              removeTokenStorage: false
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 68844, tokenId: 0, amount: 1 }
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
    mutation BurnToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          burnToken: {
            collectionId: $collectionId
            tokenId: $tokenId
            amount: $amount
            removeTokenStorage: false
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 68844, tokenId: 0, amount: 1 }
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
mutation BurnToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      burnToken: {
        collectionId: $collectionId
        tokenId: $tokenId
        amount: $amount
        removeTokenStorage: false
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 68844, 'tokenId': 0, 'amount': 1}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the token supply will be burned.

### Destroying a token and removing it from the Blockchain

:::info To destroy a token, these requirements must be met:
- The caller is the collection owner
- The token has no attributes
  - If the token has attributes, they can be removed using the `removeAllTokenAttributes` action (see [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md#option-b-using-the-enjin-api--sdks)).
- The token has 0 supply
  - You can remove the supply and destroy the token in the same `burnToken` transaction.
:::

Use the same `burnToken` action and set `removeTokenStorage: true`:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      burnToken: {
        collectionId: 68844
        tokenId: 0
        amount: 1
        removeTokenStorage: true
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
-d '{"query":"mutation DestroyToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { burnToken: { collectionId: $collectionId, tokenId: $tokenId, amount: $amount, removeTokenStorage: true } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":68844,"tokenId":0,"amount":1}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the burn params
var burnParams = new BurnParamsInput()
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0)) // Set the token id.
    .SetAmount(1) // Set the amount to burn.
    .SetRemoveTokenStorage(true); // Set whether the token storage will be removed if no tokens are left.

// Set up the mutation
var burn = new Burn()
    .SetCollectionId(68844) // Set the collection id.
    .SetParams(burnParams); // Set the burn params.

// Define and assign the return data fragment to the mutation
var burnFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

burn.Fragment(burnFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBurn(burn);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Snippet In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation DestroyToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            burnToken: {
              collectionId: $collectionId
              tokenId: $tokenId
              amount: $amount
              removeTokenStorage: true
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 68844, tokenId: 0, amount: 1 }
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
    mutation DestroyToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          burnToken: {
            collectionId: $collectionId
            tokenId: $tokenId
            amount: $amount
            removeTokenStorage: true
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 68844, tokenId: 0, amount: 1 }
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
mutation DestroyToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      burnToken: {
        collectionId: $collectionId
        tokenId: $tokenId
        amount: $amount
        removeTokenStorage: true
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 68844, 'tokenId': 0, 'amount': 1}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the token will be destroyed and the <GlossaryTerm id="storage_deposit" /> will be retrieved.

### Destroying a collection

:::info To destroy a collection, these requirements must be met:
- The caller is the collection owner
- The collection has no attributes
  - If the collection has attributes, they can be removed using the `removeAllCollectionAttributes` action (see [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md#option-b-using-the-enjin-api--sdks)).
- The collection has 0 tokens **in storage**
  - If the collection has some tokens, follow the above instructions for [Destroying a token](#destroying-a-token-and-removing-it-from-the-blockchain-1) for each of the tokens in the collection, to destroy them all.
:::

Destroying a collection is the `destroyCollection` discriminator action on `CreateTransaction`. Pass the collection ID as `id`:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyCollection {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      destroyCollection: {
        id: 68844
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
-d '{"query":"mutation DestroyCollection($id: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { destroyCollection: { id: $id } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"id":68844}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the mutation
var destroyCollection = new DestroyCollection()
    .SetCollectionId(68844); // Set the collection id.

// Define and assign the return data fragment to the mutation
var destrotCollectionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

destroyCollection.Fragment(destrotCollectionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendDestroyCollection(destroyCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Snippet In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation DestroyCollection($id: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            destroyCollection: { id: $id }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { id: 68844 }
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
    mutation DestroyCollection($id: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          destroyCollection: { id: $id }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { id: 68844 }
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
mutation DestroyCollection($id: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      destroyCollection: { id: $id }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'id': 68844}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the collection will be destroyed and the <GlossaryTerm id="storage_deposit" /> will be retrieved.

For each of the burn / destroy actions on this page, an event is emitted once the transaction reaches `FINALIZED` — useful as a confirmation signal. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.
