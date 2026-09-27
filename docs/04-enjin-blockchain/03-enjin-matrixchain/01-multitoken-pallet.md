---
title: "MultiTokens Pallet"
slug: "multitoken-pallet"
description: "The utility pallets of the Enjin Blockchain."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

:::info The Enjin Blockchain Console
Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.
:::

## What is the MultiTokens <GlossaryTerm id="pallet" />?

The Enjin Blockchain has a token standard called MultiTokens. The standard is compatible with matrixchains, parachains, parathreads and smart contracts, so it’s interoperable with the entire Enjin, Polkadot and Kusama ecosystem.

**<GlossaryTerm id="multi_unit_token" />** are stackable, have a quantity and optional decimal places. An example of a multi-unit token is a twenty dollar bill - each bill is worth the same amount as another twenty dollar bill.

![](/img/components/enjin-matrixchain/1.png)

**<GlossaryTerm id="nft" />s** are not interchangeable; each token has its own unique identifier. Examples of NFTs are original art, gaming characters and pets, numbered collectibles, and more.

![](/img/components/enjin-matrixchain/2.png)

**Grouped Tokens** are Multi-unit tokens or NFTs organized into logical sub-categories within a collection. This adds a structural layer between the collection and individual tokens, allowing for organized "folders" in apps like the Enjin Wallet and NFT.io.

![](/img/components/enjin-matrixchain/3.png)

:::info Partial Implementation
Token grouping is currently implemented at the blockchain level. While users can view and manage groups on NFT.io and view them in the Enjin Wallet, full Enjin Platform (API/UI) support is currently in development.
:::

## Terminology

