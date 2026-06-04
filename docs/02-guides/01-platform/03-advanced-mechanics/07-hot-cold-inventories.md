---
title: "Hot & Cold Inventories"
slug: "hot-cold-inventories"
description: "A best-practice pattern for real-time games on the Enjin Platform: keep tradeable assets on-chain in a cold inventory, keep consumable fast-action items in an off-chain hot inventory, and move items between them with on-chain mints and melts."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

Some games can wait a few seconds for the blockchain. Fast-paced games can't. This guide describes a pattern — **hot and cold inventories** — that lets a real-time game keep instant, web2-style gameplay while still giving players true on-chain ownership of the items that matter.

## The problem: the blockchain isn't a real-time database

Real-time games are full of **atomic actions** — things that have to resolve *now*. A player on low health drinks a potion this instant, or their character dies. There's no room for a loading spinner.

On-chain, every state change is a <GlossaryTerm id="transaction" /> that has to be included in a block and then finalized. That takes seconds, not milliseconds. Put a consumable's on-chain <GlossaryTerm id="burn" /> on the critical path of combat and the game becomes unplayable.

The fix isn't to make the chain faster — it's to keep real-time actions **off** the chain entirely, and use the chain only for what it's uniquely good at: **ownership and settlement.**

## The model: hot and cold inventories

Give each player's items two possible homes:

| | **Cold inventory** | **Hot inventory** |
| :--- | :--- | :--- |
| **What it is** | The player's on-chain wallet | An off-chain ledger your game server owns (a database table) |
| **Speed** | Seconds (on-chain transaction) | Instant (a database write) |
| **Good for** | Trading, transferring, true ownership | Consuming and mutating items in real time |
| **On-chain footprint** | Real tokens | None — while an item is hot, it doesn't exist on-chain |

By default, items live **hot**: they're earned, bought, and used entirely off-chain, so to the player the game feels like any other. Moving an item to cold is a deliberate step a player takes when they want to trade it or hold it themselves.

:::info "Cold inventory" is really a wallet
*Cold inventory* is just a friendlier, player-facing name for the player's on-chain wallet — a managed wallet you create for them, or a self-custodial wallet they connect. *Hot inventory* is not a wallet at all; it's rows in your own database.
:::

One rule keeps the whole scheme honest: **a unit is either hot or cold, never both.** Moving an item between the two inventories removes it from one and recreates it in the other. As a result, the on-chain supply of a token always equals "the number of units currently held cold" — the hot units have no on-chain existence.

## Deciding what goes where

Two independent questions decide how an item behaves.

### 1. Is the item *mintable*? (decided at design time)

This is whether the item can ever exist as an on-chain token.

- **Non-mintable** — has no on-chain token, ever, and lives in the hot inventory for its whole life. Best for high-churn, low-value items where putting them on-chain would cost a <GlossaryTerm id="storage_deposit" /> and fees for no real benefit: common consumables, ammunition, temporary buffs, crafting intermediates, soft currency.
- **Mintable** — has a real on-chain token, so it can move between hot and cold. Best for items players will trade or want to truly own: rare gear, cosmetics, named or unique drops.

### 2. For mintable items: can it be used while cold?

This depends on **what "using" the item actually does**:

- If using it only **reads ownership** — equipping a sword, wearing a cosmetic, unlocking gated content — it works fine while **cold**. The game just checks that the wallet holds it; there's no real-time state change, so there's nothing to wait for.
- If using it **consumes or mutates** it in real time — drinking a potion, spending ammo, applying a one-shot buff — it must be **hot** first, because that change can't wait for finalization.

| Item | Mintable? | Used by… | Where it's used |
| :--- | :--- | :--- | :--- |
| Common health potion | No | Consuming | Hot only |
| Rare elixir (tradeable) | Yes | Consuming | Move to hot, then use |
| Legendary sword | Yes | Equipping (reads ownership) | Usable while cold |
| Cosmetic skin | Yes | Wearing (reads ownership) | Usable while cold |

## Moving items: mint in, melt out

The lifecycle of a mintable item:

- **Earn or buy** → credited straight to the **hot** inventory. An off-chain write — no transaction, no fee.
- **Move to cold** ("make it real") → <GlossaryTerm id="mint" /> the token to the player's cold wallet, and debit the hot ledger by the same amount.
- **Move to hot** ("bring it in to use") → melt (burn) the token from the cold wallet, and — once the transaction is finalized — credit the hot ledger.
- **Use from hot** → an off-chain decrement. Instant.

The key insight: the on-chain transaction happens at the **move**, not at the **use**. A player moves a stack of 50 potions to hot once (a single melt), then consumes them instantly for the rest of the session. You pay the latency once, when the item moves between inventories — and you hide it behind a **cooldown**, the same "item is recharging" feedback players already understand. Use a <GlossaryTerm id="multi_unit_token" /> for stackable consumables so an entire stack moves in one transaction.

:::note Naming the move for players
This guide calls it "moving" an item between inventories. In your game's UI, call it whatever fits — many games use something like "teleport" or "warp." If you use **teleport**, be aware it's unrelated to Enjin's **ENJ teleport** (which moves ENJ between the Matrixchain and Relaychain); choose wording that won't confuse players who also hold ENJ.
:::

## Worked example on the Enjin Platform

### Cold inventory: the player's wallet

