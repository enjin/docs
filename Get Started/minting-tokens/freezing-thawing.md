---
title: "Freezing & Thawing"
slug: "freezing-thawing"
excerpt: "Put a temporary or permanent stop to token transfers."
hidden: false
createdAt: "Mon Nov 06 2023 04:00:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:44:00 GMT+0000 (Coordinated Universal Time)"
---
"Freezing" refers to the process of temporarily suspending the transferability of a collection or a specific token. 

This action provides you greater control over the movement of assets, enhancing security and enabling unique use-cases.

One such use-case is the implementation of "Soulbound" tokens. A Soulbound token is bound to a specific address and cannot be transferred out of the wallet it's minted on. This feature can be used to create unique gameplay mechanics, loyalty rewards, and more.

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) or a [Token](doc:create-a-token) to freeze.

**There are two ways to Freeze / Thaw:**

1. [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
2. [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

> 📘 Note: Applying Freeze/Thaw Actions to Collections and Tokens
> 
> This tutorial illustrates the process of freezing a collection.
> 
> However, the same steps can be applied to freeze or thaw tokens.
> 
> Simply navigate to the corresponding menu for tokens instead of collections, or for thawing instead of freezing.

### Freezing an entire collection

In the Platform menu, navigate to "**[Collections](https://platform.canary.enjin.io/collections)**".  
**Locate the collection** you wish to freeze, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Freeze**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c3fb364-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


Choose the freeze state, and click on the "**Freeze**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/13a2258-image.png",
        null,
        "Freeze form on Enjin Platform"
      ],
      "align": "center",
      "caption": "Freeze form on Enjin Platform"
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
        "https://files.readme.io/c91089b-image.png",
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
        "https://files.readme.io/8f951a5-image.png",
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

### Freezing a Collection or Token

By freezing a collection, all tokens within that collection will be frozen, meaning they cannot be burned or transferred out of the wallet they're currently in.

### Freezing an entire collection

Use the `Freeze` mutation and the `freezeType: COLLECTION` argument to freeze a collection.

```graphql
mutation FreezeCollection{
  Freeze(
    collectionId: 36105 #Specify the collection ID
    freezeType: COLLECTION #For collection freezing
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
      mutation FreezeCollection
      (
        $collection_id: BigInt!
        $freeze_type: FreezeType!
      )  {
        Freeze(
          collectionId: $collection_id 
          freezeType: $freeze_type
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      freeze_type: "COLLECTION" //For collection freezing
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
    mutation FreezeCollection
    (
      $collection_id: BigInt!
      $freeze_type: FreezeType!
    )  {
      Freeze(
        collectionId: $collection_id 
        freezeType: $freeze_type
      ){
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    freeze_type: "COLLECTION" //For collection freezing
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
mutation FreezeCollection
(
  $collection_id: BigInt!
  $freeze_type: FreezeType!
)  {
  Freeze(
    collectionId: $collection_id 
    freezeType: $freeze_type
  ){
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'freeze_type': "COLLECTION" #For collection freezing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Once the transaction is executed, all tokens within the specified collection will be frozen.

### Freezing a single token

Use the `Freeze` mutation and the `freezeType: TOKEN` argument to freeze a token.

```graphql
mutation FreezeToken{
  Freeze(
    collectionId: 36105 #Specify the collection ID
    tokenId:{integer: 0} #Specify the token ID
    freezeType: TOKEN #For token freezing
    freezeState: TEMPORARY #Select the freeze state
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
      mutation FreezeToken
      (
        $collection_id: BigInt!
        $token_id: BigInt!
        $freeze_type: FreezeType!
        $freeze_state: FreezeStateType

      ) {
        Freeze(
          collectionId: $collection_id
          tokenId:{integer: $token_id}
          freezeType: $freeze_type
          freezeState: $freeze_state
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
      freeze_type: "TOKEN", //For token freezing
      freeze_state: "TEMPORARY" //Select the freeze state
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
    mutation FreezeToken
    (
      $collection_id: BigInt!
      $token_id: BigInt!
      $freeze_type: FreezeType!
      $freeze_state: FreezeStateType

    ) {
      Freeze(
        collectionId: $collection_id
        tokenId:{integer: $token_id}
        freezeType: $freeze_type
        freezeState: $freeze_state
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
    freeze_type: "TOKEN", //For token freezing
    freeze_state: "TEMPORARY" //Select the freeze state
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
mutation FreezeToken
(
  $collection_id: BigInt!
  $token_id: BigInt!
  $freeze_type: FreezeType!
  $freeze_state: FreezeStateType
  
) {
  Freeze(
    collectionId: $collection_id
    tokenId:{integer: $token_id}
    freezeType: $freeze_type
    freezeState: $freeze_state
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
  'freeze_type': "TOKEN", #For token freezing
  'freeze_state': "TEMPORARY" #Select the freeze state
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Once the transaction is executed, the specified token will be frozen.

### Thawing a Collection or Token

Thawing a collection means allowing all tokens within that collection to be active again, so they can be transferred or burned as desired, removing the restrictions that kept them locked in a particular wallet.

### Thawing an entire collection

By thawing a collection, all tokens within that collection will be thawed, meaning they can be burned and transferred out of the wallet they're currently in.

Use the `Thaw` mutation and the `freezeType: COLLECTION` argument to thaw a collection.

```graphql
mutation ThawCollection{
  Thaw(
    collectionId: 36105 #Specify the collection ID
    freezeType: COLLECTION #For collection thawing
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
      mutation ThawCollection
      (
        $collection_id: BigInt!
        $freeze_type: FreezeType!
      ) {
        Thaw(
          collectionId: $collection_id 
          freezeType: $freeze_type
        ){
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      freeze_type: "COLLECTION" //For collection thawing
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
    mutation ThawCollection
    (
      $collection_id: BigInt!
      $freeze_type: FreezeType!
    ) {
      Thaw(
        collectionId: $collection_id 
        freezeType: $freeze_type
      ){
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    freeze_type: "COLLECTION" //For collection thawing
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
mutation ThawCollection
(
  $collection_id: BigInt!
  $freeze_type: FreezeType!
) {
  Thaw(
    collectionId: $collection_id 
    freezeType: $freeze_type
  ){
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'freeze_type': "COLLECTION" #For collection thawing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Once the transaction is executed, all tokens within the specified collection will be thawed.

### Thawing a single token

Use the `Thaw` mutation and the `freezeType: TOKEN` argument to thaw a token.

```graphql
mutation ThawToken{
  Thaw(
    collectionId: 36105 #Specify the collection ID
    tokenId:{integer: 0} #Specify the token ID
    freezeType: TOKEN #For token thawing
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
      mutation ThawToken
      (
        $collection_id: BigInt!
        $token_id: BigInt!
        $freeze_type: FreezeType!
      ) {
        Thaw(
          collectionId: $collection_id
          tokenId:{integer: $token_id}
          freezeType: $freeze_type
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
      token_id: 0, //Specify the collection ID
      freeze_type: "TOKEN" //For token thawing
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
    mutation ThawToken
    (
      $collection_id: BigInt!
      $token_id: BigInt!
      $freeze_type: FreezeType!
    ) {
      Thaw(
        collectionId: $collection_id
        tokenId:{integer: $token_id}
        freezeType: $freeze_type
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 0, //Specify the collection ID
    freeze_type: "TOKEN" //For token thawing
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
mutation ThawToken
(
  $collection_id: BigInt!
  $token_id: BigInt!
  $freeze_type: FreezeType!
) {
  Thaw(
    collectionId: $collection_id
    tokenId:{integer: $token_id}
    freezeType: $freeze_type
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 0, #Specify the collection ID
  'freeze_type': "TOKEN" #For token thawing
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Once the transaction is executed, the specified token will be thawed.

> 📘 More Fields and Arguments Available!
> 
> While the examples here cover the core functionalities of the `Freeze` and `Thaw` mutations, there are a few more settings you can adjust.
> 
> To view and understand all the available settings for the `Freeze` and `Thaw` mutations, refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `Freeze` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=Freeze).
> - [Detailed `Thaw` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=Thaw).
> 
> These resources will guide you in tailoring the `Freeze` and `Thaw` mutations to your specific requirements.