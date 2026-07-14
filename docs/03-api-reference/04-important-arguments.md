---
title: "Arguments"
slug: "important-arguments"
description: "A quick reference for important arguments and enum values used throughout the Enjin API."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

A glossary of recurring argument types, fields, and enum values you'll see across the Enjin API.

## network

Selects which network the operation targets:

- `ENJIN` — Enjin Blockchain mainnet.
- `CANARY` — Enjin Canary testnet.

The same endpoint serves both networks; pass `network` on every query and mutation to choose which one.

## chain

Selects which chain within the network the operation targets:

- `MATRIX` — Matrixchain (collections, tokens, marketplace, fuel tanks).
- `RELAY` — Relaychain (staking, nomination pools, governance).

## uuid

The unique identifier returned for every transaction created via `CreateTransaction` / `CreateBatchTransaction`. Use it to look the transaction up later with `GetTransaction(uuid:)` or to sign it externally with `SignTransaction(uuid:, signedExtrinsic:)`.

## idempotencyKey

A client-supplied key that prevents the same operation from being submitted twice. Send the same `idempotencyKey` on a retried request and the server returns the original transaction instead of creating a new one.

## extrinsicHash

The cryptographic hash of the signed extrinsic, populated once a transaction is broadcast to the chain. It's accepted as a lookup argument on `GetTransaction(extrinsicHash:)` / `GetTransactions(extrinsicHashes: [...])` and on `GetExtrinsic(hash:)`. On the `Transaction` type it's read through the `extrinsic` object — `extrinsic { hash }` — alongside the extrinsic's on-chain outcome and [emitted events](/05-enjin-platform/03-working-with-events.md).

## externalId

A free-form string you supply when creating a Managed Wallet (`CreateManagedWallet(externalId:)`). Use it to map a wallet to a record in your own database — `GetManagedWallet(externalId:)` returns the wallet's public key.

## address

A human-readable SS58 representation of a chain account, e.g. `efRC9jw5LeZFqmaWBBDxZRTyaLP9dLAqixy32tSnqW9wCsb6y`. Use it as the lookup key for `GetAccount(address:)` and as the `recipient` field on transfer / mint actions.

## publicKey

The hex-encoded public key associated with an account (e.g. `0xded3c8…`). Managed Wallets expose their `publicKey`; you can pass it interchangeably with `address` as a `recipient` value.

## limit

The page size for paginated queries (`GetTokens`, `GetCollections`, `GetListings`, `GetTransactions`, `GetManagedWallets`, `GetNominationPools`). Required on every paginated request.

## page

The 1-based page number for offset-paginated queries (`GetTokens`, `GetCollections`, `GetListings`, `GetNominationPools`). Increment until the returned list is empty.

## cursor

The opaque pagination token used by cursor-paginated queries (`GetTransactions`, `GetManagedWallets`). Pass back the `nextCursor` from the previous response; a `null` `nextCursor` indicates the last page.

## hashes

A list of extrinsic hashes — used to filter `GetExtrinsics(hashes: [...])` to specific on-chain extrinsics.

## ids

A list of identifiers — used by:

- `GetBlocks(ids: [...])` to fetch specific blocks by number.
- `GetCollections(ids: [...])` to fetch specific collections by id.
- `GetPendingCollectionTransfers(ids: [...])` to filter to specific pending transfers.

## collectionId

The unique identifier of a token collection on the Enjin Blockchain. Generated when a collection is created and used everywhere you reference tokens within that collection (`GetTokens`, `mintToken`, `transferToken`, etc.).

## tokenId

The unique identifier of an individual token within a collection. In the Enjin Platform API `tokenId` is a flat `BigInt` scalar — pass a plain number (e.g. `tokenId: 10`), not a wrapper object.

`GetToken` accepts either `(collectionId:, tokenId:)` or a single canonical `id: "<collectionId>-<tokenId>"`.

The token id space supports several encoding strategies that map to different developer ergonomics:

### integer

A plain numeric token id. Simple, efficient, and the right default unless you need something more structured.

### stringId

A token id derived from a human-readable string, useful when you want token ids that map cleanly to names or labels.

### hash

A token id derived from a cryptographic hash, useful when you need uniqueness across many independent inputs without coordinating ids.

### ERC1155

A token id encoded in the ERC-1155 layout — combining a 112-bit base id with a 16-bit index — for projects that need round-trip compatibility with EVM-side token ids.

#### index

The 16-bit instance within an ERC-1155 token id — combined with the base id to identify a specific token under the same base.

#### tokenId

In the ERC-1155 layout, the combined 128-bit token id formed from the 112-bit base and 16-bit index.

## id (composite token id) {#id}

