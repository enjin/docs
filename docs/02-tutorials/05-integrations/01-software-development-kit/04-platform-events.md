---
title: "Platform Events"
slug: "platform-events"
excerpt: ""
hidden: false
metadata: 
  title: "Platform Events - Monitor and Handle Enjin Events"
  description: "Explore how to monitor and handle platform events in the Enjin SDK, ensuring real-time updates for your blockchain applications."
  image: []
  robots: "index"
createdAt: "Wed Nov 01 2023 01:27:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Sep 10 2024 00:51:34 GMT+0000 (Coordinated Universal Time)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Event Listeners

To allow our application to receive events from the platform the SDK comes with an `IEventListener` interface for us to use to receive events for processing.

### Creating a Listener

To use the `IEventListener` interface on a listener class we create we must implement its `OnEvent` method. This method accepts a `PlatformEven`t, which contains the name of the event, the channel it was broadcasted on, the raw event message, and the parsed JSON data representing the message. A generic listener implementing this interface is shown in the code block below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Text.Json;
using Enjin.Platform.Sdk;

class EventListener : IEventListener
{
    public void OnEvent(PlatformEvent evt)
    {
        string eventName = evt.EventName;
        string channelName = evt.ChannelName;
        string message = evt.Message;
        JsonElement data = evt.Data;

        /* Handle event */
    }
}
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/IEventListener.hpp"
#include "EnjinPlatformSdk/PlatformEvent.hpp"
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

class EventListener : public virtual IEventListener
{
public:
    void OnEvent(const PlatformEvent& evt) override
    {
        const string& eventName = evt.GetEventName();
        const string& channelName = evt.GetChannelName();
        const string& message = evt.GetMessage();
        
        /* Handle event */
    }
};
```
  </TabItem>
</Tabs>

### Registering a Listener

To make use of the event listener we have created, we will need to register it with the event service so that the service may pass any cloud events it receives to the listener. To do so, we may make a call to the registration method, passing our listener as an argument as can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
IEventListener listener = /* Create event listener */

IEventListenerRegistration reg = service.RegisterListener(listener);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/IEventListener.hpp"
#include "EnjinPlatformSdk/IEventListenerRegistration.hpp"

using namespace enjin::platform::sdk;

EventListenerPtr listener = /* Make pointer containing event listener */

EventListenerRegistrationPtr reg = service->RegisterListener(listener);
```
  </TabItem>
</Tabs>

By registering our listener this way, the service will pass along any event it receives from the cloud to our listener for handling.

We may also use the registration the service returned to a way to monitor or validate our listener's state within the service. The registration comes with a getter for the matcher used by the service to filter events, as well as a property indicating whether the listener's registration with the service is still active or not.

#### Filter Events with Registration

The event service also provides means for registering listeners while filter out events for the given registration. This may help in the creation of listeners with narrower scopes, such as a dedicated wallet listener. Without using one of the follow methods of registration, a given listener will be notified of all events the service receives.

One method for registering a listener with event filtering is to pass an event matcher. For any event to be passed along to the listener, the service expects the matcher to return `true` for it. Aside from this requirement the matcher may be configured however we want.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

IEventListener listener = /* Create event listener */
Func<string, bool> matcher = evtName =>
{
    return /* Return boolean */
};

// Returns a registration
service.RegisterListenerWithMatcher(listener, matcher);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/IEventListener.hpp"
#include "EnjinPlatformSdk/IEventListenerRegistration.hpp"
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

EventListenerPtr listener = /* Make pointer containing event listener */
EventMatcher matcher = [](const string& evtName) {
    return /* Return boolean */
};

// Returns a registration
service->RegisterListenerWithMatcher(listener, matcher);
```
  </TabItem>
</Tabs>

Alternatively, we may pass our listener with an array of events to filter for or exclude using one of two methods as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System;
using Enjin.Platform.Sdk;

IEventListener listener = /* Create event listener */
string[] events = { "<event-1>", "<event-2>", "<event-3>" };

// Pass only the listed events to the listener
service.RegisterListenerIncludingEvents(listener, events);

// Pass events other than the ones listed to the listener
service.RegisterListenerExcludingEvents(listener, events);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/IEventListener.hpp"
#include <set>
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

EventListenerPtr listener = /* Make pointer containing event listener */
std::set<string> events = { "<event-1>", "<event-2>", "<event-3>" };

// Pass only the listed events to the listener
service->RegisterListenerIncludingEvents(listener, events);

// Pass events other than the ones listed to the listener
service->RegisterListenerExcludingEvents(listener, events);
```
  </TabItem>
</Tabs>

#### Filter Events with Attribute

