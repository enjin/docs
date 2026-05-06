---
title: "How to Use GraphQL"
slug: "../how-to-use-graphql"
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide is intended for users who are new to GraphQL. If you're already familiar with how GraphQL works - how to structure queries, use variables, and interact with GraphQL endpoints—you can skip this page and proceed directly to guides.

For everyone else, this page will walk you through the essentials of working with GraphQL so you can confidently interact with our API.

## Understanding GraphQL vs. RESTful API Calls

To illustrate the differences between GraphQL and RESTful API calls, let's consider an example of minting a token.

### RESTful API Example

In a typical RESTful API, you might have an endpoint like `/mintToken` with a POST request that includes the necessary data in the request body. This might look something like:

```http
POST https://platform.beta.enjin.io/api/mintToken
Content-Type: application/json

{
  "recipient": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y",
  "collectionId": 7154,
  "tokenId": 6533,
  "amount": 1
}
```

And would traditionally return all of the available data related to the call, like so:

```json
{
  "data": {
    "MintToken": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "extrinsicHash": null,
      "action": "MultiTokens.mint",
      "state": "PENDING",
      "encodedData": "...",
      "createdAt": "2026-05-06T10:00:00Z"
    }
  }
}
```

### GraphQL API Example

In contrast, GraphQL uses a single endpoint for all operations. Instead of defining the operation in the URL and HTTP method, the desired action (query or mutation), its parameters, and the response fields are specified in the request payload.

In GraphQL:

- `Queries` are used to retrieve data, similar to a `GET` request in REST.
- `Mutations` are used to create or modify data, similar to `POST`, `PUT`, or `DELETE` requests in REST.

Here's how the same RESTful request would look in GraphQL, sent as an HTTP POST request to the Enjin Platform GraphQL endpoint at `https://platform.beta.enjin.io/graphql`:

