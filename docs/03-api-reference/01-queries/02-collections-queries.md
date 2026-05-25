---
title: "Collections"
slug: "collections"
description: "Query the Enjin API for collections: metadata, policies, token groups, and pending transfers."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

`Collection` is the parent resource for a set of related tokens. A collection carries its mint, market, and transfer policies, its on-chain attributes, and any token groups defined within it. Individual tokens within a collection are read separately via [`GetTokens`](/03-api-reference/01-queries/03-tokens-queries.md#gettokens).

## GetCollection

Returns a single collection by id.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetCollection {
  GetCollection(network: ENJIN, chain: MATRIX, id: 3484) {
    id
    owner {
      address
    }
    attributes {
      key
      value
    }
    metadata {
      name
      description
    }
    mintPolicy {
      forceCollapsingSupply
      maxTokenCount
      maxTokenSupply
    }
    marketPolicy {
      beneficiaries {
        accountId
        percentage
      }
    }
    transferPolicy {
      isFrozen
    }
    pendingTransfer {
      address
    }
    tokenGroups {
      id
      metadata {
        name
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetCollection": {
      "id": "3484",
      "owner": {
        "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
      },
      "attributes": [],
      "metadata": {
        "name": "Multiverse Brotherhood",
        "description": null
      },
      "mintPolicy": {
        "forceCollapsingSupply": false,
        "maxTokenCount": null,
        "maxTokenSupply": null
      },
      "marketPolicy": {
        "beneficiaries": []
      },
      "transferPolicy": {
        "isFrozen": false
      },
      "pendingTransfer": null,
      "tokenGroups": [
        { "id": "60", "metadata": { "name": "[MvB] Clan Tag" } },
        { "id": "63", "metadata": { "name": "Multiverse Brotherhood ©" } }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

`pendingTransfer` is non-null while a transfer is in progress — see [`GetPendingCollectionTransfers`](#getpendingcollectiontransfers).

## GetCollections

Returns a flat list of collections. Pass `ids` to fetch specific collections, or `address` to fetch collections owned by an address (or both to intersect).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetCollections {
  GetCollections(
    network: ENJIN
    chain: MATRIX
    ids: [3484, 7153]
  ) {
    id
    owner {
      address
    }
    metadata {
      name
    }
    mintPolicy {
      forceCollapsingSupply
      maxTokenCount
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetCollections": [
      {
        "id": "3484",
        "owner": { "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y" },
        "metadata": { "name": "Multiverse Brotherhood" },
        "mintPolicy": { "forceCollapsingSupply": false, "maxTokenCount": null }
      },
      {
        "id": "7153",
        "owner": { "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B" },
        "metadata": { "name": "Test Collection" },
        "mintPolicy": { "forceCollapsingSupply": false, "maxTokenCount": 100 }
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

## GetPendingCollectionTransfers

Returns collections that have a pending ownership transfer — the `owner` field on `mutateCollection` was set to a new address, but the recipient hasn't called `acceptCollectionTransfer` yet (and the current owner hasn't called `cancelCollectionTransfer`).

You can filter by `ids` (specific collections) or `address` (collections being transferred *to* this address).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetPendingCollectionTransfers {
  GetPendingCollectionTransfers(
    network: ENJIN
    chain: MATRIX
    address: "efRecipientWalletAddress"
  ) {
    id
    owner {
      address
    }
    pendingTransfer {
      address
    }
    metadata {
      name
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetPendingCollectionTransfers": [
      {
        "id": "12345",
        "owner": { "address": "efOriginalOwnerAddress" },
        "pendingTransfer": { "address": "efRecipientWalletAddress" },
        "metadata": { "name": "Hand-off Collection" }
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

See the [Transfer a Collection](/02-guides/01-platform/01-managing-tokens/010-transfer-accept-collection.md) guide for the full transfer / accept / cancel flow.
