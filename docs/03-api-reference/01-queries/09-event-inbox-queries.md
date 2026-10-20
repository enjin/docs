---
title: "Event Inbox"
slug: "event-inbox"
description: "Retrieve pending Enjin Platform notifications with GetPendingEvents for polling or recovery after a WebSocket disconnect."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

Event Inbox stores eligible on-chain notifications for your account so you can poll at a convenient time or recover notifications missed over WebSocket. Authenticate with your Enjin Platform API token. Notifications are captured automatically; no Pusher connection or opt-in is required.

See [Working with Events](/05-enjin-platform/03-working-with-events.md#event-inbox) for the processing workflow and [On-chain notifications](/03-api-reference/03-websocket-events.md#on-chain-notifications) for the supported events.

## GetPendingEvents

Returns the oldest unacknowledged notifications for the authenticated user on the requested network and chain, up to `limit`.

```graphql
GetPendingEvents(
  network: Network! = ENJIN
  chain: Chain! = MATRIX
  limit: Int! = 100
): [UnprocessedEvent!]!
```

| Argument | Type | Default | Description |
| --- | --- | --- | --- |
| `network` | `Network!` | `ENJIN` | Network to retrieve notifications from: `ENJIN` or `CANARY`. |
| `chain` | `Chain!` | `MATRIX` | Chain to retrieve notifications from: `MATRIX` or `RELAY`. |
| `limit` | `Int!` | `100` | Maximum number of notifications to return, from `1` to `100`. |

All three arguments can be omitted to use their defaults. Poll each network and chain you need separately.

### Response fields

The result is a list of `UnprocessedEvent` objects, or `[]` if there are no pending notifications.

| Field | Type | Description |
| --- | --- | --- |
| `uuid` | `ID!` | Delivery UUID used for deduplication and acknowledgment. The same UUID is included in the corresponding Pusher notification. |
| `event` | `String!` | Exact Pusher event name, for example `BalancesTransfer`. |
| `payload` | `JSON!` | Notification payload as a JSON object. The delivery UUID is returned separately in `uuid`; Pusher adds it to the payload as `uuid`. |

### Example

This example retrieves notifications on Enjin Relaychain.

<Tabs>
  <TabItem value="graphql" label="GraphQL">

```graphql
query GetPendingEvents(
  $network: Network! = ENJIN
  $chain: Chain! = MATRIX
  $limit: Int! = 100
) {
  GetPendingEvents(network: $network, chain: $chain, limit: $limit) {
    uuid
    event
    payload
  }
}
```

**Variables:**

```json
{
  "network": "ENJIN",
  "chain": "RELAY",
  "limit": 100
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"query GetPendingEvents($network: Network! = ENJIN, $chain: Chain! = MATRIX, $limit: Int! = 100) { GetPendingEvents(network: $network, chain: $chain, limit: $limit) { uuid event payload } }","variables":{"network":"ENJIN","chain":"RELAY","limit":100}}'
```

  </TabItem>
  <TabItem value="response" label="Response">

```json
{
  "data": {
    "GetPendingEvents": [
      {
        "uuid": "af078b53-701a-40a9-b0e6-2dc39f3fc47d",
        "event": "BalancesTransfer",
        "payload": {
          "chain": "RELAY",
          "network": "ENJIN",
          "publicKey": "0xa7208d10c6622f3f7eca1551de8355fde9de577dbb308d38994ace561738a51f"
        }
      },
      {
        "uuid": "7a862834-6f50-45bc-8bf0-c8231d00ec78",
        "event": "BalancesTransfer",
        "payload": {
          "chain": "RELAY",
          "network": "ENJIN",
          "publicKey": "0xa7208d10c6622f3f7eca1551de8355fde9de577dbb308d38994ace561738a51f"
        }
      }
    ]
  }
}
```

  </TabItem>
</Tabs>

These two notifications have identical payloads but different UUIDs. Treat them as separate deliveries; deduplicate by `uuid`, not by payload or event name.

### Retrieving the next batch

Reading notifications does not acknowledge them. There are no page, offset, or cursor arguments: repeated queries return the oldest pending notifications until they are acknowledged or expire. After successfully processing a batch, call [`AcknowledgeEvents`](/03-api-reference/02-mutations/09-event-inbox-mutations.md#acknowledgeevents) with its UUIDs, then query again for the next batch.

Notifications are retained for **14 days** from dispatch. Unacknowledged notifications expire and are automatically purged after that period. Event Inbox does not backfill historical events.
