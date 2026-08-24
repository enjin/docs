---
title: "Transactions"
slug: "transactions"
description: "Submit on-chain actions through the Enjin Platform's transaction mutations: CreateTransaction, CreateBatchTransaction, SignTransaction, CancelTransaction, RefreshMetadata."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.enjin.io/graphql`
:::

The Enjin Platform exposes a small number of root-level mutations. Almost every on-chain action — creating a collection, minting, transferring, listing, burning, freezing, bonding to a nomination pool, managing token groups — is funnelled through the single `CreateTransaction` mutation, with the action selected by which field is set on the `transaction` input.

Every action emits one or more on-chain events when the transaction reaches `FINALIZED` — see [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read them.

## CreateTransaction

Submits a single on-chain action. The `transaction` argument is a `TransactionInput` — set exactly one field on it to choose the action (`createCollection`, `createToken`, `mintToken`, `transferToken`, `transferEnj`, `burnToken`, `freezeToken`, `createListing`, and ~40 more). See [Important Arguments](/03-api-reference/04-important-arguments.md) for the per-field shapes.

The response is a `Transaction` whose `uuid` you can use to track or sign the transaction later.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateTransaction {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "efRecipientAddress"
        collectionId: 12345
        tokenId: 1
        initialSupply: 10
        listingForbidden: false
        infusion: 0
        anyoneCanInfuse: false
      }
    }
  ) {
    uuid
    action
    state
    extrinsic {
      hash
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "action": "MultiTokens.create_token",
      "state": "PENDING",
      "extrinsic": null
    }
  }
}
```
  </TabItem>
</Tabs>

Useful additional arguments:

- `idempotencyKey: String` — a unique key for the transaction, protecting against accidental duplicates: creating another transaction with a key that was already used returns a validation error.
- `signerAddress: String` — sign with a specific account instead of the Wallet Daemon: a Managed Wallet's public key, a [linked user wallet](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) (the request is delivered to the user's Enjin Wallet app for approval), or an external address for custom client-side signing.
- `signerExternalId: String` — same as `signerAddress` but resolved from a Managed Wallet's `externalId`.
- `proxyAddress: String` — wrap the call in `proxy.proxy` so it executes on behalf of a proxied account.
- `fuelTank: String` — dispatch through a fuel tank's address; the tank pays the transaction fees.
- `fuelTankRuleSetId: Int` — when dispatching through a `fuelTank`, the rule set to apply. Defaults to `0`.

## CreateBatchTransaction

The batched form of `CreateTransaction`. Pass a list of `TransactionInput` items in `transactions:` and the platform submits them as a single batched extrinsic. `batchMode` controls what happens if one of the calls fails.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateBatchTransaction {
  CreateBatchTransaction(
    network: ENJIN
    chain: MATRIX
    batchMode: ALL_OR_NOTHING  # optional; this is the default
    transactions: [
      { transferToken: { recipient: "efAlice", collectionId: 12345, tokenId: 1, amount: 5 } }
      { transferToken: { recipient: "efBob",   collectionId: 12345, tokenId: 1, amount: 3 } }
      { transferEnj:   { recipient: "efCarol", amount: 1000000000000000000 } }
    ]
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateBatchTransaction": {
      "uuid": "f3a91d2f-04e0-4d6f-aef9-bbb1cf3220a7",
      "action": "Utility.batch_all",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

`CreateBatchTransaction` accepts the same auxiliary arguments as `CreateTransaction` (`signerAddress`, `signerExternalId`, `idempotencyKey`, `proxyAddress`, `fuelTank`, `fuelTankRuleSetId`), plus one batch-specific argument:

- `batchMode: BatchTransactionModeEnum` — how the batch behaves when one of its calls fails. Defaults to `ALL_OR_NOTHING`.
  - `ALL_OR_NOTHING` (default) — atomic; any failure reverts the entire batch (`Utility.batch_all`).
  - `HALT_ON_ERROR` — runs in order and stops at the first failure, keeping the calls that already executed (`Utility.batch`).
  - `CONTINUE_ON_ERROR` — runs every call and skips the ones that fail (`Utility.force_batch`).

See the [Batching Transactions](/02-guides/01-platform/03-advanced-mechanics/08-batching-transactions.md) guide for worked examples of each mode.

## SignTransaction

Submits the signed extrinsic for a transaction that was created with an external `signerAddress`. Use this for custom client-side signing integrations (e.g. a browser extension) where you collect the signature yourself.

You don't need this mutation when the signer is a wallet [linked via the Enjin Wallet app](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) — in that flow the request is delivered to the user's app, and the platform receives the signature and broadcasts automatically once the user approves.

The typical flow is:

1. Call `CreateTransaction(..., signerAddress: <user-address>)`. The platform returns a `Transaction` with `uuid` and `encodedData` (the unsigned extrinsic).
2. The user's wallet signs `encodedData`, producing a signed extrinsic.
3. Call `SignTransaction(uuid:, signedExtrinsic:)` to submit it. The platform broadcasts the extrinsic and returns the updated `Transaction`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SignTransaction {
  SignTransaction(
    uuid: "a90ded41-4262-40a2-95c0-98255b660bf1"
    signedExtrinsic: "0x4502840016eda5..."
  ) {
    uuid
    state
    extrinsic {
      hash
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "SignTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "state": "BROADCAST",
      "extrinsic": {
        "hash": "0xa1b2c3..."
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## CancelTransaction

Cancels a transaction that hasn't been signed yet (its `state` is still `PENDING`), marking it `ABANDONED`. Useful for withdrawing a [wallet request](/02-guides/01-platform/02-managing-users/01-sending-wallet-requests.md) the user hasn't approved yet — for example, when the in-game offer that triggered it expires.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CancelTransaction($uuid: String!) {
  CancelTransaction(uuid: $uuid) {
    uuid
    state
  }
}
```

Variables:

```json
{
  "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1"
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CancelTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "state": "ABANDONED"
    }
  }
}
```
  </TabItem>
</Tabs>

## RefreshMetadata

Forces the platform to re-fetch off-chain metadata for one or more tokens / collections. Useful after you update the JSON behind a token's metadata URI.

You can target either by canonical token id (`ids: ["12345-1", "12345-2"]`) or by `collectionId` plus a list of `tokenIds`, or by a list of metadata `uris`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RefreshMetadata {
  RefreshMetadata(
    network: ENJIN
    chain: MATRIX
    ids: ["12345-1", "12345-2"]
  )
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "RefreshMetadata": true
  }
}
```
  </TabItem>
</Tabs>

## CreateManagedWallet

Creates a new platform-managed wallet, signed automatically by the Wallet Daemon. Covered in detail on the [Wallets Mutations](/03-api-reference/02-mutations/04-wallets-mutations.md) page.
