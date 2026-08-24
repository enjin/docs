---
title: "Wallets"
slug: "wallets"
description: "Read on-chain accounts, managed wallets, linked wallets, and verify signed messages via the Enjin API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

The Enjin Platform exposes three complementary read surfaces for wallets:

- **`GetAccount` / `GetAccounts`** — read any on-chain account by address (ENJ balance, held tokens, nonce).
- **`GetManagedWallet` / `GetManagedWallets`** — read platform-managed wallets (the keypairs your application creates via `CreateManagedWallet`).
- **`GetLinkedWallet`** — read a user wallet linked to your account via the [wallet linking flow](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) (`CreateLinkingCode`).

`VerifyMessage` lets you cryptographically verify that a given signature belongs to a given address — useful for signed-message ownership proofs in custom signing flows.

## GetAccount

Returns a single chain account. The response includes the ENJ `balance` (in the smallest unit — divide by 10<sup>18</sup> for ENJ) and a flat list of `tokens` the account holds.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetAccount {
  GetAccount(
    network: ENJIN
    chain: MATRIX
    address: "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
  ) {
    id
    address
    nonce
    balance
    tokens {
      id
      tokenId
      isNonFungible
      collection {
        id
      }
      metadata {
        name
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
    "GetAccount": {
      "id": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y",
      "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y",
      "nonce": 132,
      "balance": "17500000000000000000",
      "tokens": [
        {
          "id": "2967-107002853660685728525072975374659356720",
          "tokenId": "107002853660685728525072975374659356720",
          "isNonFungible": false,
          "collection": { "id": "2967" },
          "metadata": { "name": "Epochrome Sword" }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

## GetAccounts

The batched form of `GetAccount`. Pass a list of `addresses` and the platform returns an `Account` per entry.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetAccounts {
  GetAccounts(
    network: ENJIN
    chain: MATRIX
    addresses: [
      "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y"
      "efUfmhm2rcTtVr4ajneB71qbfDZ1EkyYW7xRc6fhuRh3Tg4L1"
    ]
  ) {
    address
    balance
    nonce
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetAccounts": [
      {
        "address": "efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y",
        "balance": "17500000000000000000",
        "nonce": 132
      },
      {
        "address": "efUfmhm2rcTtVr4ajneB71qbfDZ1EkyYW7xRc6fhuRh3Tg4L1",
        "balance": "5000000000000000000",
        "nonce": 47
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

## GetManagedWallet

Looks up a platform-managed wallet by either `externalId` (the string you set when calling `CreateManagedWallet`) or `publicKey` (the hex public key). Returns the wallet's public key and externalId — pass either back as `recipient` on mint/transfer actions or as `signerAddress` / `signerExternalId` on `CreateTransaction`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetManagedWallet {
  GetManagedWallet(
    network: ENJIN
    chain: MATRIX
    externalId: "e73f9f38-6832-4822-922b-b9225245ba24"
  ) {
    publicKey
    externalId
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetManagedWallet": {
      "publicKey": "0xded3c8a93e4a4b3a5e8f3c9a2d1b6f0e7c8a9b0d1e2f3a4b5c6d7e8f9a0b1c2d",
      "externalId": "e73f9f38-6832-4822-922b-b9225245ba24"
    }
  }
}
```
  </TabItem>
</Tabs>

## GetManagedWallets

Returns a paginated list of managed wallets. Pagination is cursor-based — pass the previous response's `nextCursor` to fetch the next page; a `null` `nextCursor` means there are no more.

You can optionally filter to specific `publicKeys` or `externalIds`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetManagedWallets {
  GetManagedWallets(
    network: ENJIN
    chain: MATRIX
    limit: 15
  ) {
    data {
      publicKey
      externalId
    }
    perPage
    nextCursor
    previousCursor
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetManagedWallets": {
      "data": [
        {
          "publicKey": "0xded3c8a9...",
          "externalId": "user-1"
        },
        {
          "publicKey": "0x84f12b67...",
          "externalId": "user-2"
        }
      ],
      "perPage": 15,
      "nextCursor": "eyJpZCI6Mn0=",
      "previousCursor": null
    }
  }
}
```
  </TabItem>
</Tabs>

## GetLinkedWallet

Returns a wallet that a user has linked to your Enjin Platform account by approving a [linking code](/03-api-reference/02-mutations/04-wallets-mutations.md#createlinkingcode) in their Enjin Wallet app. Look it up by the `idempotencyKey` you set when creating the linking code, or by the wallet's `address` (the two arguments are mutually exclusive).

Returns `null` when no linked wallet matches — the user hasn't approved the linking code yet, or they've since disconnected your application from their Enjin Wallet app. See [Sending Wallet Requests](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) for the full flow.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetLinkedWallet($idempotencyKey: String) {
  GetLinkedWallet(idempotencyKey: $idempotencyKey) {
    publicKey
    idempotencyKey
  }
}
```

Variables:

```json
{
  "idempotencyKey": "player-123"
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetLinkedWallet": {
      "publicKey": "0x5a6aae294416f3e875d9a8975658905002cfd3e5e64105d76296c4b0adbfd77e",
      "idempotencyKey": "player-123"
    }
  }
}
```
  </TabItem>
</Tabs>

Pass the returned `publicKey` as `signerAddress` on [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction) to send a transaction request to the user's Enjin Wallet app.

## VerifyMessage

Cryptographically verifies that `signature` was produced by the holder of `publicKey` over `message`. Returns `true` or `false`. Useful for signed-message ownership proofs — for example, prompting a user's wallet to sign a unique challenge string so your backend can confirm they control the address.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query VerifyMessage {
  VerifyMessage(
    network: ENJIN
    chain: MATRIX
    publicKey: "0xded3c8a93e4a4b3a5e8f3c9a2d1b6f0e7c8a9b0d1e2f3a4b5c6d7e8f9a0b1c2d"
    signature: "0x8958f002f9513256fa329fa92441d39adc59e3a19165aeeb343acd72b7f6a..."
    message: "Sign in to MyGame at 2026-05-25T14:32:00Z"
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
