---
title: "Integrate Token Utility"
slug: "create-a-token-gate"
excerpt: "Make your tokens valuable by attaching in-game benefits to them."
hidden: true
createdAt: "Wed Nov 08 2023 22:31:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:56:50 GMT+0000 (Coordinated Universal Time)"
---
One powerful tool at your disposal is the concept of Token Gating – when in-game benefits are gated by token ownership. Token Gates offer infinite use cases and can be employed to define tokens as in-game real estate, gear, skins, clothing, cosmetics, companions, pets, exclusive experiences, and much more. 

## Why token gating is needed

Token Gates are not just barriers; they are gateways to a world of possibilities. By associating specific utility or content with tokens, you can create an ecosystem where each token holds a key to a unique experience. Whether it's in-game real estate, legendary gear, exclusive skins, or epic companions, Token Gates empower you to:

1. **Enhance Engagement**: Players are motivated to collect and upgrade tokens to access new experiences and benefits, keeping them engaged over the long term.

2. **Boost Ownership**: Players take ownership of digital assets that have real value and utility within the game, fostering a sense of ownership and investment.

3. **Foster an Economy**: A thriving secondary market for tokens can emerge, with players trading, selling, and buying tokens to access the content they desire.

4. **Tailor Gameplay**: Developers can customize gameplay mechanics, challenges, and rewards based on token ownership, creating a personalized gaming experience.

5. **Incentivize Loyalty**: Reward loyal players with exclusive content or experiences, encouraging them to stay and continue their journey.

Token Gates are a game-changer in the world of gaming, providing you with the means to create immersive and engaging experiences that keep players coming back for more.

## Step 1: Viewing Player Tokens

To provide unique utility for each token, you can use the `GetWallet` query to retrieve a player's tokens. This is usually something you do when they open their in-game inventory.

**Query:**

```graphql
query FetchingWalletTokens{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    tokenAccounts{
      edges{
        node{
          token{
            tokenId
            attributes{
              key
              value
            }
          }
        }
      }
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
query FetchingWalletTokens{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    tokenAccounts{
      edges{
        node{
          balance
          token{
            tokenId
            collection{
              collectionId
            }
            attributes{
              key
              value
            }
          }
        }
      }
    }
  }
}`,
	}),
})
.then(response => response.json())
.then(data => console.log(data));
```
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', { query: `
query FetchingWalletTokens{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    tokenAccounts{
      edges{
        node{
          balance
          token{
            tokenId
            collection{
              collectionId
            }
            attributes{
              key
              value
            }
          }
        }
      }
    }
  }
}`,
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
```python
import requests
import json

query = `
query FetchingWalletTokens{
  GetWallet(account: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"){ #Specify the account address
    tokenAccounts{
      edges{
        node{
          balance
          token{
            tokenId
            collection{
              collectionId
            }
            attributes{
              key
              value
            }
          }
        }
      }
    }
  }
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

**Response:**

```json
{
  "data": {
    "GetWallet": {
      "tokenAccounts": {
        "edges": [
          {
            "node": {
              "token": {
                "tokenId": "0",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Stormwind Haven Portal Stone"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "token": {
                "tokenId": "1",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Starforged Cleaver"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "token": {
                "tokenId": "2",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Nebulae Shard"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "token": {
                "tokenId": "3",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Celestial Sovereigns"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "token": {
                "tokenId": "4",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Cosmetic Clothing"
                  }
                ]
              }
            }
          },
          {
            "node": {
              "token": {
                "tokenId": "5",
                "attributes": [
                  {
                    "key": "name",
                    "value": "Land in Eldrin the Etherwalker"
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

Once you've successfully retrieved their wallet data and shown them which tokens they own, you can provide in-game features based on the tokens owned.  
Since the user owns the "Stormwind Haven Portal Stone" token, he can use the portal to teleport to Stormwind Haven.

## Step 2: Tailored Experiences for Each Token

You can provide the infinite experiences to players based on their tokens, here are just a few examples:

1. **Real Estate Token**: Players can own virtual lands, build structures, and participate in a player-driven economy within the game world. They can develop, buy, and sell properties, creating a thriving virtual real estate market.

2. **Legendary Sword**: Equip players with powerful gear that enhances their in-game abilities. These legendary weapons can be customized, upgraded, and traded among players.

3. **Epic Skin**: Allow players to personalize their avatars with epic skins. These skins change the appearance of characters, making them stand out in the game.

4. **Cosmetic Clothing**: Offer a wide range of cosmetic clothing options, enabling players to style their characters with unique outfits, accessories, and cosmetics.

5. **Loyal Companion**: Introduce loyal companions that accompany players on their adventures. These companions can have unique abilities and can become valuable allies in battles.

6. **Rare Pet**: Give players the opportunity to adopt and nurture rare pets. These pets can provide various benefits, such as bonuses or assistance during gameplay.

7. **Exclusive Experience**: Unlock exclusive in-game experiences, quests, challenges, or events for players who own this token. These experiences can be narrative-driven, offering a deeper connection to the game world.

You can create a dynamic and engaging gaming ecosystem by tailoring experiences and gameplay mechanics to each token type. By doing so, they can enhance player engagement, retention, and satisfaction while fostering a vibrant in-game economy driven by player ownership and interaction.