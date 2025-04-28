---
title: "Marketplace Pallet"
slug: "marketplace-pallet"
description: "Create secure peer-to-peer economies."
---
:::info The Enjin Blockchain Console
Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.
:::

## Overview

The marketplace is used for trading assets on `pallet-multi-tokens`.

## Terminology

### Listing

Represents an asset being put up for sale. It contains additional information that determines the behavior of the sale.

### Auction

A listing with an end time that accepts bids.

### Offer

A listing that is a request to buy an asset.

### Royalty

A percentage of a sale is given to an account when an asset is sold.

### Salt

Bytes used to differentiate listings that have the same values.

### Make Asset

The asset being sold.  
When creating an offer, it's the asset being requested.

### Take Asset

The asset requested.  
When creating an offer, it's the asset being bought.

### Fee side

The side that is charged the protocol fee (the make or take side).

### Currency

This concept is used by the marketplace to determine what assets are allowed to be listed, and which side of the listing is charged fees.

## Config Values

- `maxRoundingError: Balance = 1000`
  - The max amount that can be lost due to rounding before failing.
- `maxSaltLength: u32 = 32`
  - Max length of salt used in listings and bids
- `minimumBidIncreasePercentage: Perbill = 5%`
  - The percentage of the minimum bid in an auction must increase by.
- `listingActiveDelay: BlockNumber = 5`
  - The minimum number of blocks that must pass before a listing is active.

## Types

- `ListingId = H256 ([u8;32])`
- AssetId - a `CollectionId` and `TokenId`

See pallet-multi-tokens for additional types, including `CollectionId`, `TokenId`, and `Balance`.

## Listings

Listings are created with the `create_listing` extrinsic. There are three types of listings:

- Fixed Price listings allow assets to be purchased for a specific price and have no time limit. Assets are purchased using the `fill_lisitng` extrinsic. Partial fills are supported.
- Timed Auctions operate like an auction. The listing is created with an initial bid price and a time limit. Bids are placed with the `place_bid` extrinsic and must start at the initial price or more, and then each bid must increase by a fixed percentage (currently 5%). When the time limit is over, the `finalize_auction` must be called to officially end the auction and transfer the funds.
- Offer listings are created by the buyer. Seller may accept the offer using the `fill_lisitng` extrinsic. The seller and the buyer may counter offer using the `placeCounterOffer` extrinsic, in which case they can accept / reject / counter offer using the `AnswerCounterOffer` extrinsic.

## Protocol Fee

A protocol fee (currently 2.5%) is taken from all sales.

## Royalties

Royalties are currently limited to between 0.1% and 50%. If a royalty is changed after an asset is listed and the seller would get less than they expect, the sale does not go through. This is stored in the `minimum_take_value` field of the listing.

A collection can only allow certain currencies to be accepted as royalties by adding them to its `explicit_royalty_currencies` field. If a listing is created that will pay royalties in an unaccepted currency, the listing creation will fail.

## Fee Side

The fee side determines which side of the listing, the make side or take side, will be charged the protocol fee. The royalty is determined by the opposite side of the fee side, and it is paid in the currency of the fee side.

The fee side is determined with the following checks:

1. If the make side is a currency, it pays the fee.
2. If the make side is not a currency, but the take side is a currency, the take side pays the fee.
3. If neither side is a currency, there is no fee. However, this is not currently allowed, and the listing cannot be created.

## State

Stores information about the marketplace.

`listings`

- Key: `ListingId` - The id of the listing
- Value: Listing
- Stores all listings.

`listingIdsByMakeAsset`

- Key: (`CollectionId`, `TokenId`) - The collection id and token id of the make asset.
- Value: `ListingId `- The id of the listing
- Allows querying listings by make asset.

`listingIdsByTakeAsset`

- Key: (`CollectionId`, `TokenId`) - The collection id and token id of the take asset.
- Value: `ListingId `- The id of the listing
- Allows querying listings by take asset.

`listingIdsByAccountId`

- Key: `AccountId `- The account id of the seller
- Value: `ListingId `- The id of the listing
- Allows querying listings by the seller.

## Extrinsics

`create_listing` - Places a sell / auction / offer order.

The listing does not become active until after the `listingActiveDelay` (5 blocks) has passed. If it's an auction, it starts when its `start_block` is reached.

A Token cannot be listed on the marketplace if its listing_forbidden field is set to true.

**`cancel_listing`** - Cancels the listing. Only callable by the seller.

**`fill_listing`** - Fills a fixed price listing. This will execute immediately.

**`place_bid`** - Places a bid on a listing. The listing must be an auction, and it must be currently active. An auction is considered active if the current block is between the start and end blocks of the auction.

Only the latest bid is stored on an auction. All bids must increase by the `minimumBidIncreasePercentage`, and the first bid must be higher than the price set when the listing was created.

**`finalize_auction`** - This will end the auction and transfer funds. It fails if the auction is not over. It can be called by anyone.

**`place_counter_offer`** - Creates a Counter offer to an existing offer listing. Can only be called by an account that owns the token.

**`answer_counter_offer`** - Either accept, reject, or counter a counter offer. Callable by the offer creator (buyer) and the counter offer creator (seller).  
When a counter offer is successfully accepted/rejected, it is removed from storage.

**`set_protocol_fee`** - Change the protocol fee. Can only be called by the `ProtocolFeeOrigin` set in the config.
