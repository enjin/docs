---
title: "Logger"
slug: "logger"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Logger Interface

The SDK provides a simple logger interface to facilitate logging within its classes and whichever logging framework we choose to use in our application. An example of this interface's implementation can be seen in the block below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

class Logger : ILogger
{
    public void Log(LogLevel logLevel, string? message)
    {
        /* Log the message */
    }

    public void Log(LogLevel logLevel, Exception? e, string? message)
    {
        /* Log the exception and message */
    }
}
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/ILogger.hpp"
#include "EnjinPlatformSdk/LogLevel.hpp"
#include <stdexcept>
#include <string>

using namespace enjin::platform::sdk;
using namespace std;

class Logger : public virtual ILogger
{
public:
    void Log(LogLevel logLevel, const string& message) override
    {
    }

    void Log(LogLevel logLevel, const exception& e, const string& message) override
    {
    }
};
```
  </TabItem>
</Tabs>

## Log Levels

The `ILogger` interface uses log levels to communicate the type of message being logged. These levels are represent within the `LogLevel` enums and are summarized in the table below:

| LogLevel    | Description                                                                                   |
| :---------- | :-------------------------------------------------------------------------------------------- |
| Trace       | For detailed messages. May expose sensitive information and should not be used in production. |
| Debug       | For debugging or messages appropriate in a development environment.                           |
| Information | General informational messages.                                                               |
| Warning     | For unexpected behavior that does not necessarily cause a failure.                            |
| Error       | For unhandled errors or exceptions.                                                           |
| Critical    | For issues that require immediate attention.                                                  |
| None        | Specifies no messages are to be logged.                                                       |

## Platform Client Logging

To setup logging for the `PlatformClient` we may pass an `ILogger` instance to its builder as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

ILogger logger = /* Instantiate class implementing ILogger */

// Using a PlatformClient builder
builder.SetLogger(logger);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/ILogger.hpp"

using namespace enjin::platform::sdk;

LoggerPtr logger = /* Make pointer containing ILogger implementation */

// Using a PlatformClient builder
builder.SetLogger(logger);
```
  </TabItem>
</Tabs>

## Logging HTTP Traffic

The SDK also offers HTTP logging options for its built-in platform client. There are four log levels to choose from for HTTP traffic.

| HttpLogLevel | Description                                                            |
| :----------- | :--------------------------------------------------------------------- |
| None         | Indicates HTTP traffic is not to be logged.                            |
| Basic        | Logs topical information, such as the method, URI, and content-length. |
| Headers      | Logs HTTP headers in addition to topical information.                  |
| Body         | Logs the full request/response.                                        |

To enable HTTP traffic logging, we must provide an `ILogger` instance and our desired HTTP log level when building the client as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

ILogger logger = /* Instantiate class implementing ILogger */
HttpLogLevel level = /* Choose a HTTP log level */

// Using a PlatformClient builder
builder.SetLogger(logger)
       .SetHttpLogLevel(level);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/HttpLogLevel.hpp"
#include "EnjinPlatformSdk/ILogger.hpp"

using namespace enjin::platform::sdk;

LoggerPtr logger = /* Make pointer containing ILogger implementation */
HttpLogLevel level = /* Choose a HTTP log level */

// Using a PlatformClient builder
builder.SetLogger(logger)
    .SetHttpLogLevel(level);
```
  </TabItem>
</Tabs>

### Event Service Logging

To setup logging for the `PusherEventService` we may pass an `ILogger` instance to its builder as shown below:

<Tabs>
  <TabItem value="csharp-sdk" label="c# SDK">
```csharp
using Enjin.Platform.Sdk;

ILogger logger = /* Instantiate class implementing ILogger */

// Using a PusherEventService builder
builder.SetLogger(logger);
```
  </TabItem>
  <TabItem value="cplusplus-sdk" label="C++ SDK">
```cpp
#include "EnjinPlatformSdk/ILogger.hpp"

using namespace enjin::platform::sdk;

LoggerPtr logger = /* Make pointer containing ILogger implementation */

// Using a PusherEventService builder
builder.SetLogger(logger);
```
  </TabItem>
</Tabs>
