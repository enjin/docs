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
You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to mint.
:::

**There are two ways to transfer a token:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

[Locate the token in the dashboard](/01-getting-started/04-using-the-enjin-platform.md#finding-tokens), click the **3 vertical dots** (**⋮**), then click "**Transfer**".

:::info Need to perform multiple transfers?
The Transfer form has a **+ Add to Batch** button — queue several transfers and submit them as a single batched transaction. See [Batching transactions](/01-getting-started/04-using-the-enjin-platform.md#batching-transactions) for the full flow.
:::

Fill in the recipient and amount in the corresponding fields.

![The Transfer Token form](/img/getting-started/v3-transfer-token-form.png)

Once you're satisfied with the options, click the "**Transfer**" button to submit the request. A **Transaction Submitted** modal appears with the new transaction's UUID and a **View Transaction** button that opens its row on the [Transactions](https://platform.beta.enjin.io/transactions) page.

Since this request requires a <GlossaryTerm id="transaction" />, it must be signed before it broadcasts.

- By default, transactions are signed automatically by the **Wallet Daemon**.
- To sign with a different account, expand **Transaction Options → Signing Account** on the form and provide a [Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) address.

## Option B. Using the Enjin API & SDKs

Transfers are split into three discriminator actions on `CreateTransaction`:

- `transferToken` — transfer a specific token between accounts.
- `transferEnj` — transfer ENJ (or cENJ on Canary) between accounts.
- `batchTransfer` — transfer multiple tokens from one collection to multiple recipients in a single transaction.

:::warning SDKs are not yet available
The C# and C++ SDK examples below are out of date and **will not work against the current Enjin Platform API**. This section will be updated once new SDKs are published. Until then, use the GraphQL, cURL, Javascript, Node.js, or Python examples.
:::

### Transferring an asset

Use the `transferToken` action to move a specific token from the signing account to another wallet.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      transferToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
        collectionId: 36105
        tokenId: 0
        amount: 1
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
-d '{"query":"mutation TransferToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      transferToken: {\r\n        recipient: $recipient\r\n        collectionId: $collectionId\r\n        tokenId: $tokenId\r\n        amount: $amount\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","collectionId":36105,"tokenId":0,"amount":1}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
            .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation TransferToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            transferToken: {
              recipient: $recipient
              collectionId: $collectionId
              tokenId: $tokenId
              amount: $amount
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
      collectionId: 36105,
      tokenId: 0,
      amount: 1
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
    mutation TransferToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          transferToken: {
            recipient: $recipient
            collectionId: $collectionId
            tokenId: $tokenId
            amount: $amount
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
    collectionId: 36105,
    tokenId: 0,
    amount: 1
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
mutation TransferToken($recipient: String!, $collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      transferToken: {
        recipient: $recipient
        collectionId: $collectionId
        tokenId: $tokenId
        amount: $amount
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
  'collectionId': 36105,
  'tokenId': 0,
  'amount': 1,
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

### Transferring ENJ token

To send ENJ (or cENJ on the Canary network) from one wallet to another, use the `transferEnj` action.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferEnj {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      transferEnj: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
        amount: 5000000000000000000  # 5 ENJ in base units (5 * 10^18)
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
-d '{"query":"mutation TransferEnj($recipient: String!, $amount: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      transferEnj: {\r\n        recipient: $recipient\r\n        amount: $amount\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","amount":"5000000000000000000"}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation TransferEnj($recipient: String!, $amount: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            transferEnj: {
              recipient: $recipient
              amount: $amount
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
      amount: "5000000000000000000"
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
    mutation TransferEnj($recipient: String!, $amount: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          transferEnj: {
            recipient: $recipient
            amount: $amount
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
    amount: "5000000000000000000"
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
mutation TransferEnj($recipient: String!, $amount: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      transferEnj: {
        recipient: $recipient
        amount: $amount
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
  'recipient': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
  'amount': "5000000000000000000",
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

:::info Key arguments
- **Calculating the `amount`**
  - The Platform accepts ENJ values in the **base unit** (integers), not decimal ENJ amounts. To calculate the correct input, **multiply your desired ENJ amount by 10^18** (1 quintillion).
  - **Formula:** `Desired ENJ` \* `1,000,000,000,000,000,000`
  - **Example:** To transfer **5 ENJ**, input `5000000000000000000`.
- **`keepAlive` flag** — `transferEnj` does not expose a `keepAlive` flag. If you need to send your full balance, send slightly less than the full balance to avoid reaping the source account. [Read more about account reaping](https://support.enjin.io/hc/en-gb/articles/16297132519569-What-is-the-Existential-Deposit).
:::

### Batch Transferring ENJ token

To send ENJ to multiple addresses in a single on-chain transaction, use `CreateBatchTransaction` with one `transferEnj` entry per recipient.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchTransferEnj {
  CreateBatchTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transactions: [
      { transferEnj: { recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", amount: 5000000000000000000 } }
      { transferEnj: { recipient: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", amount: 15250000000000000000 } }
    ]
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
-d '{"query":"mutation BatchTransferEnj($transactions: [TransactionInput!]!) {\r\n  CreateBatchTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transactions: $transactions\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"transactions":[{"transferEnj":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","amount":"5000000000000000000"}},{"transferEnj":{"recipient":"cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu","amount":"15250000000000000000"}}]}}'
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
    .SetBaseAddress("https://platform.beta.enjin.io")
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
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation BatchTransferEnj($transactions: [TransactionInput!]!) {
        CreateBatchTransaction(
          network: ENJIN
          chain: MATRIX
          transactions: $transactions
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      transactions: [
        { transferEnj: { recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", amount: "5000000000000000000" } },
        { transferEnj: { recipient: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", amount: "15250000000000000000" } }
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
    mutation BatchTransferEnj($transactions: [TransactionInput!]!) {
      CreateBatchTransaction(
        network: ENJIN
        chain: MATRIX
        transactions: $transactions
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    transactions: [
      { transferEnj: { recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", amount: "5000000000000000000" } },
      { transferEnj: { recipient: "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", amount: "15250000000000000000" } }
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
mutation BatchTransferEnj($transactions: [TransactionInput!]!) {
  CreateBatchTransaction(
    network: ENJIN
    chain: MATRIX
    transactions: $transactions
  ) {
    uuid
    action
    state
  }
}
'''

variables = {
  'transactions': [
    {'transferEnj': {'recipient': "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", 'amount': "5000000000000000000"}},
    {'transferEnj': {'recipient': "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu", 'amount': "15250000000000000000"}},
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

:::tip Batched token transfers
To transfer multiple tokens **from a single collection** to multiple recipients in one transaction, use the `batchTransfer` discriminator action: `{ collectionId, recipients: [{ account, tokenId, amount }] }`.
:::

:::tip Need to send a transaction request to user's wallet?
This can be done using Enjin Platform API & WalletConnect!
To learn more, check out the [Using WalletConnect page](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/02-using-wallet-connect.md).
:::

Once a transfer transaction reaches `FINALIZED`, a `MultiTokens.Transferred` event (for token transfers) or `Balances.Transfer` event (for ENJ transfers) is emitted with the sender, recipient, and amount — useful for reacting to inbound transfers in real time (e.g. unlocking an in-game item the moment a player receives the corresponding NFT). See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

To sign with a managed wallet instead of the Wallet Daemon, set `signerAccount` on `CreateTransaction` / `CreateBatchTransaction`.
:::
