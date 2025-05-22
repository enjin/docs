---
title: "Fuel Tanks"
slug: "fuel-tanks"
description: "Use the Enjin API to perform fuel tanks mutations, including setting up and managing transaction cost coverage for users on the blockchain."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Fuel Tanks Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql/fuel-tanks`
- **Mainnet:** `http://platform.enjin.io/graphql/fuel-tanks`
:::

This is a detailed reference guide that explains the most commonly used operations.

## CreateFuelTank

The `CreateFuelTank` mutation is used to create a new fuel tank within a system, allowing you to establish specific attributes and rules that govern how accounts can be added and how transactions are dispatched from it. This mutation is a fundamental step in setting up the infrastructure for managing accounts and transactions within a network, providing a customizable framework to tailor the tank's behavior to your specific requirements.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateFuelTank {
  CreateFuelTank(
    name: "My Fuel Tank"
    coveragePolicy: FEES_AND_DEPOSIT
    reservesAccountCreationDeposit: false
    requireAccount: true
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateFuelTank": {
      "id": 379503,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3600404d79204675656c2054616e6b203132330100040000000014000466f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f64600905ee1c0000000000000000000000000000cf1600000000000000000000000000000200000000000000000000000000000000030401000000040401000000010108000466f522f1e17f25b3942916dcc60d92f0f8bc27d40083fadf5d65e9dd5f64600901ee1c0000000000000000000000000000cf160000000000000000000000000000",
      "method": "CreateFuelTank",
      "wallet": null,
      "idempotencyKey": "ba66208f-d565-4605-bc6b-58756f88814e"
    }
  }
}
```
  </TabItem>
</Tabs>

## DestroyFuelTank

The `DestroyFuelTank` mutation is used to permanently remove an existing fuel tank from the system. This operation is essential for efficient resource management, allowing you to clean up unused or unnecessary fuel tanks within your network infrastructure.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## AddAccount

The `AddAccount` mutation is used to add a new account to an existing fuel tank. This operation is crucial when you need to grant access to specific users, allowing them to utilize the resources and perform authorized actions within the fuel tank.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## BatchAddAccount

The `BatchAddAccount` mutation is designed for efficiently adding multiple new user accounts to a specified fuel tank in a single batch operation. This feature is particularly useful when you need to add several accounts at once, reducing the number of individual requests and optimizing resource usage.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## BatchRemoveAccount

The `BatchRemoveAccount` mutation is designed for efficiently removing multiple user accounts from a specified fuel tank in a single batch operation. This feature is particularly useful when you need to remove several accounts at once, reducing the number of individual removal requests and optimizing resource usage.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## Dispatch

The `Dispatch` mutation is a powerful operation that allows you to trigger specific actions within a system using a designated fuel tank (`tankId`) while adhering to predefined rules specified by a rule set (`ruleSetId`). This mutation is especially useful when you want the fuel tank to handle transaction fees and potentially storage deposits for the dispatched call.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## DispatchAndTouch

The `DispatchAndTouch` mutation combines the functionalities of the `Dispatch` mutation with the ability to create an account for the calling entity (`origin`) if it doesn't already exist. This mutation is especially valuable in scenarios where the caller's account may not have been set up in advance, streamlining the process of both executing an operation and ensuring account existence.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## SetConsumption

The `SetConsumption` mutation enables you to manually set the fuel consumption for a specific fuel tank. It allows you to override the current fuel consumption data with the values provided in the mutation arguments. This can be useful for making adjustments, corrections, or administrative changes to fuel consumption records.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## InsertRuleSet

The `InsertRuleSet` mutation is used to add a new rule set to a fuel tank. It allows you to define specific rules and requirements for the fuel tank's operation.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

### Rules

When a call is made to a fuel tank, it must be made in accordance with a set of rules. These rules, known as rule sets, can include multiple individual rules that determine the validity of the call. A fuel tank can have multiple rule sets, each of which controls access and permissions to the fuel tank's functionality and resources.

##### Whitelisted Callers

Whitelisted callers are accounts that are explicitly granted permission to make calls to a fuel tank. Any calls made by accounts not on the whitelist will be rejected and fail.

##### Whitelisted Collections

Whitelisted collections refer to a list of specific collections allowed to be called by dispatch on a fuel tank. If a dispatch call is made to any collection, not on the whitelist, it will be rejected and fail. This ensures that calls are only made to the specific collections authorized to be accessed.

##### Max Fuel Burn Per Transaction

It is a setting that limits the amount of fuel that can be consumed in a single transaction. It is a safety measure that helps prevent misuse and overuse of the fuel tank's resources by ensuring that a single transaction doesn't consume too much fuel, which is important to ensure a sustainable network.

##### User Fuel Budget

A user fuel budget is the total amount of fuel allocated to a specific user across all rule sets of a fuel tank. It sets a limit on the amount of fuel that can be consumed by a user's transactions. Once the user's fuel budget is exhausted, their transactions will fail until more fuel is added to their budget or their overall consumption is lowered , which is meant to avoid the overuse of resources and ensure a sustainable network.\*\*

##### Tank Fuel Budget

A tank fuel budget is the total amount of fuel allocated to a specific fuel tank across all its rule sets. It sets a limit on the amount of fuel that can be consumed by all transactions made through that tank. Once the tank's fuel budget is exhausted, all transactions will fail until more fuel is added to the tank's budget or overall consumption is lowered.

##### Require Token

The "Require token" setting indicates that a specific token must be held by the caller for their call to be accepted by the fuel tank. If the caller does not possess the required token, their call will be rejected and fail. This feature is intended to ensure that only users who hold the specified token can access the fuel tank's functions and resources.

##### Permitted Calls

Permitted calls refer to a list of specific function calls that are allowed to be made using this rule set. Any calls made to other functions will be rejected and fail. This ensures that only authorized calls can be made by the users, and also, by setting a boundary to what calls are allowed and what calls are not, it helps to protect the network from unwanted transactions that could impact negatively on the network.

##### Permitted Extrinsics

Permitted extrinsics refer to a list of specific extrinsics that are allowed to be made using this rule set. Any extrinsics that are not on the list will be rejected and fail. This feature is used to restrict access to specific functionality and resources on the network and ensure that only authorized calls can be made by users. When setting this rule, it's important to note that the parameters passed to the extrinsic do not affect the outcome, only the function name is considered.\*\*

##### Freezing

"Freezing" is a state where a fuel tank or a rule set is temporarily prevented from accepting calls or making changes. This means that while a fuel tank or rule set is frozen, no dispatches are allowed to occur on it. This is implemented as a safety measure to prevent accidental or malicious changes and to ensure that the fuel tank or rule set remains in a stable state until the freeze is lifted.

##### Descriptor

A descriptor is a list of all the data needed to create a fuel tank. It includes details such as the fuel tank's name, account management rules, rule sets and other configuration information related to the fuel tank. The descriptor acts as a blueprint that defines how the fuel tank is set up and how it will function. It contains all the information needed to create and configure the fuel tank, and can be used to modify the fuel tank's settings.

## MutateFuelTank

The `MutateFuelTank` mutation is used to apply a specific mutation to a fuel tank. This mutation allows you to modify the Fuel Tank configuration.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MutateFuelTank {
  MutateFuelTank(tankId: "cxLt3kZZHgz4pqGgaQWjxCRXGd81ey7YRwycGcRnZrNtfpbAs",
    mutation: {
      coveragePolicy: FEES_AND_DEPOSIT,
      reservesAccountCreationDeposit: true
      accountRules: {
        whitelistedCallers: [
          "cxKy7aqhQTtoJYUjpebxFK2ooKhcvQ2FQj3FePrXhDhd9nLfu",
          "cxKRcxyqEuj8qwS4qAmxZMLKNoMJPMhQBLhoQdKekubbo3BtP"
      	]
      }
    }
  ){
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "MutateFuelTank": {
      "id": 386329,
      "transactionId": null,
      "transactionHash": null,
      "state": "PENDING",
      "encodedData": "0x3601006ca6ae51167284d08d113d0d04dd502e7c827fff54d07c9215f601c202f335560101010101010400082c42a1565cf51b8c6ed5ac06ebb7c1c5999ff0076879fd1ba746c9b5d5029d3644479350952f776be51e7b79010a71203cb18d805fbaaf64990ae40790007525",
      "method": "MutateFuelTank",
      "wallet": null,
      "idempotencyKey": "9ffdd07e-a04a-4116-affa-b73ad3c8f4d8"
    }
  }
}
```
  </TabItem>
</Tabs>

## RemoveAccount

The `RemoveAccount` mutation is used to remove a specified user account from a fuel tank. This mutation is particularly useful for managing the accounts associated with a fuel tank.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## RemoveAccountRuleData

The `RemoveAccountRuleData` mutation is used to delete specific rule data associated with an account on a fuel tank. This allows you to remove certain restrictions or requirements that were previously set for an account's interactions with the fuel tank.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## RemoveRuleSet

The `RemoveRuleSet` mutation is utilized to completely remove an existing set of rules from a specified fuel tank. Rule sets represent collections of conditions or constraints that govern the usage and access to the fuel tank. Removing a rule set becomes necessary when you need to modify operational policies, or a rule set is no longer applicable to the fuel tank's operations.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>

## ScheduleMutateFreezeState

The `ScheduleMutateFreezeState` mutation enables you to schedule a change in the `is_frozen` state of either a fuel tank or a rule set. This state determines whether the tank or rule set can be frozen (immobilized), preventing any operations that could alter its configuration or state.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="response" label="Response">
```json
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
  </TabItem>
</Tabs>