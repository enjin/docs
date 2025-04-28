---
title: "Burning / Destroying Tokens and Collections"
slug: "burning-destroying-tokens"
description: "Understand the process of burning or destroying tokens in the Enjin ecosystem, allowing you to permanently remove assets from circulation."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

"Burning" refers to the process of decreasing a token's supply and removing it from circulation, or in some cases, even removing the token from the blockchain entirely.  
Burning a token with <GlossaryTerm id="enj_infusion" /> (often called "Melting") releases the Infused ENJ to the holder.

:::info What you'll need:
- Some [Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
- A [Collection](/02-tutorials/01-managing-tokens/01-creating-collections.md) or a [Token](/02-tutorials/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to burn/destroy.
:::

**There are two ways to Burn a token:**

1. [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

### Burning token's supply

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to burn, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Burn**" button.

![Burning a Token](./img/burning-token.gif)

Insert the amount of tokens to Burn, and click on the "**Burn**" button.

<p align="center">
  <img src={require('./img/burn-token-form.png').default} alt="Burn Token Form" />
</p>

The Transaction Request will then appear in the "**Transactions**" menu.

<p align="center">
  <img src={require('./img/burn-token-banner.png').default} width="600" alt="Burn Transaction Request Banner" />
</p>

![Pending Burn Transaction](./img/pending-burn-token-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

### Destroying a token and removing it from the Blockchain

:::info  To destroy a token, these requirements must be met:
- The caller is the collection owner
- The token has no attributes
  - If the token has attributes, you can remove the attributes by clicking the **3 vertical dots** (**⋮**) next to the token, followed by "**Attributes**" and selecting "**Remove All"**. 
- The token has 0 supply
  - If the token has supply, you can follow the above guide [Burning token's supply](#burning-tokens-supply) to remove all token supply (as long as you own all of the token's supply)  
  Note - you can remove the supply and destroy the token in the same Burn transaction.
:::

Burning a token and destroying it are two different actions.  
The action demonstrated above is the action of burning a token, which decreases it's circulating supply.  
While destroying a token removes the token from the blockchain, and retrieves the <GlossaryTerm id="storage_deposit" /> to the collection owner.

To destroy a token, follow the above instructions for Burning a token, but make sure to tick the `Remove Token Storage` box.

<p align="center">
  <img src={require('./img/remove-token-storage.png').default} width="600" alt="Destroying a Token" />
</p>

### Destroying a collection

:::info To destroy a collection, these requirements must be met:
- The caller is the collection owner
- The collection has no attributes
  - If the collection has attributes, you can remove the attributes by clicking the **3 vertical dots** (**⋮**) next to the collection, followed by "**Attributes**" and selecting "**Remove All"**.
- The collection has 0 tokens **in storage**
  - If the collection has some tokens, you can follow the above guide [Destroying a token and removing it from the Blockchain](#destroying-a-token-and-removing-it-from-the-blockchain) for each of the tokens in the collection, to destroy them all.
:::

In the Platform menu, navigate to "**[Collections](https://platform.canary.enjin.io/collections)**".  
**Locate the collection** you wish to destroy, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Destroy**" button.

![Destroying a Collection](./img/destroying-collection.gif)

Then, confirm by clicking the "**Destroy**" button

<p align="center">
  <img src={require('./img/destroy-collection-form.png').default} alt="Destroy Collection Form" />
</p>

The Transaction Request will then appear in the "**Transactions**" menu

<p align="center">
  <img src={require('./img/destroy-collection-banner.png').default} width="600" alt="Destroy Collection Transaction Request Banner" />
</p>

![Pending Destroy Collection Transaction](./img/pending-destroy-collection-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

## Option B. Using the Enjin API & SDKs

### Burning token's supply

Use the `Burn` mutation:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BurnToken{
  Burn(
    collectionId: 68844 #Specify the Collection ID
    params: {
      tokenId: {integer: 0} #Specify the Token ID
      amount: 1 #Specify the amount of supply to burn
    }
  ) {
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation BurnToken(\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt!\r\n  $amount: BigInt!\r\n) {\r\n  Burn(\r\n    collectionId: $collection_id\r\n    params: { tokenId: { integer: $token_id }, amount: $amount }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":5,"amount":1}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BurnToken(
        $collection_id: BigInt!
        $token_id: BigInt!
        $amount: BigInt!
      ){
        Burn(
          collectionId: $collection_id
          params: {
            tokenId: {integer: $token_id}
            amount: $amount
          }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 5, //Specify the amount of supply to burn
      amount: 1 //Specify the amount of supply to burn
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation BurnToken(
      $collection_id: BigInt!
      $token_id: BigInt!
      $amount: BigInt!
    ){
      Burn(
        collectionId: $collection_id
        params: {
          tokenId: {integer: $token_id}
          amount: $amount
        }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 5, //Specify the amount of supply to burn
    amount: 1 //Specify the amount of supply to burn
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation BurnToken(
  $collection_id: BigInt!
  $token_id: BigInt!
  $amount: BigInt!
){
  Burn(
    collectionId: $collection_id
    params: {
      tokenId: {integer: $token_id}
      amount: $amount
    }
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 5, #Specify the amount of supply to burn
  'amount': 1 #Specify the amount of supply to burn
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the token supply will be burned

### Destroying a token and removing it from the Blockchain

:::info To destroy a token, these requirements must be met:
- The caller is the collection owner
- The token has no attributes
  - If the token has attributes, they can be removed using the `RemoveAllAttributes` mutation
- The token has 0 supply
  - You can remove the supply and destroy the token in the same Burn transaction.
:::

Use the `Burn` mutation, and add `removeTokenStorage: true` property

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyToken{
  Burn(
    collectionId: 68844 #Specify the Collection ID
    params: {
      tokenId: {integer: 0} #Specify the Token ID
      amount: 1 #Specify the amount of supply to burn
      removeTokenStorage: true
    }
  ) {
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation BurnToken(\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt!\r\n  $amount: BigInt!\r\n) {\r\n  Burn(\r\n    collectionId: $collection_id\r\n    params: {\r\n      tokenId: { integer: $token_id }\r\n      amount: $amount\r\n      removeTokenStorage: true\r\n    }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":5,"amount":1}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BurnToken(
        $collection_id: BigInt!
        $token_id: BigInt!
        $amount: BigInt!
      ){
        Burn(
          collectionId: $collection_id
          params: {
            tokenId: {integer: $token_id}
            amount: $amount
            removeTokenStorage: true
          }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 5, //Specify the amount of supply to burn
      amount: 1 //Specify the amount of supply to burn
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation BurnToken(
      $collection_id: BigInt!
      $token_id: BigInt!
      $amount: BigInt!
    ){
      Burn(
        collectionId: $collection_id
        params: {
          tokenId: {integer: $token_id}
          amount: $amount
          removeTokenStorage: true
        }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 5, //Specify the amount of supply to burn
    amount: 1 //Specify the amount of supply to burn
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation BurnToken(
  $collection_id: BigInt!
  $token_id: BigInt!
  $amount: BigInt!
){
  Burn(
    collectionId: $collection_id
    params: {
      tokenId: {integer: $token_id}
      amount: $amount
      removeTokenStorage: true
    }
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 5, #Specify the amount of supply to burn
  'amount': 1 #Specify the amount of supply to burn
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
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
  - If the collection has attributes, they can be removed using the `RemoveAllAttributes` mutation
- The collection has 0 tokens **in storage**
  - If the collection has some tokens, you can the above instructions for [Destroying a token](#destroying-a-token-and-removing-it-from-the-blockchain-1) for each of the tokens in the collection, to destroy them all.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyCollection {
  DestroyCollection(
    collectionId: 68844 #Specify the Collection ID
  ) {
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation DestroyCollection($collection_id: BigInt!) {\r\n  DestroyCollection(collectionId: $collection_id) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation DestroyCollection($collection_id: BigInt!){
        DestroyCollection(
          collectionId: $collection_id
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105 //Specify the collection ID
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation DestroyCollection($collection_id: BigInt!){
      DestroyCollection(
        collectionId: $collection_id
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105 //Specify the collection ID
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation DestroyCollection($collection_id: BigInt!){
  DestroyCollection(
    collectionId: $collection_id
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105 #Specify the collection ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the collection will be destroyed.