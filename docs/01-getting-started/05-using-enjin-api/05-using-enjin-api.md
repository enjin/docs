---
title: "Using the Enjin API"
slug: "../using-the-enjin-api"
description: "Explore the Enjin API and learn how to easily interact with the Enjin blockchain, mint tokens, and manage digital assets programmatically."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

## Introduction to the Enjin API

The Enjin API is a set of programmatic interfaces that allow developers to interact with the Enjin Platform from their own applications. Built using <GlossaryTerm id="graphql" />,  it enables clients to request exactly the data they need in a flexible and efficient way. Unlike traditional RESTful APIs, which require multiple endpoints for different data requirements, GraphQL enables more efficient data retrieval through a single endpoint. This flexibility reduces the number of network requests and optimizes performance, making it particularly advantageous for applications that require efficient data handling, such as blockchain and NFT platforms.

:::info What you'll need:
- Some [Enjin Coin](/01-getting-started/03-using-enjin-coin.md) to pay for <GlossaryTerm id="transaction_fees" />.  
- You can obtain cENJ (Canary ENJ) for testing from the [Canary faucet](https://faucet.canary.enjin.io/).
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
:::

:::tip New to GraphQL?
If you're more familiar with REST APIs, it's important to understand that our API uses GraphQL - a flexible and powerful query language for APIs. GraphQL works quite differently from REST, and knowing how to structure your queries and handle responses is essential for successful integration.\
We recommend reviewing our [How to Use GraphQL guide](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md)  to get started quickly and effectively.
:::
## Authentication

Access tokens assume a pivotal role in facilitating your application's interaction with the Enjin Platform API.  
These tokens serve a dual purpose:

- They grant your application access to the platform.
- They allow for automatic request approval and signing using the Wallet Daemon.

To make authenticated calls to the Enjin Platform:

1. login or create an account in the [Testnet Enjin Platform Cloud](https://platform.canary.enjin.io).
2. Create an API token if you haven't already.
3. When making HTTP requests to the GraphQL endpoints, include your API token in the request headers using the `Authorization` field:

```
"Authorization": "<API Token Here>"
```

4. _(Optional)_ To automate requests made from the Enjin Platform using a wallet daemon, you need to configure your daemon with the API token.  
   For more details head over to [Using the Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md)

## Endpoints & Queries

Every data transfer strictly adheres to the HTTP/1.1 standard, with HTTPS encryption mandatory for all endpoints to ensure secure communication.

The Enjin API primarily utilizes GraphQL, meaning you'll be sending POST HTTP requests to specific endpoints with your GraphQL queries and mutations. This allows you to interact with the Enjin blockchain in a flexible and efficient manner.

:::tip SDKs for Streamlined Development
For developers looking for a more integrated experience, Enjin also provides official **Software Development Kits (SDKs)** for various programming languages. These SDKs wrap the underlying GraphQL API, offering convenient methods and abstractions to streamline development. You can find more information and links to the available SDKs on our [Software Development Kits (SDKs) page](/02-guides/05-integrations/01-software-development-kit/01-software-development-kit.md).
:::

### Overview of GraphQL Endpoints

The Enjin API is structured around four distinct GraphQL endpoints, each designed to handle specific sets of queries and mutations. This segmentation allows for efficient and organized interactions tailored to different functional areas within the Enjin ecosystem:

1. **Core Operations:** This endpoint handles fundamental blockchain operations such as creating collections, minting and transferring <GlossaryTerm id="multitoken" />s, freezing, and burning <GlossaryTerm id="multitoken" />s . It provides the essential tools for managing and interacting with <GlossaryTerm id="nft" />s on the Enjin Blockchain.

2. **Marketplace:** Focused on marketplace activities, this endpoint encompasses operations like listing tokens for sale, purchasing tokens, and bidding on auctions. It facilitates seamless transactions and interactions within the Enjin Marketplace.

3. **Beam:** The Beam endpoint manages operations related to the Beam system, which is used for distributing tokens claimable via QR codes. This feature is particularly useful for promotional activities and engaging user experiences.

4. **Fuel Tanks:** This endpoint is dedicated to the Fuel Tank system, which allows for subsidizing transaction fees. It supports operations that manage and configure fuel tanks, enabling cost-effective transactions on the blockchain.

GraphQL queries and mutations are executed by sending POST HTTP requests to the corresponding endpoint:

:::note GraphQL Endpoints
### Testnet:
- **Core Operations** `https://platform.canary.enjin.io/graphql`
- **Marketplace** `https://platform.canary.enjin.io/graphql/marketplace`
- **Beam** `https://platform.canary.enjin.io/graphql/beam`
- **Fuel Tanks** `https://platform.canary.enjin.io/graphql/fuel-tanks`
### Mainnet:
- **Core Operations** `https://platform.enjin.io/graphql`
- **Marketplace** `https://platform.enjin.io/graphql/marketplace`
- **Beam** `https://platform.enjin.io/graphql/beam`
- **Fuel Tanks** `https://platform.enjin.io/graphql/fuel-tanks`
:::
Here is an example of an HTTP cURL post request to create a collection on the Canary blockchain, with the API Token provided:

```
curl --location --request POST 'https://platform.canary.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Insert your API token here' \
-d '{"query":"mutation CreateCollection($forceCollapsingSupply: Boolean) {\r\n  CreateCollection(\r\n    mintPolicy: { forceCollapsingSupply: $forceCollapsingSupply }\r\n  ) {\r\n    id\r\n    method\r\n    state\r\n  }\r\n}\r\n","variables":{"forceCollapsingSupply":false}}'
```

## API Reference

For a comprehensive guide on exploring and utilizing GraphQL queries and mutations in the Enjin API, please refer to our [API Reference](/01-getting-started/05-using-enjin-api/02-api-reference.md).

***

:::tip What's next?
- New to GraphQL? Learn how to structure queries and mutations in our [How to Use GraphQL guide](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md).
- To automate signing requests, continue to the [Using the Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) page.
- Or, If you're ready to start building... [Create a Collection](/02-guides/01-managing-tokens/01-creating-collections.md).
