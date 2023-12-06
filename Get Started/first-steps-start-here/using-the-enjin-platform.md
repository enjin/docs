---
title: "Using the Enjin Platform"
slug: "using-the-enjin-platform"
excerpt: "Making it easy to build profitable Web3 games."
hidden: false
createdAt: "Tue Oct 31 2023 17:45:30 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 29 2023 18:29:29 GMT+0000 (Coordinated Universal Time)"
---
> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) to pay for <<glossary:Transaction Fees>>.

# 1. Set Up an <<glossary:Enjin Platform>> Account

To get started, go ahead and create an account on the <<glossary:Cloud-Based Enjin Platform>> and **verify your email address.**

> 🚧 There are three versions of the Enjin Platform to choose from:
> 
> - The [Cloud-Based Testnet Platform](https://platform.canary.enjin.io), connected to the Enjin <<glossary:Canary>> <<glossary:Testnet>>.
> - The [Cloud-Based Mainnet Platform](http://platform.enjin.io/), connected to the Enjin <<glossary:Blockchain>> <<glossary:Mainnet>>.
> - The [Open-Source Platform](doc:open-source-platform) which you can run locally to connect to either network.

## Things you should know

- <<glossary:Enjin Blockchain>> is <<glossary:Immutable>>, which is why we recommend building your initial proof-of-concept on Enjin <<glossary:Canary>> <<glossary:Testnet>> – the fast and free environment for testing Enjin's tools.
- Every "<<glossary:Mutation>>" request (i.e, minting a <<glossary:Token>>) must be signed by a <<glossary:Wallet Account>>.

# 2. Set Up an API Token

Once your account is created, create a new API token by clicking the "**Create API Token**", which can be found on the [Account Settings](https://platform.canary.enjin.io/settings) page.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/014f61d-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


Copy and save that token somewhere safe, you'll need that to automatically approve transactions using a <<glossary:Wallet Daemon>>.

> **Note:** You can always revoke the token and create another one in the future.

# 3. Set Up a Wallet

Transactions can be approved in 2 different ways:

- **Manually:** Using the [Enjin Wallet](https://enjin.io/products/wallet) / [Polkadot{.js}](https://polkadot.js.org/).
- **Automatically:** Using the [Enjin Wallet Daemon](https://enjin.readme.io/docs/wallet-daemon).

> 📘 Start by manually approving transactions
> 
> If you're using the platform for the first time, we recommend [Using Enjin Wallet / Polkadot{.js}](doc:using-the-enjin-platform#using-enjin-wallet--polkadotjs)
> 
> Enjin wallet app is available on both [iOS](https://enj.in/ios-wallet) and [Android](https://enj.in/android-wallet).

### A. Using Enjin Wallet / Polkadot{.js}

Connect your wallet by clicking the "**Connect Wallet**" button in the top right corner and follow the on-screen instructions.  
The <<glossary:Enjin Wallet App>> also offers gamers a user-friendly, secure, and rewarding experience, ensuring their continuous engagement with your game.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d189a51-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


### B. Using Daemon Wallet

The Enjin Wallet Daemon can automatically sign requests for you.

To download and set up wallet daemon, head over to the [Wallet Daemon Setup](doc:wallet-daemon) page.  
To ensure that only authorized requests are approved, the Wallet daemon needs to be configured with an Enjin Platform API Token.  
Create an API Token on the [Account Settings](https://platform.canary.enjin.io/settings) page and set the Platform API Token in your Wallet Daemon configuration.

Once your wallet daemon is connected, your Platform account is set up and ready to use!

# 4. Create Platform Requests

Now that the Platform account is set up, we can start creating platform requests.  
In this example we will be creating a <<glossary:Collection>>.

**There are two ways to create Platform requests:**

- [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
- [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

> 📘 Which approach should I use?
> 
> Everything that can be done via the Platform's User Interface, can be done programmatically via the <<glossary:GraphQL>> API or any of the Platform <<glossary:SDK>>s.
> 
> If you are just starting out, we recommend using the Platform User Interface as it's more user friendly.
> 
> However, if you need to make a Platform request programmatically, you can do that via the <<glossary:Enjin Platform API>> / <<glossary:SDK>>s.

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Collections](https://platform.canary.enjin.io/collections)**". Then, click the "**[Create Collection](https://platform.canary.enjin.io/create/collection)**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b88b654-image.png",
        null,
        "Make sure to complete the Mint Policy and Attributes sections."
      ],
      "align": "center",
      "caption": "Create Collection form"
    }
  ]
}
[/block]


From here, you can customize your collection's Mint Policy, Market Policy, Explicit Royalty Currencies (optional), and Attributes.

Once you're satisfied with the options, click on the "**Create**" button at the bottom right corner to create the request.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/77573bb-image.png",
        null,
        "Notification that appears after creating a transaction request"
      ],
      "align": "center",
      "caption": "A notification appears after you create a <<glossary:Mutation>>."
    }
  ]
}
[/block]


## Option B. Using the GraphQL API / SDKs

To create a Platform request programmatically, use the <<glossary:GraphQL>> API, or one of the <<glossary:SDK>>s.  
This mutation will set up a new transaction that once finalized on-chain will contain the new collection id in the transaction <<glossary:Events>>. 

> 📘 Test your requests in the GraphiQL Playground:
> 
> - [Testnet](https://platform.canary.enjin.io/graphiql)
> - [Mainnet](https://platform.enjin.io/graphiql)

If you are not using the playground, you need to add your API token to the headers to be authenticated, like so:

```
"Authorization": "<API Token Key Here>"
```

```graphql
mutation CreateCollection {
  CreateCollection(mintPolicy: { forceSingleMint: false }) {
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
      mutation CreateCollection ($forceSingleMint: Boolean!) {
        CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}) {
          id
          method
          state
        }
      }
    `,
    variables: {
      forceSingleMint: false
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
    mutation CreateCollection ($forceSingleMint: Boolean!) {
      CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}) {
        id
        method
        state
      }
    }
  `,
  variables: {
    forceSingleMint: false
  }
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
```python
import requests

query = '''
  mutation CreateCollection ($forceSingleMint: Boolean!) {
    CreateCollection(mintPolicy: {forceSingleMint: $forceSingleMint}
    ) {
      id
      method
      state
    }
  }
'''

variables = {'forceSingleMint': False}

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```

A WebSocket event will also be fired so you can pick up the collection in real time by listening to the app channel on the WebSocket.

# 5. Approve Platform Requests

Once a Platform request is created, all that remains is to approve it, which will sign the transaction and broadcast it to the Enjin Blockchain

Transaction requests are displayed in the "**[Transactions](https://platform.canary.enjin.io/transactions)**" menu.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e2b1120-image.png",
        null,
        "Clicking `View` on the notification will take you to your Transactions List."
      ],
      "align": "center",
      "caption": "A pending Platform request"
    }
  ]
}
[/block]


Since this transaction is a <<glossary:Mutation>>, you will need to sign the transaction using your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.  
  ![](https://files.readme.io/850e544-Animation2.gif)

And that's it! The transaction is then broadcasted to the Enjin Blockchain, and once approved, it will be included in a <<glossary:Block>>.

# 6. Receive Transaction Information

There are 3 ways to receive the transaction status and information:

### Receive Transaction Information Using the Platform User Interface

To check the transaction status, head over to the [Transactions](https://platform.canary.enjin.io/transactions) page locate the transaction and click on the button to it's right to show more details.  
Once the transactions approves on-chain, the transaction will get updated with the `FINALIZED` state and the transaction events will be displayed.  
In the events, we can find useful information, such as the newly created collection ID.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/81a9fa3-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


### Receive Transaction Information Using the GraphQL API / SDKs

To receive the transaction information programmatically, You can use the `GetTransaction` query and set the `id` to the ID received in the `CreateCollection` mutation.  
But for this example, we're going to use the `GetPendingEvents` query, which returns all of the events emitted to your platform account.

> 🚧 This query might return items in multiple pages using Connections
> 
> To learn how to use GraphQL cursors for pagination, head to [Using the API --> Pagination](doc:using-graphql#pagination).

**Query:**

```graphql
query GetPendingEvents{
  GetPendingEvents{
    edges{
      node{
        name
        data
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
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      query GetPendingEvents{
        GetPendingEvents{
          edges{
            node{
              name
              data
            }
          }
        }
      }
    `,
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    query GetPendingEvents{
      GetPendingEvents{
        edges{
          node{
            name
            data
          }
        }
      }
    }
  `,
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
```python
import requests

query = '''
  query GetPendingEvents{
    GetPendingEvents{
      edges{
        node{
          name
          data
        }
      }
    }
  }
'''

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
    "GetPendingEvents": {
      "edges": [
        {
          "node": {
            "name": "platform:transaction-created",
            "data": {
              "id": 1648,
              "state": "PENDING",
              "method": "CreateCollection",
              "idempotencyKey": "00e32324-acfa-4ddb-8b7d-6dd8d0b4f694"
            }
          }
        },
        {
          "node": {
            "name": "platform:transaction-updated",
            "data": {
              "id": 1648,
              "state": "BROADCAST",
              "method": "CreateCollection",
              "result": null,
              "transactionId": null,
              "idempotencyKey": "00e32324-acfa-4ddb-8b7d-6dd8d0b4f694",
              "transactionHash": "0xeb2510094c53317e19ca188b5ba8a21b81f36f4bc1be09e079b46ee7b9bce754"
            }
          }
        },
        {
          "node": {
            "name": "platform:collection-created",
            "data": {
              "owner": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
              "collectionId": "38224",
              "idempotencyKey": "00e32324-acfa-4ddb-8b7d-6dd8d0b4f694"
            }
          }
        },
        {
          "node": {
            "name": "platform:transaction-updated",
            "data": {
              "id": 1648,
              "state": "FINALIZED",
              "method": "CreateCollection",
              "result": "EXTRINSIC_SUCCESS",
              "transactionId": "1404095-2",
              "idempotencyKey": "00e32324-acfa-4ddb-8b7d-6dd8d0b4f694",
              "transactionHash": "0xeb2510094c53317e19ca188b5ba8a21b81f36f4bc1be09e079b46ee7b9bce754"
        }
      ]
    }
  }
}
```

The first event with `PENDING` state was emitted when the `CreateCollection` platform request was created.  
The second event with `BROADCAST` state was emitted when the transaction was signed and broadcasted to the Enjin Blockchain.  
The third event was emitted when the collection was created on-chain, and has the `collectionId` in it's data.  
The forth and final event with `FINALIZED` state was emitted when the platform request was finalized.

> For the full list of platform states, check the [Enjin API Schema --> Important Arguments](doc:important-arguments#state) page.

> 📘 Acknowledging Events
> 
> To remove the pending events from the queue after fetching them, set the `acknowledgeEvents` parameter to true

### Receive Transaction Information by Listening to Platform Websocket Events

> 🚧 Websocket URLs
> 
> Enjin Platform Cloud **Canary**: `wss://ws-us2.pusher.com:443/app/47c4823b9956ae501bd1?protocol=7`
> 
> Enjin Platform Cloud **Mainnet**: `wss://ws-us2.pusher.com:443/app/02cbd93e7842fb1db299?protocol=7`

The Enjin Platform emits events that you can listen to for various operations.  
For example, whenever a transaction is issued by your wallet daemon, an event is emitted via Websocket.

Listening to events is especially useful when awaiting for a transaction to be approved on-chain.

Platform events are emitted to the platform Websocket server, in a channel of the issuer `address` or `platform`.  
We can listen to events related to that wallet address by initiating a Websocket connection to the platform's pusher server, and subscribing to the channel with the value of the issuer address. (In this example, it's "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"):

```json
{
  "event":"pusher:subscribe",
  "data":{
    "channel":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
  }
}
```

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d97861f-Pusher.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 <<glossary:Open-Source Enjin Platform>>
> 
> Once you've fully tested the <<glossary:Cloud-Based Enjin Platform>>, you may consider transitioning to the <<glossary:Open-Source Enjin Platform>> for the following reasons:
> 
> - Complete control over data and infrastructure.
> - Eliminates dependence on third-party servers.
> - Enhanced customization and scalability.
> - Ideal for projects requiring advanced features and customization options.
> - Ensures full ownership and autonomy over your NFT platform.
> 
> To set it up, check out the [Open-Source Platform](doc:open-source-platform) page.

> 👍 Next, learn how to [Use the API](/docs/using-graphql).