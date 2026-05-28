---
title: "Token Groups"
slug: "token-groups"
description: "Read token groups via Collection.tokenGroups and Token.tokenGroupTokens."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

A **token group** is an on-chain set of tokens within a single collection. Each token can belong to zero or more groups; each group can hold many tokens. Groups make it easier to organise large collections in marketplaces and games — for example, the `Epochrome Sword` group inside Enjin's `The Multiverse` collection bundles every Epochrome Sword variant together so games can grant in-game utility to anyone holding any one of them.

There is no dedicated `GetTokenGroup` root query. Read groups via the two sides they're related to:

- **`Collection.tokenGroups`** — every group defined inside a collection.
- **`Token.tokenGroupTokens`** — every group a particular token belongs to.

To create, modify, or delete a group, see [Token Groups Mutations](/03-api-reference/02-mutations/07-token-groups-mutations.md).

## Reading all groups in a collection

Use [`GetCollection`](/03-api-reference/01-queries/02-collections-queries.md#getcollection) and select `tokenGroups`. Each group exposes its `id`, `attributes`, `metadata`, and the tokens in it via `tokenGroupTokens`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetCollectionGroups {
  GetCollection(network: ENJIN, chain: MATRIX, id: 2967) {
    id
    tokenGroups {
      id
      collectionId
      attributes {
        key
        value
      }
      metadata {
        name
        description
      }
      tokenGroupTokens {
        tokenId
        position
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetCollection": {
      "id": "2967",
      "tokenGroups": [
        {
          "id": "694",
          "collectionId": "2967",
          "attributes": [
            { "key": "uri", "value": "https://example.com/metadata/token-groups/epochrome-sword.json" }
          ],
          "metadata": {
            "name": "Epochrome Sword",
            "description": null
          },
          "tokenGroupTokens": [
            { "tokenId": "2967-107002853660685728525072975374659356720", "position": 0 },
            { "tokenId": "2967-107002853660685728525072975374659356721", "position": 0 }
          ]
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

`tokenGroupTokens[].tokenId` is the canonical token id (`"<collectionId>-<tokenId>"`), not the raw `tokenId` integer.

## Reading the groups a token belongs to

Use [`GetToken`](/03-api-reference/01-queries/03-tokens-queries.md#gettoken) and select `tokenGroupTokens` → `tokenGroup`. This is the lookup to use when you need to check whether a player's token grants in-game utility tied to a group.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokenGroups {
  GetToken(
    network: ENJIN
    chain: MATRIX
    id: "2967-107002853660685728525072975374659356720"
  ) {
    id
    tokenId
    tokenGroupTokens {
      tokenGroupId
      position
      tokenGroup {
        id
        metadata {
          name
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetToken": {
      "id": "2967-107002853660685728525072975374659356720",
      "tokenId": "107002853660685728525072975374659356720",
      "tokenGroupTokens": [
        {
          "tokenGroupId": "694",
          "position": 0,
          "tokenGroup": {
            "id": "694",
            "metadata": {
              "name": "Epochrome Sword"
            }
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

## Checking whether a wallet holds any token from a specific group

There's no single-query path for this yet — the API doesn't expose a per-(account, group) join. The pattern is:

1. `GetAccount(address:)` → read the wallet's `tokens` list.
2. For each held token (or for the tokens you care about), select `tokenGroupTokens { tokenGroupId }`.
3. Check whether the target group id appears.

Alternatively, you can read [`Collection.tokenGroups[].tokenGroupTokens`](#reading-all-groups-in-a-collection) once and cache it, then intersect against the wallet's token ids.