Each player gets an on-chain wallet that acts as their cold inventory — either a [managed wallet](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md) you create for them (`CreateManagedWallet(externalId: "player-115")`), or a self-custodial wallet they [link to your application](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/01-sending-wallet-requests.md#step-1--linking-a-players-wallet).

### Hot inventory: your database

The hot inventory is a table you own — for example `(player_id, token_id, quantity)`. Consuming an item is an `UPDATE` against this table: instant, and entirely under your control.

### Move to hot — melt from the cold wallet

Burn the token from the player's cold wallet. For a managed wallet, the platform signs on its behalf via `signerExternalId`:

```graphql
mutation MoveToHot {
  CreateTransaction(
    network: ENJIN                  # or CANARY for testnet
    chain: MATRIX
    signerExternalId: "player-115"  # the player's cold inventory (their managed wallet)
    transaction: {
      burnToken: {
        collectionId: 36105
        tokenId: 10                 # e.g. "Health Potion"
        amount: 50                  # move a whole stack in one transaction
        removeTokenStorage: false
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

Then **wait for finalization before crediting the hot ledger** — poll [`GetTransaction(uuid:)`](/03-api-reference/01-queries/01-transactions-queries.md#gettransaction) until `state` is `FINALIZED`:

```graphql
query ConfirmMove {
  GetTransaction(uuid: "<uuid-from-above>") {
    state                            # credit the hot ledger only once this is FINALIZED
  }
}
```

See [Working with Events](/05-enjin-platform/03-working-with-events.md) for the full finalization-and-events workflow. (Real-time push events that remove the need to poll are [planned](/03-api-reference/03-websocket-events.md).)

For a **self-custodial** cold wallet, your server can't sign the melt — instead, the player approves it in their own Enjin Wallet app via a [wallet request](/02-guides/01-platform/02-managing-users/01-connecting-user-wallets/01-sending-wallet-requests.md).

### Move to cold — mint to the cold wallet

Mint the token to the player's cold wallet (signed by the collection owner via the <GlossaryTerm id="wallet_daemon" /> by default), and debit the hot ledger by the same amount once finalized. The `recipient` is the cold wallet's public key, which you can look up with [`GetManagedWallet`](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md#finding-a-managed-wallet):

```graphql
mutation MoveToCold {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "0xded3c8f0296f5ee023f07aa5617fc261bd5991c4474ee775a16ec35c1d1a1e3a"
        collectionId: 36105
        tokenId: 10
        amount: 50
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

### Move several items at once

If a player moves several different item types between inventories at once — a "withdraw everything to my wallet" button, say — bundle the actions into a single [`CreateBatchTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md) so they settle atomically with one fee instead of many.

### Cover the fees

Moving to hot melts a token from the player's wallet, which needs ENJ to pay <GlossaryTerm id="transaction_fees" />. Use a <GlossaryTerm id="fuel_tank" /> so your game sponsors these transactions and players never have to hold ENJ themselves.

## Correctness & pitfalls

- **Never credit the hot inventory before the melt is `FINALIZED`.** If you credit early and the transaction reverts, the player ends up with the item in *both* inventories — a double-spend. Treat finalization as the only signal that the move succeeded.
- **Don't try to "optimistically" consume a cold item.** Letting a player use or open a cold item *before* its melt finalizes is exploitable: in the gap, they can transfer or sell that same token and keep both the item and its result. This is especially dangerous with self-custodial wallets, where the player — not your server — holds the keys. The model itself is the defense: an item must be **hot**, under your server's control, before it can be used instantly. Don't shortcut around it.
- **Match the supply cap to how the item moves.** Moving an item to hot burns its on-chain token; moving it back to cold mints a new one. A [**Collapsing Supply**](/02-guides/01-platform/03-advanced-mechanics/03-enforced-rarity.md#immutable-tokenomics) cap permanently lowers a token's maximum supply whenever units are burned, which blocks re-minting:
  - **Two-way items** — anything that will move between hot and cold more than once (e.g. a tradeable consumable a player withdraws and later brings back to use) — need a **fixed supply cap**, so the token can be re-minted on each trip to cold.
  - **One-way items** — minted to cold once and meant to stay there, like a non-consumable sword a player withdraws to keep — can use **Collapsing Supply**, since the token is never burned and re-minted. It can even reinforce the item's scarcity.
- **The hot ledger is production-critical data.** Items that are hot were burned on-chain — they exist *only* in your database. Back it up and treat it as the source of truth it is. This is also the trade-off to weigh: while an item is hot, the player is trusting your custody, exactly as they would in a web2 game; cold is where they hold it themselves.
- **Make every move idempotent.** A double-submitted "move to hot" must not melt twice. Key each move by a unique request ID and ignore duplicates.
- **Wait for finalization, not just block inclusion.** A transaction that's included can still be reverted by a reorg. Only act on `FINALIZED`.

:::info Related building blocks
This pattern combines several platform features documented elsewhere: [Managed Wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md), [Minting Tokens](/02-guides/01-platform/01-managing-tokens/04-minting-a-token.md), [Melting / Burning Tokens](/02-guides/01-platform/01-managing-tokens/08-burning-destroying-tokens.md), [Fuel Tanks](/02-guides/01-platform/02-managing-users/04-using-fuel-tanks.md), and [Working with Events](/05-enjin-platform/03-working-with-events.md). For a complete (but simpler, fully on-chain) integration to build from, see the [Enjin Farmer sample game](/02-guides/01-platform/05-enjin-farmer-sample-game/03-implementation-breakdown.md).
:::
