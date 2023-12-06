---
title: "Using Managed Wallets"
slug: "using-managed-wallets"
excerpt: "Create player wallets that you can manage for them, improving UX while offering full transparency."
hidden: false
createdAt: "Mon Nov 06 2023 03:58:40 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:44:24 GMT+0000 (Coordinated Universal Time)"
---
Managed wallets offer a seamless user experience by allowing you to create blockchain wallets for your users without requiring them to download any apps or take additional steps. 

This transparency lets users easily track the movement of items in and out of their wallets, aiding in user onboarding and providing clear, immutable on-chain data to track their tokens.

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) and a [Token](doc:create-a-token) to add to the wallet.

# Create Managed Wallets

To create a Managed wallet, run the `CreateWallet` mutation, with a unique ID as a parameter.

Choose a unique `externalId` for each player/user that can be cross-referenced later. This unique identifier should be something already associated with the player in your database, such as a player ID or username.  
By doing so, you will be able to consistently link the Managed Wallet to the respective player.

```graphql
mutation CreateManagedWallet {
  CreateWallet(externalId: "player_1_id") #Replace this with a unique ID
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
```javascript Node.js
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

> 🚧 Lost database data?
> 
> Recreate the Managed wallets by running `CreateWallet` mutation again for each of the `externalId`s.  
> Make sure to use the same Daemon wallet seed and password used to create Managed wallets prior, as Managed wallets are derived with the following derivation path: `walletSeed/externalId///password`

# Interact with Managed Wallets

Once the Managed wallet is created, you can provide the `externalId` field of the Wallet object to any query or mutation that accepts a `Wallet.externalId` parameter, in order to use a Managed wallet instead of any other wallet.

Lets look at the `GetWallet` query as an example, to [get the Public Key of an account](doc:fetching-wallets), we use the account's address. `account: "address_here"`

However, to get the Public Key of a `Managed wallet`, we provide the `Wallet.externalId` parameter instead.

**Query:**

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
```javascript Node.js
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

**Response:**

```json JSON
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

# Minting tokens to Managed wallets

With the acquired Managed wallet address, you can mint tokens directly to the Managed wallet.

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
```javascript Node.js
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

# Transferring tokens from managed wallets

If you followed along the previous snippets of code, you should have a Managed wallet with a token in it. To transfer it out to another wallet, we can use the `BatchTransfer` mutation.

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
      signing_account: cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT //Add your signing account address (the Managed wallet account address from the GetWallet query)
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
    signing_account: cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT //Add your signing account address (the Managed wallet account address from the GetWallet query)
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
  'signing_account': cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT #Add your signing account address (the Managed wallet account address from the GetWallet query)
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Make sure that `signingAccount` is set to the Managed Wallet address that owns that token.

> 📘 More Fields and Arguments Available!
> 
> The examples here illustrate basic uses of Managed wallets related queries & mutations. However, these operations supports many more arguments and settings not shown in these examples.
> 
> For a comprehensive overview of all available settings and their descriptions for Managed wallets (presented in this page), please refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `CreateWallet` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=CreateWallet).
> - [Detailed `GetWallet`/`GetWallets` queries Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetWallet).
> - [Detailed `BatchMint` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=BatchMint).
> - [Detailed `BatchTransfer` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=BatchTransfer).
> 
> These resources will help you to fully utilize the capabilities of managed wallets related operations and tailor them to your specific needs.
> 
> It's important to note that every mutation that accepts a `signingAccount` argument can be used to sign the transaction using a managed wallet, as shown in the batch transfer tutorial above.