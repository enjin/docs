---
title: "Transferring Tokens"
slug: "simple-token-transfer"
excerpt: "Start moving tokens between wallets."
hidden: false
createdAt: "Mon Nov 06 2023 04:21:29 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:43:11 GMT+0000 (Coordinated Universal Time)"
---
You will need to transfer tokens for:

- Implementing various gameplay features such as gifting, trading, and rewards.
- Supporting secure and efficient token transactions.
- Providing a seamless user experience by allowing token transfers without leaving the game environment.

> 📘 What you'll need
> 
> - Some [ Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) and a [Token](doc:create-a-token) to transfer.

> 🚧 Keep Alive: False
> 
> When transferring tokens you've created using the Enjin Platform, always set `keepAlive` to `False`.
> 
> This flag only relates to your Enjin Coin balance and has no impact on any other token on the network.

**There are two ways to transfer a token:**

1. [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
2. [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to transfer, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Transfer**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c0a4202-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 Need to perform multiple transfers?
> 
> Click on the "**Batch**" button, followed by "**Batch Transfer**".

Fill in the recipient, amount, and other optional arguments in the corresponding fields.  
Once you're satisfied with the options, click on the "**Transfer**" button at the bottom right corner to create the request.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c59557e-image.png",
        null,
        "Transfer Token form on Enjin Platform"
      ],
      "align": "center",
      "sizing": "400px",
      "caption": "Transfer Token form on Enjin Platform"
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a64aa1d-image.png",
        null,
        "A notification appears after you create a <<glossary:Mutation>>."
      ],
      "align": "center",
      "caption": "A notification appears after you create a <<glossary:Mutation>>."
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/11a664d-image.png",
        null,
        "Clicking \"**View**\" on the notification will take you to your Transactions List."
      ],
      "align": "center",
      "caption": "Clicking \"**View**\" on the notification will take you to your Transactions List."
    }
  ]
}
[/block]


Since this transaction is a <<glossary:Mutation>>, you will need to sign the transaction using your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

If you're looking to distribute tokens to your community or players, but don't have their account addresses, don't worry! Our solution is Enjin Beam.  
Proceed to the [Distributing Tokens via QR](doc:creating-an-enjin-beam) tutorial to learn more.

## Option B. Using the GraphQL API / SDKs

SimpleTransferToken mutation simplifies the process of transferring a specific token from one wallet to another. It is a straightforward way to facilitate token transfers without the need for complex intermediary steps.

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
```cplusplus C++ SDK

```
```csharp C# SDK

```
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
```javascript Node.js
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

A WebSocket event will also be fired so you can pick up the transfer transaction in real time by listening to the app channel on the WebSocket.

> 📘 More Fields and Arguments Available!
> 
> While the examples here cover the core functionalities of the `SimpleTransferToken` mutation, there are a few more settings you can adjust. 
> 
> To view and understand all the available settings for the `SimpleTransferToken` mutation, refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `SimpleTransferToken` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=SimpleTransferToken).
> 
> This resource will guide you in tailoring the `SimpleTransferToken` mutation to your specific requirements.
> 
> For instance, by setting the `keepAlive` argument to true, you ensure that the sender's token count won't drop to zero. This could be useful in very specific scenarios. For example, when a player sends a token representing a key, and all users must have at least one key at all times.

> 👍 Proceed to the [Distributing Tokens via QR](/docs/creating-an-enjin-beam) tutorial to learn more.
> 
> Distribute tokens to your players, even if they don't have wallets!