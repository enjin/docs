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

To illustrate the differences between GraphQL and RESTful API calls, let's consider an example of creating a token.

### RESTful API Example

In a typical RESTful API, you might have an endpoint like `/createToken` with a POST request that includes the necessary data in the request body. This might look something like:

```http
POST https://platform.canary.enjin.io/api/createToken
Content-Type: application/json

{
  "recipient": "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f",
  "collectionId": 2406,
  "tokenId": 0,
  "initialSupply": 1,
  "cap": "INFINITE"
}
```

And would traditionally return all of the available data related to the call, like so:

```json
{
  "data": {
    "CreateToken": {
      "id": "14060",
      "transactionId": "null",
      "transactionHash": "null",
      "method": "CreateToken",
      "state": "PENDING",
      "encodedData": "...",
      "wallet": {
        "account": {
          "publicKey": "...",
          "address": "..."
        }
      }
    }
  }
}
```

### GraphQL API Example

In contrast, GraphQL uses a single endpoint for all operations. Instead of defining the operation in the URL and HTTP method, the desired action (query or mutation), its parameters, and the response fields are specified in the request payload.

In GraphQL:

- `Queries` are used to retrieve data, similar to a `GET` request in REST.
- `Mutations` are used to create or modify data, similar to `POST`, `PUT`, or `DELETE` requests in REST."

Here's how the same RESTful request would like like in GraphQL, sent as an HTTP post request to the Canary Platform Cloud GraphQL endpoint https://platform.canary.enjin.io/graphql:

```graphql
mutation CreateToken {
  CreateToken(
    recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f", 
    collectionId: 2406, 
    params: {
      tokenId: { integer: 0 }, 
      initialSupply: 1, 
      cap: { type: INFINITE }
    }
  ) {
    id
    method
    state
  }
}
```

With GraphQL, the client controls what data is returned by explicitly specifying the fields in the query (In this example - the `id`, `method`, and `state`). This enables fine-grained control over the response, minimizing unnecessary data transfer.

GraphQL's ability to query multiple resources in a single request, its strong type system, and its flexibility in querying data make it a powerful tool for interacting with the Enjin Blockchain, providing a seamless experience for developers building with NFTs.

## GraphiQL Playground

The <GlossaryTerm id="graphiql_playground" /> serves three purposes:

1. **Explore** available operations.
2. **Write** operations using an intuitive interface.
3. **View** responses and test your operations before coding them.

![A breakdown of the GraphiQL Playground](/img/getting-started/graphiql-explorer-breakdown.png)

### Step 1: Open GraphiQL Playground

