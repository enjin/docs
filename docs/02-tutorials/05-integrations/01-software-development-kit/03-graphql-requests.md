---
title: "GraphQL Requests"
slug: "graphql-requests"
excerpt: ""
hidden: false
metadata: 
  title: "GraphQL Requests - Query the Enjin Platform Efficiently"
  description: "Learn how to use GraphQL requests to interact with the Enjin platform, allowing you to query and mutate blockchain data efficiently."
  image: []
  robots: "index"
createdAt: "Wed Nov 01 2023 01:17:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:51:17 GMT+0000 (Coordinated Universal Time)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating the Request

The most important step in sending a request is to first create said request. The SDK provides us with two ways to create a request. The first way is to utilize a predefined, dynamic request class to programmatically compile our request at runtime. The second way is to provide our own query string to be sent along with any relevant information, however, this method of going about creating a request places a greater demand on us to validate that our queries and mutations are indeed correct.

## Dynamic Requests

Dynamic requests represent the different queries and mutations we may make in the platform's GraphQL schemas and offer a built-in, programmatic method of arranging requests at runtime.

## Setting Result Fields

Requests which produce non-scalar types in the response will have an associated fragment class that may be passed to its aptly named `Fragment` method. For predefined type models in the SDK, there will be corresponding fragment classes that allow us to specify the fields we want to be returned in the response.

As an example, the `GetCollection` request accepts a `CollectionFragment` instance as its and through the fragment we may specify that we want the `collectId` field to be returned in the data of the response by using a predefined method as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

CollectionFragment fragment = new CollectionFragment()
    .WithCollectionId();

req.Fragment(fragment);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/CollectionFragment.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

CollectionFragmentPtr fragment = make_shared<CollectionFragment>();
fragment->WithCollectionId();

req.SetFragment(fragment);
```
  </TabItem>
</Tabs>

We may also set the fragment to include fields not specified by the SDK if needed by using the general `WithField` method. For this method, we must pass a string as the first parameter containing the name of the field we would like to request and for the second parameter we may either pass a Boolean when requesting a scalar field or an instance of a class implementing which `IGraphQlFragment` for a non-scalar field. An example of this can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

CollectionFragment fragment = new CollectionFragment()
    .WithField("collectionId", true)
    .WithField("owner", new WalletFragment().WithId());
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

:::warning
For requests which accept fragments, a fragment with at least one field requested must be passed or the SDK will throw an exception.
:::

## Setting Request Variables

GraphQL requests that have settable variables will have methods prefixed with "set" for setting predefined parameters for the given type. An example of this for the `GetCollection` the query can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

GetCollection req = new GetCollection()
    .SetCollectionId(2000)
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

Such classes also have a general `SetVariable` method which accepts a string for the parameter name, a string for the variable's type, and a value. This can be used to set variables that are not predefined by the SDK. An example of what this may look like for the `GetCollection` can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

GetCollection req = new GetCollection()
    .SetVariable("collectionId", "BigInt!", 2000);
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

Each component of the SDK also comes with a static class containing string fields representing the types present for that component's GraphQL schema and offer a more programmatic option for setting the type of a variable, as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
#include "EnjinPlatformSdk/GetCollection.hpp"
#include "EnjinPlatformSdk/SerializableString.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

SerializableStringPtr value = make_shared<SerializableString>("2000");

GetCollection req = GetCollection()
    .SetVariable("collectionId", CoreTypes::BigInt, value);
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
    .SetVariable("collectionId", CoreTypes::BigInt, value);
```
  </TabItem>
</Tabs>

## Setting Input Parameters

Classes, such as fragments and those modeling a GraphQL input may have settable parameters to be used as part of a request. An example of one of these parameter holders is shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Numerics;
using Enjin.Platform.Sdk;

BigInteger integer = BigInteger.Parse("<token-integer-id>");

EncodableTokenIdInput tokenId = new EncodableTokenIdInput()
            .SetInteger(integer);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/EncodableTokenIdInput.hpp"
#include "EnjinPlatformSdk/SerializableString.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

SerializableStringPtr integer =
    make_shared<SerializableString>("<token-integer-id>");

EncodableTokenIdInputPtr tokenId = make_shared<EncodableTokenIdInput>();
tokenId->SetInteger(integer);
```
  </TabItem>
</Tabs>

These classes also have a general `SetParameter` method for setting parameters not already defined by the SDK. These parameters may be of a type that implements `IGraphQlParameter` which itself may be a parameter holder, a list of types implementing the aforementioned interface, or a general value representing parameters that do not support nesting such as a scalar. Usage of this method can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Numerics;
using Enjin.Platform.Sdk;

BigInteger integer = BigInteger.Parse("<token-integer-id>");

EncodableTokenIdInput tokenId = new EncodableTokenIdInput()
            .SetParameter("integer", integer);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/EncodableTokenIdInput.hpp"
#include "EnjinPlatformSdk/SerializableString.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

SerializableStringPtr integer =
    make_shared<SerializableString>("<token-integer-id>");

EncodableTokenIdInputPtr tokenId = make_shared<EncodableTokenIdInput>();
tokenId->SetParameter("integer", integer);
```
  </TabItem>
</Tabs>

:::tip
Parameters on the root fragment of a request will be treated as if they are parameters for the request itself, such is the case for the after and first parameters of the ConnectionFragment class.
:::

