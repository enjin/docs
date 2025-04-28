---
title: "NFT Support for Enjin Matrixchain"
slug: "nft-support-for-enjin-matrixchain"
description: "This guide provides three approaches to integrate NFT support on the Enjin Matrixchain."
---
1. **Using Enjin Platform Cloud or Self-hosted Enjin Platform:** Utilizing the [Enjin Platform Cloud](https://enjin.io/technology/platform) or deploying a [self-hosted Enjin Platform](/02-tutorials/04-going-open-source/01-self-hosting.md) instance.
2. **Native Integration:** Direct interaction with the Enjin Matrixchain node using RPC and libraries like `@polkadotjs/api`.
3. **Using Self-hosted Indexer:** Deploying a [self-hosted Enjin Matrixchain Indexer](/04-components/06-blockchain-infrastructure/03-running-enjin-matrixchain-indexer.md).

## Using Enjin Platform Cloud or Self-hosted Enjin Platform

This approach is suitable for developers who do not want the complexities of interfacing with an RPC endpoint and instead want to either seamlessly integrate with an exhaustive GraphQL interface or need access to more complex or historical data. . There are two options:

1. **Using Enjin Platform Cloud:** Enjin offers a cloud-based solution that abstracts the complexities of blockchain interactions and provides an easy-to-use API. Refer to the [Enjin Platform Cloud Guide](/01-getting-started/03-using-the-enjin-platform.md) for detailed integration steps.
2. **Self-hosted Enjin Platform:** For those who wish to maintain control over the platform, setting up a self-hosted Enjin Platform is a viable option. Follow the instructions in the [Self-hosted Enjin Platform Setup Guide](/02-tutorials/04-going-open-source/02-local-installation.md) .

## Native Integration

Native integration involves directly interacting with an Enjin Matrixchain node using the `@polkadot/api` library. This approach is suitable for developers who prefer full control over the blockchain interaction or those with a need to implement support for multiple blockchains (such as various Matrixchains running on the Enjin Blockchain) with a single common interface. Steps to set up Native Integration:

1. **Set Up a Self-hosted Node or Use Public Endpoint:** To run your own node, follow the setup instructions at [Enjin Matrixchain Node Setup Guide](/04-components/06-blockchain-infrastructure/01-enjin-blockchain-nodes/03-run-matrixchain-node.md) . This guide provides detailed steps to deploy and manage Enjin Matrixchain node. You can also use publicly available RPC endpoint, such as: `wss://rpc.matrix.blockchain.enjin.io`
2. **Install `@polkadot/api`:** Use `@polkadot/api` to connect to the node and interact with the blockchain. Install it via `npm`: `npm install @polkadot/api`  
   Sample Code to Retrieve NFT Collection Data: The following code demonstrates how to use @polkadot/api to query NFT collections on the Enjin Matrixchain:

   ```javascript
   const { ApiPromise, WsProvider } = require('@polkadot/api');

   // Connect to Matrixchain node
   const provider = new WsProvider('wss://rpc.matrix.blockchain.enjin.io');

   async function fetchCollections() {
     try {
       // Create an API instance
       const api = await ApiPromise.create({ provider });
       
       // Query NFT collections data
       const collections = await api.query.multiTokens.collections.entries();
       
       collections.forEach(([key, collectionData]) => {
         console.log(`Collection ID: ${key.args[0]}, Data: ${collectionData}`);
       });

       await api.disconnect();
     } catch (error) {
       console.error('Error fetching collections:', error);
     }
   }

   fetchCollections();
   ```

## Using Self-hosted Indexer

:::warning Important
It is a **requirement** to utilise an [Archive Node](/04-components/06-blockchain-infrastructure/01-enjin-blockchain-nodes/03-run-matrixchain-node.md#archive-node) when running an Indexer.
:::

This approach involves setting up both a self-hosted Enjin Matrixchain node and a self-hosted Enjin Matrixchain Indexer ([Subsquid](https://www.sqd.dev/)-based) to enhance data retrieval and querying capabilities. It is ideal for developers who need advanced data access and efficient indexing of blockchain data. Steps to set up:

1. **Set Up a Self-hosted Archive Node:** To run your own node, follow the setup instructions at [Enjin Matrixchain Node Setup Guide](/04-components/06-blockchain-infrastructure/01-enjin-blockchain-nodes/03-run-matrixchain-node.md#archive-node) . This guide provides detailed steps to deploy and manage Enjin Matrixchain node.
2. **Self-hosted Indexer:** Use the [Running a Matrixchain Indexer Guide](/04-components/06-blockchain-infrastructure/03-running-enjin-matrixchain-indexer.md)  to set up and configure your own Indexer. This Indexer will allow for more advanced and efficient data queries than direct node RPC calls, providing a tailored and powerful data layer for your application.

## Conclusion

Choose the integration method that best suits your project needs:

- For an easy to integrate, managed solution with additional services, opt for the **Enjin Platform Cloud or Self-hosted Enjin Platform**.
- For low-level access and full control, use the **Native Integration** approach.
- For advanced data access and indexing, consider the **Self-hosted Indexer** approach.
