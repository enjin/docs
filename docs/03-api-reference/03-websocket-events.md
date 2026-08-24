---
title: "WebSocket Events"
slug: "websocket-events"
description: "Subscribe to real-time Enjin Platform events over WebSocket using the Pusher protocol."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

After you submit a transaction, there are two ways to find out what happened to it. You can keep asking the API ("is it finalized yet?") — that's **polling**, and it works, but it wastes requests and adds delay. Or the platform can tell *you* the moment something happens — a transaction changing state, a managed wallet being created, a user linking their wallet. That's what this page covers.

These notifications are delivered over a **WebSocket** — a connection your application opens once and keeps open, so the server can send it messages at any time. The Enjin Platform sends them through [Pusher](https://pusher.com/), a widely-used message-delivery service with a [documented protocol](https://pusher.com/docs/channels/library_auth_reference/pusher-websockets-protocol/) and official client libraries for most languages.

:::info You don't need a Pusher account
Pusher is just the delivery mechanism. You connect using Enjin's public app key below and authenticate with your regular Enjin Platform API token — there's nothing to sign up for or configure on Pusher's side.
:::

## How it works

Your account's events are broadcast on a **channel** — a named stream you subscribe to, e.g. `private-user.b1acd213-2b27-406e-a21b-02307b52eca0`. The `private-` prefix matters: only you are allowed to listen to it, so before Pusher lets you subscribe, you must prove to it that the Enjin Platform knows you. That proof is the `AuthenticatePusherSocket` mutation, and the whole flow is:

1. **Connect** to the WebSocket URI (see [Connection details](#connection-details)). Pusher immediately sends back a `pusher:connection_established` message containing a `socket_id` — an identifier for this particular connection, e.g. `1234567.1234567`.
2. **Authenticate** by passing that `socket_id` to the [`AuthenticatePusherSocket`](#authenticatepushersocket) mutation, using your normal API token. The platform returns two things: your `channel` name, and an `auth` signature — a token that tells Pusher "the platform vouches for this connection".
3. **Subscribe** to the returned `channel`, presenting the `auth` signature. From this moment, events arrive over the open connection as they happen.

The `auth` signature is tied to the `socket_id` it was issued for, and every new connection gets a new `socket_id` — so if the connection drops and you reconnect, you repeat steps 2 and 3.

If that sounds like a lot of bookkeeping: it mostly isn't yours to do. A first-party Pusher library (like [pusher-js](https://github.com/pusher/pusher-js)) handles the connection, the re-authentication on reconnect, and the keepalive for you — you just tell it how to call the mutation. That's the recommended setup, and the quick start below is exactly that. Only if no Pusher library exists for your stack do you need to speak the protocol yourself — see [Subscribing over a raw WebSocket](#subscribing-over-a-raw-websocket).

## Quick start

A complete, runnable listener in Node.js. Install the official Pusher client:

```bash
npm install pusher-js
```

Save this as `listen-for-events.mjs`, fill in your API token, and run it with `node listen-for-events.mjs`:

```javascript
import Pusher from 'pusher-js';

const API_TOKEN = '<YOUR_API_TOKEN>';

// Exchanges a socket_id for subscription credentials, using the
// AuthenticatePusherSocket mutation documented below.
async function authenticateSocket(socketId) {
  const response = await fetch('https://platform.enjin.io/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query: `
        mutation AuthenticatePusherSocket($id: String!) {
          AuthenticatePusherSocket(id: $id) {
            auth
            channel
          }
        }
      `,
      variables: { id: socketId }
    }),
  });
  const { data } = await response.json();
  return data.AuthenticatePusherSocket;
}

const pusher = new Pusher('8ab7ab8c519e8f59b635', {
  cluster: 'us2',
  channelAuthorization: {
    // pusher-js calls this whenever the private channel needs
    // (re-)authorizing — including automatically after a reconnect.
    customHandler: ({ socketId }, callback) => {
      authenticateSocket(socketId)
        .then(({ auth }) => callback(null, { auth }))
        .catch((error) => callback(error, null));
    }
  }
});

pusher.connection.bind('connected', async () => {
  // One extra call up front to learn the channel name for this account.
  const { channel } = await authenticateSocket(pusher.connection.socket_id);
  const subscription = pusher.subscribe(channel);
  console.log(`Connected. Listening on ${channel}`);
  subscription.bind_global((event, payload) => {
    console.log(event, payload);
  });
});
```

Leave it running and make something happen — for example, create a managed wallet with the [`CreateManagedWallet`](/03-api-reference/02-mutations/04-wallets-mutations.md#createmanagedwallet) mutation (or from the [Platform UI](https://platform.enjin.io)). Within a second or two you'll see:

```
Connected. Listening on private-user.b1acd213-2b27-406e-a21b-02307b52eca0
ManagedWalletRequested { externalId: 'example123' }
ManagedWalletCreated {
  externalId: 'example123',
  publicKey: '0x8faddcca50c311c6eb3d04ecfedf2ae30c60686cfce8addf55a1013ef706db23'
}
```

The full list of events you can receive is in the [Platform events](#platform-events) reference below.

:::warning Keep your API token server-side
`AuthenticatePusherSocket` requires your platform API token, so the socket should be opened from your backend (or the mutation proxied through it) — never ship the token to a browser or game client.
:::

## Connection details {#connection-details}

| Setting | Value |
| --- | --- |
| Pusher app key | `8ab7ab8c519e8f59b635` |
| Cluster | `us2` |
| WebSocket URI | `wss://ws-us2.pusher.com/app/8ab7ab8c519e8f59b635?protocol=7` |

Pusher libraries take the app key and cluster (as in the quick start above); the full WebSocket URI is what you connect to when working without a library.

## AuthenticatePusherSocket

```graphql
AuthenticatePusherSocket(id: String!): PusherSocketAuth!
```

Takes the `socket_id` of a connected socket and returns the credentials for subscribing to your account's private event channel. The API token you authenticate the GraphQL request with determines which account's channel is authorized.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AuthenticatePusherSocket($id: String!) {
  AuthenticatePusherSocket(id: $id) {
    auth
    channel
  }
}
```

**Variables:**

```json
{
  "id": "1359883.3809896"
}
```
  </TabItem>
  <TabItem value="curl" label="cURL">
```bash
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"mutation AuthenticatePusherSocket($id: String!) { AuthenticatePusherSocket(id: $id) { auth channel } }","variables":{"id":"1359883.3809896"}}'
```
  </TabItem>
  <TabItem value="js" label="Javascript">
```javascript
fetch('https://platform.enjin.io/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <YOUR_API_TOKEN>'
  },
  body: JSON.stringify({
    query: `
      mutation AuthenticatePusherSocket($id: String!) {
        AuthenticatePusherSocket(id: $id) {
          auth
          channel
        }
      }
    `,
    variables: { id: '1359883.3809896' }
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```
  </TabItem>
  <TabItem value="nodejs" label="Node.js">
```javascript
const axios = require('axios');

axios.post('https://platform.enjin.io/graphql', {
  query: `
    mutation AuthenticatePusherSocket($id: String!) {
      AuthenticatePusherSocket(id: $id) {
        auth
        channel
      }
    }
  `,
  variables: { id: '1359883.3809896' }
}, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <YOUR_API_TOKEN>'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```
  </TabItem>
  <TabItem value="python" label="Python">
```python
import requests

query = '''
mutation AuthenticatePusherSocket($id: String!) {
  AuthenticatePusherSocket(id: $id) {
    auth
    channel
  }
}
'''

variables = {'id': '1359883.3809896'}

response = requests.post(
    'https://platform.enjin.io/graphql',
    json={'query': query, 'variables': variables},
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <YOUR_API_TOKEN>'
    }
)
print(response.json())
```
  </TabItem>
</Tabs>

Response:

```json
{
  "data": {
    "AuthenticatePusherSocket": {
      "auth": "8ab7ab8c519e8f59b635:c81898c22164955191f384677873977d2c8d64e270aae004cc576ee71944def3",
      "channel": "private-user.b1acd213-2b27-406e-a21b-02307b52eca0"
    }
  }
}
```

## Subscribing over a raw WebSocket {#subscribing-over-a-raw-websocket}

If a first-party Pusher library isn't available for your stack, you can speak the protocol directly — it's the same three steps from [How it works](#how-it-works), done by hand. Note that the `data` field of every Pusher protocol frame is a JSON-*encoded string*, so it needs a second parse.

1. Connect to `wss://ws-us2.pusher.com/app/8ab7ab8c519e8f59b635?protocol=7`. The server sends:

   ```json
   {
     "event": "pusher:connection_established",
     "data": "{\"socket_id\":\"1359883.3809896\",\"activity_timeout\":120}"
   }
   ```

2. Call `AuthenticatePusherSocket` with the `socket_id`, then send a subscribe frame with the returned values:

   ```json
   {
     "event": "pusher:subscribe",
     "data": {
       "channel": "private-user.b1acd213-2b27-406e-a21b-02307b52eca0",
       "auth": "8ab7ab8c519e8f59b635:c81898c22164955191f384677873977d2c8d64e270aae004cc576ee71944def3"
     }
   }
   ```

3. The server confirms with `pusher_internal:subscription_succeeded`, and from then on each platform event arrives as a frame:

   ```json
   {
     "event": "TransactionStateChanged",
     "channel": "private-user.b1acd213-2b27-406e-a21b-02307b52eca0",
     "data": "{\"uuid\":\"0af09287-30ff-43c9-a13d-75ad1ea714c3\",\"state\":\"FINALIZED\"}"
   }
   ```

Your client is also responsible for keepalive: if the connection is quiet for longer than the `activity_timeout` reported in `pusher:connection_established`, send `{"event":"pusher:ping","data":{}}` and expect a `pusher:pong` back (the server may likewise ping you). And remember that a reconnect is a new socket — repeat the authenticate-and-subscribe handshake every time.

## Platform events

Event payloads are deliberately lightweight: they carry just enough to tell you *what* changed, and you fetch whatever else you need with a follow-up GraphQL query. For example, when `TransactionStateChanged` reports `FINALIZED`, query [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) to read the on-chain outcome and emitted events — see [Working with Events](/05-enjin-platform/03-working-with-events.md) for that flow.

| Event | Fires when |
| --- | --- |
| [`TransactionCreated`](#transactioncreated) | A transaction is created on the platform |
| [`TransactionStateChanged`](#transactionstatechanged) | A transaction moves to a new lifecycle state |
| [`DaemonConnectionStatusChanged`](#daemonconnectionstatuschanged) | Your Wallet Daemon's connection to the platform changes |
| [`ManagedWalletRequested`](#managedwalletrequested) | A managed wallet creation request is received |
| [`ManagedWalletCreated`](#managedwalletcreated) | A managed wallet's keypair has been derived |
| [`WalletLinked`](#walletlinked) | A user's wallet completes linking to your account |

:::note Address format
Account addresses in event payloads are formatted as **public keys** (`0x...`), not SS58-encoded addresses. The platform accepts public keys anywhere an address argument is expected, so you can pass them straight back into queries and mutations.
:::

### TransactionCreated {#transactioncreated}

Fired when a transaction is created on your account — whether by your application, the Platform UI, or another API client.

```json
{
  "uuid": "575209c5-6eda-4d8f-82c3-9a7f71249817"
}
```

Follow up with [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) for the transaction's action, state, and details.

### TransactionStateChanged {#transactionstatechanged}

Fired every time a transaction moves to a new lifecycle [`state`](/03-api-reference/04-important-arguments.md#state) — `PENDING` → `BROADCAST` → `FINALIZED`, or a terminal failure state. This replaces polling `GetTransaction` for state: drive your "pending → confirmed" UI straight off these events, and when the state reaches `FINALIZED`, fetch the emitted on-chain events as described in [Working with Events](/05-enjin-platform/03-working-with-events.md).

```json
{
  "uuid": "0af09287-30ff-43c9-a13d-75ad1ea714c3",
  "state": "FINALIZED"
}
```

### DaemonConnectionStatusChanged {#daemonconnectionstatuschanged}

Fired when your project's [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) connects to or disconnects from the platform. Useful for alerting: while the daemon is offline, transactions queue up unsigned.

```json
{
  "status": "ONLINE"
}
```

### ManagedWalletRequested {#managedwalletrequested}

Fired when a [`CreateManagedWallet`](/03-api-reference/02-mutations/04-wallets-mutations.md#createmanagedwallet) request is received, before the Wallet Daemon has derived the keypair.

```json
{
  "externalId": "example123"
}
```

### ManagedWalletCreated {#managedwalletcreated}

Fired once the Wallet Daemon has derived the managed wallet's keypair — the point at which the wallet is usable. The payload already carries the wallet's public key, so no `GetManagedWallet` lookup is needed.

```json
{
  "externalId": "example123",
  "publicKey": "0x8faddcca50c311c6eb3d04ecfedf2ae30c60686cfce8addf55a1013ef706db23"
}
```

### WalletLinked {#walletlinked}

Fired when an end user completes linking their wallet to your account (see [Sending Wallet Requests](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) for the flow). The `idempotencyKey` identifies which [`CreateLinkingCode`](/03-api-reference/02-mutations/04-wallets-mutations.md#createlinkingcode) request was fulfilled, and `publicKey` is the wallet the user linked — the moment to associate that address with the user's record in your database, with no need to poll for the link.

```json
{
  "idempotencyKey": "287a471e-c868-418c-90a2-2d6f5e993ed4",
  "publicKey": "0xd542de6771d0c6f9bc70600c94b6747f280cda654cdbe3e92a7f0c6e94c25fa3"
}
```
