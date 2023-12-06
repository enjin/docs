---
title: "Collections"
slug: "collections"
excerpt: "Operations to help you create and manage collections."
hidden: false
createdAt: "Fri Nov 10 2023 05:36:56 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:25:56 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Please note: This is an introductory reference
> 
> For the most up-to-date information, refer to the [GraphQL Playground](https://platform.canary.enjin.io/graphiql) and [Apollo API Reference](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home).
> 
> 🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.

> 👍 Core Endpoints
> 
> - **Testnet:** `http://platform.canary.enjin.io/graphql`
> - **Mainnet:** `http://platform.enjin.io/graphql`

This is a detailed reference guide that explains the most commonly used operations.

# Queries

## Get Collection

The `GetCollection` query allows you to retrieve detailed information about a specific collection by providing its `collectionId`. This information includes collection attributes, token details, and associated accounts.

> 🚧 Reading Third-Party Collections
> 
> The Cloud Platform is set up to show only the collections and tokens you've created. This helps to simplify your management of these items. 
> 
> If you need to access collections or tokens not made through your cloud account, use the [Open-Source Platform](https://github.com/enjin/platform).

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
```json Response
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

### Use Case:

The `GetCollection` query is a powerful tool for fetching detailed information about a specific collection. This information can be instrumental for various applications such as auditing, analytics, and asset management. Some practical examples include:

- Displaying comprehensive details about a particular collection in your application’s user interface, providing users with in-depth insights.
- Extracting data necessary for auditing or analysis, particularly in understanding the distribution and movement of tokens within a collection.
- Confirming ownership and examining network details of a collection, essential for verification and validation processes.

## GetCollections

> 🚧 Using the Enjin Platform Cloud?
> 
> The Enjin Platform Cloud has collections and tokens scoping enabled, to ensure a better experience by only showing you collections and tokens you created using the cloud.
> 
> If you wish to fetch collections/tokens created outside of your cloud account, consider transitioning to the [Open-Source Platform](doc:quickstart-guide).

The `GetCollections` query allows you to retrieve an array of collections. You can optionally filter the collections by providing a list of collection IDs that you are interested in.

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
```json Response
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

### Use Case:

You can use the `GetCollections` query when you need to retrieve information about multiple collections. This query is particularly useful for applications that manage and display data from various collections. Here are some use cases:

- **Collection Inventory**: Retrieve a list of collections to display an inventory or marketplace of available collections to users.
- **Analytics**: Fetch data from multiple collections to perform analytics and generate insights.
- **Customized Queries**: Allow users to search for and retrieve specific collections based on their preferences.
- **Batch Processing**: Streamline batch processing tasks that involve multiple collections by retrieving their data in a single query.

# Mutations

## CreateCollection

The `CreateCollection` mutation is used to create a new on-chain collection. A collection serves as a grouping of on-chain assets, typically non-fungible tokens (NFTs), that share common properties or belong to the same set.

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
```json Response
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

### Use Case:

Utilize the `CreateCollection` mutation for streamlined initiation of new on-chain collections, offering distinct benefits:

- **Token Project Launch**: Perfect for new token ventures, it enables the structured organization and management of multiple tokens under one collection.

## ApproveCollection

The `ApproveCollection` mutation is used to authorize another account (referred to as the "operator") to transfer tokens from a specific collection account. This operation is common in scenarios involving Non-Fungible Tokens (NFTs) or tokenized assets, where token management may need to be delegated without transferring ownership of the tokens.

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
```json Response
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

### Use Case:

You can use the `ApproveCollection` mutation when you need to delegate token management within a collection to another account without transferring ownership. Here are some scenarios where this mutation is beneficial:

- **Delegated Token Management**: When users want to delegate the responsibility of managing their token transfers, they can use this mutation to grant specific accounts permission.
- **Token Marketplaces**: Operators on token marketplaces can receive approval to list tokens from a collection on their platform for trading.

## UnapproveCollection

The `UnapproveCollection` mutation is used to revoke previously granted permissions for a specific account (referred to as the "operator") to transfer items from a collection owned by the sender's account. This operation is essential for enhancing the security and control of digital assets, ensuring that the owner of a collection can manage who has the authority to move or transfer items from their collection.

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
```json Response
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

### Use Case:

You can use the `UnapproveCollection` mutation when you need to revoke a specific operator's permission to transfer items from a collection. Here are some scenarios where this mutation is beneficial:

- **Changing Operators**: If the relationship between the owner of the collection and the operator changes, you can use this mutation to revoke the operator's access.
- **Expired Permissions**: If the operator's permissions were set with a time limit or specific conditions that have now expired, you can revoke their access.
- **Security Control**: Enhance the security of digital assets by providing a straightforward method to revoke access when needed.

## MutateCollection

The `MutateCollection` mutation is utilized to modify the default settings of an existing collection. This mutation allows you to make changes to various parameters of a collection, such as adjusting royalty settings. It is particularly valuable when you need to alter how royalties are distributed for the assets within a specific collection.

```graphql
mutation MutateCollection {
    MutateCollection(
        collectionId: "10943"
        mutation: {
          royalty: {
            beneficiary:"0x50a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890d"
            percentage: 50
          }
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
    }
}
```
```json Response
{
  "data": {
    "MutateCollection": {
      "id": 14066,
      "transactionId": null,
      "transactionHash": null,
      "method": "MutateCollection",
      "state": "PENDING",
      "encodedData": "0x2802fdaa00010150a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890d0294357700",
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

### Use Case:

You can use the `MutateCollection` mutation when you need to make changes to an existing collection's default settings. Here are some scenarios where this mutation is beneficial:

- **Royalty Adjustment**: You want to adjust the royalty settings for a collection, changing the beneficiary and the percentage of royalties received from token sales.
- **Governance Updates**: To adapt to changing governance requirements or business agreements, you can modify collection parameters like royalties.
- **Market Competitiveness**: To stay competitive in a marketplace, you may need to fine-tune collection settings to align with market practices.

## Burn

The `Burn` mutation is used to permanently delete a specified amount of tokens from a collection. This operation is irreversible and results in the removal of tokens from circulation. When tokens are burned, the reserved value associated with them is often returned to the issuer's account.

```graphql
mutation Burn {
    Burn(
        collectionId: "7154"
        params: {
          tokenId: {integer:6533}
            amount:1
            keepAlive:false
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
    }
}
```
```json Response
{
  "data": {
    "Burn": {
      "id": 14055,
      "transactionId": null,
      "transactionHash": null,
      "method": "Burn",
      "state": "PENDING",
      "encodedData": "0x2805c96f1566040000",
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

### Use Case:

You can use the `Burn` mutation when you need to permanently remove tokens from circulation in a collection. Here are some scenarios where this mutation is useful:

- **Token Scarcity**: You want to increase the scarcity and value of remaining tokens by permanently deleting a portion of them.
- **Value Reclamation**: In systems where tokens have reserved value (e.g., ENJ-backed tokens), burning allows you to reclaim this reserved value.
- **Deflationary Models**: Burning tokens can be part of a deflationary economic model where tokens are periodically removed from circulation.

## DestroyCollection

The `DestroyCollection` mutation is used to permanently delete an existing collection. This operation is irreversible and removes the entire collection, including all associated tokens and their reserved values.

```graphql
mutation DestroyCollection{
    DestroyCollection(collectionId: 10942) {
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
```json Response
{
  "data": {
    "DestroyCollection": {
      "id": 14062,
      "transactionId": null,
      "transactionHash": null,
      "method": "DestroyCollection",
      "state": "PENDING",
      "encodedData": "0x2801f9aa",
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

### Use Case:

You can use the `DestroyCollection` mutation when you want to permanently remove an entire collection of tokens from the blockchain. Here are some scenarios where this mutation is useful:

- **Unused Collections**: You have collections that are no longer needed or relevant, and you want to clean up the blockchain by removing them.
- **Reclaim Reserved Value**: Destroying a collection releases any reserved value associated with it, which can be a significant amount of resources.
- **Optimizing Blockchain Data**: By removing unused collections, you can optimize the data stored on the blockchain and reduce clutter.

## Freeze

The `Freeze` mutation is used to temporarily halt activities related to a collection, token, collection account, or token account. Freezing prevents further transactions or modifications, such as transfers or updates, from taking place.

```graphql
mutation Freeze {
  Freeze(
    freezeType: COLLECTION
    collectionId: "10943"    
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
```json Response
{
  "data": {
    "Freeze": {
      "id": 14064,
      "transactionId": null,
      "transactionHash": null,
      "method": "Freeze",
      "state": "PENDING",
      "encodedData": "0x2807fdaa00",
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

### Use Case:

You can use the `Freeze` mutation in various scenarios where temporary halting of activities is required:

- **Security Measures**: Freeze a collection or token in response to suspicious activities or during an investigation to secure the assets.
- **Administrative Control**: Temporarily halt activities for maintenance, upgrades, or administrative actions.
- **Emergency Response**: Freeze assets in response to unforeseen events or emergencies to prevent harm or loss.

## SetCollectionAttribute

The `SetCollectionAttribute` mutation allows you to assign a new attribute or update an existing attribute's value within a collection.

```graphql
mutation SetCollectionAttribute {
    SetCollectionAttribute(
        collectionId: "4741"
        key: "test"
        value: "Hello"
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
```json Response
{
  "data": {
    "SetCollectionAttribute": {
      "id": 14072,
      "transactionId": null,
      "transactionHash": null,
      "method": "SetCollectionAttribute",
      "state": "PENDING",
      "encodedData": "0x2809154a0010746573741448656c6c6f",
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

### Use Case:

The `SetCollectionAttribute` mutation is useful for dynamically managing attributes within a collection. You can use it in various scenarios, such as:

- Defining or updating characteristics of the collection, such as metadata or properties.
- Ensuring that collections have the necessary metadata for display or functionality within your application.

## RemoveCollectionAttribute

The `RemoveCollectionAttribute` mutation is designed to remove a specific attribute from an entire collection of tokens. Attributes typically represent metadata associated with the tokens, such as name, color, size, or any other descriptive information.

```graphql
mutation RemoveCollectionAttribute {
    RemoveCollectionAttribute(
        collectionId: "4741"  
        key: "name"
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
```json Response
{
  "data": {
    "RemoveCollectionAttribute": {
      "id": 14070,
      "transactionId": null,
      "transactionHash": null,
      "method": "RemoveCollectionAttribute",
      "state": "PENDING",
      "encodedData": "0x280a154a00106e616d65",
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

### Use Case:

The `RemoveCollectionAttribute` mutation is useful for collection owners or maintainers who need to update or correct the metadata of a collection. It allows for the removal of an attribute that is no longer needed or was incorrectly added to all tokens within a collection. This helps in maintaining the accuracy and relevance of the token metadata, which is crucial for the functionality and value perception of NFTs within the collection.