For `GetToken`, the optional `id` argument is the canonical token id string `"<collectionId>-<tokenId>"`, e.g. `"7153-10"`. Use it as an alternative to passing `collectionId` + `tokenId` separately.

## action

The runtime extrinsic name for a transaction, e.g. `MultiTokens.create_collection`, `MultiTokens.mint`, `Marketplace.create_listing`. Returned on the `Transaction` type and useful for distinguishing transactions in lists / dashboards.

## state

The lifecycle state of a transaction, returned on the `Transaction` type. Possible values:

- **`PENDING`** — the transaction has been created on the platform and is awaiting signing/broadcast.
- **`BROADCAST`** — the signed transaction has been submitted to the blockchain.
- **`FINALIZED`** — the transaction has been included in a block. Check `extrinsic { success }` to confirm the on-chain outcome, and `extrinsic { events }` for what it emitted — see [Working with Events](/05-enjin-platform/03-working-with-events.md).
- **`FAILED`** — the transaction was rejected by the blockchain.
- **`ABANDONED`** — the platform couldn't sign or send the transaction (typically encoding issues or insufficient funds).
- **`TIMEOUT`** — the transaction was broadcast but not finalized within the timeout window.

## signerAddress

On `CreateTransaction` / `CreateBatchTransaction`, the address of the account that should sign the transaction. Defaults to the Wallet Daemon's address. Set it to a Managed Wallet's public key (or external user address, with `SignTransaction` used to submit the signed extrinsic) to sign with a different account.

## signerExternalId

The `externalId` of a Managed Wallet — an alternative to `signerAddress` that doesn't require a separate `GetManagedWallet` lookup. The platform resolves the externalId to the matching managed wallet and signs the transaction with it.

## proxyAddress

On `CreateTransaction` / `CreateBatchTransaction`, the address of a Substrate proxy account. When set, the transaction is wrapped in a `proxy.proxy` call so it executes on behalf of the proxied account while being signed by the proxy.

## fuelTank

On `CreateTransaction` / `CreateBatchTransaction`, the address of an existing fuel tank to dispatch the transaction through. The tank pays the transaction's fees rather than the signer.

## fuelTankRuleSetId

On `CreateTransaction` / `CreateBatchTransaction`, the ID of the tank rule set the dispatch is evaluated against when a `fuelTank` is set. Defaults to `0`. Set it to target a specific rule set on a tank that has more than one.

## signature

A cryptographic signature produced by the holder of an account's private key. Used by:

- `VerifyMessage(publicKey:, signature:, message:)` — proves the signer owns the address that corresponds to `publicKey` by verifying the signature against `message`.
- `SignTransaction(uuid:, signedExtrinsic:)` — submits an externally-signed extrinsic for a transaction created with `signerAddress: <user address>`.

## recipient

The address (or hex public key) that will receive minted, created, or transferred tokens. Required on `mintToken`, `transferToken`, `createToken`, and per-entry on `mintTokens` / `createTokens`.

## recipients

The batched form of `recipient`. On `batchTransfer`, supply `recipients: [{ address, tokenId, amount }, ...]` to transfer multiple tokens to multiple destinations in a single transaction. The per-entry field is `address`, not `recipient`.

## attributes

On-chain key/value metadata you can attach to a collection, token, or token group. Stored on-chain; useful for storing the metadata URI and other small descriptive fields.

### key

The identifier for an attribute (e.g. `"uri"`, `"name"`).

### value

The data stored under that attribute (e.g. a metadata URI, a numeric stat, a flag).

## hasRoyalty

A token can be configured to pay a royalty on every marketplace sale. Royalties are expressed via the token's `behavior` field:

```graphql
behavior: {
  type: HAS_ROYALTY
  royalties: [
    { address: "efRoyaltyBeneficiary", percentage: 5.0 }
  ]
}
```

The chain enforces the royalty automatically when the token is sold.

- #### beneficiary

    The address that receives the royalty share. Set via `royalties[].address` inside the token's `behavior`.

- #### percentage

    The percentage of each sale paid to the beneficiary (as a Float, e.g. `5.0` for 5%).

## isCurrency

A token can be configured as a currency token that other marketplace listings can be priced in. Currency behavior is set via the token's `behavior` field:

```graphql
behavior: {
  type: IS_CURRENCY
  name: "MyGameGold"
  symbol: "MGG"
  decimalCount: 4
}
```

## cap

Limits how many tokens of a given id can exist. Set the `cap` field on `createToken` / `createTokens`; leave it unset for an unlimited supply.

- #### SUPPLY

    A fixed-supply cap. The collection owner can mint up to the `supply` value; burned tokens reduce the circulating supply and can be re-minted, so the cap holds steady over time.

