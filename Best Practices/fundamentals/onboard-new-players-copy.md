---
title: "Create Invite Tokens"
slug: "onboard-new-players-copy"
excerpt: "Create far reaching ad campaigns that convert views into players."
hidden: true
createdAt: "Tue Nov 07 2023 02:37:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:57:09 GMT+0000 (Coordinated Universal Time)"
---
An invite token is a powerful tool for user acquisition. By distributing these tokens via QR codes on your website, social media, billboards, or in stores, you can attract new players to your game.

## Why invite tokens are so effective

Invite tokens are highly effective for several reasons:

1. **Incentivize New Players**: Invite tokens provide an incentive for new players to join your game, as they offer immediate value or benefits.
2. **Viral Marketing**: When existing players invite new users using these tokens, it can trigger a viral effect, expanding your player base exponentially.
3. **Targeted Marketing**: You can strategically distribute invite tokens to specific audiences, ensuring that they reach the right players who are likely to engage with your game.

In this tutorial, we'll guide you through the process of creating and distributing an invite token using Enjin Beam.

## Step 1. Create an Enjin Beam

First, use the previous tutorials to create a token you'd like to distribute. 

Once that's done, create an Enjin Beam code for distribution and start spreading it far and wide.

```graphql
mutation CreateBeam {
  CreateBeam(
    name: "Starforged Cleaver Giveaway"
    description: "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself."
    image: "https://assets-global.website-files.com/60f57c496975b84c29335fb7/60f58bd888a6e86e3ff69551_Enjin.svg"
    start: "20230101"
    end: "20240101"
    collectionId: 7153
    tokens: [
      {tokenIds:"1..10" tokenQuantityPerClaim:1 claimQuantity:1 type:MINT_ON_DEMAND}
    ]
  )
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
    "CreateBeam": "cd6443f822cf6e89c03edd4f6fbc6e55"
  }
}
```

Now that you've created an Enjin Beam, you will need to run a query to pull its QR codes.

## Step 2. Get Your Beam's QR Codes

Next, you should retrieve the Beam QR codes, which you can promote on any visible surface. If people can see these codes, they can scan them, and by scanning them, they will find a compelling reason to join your game.

```graphql
query GetBeam {
  GetBeam(code: "0dd3694f2c4599179f08686539cd73dc") {
    id
    code
    name
    description
    image
    start
    end
    isClaimable
    claimsRemaining    
    qr {
      url
      payload
    }
    message {
      walletPublicKey
      message
    }
    collection {
      collectionId
      maxTokenCount
      maxTokenSupply
      forceSingleMint
      frozen
      network
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
    "GetBeam": {
      "id": 1,
      "code": "0dd3694f2c4599179f08686539cd73dc",
      "name": "Starforged Cleaver Giveaway",
      "description": "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself.",
      "image": "https://en.wikipedia.org/wiki/Firefox#/media/File:Firefox_logo,_2019.svg",
      "start": "2022-11-14T00:00:00+00:00",
      "end": "2028-11-14T00:00:00+00:00",
      "isClaimable": true,
      "claimsRemaining": 10,
      "qr": {
        "url": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc",
        "payload": "https://platform.enjin.io/claim/0dd3694f2c4599179f08686539cd73dc"
      },
      "message": null,
      "collection": null
    }
  }
}
```

Now that you have the Enjin Beam images, you can begin advertising them far and wide.

## Step 3. Check if the User Has an Invite Token

Once a user has joined your game, you should check if they own the Invite token. If they do, consider rewarding them with an epic prize.

```graphql
query GetWallet {
    GetWallet(id: <user_wallet_id>) {
        tokenAccounts {
            edges {
                node {
                    balance
                    token {
                        tokenId
                    }
                }
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
    "GetWallet": {
      "tokenAccounts": {
        "edges": [
          {
            "node": {
              "balance": 5,
              "token": {
                "tokenId": "1"
              }
            }
          }
        ]
      }
    }
  }
}
```

Once you have read the user's wallet, you can provide them with the advertised in-game benefit.

Creating and distributing invite tokens through Enjin Beam is a powerful user acquisition strategy. By offering valuable in-game benefits to users who own these tokens, you can incentivize them to join your game and boost user engagement.