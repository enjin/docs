---
title: "Fuel Tanks"
slug: "fuel-tanks"
excerpt: "Operations to help you create and manage fuel tanks."
hidden: false
createdAt: "Wed Nov 08 2023 00:39:06 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 20 2023 22:14:23 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Please note: This is an introductory reference
> 
> For the most up-to-date information, refer to the [GraphQL Playground](https://platform.canary.enjin.io/graphiql) and [Apollo API Reference](https://studio.apollographql.com/public/EnjinPlatform/variant/core/home).
> 
> 🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.

> 👍 Fuel Tanks Endpoints
> 
> - **Testnet:** `http://platform.canary.enjin.io/graphql/fuel-tanks`
> - **Mainnet:** `http://platform.enjin.io/graphql/fuel-tanks`

This is a detailed reference guide that explains the most commonly used operations.

# Queries

## GetAccounts

The `GetAccounts` query allows you to retrieve a comprehensive list of account details associated with a specific fuel tank in the Enjin API. Fuel tanks are a feature used to subsidize transaction fees on the Enjin Blockchain. This query provides a detailed overview of all accounts participating in the specified fuel tank.

```graphql
query GetAccounts {
  GetAccounts(tankId: "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92") {
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
        externalId
        account {
          publicKey
          address
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetFuelTanks": {
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
            "name": "lhjb4xu2",
            "providesDeposit": false,
            "tankId": {
              "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
              "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
            },
            "owner": {
              "account": {
                "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
              }
            },
            "accounts": [
              {
                "id": 8177,
                "account": {
                  "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                  "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
                },
                "externalId": null
              }
            ],
            "accountRules": [],
            "dispatchRules": []
          }
        }
      ]
    }
  }
}
```

### Use Case:

- **Account Overview**: You can utilize the `GetAccounts` query to obtain a comprehensive overview of all accounts participating in a specific fuel tank. This information is valuable for monitoring usage patterns, conducting transaction audits, and efficiently managing the fuel tank.
- **Administrative Tasks**: As an administrator, you can use this query to gain insights into the accounts within the fuel tank, facilitating effective account management and maintenance.
- **Transaction Analysis**: The query provides essential data for analyzing transactions associated with the fuel tank's accounts, ensuring transparency and accountability in transaction fee subsidization.

To make use of this query, provide the `tankId` of the desired fuel tank for which you want to retrieve account details. The response will include a structured list of participating accounts, allowing you to work with the data as needed.

## GetFuelTank

The `GetFuelTank` query allows you to retrieve detailed information about a specific fuel tank within the Enjin API. Fuel tanks are utilized for subsidizing transaction fees on the Enjin Blockchain. This query provides an extensive overview of the fuel tank's configuration, ownership, and associated rules.

```graphql
query GetFuelTank {
  GetFuelTank(tankId: "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92") {
    name
    providesDeposit
    tankId {
      publicKey
      address
    }
    owner {
      account {
        publicKey
        address
      }
    }
    accounts {
      id
      account {
        publicKey
        address
      }
      externalId
    }
    accountRules {
      rule
      value
    }
    dispatchRules {
      rule
      value
      isFrozen
    }
  }
}
```
```json Response
{
  "data": {
    "GetFuelTank": {
      "name": "lhjb4xu2",
      "providesDeposit": false,
      "tankId": {
        "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
        "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
      },
      "owner": {
        "account": {
          "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
          "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
        }
      },
      "accounts": [
        {
          "id": 8177,
          "account": {
            "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
            "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
          },
          "externalId": null
        }
      ],
      "accountRules": [],
      "dispatchRules": []
    }
  }
}
```

### Use Case:

- **Fuel Tank Management**: The `GetFuelTank` query is essential for managing and overseeing the configuration of a specific fuel tank. It provides detailed insights into the tank's name, ownership, deposit policies, associated accounts, and rule sets.
- **Strategic Decision-Making**: Users, especially administrators, can use this query to make strategic decisions about how the fuel tank operates. It helps in assessing security, compliance, and overall functionality.
- **Comprehensive Overview**: Unlike the `GetAccounts` query, which primarily focuses on the accounts within the fuel tank, `GetFuelTank` offers a broader and more configuration-centric overview of the entire fuel tank setup. It is valuable for understanding not only who is participating but also how the tank is configured and managed.

To utilize this query, provide the `tankId` of the desired fuel tank for which you want to retrieve detailed information. The response will provide a comprehensive snapshot of the specified fuel tank's configuration and operation, aiding in effective management and decision-making.

## GetFuelTanks

The `GetFuelTanks` query allows you to retrieve detailed information about multiple fuel tanks within the Enjin API simultaneously. This query is particularly useful when you need to obtain an overview or compare details of various fuel tanks within a system.

> 🚧 This query might return items in multiple pages using Connections
> 
> To learn how to use GraphQL cursors for pagination, head to [Using the API --> Pagination](doc:using-graphql#pagination).

```graphql
query GetFuelTanks{
  GetFuelTanks(tankIds: ["0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276"]) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        name
        providesDeposit
        tankId {
          publicKey
          address
        }
        owner {
          account {
            publicKey
            address
          }
        }
        accounts {
          id
          account {
            publicKey
            address
          }
          externalId
        }
        accountRules {
          rule
          value
        }
        dispatchRules {
          rule
          value
          isFrozen
        }
      }
    }
  }
}
```
```json Response
{
  "data": {
    "GetFuelTanks": {
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
            "name": "lhjb4xu2",
            "providesDeposit": false,
            "tankId": {
              "publicKey": "0xa6b0ba89304439830fa19e0523ad8afa4180bb0960d35a80b7423836dd7b1276",
              "address": "cxNC9WmJa55k3EoXS3Fm4Bc69NaMGuY7qarchqPPn6jcWMA92"
            },
            "owner": {
              "account": {
                "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
              }
            },
            "accounts": [
              {
                "id": 8177,
                "account": {
                  "publicKey": "0x087c3fdc6566230578362759d99e42ed300f5560c305262843b2c61aa2f1d11e",
                  "address": "cxJciMkfdBqR8C9ftA8qmgzP9bAQNzMzXZmwUDZ2qW5mFVgvm"
                },
                "externalId": null
              }
            ],
            "accountRules": [],
            "dispatchRules": []
          }
        }
      ]
    }
  }
}
```

### Use Case:

- **Fuel Tank Management**: The `GetFuelTanks` query is valuable for managing and overseeing multiple fuel tanks within a system. It allows you to retrieve comprehensive data for multiple tanks in a single request, providing an efficient way to monitor and compare their configurations, rules, and ownership.
- **Comparison and Analysis**: Users, especially administrators, can use this query to compare configurations and rules across different fuel tanks, making it easier to assess similarities and differences. It is particularly useful for analyzing and auditing multiple fuel tanks in bulk.

To utilize this query, provide an array of `tankIds` representing the fuel tanks for which you want to retrieve detailed information. The response will provide a comprehensive snapshot of each specified fuel tank's configuration and operation, allowing you to efficiently manage and analyze multiple tanks in your system.

# Mutations

## CreateFuelTank

The `CreateFuelTank` mutation is used to create a new fuel tank within a system, allowing you to establish specific attributes and rules that govern how accounts can be added and how transactions are dispatched from it. This mutation is a fundamental step in setting up the infrastructure for managing accounts and transactions within a network, providing a customizable framework to tailor the tank's behavior to your specific requirements.

```graphql
mutation AddAccount {
  AddAccount(
    tankId: "cxNkbpQpiiza3JCH9fxmt6eJ8vDSFqzqVfz2a543QbPG4sN9K"
    userId: "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
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
mutation CreateFuelTank {
  CreateFuelTank(
    name: "My Fuel Tank"
    reservesExistentialDeposit: false
    reservesAccountCreationDeposit: false
    providesDeposit: false
    accountRules: {requireToken: {collectionId: "7406", tokenId: {integer: 5839}}, whitelistedCallers: ["0x66f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009"]}
    dispatchRules: [{requireToken: {collectionId: "7406", tokenId: {integer: 5839}}, whitelistedCallers: ["0x66f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009"], whitelistedCollections: null, maxFuelBurnPerTransaction: 0, userFuelBudget: {amount: 1, resetPeriod: 1}, tankFuelBudget: {amount: 1, resetPeriod: 1}}]
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

### Use Case:

- **Fuel Tank Creation**: You can use the `CreateFuelTank` mutation when you need to establish a new fuel tank. This is a crucial step in configuring the tank's behavior, specifying rules, and defining its role in managing transactions and accounts.
- **Customized Transaction Environment**: By providing parameters like `accountRules`, `dispatchRules`, and budget details, you can customize the fuel tank's behavior to suit your specific transactional requirements. For example, you can set token requirements, whitelist specific callers, and define transaction limits.
- **Idempotent Requests**: The `idempotencyKey` ensures that repeated requests with the same key do not result in duplicate fuel tank creations, maintaining consistency in your system.

To create a fuel tank, provide the necessary parameters, execute the `CreateFuelTank` mutation, and receive a response that includes the initial state of the request and placeholders for transaction-related information, which will be updated as the process progresses. This mutation forms the foundation for configuring and managing fuel tanks within your network.

## DestroyFuelTank

The `DestroyFuelTank` mutation is used to permanently remove an existing fuel tank from the system. This operation is essential for efficient resource management, allowing you to clean up unused or unnecessary fuel tanks within your network infrastructure.

```graphql
mutation DestroyFuelTank {
  DestroyFuelTank(tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr") {
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
    "DestroyFuelTank": {
      "id": 11280,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x360d009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d",
      "method": "DestroyFuelTank",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "4c0440c5-340f-4de6-a3df-49f464f46656"
    }
  }
}
```

### Use Case:

- **Fuel Tank Cleanup**: You can use the `DestroyFuelTank` mutation when you need to permanently remove an existing fuel tank that is no longer needed in your system. This operation helps in freeing up valuable resources and ensuring that only relevant and active fuel tanks remain operational.
- **Resource Efficiency**: By regularly cleaning up unused or obsolete fuel tanks, you can maintain the efficiency and cost-effectiveness of your network infrastructure. It also reduces clutter and simplifies the management of fuel tanks.
- **Transaction Record**: The response provides transaction-related information, such as `transactionId` and `transactionHash`, allowing you to track the progress and completion of the destroy operation.
- **Idempotency**: The `idempotencyKey` ensures that if you accidentally submit the same destroy request multiple times, it will not result in duplicate operations, maintaining the integrity of your system.

To destroy a fuel tank, provide the `tankId` parameter, execute the `DestroyFuelTank` mutation, and receive a response that includes the status of the destroy request and relevant transaction details. This mutation is a valuable tool for managing your network's resources effectively.

## AddAccount

The `AddAccount` mutation is used to add a new account to an existing fuel tank. This operation is crucial when you need to grant access to specific users, allowing them to utilize the resources and perform authorized actions within the fuel tank.

```graphql
mutation AddAccount {
  AddAccount(
    tankId: "cxNkbpQpiiza3JCH9fxmt6eJ8vDSFqzqVfz2a543QbPG4sN9K"
    userId: "cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts"
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
    "AddAccount": {
      "id": 11249,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x360200bf71212e94365d5d3c5e7b2700a3bb9e2a19016b6502f625162024eb87fdcf7c00985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d050",
      "method": "AddAccount",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "da44d553-6a39-460b-9dd8-b35c6984016c"
    }
  }
}
```

### Use Case:

- **User Access Control**: You can use the `AddAccount` mutation when you want to grant access to a specific user, allowing them to interact with a particular fuel tank. This enables dynamic access control without manual intervention.
- **Automated User Management**: By using this mutation, you automate the process of adding users to fuel tanks on a per-tank basis, streamlining the management of user access.
- **Access Tracking and Auditing**: The mutation allows you to track and audit changes to the access list of a fuel tank, ensuring transparency and accountability in user management.

To add a new account to a fuel tank, provide the `tankId` and `userId` parameters, execute the `AddAccount` mutation, and receive a response with details about the transaction and the added account. This mutation simplifies user management within your network.

## BatchAddAccount

The `BatchAddAccount` mutation is designed for efficiently adding multiple new user accounts to a specified fuel tank in a single batch operation. This feature is particularly useful when you need to add several accounts at once, reducing the number of individual requests and optimizing resource usage.

```graphql
mutation BatchAddAccount {
  BatchAddAccount(tankId: "cxNkbpQpiiza3JCH9fxmt6eJ8vDSFqzqVfz2a543QbPG4sN9K", userIds: ["cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts","cxLc8HSeuiLiYmEG7XB8wQrbkRPNCaDi5dVpqPkyhWdEp6i63"]) {
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
    "BatchAddAccount": {
      "id": 11256,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x360a00bf71212e94365d5d3c5e7b2700a3bb9e2a19016b6502f625162024eb87fdcf7c0800985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d0500060820310ea5b09bef944c50a7f3ae82166304dd637263b1ba7e0fa0bab1f3f7b",
      "method": "BatchAddAccount",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "76f65815-8743-4ab9-8e01-b3fc62137337"
    }
  }
}
```

### Use Case:

- **Efficient User Management**: You can utilize the `BatchAddAccount` mutation when you need to efficiently manage multiple user accounts within a specific fuel tank. This batch operation reduces the number of requests, saving time and resources.
- **Cost and Resource Optimization**: In systems where transaction costs or processing times are significant factors, using `BatchAddAccount` can be cost-effective and resource-efficient. Instead of sending multiple individual requests, you streamline the process with a single batch request.
- **Bulk User Access**: When you want to grant access to multiple users simultaneously, such as in a shared resource environment, `BatchAddAccount` simplifies the task of adding multiple accounts to a fuel tank, ensuring that access is granted efficiently.

To add multiple new user accounts to a fuel tank, provide the `tankId` and an array of `userIds` as parameters, execute the `BatchAddAccount` mutation, and receive a response with details about the batch operation. This batch operation is a valuable tool for managing access control efficiently within your system.

## BatchRemoveAccount

The `BatchRemoveAccount` mutation is designed for efficiently removing multiple user accounts from a specified fuel tank in a single batch operation. This feature is particularly useful when you need to remove several accounts at once, reducing the number of individual removal requests and optimizing resource usage.

```graphql
mutation BatchRemoveAccount {
  BatchRemoveAccount(tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr", userIds: ["cxLkamf2QxHK9bcqhh56QAFc8TTmvWG33sUbkNakJV4yzdDcz"]) {
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
    "BatchRemoveAccount": {
      "id": 11279,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x360b009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d040066f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009",
      "method": "BatchRemoveAccount",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "af81b86e-2a71-4cf7-8784-60b777fed366"
    }
  }
}
```

### Use Case:

- **Efficient User Management**: You can utilize the `BatchRemoveAccount` mutation when you need to efficiently manage the removal of multiple user accounts from a specific fuel tank. This batch operation reduces the number of removal requests, saving time and resources.
- **Access Revocation**: When you want to revoke access for multiple users simultaneously, such as in cases where users no longer need access or during user clean-up, `BatchRemoveAccount` simplifies the process of removing multiple accounts from a fuel tank efficiently.
- **Maintenance and Cleanup**: `BatchRemoveAccount` is valuable for maintaining fuel tank user lists by enabling the removal of multiple accounts at once. It helps ensure that only authorized and necessary users have access to the fuel tank.

To remove multiple user accounts from a fuel tank, provide the `tankId` and an array of `userIds` as parameters, execute the `BatchRemoveAccount` mutation, and receive a response with details about the batch removal operation. This batch operation is a valuable tool for efficiently managing user access control within your system.

## Dispatch

The `Dispatch` mutation is a powerful operation that allows you to trigger specific actions within a system using a designated fuel tank (`tankId`) while adhering to predefined rules specified by a rule set (`ruleSetId`). This mutation is especially useful when you want the fuel tank to handle transaction fees and potentially storage deposits for the dispatched call.

```graphql
mutation Dispatch {
  Dispatch(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 0
    dispatch: {
      call:FUEL_TANKS
      query:"mutation { AddAccount(tankId: \"cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr\", userId: \"cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts\") { id encodedData } }"
      variables:null
    }
    paysRemainingFee: false
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
    "Dispatch": {
      "id": 11286,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3605009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d000000003602009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d00985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d05000",
      "method": "Dispatch",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "850956b8-b9e9-4e2d-98f4-ae7775e2d066"
    }
  }
}
```

### Use Case:

- **Automated Workflows**: You can utilize the `Dispatch` mutation in automated systems where specific actions need to be triggered on behalf of users or automated accounts. This is particularly valuable when you want the fuel tank to handle the associated costs.
- **Cost Attribution**: `Dispatch` enables complex workflows by allowing the fuel tank to assume the cost of the operation. This ensures that the execution of commands is automated while adhering to established rules and protocols.
- **Transaction Fee Management**: When you need to automate actions and ensure that transaction fees are covered, `Dispatch` provides the means to handle these aspects seamlessly.

To use `Dispatch`, provide the `tankId`, `ruleSetId`, `dispatch` object with the call details, and optionally set `paysRemainingFee`. Execute the mutation and receive a response with information about the dispatch operation. This mutation empowers you to automate and streamline complex operations within your system while maintaining compliance with established rules.

## DispatchAndTouch

The `DispatchAndTouch` mutation combines the functionalities of the `Dispatch` mutation with the ability to create an account for the calling entity (`origin`) if it doesn't already exist. This mutation is especially valuable in scenarios where the caller's account may not have been set up in advance, streamlining the process of both executing an operation and ensuring account existence.

```graphql
mutation DispatchAndTouch {
  DispatchAndTouch(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 0
    dispatch: {
      call:FUEL_TANKS
      query:"mutation { AddAccount(tankId: \"cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr\", userId: \"cxMsNPRk7Ek5V76NC4o2HTBrnxcUnxLA9btuKPcuPkmYi84Ts\") { id encodedData } }"
      variables:null
    }
    paysRemainingFee: false
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
    "DispatchAndTouch": {
      "id": 11284,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3606009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d000000003602009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d00985e66eaff2d50e6635942b20efb5690191c5da56adc3a2720e64b8bf534d05000",
      "method": "DispatchAndTouch",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "a9e62906-ac2f-4454-b17e-c0e5bf774da0"
    }
  }
}
```

### Use Case:

- **Automated Workflows**: You can utilize the `DispatchAndTouch` mutation in automated systems where specific actions need to be triggered, and you want to ensure that the caller has an account. This is particularly useful when the caller's account may not have been set up beforehand, as `DispatchAndTouch` can create it on the fly.
- **Account Creation Assurance**: `DispatchAndTouch` provides the assurance that the caller has an account, even if one didn't exist previously, streamlining the interaction process.
- **Cost and Account Management**: It allows you to manage both the costs associated with operations and the creation of accounts within the parameters set by the fuel tank's `user_account_management` settings. If account creation is not allowed, `DispatchAndTouch` will handle the necessary checks and notify you accordingly.

To use `DispatchAndTouch`, provide the `tankId`, `ruleSetId`, `dispatch` object with the operation details, and optionally set `paysRemainingFee`. Execute the mutation, and receive a response with information about the dispatch operation and account creation. This mutation simplifies workflows by automating both the execution of operations and the account setup, ensuring smooth interactions within your system.

## SetConsumption

The `SetConsumption` mutation enables you to manually set the fuel consumption for a specific fuel tank. It allows you to override the current fuel consumption data with the values provided in the mutation arguments. This can be useful for making adjustments, corrections, or administrative changes to fuel consumption records.

```graphql
mutation SetConsumption {
  SetConsumption(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 0
    userId: "cxLkamf2QxHK9bcqhh56QAFc8TTmvWG33sUbkNakJV4yzdDcz"
    totalConsumed: 10
    lastResetBlock: 100
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
    "SetConsumption": {
      "id": 11287,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x360c009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d010066f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f64600900000000280164000000",
      "method": "SetConsumption",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "9bc5fc3d-d5d2-415c-a0bf-96e5de529502"
    }
  }
}
```

### Use Case:

The `SetConsumption` mutation serves various purposes and can be particularly valuable in scenarios such as:

- **Manual Adjustments**: When you need to manually adjust fuel consumption to regulate usage.
- **Administrative Overrides**: For administrative purposes, you can use `SetConsumption` to override consumption data, making it useful for any situation where you need to take control of consumption rates.

To use `SetConsumption`, provide the `tankId`, `ruleSetId`, `userId`, `totalConsumed`, and `lastResetBlock`. Execute the mutation to set the desired consumption data. This mutation offers flexibility in managing fuel consumption records and allows you to make precise adjustments when needed.

## InsertRuleSet

The `InsertRuleSet` mutation is used to add a new rule set to a fuel tank. It allows you to define specific rules and requirements for the fuel tank's operation.

```graphql
mutation InsertRuleSet {
  InsertRuleSet(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 1
    dispatchRules: { requireToken: {collectionId: "7153", tokenId: {integer: 68}} }
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
    "InsertRuleSet": {
      "id": 11288,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3608009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d0100000000",
      "method": "InsertRuleSet",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "2ed39eca-dc04-408d-ac99-1b44c19e2e90"
    }
  }
}
```

### Use Case:

The `InsertRuleSet` mutation is valuable for scenarios where you need to define and add new rule sets to fuel tanks. It allows you to set specific requirements and conditions for how the fuel tank should operate.

Here's how you can use it:

- **Adding Custom Rules**: You can use `InsertRuleSet` to insert custom rule sets that dictate how the fuel tank should behave in different situations.
- **Defining Requirements**: You can specify requirements such as the need for a particular token collection and token ID, ensuring that the fuel tank follows specific criteria.
- **Tracking Progress**: The mutation provides feedback on the state and details of the insertion, helping you monitor the progress and outcome of the operation.

By adding new rule sets, you can tailor the behavior of the fuel tank to suit your specific use cases and requirements, providing flexibility and control over its operations.

## MutateFuelTank

The `MutateFuelTank` mutation is used to apply a specific mutation to a fuel tank. This mutation allows you to modify the characteristics or attributes of the fuel tank.

```graphql
mutation MutateFuelTank {
  MutateFuelTank(tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr", mutation: {reservesExistentialDeposit:true}) {
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
    "MutateFuelTank": {
      "id": 11289,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3601009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d010101000000",
      "method": "MutateFuelTank",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "a9a00d98-9f66-4dd1-a9e5-d4b6d42e556f"
    }
  }
}
```

### Use Case:

The `MutateFuelTank` mutation is valuable for scenarios where you need to modify specific attributes or characteristics of a fuel tank. It allows you to define the nature of the mutation you want to perform, such as changing the existence of reserves.

Here's how you can use it:

- **Custom Mutations**: You can use `MutateFuelTank` to apply custom mutations to fuel tanks, altering their behavior or properties as needed.
- **Track Progress**: The mutation provides feedback on the state and details of the mutation, helping you monitor the progress and outcome of the operation.

By applying specific mutations to fuel tanks, you can tailor their functionality to suit your specific use cases and requirements, providing flexibility and control over their attributes.

## RemoveAccount

The `RemoveAccount` mutation is used to remove a specified user account from a fuel tank. This mutation is particularly useful for managing the accounts associated with a fuel tank.

```graphql
mutation RemoveAccount {
  RemoveAccount(tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr", userId: "cxLkamf2QxHK9bcqhh56QAFc8TTmvWG33sUbkNakJV4yzdDcz") {
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
    "RemoveAccount": {
      "id": 11291,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3603009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d0066f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f646009",
      "method": "RemoveAccount",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "c63c8c9d-3fcb-412a-afac-703da5c2b145"
    }
  }
}
```

### Use Case:

The `RemoveAccount` mutation is valuable for scenarios where you need to manage the user accounts associated with a fuel tank. It allows you to specify which account should be removed from the fuel tank, providing control and flexibility over the accounts.

Here's how you can use it:

- **Account Management**: You can use `RemoveAccount` to remove specific user accounts from a fuel tank, ensuring that only authorized users have access.
- **Track Progress**: The mutation provides feedback on the state and details of the removal, helping you monitor the progress and outcome of the operation.

By using this mutation, you can effectively manage the accounts linked to a fuel tank, ensuring security and compliance with your application's requirements.

## RemoveAccountRuleData

The `RemoveAccountRuleData` mutation is used to delete specific rule data associated with an account on a fuel tank. This allows you to remove certain restrictions or requirements that were previously set for an account's interactions with the fuel tank.

```graphql
mutation RemoveAccountRuleData {
  RemoveAccountRuleData(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 0
    userId: "cxLkamf2QxHK9bcqhh56QAFc8TTmvWG33sUbkNakJV4yzdDcz"
    rule: REQUIRE_TOKEN
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
    "RemoveAccountRuleData": {
      "id": 11292,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3604009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d0066f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f6460090000000005",
      "method": "RemoveAccountRuleData",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "d3e79021-c7a4-4a28-a29d-effd90d95933"
    }
  }
}
```

### Use Case:

The `RemoveAccountRuleData` mutation is valuable for scenarios where you need to manage the rules associated with a user's account on a fuel tank. Here's how you can use it:

- **Rule Management**: You can use `RemoveAccountRuleData` to delete specific rules that have been applied to a user's interactions with a fuel tank. This allows you to adjust the permissions or operational rules as needed.
- **Compliance**: If certain rules are no longer applicable or need to be updated to comply with changing policies or requirements, you can remove them using this mutation.
- **Customization**: This mutation provides flexibility in managing account-specific rules, allowing you to tailor the user experience and permissions.

By using `RemoveAccountRuleData`, you can effectively manage the rules and requirements associated with user accounts on a fuel tank, ensuring that the system operates according to your desired policies and compliance standards.

## RemoveRuleSet

The `RemoveRuleSet` mutation is utilized to completely remove an existing set of rules from a specified fuel tank. Rule sets represent collections of conditions or constraints that govern the usage and access to the fuel tank. Removing a rule set becomes necessary when you need to modify operational policies, or a rule set is no longer applicable to the fuel tank's operations.

```graphql
mutation RemoveRuleSet {
  RemoveRuleSet(tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr", ruleSetId: 0) {
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
    "RemoveRuleSet": {
      "id": 11293,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3609009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d00000000",
      "method": "RemoveRuleSet",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "6f05d6c2-69ee-42ca-8a5c-f55c8a34da8b"
    }
  }
}
```

### Use Case:

The `RemoveRuleSet` mutation is valuable for various scenarios:

- **Simplification**: You can use it to simplify or reduce the complexity of the operational rules associated with a fuel tank.
- **Regulatory Compliance**: It allows you to adapt to regulatory changes that may require the removal of specific rules that are no longer compliant.
- **Transitioning**: When preparing to implement a new rule set, you can remove the old one to ensure a clean slate for the new rules.

This mutation is broader in scope compared to `RemoveAccountRuleData` as it removes an entire set of rules, potentially affecting all users and transactions associated with the fuel tank. It's about overhauling or discontinuing a whole set of operational constraints, rather than fine-tuning individual permissions.

## ScheduleMutateFreezeState

The `ScheduleMutateFreezeState` mutation enables you to schedule a change in the `is_frozen` state of either a fuel tank or a rule set. This state determines whether the tank or rule set can be frozen (immobilized), preventing any operations that could alter its configuration or state.

```graphql
mutation ScheduleMutateFreezeState {
  ScheduleMutateFreezeState(
    tankId: "cxMyyy9aiu8Wv8PDtnjkuSKzJ7n854hQNcNETZiHVS3s3xPhr"
    ruleSetId: 0
    isFrozen: true
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
    "ScheduleMutateFreezeState": {
      "id": 11294,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3607009d69a6f1d45b1dabfcc1a365292753663444bdacb429035b26dac32660dca60d010000000001",
      "method": "ScheduleMutateFreezeState",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      },
      "idempotencyKey": "e2609c5a-7b0d-4f1a-88c8-cf92c9491549"
    }
  }
}
```

### Use Case:

The `ScheduleMutateFreezeState` mutation is valuable for various scenarios:

- **Emergency Suspension**: You can use it to immediately suspend tank or rule set activities in emergency situations, preventing unwanted transactions.
- **Maintenance**: During maintenance periods, you can freeze tanks or rule sets to make changes without external interference.
- **Administrative Control**: It allows you to temporarily halt operations for administrative reasons without permanently altering or removing configurations.

This mutation provides control over the freeze state of tanks and rule sets, offering flexibility in managing the accessibility and operability of your fuel tank system.