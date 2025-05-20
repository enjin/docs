---
title: "Wallets"
slug: "wallets"
description: "Perform wallets mutations in the Enjin API to manage wallet data, transfer assets, and update balances securely on the blockchain."
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