---
title: "Metadata Standard"
slug: "metadata-standard"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Sun Nov 12 2023 18:05:47 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 14 2023 18:10:20 GMT+0000 (Coordinated Universal Time)"
---
# Best Practices for Collection/Token Metadata

Metadata plays a vital role in the token ecosystem. It provides necessary details about a token and ensures that tokens are presented correctly across various applications.  
To maintain consistency and ensure universal compatibility, it's important to adhere to a specific standard for metadata.

## Why Follow a Metadata Standard?

Following a standard for metadata ensures that token details are accurately represented across all applications that support the standard. This eliminates inconsistencies and ensures that your tokens are presented in the way you intended. 

Adhering to a standard also simplifies the process for application developers, as they can easily support tokens that follow the standard. This contributes to the goal of creating a truly interoperable Metaverse.

For more details on the standard, refer to our [Universal Off-Chain Token Metadata Standard](https://enj.in/metadata).

## Creating Metadata

There are two ways to create metadata for your tokens:

1. **Off-chain - Hosted JSON File:** Set the collection or token attribute with the key `uri` and the value as a URL to a off-chain hosted JSON file. This file can be hosted either in a centralized manner or on IPFS.  
   The JSON file should contain metadata that follows the structure defined in the metadata standard.  
   Example:
   ```graphql GraphQL
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
For a detailed guide on adding metadata, please refer to our [Adding Metadata Tutorial](doc:adding-metadata).