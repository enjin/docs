---
title: "Adding Metadata"
slug: "adding-metadata"
description: "Learn how to create currency tokens using Enjin's platform, perfect for powering blockchain economies within games and applications."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Adding <GlossaryTerm id="metadata" /> to a token enables games and apps to import detailed information and showcase your token's data. Usually, digital assets are identified just by its <GlossaryTerm id="token_id" />. Metadata adds extra details to these assets, giving them properties such as a title, a narrative, and visuals.

:::info What you'll need:
- Some [ Enjin Coin](/01-getting-started/03-using-enjin-coin.md) on Enjin Matrixchain to pay for <GlossaryTerm id="transaction_fees" /> and metadata <GlossaryTerm id="storage_deposit" />s.  
You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- A [Collection](/02-guides/01-managing-tokens/01-creating-collections.md) and a [Token](/02-guides/01-managing-tokens/02-creating-tokens/02-creating-tokens.md) to add metadata to.
- Follow our [Best Practices for Collection/Token Metadata](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md).
:::

You can even use metadata to attach gifs, videos, and 3D models to your token. This data can be stored both on-chain and off-chain to allow users and other supported platforms to access the information.

When storing data on-chain, metadata can be defined as attributes such as name, description, fallback image, and any other attribute you choose. However, if the data is stored off-chain, it should always reference a centralized public repository through a .json file.

## Metadata Storage

There are three main ways to store metadata for your tokens:

1. **On-Chain Storage: Attributes**
   - Storing metadata directly on the blockchain is known as on-chain storage.
   - It's immutable and highly secure since it's protected by the Enjin Blockchain's decentralized nature.
   - On-chain storage can cost a small fee at the time of mint and has slight limitations in terms of space, making it suitable for smaller, permanent files.

2. **Off-Chain Storage: JSON**
   - This means the metadata is stored outside the blockchain on a separate server or database. 
   - It's often accessible through a URL, typically pointing to a JSON file containing the asset's information.
   - Off-chain storage is cheaper and more flexible for large or frequently updated data, but it relies on external servers' availability and security.

3. **InterPlanetary File System (<GlossaryTerm id="ipfs" />): JSON**
   - IPFS is a decentralized storage solution that distributes file storage across a network of computers.
   - It allows metadata to be stored off the main blockchain but in a way that's still decentralized, tamper-proof, and permanent.
   - IPFS assigns a unique hash to each file. When you store metadata on IPFS, you link to it using this hash, ensuring the data remains unchanged. 

Each option has trade-offs between cost, reliability, and security, and the choice depends on the specific needs and goals of the digital asset being created.

## Attributes: OnChain Metadata

You can assign multiple on-chain attributes to a token simultaneously, which allows you to define the metadata of the token. 

Some commonly recognized attributes, following the [Universal Metadata Standard](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md), include:

- **`name`:** The title of the token.
- **`description`:** A brief explanation or description of the token.
- **`media`:** A token image, GIF, or MP4 to represent the token.
- **`URI`:** The web address (URL) where the JSON file containing the token's off-chain or IPFS metadata is hosted.

