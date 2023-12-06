---
title: "Create a Crafting System"
slug: "create-a-crafting-system"
excerpt: "Expand your economy and build rewarding game loops."
hidden: true
createdAt: "Tue Nov 07 2023 01:27:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:57:16 GMT+0000 (Coordinated Universal Time)"
---
Crafting systems are a fundamental part of many video games, adding depth and complexity to gameplay by allowing players to create items, weapons, or gear from various resources. In this tutorial, we'll guide you through the process of creating a crafting system for your game using blockchain technology. We'll take a set of items from a player and deliver them an epic weapon in return.

## Why crafting systems are crucial

Crafting systems are crucial in games for several reasons:

1. **Player Engagement**: Crafting gives players a sense of achievement and progression as they gather resources and create valuable items.
2. **Resource Management**: It encourages players to manage their resources efficiently, making decisions about what to collect, keep, or trade.
3. **Customization**: Crafting allows players to tailor their gameplay experience by creating items that suit their playstyle.
4. **Economy**: It can create a player-driven economy, as crafted items can be traded or sold to other players.

Now, let's dive into creating a crafting system using GraphQL and blockchain technology.

## Step 1: Batch Transfer - Take Items from the Player

To implement a crafting system, you first need to take a set of items from the player. We'll use the `BatchTransfer` GraphQL mutation for this.

```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154
        recipients: [{
          account: "0x1013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c00"
          simpleParams: {
            tokenId: { integer: 6540 } #Add the crafting material's tokenID
            amount: 1
            keepAlive: false
          }
        }]
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
            }
        }
    }
}
```
```cplusplus

```
```csharp

```
```javascript

```
```javascript Node.js

```
```Text Python

```

Response:

```json
{
  "data": {
    "BatchTransfer": {
      "id": 13975,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchTransfer",
      "state": "PENDING",
      "encodedData": "0x280cc96f041013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c000015660400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```

Keep in mind that if the item is in a player's managed wallet, you can take it from them with ease. However, if the item is in the player's non-custodial wallet, they will have to approve the request before you receive the item.

## Step 2: Batch Transfer - Deliver the Epic Weapon

Now, once you've received the crafting materials, mint the epic weapon into the player's wallet using the `BatchMint` mutation.

```graphql
mutation BatchMint {
  BatchMint(
    collectionId: "7154"
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
        mintParams: {
          amount:1
          tokenId: {integer: 6533} #Add the crafted item's tokenID
          unitPrice: 1        
        }
    	}
    ]
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
      }
    }
  }
}
```
```cplusplus

```
```csharp

```
```javascript

```
```javascript Node.js

```
```Text Python

```

Response:

```json
{
  "data": {
    "BatchMint": {
      "id": 13928,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchMint",
      "state": "PENDING",
      "encodedData": "0x280dc96f04aa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c292101156604010000c16ff28623000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```

Once the player has received the item, you can use the GetWallet query to confirm that they now own it and provide them with the relevant benefits.

Crafting systems enhance gameplay by providing players with a sense of accomplishment and resource management challenges.