---
title: "Marketplace"
slug: "marketplace"
description: "Use the Enjin API to perform marketplace mutations, including creating and modifying token listings, managing trades, and marketplace transactions."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Marketplace Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql/marketplace`
- **Mainnet:** `http://platform.enjin.io/graphql/marketplace`
:::

This is a detailed reference guide that explains the most commonly used operations.

## CreateListing

The `CreateListing` mutation is used to initiate the process of placing a buy or a sell order on a marketplace. This mutation is essential for sellers who want to list their assets for sale in the marketplace, or buyers who wants to purchase a token. Buy orders are Offers, and sell orders are either Fixed Listings or Auction Listings.

### Use Case:

The `CreateListing` mutation is a fundamental operation in a marketplace. It allows you, as a seller, to list your assets for sale on the platform, and as a buyer, to create a buy offer. Here's how you can use it:

1. **Asset Details**: Specify the asset you want to buy/sell and the asset you want to receive in exchange.  
   When creating a sell order, specify the asset you want to sell in the `makeAssetId` parameter, and the asset you want to receive in exchange in the `takeAssetId` parameter.  
   When creating a buy order, specify the asset you want to buy in the `takeAssetId` parameter, and the asset you want to pay with in the `makeAssetId` parameter.

:::info
For ENJ tokens, use `collectionId: 0` and `tokenId: {integer: 0}`
:::

2. **Quantity and Price**: Set the quantity (`amount`) and the price (`price`) at which you are willing to buy/sell the asset.
3. **Uniqueness**: Include a random string (`salt`) to ensure the uniqueness of your listing order.
4. **start/end block (Optional)**: If you are conducting an auction, you can specify the start and end blocks for the auction (`auctionParams`).  
   If you are conducting an offer, you can specify the end block for the auction (`offerParams`).
5. **Response**: After successfully creating the listing, you will receive a response with details about the new listing, including its ID, state, and other relevant information.

This mutation is essential for both buyers and sellers to participate in the marketplace, list their assets and offers, and potentially initiate sales or auctions. It forms the basis for trading assets within the platform.

### Create Fixed Listing

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateOffer{
  CreateListing(
    makeAssetId: {
      collectionId: 91829
      tokenId: {integer: 1}
    }
    takeAssetId: {
      collectionId: 0
      tokenId: {integer: 0}
    }
    amount: 1
    price: 10000000000000000000
    salt: "random string"
    listingData: {
      type: FIXED_PRICE
    }
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateListing": {
      "id": 386427,
      "method": "CreateListing",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

### Create Auction Listing

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateOffer{
  CreateListing(
    makeAssetId: {
      collectionId: 91829
      tokenId: {integer: 1}
    }
    takeAssetId: {
      collectionId: 0
      tokenId: {integer: 0}
    }
    amount: 1
    price: 5000000000000000000
    salt: "random string"
    listingData: {
      type: AUCTION
      auctionParams: {
        startBlock: 3818000
        endBlock: 1000000000
      }
    }
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateListing": {
      "id": 386422,
      "method": "CreateListing",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

### Create Offer Listing

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateOffer{
  CreateListing(
    makeAssetId: {
      collectionId: 0
      tokenId: {integer: 0}
    }
    takeAssetId: {
      collectionId: 91829
      tokenId: {integer: 1}
    }
    amount: 1
    price: 5000000000000000000
    salt: "random string"
    listingData: {
      type: OFFER
      offerParams: {
        expiration: 100000000
      }
    }
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateListing": {
      "id": 386394,
      "method": "CreateListing",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

## FillListing

The `FillListing` mutation is used to finalize the purchase of an asset listed at a fixed price on a marketplace, as well as offers. It enables buyers to accept the terms of a listing and execute the transaction to acquire the asset they desire and enables sellers to accept an offer.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FillListing {
  FillListing(listingId: "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20", amount: 1) {
    id
    transactionId
    transactionHash
    state
    encodedData
    method
    wallet {
      account {
        publicKey
        address
      }
    }
    idempotencyKey
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "FillListing": {
      "id": 11297,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3202101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f2004",
      "method": "FillListing",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "0f4eb316-cf7f-4561-a2d6-112abf08d323"
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `FillListing` mutation is a critical operation for buyers in a marketplace. Here's how you can use it:

1. **Select Listing**: You specify the unique `listingId` of the listing you want to fill, indicating the asset you wish to purchase.

2. **Quantity**: Determine the `amount` of the asset you want to buy. Ensure that this quantity matches the available quantity in the listing if it's a fixed price sale.

3. **Transaction Submission**: Execute the mutation, triggering the transaction. The response will provide transaction details, including the initial state as "PENDING."

4. **Transaction Processing**: The network processes the transaction, and eventually, the `transactionId` and `transactionHash` fields in the response will be updated with the respective values once confirmed.

5. **Completion**: The successful execution of the `FillListing` mutation indicates that you have committed to the purchase, and the asset will be transferred to your wallet upon transaction confirmation.

6. **Accepting Offers**: The mutation is also used by seller to accept a buy offer and sell the asset to the buyer.

This mutation is essential for buyers to participate in the marketplace, finalize purchases, and take ownership of assets. It facilitates the transfer of both digital assets and funds between parties on the blockchain, ensuring a seamless and secure transaction process.

## FinalizeAuction

The `FinalizeAuction` mutation is used to complete the auction process for a specific asset listed in a marketplace. This operation is crucial for officially closing the auction and transferring the asset to the highest bidder, typically after the auction has ended.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation FinalizeAuction {
  FinalizeAuction(listingId: "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20") {
    id
    transactionId
    transactionHash
    state
    encodedData
    method
    wallet {
      account {
        publicKey
        address
      }
    }
    idempotencyKey
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "FinalizeAuction": {
      "id": 11298,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3204101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20",
      "method": "FinalizeAuction",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "0deaaad8-f6a0-4ef5-b8f1-fadd1ecb8ac5"
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `FinalizeAuction` mutation in scenarios where you have conducted an auction-based listing and need to complete the auction process. This includes:
  - Officially transferring the auctioned asset to the winning bidder.
  - Ensuring that the funds are allocated as per the auction terms.
  - Providing finality to the auction and enforcing the bid commitments.

It's important to note that `FinalizeAuction` is specific to auction listings and is used after the auction has ended. This mutation represents the final step in the auction process, marking the asset as officially won by the highest bidder and concluding the transaction.

## CancelListing

The `CancelListing` mutation in used to cancel a listing on the Enjin Blockchain marketplace. This operation is typically performed by the seller or the system administrator and is used to remove an asset from a marketplace listing.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CancelListing {
  CancelListing(listingId: "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20") {
    id
    transactionId
    transactionHash
    state
    encodedData
    method
    wallet {
      account {
        publicKey
        address
      }
    }
    idempotencyKey
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CancelListing": {
      "id": 11295,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3201101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20",
      "method": "CancelListing",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "bfdb8fe9-3d93-4322-bf16-077c9566050d"
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `CancelListing` mutation when you want to:
  - Remove an asset from a marketplace listing.
  - Take an asset off the market temporarily or permanently.
  - Manage the availability of assets in the marketplace.

By canceling a listing, you ensure that the asset is no longer available for purchase in the marketplace. This can be useful when an item is no longer for sale, is undergoing maintenance, or if the seller wants to withdraw it from the market for any reason. The cancellation is a critical aspect of marketplace management and allows you to maintain control over the assets listed in your platform.
