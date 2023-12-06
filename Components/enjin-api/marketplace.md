---
title: "Marketplace"
slug: "marketplace"
excerpt: "Operations to help you create and manage a marketplace."
hidden: false
createdAt: "Wed Nov 08 2023 02:47:50 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:14:12 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Please note: This is an introductory reference
> 
> For the most up-to-date information, refer to the [GraphQL Playground](https://platform.canary.enjin.io/graphiql) and [Apollo API Reference](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home).
> 
> 🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.

> 👍 Marketplace Endpoints
> 
> - **Testnet:** `http://platform.canary.enjin.io/graphql/marketplace`
> - **Mainnet:** `http://platform.enjin.io/graphql/marketplace`

This is a detailed reference guide that explains the most commonly used operations.

# Queries

## GetBid

The `GetBid` query allows you to retrieve detailed information about a specific bid placed on a market listing. It's a valuable tool for querying bid-related data, including bid price, bidder details, and the associated market listing.

```graphql
query GetBid {
  GetBid(id: 1) {
    id
    price
    height
    bidder {
      account {
        publicKey
        address
      }
    }
    listing {
      listingId
    }
  }
}
```
```json Response
{
  "data": {
    "GetBid": {
      "id": 1,
      "price": "1000000000000000000",
      "height": 239058,
      "bidder": {
        "account": {
          "publicKey": "0xb4664455021025f4944c1bc4af8a2830317f0765dc624778345dea09e89a526a",
          "address": "cxNW84hdDPEr8rU8oUbqNDaCmVX6SxH86mFufTf6HiNbZhi2F"
        }
      },
      "listing": {
        "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"
      }
    }
  }
}
```

### Use Case:

The `GetBid` query serves various use cases:

- **Audit and Verification**: You can use it to verify and audit bid details, ensuring transparency and accountability.
- **Market Analysis**: It aids in analyzing market behavior, helping you understand bidding patterns and the market value of listings.
- **User Interface Updates**: Developers can use this data to update user interfaces with real-time bid information. This enhances the user experience by keeping users informed about their bids or bids on listings they are interested in.

By providing access to bid-related data, the `GetBid` query is a fundamental tool for applications and systems that involve marketplaces and bidding processes.

## GetBids

The `GetBids` query is used to retrieve a list of bids for one or more market listings based on specified listing IDs. Unlike the `GetBid` query, which retrieves details of a single bid, `GetBids` can return multiple bids and includes pagination information.

```graphql
query GetBids {
  GetBids(listingIds: ["0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"]) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        id
        price
        height
        bidder {
          account {
            publicKey
            address
          }
        }
        listing {
          listingId
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetBids": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "node": {
            "id": 1,
            "price": "1000000000000000000",
            "height": 239058,
            "bidder": {
              "account": {
                "publicKey": "0xb4664455021025f4944c1bc4af8a2830317f0765dc624778345dea09e89a526a",
                "address": "cxNW84hdDPEr8rU8oUbqNDaCmVX6SxH86mFufTf6HiNbZhi2F"
              }
            },
            "listing": {
              "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"
            }
          }
        }
      ]
    }
  }
}
```

### Use Case:

The `GetBids` query serves various use cases:

- **Marketplace Insights**: You can use it to gain insights into the market by retrieving bid data for multiple listings. This helps you understand the level of activity and interest in various listings.
- **Data Analysis**: The retrieved data can be used for statistical analysis, trend identification, and understanding how the market responds to different listings.
- **User Interface**: For platforms displaying lists of bids on multiple items, this query ensures that users have access to comprehensive bid information across various listings.

While the `GetBid` query focuses on retrieving detailed information about a single bid, `GetBids` is suitable for scenarios where you need an overview of all bids related to specific listings, especially when dealing with a larger volume of bid data.

## GetListing

The `GetListing` query allows you to retrieve detailed information about a single market listing using its unique listing ID. This query provides a comprehensive overview of the listing's attributes, its state, sales history, bid history, and more.

```graphql
query GetListing {
  GetListing(listingId: "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20") {
    listingId
    makeAssetId {
      collectionId
      tokenId
    }
    takeAssetId {
      collectionId
      tokenId
    }
    amount
    price
    minTakeValue
    feeSide
    creationBlock
    deposit
    salt
    state {
      ... on FixedPriceState {
        amountFilled
        type
      }
      ... on AuctionState {
        type
      }
    }
    data {
      ... on FixedPriceData {
        type
      }
      ... on AuctionData {
        type
        startBlock
        endBlock
      }
    }
    seller {
      account {
        publicKey
        address
      }
    }
    sales {
      edges {
        node {
          amount
          price
          bidder {
            account {
              publicKey
              address
            }
          }
        }
      }
    }
    bids {
      edges {
        node {
          price
          bidder {
            account {
              publicKey
              address
            }
          }
          height
        }
      }
    }
    states {
      state
      height
    }
  }
}
```
```json Response
{
  "data": {
    "GetListing": {
      "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20",
      "makeAssetId": {
        "collectionId": "4919",
        "tokenId": "0"
      },
      "takeAssetId": {
        "collectionId": "0",
        "tokenId": "0"
      },
      "amount": "1",
      "price": "1000000000000000000",
      "minTakeValue": "975000000000000000",
      "feeSide": "TAKE_FEE",
      "creationBlock": 239058,
      "deposit": "2025700000000000000",
      "salt": "73616c74313233",
      "state": {
        "amountFilled": null,
        "type": "FIXED_PRICE"
      },
      "data": {
        "type": "FIXED_PRICE"
      },
      "seller": {
        "account": {
          "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
          "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
        }
      },
      "sales": {
        "edges": []
      },
      "bids": {
        "edges": [
          {
            "node": {
              "price": "1000000000000000000",
              "bidder": {
                "account": {
                  "publicKey": "0xb4664455021025f4944c1bc4af8a2830317f0765dc624778345dea09e89a526a",
                  "address": "cxNW84hdDPEr8rU8oUbqNDaCmVX6SxH86mFufTf6HiNbZhi2F"
                }
              },
              "height": 239058
            }
          }
        ]
      },
      "states": [
        {
          "state": "ACTIVE",
          "height": 239058
        }
      ]
    }
  }
}
```

### Use Case:

The `GetListing` query is valuable for various use cases:

- **Detailed Listing Information**: You can retrieve all essential information about a specific listing, making it useful for potential buyers to review listing details comprehensively.
- **Historical Data Analysis**: It includes historical states, sales, and bids, enabling users to track the listing's activity over time and analyze its market performance.
- **Transaction Preparation**: Sellers and buyers can prepare for transactions effectively by understanding the listing's terms, including price, minimum take value, and asset details.

Unlike queries like `GetBids` that focus on specific aspects of a listing, `GetListing` provides a holistic view of a single market listing, encapsulating all its attributes, history, and context in a single response. This makes it particularly useful for in-depth research and transaction preparation.

## GetListings

The `GetListings` query is used to retrieve information about multiple market listings from the Enjin Blockchain marketplace. Unlike the `GetListing` query, which fetches data for a single listing, `GetListings` is designed to handle multiple listings at once, making it suitable for scenarios where you need to fetch details for multiple listings in a single request.

```graphql
query GetListings {
  GetListings(
    listingIds: ["0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"]
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        listingId
        makeAssetId {
          collectionId
          tokenId
        }
        takeAssetId {
          collectionId
          tokenId
        }
        amount
        price
        minTakeValue
        feeSide
        creationBlock
        deposit
        salt
        state {
          ... on FixedPriceState {
            amountFilled
            type
          }
          ... on AuctionState {
            type
          }
        }
        data {
          ... on FixedPriceData {
            type
          }
          ... on AuctionData {
            type
            startBlock
            endBlock
          }
        }
        seller {
          account {
            publicKey
            address
          }
        }
        sales {
          edges {
            node {
              amount
              price
              bidder {
                account {
                  publicKey
                  address
                }
              }
            }
          }
        }
        bids {
          edges {
            node {
              price
              bidder {
                account {
                  publicKey
                  address
                }
              }
              height
            }
          }
        }
        states {
          state
          height
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetListings": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "node": {
            "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20",
            "makeAssetId": {
              "collectionId": "4919",
              "tokenId": "0"
            },
            "takeAssetId": {
              "collectionId": "0",
              "tokenId": "0"
            },
            "amount": "1",
            "price": "1000000000000000000",
            "minTakeValue": "975000000000000000",
            "feeSide": "TAKE_FEE",
            "creationBlock": 239058,
            "deposit": "2025700000000000000",
            "salt": "73616c74313233",
            "state": {
              "amountFilled": null,
              "type": "FIXED_PRICE"
            },
            "data": {
              "type": "FIXED_PRICE"
            },
            "seller": {
              "account": {
                "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
              }
            },
            "sales": {
              "edges": []
            },
            "bids": {
              "edges": [
                {
                  "node": {
                    "price": "1000000000000000000",
                    "bidder": {
                      "account": {
                        "publicKey": "0xb4664455021025f4944c1bc4af8a2830317f0765dc624778345dea09e89a526a",
                        "address": "cxNW84hdDPEr8rU8oUbqNDaCmVX6SxH86mFufTf6HiNbZhi2F"
                      }
                    },
                    "height": 239058
                  }
                }
              ]
            },
            "states": [
              {
                "state": "ACTIVE",
                "height": 239058
              }
            ]
          }
        }
      ]
    }
  }
}
```

### Use Case:

The `GetListings` query is valuable for various use cases:

- **Batch Data Retrieval**: You can efficiently retrieve detailed information about multiple listings in a single request, which is useful for batch processing or displaying a list of items on a user interface.
- **Marketplace Overview**: It allows you to obtain a comprehensive overview of multiple listings, making it easier to analyze and present marketplace data to users.
- **Pagination Support**: `GetListings` provides pagination details, making it suitable for handling large datasets of listings.

Compared to the `GetListing` query, which focuses on a single listing, `GetListings` is designed to cater to scenarios where you need to work with multiple listings simultaneously. It streamlines the data retrieval process, especially when dealing with large sets of listings, and includes pagination support for handling extensive listings efficiently.

## GetSale

The `GetSale` query is used to retrieve details about a specific sale transaction that has occurred on the Enjin Blockchain marketplace. This query requires the sale ID as input and returns information about the sale, including the sale ID, price, quantity, bidder information, and the associated market listing.

```graphql
query GetSale {
  GetSale(id: 1) {
    id
    price
    amount
    bidder {
      account {
        publicKey
        address
      }
    }
    listing {
      listingId
    }
  }
}
```
```json Response
{
  "data": {
    "GetSale": {
      "id": 1,
      "price": "1000000",
      "amount": "1",
      "bidder": {
        "account": {
          "publicKey": "0x6a03b1a3d40d7e344dfb27157931b14b59fe2ff11d7352353321fe400e956802",
          "address": "cxLpbEojWougf2cE6onB6PuK9SsfmKqNJKNo9tTsqirxFbuN5"
        }
      },
      "listing": {
        "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"
      }
    }
  }
}
```

### Use Case:

The `GetSale` query serves various purposes in a marketplace:

- **Transaction Verification**: You can use it to verify and retrieve specific details of a sale transaction, including the price, quantity, and bidder information. This is essential for transparency and auditing purposes.
- **Marketplace Analytics**: By providing sale details, this query aids in market analysis, allowing you to understand the pricing and quantity dynamics within the marketplace.
- **User Interface Updates**: Applications can use this data to update user interfaces with the latest sale information, enhancing user experience by keeping them informed about completed transactions.
- **Historical Data Retrieval**: It allows you to access historical sale data, which can be valuable for historical analysis and reporting.

Overall, the `GetSale` query helps you retrieve and display specific details about completed sale transactions in a marketplace.

## GetSales

The `GetSales` query is used to retrieve information about completed sale transactions that have occurred on a marketplace. This query allows you to fetch details of multiple sales associated with specific market listings.

```graphql
query GetSales {
  GetSales(listingIds: ["0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"]) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        id
        price
        amount
        bidder {
          account {
            publicKey
            address
          }
        }
        listing {
          listingId
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetSales": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasPreviousPage": false,
        "hasNextPage": false
      },
      "edges": [
        {
          "node": {
            "id": 1,
            "price": "1000000",
            "amount": "1",
            "bidder": {
              "account": {
                "publicKey": "0x6a03b1a3d40d7e344dfb27157931b14b59fe2ff11d7352353321fe400e956802",
                "address": "cxLpbEojWougf2cE6onB6PuK9SsfmKqNJKNo9tTsqirxFbuN5"
              }
            },
            "listing": {
              "listingId": "0x101d16dc0fa25d77a92bcb6cde34e8ad1e85d96cd6a4a78eb68acc4f82d37f20"
            }
          }
        }
      ]
    }
  }
}
```

### Use Case:

The `GetSales` query serves various purposes in a marketplace:

- **Transaction History**: It allows you to retrieve a history of completed sale transactions associated with specific market listings. This is valuable for auditing and transparency.
- **Marketplace Analytics**: By fetching completed sale details, you can analyze pricing trends, quantity dynamics, and bidder behaviors within the marketplace.
- **User Interface Updates**: Applications can use this data to display the history of sales to users, helping them track the transaction history of specific listings.
- **Transaction Confirmation**: Sellers and buyers can use this query to confirm the details of completed transactions, including the sale price and bidder information.

Overall, the `GetSales` query is instrumental in providing insights into the history of completed sale transactions within a marketplace. It offers a comprehensive view of completed sales associated with specific market listings, aiding in transparency and informed decision-making.

# Mutations

## CreateListing

The `CreateListing` mutation is used to initiate the process of placing a sell order on a marketplace. This mutation is essential for sellers who want to list their assets for sale in the marketplace.

```graphql
mutation CreateListing {
  CreateListing(
    account: "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e"
    makeAssetId: {
      collectionId:7153
      tokenId: {integer:68}
    }
    takeAssetId: {
       collectionId:7153
      tokenId: {integer:70468841277235617716769448539773927607}
    }
    amount: 1
    price: 10000
    salt: "random string"
    auctionData: {
      startBlock:403000
      endBlock:404000
    }
  ) {
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
```json Response
{
  "data": {
    "CreateListing": {
      "id": 11296,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3200c56f1101c56f33b7007b94fad4fa2fe1d6a5b71ece033504419c3472616e646f6d20737472696e6701e298180082a81800",
      "method": "CreateListing",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "4863964a-0768-473f-8c02-18be8fff92c1"
    }
  }
}
```

### Use Case:

The `CreateListing` mutation is a fundamental operation for sellers in a marketplace. It allows you, as a seller, to list your assets for sale on the platform. Here's how you can use it:

1. **Seller's Identity**: You provide your account's public key (`account`) to identify yourself as the seller.

2. **Asset Details**: Specify the asset you want to sell (`makeAssetId`) and the asset you want to receive in exchange (`takeAssetId`). This includes collection IDs and token IDs.

3. **Quantity and Price**: Set the quantity (`amount`) and the price (`price`) at which you are willing to sell your asset.

4. **Uniqueness**: Include a random string (`salt`) to ensure the uniqueness of your listing order.

5. **Auction Details (Optional)**: If you are conducting an auction, you can specify the start and end blocks for the auction (`auctionData`).

6. **Response**: After successfully creating the listing, you will receive a response with details about the new listing, including its ID, state, and other relevant information.

This mutation is essential for sellers to participate in the marketplace, list their assets, and potentially initiate sales or auctions. It forms the basis for trading assets within the platform, allowing sellers to set their terms and conditions for each listing.

## FillListing

The `FillListing` mutation is used to finalize the purchase of an asset listed at a fixed price on a marketplace. It enables buyers to accept the terms of a listing and execute the transaction to acquire the asset they desire.

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
```json Response
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

### Use Case:

The `FillListing` mutation is a critical operation for buyers in a marketplace. Here's how you can use it:

1. **Select Listing**: You specify the unique `listingId` of the listing you want to fill, indicating the asset you wish to purchase.

2. **Quantity**: Determine the `amount` of the asset you want to buy. Ensure that this quantity matches the available quantity in the listing if it's a fixed price sale.

3. **Transaction Submission**: Execute the mutation, triggering the transaction. The response will provide transaction details, including the initial state as "PENDING."

4. **Transaction Processing**: The network processes the transaction, and eventually, the `transactionId` and `transactionHash` fields in the response will be updated with the respective values once confirmed.

5. **Completion**: The successful execution of the `FillListing` mutation indicates that you have committed to the purchase, and the asset will be transferred to your wallet upon transaction confirmation.

This mutation is essential for buyers to participate in the marketplace, finalize purchases, and take ownership of assets. It facilitates the transfer of both digital assets and funds between parties on the blockchain, ensuring a seamless and secure transaction process.

## FinalizeAuction

The `FinalizeAuction` mutation is used to complete the auction process for a specific asset listed in a marketplace. This operation is crucial for officially closing the auction and transferring the asset to the highest bidder, typically after the auction has ended.

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
```json Response
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

### Use Case:

- **You** can use the `FinalizeAuction` mutation in scenarios where you have conducted an auction-based listing and need to complete the auction process. This includes:
  - Officially transferring the auctioned asset to the winning bidder.
  - Ensuring that the funds are allocated as per the auction terms.
  - Providing finality to the auction and enforcing the bid commitments.

It's important to note that `FinalizeAuction` is specific to auction listings and is used after the auction has ended. This mutation represents the final step in the auction process, marking the asset as officially won by the highest bidder and concluding the transaction.

## CancelListing

The `CancelListing` mutation in used to cancel a listing on the Enjin Blockchain marketplace. This operation is typically performed by the seller or the system administrator and is used to remove an asset from a marketplace listing.

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
```json Response
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

### Use Case:

- **You** can use the `CancelListing` mutation when you want to:
  - Remove an asset from a marketplace listing.
  - Take an asset off the market temporarily or permanently.
  - Manage the availability of assets in the marketplace.

By canceling a listing, you ensure that the asset is no longer available for purchase in the marketplace. This can be useful when an item is no longer for sale, is undergoing maintenance, or if the seller wants to withdraw it from the market for any reason. The cancellation is a critical aspect of marketplace management and allows you to maintain control over the assets listed in your platform.