```graphql
mutation MintToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
        collectionId: 7154
        params: {
          tokenId: 6533
          amount: 1
        }
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

With GraphQL, the client controls what data is returned by explicitly specifying the fields in the query (in this example - the `uuid`, `action`, and `state`). This enables fine-grained control over the response, minimizing unnecessary data transfer.

GraphQL's ability to query multiple resources in a single request, its strong type system, and its flexibility in querying data make it a powerful tool for interacting with the Enjin Blockchain, providing a seamless experience for developers building with NFTs.

## GraphiQL Playground

The <GlossaryTerm id="graphiql_playground" /> serves three purposes:

1. **Explore** available operations.
2. **Write** operations using an intuitive interface.
3. **View** responses and test your operations before coding them.

### Step 1: Open the GraphiQL Playground

Open the [Enjin Platform GraphiQL Playground](https://platform.beta.enjin.io/graphiql) in your browser. The Enjin API now serves all queries and mutations from a single endpoint, so there is one playground covering Core operations, Marketplace, Fuel Tanks, and Nomination Pools.

:::info GraphiQL Playground:
The link above opens a graphical interface for exploring and testing operations directly from a web browser. To execute GraphQL requests programmatically from your application, send POST requests to the actual GraphQL endpoint instead — see [Using the Enjin API](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md#graphql-endpoint).
:::

### Step 2: Open the explorer

Click the `Show GraphQL Explorer` button.

Here, you can view a complete list of available queries and mutations, along with the associated fields and arguments for each of them.

### Step 3: Add a query or mutation to start building your operation

Add a `query` or `mutation` into the "write" panel, and you'll see the list of available options in the explorer update to suit the operation type.

### Step 4: Select which operations and datapoints you require

Click the required data points to automatically add them to the write column.

This feature eliminates any guesswork when structuring your operations and helps you make the most of the Enjin Platform Schema.

### Step 5: Click the play button to execute your operation

To execute your operation and view the response, simply click the `Execute Query` button.

You can execute any on-chain operation here on either the Enjin (mainnet) or Canary (testnet) network — selected via the `network` argument on each operation.

## GraphQL Operation Structures

The Enjin API features an intricately crafted <GlossaryTerm id="platform_schema" /> that is finely tuned to empower the development of scalable and high-speed blockchain-based games, ensuring an immersive experience for players.

To interface with it directly, you will need to understand how GraphQL operations are structured.

### Operation Name

The Operation Name such as `GetTokenInfo` is a user-defined identifier for a specific operation.

It allows you to organize and distinguish different operations within a single request, making it easier to handle responses and manage complex queries or mutations efficiently.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenInfo { #'GetTokenInfo' is the Operation Name that distinguishes this operation from others
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

### Fields

Fields serve as a means to precisely specify the data you want to retrieve in the response of an operation.

Fields enable you to fine-tune the granularity of data retrieval, ensuring you receive precisely what you need.

When crafting Queries and Mutations, the Enjin Platform defines what fields are available for you to request.

For instance, when using the `GetToken` query, you can request the `supply` field, which corresponds to a specific piece of information stored on the blockchain.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query {
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    supply # supply is a Field that returns the token's supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

### Arguments

You can pass data into an operation by using arguments.

Most Queries and Mutations define a set of input data you can use, for example in the `GetToken` query you can pass in `network`, `chain`, `collectionId`, and `tokenId` arguments.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query {
  GetToken(
    network: ENJIN     # network is an argument selecting which Enjin network to read from (ENJIN or CANARY)
    chain: MATRIX      # chain is an argument selecting which chain on that network (MATRIX or RELAY)
    collectionId: 7153 # collectionId is an argument defining which collection to pull data from
    tokenId: 10        # tokenId is an argument defining which token to pull data from
  ) {
    supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

Sometimes arguments will be required, sometimes they will be optional, and some operations may not take any arguments at all.

The API will tell you if you try to run an operation without a required argument.

### Aliases

The alias, such as `TokenInfo` and `CurrentSupply` in the queries provided below, serve as custom labels for specific fields within the operation.

Aliases allow you to rename the field in the response, making the data more intuitive and organized, especially when dealing with multiple fields or nested queries within a GraphQL request.

#### Operation Alias:

Usually used in batch operations, it allows you to provide a clear and descriptive name for each operation.

You might use it to distinguish between multiple similar queries or to provide context for the purpose of the query.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenInfo {
  TokenInfo: GetToken( # TokenInfo is the ALIAS that labels the field
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "TokenInfo": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

#### Field Alias:

This option is useful when you want to label a specific field within the response.

It allows you to rename individual fields in the response for clarity or to avoid naming conflicts.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenInfo {
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    CurrentSupply: supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "CurrentSupply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

### Variables

Various code blocks in the Enjin Documentation use variables instead of hardcoding arguments. This allows the dynamic insertion of data as you run mutations and queries.

For example, when a player picks up an item, your game needs to fetch the token information using the token's ID. To dynamically insert the token ID into the query, we should use a variable.

That way, we will have one "template" for the token-fetching query, and the game will decide which token to fetch based on the player's actions.

To work with variables in GraphQL, we first need to declare the `$variableName` as the variables accepted by the operation. Our operation has two arguments — Collection ID and Token ID — so we'll name the variables `$collection_id` and `$token_id` respectively. Both arguments are of type `BigInt`, so the variable declaration will look like that:

```
query GetTokenInfo($collection_id: BigInt! $token_id: BigInt!) {
```

:::tip
Note the exclamation mark (!) after the variable type. This represents a _non-nullable_ variable (essentially a _required field_).
:::

We also need to replace the static values in the operation with the `$variableName`:

```
GetToken(
  network: ENJIN
  chain: MATRIX
  collectionId: $collection_id # Collection ID 7153 was hardcoded here
  tokenId: $token_id           # Token ID 10 was hardcoded here
)
```

And the final step is to pass `variableName: value` in a separate, transport-specific (usually JSON) variables dictionary:

```json
{
  "collection_id": 7153,
  "token_id": 10
}
```

Here's the final operation code:

**Query:**

```graphql
query GetTokenInfo($collection_id: BigInt! $token_id: BigInt!) {
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: $collection_id
    tokenId: $token_id
  ) {
    supply
  }
}
```

**Variables:**

```json
{
  "collection_id": 37108,
  "token_id": 0
}
```

### Types

Types in GraphQL serve as blueprints for defining the shape and composition of the data available through the API, encompassing a collection of fields representing specific pieces of information.

These structures lay the foundation for shaping queries and mutations, ensuring precise data retrieval and manipulation.

#### Query:

A `query` is used to retrieve data from the Enjin Platform.

In this example, we're querying for information about a specific token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenInfo {
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    supply # Returns the current supply of the token
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

The `GetToken` query retrieves token information.

We specify `network`, `chain`, `collectionId`, and `tokenId` as parameters to identify which token, on which chain, we want.

The `supply` field indicates the data we want to receive in the response.

#### Mutation:

A `mutation` is used to modify state on the Enjin Platform — typically by creating an on-chain transaction. In v3, every blockchain operation is performed through the `CreateTransaction` mutation, with the specific action selected inside its `transaction` argument (`mintToken`, `createCollection`, `transferToken`, and so on).

In this example, we're minting a new token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
        collectionId: 7154
        params: {
          tokenId: 6533
          amount: 1
        }
      }
    }
  ) {
    uuid   # Returns the transaction UUID
    action # e.g. "MultiTokens.mint"
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "action": "MultiTokens.mint",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

The `CreateTransaction` mutation creates a new on-chain transaction. The `transaction` argument carries the specific action — here, `mintToken` — along with its parameters (`recipient`, `collectionId`, `params`).

The `uuid`, `action`, and `state` fields indicate the data we want to receive in the response.

#### Batch Query:

A batch `query` allows you to send multiple query operations in a single request to reduce network overhead.

Each query has its own set of parameters and return data.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query BatchGetTokenInfo {
  TokenInfo1: GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153 # Specifies the collection ID for the first token
    tokenId: 10        # Specifies the unique identifier of the first token
  ) {
    supply # Returns the current supply of the first token
  }
  TokenInfo2: GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 4553 # Specifies the collection ID for the second token
    tokenId: 55        # Specifies the unique identifier of the second token
  ) {
    supply # Returns the current supply of the second token
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "TokenInfo1": {
      "supply": "100"
    },
    "TokenInfo2": {
      "supply": "200"
    }
  }
}
```
  </TabItem>
