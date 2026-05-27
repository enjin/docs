---
title: "TokenID Structure"
slug: "tokenid-structure"
description: "Learn about the Enjin TokenID structure, its format, and how to utilize it effectively to create and manage blockchain-based assets in your projects."
---
# Token ID Structure

Token IDs in a collection serve as unique identifiers for tokens, represented as 128-bit integers. Beyond their primary role, token IDs can also store structured information about a token's attributes, providing greater organizational flexibility.

This guide outlines four common approaches for structuring and organizing token IDs — **Bitmasks**, **Ranges**, **Hashes**, and **Integer** — along with how to pass them to the platform.

***

## Token ID Structuring Approaches

There are 4 key methods for Token ID organization:

1. [Bitmasks](#1-bitmasks)
2. [Ranges](#2-ranges)
3. [Hashes](#3-hashes)
4. [Integer (No Encoding)](#4-integer-no-encoding)

***

### 1. **Bitmasks**

Bitmasks allocate specific bits of the 128-bit token ID to various attributes, such as **game**, **server**, **class**, and **item ID**. Each section of the token ID is defined by the bit size required for that attribute, ensuring efficient use of space.

For example:

- **Game ID**: 4 bits (up to 16 games)
- **Server ID**: 8 bits (up to 256 servers)
- **Class ID**: 16 bits (up to 65,536 classes)
- **Item ID**: Remaining 100 bits

If you create a token with the ID `0x05ffa34f000000000000000000000001`, it can be decoded as:

- **Game ID**: `05` (Game 5)
- **Server ID**: `ff` (Server 255)
- **Class ID**: `a34f` (Sword)
- **Item ID**: `1`

This method is compact but requires encoding and decoding logic.

***

### 2. **Ranges**

Ranges define numeric intervals for each category, making the structure simpler to understand and decode.

for example:

- **Game 01**: Token IDs 0–1000
  - **Server 01**: 0–300
    - **Class A**: 0–20
    - **Class B**: 20–40
  - **Server 02**: 300–600

Token ID `325` maps to:

- **Game ID**: `01`
- **Server ID**: `02`
- **Class ID**: `B`
- **Item ID**: `5`

This approach is intuitive but may require manual configuration of ID ranges.

***

### 3. **Hashes**

Hashes use cryptographic functions like **SHA256**, **Keccak256**, or **Blake2** to generate unique token IDs. The input can include attributes such as game name, server, or class.

for example:

```
{
    token_id: hash(hash("Game01") || hash("Server01") || hash("Sword"))
}
```

This guarantees uniqueness but makes decoding impossible, as hashing is a one-way process.

***

### 4. **Integer (No Encoding)**

Using Integer IDs involves assigning unique and raw integers without additional encoding. This is the simplest method but does not include embedded metadata.

for example:

Token IDs are manually assigned, such as `1`, `2`, `3`, etc. This method is straightforward but lacks flexibility for organization.

***

## Passing a Token ID to the API

`tokenId` is a flat `BigInt` scalar — submit the structured 128-bit integer directly, with no wrapper object:

```graphql
mutation {
  CreateTransaction(
    network: ENJIN
    chain: MATRIX
    transaction: {
      mintToken: {
        recipient: "cxLU94nRz1en6gHnXnYPyTdtcZZ9dqBasexvexjArj4V1Qr8f"
        collectionId: 36105
        tokenId: 160504280491028834688987873652194148362
        amount: 1
      }
    }
  ) { uuid action state }
}
```

If you want to encode structure into the token ID (bitmask layout, hash, string-derived ID, etc.), compute the resulting 128-bit integer in your application and pass it as `tokenId`. The platform does not perform the encoding for you.

:::tip Need to group tokens by type?
If your goal is to share metadata or utility across a group of tokens — the use case the old ERC-1155 encoder addressed — use the built-in **Token Groups** feature instead of embedding the group in the token ID. See [Token Groups mutations](/03-api-reference/02-mutations/07-token-groups-mutations.md).
:::

## Choosing the Right Approach

- **Ease of Use** — Plain integers or ranges keep IDs human-readable and easy to manage.
- **Scalability** — Bitmasks and hashes work well for large collections with many attributes.
- **Grouping** — For shared metadata across many tokens, prefer on-chain [Token Groups](/03-api-reference/02-mutations/07-token-groups-mutations.md) over packing the group into the token ID.

By picking the structure that best fits your project, you can design a token-ID layout that stays flexible and scalable as your collection grows.
