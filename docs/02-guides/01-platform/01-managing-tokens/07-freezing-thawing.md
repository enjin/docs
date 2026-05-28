---
title: "Freezing & Thawing"
slug: "freezing-thawing"
description: "Learn how to freeze and thaw tokens, controlling when your blockchain assets can be transferred or used, for added flexibility."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

"Freezing" refers to the process of temporarily suspending the transferability of a collection or a specific token. This action provides you greater control over the movement of assets, enhancing security and enabling unique use-cases.

One such use-case is the implementation of "Soulbound" tokens. A Soulbound token is bound to a specific address and cannot be transferred out of the wallet it's minted on. This feature can be used to create unique gameplay mechanics, loyalty rewards, and more.

:::note
Freezing only applies to transfers, which also results in marketplace listings being unpurchasable.
Freezing does not suspend token minting.
:::

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
- Some [ Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.
You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to freeze.
:::

**There are two ways to Freeze / Thaw:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

:::tip Applying Freeze/Thaw Actions to Collections and Tokens
This tutorial illustrates the process of freezing a collection. The same flow applies to freezing or thawing a single token — [Locate the token in the dashboard](/01-getting-started/04-using-the-enjin-platform.md#finding-tokens) and pick **Freeze Token** or **Thaw Token** from its actions menu instead.
:::

### Freezing an entire collection

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**".
**Locate the collection** you wish to freeze, click the **3 vertical dots** (**⋮**) on its row, then click the "**Freeze Collection**" button. In the form that opens up, click on the "**Freeze Collection**" button.

![The Freeze Collection form](/img/getting-started/v3-freeze-collection-form.png)

The Transaction Request will then appear in the "**Transactions**" menu. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

## Option B. Using the Enjin API & SDKs

Freeze and thaw are split into four discriminator actions on `CreateTransaction`:

- `freezeCollection: { collectionId }`
- `freezeToken: { collectionId, tokenId, state }` — where `state` is `PERMANENT`, `TEMPORARY`, or `NEVER`.
- `thawCollection: { collectionId }`
- `thawToken: { collectionId, tokenId, state }`

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

### Freezing an entire collection

Use the `freezeCollection` action — freezing a collection freezes every token in it.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FreezeCollection {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      freezeCollection: { collectionId: 36105 }
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
-d '{"query":"mutation FreezeCollection($collectionId: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { freezeCollection: { collectionId: $collectionId } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation FreezeCollection($collectionId: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: { freezeCollection: { collectionId: $collectionId } }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 36105 }
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
    mutation FreezeCollection($collectionId: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: { freezeCollection: { collectionId: $collectionId } }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 36105 }
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
mutation FreezeCollection($collectionId: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: { freezeCollection: { collectionId: $collectionId } }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 36105}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, all tokens within the specified collection will be frozen.

### Freezing a single token

Use the `freezeToken` action. The `state` field selects the freeze state to apply (`TEMPORARY` for a freeze that can be thawed later, `PERMANENT` for a soulbound-style freeze).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FreezeToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      freezeToken: {
        collectionId: 36105
        tokenId: 0
        state: TEMPORARY  # or PERMANENT for a soulbound freeze
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
-d '{"query":"mutation FreezeToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { freezeToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105,"tokenId":0,"state":"TEMPORARY"}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation FreezeToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: { freezeToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 36105, tokenId: 0, state: "TEMPORARY" }
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
    mutation FreezeToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: { freezeToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 36105, tokenId: 0, state: "TEMPORARY" }
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
mutation FreezeToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: { freezeToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 36105, 'tokenId': 0, 'state': 'TEMPORARY'}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
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

Use the `thawCollection` action.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ThawCollection {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      thawCollection: { collectionId: 36105 }
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
-d '{"query":"mutation ThawCollection($collectionId: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { thawCollection: { collectionId: $collectionId } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation ThawCollection($collectionId: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: { thawCollection: { collectionId: $collectionId } }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 36105 }
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
    mutation ThawCollection($collectionId: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: { thawCollection: { collectionId: $collectionId } }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 36105 }
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
mutation ThawCollection($collectionId: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: { thawCollection: { collectionId: $collectionId } }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 36105}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, all tokens within the specified collection will be thawed.

### Thawing a single token

Use the `thawToken` action. The `state` field is the post-thaw freeze state for the token (usually `TEMPORARY` when lifting a temporary freeze).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ThawToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      thawToken: {
        collectionId: 36105
        tokenId: 0
        state: TEMPORARY
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
-d '{"query":"mutation ThawToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: { thawToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":36105,"tokenId":0,"state":"TEMPORARY"}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation ThawToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: { thawToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: { collectionId: 36105, tokenId: 0, state: "TEMPORARY" }
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
    mutation ThawToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: { thawToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: { collectionId: 36105, tokenId: 0, state: "TEMPORARY" }
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
mutation ThawToken($collectionId: BigInt!, $tokenId: BigInt!, $state: FreezeState!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: { thawToken: { collectionId: $collectionId, tokenId: $tokenId, state: $state } }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {'collectionId': 36105, 'tokenId': 0, 'state': 'TEMPORARY'}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Once the transaction is executed, the specified token will be thawed.

For each of these actions, an event is emitted once the transaction reaches `FINALIZED` — useful as a confirmation signal. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

To sign with a managed wallet instead of the Wallet Daemon, set `signerAccount` on `CreateTransaction`.
:::

:::tip Need to send a transaction request to user's wallet?
This can be done using Enjin Platform API & WalletConnect!
To learn more, check out the [Using WalletConnect page](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/02-using-wallet-connect.md).
:::
