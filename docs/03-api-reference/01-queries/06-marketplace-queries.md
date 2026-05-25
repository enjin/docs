---
title: "Marketplace"
slug: "marketplace"
description: "Query the Enjin API for marketplace listings."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
    id: "2cabb4256b0806c68e53104769e3ba7382b6f10e37df7bceb74a6119f601bf3d"
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
      "id": "2cabb4256b0806c68e53104769e3ba7382b6f10e37df7bceb74a6119f601bf3d",
      "seller": { "address": "efS3yL43XUmqwU2ovUZjjdzfo4eQk5dR7pbUf4dUFxPxqKh2V" },
      "makeAsset": { "id": "2967-106338239662793367710728619925308440576", "tokenId": "106338239662793367710728619925308440576" },
      "takeAsset": null,
      "amount": "2",
      "price": "620000000000000000000",
      "minTakeValue": "1209000000000000000000",
      "isActive": true,
      "highestPrice": "620000000000000000000"
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
    collectionId: 2967
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
        "id": "2cabb4256b0806c68e53104769e3ba7382b6f10e37df7bceb74a6119f601bf3d",
        "seller": { "address": "efS3yL43XUmqwU2ovUZjjdzfo4eQk5dR7pbUf4dUFxPxqKh2V" },
        "makeAsset": { "tokenId": "106338239662793367710728619925308440576" },
        "amount": "2",
        "price": "620000000000000000000",
        "isActive": true
      },
      {
        "id": "41fbe28706d544a1afc39d894723d98d8e7922a6be77a8545af23ec2fb998341",
        "seller": { "address": "efTwg56JrsGcDomiouuTfPybQuRNYX53XBHe6JrgxMvdDtkFw" },
        "makeAsset": { "tokenId": "107002853660685728525072975374659359309" },
        "amount": "1",
        "price": "77000000000000000000",
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
    collectionId: 2967
    tokenIds: [106338239662793367710728619925308440576, 107002853660685728525072975374659359309]
    limit: 15
    page: 1
  ) {
    id
    price
  }
}
```