## Sending the Request

When sending requests the SDK offers built-in methods that complement the predefined requests. The methods will be prefixed with "Send" followed by the name of the request. An example of what this may look like for the `GetCollection` the request is shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk; // Namespace of extension method

// Returns a Task containing the response
client.SendGetCollection(req);
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

## Static Requests

Aside from the dynamic queries and mutations built into the SDK, we may pass static query strings and variable mappings to the platform client in cases where speed is valued more than dynamic request creation.

To facilitate static requests, the platform client implements a method that takes a string for the query body, a nullable mapping for any variables, and a relative path for the request's schema in the API.

:::warning
The type for the data in the GraphQL query string must be aliased as result to ensure that the returned data may be properly deserialized for the response.
:::

## Without Variables

When creating a static request without passing a mapping of variables we need only set the values for such variables in the query string we will be using. After creating our query string we then pass it and the schema path to the `SendRequest` method while leaving the variables argument as `null`, as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

string query = @"query {
    result: GetCollection(collectionId: 2000) {
        collectionId
    }
}";
IPlatformRequest req = PlatformRequest
    .Builder()
    .SetPath("<path-for-GraphQL-schema>")
    .AddOperation(query, null)
    .Build();

// Returns a Task containing the response
client.SendRequest<GraphQlResponse<Collection>>(req);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/Collection.hpp"
#include "EnjinPlatformSdk/GraphQlResponse.hpp"
#include "EnjinPlatformSdk/PlatformRequest.hpp"
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

string query = R"(query {
    result: GetCollection(collectionId: 2000) {
        collectionId
    }
})";

PlatformRequestPtr req = PlatformRequest::Builder()
    .SetPath("<path-for-GraphQL-schema>")
    .AddOperation(query, {})
    .Build();

// Returns a Future containing the response
client->SendRequest<GraphQlResponse<Collection>>(req);
```
  </TabItem>
</Tabs>

:::warning
For the C++ SDK, if the request contains an Upload variable then an additional map containing the names and values of the uploads will need to be passed to the AddOperation method.
:::

## Handling the Response

Once we have sent our request to the platform we should expect to get a response back with information that we intended to retrieve in the first place or with information that we may act on if we so choose.

## Getting the Response

The send methods of a platform client return asynchronous handlers which contain the result of our operation. At the first level of the result, is a platform response of type, which generally holds the HTTP information of the response from the platform. Within this platform response, there is also a `GraphQlResponse` property, which contains the result data of our GraphQL request and any errors that may have been returned with it.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;
using Enjin.Platform.Sdk;

GetCollection req = /* Creating the request... */

// Send the request and get the Task containing the response
Task<IPlatformResponse<GraphQlResponse<Collection>>> task =
    client.SendGetCollection(req);

// Get the platform response holding the HTTP data
IPlatformResponse<GraphQlResponse<Collection>> platformRes = task.Result;

// Get the result, a GraphQL response, holding the GraphQL data
GraphQlResponse<Collection> gqlRes = platformRes.GqlResponse;
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/Collection.hpp"
#include "EnjinPlatformSdk/CoreQueries.hpp"
#include "EnjinPlatformSdk/GraphQlResponse.hpp"
#include "EnjinPlatformSdk/IPlatformResponse.hpp"
#include <future>
#include <optional>

using namespace enjin::platform::sdk;
using namespace std;

GetCollection req = /* Creating the request... */

// Send the request and get the Future containing the response
future<PlatformResponsePtr<GraphQlResponse<Collection>>> fut =
    SendGetCollection(*client, req);

// Get the platform response holding the HTTP data
PlatformResponsePtr<GraphQlResponse<Collection>> platformRes = fut.get();

// Get the result, a GraphQL response, holding the GraphQL data
const optional<GraphQlResponse<Collection>>& gqlRes = platformRes->GetResult();
```
  </TabItem>
</Tabs>

## Processing the Result

To process the result we must first get the `GraphQlData` property within the `GraphQlResponse`, then we will get the result property from the data. The type of result will be either one of the predefined type models or a scalar value depending on our request.

The response also has a property indicating whether the request was successful, indicating that a result is present, and we ought to consider checking if this property is `true` before retrieving the result.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

if (gqlRes.IsSuccess)
{
    Collection collection = gqlRes.Data.Result;

    /* Handle the result */
}
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
```
  </TabItem>
</Tabs>

## Processing Errors

The response may also contain errors that the platform may return in situations where our request was malformed, had incorrect arguments, or failed some other validation. To retrieve any such errors we make a call to the response's Errors property as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Collections.Generic;
using Enjin.Platform.Sdk;

if (gqlRes.HasErrors)
{
    IEnumerable<GraphQlError> errors = gqlRes.Errors;

    /* Handle the errors */
}
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/GraphQlError.hpp"
#include <optional>
#include <vector>

using namespace enjin::platform::sdk;
using namespace std;

if (gqlRes.has_value() && gqlRes->HasErrors())
{
    const optional<vector<GraphQlError>>& errors = gqlRes->GetErrors();

    /* Handle the errors */
}
```
  </TabItem>
</Tabs>

The response also has a `HasErrors` property, which indicates whether there are in fact any errors at all and is a property we should check before making an attempt to retrieve them.
