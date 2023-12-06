---
title: "Wallets"
slug: "wallets"
excerpt: "Operations to help you create and manage wallets."
hidden: false
createdAt: "Tue Nov 07 2023 20:26:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:14:34 GMT+0000 (Coordinated Universal Time)"
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

## GetWallet

The `GetWallet` query provides detailed information about a specific wallet. This query retrieves various details related to the wallet, including account information, balances, associated collections and tokens, approvals, and transaction history. 

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
```json Response
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

### Use Case:

As a developer, you can use the `GetWallet` query for various purposes, including:

- **Token Gating**:Enhancing the utility of tokens in your users' wallets, commonly referred to as token gating content. This allows for controlled access to specific content based on token ownership.
- **Transaction Auditing**: Audit historical transactions associated with the wallet to ensure compliance and security.
- **Account Management**: Manage and review collection and token accounts associated with the wallet.
- **Asset Management**: Understand the wallet's interaction with various collections and tokens.

By utilizing the `GetWallet` query, you gain insight into the detailed attributes and activities of a wallet, enabling you to make informed decisions, track transactions, and manage assets effectively.

## GetWallets

The `GetWallets` query allows you to retrieve an array of wallets. You have the option to apply filters based on parameters such as external IDs, verification IDs, or account addresses to narrow down the results. This query is useful for applications that need to access and display user wallet information, including transaction history and asset balances.

> 🚧 This query might return items in multiple pages using Connections
> 
> To learn how to use GraphQL cursors for pagination, head to [Using the API --> Pagination](doc:using-graphql#pagination).

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
```json Response
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

### Use Case:

As a developer, you can use the `GetWallets` query for various purposes, including:

- **Wallet Listing**: Retrieve a list of wallets based on specific criteria.
- **User Wallet Overview**: Display a user's wallet information, including balances and transaction history.
- **Asset Management**: Manage and monitor assets associated with wallets, including collections and tokens.
- **Data Analysis**: Analyze wallet-related data to gain insights into user behavior and asset distribution.

By utilizing the `GetWallets` query, you can efficiently access and manage wallet-related data, enabling you to create user-friendly applications and perform in-depth analysis of wallet activities.

## GetAccountVerified

