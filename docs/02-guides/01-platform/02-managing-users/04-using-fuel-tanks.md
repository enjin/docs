---
title: "Using Fuel Tanks"
slug: "using-fuel-tanks"
description: "Use a fuel tank to pay transaction fees on your players' behalf, so they can transact without ever holding ENJ."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

A <GlossaryTerm id="fuel_tank" /> is an on-chain pool of <GlossaryTerm id="enjin_coin" /> (ENJ) that pays <GlossaryTerm id="transaction_fees" /> — and, optionally, <GlossaryTerm id="storage_deposit" />s — on behalf of other accounts. With a fuel tank, your players can transact without ever holding ENJ or worrying about gas.

Dispatching a transaction through a tank takes a single optional argument: add `fuelTank` to any `CreateTransaction` (or `CreateBatchTransaction`) and the platform routes that transaction through the tank.

A tank decides which transactions it pays for using a set of rules. When a transaction is dispatched through a tank, all of the following must hold:

- The tank is not frozen.
- The tank holds enough ENJ.
- The dispatching account is allowed to use the tank.
- The tank's rules allow this particular transaction.

:::info What you'll need
- An [Enjin Platform Account](/01-getting-started/04-using-the-enjin-platform.md).
- Some ENJ on Enjin / Canary Matrixchain to fund the tank. You can get cENJ (Canary ENJ) for testing from the [built-in Canary faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet) in the Platform UI.
- The [Enjin Blockchain Console](https://console.enjin.io/) — tanks are created and configured there.
:::

:::info Where tanks are created
Fuel tanks are created and configured in the [Enjin Blockchain Console](https://console.enjin.io/) for now. **Dispatching** through a tank already works from the Platform API today (see [Dispatching through a fuel tank](#dispatching)). Tank creation and management is being added to the Enjin Platform — this page will be updated when it lands.
:::

## Cover transaction fees for your players {#recommended-setup}

The most common use of a fuel tank is paying fees for players who never touch ENJ themselves.

A tank decides which transactions it pays for through a set of **rules**, which you can tailor to many different use cases — for example, a tank that only subsidizes transactions involving tokens from a specific collection, or one that covers fees only for a fixed list of whitelisted accounts. ([How fuel tanks work](#how-fuel-tanks-work) covers the full list.)

The setup below uses the most common rule, **Require Signature**, to build a tank that only your own application can dispatch through. That keeps the tank from being drained or used to subsidize unrelated apps, while your players transact without ever holding ENJ.

Most games onboard players with [managed wallets](/02-guides/01-platform/02-managing-users/03-using-managed-wallets.md): the game creates and operates a wallet for each player. To cover those players' fees, you configure the tank with:

- **User account management** enabled, with the tank reserving the account-creation deposit, so players are added to the tank automatically and never pre-fund anything.
- **Coverage policy** set to **Fees and Deposit**, so the tank pays both transaction fees and any storage deposit a call needs (for example, listing a token).
- **One rule set** with **Require account** enabled and a single **Require signature** rule set to your daemon wallet address.

Then you fund the tank with ENJ. The rest of this section walks through it.

### 1. Open the Fuel Tanks section {#open-fuel-tanks}

Head to the [Enjin Blockchain Console](https://console.enjin.io/) and make sure the network/chain selector in the top-left corner is set to the chain you want (for testing, use Canary Matrixchain).

![The network and chain selector in the top-left of the Enjin Blockchain Console](/img/guides/managing-users/v3-console-network-chain-selector.png)

In the top bar, open **Network → Fuel tanks**.

![The Network menu open, with Fuel tanks highlighted](/img/guides/managing-users/v3-console-network-fuel-tanks-menu.png)

### 2. Create and configure the tank {#create-tank}

On the Fuel tanks page, click **Create fuel tank** in the top-right.

![The Fuel tanks overview page with the Create fuel tank button](/img/guides/managing-users/v3-console-create-fuel-tank-button.png)

Fill out the form:

- **Using the selected address** — the account that owns and funds the tank. Switch it with the account selector if needed.
- **Name** — a unique name for the tank.
- **User account management** — turn the **include option** on, and have the tank reserve the account-creation deposit so players are added automatically without paying anything up front.
- **Coverage policy** — select **Fees and Deposit**.
- **Account rules** — leave empty for this setup.
- **Dispatch rules** — click **Add rule set**, enable **Require account**, then add a **Require signature** rule and set its account to your **Wallet Daemon** address.

![The Create fuel tank form, showing the name, user account management, coverage policy, account rules, and dispatch rules fields](/img/guides/managing-users/v3-console-create-fuel-tank-form.png)

Click **Create fuel tank** and sign the transaction. Once it is on-chain, the new tank appears in the Fuel tanks list with its own address.

:::tip Finding your daemon wallet address
The Require Signature rule must point at the address your Platform [Wallet Daemon](/01-getting-started/06-using-wallet-daemon.md) signs with — that's what lets the platform authorize dispatches through this tank automatically. The quickest way to find it is the **Daemon address** field on your [Platform settings page](https://platform.beta.enjin.io/settings), where you can copy it directly.
:::

### 3. Fund the tank {#fund-tank}

A tank can only pay fees while it holds ENJ. Send ENJ to the tank's address (shown in the Fuel tanks list). On Canary, top it up with cENJ from the [faucet](/01-getting-started/04-using-the-enjin-platform.md#canary-faucet). The list's **funds** column shows the current balance.

### 4. Dispatch transactions through the tank {#dispatch-through-tank}

Now any action you perform on a player's behalf can be paid for by the tank. Sign the transaction as the player's managed wallet with `signerExternalId`, and add `fuelTank` set to your tank's address:

```graphql
mutation DispatchThroughTank {
  CreateTransaction(
    network: CANARY
    chain: MATRIX
    signerExternalId: "docs-example-player" #The managed wallet performing the action
    fuelTank: "INSERT_FUEL_TANK_ADDRESS" #Your fuel tank's address, from the Fuel tanks list
    transaction: {
      transferToken: {
        recipient: "cxLf6yvvtscKrHRfKDphnzsT3eoRY45VbJvqXKub5pmj5mdbQ" #The recipient of the transfer
        collectionId: 36105 #Specify the collection ID
        tokenId: 1 #Token ID to transfer
        amount: 1 #Amount to transfer
      }
    }
  ) {
    uuid
    action
    state
  }
}
```

The player's managed wallet signs the action, and the tank covers the fee and any storage deposit. Because the tank's Require Signature rule points at your daemon wallet, the platform attaches the required signature for you — there is nothing extra to sign.

Once the transaction reaches `FINALIZED`, the chain emits the usual events for the action (here, `MultiTokens.Transferred`). See [Working with Events](/05-enjin-platform/03-working-with-events.md).

## Dispatching through a fuel tank {#dispatching}

`fuelTank` is available on both `CreateTransaction` and `CreateBatchTransaction`. Set it to a tank's address and the platform dispatches the transaction through that tank instead of paying the fee from the signing account. The transaction runs exactly as it normally would — the only difference is who pays for it.

A dispatch succeeds only if the signing account is allowed by the tank's rules and the tank can cover the cost; otherwise the transaction fails. If you need help choosing the right tank for a given call, see [Selecting a fuel tank to dispatch with](/04-enjin-blockchain/03-enjin-matrixchain/02-fuel-tank-pallet.md#selecting-a-fuel-tank-to-dispatch-with).

## How fuel tanks work {#how-fuel-tanks-work}

A tank decides what to pay for, and for whom, through two kinds of rules: **dispatch rules**, evaluated on every call, and **account rules**, evaluated when an account is added to the tank. Both are configured on the create-tank form in the Console.

### Dispatch rules and rule sets

A tank can have one or more **rule sets**, each a group of individual dispatch rules. A dispatched call must satisfy a rule set to be paid for. Each rule set has its own ID, so you can grant different callers different access by giving them different rule sets.

When you dispatch through the tank, `fuelTankRuleSetId` chooses which rule set the call is evaluated against. It defaults to `0`, so a tank with a single rule set needs nothing extra; set it to another rule set's ID to dispatch against that one instead.

Available dispatch rules:

- **`Whitelisted Callers`**: Subsidize <GlossaryTerm id="transaction" />s dispatched from specific <GlossaryTerm id="wallet_account" />s.
- **`Whitelisted Collections`**: Subsidize <GlossaryTerm id="transaction" />s involving a specific <GlossaryTerm id="collection" />.
- **`Require Token`**: Subsidize <GlossaryTerm id="transaction" />s only if the caller holds a specific NFT.
- **`Whitelisted Pallets`**: Subsidize <GlossaryTerm id="transaction" />s involving a specific <GlossaryTerm id="pallet" />.
- **`Permitted Extrinsics`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s (for example, marketplace listing calls).
- **`Permitted Calls`**: Subsidize <GlossaryTerm id="transaction" />s involving specific <GlossaryTerm id="extrinsic" />s and parameters.
- **`User Fuel Budget`**: Cap how much fuel each user account can spend in a period.
- **`Tank Fuel Budget`**: Cap the tank's total fuel spend over a period to extend its lifespan.
- **`Max Fuel Burn Per Transaction`**: Cap fuel spent on any single transaction.
- **`Require Signature`**: Subsidize only <GlossaryTerm id="transaction" />s carrying a valid signature from a specific <GlossaryTerm id="wallet_account" />. This is the rule behind the [recommended setup](#recommended-setup) above.

### Require Account

A rule set can also require that the dispatching account already has a user account in the tank before it will pay for a call, by enabling **Require account** on the rule set.

### Account rules

Account rules decide who is allowed to be added to the tank's user accounts. Two are available:

- **`Whitelisted Callers`**: Only listed accounts may be added to the tank's user accounts.
- **`Require Token`**: Only accounts that hold the specified token may be added.

An account is added either ahead of time by the tank owner, or automatically the first time it dispatches — the latter requires user account management to be enabled.

### User account management

By default, only the tank owner can add accounts to the tank's user accounts. Enabling **user account management** lets accounts be added automatically. You also choose whether the tank covers each new user account's <GlossaryTerm id="storage_deposit" />:

- **Tank reserves the deposit** — accounts are added without pre-funding anything. This is what the [recommended setup](#recommended-setup) uses, so players never need ENJ.
- **Tank does not reserve the deposit** — accounts can add themselves, but must cover their own user-account storage deposit.

### Coverage policy

The coverage policy controls what the tank pays for:

- **Fees** — transaction fees only.
- **Fees and Deposit** — transaction fees plus any storage deposit a call requires (for example, listing a token locks a deposit until the listing is filled or cancelled).

## Other configurations {#other-configurations}

The recommended setup is one combination of these rules, but they can be mixed for more targeted tanks — for example, a tank that only pays for batch transfers within a single collection, or one that caps each player at a fixed budget per month. Configure any of these on the create-tank form in the Console. For the complete rule reference, see the [Fuel Tank pallet](/04-enjin-blockchain/03-enjin-matrixchain/02-fuel-tank-pallet.md) documentation.
