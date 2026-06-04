---
title: "Using Managed Wallets"
slug: "using-managed-wallets"
description: "Learn how to use managed wallets within the Enjin ecosystem, allowing for user-friendly blockchain wallet management and asset handling."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Managed wallets provide a seamless experience for your users by allowing you to create and manage blockchain wallets on their behalf. Users don't need to download any special apps or take extra steps, making it easier for them to get started with your application.

This approach offers transparency, allowing users to easily track their digital assets. It simplifies user onboarding and provides clear, immutable on-chain data for tracking tokens, enhancing trust and engagement within your platform.

Here's how the typical flow works:

1. **[Managed Wallet Creation](#creating-a-managed-wallet):** When a new user starts using your application, you initiate the creation of a managed wallet for them, and assign the user's internal ID from your database to the newly created managed wallet. This ensures a consistent link between the user and their wallet.
2. **[Asset Management](#minting-tokens-to-a-managed-wallet):** As the user earns or deposits digital assets within your application, these assets are automatically stored in their managed wallet.
3. **[In-App Transactions](#signing-transactions):** Any actions the user performs within your application that involve their wallet (e.g., spending tokens, participating in in-game economies) are executed directly on their managed wallet.
4. **[User Withdrawal (Optional)](#transferring-tokens-from-managed-wallets):** If a user decides they want to take full control of their assets, you can facilitate the transfer of all funds from their managed wallet to their own self-custodial wallet.

This process ensures that users can interact with blockchain assets seamlessly within your application without needing to understand the underlying complexities of blockchain technology or operating his own crypto wallet.

:::tip Building a real-time game?
A managed wallet can serve as a player's on-chain **cold inventory**. For fast-paced games where some items must be used the instant a player taps them (drinking a potion mid-fight), you can pair it with an off-chain **hot inventory** so consumption never waits on the chain. See [Hot & Cold Inventories](/02-guides/01-platform/03-advanced-mechanics/07-hot-cold-inventories.md) to understand the pattern.
:::

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.
You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to add to the wallet.
:::

---

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

## Creating a Managed Wallet {#creating-a-managed-wallet}

To create a managed wallet, run the `CreateManagedWallet` mutation with a unique ID as a parameter.

Choose a unique `externalId` for each player/user that can be cross-referenced later. This unique identifier should be something already associated with the player in your database, such as a player ID or username.
By doing so, you will be able to consistently link the Managed Wallet to the respective player.


<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateManagedWallet {
  CreateManagedWallet(externalId: "docs-example-player") #Replace this with a unique ID
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation CreateManagedWallet($externalId: String!) {\r\n  CreateManagedWallet(externalId: $externalId)\r\n}","variables":{"externalId":"docs-example-player"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the mutation
var createWallet = new CreateWallet()
    .SetExternalId("player_1_id");

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateWallet(createWallet);
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

    // Set up the query
    CreateWallet createWallet = CreateWallet()
            .SetExternalId(make_shared<SerializableString>("player_1_id"));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<bool>>> futureResponse = SendCreateWallet(*client, createWallet);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<bool>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<bool>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<bool>& getCreateWalletResult = gqlResult->GetData()->GetResult();

        std::cout << getCreateWalletResult.value() << std::endl;
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
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateManagedWallet($externalId: String!) {
        CreateManagedWallet(externalId: $externalId)
      }
    `,
    variables: {
      externalId: "docs-example-player" //Replace this with a unique ID
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
    mutation CreateManagedWallet($externalId: String!) {
      CreateManagedWallet(externalId: $externalId)
    }
  `,
  variables: {
    externalId: "docs-example-player" //Replace this with a unique ID
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation CreateManagedWallet($externalId: String!) {
  CreateManagedWallet(externalId: $externalId)
}
'''

variables = {
  'externalId': "docs-example-player" #Replace this with a unique ID
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::warning Lost database data?
Recreate the managed wallets by running the `CreateManagedWallet` mutation again for each of the `externalId`s.
Make sure to use the same Daemon wallet seed and password used to create the managed wallets prior, as managed wallets are derived with the following derivation path: `walletSeed/externalId///password`
:::

## Finding a Managed Wallet {#finding-a-managed-wallet}

Once a managed wallet is created, use the `GetManagedWallet` query to look it up by its `externalId` and retrieve its on-chain `publicKey`.

You'll need this public key to mint tokens to the wallet, and it can also be used to identify the wallet when signing transactions on its behalf.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetManagedWallet {
  GetManagedWallet(network: CANARY, chain: MATRIX, externalId: "docs-example-player") { #Specify the managed wallet's unique ID
    publicKey
    externalId
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"query GetManagedWallet($externalId: String!) {\r\n  GetManagedWallet(network: CANARY, chain: MATRIX, externalId: $externalId) {\r\n    publicKey\r\n    externalId\r\n  }\r\n}","variables":{"externalId":"docs-example-player"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Setup the query
var getWallet = new GetWallet()
    .SetExternalId("player_1_id");

// Define and assign the return data fragment to the query
var walletFragment = new WalletFragment()
    .WithAccount(new AccountFragment()
        .WithAddress()
        .WithPublicKey()
    );

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendGetWallet(getWallet);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreQueries.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    // Set up the query
    GetWallet getWallet = GetWallet()
            .SetExternalId(make_shared<SerializableString>("player_1_id"));

    // Define and assign the return data fragments to the query
    AccountFragment accountFragment = AccountFragment()
            .WithAddress()
            .WithPublicKey();
    WalletFragment walletFragment = WalletFragment()
            .WithAccount(make_shared<AccountFragment>(accountFragment));

    getWallet.SetFragment(make_shared<WalletFragment>(walletFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Wallet>>> futureResponse = SendGetWallet(*client, getWallet);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Wallet>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Wallet>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Wallet>& getWalletResult = gqlResult->GetData()->GetResult();

        std::cout << getWalletResult->GetAccount()->GetAddress().value() << std::endl;
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
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query GetManagedWallet($externalId: String!) {
        GetManagedWallet(network: CANARY, chain: MATRIX, externalId: $externalId) {
          publicKey
          externalId
        }
      }
    `,
    variables: {
      externalId: "docs-example-player" //Specify the managed wallet's unique ID
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
    query GetManagedWallet($externalId: String!) {
      GetManagedWallet(network: CANARY, chain: MATRIX, externalId: $externalId) {
        publicKey
        externalId
      }
    }
  `,
  variables: {
    externalId: "docs-example-player" //Specify the managed wallet's unique ID
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
query GetManagedWallet($externalId: String!) {
  GetManagedWallet(network: CANARY, chain: MATRIX, externalId: $externalId) {
    publicKey
    externalId
  }
}
'''

variables = {
  'externalId': "docs-example-player" #Specify the managed wallet's unique ID
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

**Response:**

```json
{
  "data": {
    "GetManagedWallet": {
      "publicKey": "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a",
      "externalId": "docs-example-player"
    }
  }
}
```

## Minting tokens to a Managed Wallet {#minting-tokens-to-a-managed-wallet}

With the managed wallet's public key in hand, you can mint tokens directly to it by setting it as the `recipient`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToManagedWallet {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a" #The managed wallet's public key, from the GetManagedWallet query
        collectionId: 36105 #Specify the collection ID
        tokenId: 1 #Token ID to mint
        amount: 1 #Amount to mint
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
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation MintToManagedWallet {\r\n  CreateTransaction(\r\n    network: CANARY\r\n    chain: MATRIX\r\n    transaction: {\r\n      mintToken: {\r\n        recipient: \"0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a\"\r\n        collectionId: 36105\r\n        tokenId: 1\r\n        amount: 1\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Create the list of recipients for the batch mint
var recipients = new List<MintRecipient>()
{
    new MintRecipient()
        .SetAccount("cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT")
        .SetMintParams(new MintTokenParams()
            .SetAmount(1)
            .SetTokenId(new EncodableTokenIdInput().SetInteger(6533)
            )
        )
};

// Setup the mutation
var batchMint = new BatchMint()
    .SetCollectionId(7154)
    .SetRecipients(recipients.ToArray());

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

batchMint.Fragment(transactionFragment);

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

    // Set up the transaction parameters
    EncodableTokenIdInput token1 = EncodableTokenIdInput()
            .SetInteger(make_shared<SerializableString>("6533"));

    MintTokenParams mintTokenParams = MintTokenParams()
            .SetAmount(make_shared<SerializableString>("1"))
            .SetTokenId(make_shared<EncodableTokenIdInput>(token1));

    MintRecipient mintRecipient = MintRecipient()
            .SetAccount(make_shared<SerializableString>("cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT"))
            .SetMintParams(make_shared<MintTokenParams>(mintTokenParams));

    vector<MintRecipient> recipients;
    recipients.push_back(mintRecipient);

    // Set up the mutation
    BatchMint batchMint = BatchMint()
            .SetCollectionId(make_shared<SerializableString>("7154"))
            .SetRecipients(make_shared<SerializableArray<MintRecipient>>(vector<MintRecipient>{mintRecipient}));

    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    batchMint.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendBatchMint(*client, batchMint);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& batchMintResult = gqlResult->GetData()->GetResult();

        std::cout << ToString(batchMintResult->GetMethod().value()) << std::endl;
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
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation MintToManagedWallet {
        CreateTransaction(
          network: CANARY
          chain: MATRIX
          transaction: {
            mintToken: {
              recipient: "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a" #The managed wallet's public key, from the GetManagedWallet query
              collectionId: 36105 #Specify the collection ID
              tokenId: 1 #Token ID to mint
              amount: 1 #Amount to mint
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `
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
    mutation MintToManagedWallet {
      CreateTransaction(
        network: CANARY
        chain: MATRIX
        transaction: {
          mintToken: {
            recipient: "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a" #The managed wallet's public key, from the GetManagedWallet query
            collectionId: 36105 #Specify the collection ID
            tokenId: 1 #Token ID to mint
            amount: 1 #Amount to mint
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation MintToManagedWallet {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a"
        collectionId: 36105
        tokenId: 1
        amount: 1
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

## Signing transactions as a Managed Wallet {#signing-transactions}

By default, every transaction the Enjin Platform creates is signed by your [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md). To act on a user's behalf instead, you can have the platform sign a transaction with that user's managed wallet.

Both `CreateTransaction` and `CreateBatchTransaction` accept two optional arguments for this:

- **`signerExternalId`** — the managed wallet's `externalId`. This is the most direct option, as you don't need to look the wallet's public key up first.
- **`signerAccount`** — the managed wallet's public key, as returned by [`GetManagedWallet`](#finding-a-managed-wallet).

Set either one, and the platform signs that transaction with the corresponding managed wallet instead of the Wallet Daemon. Because these arguments live on `CreateTransaction` itself, **any** on-chain action — a transfer, a listing, an attribute change, anything you set on the `transaction` input — can be performed as a managed wallet.

## Transferring tokens from a Managed Wallet {#transferring-tokens-from-managed-wallets}

If you followed along with the previous snippets of code, you should have a managed wallet with a token in it. To transfer it out to another wallet, set `signerExternalId` to the managed wallet and use the `transferToken` action.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferFromManagedWallet {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    signerExternalId: "docs-example-player" #The managed wallet that will sign this transaction
    transaction: {
      transferToken: {
        recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
        collectionId: 36105 #Specify the collection ID
        tokenId: 1 #Token ID to transfer
        amount: 1 #Amount to transfer
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
-H 'Authorization: Bearer enjin_api_key' \
-d '{"query":"mutation TransferFromManagedWallet {\r\n  CreateTransaction(\r\n    network: CANARY\r\n    chain: MATRIX\r\n    signerExternalId: \"docs-example-player\"\r\n    transaction: {\r\n      transferToken: {\r\n        recipient: \"cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ\"\r\n        collectionId: 36105\r\n        tokenId: 1\r\n        amount: 1\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Create the array of recipients for the batch transfer
var recipients = new List<TransferRecipient>()
{
    new TransferRecipient()
        .SetAccount("cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ") // The recipient of the transfer
        .SetSimpleParams(new SimpleTransferParams()
            .SetTokenId(new EncodableTokenIdInput().SetInteger(6533))
            .SetAmount(1)
        )
};

// Setup the mutation
var batchTransfer = new BatchTransfer()
    .SetCollectionId(7154)
    .SetSigningAccount("cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT") // Add your signing account address (the Managed wallet account address from the GetWallet query)
    .SetRecipients(recipients.ToArray());

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

batchTransfer.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.beta.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBatchTransfer(batchTransfer);
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

    // Set up the transaction paramters
    EncodableTokenIdInput token1 = EncodableTokenIdInput()
            .SetInteger(make_shared<SerializableString>("6533"));

    SimpleTransferParams simpleTransferParams = SimpleTransferParams()
            .SetAmount(make_shared<SerializableString>("1"))
            .SetTokenId(make_shared<EncodableTokenIdInput>(token1));

    TransferRecipient transferRecipient = TransferRecipient()
            .SetAccount(make_shared<SerializableString>("cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"))
            .SetSimpleParams(make_shared<SimpleTransferParams>(simpleTransferParams));

    vector<TransferRecipient> recipients;
    recipients.push_back(transferRecipient);

    // Set up the mutation
    BatchTransfer batchTransfer = BatchTransfer()
            .SetCollectionId(make_shared<SerializableString>("7154"))
            .SetSigningAccount(make_shared<SerializableString>("cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT"))
            .SetRecipients(make_shared<SerializableArray<TransferRecipient>>(recipients));

    TransactionFragment transactionFragment = TransactionFragment()
            .WithId()
            .WithMethod()
            .WithState();

    batchTransfer.SetFragment(make_shared<TransactionFragment>(transactionFragment));

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.beta.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<PlatformResponsePtr<GraphQlResponse<Transaction>>> futureResponse = SendBatchTransfer(*client, batchTransfer);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& batchTransferResult = gqlResult->GetData()->GetResult();

        std::cout << ToString(batchTransferResult->GetMethod().value()) << std::endl;
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
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation TransferFromManagedWallet {
        CreateTransaction(
          network: CANARY
          chain: MATRIX
          signerExternalId: "docs-example-player" #The managed wallet that will sign this transaction
          transaction: {
            transferToken: {
              recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
              collectionId: 36105 #Specify the collection ID
              tokenId: 1 #Token ID to transfer
              amount: 1 #Amount to transfer
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `
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
    mutation TransferFromManagedWallet {
      CreateTransaction(
        network: CANARY
        chain: MATRIX
        signerExternalId: "docs-example-player" #The managed wallet that will sign this transaction
        transaction: {
          transferToken: {
            recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
            collectionId: 36105 #Specify the collection ID
            tokenId: 1 #Token ID to transfer
            amount: 1 #Amount to transfer
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation TransferFromManagedWallet {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    signerExternalId: "docs-example-player"
    transaction: {
      transferToken: {
        recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
        collectionId: 36105
        tokenId: 1
        amount: 1
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Make sure `signerExternalId` (or `signerAccount`) is set to the managed wallet that holds the token being transferred.

Whether you're minting into a managed wallet or transferring out of one, the on-chain transaction emits the usual events on `FINALIZED` (e.g. `MultiTokens.Minted`, `MultiTokens.Transferred`) — with the managed wallet's address as the signer. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read them.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::