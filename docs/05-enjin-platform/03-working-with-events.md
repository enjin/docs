---
title: "Working with Events"
slug: "working-with-events"
description: "How to read on-chain events emitted by transactions on the Enjin Platform."
---

In the blockchain ecosystem, "events" are the on-chain log entries emitted by extrinsics — they're how the chain reports what actually happened: token transfers, collection creation, marketplace listing IDs, balance changes, and so on. Monitoring them is essential for any application that needs to react to state changes — for example, unlocking an in-game item the moment the user receives the corresponding NFT.

:::warning Coming soon
Reading the on-chain events emitted by a transaction through the Enjin Platform API is **planned** but **not yet available**. An `events` field will be added to the `Transaction` type so you'll be able to read them alongside `state`, `extrinsicHash`, etc. The exact shape isn't finalized — this page will be updated with response examples once support ships.

Real-time push-based event streaming is also planned — see [WebSocket Events](/03-api-reference/03-websocket-events.md).
:::

## Reading events today

Until the `Transaction.events` field ships, the workflow is:

1. **Poll for finalization.** Call [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) until `state` is `FINALIZED`. The response also exposes `extrinsicHash` once the transaction has been broadcast.
2. **Read the events on Subscan.** Open the transaction by its `extrinsicHash` on the [Enjin Matrixchain Subscan explorer](https://matrix.subscan.io/). The **Events** tab there lists every event the extrinsic emitted, including IDs you'll commonly need (new `collection_id`, `token_id`, `listing_id`, etc.).

The Enjin dashboard makes this one click — open the [Transactions page](https://platform.enjin.io/transactions), find your transaction, and click its **Extrinsic Hash** link to jump straight to the Subscan event view.

:::note Address formats in event payloads
On-chain events represent account addresses as **hex public keys**, not the SS58-encoded `ef…` / `cx…` strings shown in most platform UIs. Use Subscan's [Account Format Transform tool](https://matrix.subscan.io/tools/format_transform) to convert between the two.
:::
