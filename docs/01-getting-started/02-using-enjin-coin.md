---
title: "Using Enjin Coin"
slug: "using-enjin-coin"
description: "Learn how to use Enjin Coin, the cryptocurrency powering the Enjin ecosystem, for creating, managing, and integrating blockchain-based assets in games and apps."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

<GlossaryTerm id="enjin_coin" /> is used to pay <GlossaryTerm id="transaction_fees" />  (also known as <GlossaryTerm id="gas" />), <GlossaryTerm id="storage_deposit" />, and to add <GlossaryTerm id="enj_infusion" /> to <GlossaryTerm id="multitoken" />s on the <GlossaryTerm id="enjin_blockchain" />.

Enjin <GlossaryTerm id="coin" /> can come in three different forms:

- **<GlossaryTerm id="enj" />: **This is the native version of Enjin Coin. You can buy it on cryptocurrency exchanges and use it for each <GlossaryTerm id="blockchain" /> <GlossaryTerm id="transaction" /> or use it to create new <GlossaryTerm id="multitoken" />s on the Enjin Blockchain <GlossaryTerm id="mainnet" />.
- **cENJ: **This is the <GlossaryTerm id="testnet" /> version of Enjin Coin. It's available for free from the [cENJ faucet](https://faucet.canary.enjin.io/) and can be used just like ENJ for transactions and minting <GlossaryTerm id="multitoken" />s, but on the Enjin Canary Testnet.
- **sENJ: **sENJ represents staked ENJ. It's issued to you when you [stake your ENJ](/04-components/04-enjin-relaychain/04-joining-nomination-pools.md) and is destroyed when you unstake. You can <GlossaryTerm id="stake" /> your ENJ into a <GlossaryTerm id="validator" /> or <GlossaryTerm id="collator" />. Once you've received your sENJ from staking, it can be [traded for ENJ](/04-components/04-enjin-relaychain/05-stake-exchange-pallet.md).

## ENJ Infusion

Infusing ENJ to a <GlossaryTerm id="multitoken" /> is the process of locking Enjin Coin (ENJ) inside each <GlossaryTerm id="multitoken" /> unit as its backing value.

Here's why it's important:

- The <GlossaryTerm id="multitoken" /> holder can melt it at anytime to retrieve the embedded ENJ. This provides intrinsic value for <GlossaryTerm id="multitoken" />s, bringing value besides it's market value.
- Once a<GlossaryTerm id="multitoken" /> is infused, the infused amount is required to be deposited for each new unit minted, making the asset more scarce.

It’s important to note that once a <GlossaryTerm id="multitoken" /> is infused with ENJ, it's infused ENJ amount can increase but it can never be decreased.

### Minimum Account Balance (Existential Deposit)

To keep an Enjin Coin Account active on the network, the wallet must hold **at least 0.1 ENJ**. If the balance drops below this threshold, the account may be **automatically deleted** - unless the transfer uses the `keepAlive` flag set to `true`.

> Note: This requirement only applies to Enjin Coin accounts. NFT (<GlossaryTerm id="multitoken" />) holdings are unaffected and remain safe even if the wallet has 0 ENJ.

When `keepAlive` is set to `true`, the transfer will fail if it would reduce the balance below 0.1 ENJ—ensuring the account stays active. If set to `false`, the transfer will go through, but the account may be deleted if the balance falls below the threshold.

Use `keepAlive: true` to **prevent accidental deletion**, especially when transferring most or all of a wallet’s balance.

### Token Account Deposit

A <GlossaryTerm id="storage_deposit" /> of 0.01 ENJ is required for each <GlossaryTerm id="multitoken" /> holder.
This deposit is also known as <GlossaryTerm id="token_account_deposit" />.
Once <GlossaryTerm id="multitoken" />s are destroyed, or 'burned', this deposit is returned to the issuer's account proportionally.

:::tip What's next?
Learn how to [Use the Enjin Platform](./03-using-the-enjin-platform.md).
:::
