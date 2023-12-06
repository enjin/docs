---
title: "TokenID Structure"
slug: "tokenid-structure"
excerpt: ""
hidden: false
createdAt: "Wed Nov 01 2023 00:49:29 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 00:19:24 GMT+0000 (Coordinated Universal Time)"
---
There's no right or wrong way to create your token IDs, as long as they make sense to you and your project.  The goal is to end up with a single unique 128bit integer per token, and because of this you have the opportunity to use this number to store some information about the token right in the ID.  With that in mind the Enjin Development team has made some suggestions for various different approaches to organizing and structuring token IDs on the Enjin Matrixchain.

# Bitmasks, Ranges, and Hashes

Let's suppose that we are going to create a collection with three subclasses, `game`, `server `and `item_class`.

## Bitmasks

The first thing we would need to define is the size of each class. The size MUST be a power of 2; As an example, we can have up to 16 games (4bits), 256 servers (8bits), and 65536 items classes (16bit). A `TokenId` is 128 bits, so the remaining 100 bits will store the `ID` of the token.

```
// 4 bits, stored at indices 124 - 127
0x01 -> Game 01
0x02 -> Game 02
0x03 -> Game 03
...

// 8 bits, stored at indices 115 - 123
0x01 -> server 01
0xff -> server 255
...

// 16 bits, stored at indices 100 - 114
a34f -> Sword
51b4 -> Helmet
...

// bits 0 - 99 store the id

          | GAME | SERVER | CLASS | ID
Sword-01  | 05   | ff     | a34f  | 0 
Sword-02  | 05   | ff     | a34f  | 1 
Helmet-01 | 05   | ff     | 51b4  | 0 
```

If we create a token with the ID: `0x05ffa34f000000000000000000000001`, it means it belongs to Game 05, server 255, sword of id #1.  On-chain this ID would resolve to `7973487969641194258956085157284544513`.

## Ranges

A granular approach in contrast with bitmasks.

```
|- Game 01: TokenID between 0~1000
|---- Server 01: 0~300
|--------- Class A: 0~20
|--------- Class B: 20~40
|--------- Class B: 40~60
|---- Server 02: 300~600
|--------- Class A: 300~320
|--------- Class B: 320~340
|-Game 02 -> TokenID between 1000~2000
...

token_id = (game_id * 1000) + (server_id * 300) + (class_id * 20) + item_id
```

In this case, a token with an id `325` belongs to Game 01, Server 02, Class B, item_id #5.

The advantage of ranges is that you can use the bits more efficiently, and to extract the subclasses from the token, you would need to:

```
|- Game 01: TokenID between 0~1000
|---- Server 01: 0~300
|--------- Class A: 0~20
|--------- Class B: 20~40
|--------- Class B: 40~60
|---- Server 02: 300~600
|--------- Class A: 300~320
|--------- Class B: 320~340
|-Game 02 -> TokenID between 1000~2000
...

token_id = (game_id * 1000) + (server_id * 300) + (class_id * 20) + item_id
```

## Hashes

Given the hash is a collision-resistant cryptographic hash function (ex: sha256, keccak256, blake2, etc), the token is guaranteed to be unique.​

```
class_1 = "Game01"
class_2 = "south-america-server-01"
...
class_n = 567

token_id = hash(hash(class_1) II hash(class_2) II ... II hash(class_n))
```

## Collections

The most used approach on Ethereum is to use ERC-721 contracts, which usually means separating the projects by contract. As an example, we can use the Happy cat and Happy dog collections.

The project/wallet owners have split each and every contract as a single collection, which appears as follows:

![](https://files.readme.io/dcf2c5c-image.png)

## Separate by Collection

Separate by collection is probably the easiest method to understand. There is no need to encode/decode the token IDs, making it easier for the users and other developers to know what is happening inside the collection.

The disadvantage is that this method might cost more as one contract or collection is needed for each “project”. This is especially true on Ethereum, where the transaction fees are very high.

## Separate by Bitmask

Separate by Bitmask is the most cost-efficient method. It allows the developer to have all its projects/games inside just one collection. It is one less layer to worry about in terms of the organization since you only interact with a single collection/project.

The disadvantage of this method is that it is harder for the users to understand and differ the purpose of each token, especially other developers that will have to work with encoding and decoding the data.

## Separate by Hashes

Separate by hashes have no restriction of classes you can use in the token id, and it's the recommended mechanism for teleporting Ethereum ERC721 to Enjin Blockchain.

Ethereum ERC721 and ERC1155 token ids have 256bit in size, while on Enjin Blockchain the token id is 128bit long, so it is not possible to use the same id in both chains; one possible solution is using token_id = hash(chain_id, erc721_address, erc721_id) to uniquely identify an Ethereum NFT on Enjin.

The disadvantage is that with this method, it wouldn't be possible to extract the subclasses from the token_id

> 📘 Inside each of these contracts, we have a set of tokens, and each token can be assigned to its own metadata; the same approach can be applied to Enjin, as explained by the diagram.

Once you have your integer token ID you can pass it into the various GraphQL queries and mutations that take an `EncodableTokenIdInput` using the `integer` encoder type which simply passes through the supplied integer without modification:

```
{  
    integer: 1001  
}
```

## Platform Token ID Encoders

Alongside the above manual methods for generating token IDs the Platform also comes with some built-in token ID encoders you can use to convert data in to integers.  These are as follows:

- ERC1155
- Hash
- StringId

### ERC1155

This encoder input type accepts a 16bit hex token ID and a 16bit integer index and converts it to a 128bit integer.  Although the resulting integer isn't identical to the 256bit ints used on Ethereum you can at least use the same base hex token ID and index, omitting the 'middle' 128bits from the Etherem token ID which were normally not used, for example:

```
Ethereum ID:
0x78c0000000003377000000000000000000000000000000000000000000000001

Remove middle 128bit zeros:
0x78c0000000003377000000000000000a

Token ID Encoder Input:
{
    erc1155: {
        tokenId: "78c0000000003377",
        index: 10,
    }
}

Resulting on-chain token ID:
160504280491028834688987873652194148362
```

This resulting token ID can be converted back into hex and split into the token ID and index which will then be the same as the familiar hex token IDs from Etheruem.  To obtain the exact same Ethereum token ID you can simply re-insert the middle 128bit of zeros, which can then also be converted back into the 256bit int if needed.

### Hash

The Hash encoder take an arbitrary array or object and calculates its hash to use as the token ID, e.g.  
Token ID Encoder Input:

```
Token ID Encoder Input:
{
    hash:["gameName", 123]
}

Resulting on-chain token ID:
47022901548931199993807182593510291332516584015190854220397276662650872775180
```

Please note that token IDs created this way cannot be reversed or decoded back into the origin data as hashing is a one-way process.

### StringId

The StringId encoder will take a string and attempt to convert it to an int:

```
Token Id Encoder Input:
{
    stringId:"MyToken-0001"
}

Resulting on-chain token ID:
23977024514528806328972881969
```

The resulting token ID can be converted back into it's original string by first converting the int to hex, and then converting the hex into a string.  Please note that some strings may convert into ints larger that 128bit.  The encoder will throw an exception if that's the case, so it's best to stick with shorter strings if possible.