The `GetAccountVerified` query allows you to check the verification status of a specific account. It is used to determine whether an account is verified. The query takes a `verificationId` as a parameter, which serves as a unique identifier for the verification process.

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
```json Response
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

### Use Case:

- **Verification Status Check**: You can use the `GetAccountVerified` query to check whether a specific account has been verified. This is useful for verifying the authenticity of accounts and their associated data.
- **Authentication and Access Control**: Knowing the verification status of an account can be used for access control or authentication purposes within your application. For example, you can grant certain privileges or access levels based on whether an account is verified.
- **Integration with Verification Services**: This query can be integrated with verification services to confirm the identity of users or entities.

To use this query, you provide the `verificationId` parameter with the unique identifier of the account you want to check. The response will include whether the account is verified (`true` or `false`) and additional account information for reference.

## RequestAccount

The `RequestAccount` query is designed for generating a QR code that users can scan to provide their wallet account information. It facilitates user authentication and linking wallet accounts to a service or application. The generated QR code contains encoded data that, when scanned, triggers a specific action, such as authentication or the transfer of wallet details.

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
```json Response
{
  "data": {
    "RequestAccount": {
      "qrCode": "https://chart.googleapis.com/chart?chs=512x512&cht=qr&chl=https://deeplink.wallet.enjin.io/proof/0xa144ac5ef19bf4e3523cca27d9f998781c64692ea68843602da0dc95f6c4aa70:A2010LJAJ:aHR0cHM6Ly9lbmppbi5pbw==",
      "verificationId": "0xa144ac5ef19bf4e3523cca27d9f998781c64692ea68843602da0dc95f6c4aa70"
    }
  }
}
```

### Use Case:

- **User-Friendly Wallet Authentication**: You can use the `RequestAccount` query to provide a user-friendly method for users to authenticate and link their wallet accounts to your service or application.
- **Secure Data Entry**: By using QR codes, you reduce the risk of errors that may occur during manual entry of sensitive wallet data.
- **Tracking and Verification**: You can track and verify the status of the authentication process using the unique `verificationId`, enabling you to ensure that users successfully linked their wallets.

To implement this query, you need to specify the `callback` parameter, which should be the URL where users will be redirected after scanning the QR code. Your system should be capable of generating QR codes and handling the callback process to complete the wallet authentication or linking workflow.

## VerifyMessage

The `VerifyMessage` query is used to verify the authenticity of a message by confirming that it was signed with a specific private key corresponding to the provided public key. This query is essential for ensuring the integrity and origin of messages in a secure communication or authentication process.

```graphql
query VerifyMessage {
    VerifyMessage(
        message: "test"
        signature: "0x1d670c35a76efa984fa2bd655d21eb28af0ee470e359848d2105845e170bb589fd6b7c2cbe97c9acce1eb205d4ade39cae75c619230cf44b64b25ec8677d7f0f"
        publicKey: "0x3a0419dc18e95c41953270a8a0e5f30b82ab667162e05083e0e42fcc58788c0e"
        cryptoSignatureType: SR25519
    )
}
```
```json Response
{
  "data": {
    "VerifyMessage": true
  }
}
```

### Use Case:

- **Message Authentication**: You can use the `VerifyMessage` query to ensure the authenticity and integrity of messages exchanged between parties. This is crucial for secure communication, as it verifies that the message has not been tampered with and confirms the identity of the sender.
- **Secure Login**: Utilize this query for message verification to confirm wallet ownership, authenticate user identity, and facilitate secure logins to games or applications.
- **Cryptographic Security**: It is essential for cryptographic security, as it ensures that messages are not susceptible to unauthorized modification or impersonation.

To use this query effectively, provide the necessary parameters: the original message, the cryptographic signature, the corresponding public key, and the type of cryptographic signature used. The response will inform you whether the message's signature is valid, helping you maintain the security and authenticity of your communications or authentication processes.

## GetPendingWallets

The `GetPendingWallets` query is used to retrieve an array of wallet accounts that have not yet undergone the verification process. This query is particularly useful for administrators and account management systems to identify and handle pending wallet accounts that require verification.

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
```json Response
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

### Use Case:

- **Account Verification Management**: You can use the `GetPendingWallets` query to manage the verification process of wallet accounts. By retrieving a list of pending wallets, you can prioritize and streamline the verification workflow.
- **Administrative Tasks**: As an administrator, you can monitor and keep track of wallet accounts that require attention. This is essential for maintaining the security and integrity of your application.
- **Security Audits**: Use this query to perform security audits and identify accounts that need additional verification steps before they are allowed to transact or access certain features.

To utilize this query effectively, you do not need to provide any parameters. The response will contain all the relevant information about pending wallet accounts, allowing you to take appropriate actions to verify and manage these accounts within your system.

# Mutations

## CreateWallet

The `CreateWallet` mutation in is used to create a new wallet on the blockchain using an external identifier (external ID). This allows you to associate a wallet with an entity on the Enjin Platform.

```graphql
mutation CreateWallet {
    CreateWallet(
        externalId: "e73f9f38-6832-4822-922b-b9225245ba24"
    )
}
```
```json Response
{
  "data": {
    "CreateWallet": true
  }
}
```

### Use Case:

- **You** can use the `CreateWallet` mutation in various scenarios, including:
  - **User Sign-Up**: When a new user signs up and provides wallet information that needs to be stored for future verification.
  - **Integration with External Systems**: When integrating wallets from external systems or applications into your platform, you can first store their records using external IDs before performing additional verification checks.
  - **Multi-Step Wallet Creation**: In cases where wallet creation involves multiple steps, you can create an initial wallet record with minimal details and later update it with more information as the user progresses through the steps.

This mutation is a foundational step in managing wallets. It allows you to establish a connection between wallets and external entities or users, facilitating further actions and verifications.

## SetWalletAccount

The `SetWalletAccount` mutation is used to associate an existing wallet account on the Enjin Platform with a game developer's external ID. This action links the user's wallet on the Enjin Platform to an external ID stored in the game developer's database, allowing the identification of a player's wallet within the Enjin Platform.

