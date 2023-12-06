---
title: "Create a Loot Drop"
slug: "create-in-game-drops"
excerpt: "Start dropping tokens to players using play-to-mint mechanics."
hidden: true
createdAt: "Tue Nov 07 2023 01:42:29 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:56:55 GMT+0000 (Coordinated Universal Time)"
---
Loot drops in gaming have evolved with the integration of blockchain technology, bringing about a new excitement with Play to Mint mechanisms. 

This step-by-step tutorial guides you on how to create a Loot Drop system that rewards players not just with items but with unique blockchain assets they mint through gameplay. 

## Why you should integrate play-to-mint mechanics

- **Sense of Achievement**: Players minting unique assets feel a greater sense of accomplishment.
- **Surprise Element**: Randomized the play-to-mint mechanics keeps the game exciting.
- **Asset Accumulation**: The potential to collect valuable assets will encourage prolonged engagement.

## Step 1: Set Up the Loot Drop Triggers

Identify the in-game actions that will trigger the loot drops. It could be defeating a boss, completing a quest, or a rare in-game event. 

Ensure that these triggers align with your game's progression and difficulty. Additionally, consider offering more desirable rewards behind triggers that increase player retention.

## Step 2: Trigger the Mint

Once a player has earned an item, use the `BatchMint` mutation to send a reward.

```graphql
mutation BatchMint {
  BatchMint(
    collectionId: "7154" #Add the collection ID
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation BatchMint {
  BatchMint(
    collectionId: "7154" #Add the collection ID
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
}`,
	}),
})
.then(response => response.json())
.then(data => console.log(data));
```
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', { query: `
mutation BatchMint {
  BatchMint(
    collectionId: "7154" #Add the collection ID
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
mutation BatchMint {
  BatchMint(
    collectionId: "7154" #Add the collection ID
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" #The recipient of the mint
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
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

You have the flexibility to distribute the item either to the player's managed wallet or their non-custodial wallet. You can tailor this choice to your preferences, or if you prefer to let the player decide, you can include an option in your settings to allow them to make the choice.

## Step 3: Test the System

Before launching, thoroughly test the loot drop system to ensure that triggers function correctly and blockchain transactions process seamlessly without any issues. Conduct rigorous testing to eliminate any potential exploits. Keep in mind that the Enjin Blockchain is immutable, meaning there is no way to recover items in case of exploits.

## Step 4: Monitor and Iterate

Ensure the inclusion of a modular system that enables easy pausing of the loot drop in question. After the launch, maintain vigilant monitoring of the system. Collect player feedback and analyze data to identify and address any required adjustments. In the event of potential exploit risks, promptly pause the loot drop to mitigate any issues.

These loot drop mechanics not only enhance the player's experience but also contribute to a sustainable in-game economy. Remember, the joy for players comes from the knowledge that they are the creators of these newly minted assets, adding a layer of excitement and value to their gaming experience. Enjoy building your Play to Mint system!