</Tabs>

In this batch query, we retrieve information for two different tokens with distinct `collectionId` and `tokenId`.

Each token's data is aliased using `TokenInfo1` and `TokenInfo2`.

#### Batch Mutation

To submit multiple on-chain actions in a single transaction, use `CreateBatchTransaction` and pass an array of `TransactionInput` values via its `transactions` argument. The actions are bundled into one extrinsic and either all succeed or all fail together.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchMint {
  CreateBatchTransaction(
    network: ENJIN
    chain: MATRIX
    transactions: [
      {
        mintToken: {
          recipient: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
          collectionId: 7154
          params: { tokenId: 6533, amount: 1 }
        }
      }
      {
        mintToken: {
          recipient: "efAnotherRecipientAddressHereXxxxxxxxxxxxxxxxxxxxxx"
          collectionId: 7155
          params: { tokenId: 6534, amount: 2 }
        }
      }
    ]
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateBatchTransaction": {
      "uuid": "f7d3d9b8-1234-4abc-9def-0123456789ab",
      "action": "Utility.batch_all",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

In this batch mutation, two `mintToken` actions are bundled into a single on-chain extrinsic. The Enjin Platform returns one `Transaction` for the batch as a whole.

Alternatively, you can also send several independent top-level operations in one request using aliases, just like a batch query. Each operation then runs as its own transaction:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  Mint1: CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
        collectionId: 7154
        params: { tokenId: 6533, amount: 1 }
      }
    }
  ) {
    uuid
  }
  Mint2: CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "efAnotherRecipientAddressHereXxxxxxxxxxxxxxxxxxxxxx"
        collectionId: 7155
        params: { tokenId: 6534, amount: 2 }
      }
    }
  ) {
    uuid
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "Mint1": { "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1" },
    "Mint2": { "uuid": "b8e3fa12-9876-4321-cdef-0fedcba98765" }
  }
}
```
  </TabItem>
</Tabs>

### Pagination

Some queries return more results than fit in a single response. The Enjin Platform provides two pagination styles depending on the query:

#### Offset (page-based) pagination

Most plural queries — `GetTokens`, `GetCollections`, `GetListings`, `GetNominationPools` — accept `limit` and `page` arguments and return a flat array. Pass `page: 1` for the first page, `page: 2` for the second, and so on. When the response is empty (or contains fewer items than `limit`), you've reached the end.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FirstPage {
  GetTokens(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    limit: 15  # Up to 15 tokens per page
    page: 1    # Start at page 1
  ) {
    tokenId
    supply
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTokens": [
      { "tokenId": "0", "supply": "1000" },
      { "tokenId": "1", "supply": "500" }
    ]
  }
}
```
  </TabItem>
</Tabs>

To fetch the next page, send the same query again with `page: 2`, then `page: 3`, and so on.

#### Cursor-based pagination

A few queries — `GetTransactions`, `GetManagedWallets` — use a cursor instead of a page number, and return a wrapper object instead of a plain array. The wrapper exposes `data` (the items on this page), `perPage`, and `nextCursor` / `previousCursor` strings to navigate.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FirstPage {
  GetTransactions(
    network: ENJIN
    chain: MATRIX
    limit: 15
  ) {
    data {
      uuid
      action
      state
    }
    perPage
    previousCursor
    nextCursor # Use this on the next request to fetch the following page
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTransactions": {
      "data": [
        { "uuid": "a90ded41-...", "action": "MultiTokens.mint", "state": "FINALIZED" }
      ],
      "perPage": 15,
      "previousCursor": null,
      "nextCursor": "eyJpZCI6OTk5LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9"
    }
  }
}
```
  </TabItem>
</Tabs>

To fetch the next page, pass the previous response's `nextCursor` as the `cursor` argument:

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query NextPage {
  GetTransactions(
    network: ENJIN
    chain: MATRIX
    limit: 15
    cursor: "eyJpZCI6OTk5LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9"
  ) {
    data {
      uuid
      action
      state
    }
    nextCursor
  }
}
```
  </TabItem>
</Tabs>

When `nextCursor` is `null`, you've reached the last page.

***

With this understanding, you're ready to create any GraphQL requests the Enjin API has to offer.
