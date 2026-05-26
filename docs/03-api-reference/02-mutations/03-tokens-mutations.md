---
title: "Tokens"
slug: "tokens"
description: "Create, mint, transfer, burn, freeze, infuse, and attribute tokens via CreateTransaction."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip GraphQL Endpoint
`https://platform.beta.enjin.io/graphql`
:::

All token-level actions are submitted through [`CreateTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createtransaction), with the action selected by the field set on the `transaction` input. The response shape is always a `Transaction` — the examples below all return the standard `{ uuid, action, state }` selection. Once a transaction reaches `FINALIZED`, the on-chain event(s) it emitted (e.g. `MultiTokens.Minted`, `MultiTokens.Transferred`, `MultiTokens.Burned`) can be read via the flow described in [Working with Events](/05-enjin-platform/03-working-with-events.md).

For collection-level actions (creating, mutating, freezing the whole collection, attributes), see [Collections Mutations](/03-api-reference/02-mutations/02-collections-mutations.md).

## createToken

Creates a single new token in a collection, minting `initialSupply` units to `recipient`. Leave `cap` unset for an unlimited supply.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createToken: {
        recipient: "efRecipientAddress"
        collectionId: 12345
        tokenId: 1
        initialSupply: 100
        listingForbidden: false
        infusion: 0
        anyoneCanInfuse: false
        cap: { type: SUPPLY, supply: 1000 }
        behavior: {
          type: HAS_ROYALTY
          royalties: [
            { address: "efRoyaltyBeneficiary", percentage: 5.0 }
          ]
        }
        attributes: [
          { key: "name", value: "Legendary Sword" }
          { key: "uri",  value: "https://example.com/metadata/sword.json" }
        ]
        groups: [60]
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
      "action": "MultiTokens.create_token",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>

## createTokens

Creates multiple tokens in the same collection in a single transaction. Each entry has the same fields as `createToken` minus the `collectionId` (which is set once at the top level).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateTokens {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      createTokens: {
        collectionId: 12345
        tokens: [
          {
            recipient: "efRecipientAddress"
            tokenId: 1
            initialSupply: 1
            listingForbidden: false
            infusion: 0
            anyoneCanInfuse: false
          }
          {
            recipient: "efRecipientAddress"
            tokenId: 2
            initialSupply: 1
            listingForbidden: false
            infusion: 0
            anyoneCanInfuse: false
          }
        ]
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

## mintToken

Mints additional units of an existing token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "efRecipientAddress"
        collectionId: 12345
        tokenId: 1
        amount: 10
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

## mintTokens

The batched form of `mintToken`. All entries must belong to the same `collectionId`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintTokens {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintTokens: {
        collectionId: 12345
        tokens: [
          { recipient: "efAlice", tokenId: 1, amount: 5 }
          { recipient: "efBob",   tokenId: 2, amount: 10 }
        ]
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

## transferToken

Transfers a token from the signer to a recipient. The signer (set via `signerAddress` / `signerExternalId` on `CreateTransaction`, or the Wallet Daemon by default) must hold the tokens being transferred.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      transferToken: {
        recipient: "efRecipientAddress"
        collectionId: 12345
        tokenId: 1
        amount: 1
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

## batchTransfer

Transfers multiple tokens (potentially to multiple recipients) from a single collection in one transaction. Each entry uses the field name `address` for the recipient — not `recipient`.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchTransfer {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      batchTransfer: {
        collectionId: 12345
        recipients: [
          { address: "efAlice", tokenId: 1, amount: 5 }
          { address: "efBob",   tokenId: 2, amount: 3 }
        ]
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

## transferEnj

Transfers ENJ from the signer to a recipient. There is no `keepAlive` flag in v3.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferEnj {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      transferEnj: {
        recipient: "efRecipientAddress"
        amount: 1000000000000000000   # 1 ENJ = 10^18 base units
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

For batched ENJ transfers (or for mixing ENJ transfers with other actions in a single extrinsic) use [`CreateBatchTransaction`](/03-api-reference/02-mutations/01-transaction-mutations.md#createbatchtransaction).

## burnToken

Burns a quantity of a token, removing it from the holder's balance. Set `removeTokenStorage: true` if you don't intend to re-mint and want the per-token storage deposit returned (only applicable when the burn empties the token's supply).

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BurnToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      burnToken: {
        collectionId: 12345
        tokenId: 1
        amount: 1
        removeTokenStorage: false
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

## mutateToken

Updates a token's mutable fields — behavior, listing flag, infusion permission, on-chain name, attributes.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MutateToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mutateToken: {
        collectionId: 12345
        tokenId: 1
        listingForbidden: true
        anyoneCanInfuse: true
        attributes: [
          { key: "description", value: "Updated description" }
        ]
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

## freezeToken / thawToken

Freeze or thaw an individual token. The `state` argument controls the freeze duration — `NEVER`, `TEMPORARY`, or `PERMANENT` — see [Freezing / Thawing Tokens](/02-guides/01-platform/01-managing-tokens/07-freezing-thawing.md) for the semantics of each.

<Tabs>
  <TabItem value="freeze" label="freezeToken">
```graphql
mutation FreezeToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      freezeToken: {
        collectionId: 12345
        tokenId: 1
        state: TEMPORARY
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
  <TabItem value="thaw" label="thawToken">
```graphql
mutation ThawToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      thawToken: {
        collectionId: 12345
        tokenId: 1
        state: TEMPORARY
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

To freeze/thaw an entire collection at once, use `freezeCollection` / `thawCollection` — see [Collections Mutations](/03-api-reference/02-mutations/02-collections-mutations.md#freezecollection--thawcollection).

## infuseToken / infuseTokens

Add ENJ as backing into a token. The single form targets one token; the batched form takes a list of `{ tokenId, amount }` entries inside a single `collectionId`.

<Tabs>
  <TabItem value="single" label="infuseToken">
```graphql
mutation InfuseToken {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      infuseToken: {
        collectionId: 12345
        tokenId: 1
        amount: 500000000000000000   # 0.5 ENJ
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
  <TabItem value="batch" label="infuseTokens">
```graphql
mutation InfuseTokens {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      infuseTokens: {
        collectionId: 12345
        tokens: [
          { tokenId: 1, amount: 500000000000000000 }
          { tokenId: 2, amount: 1000000000000000000 }
        ]
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

The signer must hold ENJ; if `anyoneCanInfuse` is `false` on the token, only the collection owner can infuse.

## setTokenAttribute

Set or update a single key/value attribute on a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetTokenAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      setTokenAttribute: {
        collectionId: 12345
        tokenId: 1
        key: "name"
        value: "Legendary Sword"
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

## batchSetTokenAttribute

Set multiple attributes on a token in one transaction.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSetTokenAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      batchSetTokenAttribute: {
        collectionId: 12345
        tokenId: 1
        attributes: [
          { key: "name",        value: "Legendary Sword" }
          { key: "description", value: "Forged in the Brotherhood" }
          { key: "uri",         value: "https://example.com/metadata/sword.json" }
        ]
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

## removeTokenAttribute

Remove a single attribute from a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveTokenAttribute {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeTokenAttribute: {
        collectionId: 12345
        tokenId: 1
        key: "name"
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

## removeAllTokenAttributes

Remove every attribute from a token in one transaction.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveAllTokenAttributes {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      removeAllTokenAttributes: {
        collectionId: 12345
        tokenId: 1
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
