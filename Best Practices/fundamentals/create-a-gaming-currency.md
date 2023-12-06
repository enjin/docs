---
title: "Create Items & Currencies"
slug: "create-a-gaming-currency"
excerpt: "Map out your economy by creating its items and currencies."
hidden: true
createdAt: "Tue Nov 07 2023 01:21:02 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 18:00:07 GMT+0000 (Coordinated Universal Time)"
---
# Introduction

The implementation of a robust item and currency system can be the linchpin of success. It's not just about enhancing the gameplay; it's about crafting an ecosystem that encourages continued engagement and offers ample opportunities for monetization. 

A well-designed system of crafting and commerce can keep players coming back, striving to earn more and craft more. Moreover, it can open avenues for in-app purchases and rare item collections, driving revenue while maintaining player interest.

## Why implement play-to-mint?

Rather than minting assets in advance, we recommend adopting a "Play-to-Mint" mechanism. This approach ensures that tokens representing in-game assets such as "Gold Coins", "Iron Ore", or "Steel Swords" are only minted when a player achieves a specific in-game milestone, like earning a loot drop. This method makes the gaming experience more thrilling and rewarding, as players literally create assets that did not exist on the blockchain prior to their victory or achievement.

In "Play-to-Mint", tokens are minted on-demand. This has several benefits:

- **Excitement for Players**: Knowing that their actions are directly responsible for the creation of unique blockchain assets adds an additional layer of excitement and engagement.
- **Technical Efficiency**: Minting assets only when required is technically efficient, as it avoids unnecessary strain on the blockchain and reduces transaction costs associated with pre-minting.
- **Economic Balance**: This method allows for a more controlled and balanced in-game economy, preventing inflation of assets and preserving their value.

By thoughtfully integrating the play-to-mint mechanism, developers can create a more engaging and sustainable blockchain game that rewards players in a meaningful way. It's not just about playing to win; it's about playing to create.

## Step 1: Establishing a Collection

Before you can start creating your items, you'll need to create a collection. The flexibility is yours when it comes to designing your collections and arranging them according to your preferences. 

However, we strongly advise you to conduct research on how collections are presented on marketplaces like NFT.io before making any permanent choices. The way you structure your collections can greatly influence the user experience, your collection's floor price, and its overall transaction volume.

It's crucial to determine what aspects are essential for your project and base your decisions on those criteria.

