---
title: "Marketplace"
slug: "marketplace"
description: "Query the Enjin API for marketplace data, including listing information, token trades, and transaction details."
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

## GetBid

The `GetBid` query allows you to retrieve detailed information about a specific bid placed on a market listing. It's a valuable tool for querying bid-related data, including bid price, bidder details, and the associated market listing.
<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## GetBids

The `GetBids` query is used to retrieve a list of bids for one or more market listings based on specified listing IDs. Unlike the `GetBid` query, which retrieves details of a single bid, `GetBids` can return multiple bids and includes pagination information.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## GetListing

The `GetListing` query allows you to retrieve detailed information about a single market listing using its unique listing ID. This query provides a comprehensive overview of the listing's attributes, its state, sales history, bid history, and more.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## GetListings

The `GetListings` query is used to retrieve information about multiple market listings from the Enjin Blockchain marketplace. Unlike the `GetListing` query, which fetches data for a single listing, `GetListings` is designed to handle multiple listings at once, making it suitable for scenarios where you need to fetch details for multiple listings in a single request.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## GetSale

The `GetSale` query is used to retrieve details about a specific sale transaction that has occurred on the Enjin Blockchain marketplace. This query requires the sale ID as input and returns information about the sale, including the sale ID, price, quantity, bidder information, and the associated market listing.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## GetSales

The `GetSales` query is used to retrieve information about completed sale transactions that have occurred on a marketplace. This query allows you to fetch details of multiple sales associated with specific market listings.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>