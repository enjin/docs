---
title: "Collections"
slug: "collections"
description: "Create, mutate, freeze, transfer, and destroy on-chain collections via CreateTransaction."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

All collection-level actions are submitted through [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction), with the action selected by the field set on the `transaction` input. Each section below shows the discriminator and its expected fields.

The response shape is always a `Transaction` — the examples below all return the standard `{ uuid, action, state }` selection. Once a transaction reaches `FINALIZED`, the on-chain event(s) it emitted can be read via the flow described in [Working with Events](/05-enjin-platform/03-working-with-events.md).

## createCollection

Creates a new on-chain collection. Most fields are optional — the example below shows everything; a minimal call is just `transaction: { createCollection: {} }`.

The new collection's `id` is assigned by the chain — once the transaction finalizes, a `MultiTokens.CollectionCreated` event is emitted containing it.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollection {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createCollection: {
        forceCollapsingSupply: false
        maxTokenCount: 1000
        maxTokenSupply: 100
        royalties: [
          { address: "efRoyaltyBeneficiary", percentage: 5.0 }
        ]
        attributes: [
          { key: "name", value: "The Multiverse" }
          { key: "uri",  value: "https://example.com/metadata/collection.json" }
        ]
        explicitRoyaltyCurrencies: [
          { collectionId: 0, tokenId: 0 }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "action": "MultiTokens.create_collection",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

## mutateCollection

Updates a collection's mutable fields — owner, royalties, royalty-currency whitelist, and attributes.

Setting `owner` initiates an ownership transfer: the collection enters a pending state until the new owner calls [`acceptCollectionTransfer`](#acceptcollectiontransfer) (or the current owner calls [`cancelCollectionTransfer`](#cancelcollectiontransfer) to abort).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MutateCollection {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mutateCollection: {
        collectionId: 10943
        royalties: [
          { address: "efNewBeneficiaryAddress", percentage: 7.5 }
        ]
        attributes: [
          { key: "description", value: "Updated description" }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "f02b8fef-8c0e-4f3f-9430-1cf6c2c20a23",
      "action": "MultiTokens.mutate_collection",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

## acceptCollectionTransfer

Called by the recipient of a pending collection transfer (set up via `mutateCollection.owner`) to complete the transfer.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AcceptCollectionTransfer {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      acceptCollectionTransfer: { id: 10943 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## cancelCollectionTransfer

Called by the current owner before a pending collection transfer is accepted, to abort it.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CancelCollectionTransfer {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      cancelCollectionTransfer: { id: 10943 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## destroyCollection

Permanently destroys a collection. The collection must be empty (no tokens) and the deposit is returned to the owner.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyCollection {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      destroyCollection: { id: 10942 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## freezeCollection / thawCollection

Freeze or thaw an entire collection — while frozen, no tokens in the collection can be transferred, listed, or otherwise mutated.

<Tabs>
  <TabItem value="freeze" label="freezeCollection">
```graphql
mutation FreezeCollection {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      freezeCollection: { collectionId: 10943 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="thaw" label="thawCollection">
```graphql
mutation ThawCollection {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      thawCollection: { collectionId: 10943 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

To freeze or thaw an individual token within a collection, use `freezeToken` / `thawToken` — see [Tokens Mutations](/03-api-reference/02-mutations/03-tokens-mutations.md).

## setCollectionAttribute

Set or update a single key/value attribute on a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetCollectionAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      setCollectionAttribute: {
        collectionId: 4741
        key: "test"
        value: "Hello"
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## batchSetCollectionAttribute

Set multiple attributes on a collection in a single transaction. The collection id field is named `id` here (not `collectionId`).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSetCollectionAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      batchSetCollectionAttribute: {
        id: 4741
        attributes: [
          { key: "name",        value: "My Collection" }
          { key: "description", value: "A great collection" }
          { key: "uri",         value: "https://example.com/metadata/collection.json" }
        ]
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## removeCollectionAttribute

Remove a single attribute from a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveCollectionAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeCollectionAttribute: {
        id: 4741
        key: "name"
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

## removeAllCollectionAttributes

Remove every attribute from a collection in one transaction.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveAllCollectionAttributes {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeAllCollectionAttributes: { id: 4741 }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>
