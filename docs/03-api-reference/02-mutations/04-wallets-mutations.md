---
title: "Wallets"
slug: "wallets"
description: "Create platform-managed wallets via the Enjin API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

The Enjin Platform has one wallet-related mutation: `CreateManagedWallet`. Managed wallets are keypairs derived from the Wallet Daemon's seed plus an `externalId` you control — they let your application create signing accounts on demand without managing private keys.

For end-user wallets connected via WalletConnect, there's no mutation here — the user's wallet already exists on chain. To submit transactions signed by an end-user wallet, see `CreateTransaction(..., signerAddress: <user-address>)` followed by `SignTransaction(uuid:, signedExtrinsic:)` on the [Transactions](/03-api-reference/02-mutations/01-transaction-mutations.md) page.

## CreateManagedWallet

Creates a new managed wallet keyed by your `externalId`. The wallet is the same keypair across networks (mainnet and canary) — there is no `network` / `chain` argument.

Once created, look up the wallet's public key with [`GetManagedWallet(externalId:)`](/03-api-reference/01-queries/04-wallets-queries.md#getmanagedwallet) and use it as `recipient` on mint/transfer actions, or as `signerAddress` / `signerExternalId` on `CreateTransaction` to have it sign a transaction.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateManagedWallet {
  CreateManagedWallet(
    externalId: "e73f9f38-6832-4822-922b-b9225245ba24"
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateManagedWallet": true
  }
}
```
  </TabItem>
</Tabs>

:::tip Looking for the signing flow?
- For Wallet Daemon-signed transactions, see [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction).
- For Managed Wallet-signed transactions, pass `signerAddress` or `signerExternalId` on `CreateTransaction`.
- For end-user-signed transactions (WalletConnect, browser extension, etc.), pair `CreateTransaction(... signerAddress:)` with [`SignTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#signtransaction).
:::
