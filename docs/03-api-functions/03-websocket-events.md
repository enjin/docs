---
title: "Websocket Events"
slug: "websocket-events"
excerpt: ""
hidden: false
createdAt: "Sun Dec 10 2023 16:40:45 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Jan 19 2025 15:55:00 GMT+0000 (Coordinated Universal Time)"
---
:::info Websocket URLs
Enjin Platform Cloud **Canary**: `wss://ws-us2.pusher.com:443/app/76b7604dabc23c62be75?protocol=7`\
Enjin Platform Cloud **Mainnet**: `wss://ws-us2.pusher.com:443/app/02cbd93e7842fb1db299?protocol=7`
:::

The Enjin Platform emits events that you can listen to for various operations.  
For example, whenever a transaction is issued by your wallet daemon, an event is emitted via Websocket.

Listening to events is especially useful when awaiting for a transaction to be approved on-chain.

Platform events are emitted to the platform Websocket endpoint, in various channels.  
For example, we can listen to events related to account address `cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f` by subscribing to the channel `0x5a6aae294416f3e875d9a8975658905002cfd3e5e64105d76296c4b0adbfd77e`, which is the account's public key.

:::note Note on Address Formats in Platform Events
Please note that all account addresses included in platform events, such as channel names or any addresses within the event payload, are formatted as **public keys**.\
For example, in a "Transfer" event, the "from" account address appears in its public key format.\
If needed, you may use the [Account Format Transform tool](https://matrix.subscan.io/tools/format_transform) to convert between **SS58-encoded address format** (e.g., "cx...123" for the Canary Matrixchain or "cn...123" for the Canary Relaychain) and public key format.
:::

```json
{
  "event":"pusher:subscribe",
  "data":{
    "channel":"0x5a6aae294416f3e875d9a8975658905002cfd3e5e64105d76296c4b0adbfd77e"
  }
}
```

![Example banner](./img/Pusher.gif)

To get the full list of events and the channels they are broadcasted in, send the `GetEvents` query:

```graphql
query {
  GetEvents
}
```
