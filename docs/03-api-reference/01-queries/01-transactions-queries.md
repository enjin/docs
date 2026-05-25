---
title: "Transactions"
slug: "transactions"
description: "Query the Enjin API for transactions, blocks, and extrinsics."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

Use these queries to look up the state of transactions you've submitted (`GetTransaction` / `GetTransactions`) and to read the underlying blocks and extrinsics they ended up in (`GetBlock` / `GetBlocks`, `GetExtrinsic` / `GetExtrinsics`).

## GetTransaction

Returns a single transaction by `uuid`, `idempotencyKey`, or `extrinsicHash` — pass exactly one. The most common use is to look up the live state of a transaction you submitted via [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransaction {
  GetTransaction(
    network: ENJIN
    chain: MATRIX
    uuid: "a90ded41-4262-40a2-95c0-98255b660bf1"
  ) {
    uuid
    idempotencyKey
    action
    state
    encodedData
    extrinsicHash
    createdAt
    updatedAt
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "idempotencyKey": "61f0b8e1-e0b9-4ecd-b445-84dc4cd2b495",
      "action": "MultiTokens.create_collection",
      "state": "FINALIZED",
      "encodedData": "0x280dc56f04985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050...",
      "extrinsicHash": "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f",
      "createdAt": "2026-05-13T05:20:52+00:00",
      "updatedAt": "2026-05-13T05:21:26+00:00"
    }
  }
}
```
  </TabItem>
</Tabs>

See [the state argument](/03-api-reference/04-important-arguments.md#state) for the full list of transaction states.

## GetTransactions

Returns a paginated list of transactions. Pagination is cursor-based — pass the previous response's `nextCursor` to fetch the next page. You can filter by `uuids`, `idempotencyKeys`, or `extrinsicHashes`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTransactions {
  GetTransactions(
    network: ENJIN
    chain: MATRIX
    limit: 15
  ) {
    data {
      uuid
      action
      state
      extrinsicHash
      createdAt
    }
    perPage
    nextCursor
    previousCursor
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTransactions": {
      "data": [
        {
          "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
          "action": "MultiTokens.create_collection",
          "state": "FINALIZED",
          "extrinsicHash": "0xbafe459e...",
          "createdAt": "2026-05-13T05:20:52+00:00"
        },
        {
          "uuid": "b80aed52-3171-50b3-a4d0-87366b771b02",
          "action": "MultiTokens.mint",
          "state": "BROADCAST",
          "extrinsicHash": "0x12ab34cd...",
          "createdAt": "2026-05-13T05:24:11+00:00"
        }
      ],
      "perPage": 15,
      "nextCursor": "eyJpZCI6MTUwfQ==",
      "previousCursor": null
    }
  }
}
```
  </TabItem>
</Tabs>

## GetBlock

Returns a single block by `id` (block number) or `hash`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetBlock {
  GetBlock(
    network: ENJIN
    chain: MATRIX
    id: 402865
  ) {
    number
    hash
    validator {
      address
    }
    createdAt
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetBlock": {
      "number": 402865,
      "hash": "0xf0b3cee1c36a99e24aaef7da06aec2ecd79a599c19ad4ae6fb4b40b3e497a322",
      "validator": { "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y" },
      "createdAt": "2026-05-13T05:20:48+00:00"
    }
  }
}
```
  </TabItem>
</Tabs>

:::warning GetBlock is currently unavailable
`GetBlock` is temporarily disabled — every call returns an `Internal server error`. For event-level lookups use the [Transactions page on the platform dashboard](https://platform.beta.enjin.io/transactions) and click the **Extrinsic Hash** link on a transaction's row, which opens its events on Subscan. The platform team is aware of the issue and a fix is planned.
:::

## GetBlocks

Returns a list of blocks. Filter by `ids` (block numbers) or `hashes`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetBlocks {
  GetBlocks(
    network: ENJIN
    chain: MATRIX
    ids: [402865, 402866]
  ) {
    number
    hash
    createdAt
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetBlocks": [
      {
        "number": 402865,
        "hash": "0xf0b3cee1c36a99e24aaef7da06aec2ecd79a599c19ad4ae6fb4b40b3e497a322",
        "createdAt": "2026-05-13T05:20:48+00:00"
      },
      {
        "number": 402866,
        "hash": "0xa1b2c3d4e5...",
        "createdAt": "2026-05-13T05:20:54+00:00"
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

:::warning Block.extrinsics and Block.events return null
The `extrinsics` and `events` sub-fields on `Block` are defined in the schema but currently return `null` on every request. For now, use the [Transactions dashboard](https://platform.beta.enjin.io/transactions) → **Extrinsic Hash** → Subscan flow for event-level data.
:::

## GetExtrinsic

Returns a single extrinsic by `hash`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetExtrinsic {
  GetExtrinsic(
    network: ENJIN
    chain: MATRIX
    hash: "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f"
  ) {
    id
    hash
    pallet
    method
    success
    nonce
    signer {
      address
    }
    block {
      number
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetExtrinsic": {
      "id": "402865-2",
      "hash": "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f",
      "pallet": "MultiTokens",
      "method": "mint",
      "success": true,
      "nonce": 132,
      "signer": { "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y" },
      "block": { "number": 402865 }
    }
  }
}
```
  </TabItem>
</Tabs>

:::warning GetExtrinsic and GetExtrinsics are currently unavailable
Both queries are temporarily disabled and return `Internal server error`. Use the Subscan workaround described above until the platform fix lands.
:::

## GetExtrinsics

Returns a list of extrinsics by `hashes`. Same temporary outage as `GetExtrinsic`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetExtrinsics {
  GetExtrinsics(
    network: ENJIN
    chain: MATRIX
    hashes: [
      "0xbafe459e8248b802f3aef98d2e4a695bbb238899edf40519b082366e3ff8b98f"
      "0x12ab34cd56ef78ab90cd12ef34ab56cd78ef90ab12cd34ef56ab78cd90ef12ab"
    ]
  ) {
    hash
    pallet
    method
    success
  }
}
```
  </TabItem>
</Tabs>
