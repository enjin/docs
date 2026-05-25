---
title: "Tokens"
slug: "tokens"
description: "Query the Enjin API for tokens: supply, cap, behavior, attributes, metadata, and token-group membership."
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

A `Token` is an individual asset (fungible or non-fungible) inside a [collection](/03-api-reference/01-queries/02-collections-queries.md). Tokens carry their supply, cap, attributes, metadata, behavior (currency / royalty), and any token-group memberships.

## GetToken

Returns a single token by either its canonical `id` (`"<collectionId>-<tokenId>"`) or by `collectionId` + `tokenId`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetToken {
  GetToken(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenId: 10
  ) {
    id
    tokenId
    supply
    isFrozen
    isNonFungible
    isListingForbidden
    infusion
    anyoneCanInfuse
    cap {
      type
      supply
    }
    behavior {
      __typename
      beneficiaries {
        accountId
        percentage
      }
    }
    attributes {
      key
      value
    }
    metadata {
      name
      description
    }
    collection {
      id
    }
    tokenGroupTokens {
      tokenGroupId
      position
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
      "id": "7153-10",
      "tokenId": "10",
      "supply": "1",
      "isFrozen": false,
      "isNonFungible": true,
      "isListingForbidden": false,
      "infusion": "0",
      "anyoneCanInfuse": false,
      "cap": {
        "type": "SUPPLY",
        "supply": "1"
      },
      "behavior": null,
      "attributes": [
        { "key": "uri", "value": "https://example.com/metadata/10.json" }
      ],
      "metadata": {
        "name": "Legendary Sword #10",
        "description": null
      },
      "collection": { "id": "7153" },
      "tokenGroupTokens": [
        { "tokenGroupId": "60", "position": 0 }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

`Token.behavior.__typename` distinguishes currency tokens (`IS_CURRENCY`) from royalty-bearing tokens (`HAS_ROYALTY`); for plain tokens with no special behavior the whole field is `null`.

## GetTokens

Returns a paginated list of tokens scoped to a single `collectionId`. Optionally filter to specific `tokenIds`. Pagination is offset-based — increment `page` until the returned list is empty.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GetTokens {
  GetTokens(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    limit: 15
    page: 1
  ) {
    id
    tokenId
    supply
    isNonFungible
    cap {
      type
      supply
    }
    metadata {
      name
    }
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "GetTokens": [
      {
        "id": "7153-6",
        "tokenId": "6",
        "supply": "1",
        "isNonFungible": true,
        "cap": { "type": "SUPPLY", "supply": "1" },
        "metadata": { "name": "Legendary Sword #6" }
      },
      {
        "id": "7153-10",
        "tokenId": "10",
        "supply": "1",
        "isNonFungible": true,
        "cap": { "type": "SUPPLY", "supply": "1" },
        "metadata": { "name": "Legendary Sword #10" }
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

### Filtering to specific token ids

Pass `tokenIds: [...]` to restrict the result to a known set:

```graphql
query GetTokens {
  GetTokens(
    network: ENJIN
    chain: MATRIX
    collectionId: 7153
    tokenIds: [6, 10]
    limit: 15
    page: 1
  ) {
    tokenId
    supply
  }
}
```
