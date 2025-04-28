---
title: "Tokens"
slug: "tokens"
description: "Query the Enjin API to retrieve detailed information about blockchain tokens, including ownership, metadata, and transaction history."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/01-getting-started/04-using-enjin-api/02-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is a detailed reference guide that explains the most commonly used operations.

## Get Token

The `GetToken` query enables you to retrieve detailed information about a specific token from a collection. It requires the collectionId and tokenId parameters to access attributes, account details, and metadata related to the token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetToken {
  GetToken(
    collectionId: 7153
    tokenId: {integer:10}
  ) {
    tokenId
    supply
    cap
    capSupply
    isFrozen
    minimumBalance
    unitPrice
    mintDeposit
    attributeCount
    nonFungible
    metadata
    collection {
      collectionId
    }
    attributes {
      key
      value
    }
    accounts {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          balance
          reservedBalance
          isFrozen
          wallet {
            account {
              publicKey
              address
            }
          }
          approvals {
            amount
            expiration
            wallet {
              account {
                publicKey
                address
              }
            }
          }
          namedReserves {
            pallet
            amount
          }
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
    "GetToken": {
      "tokenId": "10",
      "supply": "1",
      "cap": "SINGLE_MINT",
      "capSupply": null,
      "isFrozen": false,
      "minimumBalance": "1",
      "unitPrice": "10000000000000000",
      "mintDeposit": "20000000000000000",
      "attributeCount": 0,
      "nonFungible": true,
      "metadata": null,
      "collection": {
        "collectionId": "7153"
      },
      "attributes": [],
      "accounts": {
        "totalCount": 1,
        "pageInfo": {
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "",
          "endCursor": ""
        },
        "edges": [
          {
            "cursor": "eyJpZCI6NzgxOCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "balance": "1",
              "reservedBalance": "0",
              "isFrozen": false,
              "wallet": {
                "account": {
                  "publicKey": "0x985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050",
                  "address": "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
                }
              },
              "approvals": [],
              "namedReserves": []
            }
          }
        ]
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can utilize the GetToken query for various purposes, including:

- Retrieving Token Information: Get detailed information about a specific token, including supply, cap, and freeze status.
- Exploring Accounts: Explore accounts that hold the token, check their balances, and freeze status.
- Context of Collection: Obtain context about the collection to which the token belongs.
- Retrieving Attributes: Access attributes associated with the collection.
- Metadata Retrieval: Retrieve metadata associated with the token, such as name, color, or other descriptive information.

## GetTokens

The `GetTokens` query allows you to retrieve an array of token data from a collection, making it suitable for batch retrieval and data analysis. You can specify filtering criteria to target specific tokens within the collection.

:::warning Reading Third-Party Tokens
Please note that the Enjin Platform Cloud is set up to show only the collections and tokens that were created via the auth-ed Enjin Platform Cloud account.\
To get a token that was created elsewhere (via a different Enjin Platform Cloud account / [NFT.io](https://nft.io) / [Enjin Console](https://console.enjin.io) / etc.) the collection must be "Tracked" first, or the query response will return an error.\
Learn more about tracking a collection in the [Tracking Collections section](/02-tutorials/01-managing-tokens/09-fetching-token-holders.md#tracking-collections).
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokens {
  GetTokens(
    collectionId: 7153
    tokenIds: [{integer:10}]    
  ) {
    edges {
      cursor
      node {
        tokenId
        supply
        cap
        capSupply
        isFrozen
        minimumBalance
        unitPrice
        mintDeposit
        attributeCount
        collection {
          collectionId
        }
        attributes {
          key
          value
        }
        accounts {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              balance
              reservedBalance
              isFrozen
              wallet {
                account {
                  publicKey
                  address
                }
              }
              approvals {
                amount
                expiration
                wallet {
                  account {
                    publicKey
                    address
                  }
                }
              }
              namedReserves {
                pallet
                amount
              }
            }
          }
        }
        nonFungible
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTokens": {
      "edges": [
        {
          "cursor": "eyJjb2xsZWN0aW9uX2lkIjo0OTk4LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "tokenId": "10",
            "supply": "1",
            "cap": "SINGLE_MINT",
            "capSupply": null,
            "isFrozen": false,
            "minimumBalance": "1",
            "unitPrice": "10000000000000000",
            "mintDeposit": "20000000000000000",
            "attributeCount": 0,
            "collection": {
              "collectionId": "7153"
            },
            "attributes": [],
            "accounts": {
              "totalCount": 1,
              "pageInfo": {
                "hasNextPage": false,
                "hasPreviousPage": false,
                "startCursor": "",
                "endCursor": ""
              },
              "edges": [
                {
                  "cursor": "eyJpZCI6NzgxOCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "balance": "1",
                    "reservedBalance": "0",
                    "isFrozen": false,
                    "wallet": {
                      "account": {
                        "publicKey": "0x985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050",
                        "address": "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
                      }
                    },
                    "approvals": [],
                    "namedReserves": []
                  }
                }
              ]
            },
            "nonFungible": true
          }
        }
      ],
      "totalCount": 1,
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": "",
        "endCursor": ""
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can utilize the `GetTokens` query for various purposes, including:

- **Bulk Token Retrieval**: Retrieve information about multiple tokens within a collection, making it efficient for displaying token lists or galleries.

- **Filtered Token Retrieval**: Apply filters to obtain specific tokens based on criteria like token ID, collection, or attributes.

- **Marketplace Integration**: Fetch token data for use in a marketplace or trading platform to display available tokens and their details.

- **Data Analysis**: Analyze token data for insights, statistics, or reporting across a collection.

- **User Experience Enhancement**: Enhance the user experience by providing a comprehensive view of tokens within a collection.