:::tip Need to add more metadata?
Check the [Best Practices for Collection/Token Metadata](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md), and the [Universal Metadata Standard](https://enj.in/metadata).
:::

:::warning Attributes for Collections and Tokens are very similar.
The process of adding attributes is similar for both collections and tokens.  
While this tutorial guides you through adding an attribute to a token, you can follow the same steps to add attributes to a collection.  
Simply navigate to the corresponding menu for collections instead of tokens.  
:::

:::warning **Important:** Attribute keys are case sensitive.
Ensure you use the correct casing when defining attributes to avoid errors.
:::

**There are two ways to add metadata:**

1. [Using the Enjin Dashboard](#option-a-using-the-enjin-dashboard)
2. [Using the GraphQL API & SDKs](#option-b-using-the-enjin-api--sdks)

### Option A. Using the Enjin Dashboard

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to add / edit attributes for, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Attributes**" button.

![Adding Metadata](/img/guides/managing-tokens/adding-metadata.gif)

:::tip Need to add multiple attributes for a token?
Click on the "**Batch**" button, followed by "**Batch SetAttribute**".
:::

To add / edit an attribute, select the "**Set**" option, type in the "**Key**" that you wish to add / edit, and it's "**Value**" in the corresponding text fields.

Once you're satisfied with the options, click on the "**Set Attribute**" button at the bottom right corner to create the request.

<p align="center">
  <img src={require('/img/guides/managing-tokens/set-attribute-form.png').default} alt="Set Attribute form" />
</p>

The Transaction Request will then appear in the "**Transactions**" menu.

<p align="center">
  <img src={require('/img/guides/managing-tokens/set-attribute-banner.png').default} width="600" alt="Set Attribute Banner" />
</p>

![Pending Set Attribute Banner](/img/guides/managing-tokens/pending-set-attr-txn.png)

Since this request requires a <GlossaryTerm id="transaction" />, it'll need to be signed with your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

### Option B. Using the Enjin API & SDKs

The BatchSetAttribute mutation allows you to efficiently set or update multiple attributes for a specific token within a collection in a single blockchain transaction. Attributes represent various properties, characteristics, or metadata associated with a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSetAttribute {
  BatchSetAttribute(
    collectionId: 36105 # Specify the collection ID
    tokenId: {integer: 0 } #Specify the token ID. If you wish to add collection metadata, omit this line entirely.
    attributes: [
      {
        key: "name" #Provide an attribute name
        value: "Chronicles of the Celestium"  #Provide an attribute value
      },
      {
        key: "description" #Provide an attribute name
        value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."  #Provide an attribute value
      },
      {
        key: "uri" #Provide an attribute name
        value: "https://yourhost/metadata.json"  #Provide an attribute value
      }
    ]
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
-d '{"query":"mutation BatchSetAttribute($collection_id: BigInt!, $token_id: BigInt) {\r\n  BatchSetAttribute(\r\n    collectionId: $collection_id\r\n    tokenId: { integer: $token_id }\r\n    attributes: [\r\n      { key: \"name\", value: \"Chronicles of the Celestium\" }\r\n      {\r\n        key: \"description\"\r\n        value: \"An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse.\"\r\n      }\r\n      { key: \"uri\", value: \"https://yourhost/metadata.json\" }\r\n    ]\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}","variables":{"collection_id":36105,"token_id":0}}'
```
  </TabItem>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

//Define attributes to set
var attributes = new List<AttributeInput>
{
    new AttributeInput()
        .SetKey("name") //Provide an attribute name
        .SetValue("Chronicles of the Celestium"), //Provide an attribute value
    new AttributeInput()
        .SetKey("description") //Provide an attribute name
        .SetValue("An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."), //Provide an attribute value
    new AttributeInput()
        .SetKey("uri") //Provide an attribute name
        .SetValue("https://yourhost/metadata.json") //Provide an attribute value
};

// Setup the mutation
var batchSetAttribute = new BatchSetAttribute()
    .SetCollectionId(36105) //Specify the collection ID
    .SetTokenId(new EncodableTokenIdInput().SetInteger(0)) //Specify the token ID. If you wish to add collection metadata, omit this line entirely.
    .SetAttributes(attributes.ToArray());  //Set the previously defined attributes as an array

// Define and assign the return data fragment to the mutation
var batchSetAttributeFragment = new TransactionFragment()
    .WithId()
    .WithMethod()
    .WithState();

batchSetAttribute.Fragment(batchSetAttributeFragment);

// Create and auth a client to send the request to the platform
var client = PlatformClient.Builder()
    .SetBaseAddress("https://platform.canary.enjin.io")
    .Build();
client.Auth("Your_Platform_Token_Here");

// Send the request and write the output to the console.
// Only the fields that were requested in the fragment will be filled in,
// other fields which weren't requested in the fragment will be set to null.
var response = await client.SendBatchSetAttribute(batchSetAttribute);
Console.WriteLine(JsonSerializer.Serialize(response.Result.Data));
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreMutations.hpp"
#include <iostream>

using namespace enjin::platform::sdk;
using namespace std;

int main() {

    //Define attributes to set
    vector<AttributeInput> vectorAttributes;
    AttributeInput nameAttribute1 = AttributeInput()
            .SetKey(make_shared<SerializableString>("name"))
            .SetValue(make_shared<SerializableString>("Chronicles of the Celestium"));

    AttributeInput nameAttribute2 = AttributeInput()
            .SetKey(make_shared<SerializableString>("description"))
            .SetValue(make_shared<SerializableString>("An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."));

    AttributeInput nameAttribute3 = AttributeInput()
            .SetKey(make_shared<SerializableString>("uri"))
            .SetValue(make_shared<SerializableString>("https://yourhost/metadata.json"));
  
    vectorAttributes.push_back(nameAttribute1);
    vectorAttributes.push_back(nameAttribute2);
    vectorAttributes.push_back(nameAttribute3);

    shared_ptr<SerializableArray<AttributeInput>> attributes = make_shared<SerializableArray<AttributeInput>>(vectorAttributes);

    // Setup mutation data
    shared_ptr tokenId = make_shared<EncodableTokenIdInput>();
    tokenId->SetInteger(make_shared<SerializableString>("0"));

    // Setup mutation
    BatchSetAttribute batchSetAttribute = BatchSetAttribute();
    batchSetAttribute
        .SetCollectionId(make_shared<SerializableString>("2406"))
        .SetTokenId(tokenId)
        .SetAttributes(attributes);

    // Define and assign the return data fragment to the mutation
    shared_ptr<TransactionFragment> transactionFragment = make_shared<TransactionFragment>();
    transactionFragment
        ->WithId()
        .WithMethod()
        .WithState();

    batchSetAttribute.SetFragment(transactionFragment);

    // Create and auth a client to send the request to the platform
    unique_ptr<PlatformClient> client = PlatformClient::Builder()
            .SetBaseAddress("https://platform.canary.enjin.io")
            .Build();
    client->Auth("Your_Platform_Token_Here");

    // Send the request then get the response and write the output to the console.
    // Only the fields that were requested in the fragment will be filled in,
    // other fields which weren't requested in the fragment will be set to null.
    future<shared_ptr<IPlatformResponse<GraphQlResponse<Transaction>>>> futureResponse = SendBatchSetAttribute(*client, batchSetAttribute);

    // Get the platform response holding the HTTP data
    PlatformResponsePtr<GraphQlResponse<Transaction>> response = futureResponse.get();

    // Get the result, a GraphQL response, holding the GraphQL data
    const optional<GraphQlResponse<Transaction>>& gqlResult = response->GetResult();

    // Write the result data to the console
    if (gqlResult.has_value() && gqlResult->IsSuccess())
    {
        const optional<Transaction>& transaction = gqlResult->GetData()->GetResult();

        std::cout << to_string(transaction->GetId().value()) << std::endl;
        std::cout << ToString(transaction->GetMethod().value()) << std::endl;
    }

    // Write any error messages to the console
    if (gqlResult.has_value() && gqlResult->HasErrors())
    {
        const optional<vector<GraphQlError>>& errors = gqlResult->GetErrors();

        for (const GraphQlError& error : errors.value()) {
            std::cout << error.GetMessage().value() << std::endl;
        }
    }

    client.reset();

    return 0;
}
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.canary.enjin.io/graphql', {
  method: 'POST',
  headers: {'Content-Type': 'application/json','Authorization': 'Your_Platform_Token_Here'},
  body: JSON.stringify({
    query: `
      mutation BatchSetAttribute($collection_id: BigInt!, $token_id: BigInt) {
        BatchSetAttribute(
          collectionId: $collection_id
          tokenId: { integer: $token_id }
          attributes: [
            {
              key: "name"
              value: "Chronicles of the Celestium"
            }
            {
              key: "description"
              value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
            }
            {
              key: "uri"
              value: "https://yourhost/metadata.json"
            }
          ]
        ) {
          id
          method
          state
        }
      }
    `,
    variables: {
      collection_id: 36105, //Specify the collection ID
    	token_id: 0 //Specify the token ID.
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
    mutation BatchSetAttribute($collection_id: BigInt!, $token_id: BigInt) {
      BatchSetAttribute(
        collectionId: $collection_id
        tokenId: { integer: $token_id }
        attributes: [
          { key: "name", value: "Chronicles of the Celestium" }
          {
            key: "description"
            value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
          }
          { key: "uri", value: "https://yourhost/metadata.json" }
        ]
      ) {
        id
        method
        state
      }
    }
  `,
  variables: {
    collection_id: 36105, //Specify the collection ID
    token_id: 0 //Specify the token ID.
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
mutation BatchSetAttribute($collection_id: BigInt!, $token_id: BigInt) {
  BatchSetAttribute(
    collectionId: $collection_id
    tokenId: { integer: $token_id }
    attributes: [
      { key: "name", value: "Chronicles of the Celestium" }
      {
        key: "description"
        value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse."
      }
      { key: "uri", value: "https://yourhost/metadata.json" }
    ]
  ) {
    id
    method
    state
  }
}
'''

variables = {
  'collection_id': 36105, #Specify the collection ID
  'token_id': 0, #Specify the token ID.
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

## JSON File: Off-Chain & IPFS Metadata

A JSON file can be used to provide comprehensive information about the asset, including its description, visual representation, multimedia attachments, external references, categorization, associated files, and specific attributes.

Take a look at this simple JSON schema (following the [Universal Metadata Standard](https://enj.in/metadata)) to learn how to properly format the off-chain metadata for your NFT.

```json
{
   "name": "Starforged Cleaver",
   "description": "A blade smithed from cosmic steel, its edge sharp enough to slice through the fabric of reality itself.",
   "external_url": "https://enjin.io",
   "fallback_image": "https://yourhost/image.jpg",
   "media": [
      {
         "type": "image/png",
         "url": "https://yourhost/image.jpg"
      }
   ],
   "attributes": {
      "Strength": {
         "value": "800"
      }
   }
}
```

Take note of these data points:

- **`description`**: This field provides a human-readable description of the asset. It's a text description that helps users understand the nature or significance of the asset.

- **`media`**: The `media` field contains a URL pointing to an image representation of the asset. It supports PNG, GIF, and JPG file formats. 

- **`external_url`**: The "external_url" field is a URL pointing to an external application or website where users can view additional information or interact with the asset. 

- **`attributes`**: This is an object array where each object should contain an `title` and `value` fields. The attribute `title` defines the type of trait or attribute associated with the asset, while `value` can be a string or a number, representing the value of that trait or attribute.

You can also host your JSON files on IPFS, to make your metadata more immutable.

:::tip Need to add more metadata?
Check the [Best Practices for Collection/Token Metadata](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md), and the [Universal Metadata Standard](https://enj.in/metadata).
:::

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/01-getting-started/05-using-enjin-api/02-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.

For instance, you'll find settings such as `continueOnFailure` to skip data that would cause the whole batch to fail, or the ability to sign using a managed wallet with the `signingAccount` argument.
:::

:::tip What's next?
To mint some token supply, head to the [Minting Tokens](/02-guides/01-managing-tokens/04-minting-a-token.md) tutorial.
:::