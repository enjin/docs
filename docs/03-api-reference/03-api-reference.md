---
title: "API Reference"
slug: "/api-reference"
---

This section is a per-resource reference for the Enjin Platform GraphQL API. Each page focuses on one resource family (accounts, collections, tokens, transactions, marketplace listings, fuel tanks, token groups, nomination pools) and walks through the queries and mutations available for it.

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

## How this section is organised

- **Queries** — read on-chain and platform state: [transactions](/03-api-reference/01-queries/01-transactions-queries.md), [collections](/03-api-reference/01-queries/02-collections-queries.md), [tokens](/03-api-reference/01-queries/03-tokens-queries.md), [accounts](/03-api-reference/01-queries/04-wallets-queries.md), [fuel tanks](/03-api-reference/01-queries/05-fuel-tank-queries.md), [marketplace](/03-api-reference/01-queries/06-marketplace-queries.md).
- **Mutations** — submit on-chain actions and manage platform-side resources: [transactions](/03-api-reference/02-mutations/01-transaction-mutations.md), [collections](/03-api-reference/02-mutations/02-collections-mutations.md), [tokens](/03-api-reference/02-mutations/03-tokens-mutations.md), [wallets](/03-api-reference/02-mutations/04-wallets-mutations.md), [fuel tanks](/03-api-reference/02-mutations/05-fuel-tanks-mutations.md), [marketplace](/03-api-reference/02-mutations/06-marketplace-mutations.md).
- [**Important Arguments**](/03-api-reference/04-important-arguments.md) — a glossary of recurring argument types and enum values (`network`, `chain`, `state`, `cap`, etc.) used throughout the API.

If you're new to GraphQL or to the Enjin API, start with [Using the Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md) and the [How to Use GraphQL](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md) primer — they cover authentication, the playground, and operation structure.

## Two top-level shapes worth knowing

Two things are common to almost every example in this reference and worth understanding before you read them.

### 1. `network` and `chain` arguments

Every operation that touches the blockchain takes a `network` and a `chain` argument:

- `network: ENJIN` (mainnet) or `network: CANARY` (testnet).
- `chain: MATRIX` (Matrixchain — collections, tokens, marketplace) or `chain: RELAY` (Relaychain — staking, governance).

A single endpoint serves both networks and both chains; you select which to target on each request.

### 2. `CreateTransaction` — one mutation for every on-chain action

Almost every on-chain action — creating a collection, minting tokens, transferring, listing on the marketplace, bonding to a nomination pool — is submitted through the single `CreateTransaction` mutation. The specific action is selected by which field is set on the `transaction` input.

For example, creating a token looks like this:

```graphql
mutation {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "efRecipientAddress"
        collectionId: 12345
        tokenId: 1
        initialSupply: 10
        listingForbidden: false
        infusion: 0
        anyoneCanInfuse: false
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

The same mutation handles `mintToken`, `transferToken`, `createCollection`, `createListing`, and ~40 other actions — see [Transaction Mutations](/03-api-reference/02-mutations/01-transaction-mutations.md) for the full surface and [Important Arguments](/03-api-reference/04-important-arguments.md) for the shapes returned.

:::tip Not sure how to construct an operation?
The [GraphQL Query Builder](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#graphiql-playground) section walks through using the GraphiQL Explorer to build queries and mutations interactively.
:::
