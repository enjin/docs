---
title: "Wallets"
slug: "wallets"
description: "Create platform-managed wallets via the Enjin API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

The Enjin Platform has two wallet-related mutations: `CreateManagedWallet` and `SweepManagedWallet`. Managed wallets are keypairs derived from the Wallet Daemon's seed plus an `externalId` you control — they let your application create signing accounts on demand without managing private keys.

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

## SweepManagedWallet

Transfers **all** transferable tokens and ENJ out of a managed wallet to a single `recipient` in one call — the simplest way to migrate a player to a self-custodial wallet. Identify the wallet to empty with `signerExternalId` (or `signerAccount` for its public key); the work runs asynchronously and is rate-limited to once per hour per wallet. Returns `true` once the sweep is accepted.

See [Sweeping a Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md#sweeping-a-managed-wallet) for the full walkthrough.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SweepManagedWallet {
  SweepManagedWallet(
    network: ENJIN
    chain: MATRIX
    signerExternalId: "e73f9f38-6832-4822-922b-b9225245ba24"
    recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "SweepManagedWallet": true
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
