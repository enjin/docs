---
title: "Using Managed Wallets"
slug: "using-managed-wallets"
description: "Learn how to use managed wallets within the Enjin ecosystem, allowing for user-friendly blockchain wallet management and asset handling."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Managed wallets offer a seamless user experience by allowing you to create blockchain wallets for your users without requiring them to download any apps or take additional steps. 

This transparency lets users easily track the movement of items in and out of their wallets, aiding in user onboarding and providing clear, immutable on-chain data to track their tokens.

:::info What you'll need:
- Some [Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" />.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
- A [Collection](/02-tutorials/01-managing-tokens/01-creating-collections.md) and a [Token](/02-tutorials/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to add to the wallet.
:::

## Create Managed Wallets

To create a Managed wallet, run the `CreateWallet` mutation, with a unique ID as a parameter.

Choose a unique `externalId` for each player/user that can be cross-referenced later. This unique identifier should be something already associated with the player in your database, such as a player ID or username.  
By doing so, you will be able to consistently link the Managed Wallet to the respective player.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateManagedWallet {
  CreateWallet(externalId: "player_1_id") #Replace this with a unique ID
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation CreateManagedWallet($external_id: String!) {\r\n  CreateWallet(externalId: $external_id)\r\n}","variables":{"externalId":"player_1_id"}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
            .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateManagedWallet($external_id: String!) {
        CreateWallet(externalId: $external_id)
      }
    `,
    variables: {
      externalId: "player_1_id" //Replace this with a unique ID
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
    mutation CreateManagedWallet($external_id: String!) {
      CreateWallet(externalId: $external_id)
    }
  `,
  variables: {
    externalId: "player_1_id" //Replace this with a unique ID
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
mutation CreateManagedWallet($external_id: String!) {
  CreateWallet(externalId: $external_id)
}
'''

variables = {
  'externalId': "player_1_id" #Replace this with a unique ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::warning Lost database data?
Recreate the Managed wallets by running `CreateWallet` mutation again for each of the `externalId`s.  
Make sure to use the same Daemon wallet seed and password used to create Managed wallets prior, as Managed wallets are derived with the following derivation path: `walletSeed/externalId///password`
:::

## Interact with Managed Wallets

Once the Managed wallet is created, you can provide the `externalId` field of the Wallet object to any query or mutation that accepts a `Wallet.externalId` parameter, in order to use a Managed wallet instead of any other wallet.

Lets look at the `GetWallet` query as an example, to [get the Public Key of an account](/02-tutorials/01-managing-tokens/09-fetching-token-holders.md), we use the account's address. `account: "address_here"`

However, to get the Public Key of a `Managed wallet`, we provide the `Wallet.externalId` parameter instead.

**Query:**

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetManagedWalletPublicKey {
  GetWallet(externalId: "player_1_id") { #Specify the managed wallet unique ID
    account {
      address
      publicKey
    }
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"query GetManagedWalletPublicKey($external_id: String!) {\r\n  GetWallet(externalId: $external_id) {\r\n    account {\r\n      address\r\n      publicKey\r\n    }\r\n  }\r\n}","variables":{"externalId":"player_1_id"}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
            .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query GetManagedWalletPublicKey($external_id: String!) {
        GetWallet(externalId: $external_id) {
          account {
            address
            publicKey
          }
        }
      }
    `,
    variables: {
      externalId: "player_1_id" //Specify the managed wallet unique ID
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
    query GetManagedWalletPublicKey($external_id: String!) {
      GetWallet(externalId: $external_id) {
        account {
          address
          publicKey
        }
      }
    }
  `,
  variables: {
    externalId: "player_1_id" //Specify the managed wallet unique ID
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
query GetManagedWalletPublicKey($external_id: String!) {
  GetWallet(externalId: $external_id) {
    account {
      address
      publicKey
    }
  }
}
'''

variables = {
  'externalId': "player_1_id" #Specify the managed wallet unique ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

**Response:**

```json
{
  "data": {
    "GetWallet": {
      "account": {
        "address": "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT", //Account address for Managed wallet ID "player_1_id"
        "publicKey": "0x92f33d3efd6af37798b125cba08e21fc7b404293f12c067f1cb6ab326775ff08"
      }
    }
  }
}
```

## Minting tokens to Managed wallets

With the acquired Managed wallet address, you can mint tokens directly to the Managed wallet.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchMint {
  BatchMint(
    collectionId: 7154 #Specify the collection ID
    recipients: [
      {
        account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" #The recipient of the mint (the Managed wallet account address from the GetWallet query)
        mintParams: {
          amount:1 #Amount to mint
          tokenId: {integer: 6533} #Token ID to mint
        }
    	}
    ]
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
-d '{"query":"mutation BatchMint($collection_id: BigInt!) {\r\n  BatchMint(\r\n    collectionId: $collection_id\r\n    recipients: [\r\n      {\r\n        account: \"cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT\" #The recipient of the mint (the Managed wallet account address from the GetWallet query)\r\n        mintParams: {\r\n          amount: 1 #Amount to mint\r\n          tokenId: { integer: 6533 } #Token ID to mint\r\n        }\r\n      }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":7154}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
            .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BatchMint($collection_id: BigInt!) {
        BatchMint(
          collectionId: $collection_id
          recipients: [
            {
              account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" #The recipient of the mint (the Managed wallet account address from the GetWallet query)
              mintParams: {
                amount:1 #Amount to mint
                tokenId: {integer: 6533} #Token ID to mint
              }
            }
          ]
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 7154 //Specify the managed wallet unique ID
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
    mutation BatchMint($collection_id: BigInt!) {
      BatchMint(
        collectionId: $collection_id
        recipients: [
          {
            account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" #The recipient of the mint (the Managed wallet account address from the GetWallet query)
            mintParams: {
              amount:1 #Amount to mint
              tokenId: {integer: 6533} #Token ID to mint
            }
          }
        ]
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 7154 //Specify the managed wallet unique ID
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
mutation BatchMint($collection_id: BigInt!) {
  BatchMint(
    collectionId: $collection_id
    recipients: [
      {
        account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" #The recipient of the mint (the Managed wallet account address from the GetWallet query)
        mintParams: {
          amount:1 #Amount to mint
          tokenId: {integer: 6533} #Token ID to mint
        }
    	}
    ]
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 7154 #Specify the managed wallet unique ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

## Transferring tokens from managed wallets

If you followed along the previous snippets of code, you should have a Managed wallet with a token in it. To transfer it out to another wallet, we can use the `BatchTransfer` mutation.

:::info Signing transactions using a managed wallet
It's important to note that every mutation that accepts a `signingAccount` argument can be used to sign the transaction using a managed wallet, as shown in the batch transfer tutorial below.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchTransfer {
  BatchTransfer(
    collectionId: 7154 #Specify the collection ID
    signingAccount: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" # Add your signing account address (the Managed wallet account address from the GetWallet query)
    recipients: [
      {
        account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
        simpleParams: {
          tokenId: { integer: 6533 } #Token ID to transfer
          amount: 1 #Amount to transfer
        }
      }
    ]
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
-d '{"query":"mutation BatchTransfer($collection_id: BigInt!, $signing_account: String!) {\r\n  BatchTransfer(\r\n    collectionId: $collection_id\r\n    signingAccount: $signing_account\r\n    recipients: [\r\n      {\r\n        account: \"cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ\" #The recipient of the transfer\r\n        simpleParams: {\r\n          tokenId: { integer: 6533 } #Token ID to transfer\r\n          amount: 1 #Amount to transfer\r\n        }\r\n      }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":7154,"signing_account":"cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT"}}'
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
    .SetBaseAddress("https://platform.canary.enjin.io")
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
            .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BatchTransfer
      (
        $collection_id: BigInt!
        $signing_account: String!
      ) {
        BatchTransfer(
          collectionId: $collection_id
          signingAccount: $signing_account
          recipients: [
            {
              account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
              simpleParams: {
                tokenId: { integer: 6533 } #Token ID to transfer
                amount: 1 #Amount to transfer
              }
            }
          ]
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 7154, //Specify the collection ID
      signing_account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" //Add your signing account address (the Managed wallet account address from the GetWallet query)
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
    mutation BatchTransfer
    (
      $collection_id: BigInt!
      $signing_account: String!
    ) {
      BatchTransfer(
        collectionId: $collection_id
        signingAccount: $signing_account
        recipients: [
          {
            account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
            simpleParams: {
              tokenId: { integer: 6533 } #Token ID to transfer
              amount: 1 #Amount to transfer
            }
          }
        ]
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 7154, //Specify the collection ID
    signing_account: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" //Add your signing account address (the Managed wallet account address from the GetWallet query)
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
mutation BatchTransfer
(
  $collection_id: BigInt!
  $signing_account: String!
) {
  BatchTransfer(
    collectionId: $collection_id
    signingAccount: $signing_account
    recipients: [
      {
        account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
        simpleParams: {
          tokenId: { integer: 6533 } #Token ID to transfer
          amount: 1 #Amount to transfer
        }
      }
    ]
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 7154, #Specify the collection ID
  'signing_account': "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" #Add your signing account address (the Managed wallet account address from the GetWallet query)
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Make sure that `signingAccount` is set to the Managed Wallet address that owns that token.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::