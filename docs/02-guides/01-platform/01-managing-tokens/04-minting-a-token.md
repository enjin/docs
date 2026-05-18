---
title: "Minting Tokens"
slug: "minting-a-token"
description: "Enhance your blockchain assets by adding custom metadata, providing additional details and functionalities to your tokens."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you've got your tokens created, it's time to start minting them into player wallets as they are earned.

:::info What you'll need:
- Some [ Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" /> and a deposit of 0.01 ENJ is required for the <GlossaryTerm id="token_account_deposit" />, for each new token holder.
If the token has <GlossaryTerm id="enj_infusion" />, each new unit minted will require the same amount of ENJ to be infused.
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to mint.
:::

**There are two ways to use the <GlossaryTerm id="create_asset" /> functionalities:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

[Locate the token in the dashboard](/01-getting-started/04-using-the-enjin-platform.md#finding-tokens), click the **3 vertical dots** (**⋮**), then click "**Mint**".
Set the recipient and the amount in the corresponding fields, and click on "**Mint Token**".

![The Mint Token form](/img/getting-started/v3-mint-token-form.png)

The Transaction Request will then appear in the "**Transactions**" menu. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

## Option B. Using the Enjin API & SDKs

Minting is split into two discriminator actions on `CreateTransaction`:

- `mintToken` — mints to a single recipient (`recipient`, `collectionId`, `tokenId`, `amount`, optional `unitPrice`).
- `mintTokens` — mints to multiple recipients in one transaction (`collectionId` + a `tokens: [MintTokenEntryInput!]` list where each entry has `recipient`, `tokenId`, `amount`, optional `unitPrice`).

The example below uses `mintTokens` so it scales naturally if you add more recipients to the array.

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintTokens {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      mintTokens: {
        collectionId: 7154
        tokens: [
          {
            recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
            tokenId: 6533
            amount: 1
          }
        ]
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
-d '{"query":"mutation MintTokens($collectionId: BigInt!, $tokens: [MintTokenEntryInput!]!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      mintTokens: {\r\n        collectionId: $collectionId\r\n        tokens: $tokens\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":7154,"tokens":[{"recipient":"0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921","tokenId":6533,"amount":1}]}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Define the list of recipients and their mint parameters
var recipients = new List<MintRecipient>
{
    new MintRecipient()
        .SetAccount("0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921")
        .SetMintParams(new MintTokenParams()
            .SetAmount(1)
            .SetTokenId(new EncodableTokenIdInput().SetInteger(6533))
        )
};

// Setup the mutation
var batchMint = new BatchMint()
    .SetCollectionId(7154)
    .SetRecipients(recipients.ToArray());

// Define and assign the return data fragment to the mutation
var batchMintFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

batchMint.Fragment(batchMintFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBatchMint(batchMint);
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

    // Define the list of recipients and their mint parameters
    shared_ptr tokenId = make_shared<EncodableTokenIdInput>();
    tokenId->SetInteger(make_shared<SerializableString>("0"));

    MintTokenParams mintTokenParams = MintTokenParams()
            .SetAmount(make_shared<SerializableString>("1"))
            .SetTokenId(tokenId);


    MintRecipient mintRecipient = MintRecipient()
            .SetAccount(make_shared<SerializableString>("0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"))
            .SetMintParams(make_shared<MintTokenParams>(mintTokenParams));

    vector<MintRecipient> recipients;
    recipients.push_back(mintRecipient);

    // Setup mutation
    BatchMint batchMint = BatchMint()
            .SetCollectionId(make_shared<SerializableString>("7154"))
            .SetRecipients(make_shared<SerializableArray<MintRecipient>>(recipients));

    // Define and assign the return data fragment to the mutation
    shared_ptr<TransactionFragment> transactionFragment = make_shared<TransactionFragment>();
    transactionFragment
        ->WithId()
        .WithMethod()
        .WithState();

    batchMint.SetFragment(transactionFragment);

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<shared_ptr<IPlatformResponse<GraphQlResponse<Transaction>>>> futureResponse = SendBatchMint(*client, batchMint);

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
      mutation MintTokens($collectionId: BigInt!, $tokens: [MintTokenEntryInput!]!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            mintTokens: {
              collectionId: $collectionId
              tokens: $tokens
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
      collectionId: 7154,
      tokens: [
        {
          recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921",
          tokenId: 6533,
          amount: 1
        }
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

axios.post('https://platform.beta.enjin.io/graphql', {
  query: `
    mutation MintTokens($collectionId: BigInt!, $tokens: [MintTokenEntryInput!]!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          mintTokens: {
            collectionId: $collectionId
            tokens: $tokens
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
    collectionId: 7154,
    tokens: [
      {
        recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921",
        tokenId: 6533,
        amount: 1
      }
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
mutation MintTokens($collectionId: BigInt!, $tokens: [MintTokenEntryInput!]!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintTokens: {
        collectionId: $collectionId
        tokens: $tokens
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
  'collectionId': 7154,
  'tokens': [
    {
      'recipient': '0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921',
      'tokenId': 6533,
      'amount': 1,
    },
  ],
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

The response includes the transaction's `uuid`, `action` (e.g. `MultiTokens.batch_mint`), and `state` (`PENDING` → `BROADCAST` → `FINALIZED`). Use `GetTransaction(network, chain, uuid: "<returned-uuid>")` to poll the current state.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

If you want to create _and_ mint new tokens together, use `createTokens` instead of `mintTokens`. To sign with a managed wallet instead of the Wallet Daemon, set `signerAccount` on `CreateTransaction`.
:::

:::tip You've minted a token!
What if you need to transfer a token? proceed to [Transferring Tokens](/02-guides/01-platform/01-managing-tokens/05-transferring-tokens.md).
:::
