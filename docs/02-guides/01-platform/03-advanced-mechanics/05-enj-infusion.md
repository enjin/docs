---
title: "ENJ Infusion"
slug: "enj-infusion"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction to ENJ Infusion

ENJ Infusion is an innovative feature of the Enjin Blockchain that allows users to lock Enjin Coin (ENJ) into tokens they create, whether they are <GlossaryTerm id="nft" />s or <GlossaryTerm id="multi_unit_token" />s. This process effectively embeds ENJ into digital assets, providing them with inherent, tangible value. The infused ENJ can only be retrieved when the token is burned, a process known as "melting," ensuring that the token retains its value until it is destroyed.

### Why ENJ Infusion is Needed

ENJ Infusion adds a new layer of value and security to digital assets on the Enjin Blockchain. By tying tokens to a specific amount of ENJ, creators can guarantee a base value for their assets, which can:

- Enhance user confidence and trust in the token's worth.
- Provide a tangible backing that can incentivize acquiring the token.
- Create a more stable and secure environment for trading and utilizing NFTs and <GlossaryTerm id="multi_unit_token" />s.

### Use Cases and Scenarios

ENJ Infusion can be utilized in various applications and games to enhance user experience and provide additional value:

1. **Gaming Rewards:** Game developers can infuse ENJ into in-game items, ensuring players that their rewards have real-world value. For example, a rare sword in an RPG game could have 5 ENJ infused into it, making it not just valuable within the game but also outside of it.
2. **Digital Collectibles:** Creators of digital art and collectibles can infuse ENJ into their NFTs, providing buyers with a guaranteed minimum value. This can make digital art more appealing to collectors, knowing that their collectible is backed by ENJ.
3. **Loyalty Programs:** Businesses can create loyalty tokens with infused ENJ, giving customers a tangible value for their loyalty points. For instance, a company could issue tokens with 0.1 ENJ each, which customers can collect and later melt for ENJ.
4. **Crowdfunding and Fundraising:** Projects can issue tokens with infused ENJ to backers, ensuring that their contributions hold value. This can increase trust and participation in crowdfunding campaigns.
5. **In-Game Incentives:** Game developers can incentivize players to spend more time in their games by infusing additional ENJ into their items for performing certain tasks or achieving milestones.

By integrating ENJ Infusion, creators and developers can provide enhanced value and security for their digital assets, fostering a more robust and trustworthy ecosystem on the Enjin Blockchain.

***

## Creating a Token with Infused ENJ

To create a token with Infused ENJ, follow the [Creating Tokens](/02-guides/01-platform/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) guide and set the **Infuse ENJ** amount on the token creation form.

When creating the token through the API, set the `infusion` field on the `createToken` action of `CreateTransaction`:

```graphql
mutation {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
        collectionId: 3298
        tokenId: 1
        initialSupply: 1
        listingForbidden: false
        infusion: 5000000000000000000  # 5 ENJ in base units
        anyoneCanInfuse: false
      }
    }
  ) { uuid action state }
}
```

:::warning Calculating the infusion amount
The Platform accepts infusion values in the **base unit** (integers), not decimal ENJ amounts. To calculate the correct input, **multiply your desired ENJ amount by 10^18** (1 quintillion).
  - **Formula:** `Desired ENJ infusion` \* `1,000,000,000,000,000,000`
  - **Example:** To infuse a token with **5 ENJ**, input `5000000000000000000`.
:::

### Anyone Can Infuse

By default, ENJ infusion is restricted to the collection owner. Setting `anyoneCanInfuse: true` lets any account add ENJ infusion to the token.

This can be set at token creation via the `createToken` action above, or toggled on an existing token with the `mutateToken` action:

```graphql
mutation {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mutateToken: {
        collectionId: 3298
        tokenId: 1
        anyoneCanInfuse: true
      }
    }
  ) { uuid action state }
}
```

## Infusing ENJ to an existing token

To add ENJ infusion to a token that already exists, use the `infuseToken` action on `CreateTransaction`:

