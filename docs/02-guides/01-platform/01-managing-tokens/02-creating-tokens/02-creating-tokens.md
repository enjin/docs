---
title: "Creating Tokens"
slug: "../creating-tokens"
description: "A step-by-step guide on how to create custom tokens using the Enjin Platform, enabling developers to mint blockchain assets with ease."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

"<GlossaryTerm id="token" />s" are digital assets that can be traded, sold, or used on the Enjin Blockchain.

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to process transactions and at least 0.01 ENJ for the <GlossaryTerm id="token_account_deposit" />.
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) to place the tokens in.
:::

Enjin Blockchain allows you to create customized <GlossaryTerm id="token_id" /> structures. This flexibility enables you to organize your tokens in various ways that suit your needs.

- **For <GlossaryTerm id="multi_unit_token" />s** These tokens are identical in value and function, and therefore, they all share the same Token ID. This commonality in ID reflects their interchangeable nature. For instance, all units of a specific cryptocurrency like Bitcoin would have the same identification as they hold the same value and are indistinguishable from one another in terms of usage and worth.
- **For <GlossaryTerm id="non_fungible_tokens" /> (<GlossaryTerm id="nft" />s):** Every NFT has a unique Token ID that sets it apart from other tokens, even within the same collection. This unique ID is crucial for establishing the individuality and provenance of each NFT, which could represent anything from digital art to ownership rights over a virtual asset.

:::tip Token ID Structure [Best Practices](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md)
Before minting the Mainnet versions of your Tokens, that will be used in your live economy. Make sure to take a look at the [best practices for Token ID structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md).
:::

**There are two ways to use the <GlossaryTerm id="create_asset" /> functionalities:**

