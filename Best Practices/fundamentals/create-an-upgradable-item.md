---
title: "Create Upgradable Items"
slug: "create-an-upgradable-item"
excerpt: "Use on-chain metadata to create upgradable items with immutable provenance."
hidden: true
createdAt: "Wed Nov 08 2023 22:31:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:57:00 GMT+0000 (Coordinated Universal Time)"
---
In this tutorial, we will learn how to leverage the power of the Enjin Blockchain to create upgradable digital items with a traceable history. 

We will demonstrate how the Enjin Blockchain's immutable ledger adds depth to item progression, making each upgrade a part of the item's unique narrative.

## How item enhancements increase engagement

Blockchain and metadata together create a secure, unalterable history for each item. By storing this metadata on the Enjin Blockchain, we ensure each item's legacy is preserved, showcasing its journey through different ownerships and upgrades.

1. **Enhanced Item Progression**: Leveraging the power of the Enjin Blockchain adds depth and uniqueness to item progression, making each upgrade a part of the item's unique narrative.
2. **Preserved Legacy**: The immutable ledger and metadata on the Enjin Blockchain preserve an item's legacy, showcasing its journey through different ownerships and upgrades.
3. **Personalized Enhancement**: Upgrading items allows players to personalize and strengthen their in-game assets, enhancing their connection to the game.
4. **Recognition and Achievement**: Honoring player contributions with soulbound certificates fosters a sense of recognition and achievement.
5. **Engaging Player Experience**: The combination of blockchain-enhanced upgrades and rewards creates a dynamic and engaging player experience, increasing player retention and satisfaction.

## Step 1: Visiting the Forge

After its initial creation, "Aetherblade" is now ready to ascend to a new tier of power. The player heads to the forge and will upgrade its name, class, HP, and strength.

## Step 2: The On-Chain Enhancements

To begin the enhancement, we will use GraphQL to set new on-chain attributes for "Aetherblade," making sure to preserve the name of the valiant player bestowing these new powers upon it.

```graphql
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: 36105 # Specify the collection ID
        tokenId: {integer: 0 } # Specify the token ID.
        attributes: [
            {
                key: "name" #Provide an attribute name
                value: "Aetherblade the Mighty"  #Provide an attribute value
            },
            {
                key: "attributes"
              	value: "{\"class\": {\"value\": \"Legendary\"},\"HP\": {\"value\": \"100\"},\"Strength\": {\"value\": \"40\"},\"Upgraded By\": {\"value\": \"Lady_Valor\"}}"   #Attributes following the Universal Token Metadata Standard
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: 36105 # Specify the collection ID
        tokenId: {integer: 0 } # Specify the token ID.
        attributes: [
            {
                key: "name" #Provide an attribute name
                value: "Aetherblade the Mighty"  #Provide an attribute value
            },
            {
                key: "attributes"
              	value: "{\"class\": {\"value\": \"Legendary\"},\"HP\": {\"value\": \"100\"},\"Strength\": {\"value\": \"40\"},\"Upgraded By\": {\"value\": \"Lady_Valor\"}}"   #Attributes following the Universal Token Metadata Standard
            }
        ]
    ) {
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
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: 36105 # Specify the collection ID
        tokenId: {integer: 0 } # Specify the token ID.
        attributes: [
            {
                key: "name" #Provide an attribute name
                value: "Aetherblade the Mighty"  #Provide an attribute value
            },
            {
                key: "attributes"
              	value: "{\"class\": {\"value\": \"Legendary\"},\"HP\": {\"value\": \"100\"},\"Strength\": {\"value\": \"40\"},\"Upgraded By\": {\"value\": \"Lady_Valor\"}}"   #Attributes following the Universal Token Metadata Standard
            }
        ]
    ) {
        id
        method
        state
   }
}
`,
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
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: 36105 # Specify the collection ID
        tokenId: {integer: 0 } # Specify the token ID.
        attributes: [
            {
                key: "name" #Provide an attribute name
                value: "Aetherblade the Mighty"  #Provide an attribute value
            },
            {
                key: "attributes"
              	value: "{\"class\": {\"value\": \"Legendary\"},\"HP\": {\"value\": \"100\"},\"Strength\": {\"value\": \"40\"},\"Upgraded By\": {\"value\": \"Lady_Valor\"}}"   #Attributes following the Universal Token Metadata Standard
            }
        ]
    ) {
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

You have successfully upgraded the blade's statistics and immortalized the upgrader.

## Step 3: Honoring the Valor

"Lady Valor" deserves recognition for her role in enhancing "Aetherblade." 

Let's mint a special certificate as a token to honor her contributions.

This certificate will be Soulbound to her account, which means it is not tradable.

```graphql
mutation MintValorsCertificate {
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collectionId: 36105,
    params: {
    	cap:{type: SINGLE_MINT}
      tokenId: {integer: 2}
      freezeState: PERMANENT #This will make sure the token is Soulbound.
      attributes:[
        {
        	key: "name",
        	value: "Valor's Certificate"
      	}
        {
        	key: "description",
        	value: "Awarded to Lady Valor for upgrading Aetherblade"
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
mutation MintValorsCertificate {
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collectionId: 36105,
    params: {
    	cap:{type: SINGLE_MINT}
      tokenId: {integer: 2}
      freezeState: PERMANENT #This will make sure the token is Soulbound.
      attributes:[
        {
        	key: "name",
        	value: "Valor's Certificate"
      	}
        {
        	key: "description",
        	value: "Awarded to Lady Valor for upgrading Aetherblade"
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
mutation MintValorsCertificate {
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collectionId: 36105,
    params: {
    	cap:{type: SINGLE_MINT}
      tokenId: {integer: 2}
      freezeState: PERMANENT #This will make sure the token is Soulbound.
      attributes:[
        {
        	key: "name",
        	value: "Valor's Certificate"
      	}
        {
        	key: "description",
        	value: "Awarded to Lady Valor for upgrading Aetherblade"
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
mutation MintValorsCertificate {
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
    collectionId: 36105,
    params: {
    	cap:{type: SINGLE_MINT}
      tokenId: {integer: 2}
      freezeState: PERMANENT #This will make sure the token is Soulbound.
      attributes:[
        {
        	key: "name",
        	value: "Valor's Certificate"
      	}
        {
        	key: "description",
        	value: "Awarded to Lady Valor for upgrading Aetherblade"
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

You have bestowed "Lady Valor" with a Soulbound certificate, acknowledging her pivotal role in enhancing "Aetherblade."

Let "Aetherblade" continue to evolve, reflecting the glory of its wielders, and consider how such enhancements could interact with gaming environments and player economies. Each attribute is not just a stat; it's a story waiting to be told.