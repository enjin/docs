---
title: "Transferring Tokens"
slug: "transferring-tokens"
description: "Find out how to securely transfer tokens between users or platforms using the Enjin Platform, ensuring safe and efficient asset movement."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You will need to transfer tokens for:

- Implementing various gameplay features such as gifting, trading, and rewards.
- Supporting secure and efficient token transactions.
- Providing a seamless user experience by allowing token transfers without leaving the game environment.

:::info What you'll need:
- Some [ Enjin Coin](/06-enjin-products/02-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" /> and a deposit of 0.01 ENJ is required for the <GlossaryTerm id="token_account_deposit" />, for each new token holder.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to mint.
:::

**There are two ways to transfer a token:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to transfer, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Transfer**" button.

![Transferring Token](/img/guides/managing-tokens/transferring-token.gif)

:::info Need to perform multiple transfers?
Click on the "**Batch**" button, followed by "**Batch Transfer**".
:::

Fill in the recipient, amount, and other optional arguments in the corresponding fields.  
Once you're satisfied with the options, click on the "**Transfer**" button at the bottom right corner to create the request.

<p align="center">
  <img src={require('/img/guides/managing-tokens/transfer-token-form.png').default} alt="Transfer Token Form" />
</p>

<p align="center">
  <img src={require('/img/guides/managing-tokens/transfer-token-banner.png').default} width="600" alt="Transfer Token Transaction Banner" />
</p>

![Pending Transfer Transaction](/img/guides/managing-tokens/pending-transfer-txn.png)
Clicking "**View**" on the notification will take you to your Transactions List.

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

If you're looking to distribute tokens to your community or players, but don't have their account addresses, don't worry! Our solution is Enjin Beam.  
Proceed to the [Distributing Tokens via QR](/02-guides/01-platform/01-managing-tokens/06-create-qr-drops.md) tutorial to learn more.

## Option B. Using the Enjin API & SDKs

### Transferring an asset

`SimpleTransferToken` mutation simplifies the process of transferring a specific token from one wallet to another. It is a straightforward way to facilitate token transfers without the need for complex intermediary steps.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferToken{
  SimpleTransferToken(
    collectionId: 36105 #Specify the collection ID
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the recipent address
    params: {
      tokenId: {integer: 0} #Specify the token ID
      amount: 1 #Choose the transfer amount
    }
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
-d '{"query":"mutation TransferToken(\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt!\r\n  $recipient: String!\r\n  $amount: BigInt!\r\n) {\r\n  SimpleTransferToken(\r\n    collectionId: $collection_id\r\n    recipient: $recipient\r\n    params: { tokenId: { integer: $token_id }, amount: $amount }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"collection_id":36105,"token_id":0,"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","amount":1}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Define the simple transfer parameters
var simpleTransferParams = new SimpleTransferParams()
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0))
    .SetAmount(1);


// Setup the mutation
var simpleTransferToken = new SimpleTransferToken()
  	.SetRecipient("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f")
    .SetCollectionId(36105)
    .SetParams(simpleTransferParams);

// Define and assign the return data fragment to the mutation
var simpleTransferTokenFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

simpleTransferToken.Fragment(simpleTransferTokenFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendSimpleTransferToken(simpleTransferToken);
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

    // Define the simple transfer params
    shared_ptr tokenId = make_shared<EncodableTokenIdInput>();
    tokenId->SetInteger(make_shared<SerializableString>("0"));

    SimpleTransferParams simpleTransferParams = SimpleTransferParams()
            .SetAmount(make_shared<SerializableString>("1"))
            .SetTokenId(tokenId);

    // Setup mutation
    SimpleTransferToken simpleTransferToken = SimpleTransferToken()
            .SetRecipient(make_shared<SerializableString>("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"))
            .SetCollectionId(make_shared<SerializableString>("36105"))
            .SetParams(make_shared<SimpleTransferParams>(simpleTransferParams));

    // Define and assign the return data fragment to the mutation
    shared_ptr<TransactionFragment> transactionFragment = make_shared<TransactionFragment>();
    transactionFragment
        ->WithId()
        .WithMethod()
        .WithState();

    simpleTransferToken.SetFragment(transactionFragment);

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<shared_ptr<IPlatformResponse<GraphQlResponse<Transaction>>>> futureResponse = SendSimpleTransferToken(*client, simpleTransferToken);

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
      mutation TransferToken(
        $collection_id: BigInt!
        $token_id: BigInt!
        $recipient: String!
        $amount: BigInt!
      ) {
        SimpleTransferToken(
          collectionId: $collection_id
          recipient: $recipient
          params: {
            tokenId: {integer: $token_id}
            amount: $amount
          }
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
      recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
      amount: 1 //Choose the transfer amount
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
    mutation TransferToken(
      $collection_id: BigInt!
      $token_id: BigInt!
      $recipient: String!
      $amount: BigInt!
    ) {
      SimpleTransferToken(
        collectionId: $collection_id
        recipient: $recipient
        params: {
          tokenId: {integer: $token_id}
          amount: $amount
        }
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
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
    amount: 1 //Choose the transfer amount
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
mutation TransferToken(
  $collection_id: BigInt!
  $token_id: BigInt!
  $recipient: String!
  $amount: BigInt!
) {
  SimpleTransferToken(
    collectionId: $collection_id
    recipient: $recipient
    params: {
      tokenId: {integer: $token_id}
      amount: $amount
    }
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
  'recipient': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", #Specify the recipent address
  'amount': 1 #Choose the transfer amount
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Transferring ENJ token

To send ENJ / CENJ tokens from one wallet to another, use the `TransferAllowDeath` mutation, or the `TransferKeepAlive` if you want to make sure the account doesn't get reaped ([Read more about account reaping](https://support.enjin.io/hc/en-gb/articles/16297132519569-What-is-the-Existential-Deposit)):

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferENJTokens {
  TransferKeepAlive(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #Specify the recipent address
    amount: 5000000000000000000 #Specify the amount of tokens to transfer
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
-d '{"query":"mutation TransferENJTokens(\r\n  $recipient: String!\r\n  $amount: BigInt!\r\n  $keep_alive: Boolean\r\n) {\r\n  TransferBalance(\r\n    recipient: $recipient\r\n    amount: $amount\r\n    keepAlive: $keep_alive\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","amount":1,"keep_alive":true}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the mutation
var transferKeepAlive = new TransferKeepAlive()
    .SetRecipient("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f") //The recipient of the initial supply
    .SetAmount(5000000000000000000); //The amount of tokens to transfer

// Define and assign the return data fragment to the mutation
var transferKeepAliveFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

transferKeepAlive.Fragment(transferKeepAliveFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendTransferKeepAlive(transferKeepAlive);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation TransferKeepAlive(
        $recipient: String!
        $amount: BigInt!
      ) {
        TransferBalance(
          recipient: $recipient
          amount: $amount
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
      amount: 1 //Specify the amount of tokens to transfer
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
    mutation TransferKeepAlive(
        $recipient: String!
        $amount: BigInt!
      ) {
        TransferBalance(
          recipient: $recipient
          amount: $amount
        ){
          id
          method
          state
        }
      }
  `,
  variables: {
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
    amount: 1 //Specify the amount of tokens to transfer
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
mutation TransferKeepAlive(
  $recipient: String!
  $amount: BigInt!
) {
  TransferBalance(
    recipient: $recipient
    amount: $amount
  ){
    id
    method
    state
  }
}
'''

variables = {
  'recipient': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", #Specify the recipent address
  'amount': 1 #Specify the amount of tokens to transfer
  
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::info **Notes:**
- `amount` argument
  - In the `TransferBalance` mutation, the `amount` argument is denoted in `u128`. This means that the number you specify is divided by 10^18 to determine the actual amount of ENJ to be transferred.  
    In the example above, an `amount` of `5000000000000000000` will actually send 5 ENJ. Keep this in mind when specifying the `amount` in your mutations.
- `keepAlive` argument
  - Set to true if you want to make sure the account doesn't get reaped.  
    Learn more about keepAlive argument [here](/03-api-reference/04-important-arguments.md#keepalive)
:::

### Batch Transferring ENJ token

To send ENJ / CENJ tokens from one wallet to multiple addresses or in multiple transactions, we use the `BatchTransferBalance` mutation

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSendENJ{
  BatchTransferBalance(
    recipients: [
      {
        account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", #Specify the recipent address
        transferBalanceParams: {
          value: 5000000000000000000 #Specify the amount of tokens to transfer
        }
      },
      {
        account: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", #Specify the recipent address
        transferBalanceParams: {
          value: 15250000000000000000 #Specify the amount of tokens to transfer
          keepAlive: true #Set to true if you want to make sure the account doesn't get reaped
        }
      },
    ]
  ){
    id
    transactionId
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
-d '{"query":"mutation BatchSendENJ($recipients: [TransferRecipient!]!) {\r\n  BatchTransferBalance(recipients: $recipients) {\r\n    id\r\n    transactionId\r\n    state\r\n  }\r\n}\r\n","variables":{"recipients":[{"account":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","transferBalanceParams":{"value":5000000000000000000}},{"account":"cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu","transferBalanceParams":{"value":15250000000000000000,"keepAlive":true}}]}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the transfers for the batch
var transferBalanceParams1 = new TransferBalanceParams()
    .SetValue(5000000000000000000); //The amount of tokens to transfer

var transferBalanceParams2 = new TransferBalanceParams()
    .SetValue(5000000000000000000) //The amount of tokens to transfer
    .SetKeepAlive(true); //Whether the transaction will be kept from failing if the balance drops below the minimum requirement

var transferRecipients = new[]
{
    new TransferRecipient()
        .SetAccount("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f")
        .SetTransferBalanceParams(transferBalanceParams1),
    new TransferRecipient()
        .SetAccount("cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu")
        .SetTransferBalanceParams(transferBalanceParams2)
};

// Set up the mutation
var batchTransferBalance = new BatchTransferBalance()
    .SetRecipients(transferRecipients);

// Define and assign the return data fragment to the mutation
var transferBalanceFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

batchTransferBalance.Fragment(transferBalanceFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBatchTransferBalance(batchTransferBalance);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work In Progress
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BatchSendENJ($recipients: [TransferRecipient!]!){
        BatchTransferBalance(
          recipients: $recipients
        ){
          id
          transactionId
          state
        }
      }
    `,
    variables: {
  		recipients:[
        {
          account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
          transferBalanceParams: { value: 5000000000000000000 } //Specify the amount of tokens to transfer
        },
        {
          account: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", //Specify the recipent address
          transferBalanceParams: {
            value: 15250000000000000000, //Specify the amount of tokens to transfer
            keepAlive: true //Set to true if you want to make sure the account doesn't get reaped
          }
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation BatchSendENJ($recipients: [TransferRecipient!]!){
        BatchTransferBalance(
          recipients: $recipients
        ){
          id
          transactionId
          state
        }
      }
  `,
  variables: {
    recipients:[
      {
        account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", //Specify the recipent address
        transferBalanceParams: { value: 5000000000000000000 } //Specify the amount of tokens to transfer
      },
      {
        account: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", //Specify the recipent address
        transferBalanceParams: {
          value: 15250000000000000000, //Specify the amount of tokens to transfer
          keepAlive: true //Set to true if you want to make sure the account doesn't get reaped
        }
      }
    ]
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
mutation BatchSendENJ($recipients: [TransferRecipient!]!){
  BatchTransferBalance(
    recipients: $recipients
  ){
    id
    transactionId
    state
  }
}
'''

variables = {
  'recipients':[
    {
      'account': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", #Specify the recipent address
      'transferBalanceParams': { 'value': 5000000000000000000 } #Specify the amount of tokens to transfer
    },
    {
      'account': "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", #Specify the recipent address
      'transferBalanceParams': {
        'value': 15250000000000000000, #Specify the amount of tokens to transfer
        'keepAlive': True #Set to true if you want to make sure the account doesn't get reaped
      }
    }
  ]
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

:::tip Need to send a transaction request to user's wallet?
This can be done using Enjin Platform API & WalletConnect!  
To learn more, check out the [Using WalletConnect page](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/01-using-wallet-connect.md).
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.  
For instance, you'll find settings such as `continueOnFailure` to skip data that would cause the whole batch to fail, or the ability to sign using a managed wallet with the `signingAccount` argument.
:::

:::What's next?
Distribute tokens to your players, even if they don't have wallets!
Proceed to the [Distributing Tokens via QR](/02-guides/01-platform/01-managing-tokens/06-create-qr-drops.md) tutorial to learn more.
:::