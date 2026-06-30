---
title: "Getting Started"
slug: "getting-started"
description: "Learn how to get started with the Enjin Platform C# SDK, your first step toward building powerful blockchain-based applications and games."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info C++ SDK coming soon
The C++ examples on this page target an older version of the Enjin Platform and won't work against the current API. An updated C++ SDK is on the way — for now, use the C# SDK or the GraphQL examples.
:::

To communicate with the Enjin Platform from C#, you use the SDK's `PlatformClient`. This page covers installing the SDK and setting up an authenticated client.

:::warning Please always make sure to integrate authentication endpoints via secure backend servers.
Direct integration of the SDK into game clients, which can be decompiled, is strictly not recommended due to potential security risks and exposure of your keys.
:::

## Installing the SDK

### C#

The C# SDK is published to NuGet as a single package, [`Enjin.Platform.Sdk`](https://www.nuget.org/packages/Enjin.Platform.Sdk). It targets .NET Standard 2.1 (compatible with .NET 5.0+, Unity 2021.3 LTS+, and Godot 4.0+).

Install it with the .NET CLI:

```bash
dotnet add package Enjin.Platform.Sdk
```

Or add it to your project file:

```xml
<PackageReference Include="Enjin.Platform.Sdk" Version="3.0.2" />
```

:::note
In v3 the SDK is a single package. The old v2 sub-packages (`Enjin.Platform.Sdk.Beam`, `.FuelTanks`, `.Marketplace`) have been consolidated into `Enjin.Platform.Sdk`, and everything lives under the single `Enjin.Platform.Sdk` namespace.
:::

### C++

An updated C++ SDK for the current Enjin Platform is on the way. Installation instructions will be added here once it's released — in the meantime, you can track the [C++ SDK repository](https://github.com/enjin/platform-cpp-sdk).

## Platform Client

For communicating with the platform's GraphQL API, the SDK defines an `IPlatformClient` interface. The built-in `PlatformClient` class implements it and handles building, sending, and deserializing requests for you.

### Creating the Client

Constructing a `PlatformClient` with no arguments connects to the Enjin Platform using the SDK's built-in endpoint — you don't need to specify a URL. You choose which network to work against (Enjin Mainnet or the Canary testnet) per request via the `network` argument, covered in [GraphQL Requests](/02-guides/01-platform/04-software-development-kit/02-graphql-requests.md), so the same client serves both.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

using var client = new PlatformClient();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/PlatformClient.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

unique_ptr<PlatformClient> client = PlatformClient::Builder()
    .SetBaseAddress("https://<platform-host>")
    .Build();
```
  </TabItem>
</Tabs>

The constructor also accepts optional parameters — including a custom base-address `Uri` (only needed for a self-hosted platform instance), a user agent, an `ILogger` implementation, and an `HttpLogLevel` for logging HTTP traffic:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

ILogger logger = /* your ILogger implementation */;

using var client = new PlatformClient(
    logger: logger,
    httpLogLevel: HttpLogLevel.Body);
```
  </TabItem>
</Tabs>

### Authenticating the Client

Once you have a client instance, authenticate it with your platform authentication token:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
client.Auth("<platform-authentication-token>");
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
client->Auth("<platform-authentication-token>");
```
  </TabItem>
</Tabs>

### Disposing of the Client

`PlatformClient` implements `IDisposable`. When you no longer need it, dispose of it to free up its underlying resources. The `using var` declaration above does this automatically when the client goes out of scope; you can also dispose of it explicitly:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
client.Dispose();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// We may reset the pointer or allow the class destructor to handle
// this when our client goes out-of-scope.

client.reset();
```
  </TabItem>
</Tabs>

## Next Steps

With an authenticated client you can start sending requests. See [GraphQL Requests](/02-guides/01-platform/04-software-development-kit/02-graphql-requests.md) to learn how to build queries and mutations, select the fields you want back, and handle responses.

:::tip Real-time events
The Enjin Platform doesn't yet expose real-time WebSocket events. Until it does, the pattern for tracking a submitted transaction is to poll the `GetTransaction` query by its UUID until it reaches a final state — see the [Enjin Farmer server implementation breakdown](/02-guides/01-platform/05-enjin-farmer-sample-game/overview#server-implementation-breakdown) for a worked example.
:::