```graphql
mutation CreateCollection {
  CreateCollection(
    mintPolicy: {
      forceSingleMint: false
    }
    attributes:[
      {
      	key: "name"
      	value: "Chronicles of the Celestium"
    	}
    	{
	      key: "description"
	      value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
	    }
	    {
	      key: "media"
	      value: "https://yourhost/image.jpg"
	    }
    ]
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation CreateCollection {
  CreateCollection(
    mintPolicy: {
      forceSingleMint: false
    }
    attributes:[
      {
      	key: "name"
      	value: "Chronicles of the Celestium"
    	}
    	{
	      key: "description"
	      value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
	    }
	    {
	      key: "media"
	      value: "https://yourhost/image.jpg"
	    }
    ]
  ){
    id
    method
    state
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
mutation CreateCollection {
  CreateCollection(
    mintPolicy: {
      forceSingleMint: false
    }
    attributes:[
      {
      	key: "name"
      	value: "Chronicles of the Celestium"
    	}
    	{
	      key: "description"
	      value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
	    }
	    {
	      key: "media"
	      value: "https://yourhost/image.jpg"
	    }
    ]
  ){
    id
    method
    state
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
mutation CreateCollection {
  CreateCollection(
    mintPolicy: {
      forceSingleMint: false
    }
    attributes:[
      {
      	key: "name"
      	value: "Chronicles of the Celestium"
    	}
    	{
	      key: "description"
	      value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
	    }
	    {
	      key: "media"
	      value: "https://yourhost/image.jpg"
	    }
    ]
  ){
    id
    method
    state
  }
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

> 📘 Need to add more metadata?
> 
> Check the [Best Practices for Collection/Token Metadata](doc:metadata-standard), and the [Universal Metadata Standard](enj.in/metadata).

Now that you've successfully created a collection, it's time to populate it with tokens.

## Step 2: Creating Crafting Ingredients

> 📘 For Token ID management, head to [Best Practices > TokenID Structure](/docs/tokenid-structure)

Crafting materials are stackable, fungible and highly liquid items, and they typically have an infinite supply.  
A robust economy will usually have many types of crafting materials, often with multiple tiers of materials within each type.

```graphql
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 0}
      initialSupply: 500
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
      attributes:[
        {
          key: "name"
          value: "Nebulae Shard"
        }
        {
          key: "description"
          value: "A fragment of condensed stardust that pulses with the raw creative force of the cosmos."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 0}
      initialSupply: 500
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
      attributes:[
        {
          key: "name"
          value: "Nebulae Shard"
        }
        {
          key: "description"
          value: "A fragment of condensed stardust that pulses with the raw creative force of the cosmos."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 0}
      initialSupply: 500
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
      attributes:[
        {
          key: "name"
          value: "Nebulae Shard"
        }
        {
          key: "description"
          value: "A fragment of condensed stardust that pulses with the raw creative force of the cosmos."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 0}
      initialSupply: 500
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
      attributes:[
        {
          key: "name"
          value: "Nebulae Shard"
        }
        {
          key: "description"
          value: "A fragment of condensed stardust that pulses with the raw creative force of the cosmos."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
  }
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Crafting materials are the backbone of any item creation system. They can be simple, like wood or metal in a game, or complex, like a software module in an app. 

You can start [minting them](doc:minting-a-token), [selling them](/docs/create-in-game-shops) to players or [distributing them](/docs/create-in-game-drops) as rewards.

## Step 3: Create Your Currency

Similarly to crafting materials, currencies are also fungible, stackable, highly liquid, high-supply items that play a crucial role in sustaining your economy. They typically have an infinite supply and are earned regularly, often in varying amounts. You can introduce multiple forms of currency, each with its unique value.

```graphql
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 1}
      initialSupply: 1000
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
      attributes:[
        {
          key: "name"
          value: "Celestial Sovereigns"
        }
        {
          key: "description"
          value: "The revered coinage of the multiverse, each piece resonates with the power of collapsed stars."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 1}
      initialSupply: 1000
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 1}
      initialSupply: 1000
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 1}
      initialSupply: 1000
      cap: {type: INFINITE}
      behavior: {isCurrency: true}
    }
  ){
    id
    method
    state
  }
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Creating the token as a currency by setting `isCurrency: true` allows marketplace listings to treat this token as a currency. Now players are able to use this token for on-chain marketplace listings.  
A player that crafted the rare token Starforged Cleaver can now create a listing asking 600 Celestial Sovereigns for it.

Now that you've created some currencies, you can begin [minting them](doc:minting-a-token), [selling them](/docs/create-in-game-shops) to players or [distributing them](/docs/create-in-game-drops) as rewards.

## Step 4: Creating High-Value Rewards

Speaking of rare items, let's create a high-value craftable item. This is a token that players can create using the currency and materials you've previously established. These tokens become even more interesting when you utilize the full potential of the Enjin Blockchain to provide these assets with provable rarity and historical provenance.

```graphql
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 2}
      initialSupply: 1
      cap: {
        type: SUPPLY
        amount: 100
      }
      attributes:[
        {
          key: "name"
          value: "Starforged Cleaver"
        }
        {
          key: "description"
          value: "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 2}
      initialSupply: 1
      cap: {
        type: SUPPLY
        amount: 100
      }
      attributes:[
        {
          key: "name"
          value: "Starforged Cleaver"
        }
        {
          key: "description"
          value: "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 2}
      initialSupply: 1
      cap: {
        type: SUPPLY
        amount: 100
      }
      attributes:[
        {
          key: "name"
          value: "Starforged Cleaver"
        }
        {
          key: "description"
          value: "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
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
mutation CreateToken {
  CreateToken(
    recipient: "cxRecipientAddress"
    collectionId: 36105
    params: {
      tokenId: {integer: 2}
      initialSupply: 1
      cap: {
        type: SUPPLY
        amount: 100
      }
      attributes:[
        {
          key: "name"
          value: "Starforged Cleaver"
        }
        {
          key: "description"
          value: "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself."
        }
        {
          key: "uri"
          value: "https://yourhost.com/json"
        }
      ]
    }
  ){
    id
    method
    state
  }
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Players can craft this item using the established in-game currency and crafting materials, contributing to the depth and complexity of the in-game economy and player interactions.

You can start minting them as players [craft them](/docs/create-a-crafting-system).