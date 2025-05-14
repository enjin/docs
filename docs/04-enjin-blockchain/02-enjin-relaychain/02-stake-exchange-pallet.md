---
title: "Stake Exchange Pallet"
slug: "stake-exchange-pallet"
---
:::info The Enjin Blockchain Console
Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.
:::

## Introduction

Stake Exchange Pallet enables users holding ENJ tokens to create offers for staking and allows users holding sENJ tokens to exchange them back to ENJ tokens. Each offer has preferences regarding the exchange rate and the specific type of sENJ tokens it can accept. It's important to note that sENJ tokens correspond to a different pool in the Stake Exchange Pallet. Users can select the offer that best suits their preferences and perform the token exchange accordingly. This user manual provides step-by-step instructions on how to use the pallet to stake ENJ tokens and exchange them for sENJ tokens.

## Enjin Nomination Pools and Liquid Staking:

Enjin Nomination Pools are an integral part of the Stake Exchange Pallet. They serve as pools that hold ENJ tokens, and issue sENJ tokens in return. Each sENJ type corresponds to a specific pool.

Liquid Staking allows users to stake their ENJ tokens and receive sENJ tokens in return. These sENJ tokens represent the staked value of their ENJ tokens. By staking their ENJ tokens, users contribute to the security and operation of the Enjin network.

Through the Stake Exchange Pallet, users holding sENJ tokens can easily convert them back to ENJ tokens by selecting the appropriate offer from the available options. Each offer within the pallet specifies the exchange rate and the type of sENJ tokens it accepts. Users can choose the offer that aligns with their preferences and execute the token exchange accordingly.

By utilizing Enjin Nomination Pools and the Stake Exchange Pallet, users have the flexibility to stake their ENJ tokens for network participation and later convert them back to ENJ tokens when desired, providing liquidity and accessibility to their staked assets.

## Glossary

**sENJ Tokens**: The staked version of the ENJ tokens. These tokens are represented using the `StakedCollectionId` collections in the `pallet_multi_tokens` instance.

**Exchange Rate**: The rate at which ENJ tokens can be exchanged for sENJ tokens and vice versa.

**Liquidity Account**: An account used for managing liquidity. It is associated with a specific user and holds the liquidity for their offers.

## Getting Started

