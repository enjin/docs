---
title: "GraphQL Requests"
slug: "graphql-requests"
description: "Learn how to build GraphQL requests with the Enjin Platform C# SDK to query and mutate blockchain data efficiently."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

The SDK builds GraphQL requests for you through a set of fluent query builders, so you never have to write a query string by hand. Every request follows the same shape: build a query or mutation with a builder, choose the fields you want back, send it with the client, then read the result.

## Building a Request

There are two root builders, one for each GraphQL operation type:

- `QueryQueryBuilder` — for reading data (e.g. `GetCollection`, `GetToken`, `GetAccount`).
- `MutationQueryBuilder` — for changing state (e.g. `CreateTransaction`, `CreateManagedWallet`).

You add an operation by calling the matching `WithXxx` method. Each operation takes a **field-selection builder** (which fields you want returned) followed by its arguments. Every root query and mutation requires the target `network` and `chain`:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

var query = new QueryQueryBuilder()
    .WithGetCollection(
        new CollectionQueryBuilder().WithId(),
        network: Network.Canary,
        chain: Chain.Matrix,
        id: 2000);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/GetCollection.hpp"
#include "EnjinPlatformSdk/SerializableString.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

SerializableStringPtr value = make_shared<SerializableString>("2000");

GetCollection req = GetCollection()
    .SetCollectionId(value);
```
  </TabItem>
</Tabs>

Note that `tokenId` and `collectionId` are plain numeric values (`System.Numerics.BigInteger`) in v3 — there is no token-id wrapper object. You can pass an `int` or `long` literal directly and it will be converted for you.

## Selecting Result Fields

For any operation that returns an object, you pass a field-selection builder for that type (for example, `CollectionQueryBuilder`, `TokenQueryBuilder`, `AccountQueryBuilder`). Call a `WithXxx` method for each field you want returned. Scalar fields take no builder; object fields take a nested builder so you can select their sub-fields:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

var fragment = new CollectionQueryBuilder()
    .WithId()
    .WithOwner(new AccountQueryBuilder().WithAddress());
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CollectionFragment.hpp"
#include "EnjinPlatformSdk/WalletFragment.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

WalletFragmentPtr walletFragment = make_shared<WalletFragment>();
walletFragment->WithId();

CollectionFragmentPtr fragment = make_shared<CollectionFragment>();
fragment->WithField("collectionId", true)
    .WithField("owner", walletFragment);
```
  </TabItem>
</Tabs>

:::tip Convenience selectors
Builders inherit helpers from their base class: `WithAllScalarFields()` selects every scalar field at once, `WithAllFields()` selects all fields, and `ExceptField("name")` removes a field you don't want. These are handy while prototyping, but selecting only the fields you need keeps responses small.
:::

:::warning
A request that returns an object must have at least one field selected on its builder, or the platform will reject the query.
:::

## Setting Arguments

Operation arguments are passed by name directly to the `WithXxx` method. You can pass plain C# values — enums, numbers, and strings are accepted as-is (the builder wraps them internally). The required `network` and `chain` arguments are the `Network` and `Chain` enums:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

var query = new QueryQueryBuilder()
    .WithGetCollection(
        new CollectionQueryBuilder().WithId(),
        network: Network.Canary, // or Network.Enjin for Mainnet
        chain: Chain.Matrix,     // or Chain.Relay
        id: 2000);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/GetCollection.hpp"
#include "EnjinPlatformSdk/SerializableString.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

SerializableStringPtr value = make_shared<SerializableString>("2000");

GetCollection req = GetCollection()
    .SetVariable("collectionId", "BigInt!", value);
```
  </TabItem>
</Tabs>

## Sending the Request

The client provides two extension methods that build the request body and POST it for you:

- `SendQuery(QueryQueryBuilder)` returns an `IPlatformResponse<QueryResponse>`.
- `SendMutation(MutationQueryBuilder)` returns an `IPlatformResponse<MutationResponse>`.

Both are asynchronous:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

IPlatformResponse<QueryResponse> response = await client.SendQuery(query);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CoreQueries.hpp"

using namespace enjin::platform::sdk;

// Returns a Future containing the response
SendGetCollection(*client, req);
```
  </TabItem>
</Tabs>

## Handling the Response

The returned `IPlatformResponse<T>` wraps the HTTP layer (`IsSuccessStatusCode`, `StatusCode`, `Headers`) and exposes the GraphQL payload on its `Result` property. From there:

- `response.Result.Data` holds the typed result — each operation appears as a property matching its name (`Data.GetCollection`, `Data.CreateTransaction`, …).
- `response.Result.Errors` holds any GraphQL errors returned by the platform.

Always check for errors before reading the data:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

IPlatformResponse<QueryResponse> response = await client.SendQuery(query);

// GraphQL-level errors (malformed request, failed validation, etc.)
if (response.Result.Errors is { Count: > 0 })
{
    foreach (var error in response.Result.Errors)
        Console.WriteLine(error.Message);
    return;
}

// Read the typed result
Collection? collection = response.Result.Data.GetCollection;
Console.WriteLine(collection?.Id);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/Collection.hpp"
#include <optional>

using namespace enjin::platform::sdk;
using namespace std;

if (gqlRes.has_value() && gqlRes->IsSuccess())
{
    const optional<Collection>& collection = gqlRes->GetData()->GetResult();

    /* Handle the result */
}

if (gqlRes.has_value() && gqlRes->HasErrors())
{
    const optional<vector<GraphQlError>>& errors = gqlRes->GetErrors();

    /* Handle the errors */
}
```
  </TabItem>
</Tabs>

## Sending Mutations

Mutations work the same way, built with `MutationQueryBuilder` and sent with `SendMutation`. In v3, almost every on-chain action (creating a collection, minting, transferring, burning, …) is submitted through a single `CreateTransaction` mutation: you populate a `TransactionInput` with exactly one action field and submit it.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

var transaction = new TransactionInput
{
    MintToken = new MintTokenInput
    {
        Recipient = "<recipient-address>",
        CollectionId = 2000,
        TokenId = 1,
        Amount = 1,
    },
};

var mutation = new MutationQueryBuilder()
    .WithCreateTransaction(
        new TransactionQueryBuilder().WithId().WithState(),
        network: Network.Canary,
        chain: Chain.Matrix,
        transaction: transaction);

IPlatformResponse<MutationResponse> response = await client.SendMutation(mutation);
```
  </TabItem>
</Tabs>

See the [Managing Tokens](/02-guides/01-platform/01-managing-tokens/01-creating-collections.md) guides for the full set of `TransactionInput` actions and worked examples for each operation.
