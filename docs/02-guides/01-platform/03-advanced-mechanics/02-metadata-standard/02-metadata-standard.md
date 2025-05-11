---
title: "Metadata Standard"
slug: "../metadata-standard"
description: "Explore Enjin’s metadata standards, enabling you to define the characteristics of your blockchain tokens and enhance their utility within decentralized applications."
---
## Best Practices for Collection/Token Metadata

Metadata plays a vital role in the token ecosystem. It provides necessary details about a token and ensures that tokens are presented correctly across various applications.  
To maintain consistency and ensure universal compatibility, it's important to adhere to a specific standard for metadata.

### Why Follow a Metadata Standard?

Following a standard for metadata ensures that token details are accurately represented across all applications that support the standard. This eliminates inconsistencies and ensures that your tokens are presented in the way you intended. 

Adhering to a standard also simplifies the process for application developers, as they can easily support tokens that follow the standard. This contributes to the goal of creating a truly interoperable Metaverse.

For more details on the standard, refer to our [Universal Off-Chain Token Metadata Standard](https://enj.in/metadata).

### Creating Metadata

:::info Need an example?
For a complete example of Collection & Token metadata, check out the [Metadata Example page](/02-guides/03-advanced-mechanics/02-metadata-standard/02-metadata-example.md)
:::

:::warning **Important:** Attribute keys are case sensitive.
Ensure you use the correct casing when defining attributes to avoid errors.
:::

There are two ways to create metadata for your tokens:

1. **Off-chain - Hosted JSON File:** Set the collection or token attribute with the key `uri` and the value as a URL to a off-chain hosted JSON file. This file can be hosted either in a centralized manner or on IPFS.  
   The JSON file should contain metadata that follows the structure defined in the metadata standard.  
   Example:
   ```graphql
   mutation SetMetadataUsingJSON {
       BatchSetAttribute(
           collectionId: 36105 # Specify the collection ID
           tokenId: {integer: 0 } # Specify the token ID
           attributes: [
               {
                   key: "uri"
                   value: "https://yourhost/metadata.json"  #Link to your hosted JSON file.
               }
           ]
       ) {
           id
           method
           state
      }
   }
   ```

2. **On-chain - Directly Setting Metadata:** Set the metadata directly on-chain using a structure that follows the metadata standard.  
   Example:
   ```graphql
   mutation SetMetadataDirectly {
       BatchSetAttribute(
           collectionId: 36105 # Specify the collection ID
           tokenId: {integer: 0 } # Specify the token ID
           attributes: [
               {
                   key: "name" #This attribute key defines the token name, following the metadata standard.
                   value: "Chronicles of the Celestium"  #Token name
               },
               {
                   key: "description" #This attribute key defines the token description, following the metadata standard.
                   value: "An epic saga where players assume the roles of intrepid tradesmiths, shaping destinies with fire and will across the star-woven expanses of the multiverse." #Token description
               }
           ]
       ) {
           id
           method
           state
      }
   }
   ```

Whichever method you choose, it's crucial to ensure the metadata is structured according to the standard to maintain compatibility and present your tokens correctly.  
For a detailed guide on adding metadata, please refer to our [Adding Metadata Tutorial](/02-guides/01-managing-tokens/03-adding-metadata.md).

### Dynamic Metadata Fetching

When an application such as [Enjin wallet](https://enj.in/wallet) / [NFT.io](https://nft.io) loads token metadata, it starts by looking for the `uri` attribute on the token level.  
If there’s no `uri` on the token level, it then looks for the `uri` attribute on the collection level.

While each token could have it’s own uri attribute, It is sometimes more convenient, and efficient, to use Dynamic Metadata.

For Dynamic Metadata fetching, the metadata doesn't exist on each token.  
Instead, one `uri` attribute is set on the collection level, with the dynamic keyword `{id}.json`.  
For example: `https://yourdomain.com/{id}.json`

When fetching a token dynamically, the `{id}` is replaced with the collection ID, followed by the token ID, like this: https://yourdomain.com/8143-72.json.

Dynamic Metadata works best for NFTs with large supply, as usually each NFT has it’s own Metadata, and by using Dynamic Metadata there’s less data stored on-chain, drastically reducing the amount of ENJ tokens required when creating the tokens.

For a detailed step-by-step guide on setting Dynamic Metadata Fetching, please refer to our Help Center article: [Creating and Hosting Metadata Dynamically](https://support.enjin.io/hc/en-gb/articles/16617419735314-Creating-and-Hosting-Metadata-Dynamically)
