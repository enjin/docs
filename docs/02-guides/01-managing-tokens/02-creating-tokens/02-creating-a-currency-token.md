---
title: "Creating a Currency Token"
slug: "../creating-a-currency-token"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Similarly to [Tokens](/02-guides/01-managing-tokens/02-creating-tokens/02-creating-tokens.md), "Currency Tokens" are also digital assets that can be traded, sold, or used on the Enjin Blockchain. However, unlike standard tokens, currency tokens support fractional values, allowing them to be divided into smaller units, just like traditional currencies.

:::info What you'll need:
- Some [Enjin Coin](/01-getting-started/02-using-enjin-coin.md) on Enjin Matrixchain to process transactions and at least 0.01 ENJ for the <GlossaryTerm id="token_account_deposit" />.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/03-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-managing-tokens/01-creating-collections.md) to place the tokens in.
:::

Enjin Blockchain allows you to create customized <GlossaryTerm id="token_id" /> structures. This flexibility enables you to organize your tokens in various ways that suit your needs.

For the currency token options, configure the metadata parameter, which consists of 3 values:

- Name: The token name (e.g. Gold Coins).
- Symbol: A short symbol that represents the token (e.g. GOLD).
- Decimals: Max amount of decimals supported for this token (e.g. 2 would mean the token can support up to 2 decimals, like 5.75 Gold Coins).

:::warning Important Note on Decimals Support
The `decimalCount` property specifies how token balances should be displayed in applications, but it does not allow for actual fractional values on the Enjin Blockchain.  
This means that for a token with "Decimals: 2", the balance should be divided by 100 (10^2) when displayed in applications.  
For example, for the Gold Coins token example mentioned above, a balance of 1,575 Gold Coins should be shown as 15.75 (1,575/100) in apps.  
Similarly, when minting tokens, to mint 4.80 Gold Coins, the minted supply parameter should be set to 480 (4.8 \* 10^2).
:::

:::tip Token ID Structure [Best Practices](/02-guides/03-advanced-mechanics/01-tokenid-structure.md)
Before minting the Mainnet versions of your Tokens, that will be used in your live economy. Make sure to take a look at the [best practices for Token ID structure](/02-guides/03-advanced-mechanics/01-tokenid-structure.md).
:::

**There are two ways to use the <GlossaryTerm id="create_asset" /> functionalities:**

