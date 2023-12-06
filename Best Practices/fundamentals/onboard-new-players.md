---
title: "Onboard a New Player"
slug: "onboard-new-players"
excerpt: "Create a frictionless onboarding process that retains early players."
hidden: true
createdAt: "Tue Nov 07 2023 01:34:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 16:56:43 GMT+0000 (Coordinated Universal Time)"
---
Its important to create an onboarding process that offers a welcoming environment for new players and sets a strong foundation for building a loyal player base. 

By removing technical barriers and providing immediate value, you're not just bringing players into your game — you're inviting them to become a part of your game's community and economy.

## What makes a great first impression?

The provided onboarding process is an excellent strategy to integrate new players into your game seamlessly. 

- **Frictionless Start: **Automatically creating a managed wallet removes a significant barrier to entry, making it easier for players to try the game.
- **Immediate Reward: **Adding starter items to the managed wallet provides players with an immediate taste of the game's rewards system.
- **Trust and Verification: **Verifying the user's wallet address enhances security and builds trust in the system, encouraging user investment.
- **Autonomy and Ownership: **Allowing users to withdraw items to their non-custodial wallet empowers them with true ownership of in-game assets.
- **Community Building: **Invested players are more likely to contribute to the community, leading to organic growth.
- **Positive Loop of Engagement: **The combination of a frictionless start, immediate rewards, and asset ownership creates a positive feedback loop that encourages continued play.
- **Future Monetization: **Onboarded and retained players are more likely to spend money in the game, having been introduced to the game's economy and asset value.

# Step 1. Create a Managed Wallet for the User

This is a user-dedicated wallet, but it remains under your control. This is crucial because it enables you to add and remove items based on the user's in-game actions, all while maintaining complete transparency and tracking of item movements within users' managed wallets.

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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
mutation CreateManagedWallet {
  CreateWallet(externalId: "player_1_id") #Replace this with a unique ID
}`,
	}),
})
.then(response => response.json())
.then(data => console.log(data));
```
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', { query: `
mutation CreateManagedWallet {
  CreateWallet(externalId: "player_1_id") #Replace this with a unique ID
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
mutation CreateManagedWallet {
  CreateWallet(externalId: "player_1_id") #Replace this with a unique ID
}
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

Response:

```json
{
  "data": {
    "CreateWallet": true
  }
}
```

Now, retrieve the wallet address you've just created for the user.

```graphql
query GetWallet {
  GetWallet(externalId: "player_1_id") { #Add the managed wallet unique ID
    account {
      address
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
query GetManagedWalletPublicKey {
  GetWallet(externalId: "player_1_id") { #Add the managed wallet unique ID
    account {
      address
      publicKey
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
query GetManagedWalletPublicKey {
  GetWallet(externalId: "player_1_id") { #Add the managed wallet unique ID
    account {
      address
      publicKey
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
query GetManagedWalletPublicKey {
  GetWallet(externalId: "player_1_id") { #Add the managed wallet unique ID
    account {
      address
      publicKey
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

Response:

```json
{
  "data": {
    "GetWallet": {
      "account": {
        "address": "cxK83gJm3F8LV4Kh1YjA6KaSgJev1RgatHrum4Ap4AFcHSrNe"
      }
    }
  }
}
```

You've now created a player wallet to which you can freely add items. This can also serve as an escrow wallet, from which you can remove items if a player loses them or if you wish to initiate player trades.

# Step 2. Add Starter Items to Managed Wallet

Next, add starter items to the new user's managed wallet. This allows the user to begin building a special relationship with the game, understanding that they are already accumulating value in the game.

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
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' },
  body: JSON.stringify({
  query: `
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
`

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

You've successfully provided the player with some starter items, which will help them settle in and start enjoying the game. The aim of this step is to generate excitement and motivate the player to continue playing.

# Step 3. Verify the User's Wallet Address

Once the user is ready to start using their non-custodial wallet, you can initiate the wallet linking process. You shouldn't force new users into this process because it requires them to download an external wallet and create a seed key. Instead, leave this as an option that players can choose when they're ready.

**Query:**

```graphql
query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
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
query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
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
  query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
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
query RequestAccount{
  RequestAccount{
    qrCode #Returns a QR code for your user to scan
    verificationId #Save this for next step
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

```json JSON
{
  "data": {
    "RequestAccount": {
      "qrCode": "https://platform.canary.enjin.io/qr?s=512&f=png&d=https://platform.canary.enjin.io/proof/MHg3OGFmYWIxYWQxMjk0YzFlZWY4MjdlNmFjNTM1MmJiOTVmNmFmNWJhNmUyNjk5ZGRkOTI3YjAwNmQ3ZDk0MzZjO2Vwc3I6QTIwMTBBSzlM",
      "verificationId": "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"
    }
  }
}
```

The response includes a QR code that your user needs to scan using the Enjin Wallet. When the user scans the QR code, they will be prompted to select a wallet address for verification.

Once verified, you can securely initiate token transfers and send requests to their wallet address via the API.

Next, ensure that the verification process has been successfully completed.

**Query:**

```graphql
query GetWallet{
  GetWallet(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Add the verificationId from the RequestAccount response
    account{
      address
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
query GetWallet{
  GetWallet(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Replace this with the verificationId from the RequestAccount response
    account{
      address
    }
    balances{
      free
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
query GetWallet{
  GetWallet(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Replace this with the verificationId from the RequestAccount response
    account{
      address
    }
    balances{
      free
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
query GetWallet{
  GetWallet(verificationId: "0x78afab1ad1294c1eef827e6ac5352bb95f6af5ba6e2699ddd927b006d7d9436c"){ #Replace this with the verificationId from the RequestAccount response
    account{
      address
    }
    balances{
      free
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

```json JSON
{
  "data": {
    "GetWallet": {
      "account": {
        "address": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" //The address of the verified account
      }
    }
  }
}
```

Now that you've connected the user's non-custodial wallet, you can seamlessly transfer items between the managed wallet and their personal wallet. 

Players will perceive this as the ability to deposit and withdraw items from the game. 

When an item is deposited into the game, you gain complete control over it, but players can still monitor its movements transparently.

# Step 4. Allow User to Withdraw Items

Lastly, enable users to transfer items from their managed wallet to their non-custodial wallet by implementing a button that triggers this mutation.

```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154 #Specify the collection ID
    signingAccount: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" # Add your signing account address (the Managed wallet account address from the GetWallet query)
    recipients: [{
          account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
          simpleParams: {
            tokenId: {integer: 6533} #Token ID to transfer
            amount:1 #Amount to transfer
          }
        }]        
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
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154 #Specify the collection ID
    signingAccount: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" # Add your signing account address (the Managed wallet account address from the GetWallet query)
    recipients: [{
          account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
          simpleParams: {
            tokenId: {integer: 6533} #Token ID to transfer
            amount:1 #Amount to transfer
          }
        }]        
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
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154 #Specify the collection ID
    signingAccount: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" # Add your signing account address (the Managed wallet account address from the GetWallet query)
    recipients: [{
          account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
          simpleParams: {
            tokenId: {integer: 6533} #Token ID to transfer
            amount:1 #Amount to transfer
          }
        }]        
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
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 7154 #Specify the collection ID
    signingAccount: "cxMkGKAmD73fGoFVaKj5HNmeLRHpTFDf5oQMp2dsqKJ8uZ3tT" # Add your signing account address (the Managed wallet account address from the GetWallet query)
    recipients: [{
          account: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
          simpleParams: {
            tokenId: {integer: 6533} #Token ID to transfer
            amount:1 #Amount to transfer
          }
        }]        
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