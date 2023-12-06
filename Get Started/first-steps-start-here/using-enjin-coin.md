---
title: "Using Enjin Coin"
slug: "using-enjin-coin"
excerpt: "The fuel that powers the Enjin Ecosystem."
hidden: false
createdAt: "Tue Oct 31 2023 18:07:43 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Nov 21 2023 15:05:14 GMT+0000 (Coordinated Universal Time)"
---
<<glossary:Enjin Coin>> is used to pay <<glossary:Transaction Fees>> fees (also known as <<glossary:Gas>>) and to add <<glossary:Backing Value>> to tokens on the <<glossary:Enjin Blockchain>>. 

Enjin <<glossary:Coin>> can come in three different forms:

- **<<glossary:ENJ>>: **This is the native version of Enjin Coin. You can buy it on cryptocurrency exchanges and use it for each <<glossary:Blockchain>> <<glossary:Transaction>> or use it to create new tokens on the Enjin Blockchain <<glossary:Mainnet>>.
- **cENJ: **This is the <<glossary:Testnet>> version of Enjin Coin. It's available for free from the [cENJ faucet](https://faucet.canary.enjin.io/) and can be used just like ENJ for transactions and minting tokens, but on the Enjin Canary Testnet.
- **sENJ: **sENJ represents staked ENJ. It's issued to you when you [stake your ENJ](https://enjin.readme.io/docs/validator-staking) and is destroyed when you unstake. You can <<glossary:Stake>> your ENJ into a <<glossary:Validator>> or <<glossary:Collator>>. Once you've received your sENJ from staking, it can be traded for ENJ through a specific trading process on the platform.

## Unit Price

The unit price of a token tells you how much Enjin Coin (ENJ) is locked inside each token as its backing value.

Here's why it's important:

- It covers the costs for creating and keeping accounts that hold tokens.
- It decides how much ENJ is needed to make new tokens and the smallest amount of ENJ that must be in an account.

It’s important to note that once the unit price is set, it can be increased but never decreased. You should select a unit price that aligns with the economic and distribution goals for the token.

### Minimum Account Balance

To maintain an Enjin Coin Account on the network, a wallet must have a balance above 0.01 ENJ. If an Enjin Coin Account balance falls below this, it is automatically deleted unless a transfer includes the `keepAlive` flag set to true, which prevents deletion during the transfer process.

> 🚧 Keep Alive: False
> 
> When transferring tokens you've created using the Enjin Platform, always set `keepAlive` to `False`.
> 
> This flag only relates to your Enjin Coin balance and has no impact on any other token on the network.

The minimum account balance requirement does not affect NFTs or multi-token accounts. You can safely hold NFTs in a wallet even if its Enjin Coin Account balance is 0 ENJ.

When `keepAlive` is set to true, it guarantees that the sending account will stay active, even if its balance drops below the network's minimum threshold. However, if you set `keepAlive` to false, the network might delete the sender's account once its balance falls below the minimum requirement (which is 0.01 ENJ on the Enjin network). This deletion occurs because the system assumes that the account is no longer in use.

This feature is particularly useful when you are transferring the entirety or a large portion of an account's funds and want to make sure that the account remains active after the transfer. It is a safeguard against accidental deletion of accounts due to balance underflow as a result of the transfer.

### ENJ Token Deposit

When minting new tokens on the Enjin Blockchain, an initial deposit of ENJ is required. This deposit is calculated by multiplying the unit price by the total supply of tokens (`unit_price * total_supply`). Once tokens are destroyed, or 'burned', this deposit is returned to the issuer's account proportionally.

The smallest deposit that must be made is 0.01 ENJ.

To make sure that each token holds at least this minimum amount, the unit price needs to be set with this in mind. This ensures that the total deposit for the tokens minted does not fall below the necessary threshold.

### Examples

#### For (<<glossary:Non-Fungible Tokens>>) (like unique collectibles):

- You decide to create a unique digital artwork as an <<glossary:NFT>>.
- The minimum deposit for creating this token is 0.01 ENJ (`Config::TokenAccountDeposit`), ensuring the token can be issued.
- Since you're creating just one NFT, the total deposit needed is 0.01 ENJ (`unit_price * total_supply`).
- The account holding this NFT must maintain a balance of at least 0.01 ENJ, which is covered by the entire value of the NFT, to keep the account active.

#### For <<glossary:Fungible Tokens>> (like in-game currency):

- You want to create 100,000 <<glossary:FT>>s for in-game transactions.
- If you set the unit price at the minimum of 0.01 ENJ, then the total deposit required would be 1,000 ENJ (`0.01 ENJ * 100,000 tokens`).
- The specific unit price you choose will affect how much ENJ each player needs to have in their account to hold your tokens and how much ENJ you need to lock up as the issuer.

When setting the unit price for either NFTs or fungible tokens, it’s crucial to balance the ENJ deposit required and the accessibility for account holders, keeping in mind the unique or divisible nature of the token.

> 👍 Next, learn how to [Use the Enjin Platform](/docs/using-the-enjin-platform).