---
title: "Stake Exchange Pallet"
slug: "stake-exchange-pallet"
excerpt: ""
hidden: false
metadata: 
image: []
robots: "index"
createdAt: "Tue Oct 31 2023 21:23:54 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 01 2023 00:36:22 GMT+0000 (Coordinated Universal Time)"
---
> 📘 Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.

# Introduction

Stake Exchange Pallet enables users holding ENJ tokens to create offers for staking and allows users holding sENJ tokens to exchange them back to ENJ tokens. Each offer has preferences regarding the exchange rate and the specific type of sENJ tokens it can accept. It's important to note that sENJ tokens correspond to a different pool in the Stake Exchange Pallet. Users can select the offer that best suits their preferences and perform the token exchange accordingly. This user manual provides step-by-step instructions on how to use the pallet to stake ENJ tokens and exchange them for sENJ tokens.

# Enjin Nomination Pools and Liquid Staking

Enjin Nomination Pools are an integral part of the Stake Exchange Pallet. They serve as pools that hold ENJ tokens, and issue sENJ tokens in return. Each sENJ type corresponds to a specific pool.

Liquid Staking allows users to stake their ENJ tokens and receive sENJ tokens in return. These sENJ tokens represent the staked value of their ENJ tokens. By staking their ENJ tokens, users contribute to the security and operation of the Enjin network.

Through the Stake Exchange Pallet, users holding sENJ tokens can easily convert them back to ENJ tokens by selecting the appropriate offer from the available options. Each offer within the pallet specifies the exchange rate and the type of sENJ tokens it accepts. Users can choose the offer that aligns with their preferences and execute the token exchange accordingly.

By utilizing Enjin Nomination Pools and the Stake Exchange Pallet, users have the flexibility to stake their ENJ tokens for network participation and later convert them back to ENJ tokens when desired, providing liquidity and accessibility to their staked assets.

# Terminology

- **sENJ Tokens -** The staked version of the ENJ tokens. These tokens are represented using the `StakedCollectionId` collections in the `pallet_multi_tokens` instance.
- **Exchange Rate -** The rate at which ENJ tokens can be exchanged for sENJ tokens and vice versa.
- **Liquidity Account -** An account used for managing liquidity. It is associated with a specific user and holds the liquidity for their offers.

# Getting Started

Ensure that you have access to an Enjin Relay Chain and have the necessary ENJ tokens to stake. The UI used in this guide can be accessed [here](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.canary.enjin.io#/extrinsics).

Accessing the Pallet Functions: Open your Enjin Explorer and navigate to the `Developer` -> `Extrinsics` interface. Locate the "Stake Exchange Pallet" and click on it to access the available functions.

## Creating an Offer

To create an offer:

1. Click the `Create Offer` function to start the process of staking your ENJ tokens and creating an offer.
2. Enter the required parameters for the offer:
   1. `Total` : Specify the amount of ENJ tokens you want to exchange.
   2. `Rate` : Define the exchange rate for converting sENJ tokens to ENJ tokens.
   3. `minAverageCommission` : Define the minimum commission you would accept for the offer.
3. Review the entered parameters and click `Confirm` to proceed.

If successful, you will receive a confirmation message indicating that the offer has been created. Note the generated Offer ID for future reference.

> 📘 Enjin Console input fields denoted as u128 require values represented in number \* 10^18

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b552aaa-image.png",
        null,
        "This example creates an offer with a liquidity of 1000ENJ, and accepts a rate of 1:1, and will accepts pools with a min commision of 5%"
      ],
      "align": "center",
      "caption": "This example creates an offer with a liquidity of 1000ENJ, and accepts a rate of 1:1, and will accepts pools with a min commision of 5%"
    }
  ]
}
[/block]


### `minAverageComission`

