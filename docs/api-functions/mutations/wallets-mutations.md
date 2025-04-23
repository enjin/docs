---
sidebar_position: 4
title: "Wallets"
slug: "wallets-mutations"
excerpt: "Operations to help you create and manage wallets."
hidden: false
metadata: 
  title: "Wallets Mutations - Manage Wallet Data and Assets"
  description: "Perform wallets mutations in the Enjin API to manage wallet data, transfer assets, and update balances securely on the blockchain."
  image: []
  robots: "index"
createdAt: "Fri Feb 09 2024 00:15:02 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Apr 21 2025 16:39:25 GMT+0000 (Coordinated Universal Time)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](doc:api-reference).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is a detailed reference guide that explains the most commonly used operations.

# Mutations

## CreateWallet

The `CreateWallet` mutation in is used to create a new wallet on the blockchain using an external identifier (external ID). This allows you to associate a wallet with an entity on the Enjin Platform.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateWallet {
    CreateWallet(
        externalId: "e73f9f38-6832-4822-922b-b9225245ba24"
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateWallet": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **You** can use the `CreateWallet` mutation in various scenarios, including:
  - **User Sign-Up**: When a new user signs up and provides wallet information that needs to be stored for future verification.
  - **Integration with External Systems**: When integrating wallets from external systems or applications into your platform, you can first store their records using external IDs before performing additional verification checks.
  - **Multi-Step Wallet Creation**: In cases where wallet creation involves multiple steps, you can create an initial wallet record with minimal details and later update it with more information as the user progresses through the steps.

This mutation is a foundational step in managing wallets. It allows you to establish a connection between wallets and external entities or users, facilitating further actions and verifications.

## SetWalletAccount

The `SetWalletAccount` mutation is used to associate an existing wallet account on the Enjin Platform with a game developer's external ID. This action links the user's wallet on the Enjin Platform to an external ID stored in the game developer's database, allowing the identification of a player's wallet within the Enjin Platform.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetWalletAccount{
    SetWalletAccount(
        externalId: "ZMMP0FCq6NEKphFlNfESdbC81BXWebNHUiguJvFsb5dVnthIvBbFAaNfCE3mOJREDPS5lwWN4sDQXDV61fqRWUKVSeq4ItavScDS"
        account: "cxLc8HSeuiLiYmEG7XB8wQrbkRPNCaDi5dVpqPkyhWdEp6i63"
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "SetWalletAccount": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can utilize the `SetWalletAccount` mutation in various scenarios:

- **Player Identification**: Game developers can use this mutation to link a player's wallet on the Enjin Platform with their own external ID. This allows the game developer to identify and manage player wallets within their game ecosystem.

- **User Profile Integration**: When integrating player profiles from a game developer's database with the Enjin Platform, this mutation enables the seamless connection of wallet accounts to player records.

- **Custom Player Management**: Game developers can implement custom player management features by associating Enjin Platform wallet accounts with their internal player records, facilitating personalized gaming experiences.

To use this mutation effectively, provide the `externalId` parameter to specify the unique identifier in the game developer's database, and the `account` parameter, representing the blockchain address of the existing wallet account on the Enjin Platform to be associated with the external ID. The response will indicate whether the association was successful (`true`) or not (`false`).

## VerifyAccount

The `VerifyAccount` mutation is used by a wallet to confirm the ownership of a user account. This security measure ensures that actions performed on the account are authorized by the legitimate owner, enhancing the overall security and trustworthiness of the system.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation VerifyAccount{
    VerifyAccount(
        verificationId: "0xfdb976d1c5fc9ed6d546f31332e756ca9c9ef6e3c6f0d9ea0ed0713b1cd84440"
        signature: "0x8958f002f9513256fa329fa92441d39adc59e3a19165aeeb343acd72b7f6a"
        account: "0xbeac4e574b46a3722da9239f97359b0440c0fb66e3b130f20c2284fd033f9138"
        
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "VerifyAccount": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

- **Enhanced Security**: You can utilize the `VerifyAccount` mutation to enhance the security of your application by ensuring that sensitive operations, such as transactions or account changes, are performed exclusively by the rightful owner of the account.

To use this mutation effectively, the wallet must provide the `verificationId`, `signature`, and `account` parameters. The response will indicate whether the account has been successfully verified (`true`) or if the verification has failed (`false`), allowing you to take appropriate actions based on the verification status.

## UpdateWalletExternalId

The `UpdateWalletExternalId` mutation is used to update the external ID associated with a wallet account on the Enjin Platform. This action allows you to change the reference or identifier linked to a user's wallet within the Enjin Platform.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UpdateWalletExternalId{
    UpdateWalletExternalId(
        id: 8466
        newExternalId: "35b409dc-4f3f-41da-8d94-7635ef2a5853"
    )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "UpdateWalletExternalId": true
  }
}
```
  </TabItem>
</Tabs>

### Use Case:

You can utilize the `UpdateWalletExternalId` mutation in various scenarios:

- **External ID Modification**: When you need to change the reference or identifier linked to a user's wallet on the Enjin Platform, you can use this mutation to update the external ID.

- **User Profile Maintenance**: Game developers or platform administrators can employ this mutation to maintain and manage user profiles, ensuring that the external IDs associated with wallet accounts remain up-to-date.

- **Database Synchronization**: If there are changes in the game developer's database, such as updates to user records or identifiers, this mutation can be used to synchronize those changes with the Enjin Platform.

To use this mutation effectively, provide the `id` parameter to specify the unique identifier of the wallet account you want to update, and the `newExternalId` parameter to specify the new external ID that will replace the previous one. The response will indicate whether the update was successful (`true`) or not (`false`).