Event listeners may also have an attribute attached to them that the service may refer to for filtering. The attribute takes two arguments: a Boolean stating whether the events are allowed and a list of the event names.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

[EventFilter(isAllowed: true, "<event-1>", "<event-2>", "<event-3>")]
class EventListener : IEventListener
{
    /* ... */
}
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
  ```cpp
  Work in progress.
  ```
  </TabItem>
</Tabs>

Once the class has been instantiated, we may then register it using the standard `RegisterListener` method that accepts only the listener as an argument.

:::warning
If a listener with the filter attribute is registered using any of the registration methods that accept filter arguments, then the event service may throw an exception.
:::

#### The Events to Filter

The SDK contains utility classes which have constants representing the names of events broadcasted by the platform. These classes allow us to programmatically set which events we want to filter or even act as a simple reference when making branch statements for the different events we receive. An example of usage for one of these utility classes, `SubstrateEvents` can be seen below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

IEventListener listener = /* Create event listener */
string[] events = { SubstrateEvents.CollectionCreated };

service.RegisterListenerIncludingEvents(listener, events);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/IEventListener.hpp"
#include "EnjinPlatformSdk/SubstrateEvents.hpp"
#include <set>
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

EventListenerPtr listener = /* Make pointer containing event listener */
std::set<string> events = { SubstrateEvents::CollectionCreated };

service->RegisterListenerIncludingEvents(listener, events);
```
  </TabItem>
</Tabs>

#### Unregistering a Listener

To unregister a listener from the event service, we need only pass the listener instance to the service's unregister method as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
// Passing an event listener instance
service.UnregisterListener(listener);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
// Passing an event listener reference
service->UnregisterListener(*listener); // Reference from pointer
```
  </TabItem>
</Tabs>

We may also unregister all listeners from the service by calling the unregister all method as so:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
service.UnregisterAllListeners();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
service->UnregisterAllListeners();
```
  </TabItem>
</Tabs>

After a listener is unregistered, the service will also update the `IEventRegistration` we received while registering our listener, so that the registration now returns `false` for its `IsRegistered` getter.

### Event Subscription

After setting up our event listener we now need to manage which event channels we want our service to listen to for it to pull events from. This enables us to have our service only listen in on channels necessary for our application's current needs, such as the wallet channel for a connected user, updates to a particular collection, or the progression of a transaction.

#### Subscribing

To subscribe to an event channel, we need to pass the channel name to the subscribe method, as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;

string channelName = "<name-of-event-channel>";
Task task = service.SubscribeAsync(channelName);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include <future>
#include <string>

using namespace std;

string channelName = "<name-of-event-channel>";
future<void> fut = service->SubscribeAsync(channelName);
```
  </TabItem>
</Tabs>

Once subscribed, the event service will pass along any event broadcasted on the given channel to our registered listeners, so long as said listeners do not exclude the events.

#### Unsubscribing

To unsubscribe from an event channel, we may pass the same channel name we used to subscribe, as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;

string channelName = "<name-of-event-channel>";
Task task = service.UnsubscribeAsync(channelName);;
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include <future>
#include <string>

using namespace std;

string channelName = "<name-of-event-channel>";
future<void> fut = service->UnsubscribeAsync(channelName);
```
  </TabItem>
</Tabs>

We may also unsubscribe from all channels by calling the relevant method.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using System.Threading.Tasks;

Task task = service.UnsubscribeAllAsync();
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include <future>

using namespace std;

future<void> fut = service->UnsubscribeAllAsync();
```
  </TabItem>
</Tabs>

#### Monitoring the Service

The event service also provides means to monitor its state through events. The following code shows the different events that may be used to receive notifications regarding state changes within the service.

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
// Notifies that the service has connected to a server
service.OnConnected += (sender, _) => { /* ... */ };

// Notifies that the service has disconnected froma server
service.OnDisconnected += (sender, _) => { /* ... */ };

// Notifies that the service's connection state has updated
service.OnConnectionStateChanged += (sender, state) => { /* ... */ };

// Notifies that the service has subscribed to an event channel
service.OnSubscribed += (sender, channelName) => { /* ... */ };
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
PusherEventService::Builder()
        // Notifies that the service has connected to a server
        .SetOnConnectedHandler([]() {
                /* ... */
        })
        // Notifies that the service has disconnected froma server
        .SetOnDisconnectedHandler([]() {
                /* ... */
        })
        // Notifies that the service's connection state has updated
        .SetOnConnectionStateChangedHandler([](ConnectionState state) {
                /* ... */
        })
        // Notifies that the service has subscribed to an event channel
        .SetOnSubscribedHandler([](const string& channelName) {
                /* ... */
        });
```
  </TabItem>
</Tabs>
