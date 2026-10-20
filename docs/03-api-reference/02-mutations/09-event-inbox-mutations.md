---
title: "Event Inbox"
slug: "event-inbox"
description: "Acknowledge processed Enjin Platform notifications with AcknowledgeEvents."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

Use Event Inbox acknowledgments after successfully processing notifications received through [`GetPendingEvents`](/03-api-reference/01-queries/09-event-inbox-queries.md#getpendingevents) or the corresponding Pusher subscription. Authenticate with your Enjin Platform API token.

## AcknowledgeEvents

Marks the authenticated user's pending notifications as acknowledged, removing them from subsequent `GetPendingEvents` results.

```graphql
AcknowledgeEvents(uuids: [ID!]!): Int!
```

| Argument | Type | Description |
| --- | --- | --- |
| `uuids` | `[ID!]!` | Between `1` and `100` distinct, valid delivery UUIDs. Use the top-level `uuid` from an inbox entry or the `uuid` in the corresponding Pusher notification's payload. |

This mutation is **network- and chain-agnostic**. It accepts UUIDs from multiple networks and chains in one request and takes no `network` or `chain` argument.

### Example

<Tabs>
  <TabItem value="graphql" label="GraphQL">

```graphql
mutation AcknowledgeEvents($uuids: [ID!]!) {
  AcknowledgeEvents(uuids: $uuids)
}
```

**Variables:**

```json
{
  "uuids": [
    "af078b53-701a-40a9-b0e6-2dc39f3fc47d",
    "7a862834-6f50-45bc-8bf0-c8231d00ec78"
  ]
}
```

  </TabItem>
  <TabItem value="curl" label="cURL">

```bash
curl --location 'https://platform.enjin.io/graphql' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer <YOUR_API_TOKEN>' \
-d '{"query":"mutation AcknowledgeEvents($uuids: [ID!]!) { AcknowledgeEvents(uuids: $uuids) }","variables":{"uuids":["af078b53-701a-40a9-b0e6-2dc39f3fc47d","7a862834-6f50-45bc-8bf0-c8231d00ec78"]}}'
```

  </TabItem>
  <TabItem value="response" label="Response">

```json
{
  "data": {
    "AcknowledgeEvents": 2
  }
}
```

  </TabItem>
</Tabs>

### Return value and retries

The integer result counts only notifications that changed from unacknowledged to acknowledged in this request. Repeating the example after both notifications have been acknowledged returns `0`.

Unknown, expired, already acknowledged UUIDs, and UUIDs belonging to another user do not contribute to the count. A count smaller than the number submitted is therefore possible. Invalid UUIDs, duplicate UUIDs within one request, an empty list, or more than 100 UUIDs fail validation.

Acknowledgment is safe to retry if a request fails or its response is lost. Deduplicate UUIDs within each batch, and send only those whose processing has completed successfully. If only part of a batch succeeds, acknowledge that subset and leave failed notifications pending for retry.

:::tip Acknowledge to advance
`GetPendingEvents` has no pagination. Acknowledge processed notifications so the next query can return later pending notifications. Receiving a WebSocket message or reading an inbox entry does not acknowledge it automatically.
:::

See [Working with Events](/05-enjin-platform/03-working-with-events.md#event-inbox) for polling, reconnect recovery, and deduplication guidance.
