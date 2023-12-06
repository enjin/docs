---
title: "Using the API"
slug: "using-graphql"
excerpt: "Harness the full power of the Enjin Platform."
hidden: false
createdAt: "Tue Nov 07 2023 18:35:25 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 29 2023 19:12:35 GMT+0000 (Coordinated Universal Time)"
---
<<glossary:GraphQL>> is a sophisticated API language that allows you to meticulously define the structure of your operations, facilitating the precise retrieval of essential data. 

With GraphQL, you gain the capability to seamlessly access properties across multiple resources while effortlessly traversing references between them. 

In stark contrast to traditional REST APIs, GraphQL streamlines data retrieval for your application, eliminating the need for multiple requests to various endpoints, resulting in a more efficient and elegant data-fetching process.

> 📘 What you'll need:
> 
> - Some [Enjin Coin](doc:using-enjin-coin) to pay for <<glossary:Transaction Fees>>.
> - An [Enjin Platform Account](/docs/using-the-enjin-platform).

# Access Tokens

Access tokens assume a pivotal role in facilitating your application's interaction with the GraphQL API. 

These tokens serve a dual purpose:

1. Granting your application access to a user's account.
2. Helping us identify and authenticate your account.

To get started, login to the [Testnet Enjin Platform](https://platform.canary.enjin.io) to create your account.

# HTTP

Every data transfer strictly adheres to the HTTP/1.1 standard, with an imperative requirement for HTTPS encryption across all endpoints. 

Given that the GraphQL API is rooted in HTTP, it seamlessly aligns with any programming language boasting an HTTP library, encompassing well-known options like `cURL` and `urllib`.

> 👍 GraphQL Endpoints
> 
> ### Testnet:
> 
> - **Core Operations** `http://platform.canary.enjin.io/graphiql`
> - **Fuel Tanks** `http://platform.canary.enjin.io/graphiql/fuel-tanks`
> - **Marketplace** `http://platform.canary.enjin.io/graphiql/marketplace`
> - **Beam** `http://platform.canary.enjin.io/graphiql/beam`
> 
> ### Mainnet:
> 
> - **Core Operations** `http://platform.enjin.io/graphiql`
> - **Fuel Tanks** `http://platform.canary.enjin.io/graphiql/fuel-tanks`
> - **Marketplace** `http://platform.canary.enjin.io/graphiql/marketplace`
> - **Beam** `http://platform.canary.enjin.io/graphiql/beam`

# API Reference

We offer three options for API Referencing:

- **[Schema Overview](https://enjin.readme.io/docs/enjin-api)** if you're new to GraphQL.
- **[GraphQL Playground](https://platform.canary.enjin.io/graphiql) **once you're ready to start testing;
  - [Core Operations](https://platform.canary.enjin.io/graphiql), [Marketplace Operations](https://platform.canary.enjin.io/graphiql/marketplace), [Beam Operations](https://platform.canary.enjin.io/graphiql/beam), [Fuel Tank Operations](https://platform.canary.enjin.io/graphiql/fuel-tanks)
- **[Apollo GraphQL](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home) **once you're confident with GraphQL;
  - [Core Operations](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home), [Marketplace Operations](https://studio.apollographql.com/public/EnjinPlatform/variant/marketplace/home), [Beam Operations](https://studio.apollographql.com/public/EnjinPlatform/variant/beam/home), [Fuel Tank Operations](https://studio.apollographql.com/public/EnjinPlatform/variant/fuel-tanks/home)

# GraphQL Playground

This platform serves three purposes:

1. **Explore** available operations.
2. **Write** operations using an intuitive interface.
3. **View ** responses and test your operations before coding them.

![](https://files.readme.io/8bcfac4-image.png)

## Step 1: Open GraphiQL Playground

Choose between [Testnet](https://platform.canary.enjin.io/graphiql) or [Mainnet](https://platform.enjin.io/graphiql).

Explore "[Core Operations](https://platform.canary.enjin.io/graphiql)" for core operations like managing tokens, wallets, users, and transactions.

> 👍 GraphiQL Playground:
> 
> ### Testnet:
> 
> - [Core Operations](https://platform.canary.enjin.io/graphiql)
> - [Fuel Tanks](https://platform.enjin.io/fuel-tanks)
> - [Marketplace](https://platform.enjin.io/graphiql/marketplace)
> - [Beam](https://platform.enjin.io/graphiql/beam)
> 
> ### Mainnet:
> 
> - [Core Operations](https://platform.enjin.io/graphiql)
> - [Fuel Tanks](https://platform.enjin.io/graphiql/fuel-tanks)
> - [Marketplace](https://platform.enjin.io/graphiql/marketplace)
> - [Beam](https://platform.enjin.io/graphiql/beam)

## Step 2: Open the explorer

Click the `Show GraphQL Explorer` button.

Here, you can view a complete list of available queries and mutations, along with the associated fields and arguments for each of them.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/08c12e2-ezgif-5-56d0b74436.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step3: Add a query or mutation to start building your operation

Add a `query` or `mutation` into the "write" panel, and you'll see the list of available options in the explorer update to suit the operation type.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3334516-ezgif-5-91d243d3d6.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step 4: Select which operations and datapoints you require

Click the required data points to automatically add them to the write column. 

This feature eliminates any guesswork when structuring your operations and helps you make the most of the Enjin Platform Schema.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d8d8c9c-ezgif-5-2b22c74e05.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step 5: Click the play button to execute your operation

To execute your operation and view the response, simply click the `Execute Query` button. 

You can execute any on-chain operation here. You can even mint tokens and view wallet data on [Mainnet](https://platform.enjin.io/graphiql).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b0f64df-ezgif-1-77bbc9863e.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


> 📘 Dig deeper into the [Enjin API Schema](/docs/enjin-api).

# GraphQL Operation Structures

The Enjin API features an intricately crafted <<glossary:Platform Schema>> that is finely tuned to empower the development of scalable and high-speed blockchain-based games, ensuring an immersive experience for players.

To interface with it directly, you will need to understand how GraphQL operations are structured.

## Operation Name

The Operation Name such as `GetTokenInfo` is a user-defined identifier for a specific operation. 

It allows you to organize and distinguish different operations within a single request, making it easier to handle responses and manage complex queries or mutations efficiently.

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
```json Response
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```

## Fields

Fields serve as a means to precisely specify the data you want to retrieve in the response of an operation. 

Fields enable you to fine-tune the granularity of data retrieval, ensuring you receive precisely what you need.

When crafting Queries and Mutations, the Enjin Platform defines what fields are available for you to request. 

For instance, when using the `GetToken` query, you can request the `supply` field, which corresponds to a specific piece of information stored on the blockchain.

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
```json Response
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```

## Arguments

You can pass data into an operation by using arguments.  

Most Queries and Mutations define a set of input data you can use, for example in the `GetToken` query you can pass in a `collectionId` and a `tokenId` argument. 

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
```json Response
{
  "data": {
    "GetToken": {
      "supply": "1000"
    }
  }
}
```

Sometimes arguments will be required, sometimes they will be optional, and some operations may not take any arguments at all.  

The API will tell you if you try to run an operation without a required argument.

## Aliases

The alias, such as `TokenInfo` and `CurrentSupply` in the queries provided below, serve as a custom labels for specific fields within the operation. 

Aliases allow you to rename the field in the response, making the data more intuitive and organized, especially when dealing with multiple fields or nested queries within a GraphQL request.

#### Operation Alias:

Usually used in batch operations, it allows you to provide a clear and descriptive name for each operations. 

You might use it to distinguish between multiple similar queries or to provide context for the purpose of the query.

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
```json Response
{
  "data": {
    "TokenInfo": {
      "supply": "1000"
    }
  }
}
```

#### Field Alias:

This option is useful when you want to label a specific field within the response. 

It allows you to rename individual fields in the response for clarity or to avoid naming conflicts.

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
```json Response
{
  "data": {
    "GetToken": {
      "CurrentSupply": "1000"
    }
  }
}

```

## Variables

Various code blocks in the Enjin Documentation use variables instead of hardcoding arguments. This allows the dynamic insertion of data as you run mutations and queries.

For example, when a player picks up an item, your game needs to fetch the token information using the token's ID. To dynamically insert the token ID to the query, we should use a variable.

That way, we will have one "template" for token fetching query, and the game will decide which token to fetch based on the player actions.

To work with variables in GraphQL, we first need to declare the `$variableName`, as the variables accepted by the operation. Our operations has two arguments - Collection ID and Token ID, so we'll name the variables `$collection_id` and `$token_id` respectively. Both arguments are of type `BigInt`, so the variable declaration will look like that:

```
query GetTokenInfo($collection_id: BigInt! $token_id: BigInt) {
```

> Note the exclamation mark (!) after the first variable declaration type BigInt. This represents a _non-nullable_ variable (essentially a _required field_).

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

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/04558cd-AnimationSped.gif",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Types

Types in GraphQL serve as blueprints for defining the shape and composition of the data available through the API, encompassing a collection of fields representing specific pieces of information. 

These structures lay the foundation for shaping queries and mutations, ensuring precise data retrieval and manipulation.

#### Query:

A `query` is used to retrieve data from the Enjin Platform. 

In this example, we're querying for information about a specific token.

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
```json Response
{
  "data": {
    "TokenInfo": {
      "supply": "1000"
    }
  }
}
```

The `GetToken` query retrieves token information.

We specify the `collectionId` and `tokenId` as parameters to identify the token we want.

The fields `tokenId` and supply indicate the data we want to receive in the response.

#### Mutation:

A `mutation` is used to modify data on the Enjin Platform. For example, you can use a mutation to update a user's profile information.

In this example, we're minting a new token.

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
```json Response
{
  "data": {
    "MintToken": {
      "id": "1234" // request ID
    }
  }
}
```

The `MintToken` mutation mints a new token.

We provide the necessary arguments, such as `recipient`, `collectionId`, and `params`, to define the minting process.

The field `id` indicate the data we want to receive in the response.

#### Batch Query:

A batch `query` allows you to send multiple mutation operations in a single request to reduce network overhead.

Each query have its own set of parameters and return data. 

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
```json Response
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

In this batch query, we retrieve information for two different tokens with distinct `collectionId` and `tokenId`. 

Each token's data is aliased using `TokenInfo1` and `TokenInfo2`.

#### Batch Mutation

A batch `mutation` allows you to send multiple mutation operations in a single request to reduce network overhead.

Each mutation can have its own set of parameters and return data. 

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
```json Response
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

In this batch mutation, we have two separate `MintToken` mutations, labeled using the `MintToken1` and `MintToken2` aliases.

Both mutations are minting two different tokens into two separate addresses.

## Pagination

Some GraphQL queries returns results in multiple pages. In GraphQL, these are called "Connections", and each of the elements in the connection is called "Edge".

For example, the [GetWallet query](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Query?query=GetWallet) returns an object of type [Wallet](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/Wallet). Wallet objects contains tokenAccount which is of type [TokenAccountConnection](https://studio.apollographql.com/public/EnjinPlatform/variant/core/schema/reference/objects/TokenAccountConnection). Since this object is of type 'connection', it uses pagination.

By default, if you don't specify which page to query, the first page will be returned.  
To check if the response contains another page for a certain object, use the pageInfo.hasNextPage property from the connection.

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
```json Response
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

By default, this connection returns 15 edges (tokens) per page.

> Note: The amount of edges per page can be adjusted by using slicing.

To navigate to the next page, use pagination combined with the edge cursor.  
First, add the cursor field to the query response. (Alternatively, you can add the pageInfo.endCursor field to fetch the cursor of the last edge in the connection)

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
```json Response
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

Now we have the cursor of the last edge of the current page.  
To navigate to the next page, add the `after` parameter to the `tokenAccounts` connection, and insert the cursor of the last edge of the current page.

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
```json Response
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

To get all edges in the connection, continue navigating to the next page with a loop.  
You'll know that you reached the last page when the `hasNextPage` returns `false`.

> 📘 For more information, refer to the official [GraphQL documentation](https://graphql.org/learn/).

> 👍 Or, If you're ready to start building... [Create a Collection](/docs/create-a-collection).