- [Using the Platform User Interface](#option-a-using-the-enjin-dashboard)
- [Using the GraphQL API](#option-b-using-the-enjin-api--sdks)

## Option A. Using the Enjin Dashboard

:::warning Unavailable via the User Interface
The option to create a currency token via the user interface is currently being developed.  
For the time being, you can create currency token via [Option B. Using the Enjin API & SDKs](#option-b-using-the-enjin-api--sdks).
:::

## Option B. Using the Enjin API & SDKs

CreateToken mutation enables you to create a new token within an existing collection. This operation is essential for introducing new digital assets, and it allows you to define various attributes and characteristics for the newly created token.  
For the currency token options, configure the metadata parameter, which consists of name, symbol and decimals

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCurrencyToken{
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f" #The recipient of the initial supply
    collectionId: 2406 #Set the collection ID
    params:{
      tokenId: {integer: 0} #Set the token ID
      initialSupply: 1 #Mint initial supply
      cap: {type: INFINITE} #Define supply type
      metadata: {name: "Gold Coins", symbol: "GOLD", decimalCount: 2} #Define currency configuration here
    }
  ) {
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
-d '{"query":"mutation CreateCurrencyToken(\r\n  $recipient: String!\r\n  $collection_id: BigInt!\r\n  $token_id: BigInt\r\n  $initial_supply: BigInt\r\n  $cap: TokenMintCapType!\r\n  $metadata: TokenMetadataInput\r\n) {\r\n  CreateToken(\r\n    recipient: $recipient\r\n    collectionId: $collection_id\r\n    params: {\r\n      tokenId: { integer: $token_id }\r\n      initialSupply: $initial_supply\r\n      cap: { type: $cap }\r\n      metadata: $metadata\r\n    }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"recipient":"cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f","collection_id":2406,"token_id":0,"initial_supply":1,"cap":"INFINITE","metadata":{"name":"Gold Coins","symbol":"GOLD","decimalCount":2}}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

// Define the token metadata input
var tokenMetadata = new TokenMetadataInput()
    .SetName("Token Name") // Set the token name
    .SetSymbol("TKN") // Set the token symbol
    .SetDecimalCount(18); // Set the decimal count

// Define the token parameters
var tokenParams = new CreateTokenParams()
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0)) //Set the token ID
    .SetInitialSupply(1) //Mint initial supply
    .SetCap(new TokenMintCap().SetType(TokenMintCapType.Infinite)) //Define supply type
    .SetMetadata(tokenMetadata); //Set the token metadata

// Set up the mutation
var createToken = new CreateToken()
    .SetRecipient("cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f") //The recipient of the initial supply
    .SetCollectionId(2406) //Set the collection ID
    .SetParams(tokenParams); //Set the previously defined token params

// Define and assign the return data fragment to the mutation
var createTokenFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

createToken.Fragment(createTokenFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendCreateToken(createToken);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
Work in Progress!
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation CreateCurrencyToken
      (
        $recipient: String!
        $collection_id: BigInt!
        $token_id: BigInt
        $initial_supply: BigInt
        $cap: TokenMintCapType!
        $metadata: TokenMetadataInput
      ) {
        CreateToken(
          recipient: $recipient
          collectionId: $collection_id
          params:{
            tokenId: {integer: $token_id}
            initialSupply: $initial_supply 
            cap: {type: $cap} 
            metadata: $metadata
          }
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",  //The recipient of the initial supply
      collection_id: 2406, //Specify the collection ID
      token_id: 0, //Specify the token ID
      initial_supply: 1, //Mint initial supply
      cap: "INFINITE", //Define supply type
      metadata: {name: "Gold Coins", symbol: "GOLD", decimalCount: 2} //Define currency configuration here
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
    mutation CreateCurrencyToken(
      $recipient: String!
      $collection_id: BigInt!
      $token_id: BigInt
      $initial_supply: BigInt
      $cap: TokenMintCapType!
      $metadata: TokenMetadataInput
    ) {
      CreateToken(
        recipient: $recipient
        collectionId: $collection_id
        params: {
          tokenId: { integer: $token_id }
          initialSupply: $initial_supply
          cap: { type: $cap }
          metadata: $metadata
        }
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",  //The recipient of the initial supply
    collection_id: 2406, //Specify the collection ID
    token_id: 0, //Specify the token ID
    initial_supply: 1, //Mint initial supply
    cap: "INFINITE", //Define supply type
    metadata: {name: "Gold Coins", symbol: "GOLD", decimalCount: 2} //Define currency configuration here
  }
}, {
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here' }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation CreateCurrencyToken(
  $recipient: String!
  $collection_id: BigInt!
  $token_id: BigInt
  $initial_supply: BigInt
  $cap: TokenMintCapType!
  $metadata: TokenMetadataInput
) {
  CreateToken(
    recipient: $recipient
    collectionId: $collection_id
    params: {
      tokenId: { integer: $token_id }
      initialSupply: $initial_supply
      cap: { type: $cap }
      metadata: $metadata
    }
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'recipient': 'cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f', #The recipient of the initial supply
  'collection_id': 2406, #Specify the collection ID
  'token_id': 0, #Specify the token ID
  'initial_supply': 1, #Mint initial supply
  'cap': 'INFINITE', #Define supply type
  'metadata': {'name': "Gold Coins", 'symbol': "GOLD", 'decimalCount': 2} #Define currency configuration here
}

response = requests.post('https://platform.canary.enjin.io/graphql',
	json={'query': query, 'variables': variables},
	headers={'Content-Type': 'application/json', 'Authorization': 'Your_Platform_Token_Here'}
)
print(response.json())
```
  </TabItem>
</Tabs>

A WebSocket event will also be fired so you can pick up the changes in real-time by listening to the app channel on the WebSocket.

:::tip
For Token ID management, head to [Best Practices > TokenID Structure](/02-guides/03-advanced-mechanics/01-tokenid-structure.md)
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.  
For instance, you'll find settings such as adding attributes/royalties/supply type and much more with the `CreateTokenParams` argument, or the ability to sign using a managed wallet with the `signingAccount` argument.
:::

:::tip What's next?
To add metadata to your token, go to the [Adding Metadata](/02-guides/01-managing-tokens/03-adding-metadata.md) tutorial.
:::