- [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
- [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Collections](https://platform.beta.enjin.io/collections)**" and click the collection you want to mint the token into. From the collection page, click the "**Create Token**" button.

From here, you can configure the token's basic settings, supply cap, royalty behavior, and attributes.

- **Create Token Section -** Basic token options. Make sure to select the Collection ID you wish to mint the token in, the token ID, the initial supply, and the recipient in the corresponding fields.
  Make sure to check out the [TokenID Structure Best Practices](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md).
- **[Cap](/03-api-reference/04-important-arguments.md#cap) -** The token cap (if required). There are two cap modes — leave the cap field unset for an unlimited supply.
  - **Unlimited supply (no cap)** is the default. With this model, there is no limit to how many tokens can be minted or be in circulation. The collection owner can always mint additional units, making it ideal for use cases that require an ever-expanding token supply. To pick this option, simply omit the cap field in the API, or select the Infinite cap type option in the dashboard form.
  - The **[SUPPLY](/03-api-reference/04-important-arguments.md#supply)** cap mode offers a balanced approach between flexibility and control. This model allows the collection owner to mint new tokens as long as the circulating supply does not exceed the predetermined `supply` value. Burned tokens can be re-minted, ensuring the total supply remains constant.
  - The **[COLLAPSING_SUPPLY](/03-api-reference/04-important-arguments.md#collapsing_supply)** cap mode is the most strict. This cap allows the collection owner to mint new tokens as long as the circulating supply does not exceed the `supply` value. However, burning tokens reduces the cap, meaning burned tokens cannot be re-minted. This ensures a non-increasing supply, suitable for use cases that require strict control over the token's total amount in circulation.
- **[Royalty Behavior](/03-api-reference/04-important-arguments.md#hasroyalty) -** Configures royalties for each marketplace sale of this token. Royalties are expressed via the `behavior` field on the token — set `behavior: { type: HAS_ROYALTY, royalties: [...] }`.
- **[Attributes](/03-api-reference/04-important-arguments.md#attributes) -** Add details to your token using key-value pairs. Standard keys like `name` and `description` allow applications to display your content correctly. You can also use the `URI` to link to a JSON file hosting your metadata. For more information, see the [Metadata Standard](/02-guides/01-platform/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md) page.

:::info Learn more about the arguments
For a comprehensive view and detail of all available arguments please refer to our [API Reference](/03-api-reference/03-api-reference.md).
:::

Once you're satisfied with the options, click the "**Create**" button to submit the request. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

Once your token is created, lets give it a new look by [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md)

## Option B. Using the Enjin API & SDKs

All on-chain actions go through the single `CreateTransaction` mutation. For creating a token, set the `createToken` field on the `transaction` input. `tokenId` is a flat `BigInt` scalar, and `cap` is optional — omit it to create a token with unlimited supply.

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"  # recipient of the initial supply
        collectionId: 2406         # collection to mint into
        tokenId: 1                 # the new token ID
        initialSupply: 1           # initial supply to mint
        listingForbidden: false    # set true to disallow marketplace listings
        infusion: 0                # ENJ infused per unit (use BigInt base units)
        anyoneCanInfuse: false
        # cap: omitted for unlimited supply
        # for a finite cap, use: cap: { type: SUPPLY, supply: 100 }
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
-d '{"query":"mutation CreateToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $initialSupply: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      createToken: {\r\n        recipient: $recipient\r\n        collectionId: $collectionId\r\n        tokenId: $tokenId\r\n        initialSupply: $initialSupply\r\n        listingForbidden: false\r\n        infusion: 0\r\n        anyoneCanInfuse: false\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","collectionId":2406,"tokenId":1,"initialSupply":1}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Define the token parameters
var tokenParams = new CreateTokenParams()
    .SetTokenId(new EncodableTokenIdInput().SetInteger(1)) //Set the token ID
    .SetInitialSupply(1) //Mint initial supply
    .SetCap(new TokenMintCap().SetType(TokenMintCapType.Infinite)); //Define supply type

// Setup the mutation
var createToken = new CreateToken()
    .SetRecipient("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f") //The recipient of the initial supply
    .SetCollectionId(2406) //Set the collection ID
    .SetParams(tokenParams); //Set the previously defined token params

// Define and assign the return data fragment to the mutation
var createTokenFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createToken.Fragment(createTokenFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateToken(createToken);
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

    // Setup mutation data
    shared_ptr<CreateTokenParams> tokenParams = make_shared<CreateTokenParams>();

    shared_ptr tokenId = make_shared<EncodableTokenIdInput>();
    tokenId->SetInteger(make_shared<SerializableString>("1"));

    shared_ptr<TokenMintCap> tokenMintCap = make_shared<TokenMintCap>();
    tokenMintCap->SetType(TokenMintCapType::Infinite);

    tokenParams->SetTokenId(tokenId);
    tokenParams->SetInitialSupply(make_shared<SerializableString>("1"));
    tokenParams->SetCap(tokenMintCap);

    // Setup mutation
    CreateToken createToken = CreateToken();
    createToken
        .SetRecipient(make_shared<SerializableString>("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"))
        .SetCollectionId(make_shared<SerializableString>("2406"))
        .SetParams(tokenParams);

    // Define and assign the return data fragment to the mutation
    shared_ptr<TransactionFragment> transactionFragment = make_shared<TransactionFragment>();
    transactionFragment
        ->WithId()
        .WithMethod()
        .WithState();

    createToken.SetFragment(transactionFragment);

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<shared_ptr<IPlatformResponse<GraphQlResponse<Transaction>>>> futureResponse = SendCreateToken(*client, createToken);

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
      mutation CreateToken(
        $recipient: String!
        $collectionId: BigInt!
        $tokenId: BigInt!
        $initialSupply: BigInt!
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
      initialSupply: 1
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
    mutation CreateToken(
      $recipient: String!
      $collectionId: BigInt!
      $tokenId: BigInt!
      $initialSupply: BigInt!
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
    initialSupply: 1
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
mutation CreateToken(
  $recipient: String!
  $collectionId: BigInt!
  $tokenId: BigInt!
  $initialSupply: BigInt!
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

Once it reaches `FINALIZED`, an event is emitted confirming the new token was created. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.

:::tip
For Token ID management, head to [Best Practices > TokenID Structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md)
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

In addition to the fields shown above, `createToken` accepts `cap`, `behavior` (currency / royalty configuration), `attributes`, and `groups` (token-group membership). To sign with a managed wallet instead of the Wallet Daemon, set `signerAccount` on `CreateTransaction`.
:::

:::tip What's next?
To add metadata to your token, go to the [Adding Metadata](/02-guides/01-platform/01-managing-tokens/03-adding-metadata.md) tutorial.
:::