:::warning Calculating the infusion amount
The Platform accepts infusion values in the **base unit** (integers), not decimal ENJ amounts. To calculate the correct input, **multiply your desired ENJ amount by 10^18** (1 quintillion).
  - **Formula:** `Desired ENJ infusion` \* `1,000,000,000,000,000,000`
  - **Example:** To infuse a token with **5 ENJ**, input `5000000000000000000`.
:::

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation InfuseToken {
  CreateTransaction(
    network: ENJIN  # or CANARY for testnet
    chain: MATRIX
    transaction: {
      infuseToken: {
        collectionId: 3298
        tokenId: 1
        amount: 5000000000000000000  # 5 ENJ in base units
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer YOUR_API_TOKEN' \
-d '{"query":"mutation InfuseToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {\r\n  CreateTransaction(\r\n    network: ENJIN\r\n    chain: MATRIX\r\n    transaction: {\r\n      infuseToken: {\r\n        collectionId: $collectionId\r\n        tokenId: $tokenId\r\n        amount: $amount\r\n      }\r\n    }\r\n  ) {\r\n    uuid\r\n    action\r\n    state\r\n  }\r\n}","variables":{"collectionId":3298,"tokenId":1,"amount":"5000000000000000000"}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using System.Numerics;
using Enjin.Platform.Sdk;

// Create and authenticate the client
using var client = new PlatformClient();
client.Auth("<your-platform-token>");

// Build the CreateTransaction mutation (one action set on TransactionInput)
var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithUuid().WithState(),
        network: Network.Enjin, // or Network.Canary for testnet — match the GraphQL tab
        chain: Chain.Matrix,
        transaction: new TransactionInput
        {
            InfuseToken = new InfuseTokenInput
            {
                CollectionId = 3298,
                TokenId = 1,
                Amount = BigInteger.Parse("5000000000000000000"), // 5 ENJ in base units
            },
        });

// Send the mutation; poll GetTransaction by uuid to track its on-chain state
var response = await client.SendMutation(mutation);
Console.WriteLine(response.Result.Data?.CreateTransaction?.Uuid);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.beta.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'},
  body: JSON.stringify({
    query: `
      mutation InfuseToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
        CreateTransaction(
          network: ENJIN
          chain: MATRIX
          transaction: {
            infuseToken: {
              collectionId: $collectionId
              tokenId: $tokenId
              amount: $amount
            }
          }
        ) {
          uuid
          action
          state
        }
      }
    `,
    variables: {
      collectionId: 3298,
      tokenId: 1,
      amount: "5000000000000000000"
    }
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
const axios = require('axios');

axios.post('https://platform.beta.enjin.io/graphql', {
  query: `
    mutation InfuseToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
      CreateTransaction(
        network: ENJIN
        chain: MATRIX
        transaction: {
          infuseToken: {
            collectionId: $collectionId
            tokenId: $tokenId
            amount: $amount
          }
        }
      ) {
        uuid
        action
        state
      }
    }
  `,
  variables: {
    collectionId: 3298,
    tokenId: 1,
    amount: "5000000000000000000"
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Bearer YOUR_API_TOKEN'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation InfuseToken($collectionId: BigInt!, $tokenId: BigInt!, $amount: BigInt!) {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      infuseToken: {
        collectionId: $collectionId
        tokenId: $tokenId
        amount: $amount
      }
    }
  ) {
    uuid
    action
    state
  }
}
'''

variables = {
  'collectionId': 3298,
  'tokenId': 1,
  'amount': "5000000000000000000"
}

response = requests.post('https://platform.beta.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_TOKEN'}
)
print(response.json())
```
  </TabItem>
</Tabs>

You can only infuse ENJ into an existing token if you are the collection owner, or if the token's `anyoneCanInfuse` state is set to `true`.

:::tip Batched infusions
To infuse ENJ across multiple tokens in a single on-chain transaction, use the `infuseTokens` (plural) discriminator action. See the [Tokens mutations reference](/03-api-reference/02-mutations/03-tokens-mutations.md) for its input shape.
:::

Once an infusion transaction reaches `FINALIZED`, a `MultiTokens.Infused` event is emitted with the collection ID, token ID, account, and amount infused. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it.
