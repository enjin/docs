---
title: "Wallets"
slug: "wallets"
description: "Create platform-managed wallets and link user wallets via the Enjin API."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

The Enjin Platform has three wallet-related mutations: `CreateManagedWallet` and `SweepManagedWallet` for platform-managed wallets, and `CreateLinkingCode` for linking end-user wallets. Managed wallets are keypairs derived from the Wallet Daemon's seed plus an `externalId` you control — they let your application create signing accounts on demand without managing private keys.

End-user wallets aren't created through the API — the user's wallet already exists on chain. Instead, use `CreateLinkingCode` to link a user's Enjin Wallet to your account, after which `CreateTransaction(..., signerAddress: <linked-address>)` delivers transaction requests straight to their Enjin Wallet app for approval. See [Sending Wallet Requests](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) for the full flow.

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

Transfers **all** transferable tokens and ENJ out of a managed wallet to a single `recipient` in one call — the simplest way to migrate a player to a self-custodial wallet. Identify the wallet to empty with `signerExternalId` (or `signerAddress` for its public key); the work runs asynchronously and is rate-limited to once per hour per wallet. Returns `true` once the sweep is accepted.

See [Sweeping a Managed Wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md#sweeping-a-managed-wallet) for the full walkthrough.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SweepManagedWallet($network: Network!, $chain: Chain!, $signerExternalId: String, $recipient: String!) {
  SweepManagedWallet(
    network: $network
    chain: $chain
    signerExternalId: $signerExternalId
    recipient: $recipient
  )
}
```

Variables:

```json
{
  "network": "ENJIN",
  "chain": "MATRIX",
  "signerExternalId": "e73f9f38-6832-4822-922b-b9225245ba24",
  "recipient": "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ"
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

## CreateLinkingCode

Creates a short-lived linking code that a user scans (as a QR code) with their Enjin Wallet app to link their wallet to your Enjin Platform account — authorizing you to send transaction requests to their app. Requires a completed [Developer Profile](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md#setting-up-your-developer-profile).

You can pass your own `idempotencyKey` or let the platform generate one; once the user approves, look up the linked wallet with [`GetLinkedWallet`](/03-api-reference/01-queries/04-wallets-queries.md#getlinkedwallet) using the same key. Each key identifies one linking code and can never be reused — if a code expires unused, create the next one with a fresh key. See [Sending Wallet Requests](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) for the full walkthrough.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateLinkingCode($idempotencyKey: String) {
  CreateLinkingCode(idempotencyKey: $idempotencyKey) {
    idempotencyKey
    qr
    url
    expires
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
    "CreateLinkingCode": {
      "idempotencyKey": "player-123",
      "qr": "https://platform.enjin.io/qrcode/aHR0cHM6Ly9wbGF0Zm9ybS5lbmppbi5pby9saW5rLzMyNzIzMTky",
      "url": "https://platform.enjin.io/link/32723192",
      "expires": "2026-08-24T15:36:12Z"
    }
  }
}
```
  </TabItem>
</Tabs>

- `qr` — a renderable QR code image of the linking link, ready to display to the user.
- `url` — the linking link itself, for when your application runs on the same device as the Enjin Wallet app.
- `expires` — when the code stops working; create a new one if it expires before the user finishes linking.

:::tip Looking for the signing flow?
- For Wallet Daemon-signed transactions, see [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction).
- For Managed Wallet-signed transactions, pass `signerAddress` or `signerExternalId` on `CreateTransaction`.
- For transactions signed by a user's linked Enjin Wallet, pass the linked address as `signerAddress` on `CreateTransaction` — the request is delivered to their app for approval. See [Sending Wallet Requests](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md).
- For custom end-user signing integrations (browser extension, etc.), pair `CreateTransaction(... signerAddress:)` with [`SignTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#signtransaction).
:::
