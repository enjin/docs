---
title: "Token Groups"
slug: "token-groups"
description: "Create, destroy, add/remove tokens to, and attribute on-chain token groups via CreateTransaction."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

A token group is an on-chain bucket of tokens within a single collection — see [Token Groups Queries](/03-api-reference/01-queries/07-token-groups-queries.md) for the read side. All token-group actions are submitted through [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction), with the action selected by the field set on the `transaction` input. The response shape is always a `Transaction` — the examples below all return the standard `{ uuid, action, state }` selection.

## createTokenGroup

Creates an empty token group inside a collection. The group's `id` is assigned by the chain; read it back via [`GetCollection.tokenGroups`](/03-api-reference/01-queries/07-token-groups-queries.md#reading-all-groups-in-a-collection) once the transaction finalizes (or by inspecting the `MultiTokens.TokenGroupCreated` event on Subscan).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateTokenGroup {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createTokenGroup: { collectionId: 3484 }
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
      "action": "MultiTokens.create_token_group",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

## destroyTokenGroup

Destroys an existing token group. The group must be empty (no tokens) — remove tokens first with [`removeTokenFromGroup`](#removetokenfromgroup) or [`setTokenGroups`](#settokengroups).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation DestroyTokenGroup {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      destroyTokenGroup: { id: 60 }
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

## addTokenToGroup

Adds a single token to a group.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation AddTokenToGroup {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      addTokenToGroup: {
        collectionId: 3484
        tokenId: 107335160659631965554526087350803497388
        groupId: 60
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

## removeTokenFromGroup

Removes a single token from a group.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveTokenFromGroup {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeTokenFromGroup: {
        collectionId: 3484
        tokenId: 107335160659631965554526087350803497388
        groupId: 60
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

## setTokenGroups

Replaces the full set of groups a token belongs to. Pass `groupIds: []` to remove the token from every group at once.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetTokenGroups {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      setTokenGroups: {
        collectionId: 3484
        tokenId: 107335160659631965554526087350803497388
        groupIds: [60, 63]
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

## setTokenGroupAttribute

Set or update a single key/value attribute on a token group. The collection-and-group identification uses just `id` (the token-group id), not a (collectionId, groupId) pair.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetTokenGroupAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      setTokenGroupAttribute: {
        id: 60
        key: "uri"
        value: "https://example.com/metadata/token-groups/clan-tag.json"
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

## removeTokenGroupAttribute

Remove a single attribute from a token group.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveTokenGroupAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeTokenGroupAttribute: {
        id: 60
        key: "uri"
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

## Adding a token to a group at creation time

When you create a new token via [`createToken`](/03-api-reference/02-mutations/03-tokens-mutations.md#createtoken), you can include `groups: [...]` in the input to add it to one or more existing groups immediately — no follow-up `addTokenToGroup` call needed.

```graphql
transaction: {
  createToken: {
    recipient: "efRecipientAddress"
    collectionId: 3484
    tokenId: 12345
    initialSupply: 1
    listingForbidden: false
    infusion: 0
    anyoneCanInfuse: false
    groups: [60]
  }
}
```
