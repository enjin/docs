---
title: "WebSocket Events"
slug: "websocket-events"
description: "Real-time event streaming via the Enjin Platform — planned, not yet available."
---

:::warning Coming soon
Real-time event streaming is **planned** for the Enjin Platform but is **not yet available**. The exact API shape (subscription endpoint, channel structure, event payload) hasn't been finalized — this page will be filled in with the full reference once support ships.
:::

When it ships, this page will document how to subscribe to real-time events emitted by the platform. Typical use cases include:

- **Reading IDs that the chain assigns at execution time** — for example, picking up the new `listing_id` the moment a `createListing` transaction is finalized, or the new `collection_id` after a `createCollection`, without having to poll.
- **Reacting to incoming token activity in real time** — unlocking an in-game item the instant a transfer to the player's wallet finalizes, or refreshing a marketplace UI the moment a bid lands on an active auction.
- **Driving transaction state UI without polling** — flipping a "Pending → Broadcast → Finalized" indicator off the platform's own state changes.

## Until then

- **Transaction state** — poll [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) until `state` becomes `FINALIZED`.
- **On-chain events emitted by a transaction** (the new collection ID after `createCollection`, the listing ID after `createListing`, etc.) — read them from the same `GetTransaction` response via `extrinsic { events }`. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for the full flow and payload examples.

Everything an event stream would push is already readable by polling — this page only concerns the delivery mechanism.
