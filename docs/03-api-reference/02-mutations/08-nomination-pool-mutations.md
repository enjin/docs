---
title: "Nomination Pools"
slug: "nomination-pools"
description: "Bond and unbond ENJ in Relaychain nomination pools via CreateTransaction."
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

Nomination pools live on the **Relaychain** — pass `chain: RELAY` on every mutation in this section. To read pool state, see [Nomination Pool Queries](/03-api-reference/01-queries/08-nomination-pool-queries.md).

Both actions below are submitted through [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction), with the action selected by the field set on the `transaction` input. The response is always a `Transaction`.

## nominationPoolsBond

Bonds ENJ into a pool. Provide either `amount` (a specific quantity, in the smallest ENJ unit) **or** `fill: true` (bond the signer's entire free balance).

<Tabs>
  <TabItem value="amount" label="Bond a specific amount">
```graphql
mutation NominationPoolsBond {
  CreateTransaction(
    network: ENJIN
    chain: RELAY
    transaction: {
      nominationPoolsBond: {
        id: 1
        amount: 5000000000000000000000   # 5,000 ENJ
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="fill" label="Bond everything">
```graphql
mutation NominationPoolsBondFill {
  CreateTransaction(
    network: ENJIN
    chain: RELAY
    transaction: {
      nominationPoolsBond: {
        id: 1
        fill: true
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "CreateTransaction": {
      "uuid": "a90ded41-4262-40a2-95c0-98255b660bf1",
      "action": "NominationPools.bond",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

The pool must be in the `OPEN` state — see [`GetNominationPool.state`](/03-api-reference/01-queries/08-nomination-pool-queries.md#getnominationpool).

## nominationPoolsUnbond

Unbonds a quantity of pool "points" from a pool the signer is a member of. Pool points are an internal accounting unit; the equivalent ENJ amount becomes spendable after the chain's unbonding period.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation NominationPoolsUnbond {
  CreateTransaction(
    network: ENJIN
    chain: RELAY
    transaction: {
      nominationPoolsUnbond: {
        id: 1
        unbondingPoints: 5000000000000000000000
      }
    }
  ) {
    uuid
    action
    state
  }
}
```
  </TabItem>
</Tabs>

The unbonded amount appears in [`GetAccountPools.totalUnbonding`](/03-api-reference/01-queries/08-nomination-pool-queries.md#getaccountpools) until the unbonding period elapses.
