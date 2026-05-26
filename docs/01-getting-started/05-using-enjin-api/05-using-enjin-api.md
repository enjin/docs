---
title: "Using the Enjin API"
slug: "../using-the-enjin-api"
description: "Explore the Enjin API and learn how to easily interact with the Enjin blockchain, mint tokens, and manage digital assets programmatically."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

## Introduction to the Enjin API

The Enjin API is a set of programmatic interfaces that allow developers to interact with the Enjin Platform from their own applications. Built using <GlossaryTerm id="graphql" />, it enables clients to request exactly the data they need in a flexible and efficient way. Unlike traditional RESTful APIs, which require multiple endpoints for different data requirements, GraphQL enables more efficient data retrieval through a single endpoint. This flexibility reduces the number of network requests and optimizes performance, making it particularly advantageous for applications that require efficient data handling, such as blockchain and NFT platforms.

:::info What you'll need:
- Some [Enjin Coin](/06-enjin-products/02-enjin-coin.md) to pay for <GlossaryTerm id="transaction_fees" />.
- You can obtain cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
:::

:::tip New to GraphQL?
If you're more familiar with REST APIs, it's important to understand that our API uses GraphQL - a flexible and powerful query language for APIs. GraphQL works quite differently from REST, and knowing how to structure your queries and handle responses is essential for successful integration.\
We recommend reviewing our [How to Use GraphQL guide](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md) to get started quickly and effectively.
:::

## Authentication

API tokens are used to authenticate your application's requests to the Enjin Platform. They serve a dual purpose:

- They grant your application access to authenticated operations (mutations).
- They allow the Wallet Daemon to fetch and sign transactions on your behalf.

To make authenticated calls to the Enjin Platform:

1. Log in to the [Enjin Platform Cloud](https://platform.beta.enjin.io/).
2. Open your [account settings](https://platform.beta.enjin.io/settings) and create an API token if you haven't already.
3. Include the token in the `Authorization` header of your HTTP requests, prefixed with `Bearer`:

```
Authorization: Bearer <YOUR_API_TOKEN>
```

:::note
Read-only queries (e.g. `GetAccount`, `GetToken`, `GetCollection`) are publicly accessible and do not require an API token. Mutations and account-scoped queries do.
:::

4. _(Optional)_ To automate signing of transactions you create through the API, configure a Wallet Daemon with your API token.
   For more details head over to [Using the Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md).

## Endpoint & Queries

Every data transfer strictly adheres to the HTTP/1.1 standard, with HTTPS encryption mandatory for all endpoints to ensure secure communication.

The Enjin API uses GraphQL, meaning you'll be sending POST HTTP requests to a single endpoint with your GraphQL queries and mutations. This allows you to interact with the Enjin blockchain in a flexible and efficient manner.

:::tip SDKs for Streamlined Development
For developers looking for a more integrated experience, Enjin also provides official **Software Development Kits (SDKs)** for various programming languages. These SDKs wrap the underlying GraphQL API, offering convenient methods and abstractions to streamline development. You can find more information and links to the available SDKs on our [Software Development Kits (SDKs) page](/02-guides/01-platform/04-software-development-kit/04-software-development-kit.md).
:::

### GraphQL Endpoint

The Enjin Platform serves all queries and mutations from a **single GraphQL endpoint**:

:::note GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

A single endpoint covers Core operations (collections, tokens, transfers, attributes), Marketplace, Fuel Tanks, and Nomination Pools.

### Selecting a Network and Chain

The Enjin Platform is chain-agnostic — the network and chain you want to operate on are passed as **arguments** on each query or mutation rather than being baked into the endpoint URL.

Most operations accept two enum arguments:

| Argument  | Values             | Description |
|-----------|--------------------|-------------|
| `network` | `ENJIN`, `CANARY`  | The network to target. `ENJIN` is mainnet, `CANARY` is the testnet. |
| `chain`   | `MATRIX`, `RELAY`  | Which chain on the selected network. `MATRIX` is the Matrixchain (where collections, tokens, and the marketplace live). `RELAY` is the Relaychain. |

Both default to `ENJIN` / `MATRIX` (mainnet Matrixchain) when omitted.

```graphql
query GetEnjinMatrixBalance {
  GetAccount(
    network: ENJIN
    chain: MATRIX
    address: "efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr"
  ) {
    balance
  }
}
```

To run the same query on the Canary testnet, change `network: ENJIN` to `network: CANARY`.

### Example Request

Here is an example of an HTTP cURL request to fetch an account's balance from the Canary Matrixchain, with an API token provided:

```bash
curl --location --request POST 'https://platform.beta.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"query { GetAccount(network: CANARY, chain: MATRIX, address: \"efQh8FzLm6oH3dmTU3HWqGrtm6Xcuu1WG33N2Ka9fzo5MFFAr\") { balance } }"}'
```

## API Reference

For a comprehensive guide on exploring and utilizing GraphQL queries and mutations in the Enjin API, please refer to our [API Reference](/03-api-reference/03-api-reference.md).

***

:::tip What's next?
- New to GraphQL? Learn how to structure queries and mutations in our [How to Use GraphQL guide](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md).
- To automate signing requests, continue to the [Using the Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) page.
- Or, If you're ready to start building... [Create a Collection](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md).
:::
