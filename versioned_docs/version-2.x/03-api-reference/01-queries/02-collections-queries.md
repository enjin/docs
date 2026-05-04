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

## GetCollections

:::warning 🚧 Using the Enjin Platform Cloud?
The Enjin Platform Cloud has collections and tokens scoping enabled, to ensure a better experience by only showing you collections and tokens you created using the cloud.\
If you wish to fetch collections/tokens created outside of your cloud account, consider transitioning to the [Enterprise On-Prem Enjin Platform](/05-enjin-platform/04-enterprise-on-prem/04-enterprise-on-prem.md).
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