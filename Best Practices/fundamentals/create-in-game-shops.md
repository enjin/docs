---
title: "Create an Item Shop"
slug: "create-in-game-shops"
excerpt: "Create more reasons for players to explore by adding local shops."
hidden: true
createdAt: "Tue Nov 07 2023 01:36:41 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:57:20 GMT+0000 (Coordinated Universal Time)"
---
In this tutorial, we will guide you through the process of creating an item shop in a game using blockchain technology. The item shop will allow players to exchange a set of in-game currency tokens for epic weapons. 

## Why item shops are so important

In-game item shops and economies play a crucial role in game development for several reasons:

1. **Monetization: **Item shops provide a monetization strategy for game developers. Players can spend real or in-game currency to acquire items, skins, or other in-game assets.
2. **Player Engagement: **Offering items for purchase keeps players engaged and motivated. Players can set goals to acquire rare items from the shop, driving long-term engagement.
3. **Balancing Gameplay: **Developers can control the availability and pricing of items in the shop to balance the game. This ensures fairness and prevents pay-to-win scenarios.
4. **Customization: **Item shops allow players to customize their gaming experience by choosing items that suit their playstyle or aesthetic preferences.
5. **Community Building: **In-game economies often involve player-to-player trading, fostering a sense of community and interaction within the game.

Now, let's proceed with creating the item shop.

## Step 1: Configure the Item Shop

Set up the item shop to exchange in-game currency tokens for epic weapons.

## Step 2: Batch Transfer - Taking Currency from Players

To take the in-game currency tokens from players, you can use a batch transfer. This allows you to deduct the required currency from a player's wallet in a single transaction.

```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154
        recipients: [{
          account: "PLAYER_WALLET_ADDRESS"
          simpleParams: {
            tokenId: { integer: CURRENCY_TOKEN_ID }
            amount: CURRENCY_COST
            keepAlive: false
          }
        }]
    ) {
        id
    }
}
```

JSON Response:

```json
{
  "data": {
    "BatchTransferCurrency": {
      "id": 67890
    }
  }
}
```

Please note that if the player is using a non-custodial wallet, they must sign the transaction to approve the transfer of this currency from their wallets to yours. This is where managed wallets provide significant utility and ease of use.

## Step 3: Batch Transfer - Delivering Epic Weapons

Now, let's deliver the epic weapons to the player's wallet using another batch transfer.

```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: COLLECTION_ID
        recipients: [{
          account: "PLAYER_WALLET_ADDRESS"
          simpleParams: {
            tokenId: { integer: EPIC_WEAPON_TOKEN_ID }
            amount: 1
            keepAlive: false
          }
        }]
    ) {
        id
    }
}
```

JSON Response:

```json
{
  "data": {
    "BatchTransferEpicWeapon": {
      "id": 98765
    }
  }
}
```

The player will receive one epic weapon token in exchange for the currency tokens.

Item stores provide players with engaging experiences, promote player agency, and contribute to game longevity. By using batch transfers, you can efficiently handle currency transactions and item deliveries in your game's item shop.