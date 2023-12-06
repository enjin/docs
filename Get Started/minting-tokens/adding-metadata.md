---
title: "Adding Metadata"
slug: "adding-metadata"
excerpt: "Personalize your token, make it unique, give it life."
hidden: false
createdAt: "Fri Nov 10 2023 05:11:10 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Dec 03 2023 08:42:54 GMT+0000 (Coordinated Universal Time)"
---
Adding <<glossary:Metadata>> to a token enables games and apps to import detailed information and showcase your token's data. Usually, digital assets are identified just by its <<glossary:Token ID>>. Metadata adds extra details to these assets, giving them properties such as a title, a narrative, and visuals.

> 📘 What you'll need
> 
> - Some [ Enjin Coin](doc:using-enjin-coin) on Enjin Matrixchain to pay for <<glossary:Transaction Fees>> and metadata <<glossary:Storage Deposit>>s.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).
> - A [Collection](doc:create-a-collection) and a [Token](doc:create-a-token) to add metadata to.
> - Follow our [Best Practices for Collection/Token Metadata](doc:metadata-standard).

You can even use metadata to attach gifs, videos, and 3D models to your token. This data can be stored both on-chain and off-chain to allow users and other supported platforms to access the information.

When storing data on-chain, metadata can be defined as attributes such as name, description, fallback image, and any other attribute you choose. However, if the data is stored off-chain, it should always reference a centralized public repository through a .json file.

# Metadata Storage

There are three main ways to store metadata for your tokens:

1. **On-Chain Storage: Attributes**
   - Storing metadata directly on the blockchain is known as on-chain storage.
   - It's immutable and highly secure since it's protected by the Enjin Blockchain's decentralized nature.
   - On-chain storage can cost a small fee at the time of mint and has slight limitations in terms of space, making it suitable for smaller, permanent files.

2. **Off-Chain Storage: JSON**
   - This means the metadata is stored outside the blockchain on a separate server or database. 
   - It's often accessible through a URL, typically pointing to a JSON file containing the asset's information.
   - Off-chain storage is cheaper and more flexible for large or frequently updated data, but it relies on external servers' availability and security.

3. **InterPlanetary File System (<<glossary:IPFS>>): JSON**
   - IPFS is a decentralized storage solution that distributes file storage across a network of computers.
   - It allows metadata to be stored off the main blockchain but in a way that's still decentralized, tamper-proof, and permanent.
   - IPFS assigns a unique hash to each file. When you store metadata on IPFS, you link to it using this hash, ensuring the data remains unchanged. 

Each option has trade-offs between cost, reliability, and security, and the choice depends on the specific needs and goals of the digital asset being created.

# Attributes: OnChain Metadata

You can assign multiple on-chain attributes to a token simultaneously, which allows you to define the metadata of the token. 

Some commonly recognized attributes, following the [Universal Metadata Standard](https://enj.in/metadata), include:

- **`name`:** The title of the token.
- **`description`:** A brief explanation or description of the token.
- **`media`:** A token image, GIF, or MP4 to represent the token.
- **`URI`:** The web address (URL) where the JSON file containing the token's off-chain or IPFS metadata is hosted.

> 📘 Need to add more metadata?
> 
> Check the [Best Practices for Collection/Token Metadata](doc:metadata-standard), and the [Universal Metadata Standard](enj.in/metadata).

> 🚧 Attributes for Collections and Tokens are very similar.
> 
> The process of adding attributes is similar for both collections and tokens.
> 
> While this tutorial guides you through adding an attribute to a token, you can follow the same steps to add attributes to a collection.
> 
> Simply navigate to the corresponding menu for collections instead of tokens.

**There are two ways to add metadata:**

- [Using the Platform User Interface](#option-a-using-the-platform-user-interface)
- [Using the GraphQL API](#option-b-using-the-graphql-api--sdks)

## Option A. Using the Platform User Interface

In the Platform menu, navigate to "**[Tokens](https://platform.canary.enjin.io/tokens)**".  
**Locate the token** you wish to add / edit attributes for, click the **3 vertical dots** (**⋮**) to it's right, then click the "**Attributes**" button.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/47c3628-Animation.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 Need to add multiple attributes for a token?
> 
> Click on the "**Batch**" button, followed by "**Batch SetAttribute**".

To add / edit an attribute, select the "**Set**" option, type in the "**Key**" that you wish to add / edit, and it's "**Value**" in the corresponding text fields.

Once you're satisfied with the options, click on the "**Set Attribute**" button at the bottom right corner to create the request.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e4186b9-image.png",
        null,
        "Set Attribute form on Enjin Platform"
      ],
      "align": "center",
      "sizing": "400px",
      "caption": "Set Attribute form on Enjin Platform"
    }
  ]
}
[/block]


