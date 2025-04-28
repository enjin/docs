---
title: "TokenID Structure"
slug: "tokenid-structure"
excerpt: ""
hidden: false
metadata: 
  title: "TokenID Structure - Understanding Enjin’s Unique Token Identification"
  description: "Learn about the Enjin TokenID structure, its format, and how to utilize it effectively to create and manage blockchain-based assets in your projects."
  image: []
  robots: "index"
createdAt: "Wed Nov 01 2023 00:49:29 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Dec 05 2024 20:27:39 GMT+0000 (Coordinated Universal Time)"
---
# Token ID Structure

Token IDs in a collection serve as unique identifiers for tokens, represented as 128-bit integers. Beyond their primary role, token IDs can also store structured information about a token's attributes, providing greater organizational flexibility. 

This guide outlines recommended approaches for structuring and organizing token IDs, as well as the four encoding options available on the Enjin Platform: **ERC1155**, **Hash**, **StringId**, and **Integer** (no encoding).

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

## Enjin Platform Token ID Encoders

The Enjin Platform provides built-in encoders to convert data into 128-bit token IDs:

### 1. **ERC1155 Encoder**

This encoder uses a 16-bit hexadecimal token ID and a 64-bit integer index.

```graphql
tokenId: {
	erc1155: {
		tokenId: "0x78c0000000003377", index: 10
  }
}
```

Resulting Token ID: `160504280491028834688987873652194148362`

***

### 2. **Hash Encoder**

This encoder generates a token ID from a hashed array or object.

for example:

```graphql
tokenId: {
	hash: {
  	Token: "Sword", Number: 5
  }
}
```

Resulting Token ID: `65304702016350863193892557847492631289`

Token IDs generated with this method cannot be reversed or decoded.

:::info Irreversible Token IDs with the Hash Encoder
Token IDs generated using the Hash Encoder are derived from a cryptographic hash function. As hashing is a one-way process, these token IDs cannot be reversed or decoded back into the original data.
:::

:::danger Important Note
The Hash Encoder generates token IDs by hashing input data. If the resulting hash exceeds 128 bits, the encoder will fail.
:::

***

### 3. **StringId Encoder**

This encoder converts a string into a numeric token ID.

for example:

```graphql
tokenId: {
	stringId: "MyToken-0001"
}
```

Resulting Token ID: `23977024514528806328972881969`

:::danger Important Note
The StringId Encoder converts strings into numeric token IDs. Strings that produce integers larger than 128 bits will cause the encoding to fail.
:::

***

### 4. **Integer**

For direct assignment, integers can be passed as-is to create token IDs.

for example:

```graphql
tokenId: {integer: 1001}
```

Resulting Token ID: `1001`

This approach is simple and requires no encoding or decoding.

***

## Choosing the Right Approach

### Considerations:

- **Ease of Use**: Use Integers or ranges for simplicity.  
- **Scalability**: Bitmasks and hashes work best for large collections with many attributes.  
- **Interoperability**: Use the ERC1155 encoder for compatibility with Ethereum-based assets.

By understanding these methods and tools, you can design token ID structures that best suit your project's needs while ensuring flexibility and scalability.
