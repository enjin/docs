---
title: "Creating Collections"
slug: "create-a-collection"
excerpt: "Deploy a collection that you can fill with tokens."
hidden: false
createdAt: "Mon Nov 06 2023 01:05:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:41:53 GMT+0000 (Coordinated Universal Time)"
---
> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>> and <<glossary:Storage Deposit>>s.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

On Enjin Blockchain, every token must be placed inside a <<glossary:Collection>>. 

**There are two ways to use the <<glossary:Create Collection>> functionalities:**

1. [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
2. [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Collections](https://platform.enjin.io/collections)**". Then, click the "**[Create Collection](https://platform.enjin.io/create/collection)**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/678cb2c-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


From here, you can customize your collection's Mint Policy, Market Policy, Explicit Currencies (on option to delegate a token for <<glossary:Royalties>>), and Attributes.

- **Mint Policy - **The rules pertaining to token supply and number of tokens available to be minted in the future.
- **Market Policy - **Determines the rules which tokens in this collection must follow when interacting with the on-chain marketplace.
- **Explicit Royalty Currencies - **Choose which currencies are required to pay marketplace royalties for the tokens in this collection.
- **Attributes - ** Set the collection details which are details stored in pairs, like a title and its content. Certain attributes, such as the link (URI), name, and description, have special roles. If you're new, simply link to a JSON file that lists all the token's details.

Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to create the request.

The Transaction Request will then appear in the "**Transactions**" menu.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/77573bb-image.png",
        null,
        "Notification that appears after creating a transaction request"
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
        "https://files.readme.io/e2b1120-image.png",
        null,
        "Clicking `View` on the notification will take you to your Transactions List."
      ],
      "align": "center",
      "caption": "Clicking `View` on the notification will take you to your Transactions List."
    }
  ]
}
[/block]


Since this transaction is a <<glossary:Mutation>>, you will need to sign the transaction using your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

Once you've created a collection you're ready to start [Minting Tokens](https://enjin.readme.io/docs/minting-tokens).

## Option B. Using the GraphQL API / SDKs

The `CreateCollection` mutation is used to create a new on-chain collection. 

```graphql
mutation CreateCollection {
  CreateCollection(mintPolicy: { forceSingleMint: false }) { #Set to true to enforce single mint policy
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
      mutation CreateCollection ($forceSingleMint: Boolean!) {
        CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}) {
          id
          method
          state
        }
      }
    `,
    variables: {
      forceSingleMint: false //Set to true to enforce single mint policy
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
    mutation CreateCollection ($forceSingleMint: Boolean!) {
      CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}) {
        id
        method
        state
      }
    }
  `,
  variables: {
    forceSingleMint: false //Set to true to enforce single mint policy
  }
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
```python
import requests

query = '''
  mutation CreateCollection ($forceSingleMint: Boolean!) {
    CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}
    ) {
      id
      method
      state
    }
  }
'''

variables = {'forceSingleMint': False} #Set to True to enforce single mint policy

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

> 📘 More Fields and Arguments Available!
> 
> The examples here illustrate basic uses of the `CreateCollection` mutation. However, this mutation supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for the `CreateCollection` mutation, please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `CreateCollection` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=creatcollection).
> 
> This resource will help you to fully utilize the capabilities of the `CreateCollection` mutation and tailor it to your specific needs.
> 
> For instance, you'll find settings such as different supply types with the [MintPolicy](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/inputs/MintPolicy) object, or enforcing royalties with the [MarketPolicy](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/inputs/MarketPolicy) object.

A WebSocket event will also be fired so you can pick up the collection in real time by listening to the app channel on the WebSocket.

> 👍 You've created a collection, now [Fill it with Tokens](/docs/create-a-token)