The Transaction Request will then appear in the "**Transactions**" menu.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bf813f3-image.png",
        null,
        "A notification appears after you create a <<glossary:Mutation>>."
      ],
      "align": "center",
      "caption": "A notification appears after you create a <<glossary:Mutation>>."
    }
  ]
}
[/block]


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e1ea47b-image.png",
        null,
        "Clicking \"**View**\" on the notification will take you to your Transactions List."
      ],
      "align": "center",
      "caption": "Clicking \"**View**\" on the notification will take you to your Transactions List."
    }
  ]
}
[/block]


Since this transaction is a <<glossary:Mutation>>, you will need to sign the transaction using your Wallet.

- If a **Wallet Daemon is running and configured**, the transaction request will be **signed automatically**.
- If **a wallet is connected** such as the Enjin Wallet or Polkadot.js, the transaction must be **signed manually** by clicking the "**Sign**" button and **approving the signature request** in your wallet.

## Option B. Using the GraphQL API / SDKs

The BatchSetAttribute mutation allows you to efficiently set or update multiple attributes for a specific token within a collection in a single blockchain transaction. Attributes represent various properties, characteristics, or metadata associated with a token.

```graphql
mutation BatchSetAttribute {
  BatchSetAttribute(
    collectionId: 36105 # Specify the collection ID
    tokenId: {integer: 0 } # Specify the token ID. If you wish to add collection metadata, omit this line entirely.
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
      mutation BatchSetAttribute
      (
       $collection_id: BigInt!
       $token_id: BigInt
      ) {
        BatchSetAttribute(
          collectionId: $collection_id
          tokenId: {integer: $token_id } If you wish to add collection metadata, omit this line entirely.
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
```javascript Node.js
const axios = require('axios');

axios.post('https://platform.canary.enjin.io/graphql', {
  query: `
    mutation BatchSetAttribute
    (
     $collection_id: BigInt!
     $token_id: BigInt
    ) {
      BatchSetAttribute(
        collectionId: $collection_id
        tokenId: {integer: $token_id } If you wish to add collection metadata, omit this line entirely.
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
```python
import requests

query = '''
  mutation BatchSetAttribute
  (
   $collection_id: BigInt!
   $token_id: BigInt
  ) {
    BatchSetAttribute(
      collectionId: $collection_id
      tokenId: {integer: $token_id } If you wish to add collection metadata, omit this line entirely.
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

A WebSocket event will also be fired so you can pick up the changes in real-time by listening to the app channel on the WebSocket.

# JSON File: Off-Chain & IPFS Metadata

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

> 📘 Need to add more metadata?
> 
> Check the [Best Practices for Collection/Token Metadata](doc:metadata-standard), and the [Universal Metadata Standard](enj.in/metadata).

> 📘 More Fields and Arguments Available!
> 
> While the examples here cover the core functionalities of the `BatchSetAttribute` mutation, there are a few more settings you can adjust. 
> 
> To view and understand all the available settings for the `BatchSetAttribute` mutation, refer to our GraphQL Schema on Apollo. 
> 
> - [Detailed `BatchSetAttribute` mutation Information on Apollo](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Mutation?query=BatchSetAttribute).
> 
> This resource will guide you in tailoring the `BatchSetAttribute` mutation to your specific requirements.

> 👍 To mint some token supply, head to the [Minting Tokens](/docs/minting-a-token) tutorial.