Note : The `minAverageCommission` is represented by Perbill, which is a representation of PerThing, similar to a percentage but with higher precision. In Perbill, 1% is equivalent to 10^7 (10000000) and 100% is represented as 10^9. For example, if you have a value of 50% in Perbill, it would be expressed as 500000000. You can read more about Perbill [here](https://paritytech.github.io/polkadot-sdk/master/sp_runtime/struct.Perbill.html).

Note : `minAverageCommission` is used to represent the commission rate acceptable to this offer. Consider two pools below X and Y, Pool X has a total pool commision of 7% and Pool Y has a total commission of 9%. Now as a `buyer` of sENJ you will end up with less overall reward if you get tokens from Pool Y than if you get tokens from Pool X. The `minAverageCommission` flag is to control this factor, lets consider two examples

1. `minAverageCommission` set to 7%
   1. In this case, only Pool X tokens (and any other pool where total commission is less than or equal to 7%) will be accepted. If a user with sENJ tokens from Pool Y tries to buy from this offer, they will see the CommissionOutOfRange error.
2. `minAverageCommission` set to 9%
   1. In this case, both Pool X and Pool Ytokens (and any other pool where total commission is less than or equal to 9%) will be accepted. If a user with sENJ tokens from Pool Z with a commission of 10% tries to buy from this offer, they will see the `CommissionOutOfRange` error.

So as the creator of the offer, it is in your best interest to keep this value as low as possible, so that the sENJ you will receive will reap the maximum rewards. Do keep in mind that there are practical limitations in how low this value can be set, for example if you set it to 0% (no commission charged on rewards), no sENJ tokens maybe eligible to fill your offer since it is unlikely to have a pool/validator that does not charge any commission. The ideal value to set here can be obtained by inspecting the current active pools, find the lowest commission and use that as the minAverageCommission for your offer.

Note : `PoolCommission` is calculated by commission charged by the pool creator + the average commission charged by the validators in that pool. Lets consider these two examples

Pool X : (only one validator in pool)

- Pool creator commission: 5%
- Validator commission: 2%
- Total pool commission: 7%

Pool Y : (two validators in pool)

- Pool creator commission: 5%
- Validator A commission: 5%
- Validator B commission: 3%
- Total pool commission: 9%

## Canceling an Offer

If you wish to cancel a previously created offer, 

1. Click on the `Cancel Offer` function.
2. Enter the Offer ID of the offer you want to cancel.
3. Click `Confirm` to proceed with the cancellation.

If successful, you will receive a confirmation message indicating that the offer has been canceled.

![](https://files.readme.io/c7b38b1-image.png)

## Configuring Liquidity Account

> 📘 Configuring Liquidity Account is only required if you create an offer aka if you provide liquidity to the pallet, you do not need to configure a liquidity account to buy tokens

To configure your liquidity account:

1. Click on the `Configure Liquidity Account` function.

- The liquidity account configuration allows you to allow/disallow certain sENJ tokens from the offer created by your account. To allow an sENJ token, add the token to the whitelist and to disallow it, add it to the blacklist. These restrictions are enforced to all offers created by your account.

Example configuration to disallow sENJ tokens with tokenId 210:

![](https://files.readme.io/919d90b-image.png)

## Withdrawing Liquidity

If you want to withdraw liquidity from an active offer:

1. Click on the `Withdraw Liquidity` function.
2. Enter the Offer ID of the offer from which you wish to withdraw liquidity.
3. Specify the amount of liquidity you want to withdraw.
4. Click `Confirm` to proceed with the withdrawal.

If successful, you will receive a confirmation message indicating that the liquidity has been withdrawn.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ab2563e-image.png",
        null,
        "Example : You created an offer with initial amount of 1000ENJ. If you withdraw liquidity of 400ENJ, then your updated offer will have a liquidity of 600ENJ."
      ],
      "align": "center",
      "caption": "Example : You created an offer with initial amount of 1000ENJ. If you withdraw liquidity of 400ENJ, then your updated offer will have a liquidity of 600ENJ."
    }
  ]
}
[/block]


# Adding Liquidity

To add liquidity to an active offer:

1. Click on the `Add Liquidity` function.
2. Enter the Offer ID of the offer to which you want to add liquidity.
3. Specify the amount of liquidity you want to add.
4. Click `Confirm` to proceed with adding liquidity.

If successful, you will receive a confirmation message indicating that the liquidity has been added.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/fdd63b7-image.png",
        null,
        "Example : You created an offer with initial amount of 1000ENJ. If you add liquidity of 400ENJ, then your updated offer will have a liquidity of 1400ENJ."
      ],
      "align": "center",
      "caption": "Example : You created an offer with initial amount of 1000ENJ. If you add liquidity of 400ENJ, then your updated offer will have a liquidity of 1400ENJ."
    }
  ]
}
[/block]


# Buying Tokens

To exchange sENJ tokens for ENJ tokens

1. Click on the `Buy` function.
2. Enter the Offer ID of the offer from which you want to buy tokens.
3. Specify the amount of ENJ tokens you want to receive.
4. Enter the Token ID for the specific token you want to exchange.
5. Click `Confirm` to proceed with the token exchange.

If successful, you will receive a confirmation message indicating that the token exchange has been completed. You will also receive the exchanged ENJ tokens in your wallet.

> 📘 The above instructions provide a general overview of using the Stake Exchange Pallet. It is essential to refer to the Enjin documentation for more detailed information and guidance.