---
title: "Marketplace"
slug: "marketplace"
description: "Query the Enjin API for marketplace listings."
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

The Enjin Platform marketplace exposes two read queries: `GetListing` for a single listing by id, and `GetListings` for a paginated list scoped to a collection. To act on a listing (place a bid, fill, cancel, finalize an auction, etc.) use [Marketplace Mutations](/03-api-reference/02-mutations/06-marketplace-mutations.md).

## GetListing

Returns a single listing by its `id` (the hex listing id returned when the listing was created).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetListing {
  GetListing(
    network: ENJIN
    chain: MATRIX
    id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
  ) {
    id
    seller {
      address
    }
    makeAsset {
      id
      tokenId
    }
    takeAsset {
      id
      tokenId
    }
    amount
    price
    minTakeValue
    isActive
    highestPrice
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetListing": {
      "id": "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161",
      "seller": { "address": "efRCJAEyn5Rp7SX9gvoJEAG7y1td3PZzRhpJYEeofpGVj3ouc" },
      "makeAsset": { "id": "3484-2", "tokenId": "2" },
      "takeAsset": null,
      "amount": "72",
      "price": "12000000000000000000",
      "minTakeValue": "807840000000000000000",
      "isActive": true,
      "highestPrice": "12000000000000000000"
    }
  }
}
```
  </TabItem>
</Tabs>

Field notes:

- `makeAsset` is the token being sold; `takeAsset` is the asset that fills the listing. When `takeAsset` is `null`, the listing is denominated in ENJ.
- `highestPrice` is `null` for fixed-price listings; for auctions it's the current top bid.
- `Listing.type` is part of the schema but currently returns an internal server error — omit it for now. The platform team is aware and a fix is planned. In the meantime, you can usually infer fixed-price vs. auction vs. offer from `highestPrice`/`takeAsset` shape.

## GetListings

Returns a paginated list of listings scoped to a single `collectionId`. Pagination is offset-based (`limit` + `page`). Optionally filter to specific `tokenIds`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetListings {
  GetListings(
    network: ENJIN
    chain: MATRIX
    collectionId: 3484
    limit: 15
    page: 1
  ) {
    id
    seller {
      address
    }
    makeAsset {
      tokenId
    }
    amount
    price
    isActive
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetListings": [
      {
        "id": "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161",
        "seller": { "address": "efRCJAEyn5Rp7SX9gvoJEAG7y1td3PZzRhpJYEeofpGVj3ouc" },
        "makeAsset": { "tokenId": "2" },
        "amount": "72",
        "price": "12000000000000000000",
        "isActive": true
      },
      {
        "id": "f3e76d1413e30548204dca8d0a9559dc981ce60e70b49fca4d031f7b7842a3c4",
        "seller": { "address": "efUfmhm2rcTtVr4ajneB71qbfDZ1EkyYW7xRc6fhuRh3Tg4L1" },
        "makeAsset": { "tokenId": "4" },
        "amount": "3",
        "price": "55000000000000000000",
        "isActive": true
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

### Filtering to specific token ids

```graphql
query GetListings {
  GetListings(
    network: ENJIN
    chain: MATRIX
    collectionId: 3484
    tokenIds: [2, 4]
    limit: 15
    page: 1
  ) {
    id
    price
  }
}
```
