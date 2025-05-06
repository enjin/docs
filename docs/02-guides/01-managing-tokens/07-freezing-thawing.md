---
title: "Freezing & Thawing"
slug: "freezing-thawing"
description: "Learn how to freeze and thaw tokens, controlling when your blockchain assets can be transferred or used, for added flexibility."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

"Freezing" refers to the process of temporarily suspending the transferability of a collection or a specific token.

This action provides you greater control over the movement of assets, enhancing security and enabling unique use-cases.

One such use-case is the implementation of "Soulbound" tokens. A Soulbound token is bound to a specific address and cannot be transferred out of the wallet it's minted on. This feature can be used to create unique gameplay mechanics, loyalty rewards, and more.

Note, freezing only applies to transfers, which also results in marketplace listings being unpurchasable.  
Freezing does not suspend token minting.

### Freeze States

A **freeze state** determines whether a token can be transferred and the conditions under which it remains locked or becomes transferrable. This feature enables token creators to define unique behaviors and restrictions for their assets, supporting scenarios like enhanced security, gameplay mechanics, or compliance needs.

#### Explanation of Freeze States

- **Permanent:**  
  The token is permanently frozen and cannot be transferred to another account under any circumstances. Use this state for tokens that are intended to stay bound to their original holder, such as "Soulbound" tokens for identity or loyalty purposes.  

- **Temporary:**  
  The token is temporarily frozen, restricting transfers until it is explicitly thawed by the collection owner. This state is ideal for implementing time-limited restrictions or conditional asset movement.

- **Never:**  
  The token is always transferrable and cannot be frozen. Choose this state if you want the token to remain unrestricted in its movement across wallets and platforms.  

