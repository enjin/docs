---
title: "Getting Started"
slug: "getting-started"
description: "Learn how to get started with the Enjin SDK, your first step toward building powerful blockchain-based applications and games."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To have the SDK connect with the Enjin Platform we must use its platform clients and event services. As a starter, we will look over how to set up these clients.

:::warning Please always make sure to integrate authentication endpoints via secure backend servers.  
Direct integration of the SDKs into game clients, which can be decompiled, is strictly not recommended due to potential security risks and exposure of your keys.
:::

## Platform Clients

For communicating with the platform's GraphQL API, the SDK defines an `IPlatformClient` interface that works with GraphQL objects for sending requests and receiving responses from the platform.

### Creating the Client

The built-in `PlatformClient` class, which implements `IPlatformClient`, utilizes a builder pattern for instantiating new instances. When using this builder, one of the essential inputs we must set is the base address of the platform we will be using.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

IPlatformClient client = PlatformClient
    .Builder()
    .SetBaseAddress("https://<platform-host>")
    .Build();
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

### Authenticating the Client

Once we have our client instance we may now authenticate it using an authentication token for our platform.

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

When we no longer need our platform client, we may dispose of it to free up any system resources it may be using with the appropriate method as shown:

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

## Event Services

The platform broadcasts events that we may respond to or gather information from. For interfacing with an event broadcasting service the SDK offers the `IEventService` interface. Whether we decide to use a free, paid, self-hosted, or any such framework as the driver for broadcasting platform events, the `IEventService` interface defines what operations we may use for working with it.

### Creating the Service

The default framework used by the Enjin Platform Cloud and platforms using the Enjin Platform - Starter Template for broadcasting cloud events is [Pusher Channels](https://pusher.com/channels). To work with this framework the SDK has its own `PusherEventService` which implements `IEventService` and serves as an abstraction between us and Pusher for subscribing and listening for events and is a useful tool for those just getting started.

Our builder for the `PusherEventService` typically expects two attributes to be set before building with a third optional attribute for encryption. The two essential attributes are:

- The application key
- The hostname of our platform

:::info
If our application key is not valid, then we may expect a 404 error when connecting our event service.
:::

The other optional attribute we may set is the encryption status. This will determine which protocol our service will connect with (`wss` or `ws`). If we do not set this attribute, then our builder will default to the `WebSocket Secured` protocol on building.

An example of building this event service can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

IEventService service = PusherEventService
    .Builder()
    .SetKey("websocket")
    .SetHost("<platform-host>")
    .SetEncrypted(true) // Defaults to true if not set
    .Build();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/PusherEventService.hpp"
#include <memory>

using namespace enjin::platform::sdk;
using namespace std;

unique_ptr<PusherEventService> service = PusherEventService::Builder()
    .SetKey("websocket")
    .SetHost("<platform-host>")
    .SetEncrypted(true) // Defaults to true if not set
    .Build();
```
  </TabItem>
</Tabs>

:::tip 
If you wish to change the key (websocket), you can do so in the platform config files.
:::

::: note
For developers who opt to utilize Pusher's own Channels service for broadcasting events, then instead of `SetHost()` we may use the builder's `SetCluster()` method to connect our event service to the appropriate Pusher cluster.
:::

### Managing the Connection

Before we can use our event service, we must connect it to the designated server host through its ConnectAsync method as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;

Task task = service.ConnectAsync();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include <future>

using namespace std;

future<void> fut = service->ConnectAsync();
```
  </TabItem>
</Tabs>

To disconnect the service from the server, we make a call to its DisconnectAsync method.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;

Task task = service.DisconnectAsync();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include <future>

using namespace std;

future<void> fut = service->DisconnectAsync();
```
  </TabItem>
</Tabs>

## Disposing of the Service

When we no longer need our event service, we may dispose of it to free up any system resources it may be using with the appropriate method as shown:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
service.Dispose();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// We may reset the pointer or allow the class destructor to handle
// this when our event service goes out-of-scope.

service.reset();
```
  </TabItem>
</Tabs>
