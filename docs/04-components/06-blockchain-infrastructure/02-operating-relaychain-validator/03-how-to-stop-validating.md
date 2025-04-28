---
title: "How to Stop Validating"
slug: "stop-validating"
excerpt: "If you are currently operating a validator node on the Enjin Blockchain and wish to stop validating, follow the steps outlined below."
hidden: false
createdAt: "Fri Oct 11 2024 08:17:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Oct 11 2024 09:13:39 GMT+0000 (Coordinated Universal Time)"
---
Stopping validation may be necessary for various reasons, including switching roles, maintaining the node, upgrading the node, or withdrawing from the network as a validator. This guide will walk you through the process to ensure your transition out of the active set of validators is smooth and efficient. If you only wish to stop validating temporarily for maintenance, Step 1 is all you need to perform. If you wish to unbond funds and reap an account, Steps 1-3 should be followed.

# Step 1: Chill Your Validator

“Chilling” your validator means that it will no longer be an active participant in the validator set, effectively stopping it from validating blocks and earning rewards. Chilling does not affect your staked tokens immediately, it simply signals to the network that you wish to stop validation. It’s a few simple steps to chill your validator.

:::danger Important
If your validator node is part of the active validator set, it is imperative that you **DO NOT** immediately turn off your validator. Chilling is a signal of intent and will ensure you’re not selected upon the next session selection. Wait until your validator node is no longer part of an active validator set before turning it offline.

You may need to wait up to the conclusion of 7 epochs (28 hours) to be removed from being an active validator.
:::

## Enjin Console

- Open the [Enjin Console](https://console.enjin.io/#/staking/actions) with your validator account.
- Navigate to Network \> Staking \> Account.
- Click “Stop” next to your validator.

## Programmatically

- Connect to the Enjin RPC node with your validator account.
- Send the `staking.chill()` extrinsic.

Once your validator is chilled, it will no longer be eligible for selection in future staking sessions and it will stop producing blocks.

# Step 2: Purge Validator Session Keys

:::danger Important
Purging session keys is a permanent action. Once completed, your validator will no longer be able to participate in validation activities unless new keys are generated and [set up again](https://docs.enjin.io/docs/running-a-validator).

This step is crucial for security, as it prevents any accidental or unauthorized activation of your validator.
:::

After chilling your validator, the next crucial step is to purge the session keys associated with your validator. Purging the session keys removes association of your validator node with your stash account.

- Open [Enjin Console](https://console.enjin.io/#/extrinsics).
- Navigate to Developer \> Extrinsics.
- Select the Correct Account. It should be the same account that was used to set the keys in the first place.Call the `session.purge_keys()` extrinsic.

# Step 3: Unbond Your Tokens

Unbonding will release your ENJ staked as a validator. Once unbonded, your tokens will become freely transferable. You can follow the below steps to unbond your staked ENJ.

## Enjin Console

- Open the Enjin Console with your stash account.
- Navigate to Network \> Staking \> Account actions.
- Click the corresponding stash account dropdown and select “Unbond funds”.

## Programmatically

- Connect to the Enjin RPC node with your stash account.
- Send `staking.unbond()` extrinsic.

# Conclusion

To temporarily stop validating on the Enjin Blockchain you have only to chill your validator.

To permanently stop validating, you must follow three primary steps: chilling your validator, purging the validator’s session keys, and unbonding your tokens.

By following these steps carefully, you can ensure a secure and smooth transition out of your role as a validator without any accidental penalties or disruptions.
