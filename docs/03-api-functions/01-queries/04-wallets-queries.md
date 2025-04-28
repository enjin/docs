---
title: "Wallets"
slug: "wallets"
excerpt: "Operations to help you create and manage wallets."
hidden: false
metadata: 
  title: "Wallets Queries - Retrieve Wallet Data and Balances"
  description: "Use the Enjin API to perform wallets queries, including retrieving balances, transaction history, and associated blockchain assets."
  image: []
  robots: "index"
createdAt: "Tue Nov 07 2023 20:26:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Apr 21 2025 16:37:57 GMT+0000 (Coordinated Universal Time)"
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

### Use Case:

As a developer, you can use the `GetWallet` query for various purposes, including:

- **Token Gating**:Enhancing the utility of tokens in your users' wallets, commonly referred to as token gating content. This allows for controlled access to specific content based on token ownership.
- **Transaction Auditing**: Audit historical transactions associated with the wallet to ensure compliance and security.
- **Account Management**: Manage and review collection and token accounts associated with the wallet.
- **Asset Management**: Understand the wallet's interaction with various collections and tokens.

By utilizing the `GetWallet` query, you gain insight into the detailed attributes and activities of a wallet, enabling you to make informed decisions, track transactions, and manage assets effectively.

## GetWallets

The `GetWallets` query allows you to retrieve an array of wallets. You have the option to apply filters based on parameters such as external IDs, verification IDs, or account addresses to narrow down the results. This query is useful for applications that need to access and display user wallet information, including transaction history and asset balances.

:::warning This query might return items in multiple pages using Connections
To learn how to use GraphQL cursors for pagination, head to [Using the API → Pagination](/01-getting-started/04-using-enjin-api/01-how-to-use-graphql.md#pagination).
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

### Use Case:

As a developer, you can use the `GetWallets` query for various purposes, including:

- **Wallet Listing**: Retrieve a list of wallets based on specific criteria.
- **User Wallet Overview**: Display a user's wallet information, including balances and transaction history.
- **Asset Management**: Manage and monitor assets associated with wallets, including collections and tokens.
- **Data Analysis**: Analyze wallet-related data to gain insights into user behavior and asset distribution.

By utilizing the `GetWallets` query, you can efficiently access and manage wallet-related data, enabling you to create user-friendly applications and perform in-depth analysis of wallet activities.

## GetAccountVerified

The `GetAccountVerified` query allows you to check the verification status of a specific account. It is used to determine whether an account is verified. The query takes a `verificationId` as a parameter, which serves as a unique identifier for the verification process.

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

### Use Case:

- **Verification Status Check**: You can use the `GetAccountVerified` query to check whether a specific account has been verified. This is useful for verifying the authenticity of accounts and their associated data.
- **Authentication and Access Control**: Knowing the verification status of an account can be used for access control or authentication purposes within your application. For example, you can grant certain privileges or access levels based on whether an account is verified.
- **Integration with Verification Services**: This query can be integrated with verification services to confirm the identity of users or entities.

To use this query, you provide the `verificationId` parameter with the unique identifier of the account you want to check. The response will include whether the account is verified (`true` or `false`) and additional account information for reference.

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

### Use Case:

- **User-Friendly Wallet Authentication**: You can use the `RequestAccount` query to provide a user-friendly method for users to authenticate and link their wallet accounts to your service or application.
- **Secure Data Entry**: By using QR codes, you reduce the risk of errors that may occur during manual entry of sensitive wallet data.
- **Tracking and Verification**: You can track and verify the status of the authentication process using the unique `verificationId`, enabling you to ensure that users successfully linked their wallets.

To implement this query, you need to specify the `callback` parameter, which should be the URL where users will be redirected after scanning the QR code. Your system should be capable of generating QR codes and handling the callback process to complete the wallet authentication or linking workflow.

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

### Use Case:

- **Message Authentication**: You can use the `VerifyMessage` query to ensure the authenticity and integrity of messages exchanged between parties. This is crucial for secure communication, as it verifies that the message has not been tampered with and confirms the identity of the sender.
- **Secure Login**: Utilize this query for message verification to confirm wallet ownership, authenticate user identity, and facilitate secure logins to games or applications.
- **Cryptographic Security**: It is essential for cryptographic security, as it ensures that messages are not susceptible to unauthorized modification or impersonation.

To use this query effectively, provide the necessary parameters: the original message, the cryptographic signature, the corresponding public key, and the type of cryptographic signature used. The response will inform you whether the message's signature is valid, helping you maintain the security and authenticity of your communications or authentication processes.

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

### Use Case:

- **Account Verification Management**: You can use the `GetPendingWallets` query to manage the verification process of wallet accounts. By retrieving a list of pending wallets, you can prioritize and streamline the verification workflow.
- **Administrative Tasks**: As an administrator, you can monitor and keep track of wallet accounts that require attention. This is essential for maintaining the security and integrity of your application.
- **Security Audits**: Use this query to perform security audits and identify accounts that need additional verification steps before they are allowed to transact or access certain features.

To utilize this query effectively, you do not need to provide any parameters. The response will contain all the relevant information about pending wallet accounts, allowing you to take appropriate actions to verify and manage these accounts within your system.