:::info What you'll need:
- Some [ Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to freeze.
:::

**There are two ways to Freeze / Thaw:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

:::tip Note: Applying Freeze/Thaw Actions to Collections and Tokens  
This tutorial illustrates the process of freezing a collection.  
However, the same steps can be applied to freeze or thaw tokens.  
Simply navigate to the corresponding menu for tokens instead of collections, or for thawing instead of freezing.
:::

### Freezing an entire collection

In the Platform menu, navigate to "**[Collections](https://platform.canary.enjin.io/collections)**".  
**Locate the collection** you wish to freeze, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Freeze**" button.

![Freezing a Collection](/img/guides/managing-tokens/freezing-collection.gif)

Choose the freeze state, and click on the "**Freeze**" button.

<p align="center">
  <img src={require('/img/guides/managing-tokens/freeze-collection-form.png').default} alt="Freeze Collection Form" />
</p>

The Transaction Request will then appear in the "**Transactions**" menu.

<p align="center">
  <img src={require('/img/guides/managing-tokens/freeze-collection-banner.png').default} width="600" alt="Freeze Collection Transaction Request Banner" />
</p>

![Pending Freeze Collection Transaction Request](/img/guides/managing-tokens/pending-freeze-collection-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

## Option B. Using the Enjin API & SDKs

### Freezing a Collection or Token

By freezing a collection, all tokens within that collection will be frozen, meaning they cannot be burned or transferred out of the wallet they're currently in.

### Freezing an entire collection

Use the `Freeze` mutation and the `freezeType: COLLECTION` argument to freeze a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FreezeCollection{
  Freeze(
    collectionId: 36105 #Specify the collection ID
    freezeType: COLLECTION #For collection freezing
  ){
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
-d '{"query":"mutation FreezeCollection($collection_id: BigInt!, $freeze_type: FreezeType!) {\r\n  Freeze(collectionId: $collection_id, freezeType: $freeze_type) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"freeze_type":"COLLECTION"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var freezeCollection = new Freeze()
    .SetCollectionId(36105)
    .SetFreezeType(FreezeType.Collection);

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

freezeCollection.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendFreeze(freezeCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Set up the mutation
    Freeze freezeCollection = Freeze()
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetFreezeType(FreezeType::Collection);

    // Define Fragment for the returned data
    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    freezeCollection.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendFreeze(*client, freezeCollection);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& freezeCollectionResult = gqlResult->GetData()->GetResult();

        std::cout << freezeCollectionResult->GetId().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation FreezeCollection
      (
        $collection_id: BigInt!
        $freeze_type: FreezeType!
      )  {
        Freeze(
          collectionId: $collection_id 
          freezeType: $freeze_type
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      freeze_type: "COLLECTION" //For collection freezing
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
    mutation FreezeCollection
    (
      $collection_id: BigInt!
      $freeze_type: FreezeType!
    )  {
      Freeze(
        collectionId: $collection_id 
        freezeType: $freeze_type
      ){
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    freeze_type: "COLLECTION" //For collection freezing
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
mutation FreezeCollection
(
  $collection_id: BigInt!
  $freeze_type: FreezeType!
)  {
  Freeze(
    collectionId: $collection_id 
    freezeType: $freeze_type
  ){
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'freeze_type': "COLLECTION" #For collection freezing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, all tokens within the specified collection will be frozen.

### Freezing a single token

Use the `Freeze` mutation and the `freezeType: TOKEN` argument to freeze a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FreezeToken{
  Freeze(
    collectionId: 36105 #Specify the collection ID
    tokenId:{integer: 0} #Specify the token ID
    freezeType: TOKEN #For token freezing
    freezeState: TEMPORARY #Select the freeze state
  ){
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
-d '{"query":"mutation FreezeToken(\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt!\r\n  $freeze_type: FreezeType!\r\n  $freeze_state: FreezeStateType\r\n) {\r\n  Freeze(\r\n    collectionId: $collection_id\r\n    tokenId: { integer: $token_id }\r\n    freezeType: $freeze_type\r\n    freezeState: $freeze_state\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":0,"freeze_type":"TOKEN","freeze_state":"TEMPORARY"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var freezeToken = new Freeze()
    .SetCollectionId(36105)
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0))
    .SetFreezeType(FreezeType.Token)
    .SetFreezeState(FreezeState.Temporary);

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

freezeToken.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendFreeze(freezeToken);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Setup an Encodable Token ID
    EncodableTokenIdInput tokenId = EncodableTokenIdInput()
            .SetInteger(make_shared<SerializableString>("0"));

    // Set up the mutation
    Freeze freezeToken = Freeze()
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetTokenId(make_shared<EncodableTokenIdInput>(tokenId))
            .SetFreezeType(FreezeType::Token)
            .SetFreezeState(FreezeState::Temporary);

    // Define Fragment for the returned data
    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    freezeToken.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendFreeze(*client, freezeToken);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& freezeTokenResult = gqlResult->GetData()->GetResult();

        std::cout << freezeTokenResult->GetId().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation FreezeToken
      (
        $collection_id: BigInt!
        $token_id: BigInt!
        $freeze_type: FreezeType!
        $freeze_state: FreezeStateType

      ) {
        Freeze(
          collectionId: $collection_id
          tokenId:{integer: $token_id}
          freezeType: $freeze_type
          freezeState: $freeze_state
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 0, //Specify the token ID
      freeze_type: "TOKEN", //For token freezing
      freeze_state: "TEMPORARY" //Select the freeze state
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
    mutation FreezeToken
    (
      $collection_id: BigInt!
      $token_id: BigInt!
      $freeze_type: FreezeType!
      $freeze_state: FreezeStateType

    ) {
      Freeze(
        collectionId: $collection_id
        tokenId:{integer: $token_id}
        freezeType: $freeze_type
        freezeState: $freeze_state
      ){
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 0, //Specify the token ID
    freeze_type: "TOKEN", //For token freezing
    freeze_state: "TEMPORARY" //Select the freeze state
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
mutation FreezeToken
(
  $collection_id: BigInt!
  $token_id: BigInt!
  $freeze_type: FreezeType!
  $freeze_state: FreezeStateType
  
) {
  Freeze(
    collectionId: $collection_id
    tokenId:{integer: $token_id}
    freezeType: $freeze_type
    freezeState: $freeze_state
  ){
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 0, #Specify the token ID
  'freeze_type': "TOKEN", #For token freezing
  'freeze_state': "TEMPORARY" #Select the freeze state
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the specified token will be frozen.

### Thawing a Collection or Token

Thawing a collection means allowing all tokens within that collection to be active again, so they can be transferred or burned as desired, removing the restrictions that kept them locked in a particular wallet.

### Thawing an entire collection

By thawing a collection, all tokens within that collection will be thawed, meaning they can be burned and transferred out of the wallet they're currently in.

Use the `Thaw` mutation and the `freezeType: COLLECTION` argument to thaw a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ThawCollection{
  Thaw(
    collectionId: 36105 #Specify the collection ID
    freezeType: COLLECTION #For collection thawing
  ){
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
-d '{"query":"mutation ThawCollection($collection_id: BigInt!, $freeze_type: FreezeType!) {\r\n  Thaw(collectionId: $collection_id, freezeType: $freeze_type) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"freeze_type":"COLLECTION"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var thawCollection = new Thaw()
    .SetCollectionId(36105)
    .SetFreezeType(FreezeType.Collection);

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

thawCollection.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendThaw(thawCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Set up the mutation
    Thaw thawCollection = Thaw()
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetFreezeType(FreezeType::Collection);

    // Define Fragment for the returned data
    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    thawCollection.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendThaw(*client, thawCollection);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& thawCollectionResult = gqlResult->GetData()->GetResult();

        std::cout << thawCollectionResult->GetId().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation ThawCollection
      (
        $collection_id: BigInt!
        $freeze_type: FreezeType!
      ) {
        Thaw(
          collectionId: $collection_id 
          freezeType: $freeze_type
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      freeze_type: "COLLECTION" //For collection thawing
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
    mutation ThawCollection
    (
      $collection_id: BigInt!
      $freeze_type: FreezeType!
    ) {
      Thaw(
        collectionId: $collection_id 
        freezeType: $freeze_type
      ){
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    freeze_type: "COLLECTION" //For collection thawing
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
mutation ThawCollection
(
  $collection_id: BigInt!
  $freeze_type: FreezeType!
) {
  Thaw(
    collectionId: $collection_id 
    freezeType: $freeze_type
  ){
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'freeze_type': "COLLECTION" #For collection thawing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, all tokens within the specified collection will be thawed.

### Thawing a single token

Use the `Thaw` mutation and the `freezeType: TOKEN` argument to thaw a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ThawToken{
  Thaw(
    collectionId: 36105 #Specify the collection ID
    tokenId:{integer: 0} #Specify the token ID
    freezeType: TOKEN #For token thawing
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
-d '{"query":"mutation ThawToken(\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt!\r\n  $freeze_type: FreezeType!\r\n) {\r\n  Thaw(\r\n    collectionId: $collection_id\r\n    tokenId: { integer: $token_id }\r\n    freezeType: $freeze_type\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":0,"freeze_type":"TOKEN"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var thawToken = new Thaw()
    .SetCollectionId(36105)
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0))
    .SetFreezeType(FreezeType.Token);

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

thawToken.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendThaw(thawToken);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Setup an Encodable Token ID
    EncodableTokenIdInput tokenId = EncodableTokenIdInput()
            .SetInteger(make_shared<SerializableString>("0"));

    // Set up the mutation
    Thaw thawToken = Thaw()
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetTokenId(make_shared<EncodableTokenIdInput>(tokenId))
            .SetFreezeType(FreezeType::Token);

    // Define Fragment for the returned data
    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    thawToken.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendThaw(*client, thawToken);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& thawTokenResult = gqlResult->GetData()->GetResult();

        std::cout << thawTokenResult->GetId().value() << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}

```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation ThawToken
      (
        $collection_id: BigInt!
        $token_id: BigInt!
        $freeze_type: FreezeType!
      ) {
        Thaw(
          collectionId: $collection_id
          tokenId:{integer: $token_id}
          freezeType: $freeze_type
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 0, //Specify the token ID
      freeze_type: "TOKEN" //For token thawing
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
    mutation ThawToken
    (
      $collection_id: BigInt!
      $token_id: BigInt!
      $freeze_type: FreezeType!
    ) {
      Thaw(
        collectionId: $collection_id
        tokenId:{integer: $token_id}
        freezeType: $freeze_type
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 0, //Specify the token ID
    freeze_type: "TOKEN" //For token thawing
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
mutation ThawToken
(
  $collection_id: BigInt!
  $token_id: BigInt!
  $freeze_type: FreezeType!
) {
  Thaw(
    collectionId: $collection_id
    tokenId:{integer: $token_id}
    freezeType: $freeze_type
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 0, #Specify the token ID
  'freeze_type': "TOKEN" #For token thawing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the specified token will be thawed.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

For instance, you'll find settings such as `continueOnFailure` to skip data that would cause the whole batch to fail, or the ability to sign using a managed wallet with the `signingAccount` argument.
:::

:::tip Need to send a transaction request to user's wallet?
This can be done using Enjin Platform API & WalletConnect!  
To learn more, check out the [Using WalletConnect page](/02-guides/02-managing-users/01-connecting-user-wallets/01-using-wallet-connect.md).
:::
