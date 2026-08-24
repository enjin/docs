---
title: "Marketplace"
slug: "marketplace"
description: "Create, fill, cancel, finalize, bid, counter-offer, and whitelist marketplace listings via CreateTransaction."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

All marketplace actions are submitted through [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction), with the action selected by the field set on the `transaction` input. The response shape is always a `Transaction` — the examples below all return the standard `{ uuid, action, state }` selection.

To read listings, see [Marketplace Queries](/03-api-reference/01-queries/06-marketplace-queries.md).

## createListing

Creates a new listing on the marketplace. Three listing types are supported via `listingData.type`:

- **`FIXED_PRICE`** — sell `amount` of `makeAssetId` for `price` of `takeAssetId`.
- **`AUCTION`** — same shape, but buyers place bids via [`placeBid`](#placebid); the auction ends at `endBlock`.
- **`OFFER`** — a *buy* offer: the seller of `takeAssetId` decides whether to fill.

Set `takeAssetId` to ENJ by passing `{ collectionId: 0, tokenId: 0 }`. Set `usesWhitelist: true` to restrict who can fill / bid; manage the whitelist with [`addWhitelistedAccounts`](#addwhitelistedaccounts) / [`removeWhitelistedAccounts`](#removewhitelistedaccounts).

<Tabs>
  <TabItem value="fixed" label="Fixed-price">
```graphql
mutation CreateFixedListing {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createListing: {
        makeAssetId: { collectionId: 91829, tokenId: 1 }
        takeAssetId: { collectionId: 0,     tokenId: 0 }     # ENJ
        amount: 1
        price: 10000000000000000000                          # 10 ENJ
        usesWhitelist: false
        listingData: { type: FIXED_PRICE }
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
  <TabItem value="auction" label="Auction">
```graphql
mutation CreateAuctionListing {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createListing: {
        makeAssetId: { collectionId: 91829, tokenId: 1 }
        takeAssetId: { collectionId: 0,     tokenId: 0 }
        amount: 1
        price: 5000000000000000000                          # 5 ENJ reserve
        usesWhitelist: false
        listingData: {
          type: AUCTION
          startBlock: 3818000
          endBlock: 3820000
        }
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
  <TabItem value="offer" label="Offer (buy)">
```graphql
mutation CreateOfferListing {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createListing: {
        makeAssetId: { collectionId: 0,     tokenId: 0 }     # paying with ENJ
        takeAssetId: { collectionId: 91829, tokenId: 1 }     # asking for this token
        amount: 1
        price: 5000000000000000000
        usesWhitelist: false
        listingData: {
          type: OFFER
          expiration: 100000000
        }
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
      "action": "Marketplace.create_listing",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

Once the transaction finalizes, a `Marketplace.ListingCreated` event is emitted containing the new listing's id (a hex string assigned by the chain). See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read it, or look the listing up after the fact via [`GetListings`](/03-api-reference/01-queries/06-marketplace-queries.md#getlistings).

## fillListing

Buys (or sells, for an offer listing) `amount` of a `FIXED_PRICE` / `OFFER` listing.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FillListing {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      fillListing: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        amount: 1
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

## placeBid

Place a bid on an `AUCTION` listing. The bid must be at least the current `highestPrice + minimum increment` (or the reserve `price` for the first bid).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation PlaceBid {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      placeBid: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        price: 12000000000000000000   # 12 ENJ
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

## finalizeAuction

Closes an auction past its `endBlock`, transferring the asset to the highest bidder and the bid to the seller. Anyone can call this.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FinalizeAuction {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      finalizeAuction: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
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

## cancelListing

Cancels an active listing. The signer must be the listing's seller.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CancelListing {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      cancelListing: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
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

## placeCounterOffer

On an `OFFER` listing, place a counter-offer with a different `price`. The original listing creator can then [accept, reject, or counter again](#answercounteroffer).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation PlaceCounterOffer {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      placeCounterOffer: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        price: 6000000000000000000
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

## answerCounterOffer

Respond to a counter-offer placed via `placeCounterOffer`. `response` is one of:

- `ACCEPT` — fill the listing at the counter-offered price.
- `REJECT` — decline the counter-offer.
- `COUNTER` — make a new counter-offer at `counterPrice`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AnswerCounterOffer {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      answerCounterOffer: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        creator: "efCounterOfferer"
        response: COUNTER
        counterPrice: 5500000000000000000
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

## addWhitelistedAccounts

Add accounts (with optional per-account `allowance`) to a whitelist-restricted listing.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AddWhitelistedAccounts {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      addWhitelistedAccounts: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        accounts: [
          { address: "efAllowedBuyer1", allowance: 5 }
          { address: "efAllowedBuyer2" }
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

## removeWhitelistedAccounts

Remove accounts from a whitelist-restricted listing.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveWhitelistedAccounts {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeWhitelistedAccounts: {
        id: "8bd40957579f61b8a04ddaf7c86fbd51329e88f5ec735e910a320169377db161"
        addresses: [
          "efRevokedBuyer1"
          "efRevokedBuyer2"
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
