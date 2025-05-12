---
title: "Staking Integration Guide"
slug: "staking-integration"
description: "This page will cover the basic integration of Enjin Blockchain Staking functionality, enabling you and your users to get started with staking on the Enjin Blockchain."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';

## Background

[Enjin Blockchain](https://enjin.io/enjin-blockchain) is the world's first purpose-built blockchain for games and apps. Enjin is a Proof-of-Stake dual-layer chain with NFT-specific functions at the protocol level.

Enjin Blockchain is built on-top of [Substrate](https://substrate.io/) and inherits similar staking functionalities to other Relaychains running on Substrate, with a few key differences which will be covered throughout this Integration Guide.

## Definitions

There are a series of definitions that’ll be used throughout this document.

“**[Validator](/02-guides/02-blockchain/02-running-nodes/02-operating-relaychain-validator/01-running-a-validator.md)**” refers to a blockchain node that is setup to produce and validate block production.

“**Era**” refers to a Validator session. During this session, a set of Validators are elected and work together for the integrity of the blockchain. An Era, on the Enjin Relaychain, is 14,400 blocks — it is commonly considered to be “_an era is one (1) full day._”

“**Active Validator**” refers to a Validator which has been selected to produce work in a given Era.

“**ENJ**” refers to the native token of the Enjin Blockchain: [Enjin Coin](https://enjin.io/enjin-coin).

**<GlossaryTerm id="multi_unit_token" />** refers to a <GlossaryTerm id="multitoken" /> with multiple quantities, created using the [multiToken pallet](/04-enjin-blockchain/03-enjin-matrixchain/01-multitoken-pallet.md).

“**NFT**” refers to a Non-Fungible Token created using the [multiToken pallet](/04-enjin-blockchain/03-enjin-matrixchain/01-multitoken-pallet.md).

“**Staking**” refers to the process of bonding (locking) ENJ on the Enjin Relaychain for a minimum of twenty-eight (28) eras. Staking is used to select Active Validators who will be responsible for maintaining the integrity of the blockchain.

“**sENJ**” refers to Staked Enjin Coin, an <GlossaryTerm id="multi_unit_token" />. This represents ENJ that is locked into a Nomination Pool. The collection identifier for this token is **1**.

“**Liquid Staking**” refers to a concept which allows users to use their sENJ for purposes such as governance or [exchanging](/04-enjin-blockchain/02-enjin-relaychain/02-stake-exchange-pallet.md).

“**Nomination Pool”** refers to a mechanism that allows a group of users to stake their ENJ and nominate a set of Validators that represents the group. Specifically, the nominationPools pallet.

“**Degen**” refers to an NFT that is used for the purpose of creating and managing a Nomination Pool. The collection identifier for this token is **2**.

“**Inactive Degen**” refers to a Degen that has not yet been assigned to a Nomination Pool.

“**Pool Member**” refers to an account that has contributed (staked) some amount of ENJ into a given Nomination Pool.

“**Pool Owner**” refers to the account that currently holds the Degen associated with a Nomination Pool.

“**Staker**” refers to an account that has contributed (staked) some amount of ENJ into any Nomination Pool.

“**Stake Exchange**” refers to a pallet that is responsible for users being able to exchange their sENJ for ENJ based on offers defined by the users.

“**Stake Factor”** refers to a Nomination Pool’s total bonded ENJ divided by the total supply of sENJ. This value is multiplied against your sENJ contribution, for that Nomination Pool, to derive the total amount of ENJ unbondable.

“**Pool Deposit**” refers to the minimum of **2,500 ENJ** required to create a Nomination Pool.

“**Pool State**” refers to the status associated with a Nomination Pool. This could be one of the following two: “_Open_” or “_Destroying_”

## Getting Started

### Unaltered Behaviors

The Enjin Blockchain extends upon the implementation of the basic [staking pallet](https://crates.parity.io/pallet_staking/index.html) and [nomination pool pallet](https://wiki.polkadot.network/docs/learn-nomination-pools) to enable functionality such as Liquid Staking. Because it is an extension to an existing set of pallets, there are some queries and extrinsics that remain unaltered.

1. [Listing All Pools](#listing-all-nomination-pools)

2. [Listing a Single Pool](#listing-a-single-nomination-pool)

3. [Listing Unbonding Members of a Pool](#listing-unbonding-members-of-a-nomination-pool)

4. [Bonding into a Pool](#bonding-into-a-nomination-pool)

5. [Unbonding from a Pool](#unbonding)

6. [Withdrawing from a Pool](#withdrawing)

7. [Nominating Validators for a Pool](#nominating-validators-for-a-nomination-pool)

8. [Chilling a Pool](#chilling-a-nomination-pool)

9. [Unbonding a Pool Deposit](#unbonding-1)

10. [Withdrawing a Pool Deposit](#withdrawing-1)

11. [Destroying a Pool](#destroying-a-nomination-pool)

### Enjin Relaychain RPC Endpoints

It is strongly recommended that you operate your own Enjin Relaychain node. You can read more about this in our documentation: [Running Relaychain Nodes](/02-guides/02-blockchain/02-running-nodes/01-enjin-blockchain-nodes/02-run-relaychain-node.md)

However, you may also use our official RPC endpoints:

- `https://rpc.relay.blockchain.enjin.io`

- `wss://rpc.relay.blockchain.enjin.io`

Please note that our officially operated RPC endpoints are not archive nodes. This is non-essential to this integration guide unless you intentionally want to look at the historical state.

### Polkadot.js API Library

This Integration Guide uses the [@polkadot/api](https://github.com/polkadot-js/api) library, and assumes that the client has been defined in a variable named: api

### About Degens

[Degens](https://degens.io/) are a powerful NFT that are the backbone of staking on the Enjin Blockchain. These NFTs are essential to staking as they are a **requirement** for creating a Nomination Pool. 

Each Degen can be assigned to a single Nomination Pool (this occurs during the Nomination Pool creation process) and then cannot be disassociated from the Nomination Pool unless it is destroyed. A Degen cannot be allocated to multiple Nomination Pools at the same time. Whoever holds the Degen is the “owner” of the Nomination Pool.

Degens are built on-top of Enjin Blockchain’s incredibly powerful and versatile [multiToken pallet](/04-enjin-blockchain/03-enjin-matrixchain/01-multitoken-pallet.md).

### About sENJ and Liquid Staking

sENJ is an <GlossaryTerm id="multi_unit_token" />. Due to it being a multi-token, this is what enables the concept of Liquid Staking. Liquid Staking, simply put, means that the sENJ is not locked to a specific account and it can in fact be used in processes such as governance or the [Stake Exchange](/04-enjin-blockchain/02-enjin-relaychain/02-stake-exchange-pallet.md).

#### Difference Between ENJ and sENJ

ENJ is the native token of the Enjin Blockchain. Whereas, sENJ is an <GlossaryTerm id="multi_unit_token" /> created with the [multiToken pallet](/04-enjin-blockchain/03-enjin-matrixchain/01-multitoken-pallet.md). When [bonding (staking)](/02-guides/02-blockchain/01-relaychain/04-joining-nomination-pools.md) ENJ to a nomination pool, sENJ is created at a 1:1 ratio. During the time that you are in the pool, holding sENJ, a Stake Factor accrues as the nomination pool accrues ENJ. This Stake Factor is a multiplier to the value of sENJ the user holds. This means that when the user then proceeds with unbonding, they in-turn can withdraw up to the amount factoring in the Stake Factor multiplier.

The Stake Factor can decrease if the nominated Validators misbehave. Therefore, it is not possible to guarantee that the user would definitely receive, at minimum, their original ENJ balance or, at best, an amount greater than their original ENJ balance.

## Integration Guide

### Queries

#### Listing All Nomination Pools

**This query is unaltered from the original.** This query can be used to retrieve an exhaustive list of all Nomination Pools, along with details about each of the Nomination Pools.

##### State Storage Query

```javascript
nominationPools.bondedPools
```

##### Example Request

```javascript
const pools = (await api.query.nominationPools.bondedPools.entries())
  .map(([account, data]) => [account.toHuman(), data])

console.log(Object.fromEntries(pools))
```

##### Example Response

```json
{
    "0": {
        "state": "Open",
        "commission": {
            "current": null,
            "max": null,
            "changeRate": null,
            "throttleFrom": null
        },
        "tokenId": 1,
        "capacity": "0x00000000001a784379d99db420000000",
        "bonusCycle": {
            "previousStart": 98,
            "start": 219,
            "end": 339,
            "pendingDuration": null
        },
        "creationBlock": 1654079,
        "bonusesPaid": [
            164,
            ...
            247
        ],
        "name": "0x"
    },
    ...
}
```

#### Listing a Single Nomination Pool

**This query is unaltered from the original.** This query can be used to retrieve details about a specific Nomination Pool.

##### State Storage Query

```javascript
nominationPools.bondedPools(poolId : u32)
```

##### Example Request

```javascript
const pool = await api.query.nominationPools.bondedPools(0)
console.log(pool)
```

##### Example Response

```json
{
    "state": "Open",
    "commission":
    {
        "current": null,
        "max": null,
        "changeRate": null,
        "throttleFrom": null
    },
    "tokenId": 1,
    "capacity": "0x00000000001a784379d99db420000000",
    "bonusCycle":
    {
        "previousStart": 98,
        "start": 219,
        "end": 339,
        "pendingDuration": null
    },
    "creationBlock": 1654079,
    "bonusesPaid":
    [
        163,
        164,
        165,
        ...
    ],
    "name": "0x"
}
```

#### Listing Members of a Nomination Pool

This query can be used to retrieve an exhaustive list of members who are currently staked into a specific Nomination Pool.

##### State Storage Query

```javascript
multiTokens.tokenAccounts(
	collectionId : u128, // 1 for sENJ
	tokenId : u128, // pool id
	account : Option<AccountId32>
)
```

##### Example Request

```javascript
const pool_id = 0
const members = (await api.query.multiTokens.tokenAccounts.entries(1, pool_id))
  .map(([account, data]) => [account.toHuman()[2], data])

console.log(Object.fromEntries(members))
```

##### Example Response

```json
{
    "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu": {
        "balance": "0x00000000000007c1c839136681335ac3",
        "reservedBalance": 0,
        "lockedBalance": 0,
        "namedReserves": {},
        "locks": {},
        "approvals": {},
        "isFrozen": false
    },
    ...
}
```

#### Listing Unbonding Members of a Nomination Pool

**This query is unaltered from the original.** This query can be used to retrieve an exhaustive list of members who are currently unbonding from a specific pool.

##### State Storage Query

```javascript
nominationPools.unbondingMembers(
	poolId : u32,
	account : Option<AccountId32>
)
```

##### Example Request

```javascript
const pool_id = 0

const unbondingMembers = (await api.query.nominationPools.unbondingMembers.entries(pool_id))
  .map(([account, data]) => [account.toHuman()[1], data])

console.log(Object.fromEntries(unbondingMembers))
```

##### Example Response

```json
{
    "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu": {
        "unbondingEras": {
            "249": "0x000000000000021e19e0c9bab2401979",
            "260": "0x000000000000043c33c1937564803fb3",
            "267": "0x000000000000021e19e0c9bab2400e34"
        }
    },
    ...
}
```

#### Reading a User’s ENJ Balance of a Nomination Pool

This query can be used to read the _true_ ENJ Balance of an account for a specific Nomination Pool. There is a necessary distinction between reading the value of sENJ and the _true_ ENJ Balance that the user currently holds through the sENJ token. Refer to [Difference Between ENJ and sENJ](#difference-between-enj-and-senj) for more information.

This query is more complicated as it requires first retrieving the Nomination Pool’s stash account, calculating the Stake Factor, retrieving the user’s sENJ balance in the Nomination Pool, and finally multiply their sENJ balance by the Stake Factor to derive their final balance.

##### Example Request

```javascript
import { bnToU8a, stringToU8a, u8aConcat, BN } from '@polkadot/util'

const pool_id = 0
const account = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

function getPoolStashAccount(api, pool_id) {
  const pallet_id = api.consts.nominationPools.palletId.toU8a()

  return api.registry.createType('AccountId32', u8aConcat(
    stringToU8a('modl'),
    pallet_id,
    new Uint8Array([1]),
    bnToU8a(new BN(pool_id), { bitLength: 32, isLe: true }),
    new Uint8Array(32)
  )).toString()
}

const pool_account = getPoolStashAccount(api, pool_id)
const pool_active_balance = (await api.query.staking.ledger(pool_account)).toJSON().active
const staked_enj_supply = (await api.query.multiTokens.tokens(1, pool_id)).toJSON().supply
const pool_stake_factor = pool_active_balance / staked_enj_supply

const balance = (await api.query.multiTokens.tokenAccounts(1, pool_id, account))
  .toJSON().balance * pool_stake_factor

console.log(balance)
```

Technically, the Stake Factor also considers the Nomination Pool’s reward account as part of the calculation. However, during each payout the funds are automatically reinvested into the Nomination Pool’s stash account, leaving the reward account empty (barring its existential deposit).

##### Example Response

```
4.266220452892553e+22
```

### Extrinsics

#### Bonding into a Nomination Pool

**This extrinsic is unaltered from the original.** This extrinsic can be called for the user to join a Nomination Pool and bond a given amount of ENJ into that Nomination Pool.

##### Extrinsic

```javascript
nominationPools.bond(
	poolId : u32 (PoolId),
	amount : PalletNominationPoolsBondValue (BondValueOf)
)
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction to bond 100 ENJ
const tx = api.tx.nominationPools.bond(pool_id, {"amount": "100000000000000000000"})

// or generate transaction to bond all ENJ
// const tx = api.tx.nominationPools.bond(pool_id, {"fill": null})

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Unbonding and Withdrawing from a Nomination Pool

**These extrinsics are unaltered from the original.** These extrinsics are permissionless only when the Pool State is _Destroying_.

##### Unbonding

This extrinsic can be used to initiate the unbonding process of a given amount of sENJ back to ENJ from a specific Nomination Pool. If the amount being unbonded is the complete amount of sENJ, the user is said to be leaving the Nomination pool. The unbonding process takes twenty-eight (28) eras.

###### Extrinsic

```javascript
nominationPools.unbond(
	poolId : u32 (PoolId),
	memberAccount : MultiAddress (AccountIdLookupOf),
	unbondingPoints : Compact<u128> (BalanceOf)
)
```

###### Example Request

```javascript
const pool_id = 0
const account = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"
const amount = "100000000000000000000" // 100 ENJ

// generate transaction
const tx = api.tx.nominationPools.unbond(pool_id, account, amount)

// sign and send transaction
await tx.signAndSend(account, ({ events = [], status, dispatchError }) => { /* handle */ })
```

##### Withdrawing

This extrinsic can be used to withdraw sENJ that has successfully completed the unbonded period of twenty-eight (28) eras. The user will receive the amount unbonded in the form of ENJ.

###### Extrinsic

```javascript
nominationPools.withdrawUnbonded(
	poolId : u32 (PoolId),
	memberAccount : MultiAddress (AccountIdLookupOf),
	numSlashingSpans : u32
)
```

###### Example Request

```javascript
const pool_id = 0
const account = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.withdrawUnbonded(pool_id, account, 0)

// sign and send transaction
await tx.signAndSend(account, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Creating a Nomination Pool

This extrinsic is used to create a new Nomination Pool. The duration must be at least 30 eras, and must not exceed 1,000 eras.

##### Requirements

- User must own an Inactive Degen.

- User must bond an 2,500 ENJ pool deposit.

##### Extrinsic

```javascript
nominationPools.create(
	tokenId : u128 (TokenIdOf),
	deposit : Compact<u128> (BalanceOf),
	capacity : Compact<u128> (BalanceOf),
	duration : Compact<u32> (EraIndex),
	name : Bytes (PoolNameOf)
)
```

##### Example Request

```javascript
const token_id = 1 // id of the Inactive Degen
const deposit = "2500000000000000000" // 2,500 ENJ - Pool Deposit
const capacity = "100000000000000000000000" // 100,000 ENJ
const duration = 100 // 100 eras
const name = "Demo Pool"
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.create(
	token_id,
	deposit,
	capacity,
	duration,
	name
)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Mutating a Nomination Pool

This extrinsic is used to update (mutate) an existing Nomination Pool.

##### Requirements

- User must be the Pool Owner.

##### Extrinsic

```javascript
nominationPools.mutate(
	poolId : u32 (PoolId),
	mutation : PalletNominationPoolsPoolMutation (PoolMutationOf)
)
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.mutate(
	pool_id,
	{
	  duration: "30", // 30 days (optional)
	  newCommission: { // (optional)
		"SomeMutation": "50000000" // 5% (optional)
	  },
	  maxCommission: "90000000", // 9% (optional)
	  changeRate: {
		  maxDelta: "5000000", // 0.5% (optional)
		  minDelay:  "15", // 15 days (optional)
	  },
	  capacity: "100000000000000000000000", // 100,000 ENJ (optional)
	  name: "Demo Pool" (optional)
	}
)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Nominating Validators for a Nomination Pool

**This extrinsic is unaltered from the original.** This extrinsic is used to modify which Validators the Nomination Pool has nominated. It is also used to unchill a Nomination Pool.

##### Requirements

- User must be the Pool Owner.

##### Extrinsic

```javascript
nominationPools.nominate(
	poolId : u32 (PoolId),
	validators : Vec<AccountId32> (Vec<AccountId>)
)
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"
const validators = [
	"enG2tPZeAkKCNSxgXnWNDhGf5j83GZboj41ypUENcGZCNDheN",
	"enBRFocgo4aPAVtny93ZLaTPX9JpbxrSeBt29uXdLy3AcG8Dx",
	// ...
]

// generate transaction
const tx = api.tx.nominationPools.nominate(pool_id, validators)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Chilling a Nomination Pool

**This extrinsic is unaltered from the original.** This extrinsic is used to chill the Nomination Pool — a chilled Nomination Pool refers to one that does not actively contribute its stake to the Validator selection process. Chilling the Nomination Pool takes effect in the next era.

##### Requirements

- User must be the Pool Owner.

##### Extrinsic

```javascript
nominationPools.chill(poolId : u32 (PoolId))
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.chill(pool_id)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Destroying a Nomination Pool

**This extrinsic is unaltered from the original.** This sets the Pool State to _Destroying_.

:::danger
This process cannot be reversed!
:::

##### Requirements

- User must be the Pool Owner.

##### Extrinsic

```javascript
nominationPools.destroy(poolId : u32 (PoolId))
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.destroy(pool_id)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

#### Unbonding and Withdrawing a Pool Deposit from a Nomination Pool

**These extrinsics are unaltered from the original.** These extrinsics are permissionless.

##### Unbonding

This extrinsic will initiate a twenty-eight (28) era unbonding period.

###### Requirements

- The Pool State must be _Destroying_.

- There must be no remaining Pool Members for the Nomination Pool being destroyed.

##### Extrinsic

```javascript
nominationPools.unbondDeposit(poolId : u32 (PoolId))
```

##### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.unbondDeposit(pool_id)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

##### Withdrawing

This extrinsic will withdraw the Pool Deposit which will subsequently destroy the Nomination Pool. The Degen assigned to the Nomination Pool will become an Inactive Degen and will **not** be destroyed alongside the Nomination Pool.

###### Requirements

- The Pool Deposit unbonding period (twenty-eight (28) eras)  must have passed.

###### Extrinsic

```javascript
nominationPools.withdrawDeposit(poolId : u32 (PoolId))
```

###### Example Request

```javascript
const pool_id = 0
const signer = "enCpUHhm4Nk5jbaGkgZNxgNxfEaHUe39ZcfjVEVwYipn1KBLu"

// generate transaction
const tx = api.tx.nominationPools.withdrawDeposit(pool_id)

// sign and send transaction
await tx.signAndSend(signer, ({ events = [], status, dispatchError }) => { /* handle */ })
```

## Data Indexing

It is recommended to index data pertaining to Staking and Nomination Pools as this enables a more performant and richer experience. However, it is **not essential** for a basic integration, as illustrated through this Integration Guide.

Indexing this data enables you to monitor the change over time and infer the increase or decrease in sENJ holdings over time. This enables your integration to visually show payouts and their associated amounts per Pool Member.

## Extra Resources / Further Reading

- [Subscan](https://www.subscan.io/), a Blockchain Explorer, has useful pages on [Validators](https://enjin.subscan.io/validator) and [Nomination Pools](https://enjin.subscan.io/nomination_pool).

- [Enjin Console](https://console.enjin.io/) has a dedicated page for [Staking](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.blockchain.enjin.io#/staking) and [Nomination Pools](https://console.enjin.io/?rpc=wss%3A%2F%2Frpc.relay.blockchain.enjin.io#/staking/pools).

- For more in-depth information, feel free to explore other topics within the [Enjin Relaychain](/04-enjin-blockchain/02-enjin-relaychain/02-enjin-relaychain.md) section.
