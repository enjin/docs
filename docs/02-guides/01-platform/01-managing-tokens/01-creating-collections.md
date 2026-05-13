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

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**". Then, click the "**[Create Collection](https://platform.beta.enjin.io/create/collection)**" button.

From here, you can configure the collection's supply rules, royalties, accepted royalty currencies, and attributes.

- **[Royalties](/03-api-reference/04-important-arguments.md#marketpolicy) -** Configure a beneficiary and percentage for marketplace sales of tokens in this collection.
- **[Explicit Royalty Currencies](/03-api-reference/04-important-arguments.md#explicitroyaltycurrencies) -** Choose which currencies are required to pay marketplace royalties for the tokens in this collection.
- **[Max Token Count / Max Token Supply](/03-api-reference/04-important-arguments.md#mintpolicy) -** Optional caps on how many distinct tokens, and how much supply per token, this collection allows.
- **Force Collapsing Supply -** When enabled, burning a token reduces its max supply (burned tokens cannot be re-minted). Leave disabled for the standard behavior.
- **[Attributes](/03-api-reference/04-important-arguments.md#attributes) -** Add details to your collection using key-value pairs. Standard keys like `name` and `description` allow applications to display your content correctly. You can also use the `URI` to link to a JSON file hosting your metadata. For more information, see the [Metadata Standard](/02-guides/01-platform/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md) page.

:::info Learn more about the arguments
For a comprehensive view and detail of all available arguments please refer to our [API Reference](/03-api-reference/03-api-reference.md).
:::

Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to submit the request. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

Once you've created a collection you're ready to start [creating tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md).

## Option B. Using the Enjin API & SDKs

In v3, every on-chain action goes through the single `CreateTransaction` mutation. The action itself is selected by which field you set on the `transaction` input — for collections, that's `createCollection`.

:::warning Platform v3 SDKs are not yet available
The C# and C++ SDK examples below still target the Enjin Platform v2 API and **will not work against v3**. This section will be updated once the v3 SDKs ship. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollection {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      createCollection: {
        forceCollapsingSupply: false  # set to true to enforce collapsing supply
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
-d '{"query":"mutation CreateCollection($forceCollapsingSupply: Boolean!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { createCollection: { forceCollapsingSupply: $forceCollapsingSupply } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"forceCollapsingSupply":false}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation CreateCollection($forceCollapsingSupply: Boolean!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: { createCollection: { forceCollapsingSupply: $forceCollapsingSupply } }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      forceCollapsingSupply: false // set to true to enforce collapsing supply
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
    mutation CreateCollection($forceCollapsingSupply: Boolean!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: { createCollection: { forceCollapsingSupply: $forceCollapsingSupply } }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    forceCollapsingSupply: false // set to true to enforce collapsing supply
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
mutation CreateCollection($forceCollapsingSupply: Boolean!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: { createCollection: { forceCollapsingSupply: $forceCollapsingSupply } }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'forceCollapsingSupply': False}  # set to true to enforce collapsing supply

response = requests.post('https://platform.beta.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

The response includes the transaction's `uuid`, `action` (e.g. `MultiTokens.create_collection`), and `state` (`PENDING` → `BROADCAST` → `FINALIZED`). Use `GetTransaction(network, chain, uuid: "<returned-uuid>")` to poll the current state.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

In addition to `forceCollapsingSupply`, `createCollection` accepts `maxTokenCount`, `maxTokenSupply`, `royalties`, `explicitRoyaltyCurrencies`, and `attributes`.
:::

:::tip What's next?
You've created a collection, now [Fill it with Tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md)
:::
