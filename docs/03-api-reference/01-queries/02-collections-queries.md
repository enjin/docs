---
title: "Collections"
slug: "collections"
description: "Query the Enjin API to retrieve data about collections, including metadata and token information within a collection."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is a detailed reference guide that explains the most commonly used operations.

## Get Collection

The `GetCollection` query allows you to retrieve detailed information about a specific collection by providing its `collectionId`. This information includes collection attributes, token details, and associated accounts.

:::warning Reading Third-Party Collections
Please note that the Enjin Platform Cloud is set up to show only the collections and tokens that were created via the auth-ed Enjin Platform Cloud account.\
To get a collection that was created elsewhere (via a different Enjin Platform Cloud account / [NFT.io](https://nft.io) / [Enjin Console](https://console.enjin.io) / etc.) the collection must be "Tracked" first, or the query response will return an error.\
Learn more about tracking a collection in the [Tracking Collections section](/02-guides/01-platform/01-managing-tokens/09-fetching-token-holders.md#tracking-collections).
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetCollection {
  GetCollection(collectionId: 7153) {
    collectionId
    maxTokenCount
    maxTokenSupply
    forceSingleMint
    frozen
    network
    owner {
      account {
        publicKey
        address
      }
    }
    attributes {
      key
      value
    }
    tokens {
      edges {
        cursor
        node {
          tokenId
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
    accounts {
      edges {
        cursor
        node {
          accountCount
          isFrozen
          wallet {
            account {
              publicKey
              address
            }
          }
          approvals {
            expiration
            wallet {
              account {
                publicKey
                address
              }
            }
          }
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
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetCollection": {
      "collectionId": "7153",
      "maxTokenCount": 100,
      "maxTokenSupply": "100",
      "forceSingleMint": false,
      "frozen": false,
      "network": "canary",
      "owner": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "attributes": [],
      "tokens": {
        "edges": [
          {
            "cursor": "eyJpZCI6NzI3MiwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "tokenId": "10"
            }
          },
          {
            "cursor": "eyJpZCI6NzI3MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "tokenId": "6"
            }
          },
          {
            "cursor": "eyJpZCI6Mzk0MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "tokenId": "68"
            }
          },
          {
            "cursor": "eyJpZCI6Mzk1MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "tokenId": "70468841277235617716769448539773927607"
            }
          }
        ],
        "totalCount": 4,
        "pageInfo": {
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "",
          "endCursor": ""
        }
      },
      "accounts": {
        "edges": [
          {
            "cursor": "eyJpZCI6MTM0OCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "accountCount": 2,
              "isFrozen": false,
              "wallet": {
                "account": {
                  "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
                  "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
                }
              },
              "approvals": []
            }
          },
          {
            "cursor": "eyJpZCI6MjQ2MSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
            "node": {
              "accountCount": 2,
              "isFrozen": false,
              "wallet": {
                "account": {
                  "publicKey": "0x985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050",
                  "address": "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
                }
              },
              "approvals": []
            }
          }
        ],
        "totalCount": 2,
        "pageInfo": {
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "",
          "endCursor": ""
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

The `GetCollection` query is a powerful tool for fetching detailed information about a specific collection. This information can be instrumental for various applications such as auditing, analytics, and asset management. Some practical examples include:

- Displaying comprehensive details about a particular collection in your application’s user interface, providing users with in-depth insights.
- Extracting data necessary for auditing or analysis, particularly in understanding the distribution and movement of tokens within a collection.
- Confirming ownership and examining network details of a collection, essential for verification and validation processes.

## GetCollections

:::warning 🚧 Using the Enjin Platform Cloud?
The Enjin Platform Cloud has collections and tokens scoping enabled, to ensure a better experience by only showing you collections and tokens you created using the cloud.\
If you wish to fetch collections/tokens created outside of your cloud account, consider transitioning to the [Enterprise On-Prem Enjin Platform](/05-enjin-platform/01-enterprise-on-prem/01-enterprise-on-prem.md).
:::

The `GetCollections` query allows you to retrieve an array of collections. You can optionally filter the collections by providing a list of collection IDs that you are interested in.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetCollections {
  GetCollections(collectionIds: [7153]) {
    edges {
      cursor
      node {
        collectionId
        maxTokenCount
        maxTokenSupply
        forceSingleMint
        frozen
        network
        owner {
          account {
            publicKey
            address
          }
        }
        attributes {
          key
          value
        }
        tokens {
          edges {
            cursor
            node {
              tokenId
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
        accounts  {
          edges {
            cursor
            node {
              accountCount
              isFrozen
              wallet {
                account {
                  publicKey
                  address
                }
              }
              approvals {
                expiration
                wallet {
                  account {
                    publicKey
                    address
                  }
                }
              }
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
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetCollections": {
      "edges": [
        {
          "cursor": "eyJjb2xsZWN0aW9uX2lkIjo3MTUzLCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
          "node": {
            "collectionId": "7153",
            "maxTokenCount": 100,
            "maxTokenSupply": "100",
            "forceSingleMint": false,
            "frozen": false,
            "network": "canary",
            "owner": {
              "account": {
                "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
                "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
              }
            },
            "attributes": [],
            "tokens": {
              "edges": [
                {
                  "cursor": "eyJpZCI6NzI3MiwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "tokenId": "10"
                  }
                },
                {
                  "cursor": "eyJpZCI6NzI3MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "tokenId": "6"
                  }
                },
                {
                  "cursor": "eyJpZCI6Mzk0MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "tokenId": "68"
                  }
                },
                {
                  "cursor": "eyJpZCI6Mzk1MywiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "tokenId": "70468841277235617716769448539773927607"
                  }
                }
              ],
              "totalCount": 4,
              "pageInfo": {
                "hasNextPage": false,
                "hasPreviousPage": false,
                "startCursor": "",
                "endCursor": ""
              }
            },
            "accounts": {
              "edges": [
                {
                  "cursor": "eyJpZCI6MTM0OCwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "accountCount": 2,
                    "isFrozen": false,
                    "wallet": {
                      "account": {
                        "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
                        "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
                      }
                    },
                    "approvals": []
                  }
                },
                {
                  "cursor": "eyJpZCI6MjQ2MSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
                  "node": {
                    "accountCount": 2,
                    "isFrozen": false,
                    "wallet": {
                      "account": {
                        "publicKey": "0x985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050",
                        "address": "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
                      }
                    },
                    "approvals": []
                  }
                }
              ],
              "totalCount": 2,
              "pageInfo": {
                "hasNextPage": false,
                "hasPreviousPage": false,
                "startCursor": "",
                "endCursor": ""
              }
            }
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": "",
        "endCursor": ""
      },
      "totalCount": 1
    }
  }
}
```
  </TabItem>
</Tabs>


### Use Case:

You can use the `GetCollections` query when you need to retrieve information about multiple collections. This query is particularly useful for applications that manage and display data from various collections. Here are some use cases:

- **Collection Inventory**: Retrieve a list of collections to display an inventory or marketplace of available collections to users.
- **Analytics**: Fetch data from multiple collections to perform analytics and generate insights.
- **Customized Queries**: Allow users to search for and retrieve specific collections based on their preferences.
- **Batch Processing**: Streamline batch processing tasks that involve multiple collections by retrieving their data in a single query.

# Mutations

## CreateCollection

The `CreateCollection` mutation is used to create a new on-chain collection. A collection serves as a grouping of on-chain assets, typically non-fungible tokens (NFTs), that share common properties or belong to the same set.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateCollection {
    CreateCollection(
        mintPolicy: {
          forceSingleMint:true
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
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
    "CreateCollection": {
      "id": 14058,
      "transactionId": null,
      "transactionHash": null,
      "method": "CreateCollection",
      "state": "PENDING",
      "encodedData": "0x2800000001000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "ef403ad0-7b6c-4020-8ef1-01b1dc6f4513"
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

Utilize the `CreateCollection` mutation for streamlined initiation of new on-chain collections, offering distinct benefits:

- **Token Project Launch**: Perfect for new token ventures, it enables the structured organization and management of multiple tokens under one collection.

## ApproveCollection

The `ApproveCollection` mutation is used to authorize another account (referred to as the "operator") to transfer tokens from a specific collection account. This operation is common in scenarios involving Non-Fungible Tokens (NFTs) or tokenized assets, where token management may need to be delegated without transferring ownership of the tokens.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ApproveCollection {
    ApproveCollection(
        collectionId: "7154"
        operator: "0x965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa6"
        expiration: 445100
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "ApproveCollection": {
      "id": 13819,
      "transactionId": null,
      "transactionHash": null,
      "method": "ApproveCollection",
      "state": "PENDING",
      "encodedData": "0x280fc96f965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa601acca0600",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `ApproveCollection` mutation when you need to delegate token management within a collection to another account without transferring ownership. Here are some scenarios where this mutation is beneficial:

- **Delegated Token Management**: When users want to delegate the responsibility of managing their token transfers, they can use this mutation to grant specific accounts permission.
- **Token Marketplaces**: Operators on token marketplaces can receive approval to list tokens from a collection on their platform for trading.

## UnapproveCollection

The `UnapproveCollection` mutation is used to revoke previously granted permissions for a specific account (referred to as the "operator") to transfer items from a collection owned by the sender's account. This operation is essential for enhancing the security and control of digital assets, ensuring that the owner of a collection can manage who has the authority to move or transfer items from their collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UnapproveCollection{
    UnapproveCollection(
        collectionId: "6305"
        operator: "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"      
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "UnapproveCollection": {
      "id": 14078,
      "transactionId": null,
      "transactionHash": null,
      "method": "UnapproveCollection",
      "state": "PENDING",
      "encodedData": "0x28108562d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can use the `UnapproveCollection` mutation when you need to revoke a specific operator's permission to transfer items from a collection. Here are some scenarios where this mutation is beneficial:

- **Changing Operators**: If the relationship between the owner of the collection and the operator changes, you can use this mutation to revoke the operator's access.
- **Expired Permissions**: If the operator's permissions were set with a time limit or specific conditions that have now expired, you can revoke their access.
- **Security Control**: Enhance the security of digital assets by providing a straightforward method to revoke access when needed.
