---
title: "Nomination Pools"
slug: "nomination-pools"
description: "Read Relaychain nomination pools and an account's pool memberships."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

Nomination pools live on the **Relaychain** — pass `chain: RELAY` on every query in this section. They let many small ENJ holders pool their stake under a single nominator, sharing rewards proportionally. To bond into a pool or unbond, see [Nomination Pool Mutations](/03-api-reference/02-mutations/08-nomination-pool-mutations.md).

## GetNominationPool

Returns a single nomination pool by `id`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetNominationPool {
  GetNominationPool(network: ENJIN, chain: RELAY, id: 1) {
    id
    name
    state
    capacity
    balance {
      stash
      reward
      active
    }
    commission
    apy
    totalMembers
    members {
      publicKey
      bonded
      unrealisedEnj
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetNominationPool": {
      "id": 1,
      "name": "",
      "state": "OPEN",
      "capacity": "32000000000000000000000000",
      "balance": {
        "stash": "17679671198897628191743870",
        "reward": "100000000000000000",
        "active": "37463637246328117435530629"
      },
      "commission": 0,
      "apy": 22.636730650749662,
      "totalMembers": 195,
      "members": [
        {
          "publicKey": "0xded3c8a93e4a4b3a5e8f3c9a2d1b6f0e7c8a9b0d1e2f3a4b5c6d7e8f9a0b1c2d",
          "bonded": "5000000000000000000000",
          "unrealisedEnj": "0"
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

Field notes:

- `state` is one of `OPEN`, `BLOCKED`, `DESTROYING`, `DESTROYED`. You can only bond into `OPEN` pools.
- `capacity` is the maximum bondable amount, in the smallest ENJ unit.
- `balance.stash` / `.active` / `.reward` describe the pool's on-chain state — `active` is the currently-staked portion that earns rewards.
- `commission` is a fraction in the range `0..1` (e.g. `0.05` means the pool operator takes 5%).
- `apy` is a percentage (e.g. `22.6` means ~22.6% annualised).
- `members[].unrealisedEnj` is the member's pending reward not yet claimed.

## GetNominationPools

Returns a paginated list of pools. Pagination is offset-based (`limit` + `page`).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetNominationPools {
  GetNominationPools(network: ENJIN, chain: RELAY, limit: 15, page: 1) {
    id
    name
    state
    commission
    apy
    totalMembers
    balance {
      active
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetNominationPools": [
      {
        "id": 1,
        "name": "",
        "state": "OPEN",
        "commission": 0,
        "apy": 22.636730650749662,
        "totalMembers": 195,
        "balance": { "active": "37463637246328117435530629" }
      },
      {
        "id": 2,
        "name": "Pool Two",
        "state": "OPEN",
        "commission": 0.05,
        "apy": 21.8,
        "totalMembers": 87,
        "balance": { "active": "12300000000000000000000000" }
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

## GetAccountPools

Returns every pool a given `address` is a member of, with that account's per-pool bonded amount and unrealised rewards.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetAccountPools {
  GetAccountPools(
    network: ENJIN
    chain: RELAY
    address: "efStakerAddress"
  ) {
    id
    name
    state
    bonded
    unrealisedEnj
    totalUnbonding
    apy
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetAccountPools": [
      {
        "id": 1,
        "name": "",
        "state": "OPEN",
        "bonded": "5000000000000000000000",
        "unrealisedEnj": "12500000000000000",
        "totalUnbonding": "0",
        "apy": 22.636730650749662
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

`totalUnbonding` is the amount the account has requested to unbond but hasn't yet withdrawn (Substrate nomination pools have an unbonding period before unbonded ENJ becomes spendable).