```graphql
mutation SetWalletAccount{
    SetWalletAccount(
        externalId: "ZMMP0FCq6NEKphFlNfESdbC81BXWebNHUiguJvFsb5dVnthIvBbFAaNfCE3mOJREDPS5lwWN4sDQXDV61fqRWUKVSeq4ItavScDS"
        account: "cxLc8HSeuiLiYmEG7XB8wQrbkRPNCaDi5dVpqPkyhWdEp6i63"
    )
}
```
```json Response
{
  "data": {
    "SetWalletAccount": true
  }
}
```

### Use Case:

You can utilize the `SetWalletAccount` mutation in various scenarios:

- **Player Identification**: Game developers can use this mutation to link a player's wallet on the Enjin Platform with their own external ID. This allows the game developer to identify and manage player wallets within their game ecosystem.

- **User Profile Integration**: When integrating player profiles from a game developer's database with the Enjin Platform, this mutation enables the seamless connection of wallet accounts to player records.

- **Custom Player Management**: Game developers can implement custom player management features by associating Enjin Platform wallet accounts with their internal player records, facilitating personalized gaming experiences.

To use this mutation effectively, provide the `externalId` parameter to specify the unique identifier in the game developer's database, and the `account` parameter, representing the blockchain address of the existing wallet account on the Enjin Platform to be associated with the external ID. The response will indicate whether the association was successful (`true`) or not (`false`).

## VerifyAccount

The `VerifyAccount` mutation is used by a wallet to confirm the ownership of a user account. This security measure ensures that actions performed on the account are authorized by the legitimate owner, enhancing the overall security and trustworthiness of the system.

```graphql
mutation VerifyAccount{
    VerifyAccount(
        verificationId: "0xfdb976d1c5fc9ed6d546f31332e756ca9c9ef6e3c6f0d9ea0ed0713b1cd84440"
        signature: "0x8958f002f9513256fa329fa92441d39adc59e3a19165aeeb343acd72b7f6a"
        account: "0xbeac4e574b46a3722da9239f97359b0440c0fb66e3b130f20c2284fd033f9138"
        
    )
}
```
```json Response
{
  "data": {
    "VerifyAccount": true
  }
}
```

### Use Case:

- **Enhanced Security**: You can utilize the `VerifyAccount` mutation to enhance the security of your application by ensuring that sensitive operations, such as transactions or account changes, are performed exclusively by the rightful owner of the account.

To use this mutation effectively, the wallet must provide the `verificationId`, `signature`, and `account` parameters. The response will indicate whether the account has been successfully verified (`true`) or if the verification has failed (`false`), allowing you to take appropriate actions based on the verification status.

## UpdateWalletExternalId

The `UpdateWalletExternalId` mutation is used to update the external ID associated with a wallet account on the Enjin Platform. This action allows you to change the reference or identifier linked to a user's wallet within the Enjin Platform.

```graphql
mutation UpdateWalletExternalId{
    UpdateWalletExternalId(
        id: 8466
        newExternalId: "35b409dc-4f3f-41da-8d94-7635ef2a5853"
    )
}
```
```json Response
{
  "data": {
    "UpdateWalletExternalId": true
  }
}
```

### Use Case:

You can utilize the `UpdateWalletExternalId` mutation in various scenarios:

- **External ID Modification**: When you need to change the reference or identifier linked to a user's wallet on the Enjin Platform, you can use this mutation to update the external ID.

- **User Profile Maintenance**: Game developers or platform administrators can employ this mutation to maintain and manage user profiles, ensuring that the external IDs associated with wallet accounts remain up-to-date.

- **Database Synchronization**: If there are changes in the game developer's database, such as updates to user records or identifiers, this mutation can be used to synchronize those changes with the Enjin Platform.

To use this mutation effectively, provide the `id` parameter to specify the unique identifier of the wallet account you want to update, and the `newExternalId` parameter to specify the new external ID that will replace the previous one. The response will indicate whether the update was successful (`true`) or not (`false`).