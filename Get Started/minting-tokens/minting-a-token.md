---
title: "Minting Tokens"
slug: "minting-a-token"
excerpt: "Start minting your token's supply. You can mint it straight into your players' wallets."
hidden: false
createdAt: "Fri Nov 10 2023 05:24:18 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:43:03 GMT+0000 (Coordinated Universal Time)"
---
Now that you've got your tokens created, it's time to start minting them into player wallets as they are earned. 

We call this "Play-to-Mint," giving players the power to create tokens themselves, which feels more rewarding. 

Plus, it keeps your processes more efficient by delivering tokens right to players' wallets without any unnecessary `transfer` transactions.

> 📘 What you'll need
> 
> - Some [ Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>> and <<glossary:Storage Deposit>>s.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) and a [Token](doc:create-a-token) to transfer.

**There are two ways to use the <<glossary:Create Asset>> functionalities:**

- [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
- [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to mint, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Mint**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1bf5645-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


Set the recipient, amount and Unit Price in the corresponding fields, and Click on "**Mint**"

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/75b1d4d-image.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]


The Transaction Request will then appear in the "**Transactions**" menu.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/80f838f-image.png",
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
        "https://files.readme.io/e0491fd-image.png",
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

## Option B. Using the GraphQL API / SDKs

The BatchMint mutation enables you to efficiently create multiple tokens within a single blockchain transaction. This process, known as batch minting, simplifies the minting of multiple tokens, reducing transaction fees and processing time.

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
```javascript Node.js
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

A WebSocket event will also be fired so you can pick up the transfer transaction in real time by listening to the app channel on the WebSocket.

> 📘 More Fields and Arguments Available!
> 
> While the examples here cover the core functionalities of the `BatchMint` mutation, there are a few more settings you can adjust. 
> 
> To view and understand all the available settings for the `BatchMint` mutation, refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `BatchMint` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=BatchMint).
> 
> This resource will guide you in tailoring the `BatchMint` mutation to your specific requirements.
> 
> For instance, instead of batch minting with the [MintParams](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/inputs/MintTokenParams) object, you can batch create new tokens with the [CreateParams](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/inputs/CreateTokenParams) object.

> 👍 You've minted a token!
> 
> What if you need to transfer a token? proceed to [Transferring Tokens](doc:simple-token-transfer).