- **Collection -** A group of tokens. Also holds data for those tokens and the policies that govern their behavior.
- **<GlossaryTerm id="token_group" /> -** An organizational layer within a collection used to categorize tokens.
- **Token -** A unique asset with a balance
- **Token Account -** A token account is stored in user account. It holds the account's <GlossaryTerm id="multitoken" /> states like its balance, freeze state, etc.
- **Policy -** Governs behavior for tokens in a collection
- **Attribute -** Metadata (strings/data) attached to a collection, group, or token.
- **Operator -** An account that operates on behalf of another account (transferFrom)
- **Approval -** Required for an operator to use an account
- **Freeze/Thaw -** If a collection, token, or account is frozen, it cannot transfer tokens
- **Descriptor -** Used to create something. For example, a CollectionDescriptor creates a Collection.
- **Ephemeral Token -** An NFT with a fixed expiration block, after which it is automatically destroyed. See [#Ephemeral Tokens](#ephemeral-tokens).
- **Loan -** A temporary transfer of an NFT to a borrower, automatically returned to the lender at an expiration block. See [#Token Lending](#token-lending).
- **Mint Rate Limit -** A cap on how many units may be minted within a rolling period, set per collection or per token. See [#Mint Rate Limit](#mint-rate-limit).

## Collections

A collection must be created before tokens may be minted. A collection is somewhat akin to an ERC-1155 smart contract - both <GlossaryTerm id="nft" /> and <GlossaryTerm id="multi_unit_token" /> tokens can be created in a single collection, and its creator has certain privileges, such as minting new tokens or setting metadata for the collection and its tokens.

The first 2000 Collection IDs are reserved for future system collections. Collections created on-chain through this <GlossaryTerm id="extrinsic" /> start from ID 2001 and are sequentially created.

A <GlossaryTerm id="storage_deposit" /> of 6.25 ENJ is required to create a collection. The deposit can be recovered by the collection owner if all tokens are burned and the collection is destroyed.

![](/img/components/enjin-matrixchain/4.png)

![](/img/components/enjin-matrixchain/5.png)

![](/img/components/enjin-matrixchain/6.png)

## Token Grouping

Token Grouping adds an organizational layer between a **Collection** and its **Tokens**. It allows creators to categorize assets into logical "folders," significantly improving navigation and user experience.

For example, a "Fantasy RPG" collection can group its tokens into "Weapons," "Armor," and "Potions." Within "Weapons," tokens could be further organized into "Swords" or "Axes." Without grouping, all tokens appear in a single, flat list, making specific items difficult to locate.

### Functional Overview
* **Blockchain Level:** Groups are implemented directly on the MultiTokens pallet.
* **Attributes:** Like collections, groups can have their own attributes (metadata).
* **Organization:** In the Enjin Wallet and NFT.io, grouped tokens are displayed in folders rather than a random sorted list.

### Implementation Status
Token grouping is currently in a **partial release** phase:
* **Enjin Wallet:** Users can view and navigate tokens organized into group folders.
* **NFT.io:** Users can view groups and manage them (manual or auto-grouping).
* **Enjin Platform:** UI and API support for managing groups via the Platform is currently in development.

## Tokens

Each token must belong to a Collection, and is created using the mint extrinsic.

In the Enjin Blockchain there is no distinction between <GlossaryTerm id="multi_unit_token" />s and <GlossaryTerm id="nft" />s. Each token is a <GlossaryTerm id="multitoken" /> that may be a multi-unit token or an NFT depending on its supply. A NFT is simply a token with a total supply of one. Additional constraints, like a cap, can be applied to a token at the time of minting to make sure the total supply never increases.

![](/img/components/enjin-matrixchain/7.png)

## How to Create a Collection

A collection is created by using the `create_collection` extrinsic. The only required parameter is a descriptor which allows customizing the collection's behavior. The descriptor contains all of the policies and some additional settings. Some settings can be changed later using the `mutate_collection` extrinsic, but the policies currently cannot be changed, so think carefully before choosing the policies.

By default, the policies are flexible, but you can make them more strict. For example, if you want to force a collection to only contain NFTs, you can set `max_token_supply` to `1` and `force_collapsing_supply` to true on the mint policy.

### Create Collection Parameters

- Max Token Count: The maximum number of unique tokens that can exist within the collection, regardless of the supply of each token. Setting this to `None` allows for the creation of unlimited number of unique tokens within the collection.
- Max Token Supply: The maximum supply limit for each individual token within the collection. Setting this to 1 will ensure each token within the collection is an NFT.
- Force Collapsing Supply: Whether all tokens within the collection should have a collapsing supply. Read more on the available supply types in the [#Create Token Parameters](#create-token-parameters) section below.
- Market Policy: Whether each token within the collection should have forced marketplace royalties. Read more in the [#Create Token Parameters](#create-token-parameters) section below.
- Explicit Royalty Currencies: List of tokens that will be allowed to be used as a royalty currency for each filled listing of a token withing the collection. If no tokens are provided, all tokens will be allowed to be used as a royalty currency.
  Read more in the [#Create Token Parameters](#create-token-parameters) section below.
- Attributes: The collection's attributes such as `name`, `description`, `media`, etc. These should be structured according to the [metadata standard](/02-guides/01-platform/03-advanced-mechanics/02-metadata-standard/02-metadata-standard.md).

When the collection is created, it will emit a `CollectionCreated` event. This event contains the collection id that is used to access the collection.

![](/img/components/enjin-matrixchain/8.png)

## How to create a Token

:::info Some deposits are required.
A single <GlossaryTerm id="storage_deposit" /> of 0.01 ENJ is required to store the token on-chain. This deposit also covers the first <GlossaryTerm id="token_account_deposit" />.
An additional <GlossaryTerm id="token_account_deposit" /> of 0.01 ENJ is required for each new token holder.
:::

Tokens are created using the `mint` extrinsic. It only contains three parameters, the `recipient`, the `collection_id` and `mint params`. The mint params is an enum with a two variants: CreateToken and Mint.

`CreateToken` is used to create a new token and set its configuration such as cap, metadata, royalty, etc.
`Mint` is used to mint additional units to an existing token.

### CreateToken

This must be used the first time a token is created. The provided token id must not already exist. Some additional settings can be chosen when creating a token, such as setting a cap on the supply or giving it a royalty for the marketplace.
Some of these settings can be changed later by using the `mutate_token` extrinsic.

To create an NFT, set the cap: `supply`/`collapsing supply` to `1`.

#### Create Token Parameters

- <GlossaryTerm id="token_id" />: A unique token identifier for the new <GlossaryTerm id="multitoken" />. View the [TokenID Structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md) page for more information.
- Initial Supply: The amount of token supply to initially <GlossaryTerm id="mint" /> to the recipient account.
- Account Deposit Count: The number of accounts to reserve ENJ to, for <GlossaryTerm id="token_account_deposit" /> required for future `mint`/`transfer` operations. More info in the [#Account Deposit](#token-account-deposit) section below.
- Supply Cap
  - None: Infinite Supply
  - Supply: Set a maximum supply amount for the token. Burned units may be re-minted.
  - Collapsing: Set a maximum supply amount for the token. Burned units may not be re-minted. (i.e. burning units decreases the maximum supply)
- Token Market Behavior: (can be changed later on using the `MutateToken` extrinsic)
  - None: No Royalties.
  - Has Royalty: Set a percentage of ENJ royalty for each filled listing on the marketplace.
  - isCurrency: Allows this new token to be used as royalty (instead of ENJ royalty) for other tokens in the collection.
    **\*Note**: setting a MultiToken currency as royalty isn't implemented on-chain as of now and only acts as a placeholder.
- Listing Forbidden: Whether this token should be prevented from listing on the marketplace (can be changed later on using the `MutateToken` extrinsic)
- Freeze State:
  - None: Not initially frozen.
  - Permanent: Token will be frozen permanently and can never be transferred to another account.
  - Temporary: Token will be frozen temporarily, can be thawed by the collection owner to allow transferring.
  - Never: Token will always be transferrable and can never be frozen.
- Metadata: The parameters below are for creating a token with decimal support, like a in-game currency.
  - Name: The token name. Can be set to `0x` to provide an empty name. (this name takes precedence when the token name is provided in different parameters such as `uri`/`name` attributes)
  - Symbol: The token symbol to be shown in different apps.
  - Decimals: The token's decimals count.
    Please note, this parameter does not affect the token's behavior on-chain and is used solely for display purposes in applications. It helps apps determine how to format and present the token's total supply.
    e.g. A token with `supply: 175` and `decimals: 2` should be formatted as `1.75`.
- ENJ Infusion:
  - Infusion: The amount of ENJ to infuse to each unit. (More info in the [#ENJ Infusion](#enj-infusion) section below)
  - Anyone Can Infuse: Whether anyone will be able to add infusion to this token, or only the collection owner.
- Ephemeral Expiration: The block number at which the token is automatically destroyed. Leave as `None` for a regular, permanent token. This setting is immutable and requires the token to be an NFT. (More info in the [#Ephemeral Tokens](#ephemeral-tokens) section below)
- Is Lendable: Whether holders of this token are allowed to lend it. Defaults to `true`, and can be changed later on using the `MutateToken` extrinsic. (More info in the [#Token Lending](#token-lending) section below)
- Mint Rate Limit: An optional `period` (in blocks) and `max` amount that caps how many units of this token can be minted within any rolling period. (More info in the [#Mint Rate Limit](#mint-rate-limit) section below)

![](/img/components/enjin-matrixchain/9.png)

### Mint

This is used when minting additional units to an already existing token, as long as the circulating token supply didn't reach its cap.

![](/img/components/enjin-matrixchain/10.png)

## Transferring tokens and NFTs

To perform a transfer, use the `transfer` extrinsic. There are two types of transfers:

### Simple Transfer

A simple transfer is when the `origin` of the extrinsic is also the sender. i.e. when the account that calling the extrinsic is also the token holder.

![](/img/components/enjin-matrixchain/11.png)

### Operator Transfer

An operator transfer is when an account makes transfers on behalf of another account. This is also known as `transfer_from`.

![](/img/components/enjin-matrixchain/12.png)

In the example above, Alice is creating a transaction call to transfer a MultiToken to Bob's account from Charlie's account.
For the transaction to be successful, Bob must approve Alice to transfer this token in advance.

#### Transfer Approvals

Approvals can be set for entire collections, or they can be set for specific tokens. They can have expiration times, and specific balances can be set for token approvals. The following extrinsics are used for approvals:

- **approve_collection -** Approves all tokens in a collection.
- **approve_token -** Approves a specific token in a collection for a specific amount. For security reasons, you must specify the exact amount of the previous approval (or zero if there is none) in the `current_amount` parameter for the extrinsic to succeed.
- **unapprove_collection -** Revokes a collection approval.
- **unapprove_token -** Revokes a token approval.

## Burning Tokens

Burning a <GlossaryTerm id="multitoken" /> refers to the act of destroying token units. Tokens can be burned by invoking the `burn` extrinsic.

For tokens with the "Collapsing Supply" cap type, burning token units decreases the maximum supply of the token, ensuring that any burned units cannot be re-minted.

### Melting a Token

"Melting" is a term used to describe the process of burning a <GlossaryTerm id="multitoken" /> that contains an <GlossaryTerm id="enj_infusion" />. This process not only destroys the token but also releases the infused ENJ to the token holder.
Read more in the [#ENJ Infusion](#enj-infusion) section below.
Note that "melting" is a conceptual term and does not exist as a specific function in the blockchain code.

### Destroying Token Account

When an account burns all of the units it owns from a specific token, its <GlossaryTerm id="token_account" /> is destroyed and its <GlossaryTerm id="token_account_deposit" /> is released. Read more in the [#Token Account Deposit](#token-account-deposit) section below.

### Burning and Removing the Token from Storage

There is an additional field on the `BurnParam` called `remove_token_storage`. If this is set to `true` and the token's circulating supply is zero, the token will be removed from the blockchain storage, effectively destroying the token from existence. This action can only be performed by the collection owner.

When a <GlossaryTerm id="multitoken" /> is removed from storage, the <GlossaryTerm id="storage_deposit" /> is returned to the collection owner, and it will be as if the token never existed, so it can be recreated in the future with different configuration.

![](/img/components/enjin-matrixchain/13.png)

## Setting/Removing Attributes

To add or update metadata for a token or a collection, use the `set_attribute` extrinsic. Providing `token_id` sets the attribute to the token, otherwise it sets it directly to the collection. It's only callable by the collection's owner.

To remove an `attribute`, use `remove_attribute` extrinsic. It's only callable by the collection owner. If the `token_id` is provided, the attribute will be removed from the token. Otherwise, it will be removed from the collection.

### Setting Collection Attributes

This is done by clicking the `Manage Attributes` button under the expanded collection. Use the toggle to switch between setting and removing attributes.

![](/img/components/enjin-matrixchain/14.webp)

### Setting Token Attributes

This is done by clicking the `Manage Attributes` button on the token page. Use the toggle to switch between setting and removing attributes.

![](/img/components/enjin-matrixchain/15.webp)

## Freezing

Accounts, collections, and tokens can be frozen to prevent transfers. This is done using the `freeze` extrinsic, which expects freezing `info` to be provided. The `info` specifies whether the <GlossaryTerm id="collection" />, <GlossaryTerm id="multitoken" />, Collection Account or <GlossaryTerm id="token_account" /> should be frozen.

### Freeze a collection or a collection account

This is done by clicking on Freeze button under expanded collection.
Use the toggle to switch between freezing a specific collection account and the whole collection.

![](/img/components/enjin-matrixchain/16.png)

### Freeze a token or a token account

This is done by clicking on Freeze button on the token page.
Use the toggle to switch between freezing a specific token account and the whole token.

![](/img/components/enjin-matrixchain/17.png)

## Thawing

To unfreeze either collection, token, collection account or token account, use the thaw extrinsic. It expects the same `info` as the `freeze` extrinsic.

### Thaw a collection or a collection account

This is done by clicking on the `Thaw` button under expanded collection.
Use the toggle to switch between thawing a specific collection account and the whole collection.

![](/img/components/enjin-matrixchain/18.png)

### Thaw a token or a token account

This is done by clicking on the `Thaw` button on the token page.
Use the toggle to switch between thawing a specific token account and the whole token.

![](/img/components/enjin-matrixchain/19.png)

## Batch operations

It is also possible to perform certain operations in batch. The following operations are supported:

### Batch Transfer

Using `batch_transfer` you can batch [transfer](#transferring-tokens-and-nfts) operations, allowing to transfer multiple tokens from a single collection, to a list of `recipients` with different `amount` of tokens.

![](/img/components/enjin-matrixchain/20.png)

### Batch Mint

Using `batch_mint` you can batch [mint](#how-to-create-a-token) operations, allowing minting new or existing tokens, each with it's own `recipient` and `amount`.

![](/img/components/enjin-matrixchain/21.png)

### Batch Set Attribute

Using `batch_set_attribute` you can batch set attribute operations, allowing to set multiple attributes to a single collection / token. If `token_id` is `None`, the attribute is set on the collection. If it is `Some`, the attribute is set on the token.

![](/img/components/enjin-matrixchain/22.png)

### Remove All Attributes

Removes all attributes from the given `collection_id` or `token_id`.
If `token_id` is `None`, it removes all attributes of the collection. If `token_id` is `Some`, it removes all attributes of the token. `attributeCount` must match the number of attributes set in the collection/token, or the transaction will fail.

![](/img/components/enjin-matrixchain/23.png)

## Ephemeral Tokens

An ephemeral token is a short-lived NFT. When it is created, an expiration block is set, and once the chain reaches that block the token is automatically and irreversibly destroyed, no matter who holds it at the time.

Ephemeral tokens are created with the regular `mint` extrinsic by setting the `ephemeral_expiration` field of `CreateToken` to a future block number. The following rules apply:

- The ephemeral nature and the expiration block are **immutable**. A regular token cannot become ephemeral, an ephemeral token cannot become permanent, and its expiration cannot be extended. Make sure the token's metadata makes its short-lived nature clear to holders.
- The token must be an NFT, i.e. created with a supply cap of `Supply(1)` or `CollapsingSupply(1)`. Multi-unit tokens cannot be ephemeral.
- The expiration block must be in the future. A limited number of tokens may share the same expiration block, so if the call fails with `EphemeralScheduleFull`, choose a nearby block instead.

Until the expiration block is reached, an ephemeral token behaves like any other NFT: it can be transferred, listed on the marketplace (subject to the marketplace and the token's `listing_forbidden` setting), lent, and burned. Burning it early simply destroys it ahead of schedule.

Once the expiration block is reached, the token can no longer be transferred and is queued for destruction. Destruction runs automatically during idle block time, in chunks, so a large batch of tokens expiring on the same block may take a few blocks to clear. Anyone can speed this up by calling the permissionless `cleanup_expired_ephemeral` extrinsic, which is fee-free when it destroys at least one token.

Destruction removes the token and its attributes from storage and emits an `EphemeralTokenDestroyed` event. If a token had also been lent, destruction takes precedence: the token is destroyed instead of being returned to the lender.

## Token Lending

Token lending lets a holder temporarily transfer an NFT to another account with a guarantee that it comes back. The lender sets an expiration block, the token moves to the borrower, and at the expiration block the chain automatically returns it to the lender.

### Enabling Lending

Each token has an `is_lendable` flag that controls whether it can be lent. It defaults to `true` for new and existing tokens, and only the collection owner can change it, either at creation time via `CreateToken` or later using the `mutate_token` extrinsic. Collection owners who don't want their tokens to be lent should set it to `false`.

### Lending a Token

Any holder of a lendable NFT can lend it using the `lend` extrinsic, which takes the `collection_id`, `token_id`, the `borrower` account, and the `expiration` block at which the token is returned. The following rules apply:

- Only NFTs with a supply cap of `Supply(1)` or `CollapsingSupply(1)` can be lent. Multi-unit tokens cannot be lent.
- The token must not already be lent, and the expiration block must be in the future.
- The token moves to the borrower through a regular transfer, so the token must not be frozen. The lender pays the borrower's <GlossaryTerm id="token_account_deposit" />.

A successful call emits a `TokenLent` event.

### While a Token is Lent

The borrower holds the token but with restrictions in place to protect the lender:

- A lent token **cannot be listed** on the marketplace.
- A lent token **cannot be burned**.
- A lent token **can only be transferred back to the lender**. This return transfer supersedes freeze and transferability restrictions, so the token can always find its way back.

The borrower can end the loan early by transferring the token back to the lender, which clears the loan and emits a `TokenReturned` event. The lender cannot claw the token back before the expiration block.

### Extending a Loan

The lender can push the expiration further out using the `extend_loan` extrinsic with a `new_expiration` that is strictly later than the current one. A loan can only be extended before its current expiration block is reached, and it can never be shortened. Extending emits a `LoanExtended` event.

### Automatic Return

When the expiration block is reached, the token is automatically returned to the lender during idle block time and a `TokenReturned` event is emitted. As with ephemeral tokens, returns are processed in chunks, and anyone can call the permissionless, fee-free `process_expired_loans` extrinsic to speed the process up.

If a token is both ephemeral and lent, and its ephemeral expiration comes first, it is destroyed rather than returned. See [#Ephemeral Tokens](#ephemeral-tokens) above.

## Mint Rate Limit

A token's supply cap governs *how many* units can ever exist. A mint rate limit is an independent, optional policy that governs *how fast* units can be minted. The two can be combined freely: a token may have either, both, or neither, and tokens without a rate limit mint exactly as before.

Rate limits protect both the collection owner and their community. If the owner's key is compromised, an attacker cannot mint an unlimited number of tokens, and the delay on loosening a limit (described below) gives the owner time to react. Rate limits also act as a trust layer, giving holders a provable, on-chain guarantee of how quickly a token's supply can grow.

### Scopes

A rate limit can be set at two scopes, and a mint must satisfy both when both are set:

- **Collection scope** limits the aggregate number of units minted across the collection when new tokens are created. Minting additional units of an existing token is not counted at this scope.
- **Token scope** limits the number of units minted for a single token, whether through `CreateToken` or `Mint`.

### Parameters

A rate limit is defined by two values:

- `period`: the length of the window, in blocks (a block is produced roughly every 6 seconds, so 14,400 blocks is about 24 hours).
- `max`: the maximum number of units that may be minted within one period.

Both values must be greater than zero. The limit is enforced over a rolling window: any mint, including a `batch_mint`, that would push the total minted within the trailing `period` blocks above `max` is rejected with `MintRateLimitExceeded`. There is no fixed reset point; allowance is restored as earlier mints age out of the window. Burning units does **not** restore allowance, as the limit measures minting velocity, not net supply.

### Setting and Changing a Limit

A token-scope limit can be set at creation time through the `mint_rate_limit` field of `CreateToken`. Otherwise, the collection owner uses the `set_mint_rate_limit` extrinsic, passing the `collection_id`, an optional `token_id` (`None` targets the collection scope), and the new `limit` (`None` removes it). What happens next depends on the direction of the change:

- **Tightening** takes effect immediately. This covers adding a limit where none existed, or lowering `max` without shortening `period`. A `MintRateLimitUpdated` event is emitted.
- **Loosening** is delayed. Raising `max`, shortening `period`, mixed changes, and removing the limit altogether are scheduled to take effect after a delay of 43,200 blocks (about 72 hours). A `MintRateLimitChangeScheduled` event is emitted with the `effective_block`, and the current limit stays enforced until then. Submitting another change while one is pending replaces it and restarts the delay.

The delay exists so that a compromised owner key cannot instantly loosen a limit and drain a token economy. It provides a window in which a pending loosening can be detected on-chain and stopped: the collection owner can call `cancel_mint_rate_limit_change` at any time before the effective block to discard the pending change, which applies immediately and emits a `MintRateLimitChangeCancelled` event.

Every rate limit change emits an event, so off-chain monitors can track a collection's minting policy without inspecting chain storage directly.

## ENJ Infusion

The ENJ Infusion of a token represents the backing value of each unit in ENJ, which is returned to the token holder when it's <GlossaryTerm id="burn" />ed.

Each token unit may have some ENJ infused into it. The token creator can choose to infuse ENJ to any of its tokens at any  given time, or at the time of creation.

![](/img/components/enjin-matrixchain/24.png)

Infused ENJ can only be retrieved by [burning the token supply](#burning-tokens).
Burning the token releases the ENJ to the holder.

In addition, the token creator can choose to allow anyone to add ENJ infusion to an existing token, or restrict it so only the creator can add ENJ infusion.

![](/img/components/enjin-matrixchain/25.png)

## Token Account Deposit

On top of the <GlossaryTerm id="storage_deposit" /> required to store the token on-chain, a Storage Deposit of 0.01 ENJ is required to store each Token Account on-chain.
A Token Account is created when an account has a <GlossaryTerm id="multitoken" /> balance of 1 or more, and it is destroyed when that balance becomes zero.

It's important to note that the storage deposit is required for each new Token Account created, not for the total supply of tokens minted.
For example:

- Minting/transferring 1,000 of a single MultiToken to **a single recipient account that doesn’t already hold a balance of that token** will require creating a Token Account for that recipient. This process incurs a one-time storage deposit of only 0.01 ENJ, covering the entirety of the 1,000 tokens.

- Minting/transferring any balance of a single MultiToken to **1,000 different recipient accounts, each of which doesn’t already hold a balance of that token**, will require creating a Token Account for each recipient. This process incurs a storage deposit of 0.01 ENJ per account, resulting in a total deposit of 10 ENJ.

The token creator can reserve some ENJ for Account Deposits on token creation with the `account_deposit_count` field.
ENJ reserve for Account Deposits can be added / removed ahead of time by any account, with the `update_account_deposit` extrinsic.

On a `mint`/`transfer` operation, if a new Account Deposit is needed and there's no account deposit in reserve, the ENJ required for the account deposit will be taken on demand from the account that performed the mint or transfer. If it is an operator transfer, it is taken from the source account.
In the future, if the created Token Account is destroyed, the ENJ used for the Account Deposit is returned to the account that originally reserved the on-demand deposit.
