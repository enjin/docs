---
title: "Minting Tokens"
slug: "minting-a-token"
description: "Enhance your blockchain assets by adding custom metadata, providing additional details and functionalities to your tokens."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now that you've got your tokens created, it's time to start minting them into player wallets as they are earned. 

We call this "Play-to-Mint," giving players the power to create tokens themselves, which feels more rewarding. 

Plus, it keeps your processes more efficient by delivering tokens right to players' wallets without any unnecessary `transfer` transactions.

:::info What you'll need:
- Some [ Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" /> and a deposit of 0.01 ENJ is required for the <GlossaryTerm id="token_account_deposit" />, for each new token holder.  
If the token has <GlossaryTerm id="enj_infusion" />, each new unit minted will require the same amount of ENJ to be infused.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
- A [Collection](/02-tutorials/01-managing-tokens/01-creating-collections.md) and a [Token](/02-tutorials/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to mint.
:::

**There are two ways to use the <GlossaryTerm id="create_asset" /> functionalities:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to mint, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Mint**" button.

![Minting a Token](./img/minting-a-token.gif)

Set the recipient and the amount in the corresponding fields, and Click on "**Mint**"

<p align="center">
  <img src={require('./img/mint-token-form.png').default} alt="Mint Token Form" />
</p>

The Transaction Request will then appear in the "**Transactions**" menu.

<p align="center">
  <img src={require('./img/mint-token-banner.png').default} width="600" alt="Mint Transaction Request Banner" />
</p>

![Pending Mint Transaction](./img/pending-mint-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

## Option B. Using the Enjin API & SDKs

The BatchMint mutation enables you to efficiently create multiple tokens within a single blockchain transaction. This process, known as batch minting, simplifies the minting of multiple tokens, reducing transaction fees and processing time.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchMint {
  BatchMint(
    collectionId: "7154" #Specify the collection ID
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
-d '{"query":"mutation BatchMint($collection_id: BigInt!) {\r\n  BatchMint(\r\n    collectionId: $collection_id\r\n    recipients: [\r\n      {\r\n        account: \"0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921\"\r\n        mintParams: {\r\n          amount: 1\r\n          tokenId: { integer: 6533 }\r\n        }\r\n      }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"collection_id":7154}}'
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
            .SetBaseAddress("https://platform.canary.enjin.io")
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
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BatchMint(
        $collection_id: BigInt!
      ) {
        BatchMint(
          collectionId: $collection_id
          recipients: [
            {
              account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
      collection_id: 7154 //Specify the collection ID
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
    mutation BatchMint(
      $collection_id: BigInt!
    ) {
      BatchMint(
        collectionId: $collection_id
        recipients: [
          {
            account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
    collection_id: 7154 //Specify the collection ID
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
mutation BatchMint(
  $collection_id: BigInt!
) {
  BatchMint(
    collectionId: $collection_id
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
  'collection_id': 7154 #Specify the collection ID
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

A WebSocket event will also be fired so you can pick up the transfer transaction in real time by listening to the app channel on the WebSocket.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

For instance, you'll find settings such as the ability to sign using a managed wallet with the `signingAccount` argument, or batch create tokens instead of minting existing ones with the `createParams` argument.
:::

:::tip You've minted a token!
What if you need to transfer a token? proceed to [Transferring Tokens](/02-tutorials/01-managing-tokens/05-transferring-tokens.md).
:::