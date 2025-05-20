---
title: "Wallets"
slug: "wallets"
description: "Use the Enjin API to perform wallets queries, including retrieving balances, transaction history, and associated blockchain assets."
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

## GetWallet

The `GetWallet` query provides detailed information about a specific wallet. This query retrieves various details related to the wallet, including account information, balances, associated collections and tokens, approvals, and transaction history. 

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetWallet {
    GetWallet(
        id: 5
    ) {
        id
        account {
            publicKey
            address
        }
        externalId
        managed
        network
        nonce
        balances {
            free
            reserved
            miscFrozen
            feeFrozen
        }
        collectionAccounts {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    accountCount
                    isFrozen
                    collection {
                        collectionId
                    }
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
        }
        tokenAccounts {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    balance
                    reservedBalance
                    isFrozen
                    collection {
                        collectionId
                    }
                    wallet {
                        account {
                            publicKey
                            address
                        }
                    }
                    token {
                        tokenId
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
        collectionAccountApprovals {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
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
        tokenAccountApprovals {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    amount
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
        transactions {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    id
                    transactionId
                    transactionHash
                    method
                    state
                    encodedData
                    events {
                        edges {
                            cursor
                            node {
                                phase
                                lookUp
                                moduleId
                                eventId
                                params {
                                    type
                                    value
                                }
                            }
                        }
                        totalCount
                        pageInfo {
                            hasPreviousPage
                            hasNextPage
                            startCursor
                            endCursor
                        }
                    }
                    wallet {
                        account {
                            publicKey
                            address
                        }
                    }
                }
            }
        }
        ownedCollections {
            totalCount
            pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
            }
            edges {
                cursor
                node {
                    collectionId
                    maxTokenCount
                    maxTokenSupply
                    forceSingleMint
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
                    accounts {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
                        edges {
                            cursor
                            node {
                                accountCount
                                isFrozen
                                collection {
                                    collectionId
                                }
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
                    }
                    tokens {
                        totalCount
                        pageInfo {
                            startCursor
                            endCursor
                            hasNextPage
                            hasPreviousPage
                        }
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
                                        startCursor
                                        endCursor
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        cursor
                                        node {
                                            balance
                                        }
                                    }
                                }
                                metadata
                                nonFungible
                            }
                        }
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
    "GetWallet": {
      "id": 5,
      "account": {
        "publicKey": "0x1edb67183fcd7846e717b16a37ae4326c7814090c748b5698a3b6a9e946a9f37",
        "address": "cxK83gJm3F8LV4Kh1YjA6KaSgJev1RgatHrum4Ap4AFcHSrNe"
      },
      "externalId": null,
      "managed": false,
      "network": "developer",
      "nonce": 0,
      "balances": {
        "free": "0",
        "reserved": "0",
        "miscFrozen": "0",
        "feeFrozen": "0"
      },
      "collectionAccounts": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      },
      "tokenAccounts": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      },
      "collectionAccountApprovals": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      },
      "tokenAccountApprovals": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      },
      "transactions": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      },
      "ownedCollections": {
        "totalCount": 0,
        "pageInfo": {
          "startCursor": "",
          "endCursor": "",
          "hasNextPage": false,
          "hasPreviousPage": false
        },
        "edges": []
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## GetWallets

The `GetWallets` query allows you to retrieve an array of wallets. You have the option to apply filters based on parameters such as external IDs, verification IDs, or account addresses to narrow down the results. This query is useful for applications that need to access and display user wallet information, including transaction history and asset balances.

:::warning This query might return items in multiple pages using Connections
To learn how to use GraphQL cursors for pagination, head to [Using the API → Pagination](/01-getting-started/05-using-enjin-api/01-how-to-use-graphql.md#pagination).
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetWallets {
  GetWallets(
    ids: [5]
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      cursor
      node {
        id
        account {
          publicKey
          address
        }
        externalId
        managed
        network
        nonce
        balances {
          free
          reserved
          miscFrozen
          feeFrozen
        }
        collectionAccounts {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              accountCount
              isFrozen
              collection {
                collectionId
              }
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
        }
        tokenAccounts {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              balance
              reservedBalance
              isFrozen
              collection {
                collectionId
              }
              wallet {
                account {
                  publicKey
                  address
                }
              }
              token {
                tokenId
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
        collectionAccountApprovals {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
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
        tokenAccountApprovals {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              amount
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
        transactions {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              transactionId
              transactionHash
              method
              state
              encodedData
              events {
                edges {
                  cursor
                  node {
                    phase
                    lookUp
                    moduleId
                    eventId
                    params {
                      type
                      value
                    }
                  }
                }
                totalCount
                pageInfo {
                  hasPreviousPage
                  hasNextPage
                  startCursor
                  endCursor
                }
              }
              wallet {
                account {
                  publicKey
                  address
                }
              }
            }
          }
        }
        ownedCollections {
          totalCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              collectionId
              maxTokenCount
              maxTokenSupply
              forceSingleMint
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
              accounts {
                totalCount
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  cursor
                  node {
                    accountCount
                    isFrozen
                    collection {
                      collectionId
                    }
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
              }
              tokens {
                totalCount
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
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
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                      }
                      edges {
                        cursor
                        node {
                          balance
                        }
                      }
                    }
                    metadata
                    nonFungible
                  }
                }
              }
            }
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
    "GetWallets": {
      "totalCount": 1,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasNextPage": false,
        "hasPreviousPage": false
      },
      "edges": [
        {
          "cursor": "eyJpZCI6NSwiX3BvaW50c1RvTmV4dEl0ZW1zIjp0cnVlfQ",
          "node": {
            "id": 5,
            "account": {
              "publicKey": "0x1edb67183fcd7846e717b16a37ae4326c7814090c748b5698a3b6a9e946a9f37",
              "address": "cxK83gJm3F8LV4Kh1YjA6KaSgJev1RgatHrum4Ap4AFcHSrNe"
            },
            "externalId": null,
            "managed": false,
            "network": "developer",
            "nonce": 0,
            "balances": {
              "free": "0",
              "reserved": "0",
              "miscFrozen": "0",
              "feeFrozen": "0"
            },
            "collectionAccounts": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
            },
            "tokenAccounts": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
            },
            "collectionAccountApprovals": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
            },
            "tokenAccountApprovals": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
            },
            "transactions": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
            },
            "ownedCollections": {
              "totalCount": 0,
              "pageInfo": {
                "startCursor": "",
                "endCursor": "",
                "hasNextPage": false,
                "hasPreviousPage": false
              },
              "edges": []
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

## GetAccountVerified

The `GetAccountVerified` query allows you to check the verification status of a specific account. It is used to determine whether an account is verified. The query takes a `verificationId` as a parameter, which serves as a unique identifier for the verification process.
The response will include whether the account is verified (`true` or `false`) and additional account information for reference.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetAccountVerified {
    GetAccountVerified(
        verificationId: "0x684768963b832de4f593da456ed3d099c2b8c580383492d3b0e735c4d1dfe740"
    ) {
        verified
        account {
            publicKey
            address
        }
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetAccountVerified": {
      "verified": true,
      "account": {
        "publicKey": "0x8b4cd0e710d3cd14b3a407cac1326dc6c8ac68b4ff22f8d239cbd460d831d608",
        "address": "cxMaEYKfjJQrQQZ4cmXUjRqfPNRkRUSgsESMiEeyP6pzsBm4V"
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## RequestAccount

The `RequestAccount` query is designed for generating a QR code that users can scan to provide their wallet account information. It facilitates user authentication and linking wallet accounts to a service or application. The generated QR code contains encoded data that, when scanned, triggers a specific action, such as authentication or the transfer of wallet details.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query RequestAccount {
    RequestAccount(
        callback: "https://enjin.io"
    ) {
        qrCode
        verificationId
    }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "RequestAccount": {
      "qrCode": "https://chart.googleapis.com/chart?chs=512x512&cht=qr&chl=https://deeplink.wallet.enjin.io/proof/0xa144ac5ef19bf4e3523cca27d9f998781c64692ea68843602da0dc95f6c4aa70:A2010LJAJ:aHR0cHM6Ly9lbmppbi5pbw==",
      "verificationId": "0xa144ac5ef19bf4e3523cca27d9f998781c64692ea68843602da0dc95f6c4aa70"
    }
  }
}
```
  </TabItem>
</Tabs>

## VerifyMessage

The `VerifyMessage` query is used to verify the authenticity of a message by confirming that it was signed with a specific private key corresponding to the provided public key. This query is essential for ensuring the integrity and origin of messages in a secure communication or authentication process.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query VerifyMessage {
  VerifyMessage(
    message: "0x74657374"
    signature: "0xbe32fc5fbe033ebb2dd94bcf0d06a52299042592006b0956cfd7606dea015b60f834d3b299172ad098e841efa3a61e9fb8e37a8912f85821eaf3df64f0e49083"
    publicKey: "0xb0e3d2a901fe662e3f693704a599d4ec06da13b213f46e9ba479ba8e95dbfa61"
    cryptoSignatureType: SR25519
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "VerifyMessage": true
  }
}
```
  </TabItem>
</Tabs>

## GetPendingWallets

The `GetPendingWallets` query is used to retrieve an array of wallet accounts that have not yet undergone the verification process. This query is particularly useful for administrators and account management systems to identify and handle pending wallet accounts that require verification.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetPendingWallets {
    GetPendingWallets {
        totalCount
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
        edges {
            cursor
            node {
                id
                account {
                    publicKey
                    address
                }
                externalId
                managed
                network
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
    "GetPendingWallets": {
      "totalCount": 0,
      "pageInfo": {
        "startCursor": "",
        "endCursor": "",
        "hasNextPage": false,
        "hasPreviousPage": false
      },
      "edges": []
    }
  }
}
```
  </TabItem>
</Tabs>
