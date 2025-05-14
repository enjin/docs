---
title: "Creating Collections"
slug: "creating-collections"
description: "Discover how to create and manage collections in the Enjin ecosystem, allowing you to organize blockchain assets efficiently."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" /> and 6.25 ENJ for <GlossaryTerm id="storage_deposit" />s.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
:::

On Enjin Blockchain, every token must be placed inside a <GlossaryTerm id="collection" />. 

**There are two ways to use the <GlossaryTerm id="create_collection" /> functionalities:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the Enjin API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Collections](https://platform.canary.enjin.io/collections)**". Then, click the "**[Create Collection](https://platform.canary.enjin.io/create/collection)**" button.

![Creating a collection](/img/guides/managing-tokens/create-collection.gif)

From here, you can customize your collection's Mint Policy, Market Policy, Explicit Currencies (on option to delegate a token for <GlossaryTerm id="royalties" />), and Attributes.

- **[Mint Policy](/03-api-reference/04-important-arguments.md#mintpolicy) -** The rules pertaining to token supply and number of tokens available to be minted in the future.
- **[Market Policy](/03-api-reference/04-important-arguments.md#marketpolicy) -** Determines the rules which tokens in this collection must follow when interacting with the on-chain marketplace.
- **[Explicit Royalty Currencies](/03-api-reference/04-important-arguments.md#explicitroyaltycurrencies) -** Choose which currencies are required to pay marketplace royalties for the tokens in this collection.
- **[Attributes](/03-api-reference/04-important-arguments.md#attributes) -** Set the collection details which are details stored in pairs, like a title and its content. Certain attributes, such as `name` and `description`, have special roles that are understood by many platforms, wallets and marketplaces.

:::info Learn more about the arguments
For a comprehensive view and detail of all available arguments please refer to our [API Reference](/03-api-reference/03-api-reference.md).
:::

Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to create the request.

The Transaction Request will then appear in the "**Transactions**" menu.

<p align="center">
  <img src={require('/img/guides/managing-tokens/collection-created-banner.png').default} width="600" alt="Collection created banner that appears after creating a transaction request" />
</p>

![Pending create collection transaction](/img/guides/managing-tokens/pending-create-collection-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

Once you've created a collection you're ready to start [creating tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md).

## Option B. Using the Enjin API & SDKs

The `CreateCollection` mutation is used to create a new on-chain collection. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollection {
  CreateCollection(mintPolicy: { forceCollapsingSupply: false }) #Set to true to enforce collapsing supply mint policy
  {
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
-d '{"query":"mutation CreateCollection($forceCollapsingSupply: Boolean) {\r\n  CreateCollection(\r\n    mintPolicy: { forceCollapsingSupply: $forceCollapsingSupply }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"forceCollapsingSupply":false}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var createCollection = new CreateCollection()
    .SetMintPolicy(new MintPolicy().SetForceCollapsingSupply(false)); //Set to true to enforce collapsing supply mint policy

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createCollection.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateCollection(createCollection);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <memory>
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Setup mutation data
    shared_ptr<MintPolicy> mintPolicy = make_shared<MintPolicy>();
    mintPolicy->SetForceSingleMint(make_shared<SerializableBool>(false));

    // Setup mutation
    CreateCollection createCollection = CreateCollection();
    createCollection.SetMintPolicy(mintPolicy);

    // Define and assign the return data fragment to the mutation
    shared_ptr<TransactionFragment> transactionFragment = make_shared<TransactionFragment>();
    transactionFragment
        ->WithId()
        .WithMethod()
        .WithState();

    createCollection.SetFragment(transactionFragment);

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<shared_ptr<IPlatformResponse<GraphQlResponse<Transaction>>>> futureResponse = SendCreateCollection(*client, createCollection);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& transaction = gqlResult->GetData()->GetResult();

        std::cout << to_string(transaction->GetId().value()) << std::endl;
        std::cout << ToString(transaction->GetMethod().value()) << std::endl;
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
      mutation CreateCollection($forceCollapsingSupply: Boolean) {
        CreateCollection(
          mintPolicy: { forceCollapsingSupply: $forceCollapsingSupply }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      forceCollapsingSupply: false //Set to true to enforce collapsing supply mint policy
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
    mutation CreateCollection($forceCollapsingSupply: Boolean) {
      CreateCollection(
        mintPolicy: { forceCollapsingSupply: $forceCollapsingSupply }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    forceCollapsingSupply: false //Set to true to enforce collapsing supply mint policy
  }
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' }
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
  CreateCollection(
    mintPolicy: { forceCollapsingSupply: $forceCollapsingSupply }
  ) {
    id
    method
    state
  }
}
'''

variables = {'forceCollapsingSupply': False} #Set to true to enforce collapsing supply mint policy

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.  
For instance, you'll find settings such as different supply types with the `MintPolicy` argument, enforcing royalties with the `MarketPolicy` argument, or adding metadata with the `AttributeInput` argument.
:::

A WebSocket event will also be fired so you can pick up the collection in real time by listening to the app channel on the WebSocket.

:::tip What's next?
You've created a collection, now [Fill it with Tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md)
:::
