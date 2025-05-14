---
title: "Slashing"
slug: "slashing"
description: "Slashing is a mechanism designed to ensure the integrity, security and reliability of the Enjin Blockchain network by penalizing validators for malicious or negligent behavior. This mechanism is crucial to maintaining trust and fairness within the network by discouraging actions that could compromise its safety or availability."
---
## Causes of Slashing

Slashing occurs when a validator commits an offense that goes against the Enjin Blockchain’s rules. Offenses that could lead to slashing on the Enjin Blockchain include:

- **Double Signing (Equivocation):** A validator signs two different blocks at the same block height, potentially forking the blockchain and undermining the consensus mechanism.
- **Unresponsiveness:** A validator is offline or fails to produce blocks or participate in consensus rounds over a defined period, negatively impacting network performance and security.
- **Invalid State Transitions:** Proposing blocks containing invalid state transitions or transactions that do not comply with network rules can result in slashing.

## Slashing Levels

Slashing penalties are categorized into different levels depending on the severity of the offense:

- **Minor Offense:** Includes brief periods of downtime or other non-malicious behavior. Penalties for minor offenses typically involve a small reduction in staked ENJ (0 - 1%).
- **Major Offense:** Encompasses more serious behaviors, such as repeated equivocation or failure to validate correctly over extended periods.These offenses carry harsher penalties, potentially resulting in moderately medium reductions in staked ENJ (1 - 10%) and possible exclusion from validator duties.
- **Critical Offense:** Involves malicious actions, such as double signing or producing invalid blocks, that directly threaten network security. Validators committing critical offenses may face severe penalties, including the loss of a substantial portion or all of their staked ENJ (10 - 100%) and immediate removal from the active validator set.

## Slashing Process

When a validator is found to have committed an offense, the slashing process is initiated:

- **Detection:** The offense is detected by the Enjin Blockchain through automated mechanisms or reports from other validators and network participants.
- **Verification:** The detected offense is verified through consensus among the active validator set or via automated checks performed by the network.
- **Execution:** Once the offense is verified, the slashing is executed automatically by the network. The validator’s staked ENJ is reduced according to the severity of the offense, and the validator may be temporarily or permanently removed from the active validator set.

### Slashed Tokens

When slashing occurs, a portion of the validator’s staked ENJ tokens, including those of the nominators who have delegated their tokens to the validator, is forfeited. This forfeited amount is then transferred to the [Enjin Treasury](https://enjin.subscan.io/account/enD9wdMEaQa3MEDUc7dtsCC86JYGMN5JBE2NBRoMyC37dX4iA). The rationale for transferring slashed tokens to the Treasury rather than burning them or redistributing them as rewards is twofold:

- **Reversal of Faulty Slashing:** Slashing penalties can be reverted by paying out from Treasury in cases where the slashing was deemed erroneous or unjustified.
- **Supporting Ecosystem Growth:** In the case of legitimate slashing, the tokens are redirected from malicious validators to support ecosystem development through the standard Treasury process, rewarding those actively contributing to the growth and health of the Enjin Blockchain.

It’s important to note that slashing only affects active nominations for a given nominator. Slashes are not mitigated by having other inactive or waiting nominations. Furthermore, slashing penalties apply independently to each validator node operated by a validator, with each node being considered a separate entity for slashing purposes.

#### Impact on Nominators

Nominators who delegate their ENJ tokens to a validator are also at risk of slashing if the chosen validator commits an offense. The slashing penalty is distributed proportionally across the validator’s own stake and the stake of their nominators. Therefore, nominators should carefully choose validators with a proven track record of reliability and adherence to network rules.

## Good Practices to Avoiding Slashing

Validators on the Enjin Blockchain must follow best practices to avoid slashing penalties and ensure the security and reliability of nodes. You can refer to the [Security Best Practices for Validators](/02-guides/02-blockchain/02-running-nodes/02-operating-relaychain-validator/02-security-best-practices-for-validators.md) article for more information.

## Conclusion

Slashing on the Enjin Blockchain is an essential mechanism to maintain network security, integrity and reliability by discouraging malicious or negligent behaviors of validators. By understanding the causes, levels and process, validators and nominators can better navigate the network, manage risk and contribute to a healthy and secure ecosystem.