Choose between [Testnet](https://platform.canary.enjin.io/graphiql) or [Mainnet](https://platform.enjin.io/graphiql).

Explore "[Core Operations](https://platform.canary.enjin.io/graphiql)" for core operations like managing tokens, wallets, users, and transactions.

:::info GraphiQL Playground:
Please be aware that the provided links below are specifically for the GraphiQL Playground, which is a graphical user interface designed for exploring and interacting with the Enjin Platform GraphQL APIs directly from a web browser.  
If you wish to execute GraphQL requests programmatically from your local environment or a cloud-based application, you will need to utilize the actual GraphQL endpoint URLs. These can be found [here](/01-getting-started/05-using-enjin-api/05-using-enjin-api.md#overview-of-graphql-endpoints)  
#### Testnet:
- [Core Operations](https://platform.canary.enjin.io/graphiql)
- [Marketplace](https://platform.canary.enjin.io/graphiql/marketplace)
- [Beam](https://platform.canary.enjin.io/graphiql/beam)
- [Fuel Tanks](https://platform.canary.enjin.io/graphiql/fuel-tanks)
#### Mainnet:
- [Core Operations](https://platform.enjin.io/graphiql)
- [Marketplace](https://platform.enjin.io/graphiql/marketplace)
- [Beam](https://platform.enjin.io/graphiql/beam)
- [Fuel Tanks](https://platform.enjin.io/graphiql/fuel-tanks)
:::

### Step 2: Open the explorer

Click the `Show GraphQL Explorer` button.

Here, you can view a complete list of available queries and mutations, along with the associated fields and arguments for each of them.

<p align="center">
  <img src={require('/img/getting-started/using-graphql-builder.gif').default} alt="Example of using the graphiql playground query builder" />
</p>

### Step3: Add a query or mutation to start building your operation

Add a `query` or `mutation` into the "write" panel, and you'll see the list of available options in the explorer update to suit the operation type.

<p align="center">
  <img src={require('/img/getting-started/using-graphql-builder-mutation.gif').default} alt="Example of switching to mutation in the graphiql playground query builder" />
</p>

### Step 4: Select which operations and datapoints you require

Click the required data points to automatically add them to the write column. 

This feature eliminates any guesswork when structuring your operations and helps you make the most of the Enjin Platform Schema.

<p align="center">
  <img src={require('/img/getting-started/building-mutation.gif').default} alt="Example of building a mutation in the graphiql playground query builder" />
</p>

### Step 5: Click the play button to execute your operation

To execute your operation and view the response, simply click the `Execute Query` button. 

You can execute any on-chain operation here. You can even mint tokens and view wallet data on [Mainnet](https://platform.enjin.io/graphiql).

<p align="center">
  <img src={require('/img/getting-started/execute-call.gif').default} alt="Executing a query in the graphiql playground query builder" />
</p>

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
    collectionId: 7153
    tokenId: { integer: 10 }
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
    collectionId: 7153
    tokenId: { integer: 10 }
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

Most Queries and Mutations define a set of input data you can use, for example in the `GetToken` query you can pass in a `collectionId` and a `tokenId` argument. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query {
  GetToken(
    collectionId: 7153 #collectionId is an argument defining which collection to pull data from
    tokenId: { integer: 10 } #tokenId is an argument defining which token to pull data from
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

The alias, such as `TokenInfo` and `CurrentSupply` in the queries provided below, serve as a custom labels for specific fields within the operation. 

Aliases allow you to rename the field in the response, making the data more intuitive and organized, especially when dealing with multiple fields or nested queries within a GraphQL request.

#### Operation Alias:

Usually used in batch operations, it allows you to provide a clear and descriptive name for each operations. 

You might use it to distinguish between multiple similar queries or to provide context for the purpose of the query.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenInfo {
  TokenInfo: GetToken( #TokenInfo is the ALIAS that labels the field
    collectionId: 7153
    tokenId: { integer: 10 }
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
    collectionId: 7153
    tokenId: { integer: 10 }
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

For example, when a player picks up an item, your game needs to fetch the token information using the token's ID. To dynamically insert the token ID to the query, we should use a variable.

That way, we will have one "template" for token fetching query, and the game will decide which token to fetch based on the player actions.

To work with variables in GraphQL, we first need to declare the `$variableName`, as the variables accepted by the operation. Our operations has two arguments - Collection ID and Token ID, so we'll name the variables `$collection_id` and `$token_id` respectively. Both arguments are of type `BigInt`, so the variable declaration will look like that:

```
query GetTokenInfo($collection_id: BigInt! $token_id: BigInt) {
```

:::tip
Note the exclamation mark (!) after the first variable declaration type BigInt. This represents a _non-nullable_ variable (essentially a _required field_).
:::
We also need to replace the static value in the operation with the `$variableName`

```
GetToken(
  collectionId: $collection_id //Collection ID 7153 was hardcoded here
  tokenId: { integer: $token_id } //Token ID 10 was hardcoded here
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
query GetTokenInfo($collection_id: BigInt! $token_id: BigInt) {
  GetToken(
    collectionId: $collection_id
    tokenId: { integer: $token_id }
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


<p align="center">
  <img src={require('/img/getting-started/converting-query-args-into-variables.gif').default} alt="Example of converting query args into variables" />
</p>

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
    collectionId: 7153
    tokenId: { integer: 10 }
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
    "TokenInfo": {
      "supply": "1000"
    }
  }
}
```
  </TabItem>
</Tabs>

The `GetToken` query retrieves token information.

We specify the `collectionId` and `tokenId` as parameters to identify the token we want.

The fields `tokenId` and supply indicate the data we want to receive in the response.

#### Mutation:

A `mutation` is used to modify data on the Enjin Platform. For example, you can use a mutation to update a user's profile information.

In this example, we're minting a new token.
<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToken {
  MintToken(
    recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
    collectionId: "7154"
    params: {
      amount: 1
      tokenId: { integer: 6533 }
    }
  ) {
    id # Returns the transaction ID
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "MintToken": {
      "id": "1234" // request ID
    }
  }
}
```
  </TabItem>
</Tabs>

The `MintToken` mutation mints a new token.

We provide the necessary arguments, such as `recipient`, `collectionId`, and `params`, to define the minting process.

The field `id` indicate the data we want to receive in the response.

#### Batch Query:

A batch `query` allows you to send multiple mutation operations in a single request to reduce network overhead.

Each query have its own set of parameters and return data. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query BatchGetTokenInfo {
  TokenInfo1: GetToken(
    collectionId: 7153 # Specifies the collection ID for the first token
    tokenId: { integer: 10 } # Specifies the unique identifier of the first token
  ) {
    supply # Returns the current supply of the first token
  }
  TokenInfo2: GetToken(
    collectionId: 4553 # Specifies the collection ID for the second token
    tokenId: { integer: 55 } # Specifies the unique identifier of the second token
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
      "supply": 100 // Current supply of the first token
    },
    "TokenInfo2": {
      "supply": 200 // Current supply of the second token
    }
  }
}
```
  </TabItem>
</Tabs>

In this batch query, we retrieve information for two different tokens with distinct `collectionId` and `tokenId`. 

Each token's data is aliased using `TokenInfo1` and `TokenInfo2`.

#### Batch Mutation

A batch `mutation` allows you to send multiple mutation operations in a single request to reduce network overhead.

Each mutation can have its own set of parameters and return data. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  MintToken1: MintToken(
    recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921" # Specifies the recipient's address for the first MintToken operation
    collectionId: "7154" # Specifies the collection ID for the first MintToken operation
    params: {
      amount: 1 # Specifies the amount to mint for the first MintToken operation
      tokenId: { integer: 6533 } # Specifies the unique identifier of the first token to mint
    }
  ) {
    id # Returns the request ID for the first MintToken operation
  }
  MintToken2: MintToken(
    recipient: "0x1234567890abcdef" # Specifies the recipient's address for the second MintToken operation
    collectionId: "7155" # Specifies the collection ID for the second MintToken operation
    params: {
      amount: 2 # Specifies the amount to mint for the second MintToken operation
      tokenId: { integer: 6534 } # Specifies the unique identifier of the second token to mint
    }
  ) {
    id # Returns the request ID for the second MintToken operation
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "MintToken1": {
      "id": "1234" // request ID for the first MintToken operation
    },
    "MintToken2": {
      "id": "1235" // request ID for the second MintToken operation
    }
  }
}
```
  </TabItem>
</Tabs>

In this batch mutation, we have two separate `MintToken` mutations, labeled using the `MintToken1` and `MintToken2` aliases.

Both mutations are minting two different tokens into two separate addresses.

### Pagination

Some GraphQL queries returns results in multiple pages. In GraphQL, these are called "Connections", and each of the elements in the connection is called "Edge".

For example, the [GetWallet query](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetWallet) returns an object of type [Wallet](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Wallet). Wallet objects contains tokenAccount which is of type [TokenAccountConnection](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/TokenAccountConnection). Since this object is of type 'connection', it uses pagination.

By default, if you don't specify which page to query, the first page will be returned.  
To check if the response contains another page for a certain object, use the pageInfo.hasNextPage property from the connection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchingWalletTokens{
  GetWallet(account: "cxKnfok66R8BAuzGcypxqirYcqW7E9Spn4z5UZSVRuUHAcrTQ"){
    tokenAccounts{
      pageInfo{
        hasNextPage #Returns whether there's a next page or not
      }
      edges{
        node{
          token{
            tokenId
          }
          balance
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetWallet": {
      "tokenAccounts": {
        "pageInfo": {
          "hasNextPage": true // Indicates that there is another page available.
        },
        "edges": [
          {
            "node": {
              "token": {
                "tokenId": "5"
              },
              "balance": "1"
            }
          },
          {...},
          {...}
        ]
      }
    }
  }
}
```
  </TabItem>
</Tabs>

By default, this connection returns 15 edges (tokens) per page.

:::tip
The amount of edges per page can be adjusted by using slicing.
:::

To navigate to the next page, use pagination combined with the edge cursor.  
First, add the cursor field to the query response. (Alternatively, you can add the pageInfo.endCursor field to fetch the cursor of the last edge in the connection)

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchingWalletTokens{
  GetWallet(account: "cxKnfok66R8BAuzGcypxqirYcqW7E9Spn4z5UZSVRuUHAcrTQ"){
    tokenAccounts{
      pageInfo{
        hasNextPage
        endCursor #Returns The cursor of the last tokenAccount in the current page
      }
      edges{
        cursor #Returns The tokenAccount cursor
        node{
          token{
            tokenId
          }
          balance
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetWallet": {
      "tokenAccounts": {
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "eyJpZCI6Mjk0NzQsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0" // The cursor of the last tokenAccount in the current page
        },
        "edges": [
          {
            "cursor": "eyJpZCI6MzU3NCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ", // The tokenAccount cursor
            "node": {
              "token": {
                "tokenId": "5"
              },
              "balance": "1"
            }
          },
          {...},
          {...},
          {
            "cursor": "eyJpZCI6Mjk0NzQsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0", // The tokenAccount cursor
            "node": {
              "token": {
                "tokenId": "11"
              },
              "balance": "1"
            }
          }
        ]
      }
    }
  }
}
```
  </TabItem>
</Tabs>

Now we have the cursor of the last edge of the current page.  
To navigate to the next page, add the `after` parameter to the `tokenAccounts` connection, and insert the cursor of the last edge of the current page.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query FetchingWalletTokens{
  GetWallet(account: "cxKnfok66R8BAuzGcypxqirYcqW7E9Spn4z5UZSVRuUHAcrTQ"){
    tokenAccounts(after: "eyJpZCI6Mjk0NzQsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0"){ #Indicates that we want to fetch tokenAccounts after the specified cursor.
      pageInfo{
        hasNextPage
        endCursor
      }
      edges{
        cursor
        node{
          token{
            tokenId
          }
          balance
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetWallet": {
      "tokenAccounts": {
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "eyJpZCI6NTE2MzgsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0"
        },
        "edges": [
          {
            "cursor": "eyJpZCI6Mzc2MTYsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "token": {
                "tokenId": "9"
              },
              "balance": "1"
            }
          },
          {...},
          {...},
          {
            "cursor": "eyJpZCI6NTE2MzgsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
            "node": {
              "token": {
                "tokenId": "1"
              },
              "balance": "1"
            }
          }
        ]
      }
    }
  }
}
```
  </TabItem>
</Tabs>

To get all edges in the connection, continue navigating to the next page with a loop.  
You'll know that you reached the last page when the `hasNextPage` returns `false`.

***

With this understanding, you're ready to create any GraphQL requests the Enjin API has to offer.