- #### COLLAPSING_SUPPLY

    A non-increasing cap. Each burn permanently reduces the cap by the burned amount, so re-minting burned tokens is not possible.

### type

Set `cap.type` to either `SUPPLY` or `COLLAPSING_SUPPLY`, and `cap.supply` to the numeric cap value.

## amount

A numeric quantity associated with a token operation — the number of units to mint, transfer, burn, infuse, list, bid, etc.

## freezeState

Used by `freezeToken` / `thawToken` to specify the lock duration:

- `NEVER` — the token can never be frozen.
- `PERMANENT` — the token is locked indefinitely.
- `TEMPORARY` — the token is locked for a defined period.

## initialSupply

On `createToken` / `createTokens`, the quantity of the new token minted to the `recipient` at creation time.

## listingForbidden

On `createToken` / `mutateToken`, set to `true` to block the token from being listed on any marketplace.

## unitPrice

On `mintToken` / `mintTokens`, an optional per-unit price (in the smallest ENJ unit) used to set the token's per-unit deposit. Once set, the unit price can only be increased, never decreased.

## owner

On `mutateCollection`, set `owner: <new-address>` to initiate a collection transfer. The new owner must then call `acceptCollectionTransfer(id:)` to complete it; the current owner can undo the pending transfer with `cancelCollectionTransfer(id:)` before it's accepted. Pending transfers are queryable via `GetPendingCollectionTransfers`.

## expiration

On listings, an optional block-number expiry — once that block is reached the listing is no longer fillable. Set inside `listingData.expiration` when calling `createListing`.

## mintPolicy

Returned on `Collection.mintPolicy`. The mint-policy fields are set directly on `createCollection` (no `mintPolicy:` wrapper on input):

- #### forceCollapsingSupply

    Boolean. If `true`, every token in the collection uses the `COLLAPSING_SUPPLY` cap by default — burned tokens cannot be re-minted.

- #### maxTokenCount

    Optional cap on the number of distinct token ids the collection can hold.

- #### maxTokenSupply

    Optional cap on the supply of each individual token in the collection.

## marketPolicy

Returned on `Collection.marketPolicy`. Lists the default royalty beneficiaries for marketplace sales of any token in the collection, each with an `accountId` and `percentage`. Set per-collection royalties on `createCollection` via the top-level `royalties` field; per-token royalties via the token's `behavior` field.

- #### royalty

    A `{ address, percentage }` pair that will receive a share of every marketplace sale of any token in the collection. Multiple beneficiaries supported.

## explicitRoyaltyCurrencies

On `createCollection` / `mutateCollection`, restricts which currency tokens are allowed to be used as royalty payments for tokens in this collection. Pass a list of `{ collectionId, tokenId }` pairs identifying the permitted currency tokens.

## infusion

On `createToken` / `createTokens`, the amount of ENJ to lock inside the token at creation time as backing. Combined with `anyoneCanInfuse`, this controls whether outsiders can add additional ENJ to the token later.

## anyoneCanInfuse

Boolean. On `createToken`, if `true`, any account may add ENJ to the token via `infuseToken` / `infuseTokens`. If `false`, only the collection owner can infuse the token.

## removeTokenStorage

On `burnToken`, set to `true` to fully remove the token's storage when the burn empties its supply. Set to `false` if you intend to re-mint the token later (only relevant for `SUPPLY`-capped tokens).

## groupIds

On `setTokenGroups`, the full set of group ids the token should belong to after the call. Pass `[]` to remove the token from every group.

## groupId

On `addTokenToGroup` / `removeTokenFromGroup`, the id of the token group to add the token to / remove the token from.

## groups

On `createToken` / `createTokens`, an optional list of group ids to add the new token to at creation time.

## fill

On `nominationPoolsBond`, set to `true` to bond the signer's entire free ENJ balance into the pool. Pass `amount` instead for a specific bond size.

## unbondingPoints

On `nominationPoolsUnbond`, the number of pool "points" to unbond — pool points are an internal accounting unit, not raw ENJ. See [Nomination Pools](/03-api-reference/02-mutations/01-transaction-mutations.md) for the full bonding model.

## listingData

On `createListing`, configures the type of listing being created. Shape:

```graphql
listingData: {
  type: FIXED_PRICE | AUCTION | OFFER
  startBlock: <block>     # optional
  endBlock: <block>       # optional
  expiration: <block>     # optional
}
```

## usesWhitelist

On `createListing`, set to `true` to restrict which accounts can fill the listing. Manage the whitelist with `addWhitelistedAccounts` / `removeWhitelistedAccounts`.

## price

On `createListing` / `placeBid` / `placeCounterOffer`, the price in the smallest unit of the asset specified by `takeAssetId` (or ENJ if `takeAssetId` is omitted).
