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

To create a token with Infused ENJ, proceed with the instructions on the [Creating Tokens](/02-tutorials/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) page, but make sure to specify the amount of ENJ to infuse into the token, in the “Infuse ENJ” section.  
If you are using the `CreateToken` mutation, insert the infusion amount in the `params: infusion` parameter.

:::warning Important Note
The `infusion` argument is denoted in `u128`. This means that the number you specify is divided by 10^18 to determine the actual amount of ENJ to be infused.
e.g.: to infuse a token with 5 ENJ, the infusion argument should be set to `5000000000000000000`, which is `5*(10^18)`.
:::

### Anyone Can Infuse

By default, ENJ infusion is restricted only to the collection owner

At any time, as well as at the time of creating the token, the collection owner can select to to allow anyone to add ENJ infusion to the token.  
This can be done with the `CreateToken` mutation by setting the `params: anyoneCanInfuse` parameter to `true`.  
If the token is already created, the `anyoneCanInfuse` state can be adjusted via the `MutateToken` mutation, with the `mutation: anyoneCanInfuse` parameter.

:::warning **Feature Availability Notice**
Currently, the `anyoneCanInfuse` state can only be configured at the time of creating the token. The option to adjust the infusion permission for an existing token via a mutation will be added later on. We will update the documentation once this feature is available.  
In the meantime, if you wish to adjust infusion permission of an existing token now, please use the Enjin Console at [console.enjin.io](https://console.enjin.io).
:::

## Infusing ENJ to existing token

To add ENJ infusion to a token that already exists, use the `Infuse` mutation:

:::warning Important Note
The `amount` argument is denoted in `u128`. This means that the number you specify is divided by 10^18 to determine the actual amount of ENJ to be infused.  
e.g.: to infuse a token with 5 ENJ, the infusion argument should be set to `5000000000000000000`, which is `5*(10^18)`.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Infuse{
  Infuse(
    collectionId: 3298 #Specify the collection ID
    tokenId: {integer: 1} #Specify the token ID
    amount: 5000000000000000000 #Specify the amount of ENJ to infuse
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```
curl --location 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: enjin_api_key' \
-d '{"query":"mutation Infuse(\r\n  $collection_id: BigInt!\r\n  $token_id: EncodableTokenIdInput!\r\n  $amount: BigInt!\r\n) {\r\n  Infuse(collectionId: $collection_id, tokenId: $token_id, amount: $amount) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":3298,"token_id":{"integer":1},"amount":5000000000000000000}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Set up the mutation
var infuse = new Infuse()
    .SetCollectionId(3298) // Specify the collection ID.
    .SetTokenId(new EncodableTokenIdInput().SetInteger(1)) // Specify the token ID.
    .SetAmount(5000000000000000000); // Specify the amount of ENJ to infuse.

// Define and assign the return data fragment to the mutation
var transactionFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

infuse.Fragment(transactionFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendInfuse(infuse);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Coming Soon!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation Infuse(
        $collection_id: BigInt!
        $token_id: EncodableTokenIdInput!
        $amount: BigInt!
      ) {
        Infuse(collectionId: $collection_id, tokenId: $token_id, amount: $amount) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 3298, //Specify the collection ID
      token_id: {integer: 1}, //Specify the token ID
      amount: 5000000000000000000 //Specify the amount of ENJ to infuse
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

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation Infuse(
      $collection_id: BigInt!
      $token_id: EncodableTokenIdInput!
      $amount: BigInt!
    ) {
      Infuse(collectionId: $collection_id, tokenId: $token_id, amount: $amount) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 3298, //Specify the collection ID
    token_id: {integer: 1}, //Specify the token ID
    amount: 5000000000000000000 //Specify the amount of ENJ to infuse
  }
}, {
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'}
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation Infuse(
  $collection_id: BigInt!
  $token_id: EncodableTokenIdInput!
  $amount: BigInt!
) {
  Infuse(collectionId: $collection_id, tokenId: $token_id, amount: $amount) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 3298, #Specify the collection ID
  'token_id': {'integer': 1}, #Specify the token ID
  'amount': 5000000000000000000 #Specify the amount of ENJ to infuse
}

response = requests.post('https://platform.canary.enjin.io/graphql',
  json={'query': query, 'variables': variables},
  headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

Note that you are only allowed to Infuse existing token if you are the collection owner, or if the token's `anyoneCanInfuse` state is set to `True`.
