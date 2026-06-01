---
title: "Sending Wallet Requests"
slug: "sending-wallet-requests"
description: "Link a player's wallet to your application and send transaction requests — consume items, list on the marketplace, infuse, stake — directly to their Enjin Wallet app for approval."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

Many in-game actions need the **player** to authorize a transaction on their own wallet — consuming a potion they own, listing their loot on the marketplace, staking their ENJ for a guild perk. For these, your application can't sign with its own Wallet Daemon — the transaction has to come from the player.

The Enjin Platform's native wallet-request flow lets your application **link a player's wallet** with their consent, and then **send transaction requests** straight to their <GlossaryTerm id="enjin_wallet_app" />. The player sees the request, approves or rejects it, and the platform handles the rest.

:::warning Coming soon
The native wallet-request flow described on this page is **planned** and will be available once the Enjin Platform exits beta. The exact mutation names, argument shapes, and event payloads are not finalized yet — this page covers the flow conceptually and will be updated with code examples once the feature ships.
:::

## How it works

The flow has two steps:

1. **Link the wallet.** Your application sends a one-time **connection request** to the player. They approve it in their Enjin Wallet app, and the wallet is then linked to your application on the platform.
2. **Send transaction requests.** From then on, any transaction your application creates can be targeted at the linked wallet. The player receives the request in their Enjin Wallet app, approves it (which signs it), and the transaction is broadcast on-chain.

The link persists, so the connection step only happens once per player. Every subsequent action — consume, list, transfer, stake — is a single approval prompt in their Enjin Wallet app.

## Step 1 — Linking a player's wallet

Your application initiates a connection request scoped to the player. The platform delivers it to the player's Enjin Wallet app, where they see your application's name and what they're being asked to link. Once they approve, the wallet's address is returned to your application and the link is stored on the platform.

After that, your application can:

- Read the player's on-chain state (balance, tokens) through [`GetAccount`](/02-guides/01-platform/02-managing-users/02-reading-user-wallets.md) using the linked address.
- Send transaction requests against the linked wallet (Step 2).

A player can unlink at any time from their Enjin Wallet app, which revokes your application's ability to send them further requests.

## Step 2 — Sending transaction requests

Once a player's wallet is linked, your application can request that they sign **any** transaction the platform supports — token transfers, burns, marketplace listings, infusions, nomination-pool bonds, and so on.

The mechanic is straightforward: when your application calls `CreateTransaction`, it sets an argument identifying the linked player as the intended signer. The transaction is built on the platform, but instead of being signed by your Wallet Daemon, it's pushed to the player's Enjin Wallet app as a signing prompt. Approving it in the app produces the signature; rejecting it cancels the transaction.

The response your application receives includes a `uuid` for the transaction. Poll `GetTransaction(network, chain, uuid: "<returned-uuid>")` to watch its `state` move through `PENDING` → `BROADCAST` → `FINALIZED` (or `ABANDONED` if the player rejects, `TIMEOUT` if they don't respond).

Once it reaches `FINALIZED`, the corresponding on-chain event is emitted — `MultiTokens.Burned` after a burn, `Marketplace.ListingCreated` after a listing, `NominationPools.Bonded` after a stake, and so on. See [Working with Events](/05-enjin-platform/03-working-with-events.md) for how to read them, and use the event payload to react in-game.

## Example use cases

The transactions a player can sign are the same ones your application's Wallet Daemon can sign — anything in the [`CreateTransaction` discriminator](/03-api-reference/02-mutations/01-transaction-mutations.md). A few examples that illustrate the gameplay loops this unlocks:

### Consume an in-game item

Send a request to burn a **Health Potion** NFT the player owns. On `FINALIZED`, your game reads the `MultiTokens.Burned` event, confirms the burn matched the player's wallet and the potion's token id, and restores their HP in-game. The same pattern covers any "consume" action — eat food, drink mana, use a one-shot scroll.

### List an item on the marketplace

Send a request to list the player's **Epic Sword** on the [Enjin Marketplace](https://nft.io/) for 300 ENJ. On `FINALIZED`, the `Marketplace.ListingCreated` event returns the new `listing_id`; your game can store it against the item and show "Listed for sale" on it in the player's inventory.

### Infuse ENJ into a token

Send a request to infuse 50 ENJ into the player's **Legendary Sword** to boost its in-game stats. On `FINALIZED`, the `MultiTokens.Infused` event confirms the new infusion amount, which your game reads to apply the stat boost — and the additional underlying ENJ value — to the item.

### Stake ENJ in the game's nomination pool

Send a request to bond 500 ENJ into your game's nomination pool to unlock a guild perk. On `FINALIZED`, the `NominationPools.Bonded` event confirms the amount; your game grants the player the perk and starts displaying their pool position in-game.

:::info Explore More Arguments
For a comprehensive view of all available arguments for queries and mutations, please refer to our [API Reference](/03-api-reference/03-api-reference.md). This resource will guide you on how to use the GraphiQL Playground to explore the full structure and functionality of our API.
:::