Ensure that you have access to an Enjin Relay Chain and have the necessary ENJ tokens to stake. The UI used in this guide can be accessed [here (*Canary Testnet)](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.canary.enjin.io#/extrinsics)

**Accessing the Pallet Functions:**  
Open your Enjin Explorer and navigate to the Developer -> Extrinsics interface. Locate the "Stake Exchange Pallet" and click on it to access the available functions.

## Creating an Offer

- Click on the "Create Offer" function to start the process of staking your ENJ tokens and creating an offer.
- Enter the required parameters for the offer:
  - Total : Specify the amount of ENJ tokens you want to exchange.
  - Rate : Define the exchange rate for converting sENJ tokens to ENJ tokens.
  - minAverageRewardRate : Define the minimum reward rate you would accept for the offer.
- Review the entered parameters and click "Confirm" to proceed.
- If successful, you will receive a confirmation message indicating that the offer has been created. Note the generated Offer ID for future reference.

***

**_Note_** : `PoolReward` is calculated by dividing the ENJ bonded in the pool by the points in the pool. Lets consider these two examples

Pool X (has not received any rewards):

| Points | Total Bonded ENJ | Avg reward rate |
| ------ | ---------------- | --------------- |
| 1000   | 1000             | 1               |

Pool Y : (received some rewards)

| Points | Total Bonded ENJ | Avg reward rate |
| ------ | ---------------- | --------------- |
| 1000   | 1100             | 1.1             |

Pool Z : (slashed)

| Points | Total Bonded ENJ | Avg reward rate |
| ------ | ---------------- | --------------- |
| 1000   | 900              | 0.9             |

***

**_Note_** : `minAverageRewardRate` is used to represent the minimum accepted reward rate of a token (or pool). The reward rate of the pool is calculated by dividing the ENJ bonded in the pool by the points in the pool. By setting this value, the user can ensure a minimum reward rate for all sENJ tokens used to fill this offer. Lets consider two examples below

1. minAverageRewardRate set to 1.1

In this case, only Pool Y tokens (and any other pool where average reward rate is greater than 1.1) will be accepted. If a user with sENJ tokens from Pool Y tries to buy from this offer, they will see the `RewardRateOutOfRange` error.

2. minAverageRewardRate set to 1

In this case, both Pool X and Pool Y tokens (and any other pool where average reward rate is greater than 1) will be accepted. If a user with sENJ tokens from Pool Z with a reward rate of 0.9 tries to buy from this offer, they will see the `RewardRateOutOfRange` error.

So as the creator of the offer, it is in your best interest to keep this value as high as possible, so that the sENJ you will receive will reap the maximum rewards. Do keep in mind that there are practical limitations in how high this value can be set, for example if you set it to `3` (aka 3x reward for every token), no sENJ tokens maybe eligible to fill your offer since it is unlikely to have a pool/validator with that high reward rate. The ideal value to set here can be obtained by inspecting the current active pools, and setting a value that is high enough and accepts most pools.

***

**_Note_** : The `minAverageRewardRate` is represented by u128, which allows for higher precision. Example :

if its 1, (the pool should have a reward rate greater than or equal to 1) you would use 1000000000000000000  (1x)  
if its 1.1, (the pool should have a reward rate greater than or equal to 1.1), you would use 1100000000000000000 (11.x)  
if its 2 (the pool should have a reward rate greater than or equal to 2), you would use 2000000000000000000  (2x)

To get the input ratio, you can multiply your desired ratio with `1000000000000000000`,  
ex : `1.112 * 1000000000000000000 = 1120000000000000000`  
This ratio means, the offer will only accept pool with a reward rate more than 1.112

***

**_Note_** : The `rate` is also represented by Perbill, this value will be used to determine how many `sENJ` will be required to get `ENJ`. Example :

if its 1:1, (you need 1 sENJ to get 1ENJ) you would use 1000000000  (100%)  
if its 0.9:1, (you need 0.9 sENJ to get 1ENJ), you would use 900000000 (90%)

***

**_Note_** : The `tokenFilter` is used to control which pool tokens can be used to fill an active offer. TokenFilter can be configured to be one of these values

1. All (all pool tokens are accepted, configs set on liquidity account still apply)
2. Whitelist (this allows you to whitelist pool tokens, only these tokens will be accepted, all others will be rejected).
3. Blacklist (this allows to block selected pool tokens, all other tokens will be accepted.)

***

The below example creates an offer with a liquidity of 1000ENJ (1000000000000000000000), and offers a rate of 99% (990000000), and will accepts pools with a reward rate of 1.1 (1100000000000000000). The offer only accepts tokens from Pool ID 2.

![](/img/components/enjin-relaychain/34.png)

## Canceling an Offer

- If you wish to cancel a previously created offer, click on the "Cancel Offer" function.
- Enter the Offer ID of the offer you want to cancel.
- Click "Confirm" to proceed with the cancellation.
- If successful, you will receive a confirmation message indicating that the offer has been canceled.

![](/img/components/enjin-relaychain/35.png)

## Configuring Liquidity Account

:::note
Configuring Liquidity Account is only required if you create an offer aka if you provide liquidity to the pallet, you do not need to configure a liquidity account to buy tokens
:::

- To configure your liquidity account, click on the "Configure Liquidity Account" function.
- The liquidity account configuration allows you to allow/disallow certain sENJ tokens from the offer created by your account. To allow an sENJ token, add the token to the whitelist and to disallow it, add it to the blacklist. These restrictions are enforced to all offers created by your account.

   Example configuration to disallow sENJ tokens with tokenId 210:

![](/img/components/enjin-relaychain/36.png)

## Withdrawing Liquidity

- If you want to withdraw liquidity from an active offer, click on the "Withdraw Liquidity" function.
- Enter the Offer ID of the offer from which you wish to withdraw liquidity.
- Specify the amount of liquidity you want to withdraw.
- Click "Confirm" to proceed with the withdrawal.
- If successful, you will receive a confirmation message indicating that the liquidity has been withdrawn.

   Example : You created an offer with initial amount of 1000ENJ. If you withdraw liquidity of 400ENJ, then your updated offer will have a liquidity of 600ENJ.

![](/img/components/enjin-relaychain/37.png)

## Adding Liquidity

- To add liquidity to an active offer, click on the "Add Liquidity" function.
- Enter the Offer ID of the offer to which you want to add liquidity.
- Specify the amount of liquidity you want to add.
- Click "Confirm" to proceed with adding liquidity.
- If successful, you will receive a confirmation message indicating that the liquidity has been added.

   Example : You created an offer with initial amount of 1000ENJ. If you add liquidity of 400ENJ, then your updated  
   offer will have a liquidity of 1400ENJ.

![](/img/components/enjin-relaychain/38.png)

## Buying Tokens

- To exchange sENJ tokens for ENJ tokens, click on the "Buy" function.
- Enter the Offer ID of the offer from which you want to buy tokens.
- Specify the amount of ENJ tokens you want to receive.
- Enter the Token ID for the specific token you want to exchange.
- Click "Confirm" to proceed with the token exchange.
- If successful, you will receive a confirmation message indicating that the token exchange has been completed. You will also receive the exchanged ENJ tokens in your wallet.

![](/img/components/enjin-relaychain/39.png)

Happy staking and token exchanging!
