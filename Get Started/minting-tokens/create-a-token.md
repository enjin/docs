---
title: "Creating Tokens"
slug: "create-a-token"
excerpt: "Before minting any token supply, you must first design the token itself."
hidden: false
createdAt: "Mon Nov 06 2023 01:12:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:42:18 GMT+0000 (Coordinated Universal Time)"
---
"<<glossary:Token>>s" are digital assets that can be traded, sold, or used on the Enjin Blockchain. 

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to process transactions and to add to the tokens' <<glossary:Backing Value>>.
> - A [Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) to place the tokens in.

Enjin Blockchain allows you to create customized <<glossary:Token ID>> structures. This flexibility enables you to organize your tokens in various ways that suit your needs.

- **For <<glossary:Fungible Tokens>> (<<glossary:FT>>s): **These tokens are identical in value and function, and therefore, they all share the same Token ID. This commonality in ID reflects their interchangeable nature. For instance, all units of a specific cryptocurrency like Bitcoin would have the same identification as they hold the same value and are indistinguishable from one another in terms of usage and worth.
- **For <<glossary:Non-Fungible Tokens>> (<<glossary:NFT>>s): **Every NFT has a unique Token ID that sets it apart from other tokens, even within the same collection. This unique ID is crucial for establishing the individuality and provenance of each NFT, which could represent anything from digital art to ownership rights over a virtual asset.

> 🚧 Token ID Structure [Best Practices](/docs/tokenid-structure)
> 
> Before minting the mainnet versions of your Tokens, that will be used in your live economy. Make sure to take a look at the [best practices for Token ID structure](/docs/tokenid-structure).

**There are two ways to use the <<glossary:Create Asset>> functionalities:**

- [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
- [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**". Then, click the "**[Create Token](https://platform.canary.enjin.io/create/token)**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/84322bf-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


From here, you can customize your collection's Mint Policy, Market Policy, Explicit Royalty Currencies (optional), and Attributes.

- **Create Token Section - ** Basic token options. Make sure to select the Collection ID you wish to mint the token in, the token ID, and the recipient in the corresponding fields.  
  Make sure to check out the [TokenID Structure Best Practices](doc:tokenid-structure).
- **Cap - **The token cap (if required).
- **Token Royalty Settings - **The market behavior for the token.
- **Attributes - ** Set the token details which are details stored in pairs, like a title and its content. Certain attributes, such as the `URI`, `name`, and `description`, have special roles that are understood by many platforms and marketplaces. If you're new, simply link to a JSON file that lists all the token's details. Make sure to check out the [Managing Metadata](/docs/managing-metadata) page.

Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to create the request.

The Transaction Request will then appear in the "**Transactions**" menu.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b44ceab-image.png",
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
        "https://files.readme.io/294a516-image.png",
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

Once your token is created, lets give it a new look by [Adding Metadata](doc:managing-metadata)

## Option B. Using the GraphQL API / SDKs

CreateToken mutation enables you to create a new token within an existing collection. This operation is essential for introducing new digital assets, and it allows you to define various attributes and characteristics for the newly created token.

```graphql
mutation CreateToken
(
  $recipient: String!
  $collection_id: BigInt!
  $token_id: BigInt
  $initial_supply: BigInt
  $cap: TokenMintCapType!
) {
  CreateToken(
    recipient: $recipient #The recipient of the initial supply
    collectionId: $collection_id #Set the collection ID
    params:{
      tokenId: {integer: $token_id} #Set the token ID
      initialSupply: $initial_supply #Mint initial supply
      cap: {type: $cap}} #Define supply type
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
      mutation CreateToken
      (
        $recipient: String!
        $collection_id: BigInt!
        $token_id: BigInt
        $initial_supply: BigInt
        $cap: TokenMintCapType!
      ) {
        CreateToken(
          recipient: $recipient #The recipient of the initial supply
          collectionId: $collection_id #Set the collection ID
          params:{
            tokenId: {integer: $token_id} #Set the token ID
            initialSupply: $initial_supply #Mint initial supply
            cap: {type: $cap}} #Define supply type
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
      collection_id: 2406,
      token_id: 0,
      initial_supply: 1,
      cap: "INFINITE"
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
    mutation CreateToken
    (
      $recipient: String!
      $collection_id: BigInt!
      $token_id: BigInt
      $initial_supply: BigInt
      $cap: TokenMintCapType!
    ) {
      CreateToken(
        recipient: $recipient #The recipient of the initial supply
        collectionId: $collection_id #Set the collection ID
        params:{
          tokenId: {integer: $token_id} #Set the token ID
          initialSupply: $initial_supply #Mint initial supply
          cap: {type: $cap}} #Define supply type
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collection_id: 2406,
    token_id: 0,
    initial_supply: 1,
    cap: "INFINITE"
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
  mutation CreateToken
  (
    $recipient: String!
    $collection_id: BigInt!
    $token_id: BigInt
    $initial_supply: BigInt
    $cap: TokenMintCapType!
  ) {
    CreateToken(
      recipient: $recipient #The recipient of the initial supply
      collectionId: $collection_id #Set the collection ID
      params:{
        tokenId: {integer: $token_id} #Set the token ID
        initialSupply: $initial_supply #Mint initial supply
        cap: {type: $cap}} #Define supply type
    ) {
      id
      method
      state
    }
  }
'''

variables = {
  'recipient': 'cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f',
  'collection_id': 2406,
  'token_id': 0,
  'initial_supply': 1,
  'cap': 'INFINITE'
}

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

A WebSocket event will also be fired so you can pick up the changes in real-time by listening to the app channel on the WebSocket.

> 🚧 For Token ID management, head to [Best Practices > TokenID Structure](/docs/tokenid-structure)

> 📘 More Fields and Arguments Available!
> 
> The examples here illustrate basic uses of the `CreateToken` mutation. However, this mutation supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for the `CreateToken` mutation, please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `CreateToken` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=CreateToken).
> 
> This resource will help you to fully utilize the capabilities of the `CreateToken` mutation and tailor it to your specific needs.
> 
> For instance, you'll find settings such as adding attributes/royalties/supply type and much more with the [CreateTokenParams](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/inputs/CreateTokenParams) object, or the ability to sign using a managed wallet with the `signingAccount` argument.

> 👍 To add metadata to your token, go to the [Adding Metadata](doc:adding-metadata) tutorial.