---
title: "Collator Staking Pallet"
slug: "collator-staking-pallet"
excerpt: ""
hidden: false
createdAt: "Sun Jul 14 2024 16:14:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sun Jul 14 2024 16:27:16 GMT+0000 (Coordinated Universal Time)"
---
:::info The Enjin Blockchain Console
Use [console.enjin.io](https://console.enjin.io/) to use the user interface referenced in this document.
:::

# Overview

The Collator Staking pallet is responsible for managing the collators of the Enjin Matrixchain. This pallet handles the selection and rewarding of block producers for each round of block production.

# Terminology

- **Collator:** A Matrixchain block producer.
- **Stake: **An amount of Balance reserved for candidate registration.
- **Invulnerable: **An account guaranteed to be in the collator set.
- **Round:** A range of blocks for which a specific set of collators are selected to produce blocks during that period.
- **Nominator:** An account that is voting for the collator to get selected for a specific round of block production.
- **Candidates:** Accounts that have bonded some balance to be selected as a collator.

# Implementation

Participants can join the candidate set by invoking the join_candidate extrinsic. This action involves reserving a specified stake, which must be equal to or greater than the minimum amount required by the runtime. The participant's account is then added to the Candidates pool, signifying their participation in the candidate set.

New collators are selected every session by aggregating from two individual lists:

1. **Invulnerables -** A set of collators appointed by governance. These accounts will always be collators.
2. **Candidates -** These are candidates for the collation task and are selected according to the highest amount of total_stake.

# Rewards

For every block created, two types of rewards are generated, which are collected from the transaction tips and fees. These fees are transferred to the fee distribution account at the end of every block. The `Pools` pallet then distributes the accumulated fees at the end of every session from the fee distribution account to registered pools. The collator pool currently receives a 70% share from the fee distribution. At the end of every session, the collator staking pallet distributes these rewards to collators using the funds received into the collator pool account.

The fee for every collator is calculated by `blocks_authored_by_collator / total_reward`

The rewards are distributed depending on the type of collator:

- **Invulnerable Collators:** the fees are transferred back to the fee distribution account
- **Other Collators:** fees are transferred to collator accounts

# Extrinsics

**`set_invulnerables` -** This extrinsic can only be called by the Root or governance and allows the caller to specify the list of invulnerables. These accounts will always be in the collator set and do not require a stake.

**`join_candidates` -** This extrinsic allows the caller to join the candidate set by staking an amount. The amount is selected by the caller. Being added to the candidate set means the caller may be selected to be a collator from the next session onwards.

**`unbond` -** Leave the collator set of this Matrixchain. In this case, if the calling account is already a collator, an exit is registered so that this account is not selected for the next set of collators. The stake of the collator will only be refunded after the COLLATOR_EXIT_THRESHOLD has passed. Otherwise, if the account is only a candidate, this candidate will be removed, staked amount is refunded and the nominations would be freed up and refunded.

**`nominate` -** Nominate a specific candidate to be selected for collation and block production. This allows the caller to put up a stake to nominate an existing collator, this increases the total_stake of the collation candidate and increases the chance to get selected as a collator.

**`remove_nomination` -** Remove a nomination previously registered for a specific collator candidate. The call will also refund the stake to the caller.

**`force_set_current_max_candidates` -** This extrinsic can only be called by the Root or governance and sets the maximum limit of candidates for the pallet.

# Data types

## Collator

Stores the information of every candidate.

```
Collator {  
  	/// The collator's AccountId  
  	pub(crate) account: AccountId,  
  	/// The amount which the collator staked.  
  	pub(crate) amount: Amount,  
  	/// The total amount staked for this collator  
  	/// including nominations.  
  	pub(crate) total_stake: Amount,  
  	/// list of nominators  
  	pub(crate) nominators: BoundedVec\<AccountId, MaxNominators>,  
}\`
```

## CandidateSet

A set of candidates where the order is maintained according to the total staked amount.

`BoundedVec<Collator<AccountId, Amount, MaxNominators>`
