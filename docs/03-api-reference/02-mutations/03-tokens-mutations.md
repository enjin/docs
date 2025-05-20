---
title: "Tokens"
slug: "tokens"
description: "Use the Enjin API to perform tokens mutations, including minting new tokens, burning existing ones, and modifying token metadata."
---

import GlossaryTerm from '@site/src/components/GlossaryTerm';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Please note: This is an introductory reference
For the most up-to-date information, refer to the [API Reference](/03-api-reference/03-api-reference.md).\
🚧 The information provided in this section cannot be programmatically updated and may be subject to inconsistencies over time.
:::

:::tip Core Endpoints
- **Testnet:** `http://platform.canary.enjin.io/graphql`
- **Mainnet:** `http://platform.enjin.io/graphql`
:::

This is a detailed reference guide that explains the most commonly used operations.

## CreateToken

The `CreateToken` mutation enables you to create a new token within an existing collection. This operation is essential for introducing new digital assets, and it allows you to define various attributes and characteristics for the newly created token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation CreateToken {
    CreateToken(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        collectionId: "10941"
        params: {
          tokenId:{integer:1}
          initialSupply:10
          cap: {
            type:INFINITE
          }
          metadata: {name: "Gold Coins", symbol: "GOLD", decimalCount: 2}
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "CreateToken": {
      "id": 14060,
      "transactionId": null,
      "transactionHash": null,
      "method": "CreateToken",
      "state": "PENDING",
      "encodedData": "0x280400c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3f5aa00042800010000c16ff28623000000000000000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

:::info
For Token ID management, head to [Advamced Mechanics → TokenID Structure](/02-guides/01-platform/03-advanced-mechanics/01-tokenid-structure.md)
:::

## MintToken

The `MintToken` mutation allows you to increase the supply of an existing token. This operation is essential for managing the circulating supply of tokens and is typically used when you need to create additional units of a specific token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MintToken {
    MintToken(
        recipient: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
        collectionId: "7154"
        params: {
          amount:1
          tokenId: {integer: 6533}
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "MintToken": {
      "id": 14065,
      "transactionId": null,
      "transactionHash": null,
      "method": "MintToken",
      "state": "PENDING",
      "encodedData": "0x280400aa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921c96f01156604010000c16ff28623000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## BatchMint

The `BatchMint` mutation enables you to efficiently create multiple tokens within a single blockchain transaction. This process, known as batch minting, simplifies the minting of multiple tokens, reducing transaction fees and processing time.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchMint {
  BatchMint(
    collectionId: "7154"
    recipients: [
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c2921"
        mintParams: {
          amount:1
          tokenId: {integer: 6533}
        }
      },
      {
        account: "0xaa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7215a17f847"
        mintParams: {
          amount:5
          tokenId: {integer: 4422}
        }
    	}
    ]
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "BatchMint": {
      "id": 13928,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchMint",
      "state": "PENDING",
      "encodedData": "0x280dc96f04aa89f9099742a928051c41eadba188ad4e863539ff96f16722ae7850271c292101156604010000c16ff28623000000000000000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## SetTokenAttribute

The `SetTokenAttribute` mutation allows you to assign or update attributes for a specific token within a collection. It is used to manage individual token metadata and properties.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SetTokenAttribute{
  SetTokenAttribute(
    collectionId: "4741"
    tokenId: {integer:0}
    key: "test"
    value: "Hello"
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "SetTokenAttribute": {
      "id": 14073,
      "transactionId": null,
      "transactionHash": null,
      "method": "SetTokenAttribute",
      "state": "PENDING",
      "encodedData": "0x2809154a010000000000000000000000000000000010746573741448656c6c6f",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## BatchSetAttribute

The `BatchSetAttribute` mutation allows you to efficiently set or update multiple attributes for a specific token within a collection in a single blockchain transaction. Attributes represent various properties, characteristics, or metadata associated with a token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchSetAttribute {
    BatchSetAttribute(
        collectionId: "7154"
        tokenId: {integer:6533}
        attributes: [
          {
          	key:"Name"
          	value:"John"
          },
          {
          	key:"Surname"
          	value:"Snow"
          },
          {
          	key:"House"
          	value:"Stark"
	        }
        ]
    ) {
        id
        transactionId
        transactionHash
        method
        encodedData
        state
        wallet {
            account {
                publicKey
                address
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
    "BatchSetAttribute": {
      "id": 13961,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchSetAttribute",
      "encodedData": "0x280ec96f01851900000000000000000000000000000410746573741468656c6c6f",
      "state": "PENDING",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## BatchTransfer

The `BatchTransfer` mutation streamlines the process of transferring multiple tokens to one or more recipients within a single blockchain transaction. This is particularly useful when you need to distribute tokens to various accounts, such as rewarding multiple users or dispersing assets to different stakeholders.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation BatchTransfer {
    BatchTransfer(
        collectionId: 36105
        recipients: [
          {
            account:"cxM1YqYERiNvuEKkZUiUFefCtTfdy2q4Bj7QuWDfSPJuiuDWy"
            simpleParams: {
              tokenId: {integer:1}
              amount:1
            }
          },
          {
            account:"cxKLTnnbsjsWQen47Sb73WfvCSsWAQfjNd6hRW86EqKC9Frhu"
            simpleParams: {
              tokenId: {integer:1}
              amount:2
            }
          },
          {
            account:"cxM1YqYERiNvuEKkZUiUFefCtTfdy2q4Bj7QuWDfSPJuiuDWy"
            simpleParams: {
              tokenId: {integer:4}
              amount:1
            }
        	}
        ]        
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "BatchTransfer": {
      "id": 13974,
      "transactionId": null,
      "transactionHash": null,
      "method": "BatchTransfer",
      "state": "PENDING",
      "encodedData": "0x280cc96f041013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c000015660400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## SimpleTransferToken

The `SimpleTransferToken` mutation simplifies the process of transferring a specific token from one wallet to another. It is a straightforward way to facilitate token transfers without the need for complex intermediary steps.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation SimpleTransferToken {
    SimpleTransferToken(
        collectionId: "7154"
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        params: {
            tokenId: {integer:70468841277235617716769448539773927607}
            amount:1
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "SimpleTransferToken": {
      "id": 14074,
      "transactionId": null,
      "transactionHash": null,
      "method": "SimpleTransferToken",
      "state": "PENDING",
      "encodedData": "0x280600c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3c96f0033b7007b94fad4fa2fe1d6a5b71ece03350400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## ApproveToken

The `ApproveToken` mutation is a powerful tool for establishing fine-grained permission systems at the individual token level within a specific token collection. It enables a token owner to grant another account (the operator) the authority to transfer a defined number of tokens from their ownership to other accounts. This level of control is particularly valuable when managing tokens with varying values, attributes, or use cases within a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation ApproveToken {
  ApproveToken(
    collectionId: "7154"
    tokenId: {integer:6533}
    operator: "0x965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa6"
    amount: 1
    currentAmount: 1
    expiration: 445300
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "ApproveToken": {
      "id": 13855,
      "transactionId": null,
      "transactionHash": null,
      "method": "ApproveToken",
      "state": "PENDING",
      "encodedData": "0x2811c96f1566965bcdbb46614cbd79869e2eb568825f6c038cbdf9085edb1b164607d3738fa6040174cb060004",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## UnapproveToken

The `UnapproveToken` mutation serves the purpose of revoking approval for a specific account (referred to as the "operator") to transfer a particular token from a token account. Unlike `UnapproveCollection`, which revokes permissions over an entire collection, `UnapproveToken` provides fine-grained control by targeting individual tokens within a collection. This level of precision is valuable when managing tokens with distinct values, attributes, or permissions within a collection.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation UnapproveToken{
    UnapproveToken(
        collectionId: 7154
        tokenId: {integer:70468841277235617716769448539773927607}
        operator: "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d"
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "UnapproveToken": {
      "id": 14079,
      "transactionId": null,
      "transactionHash": null,
      "method": "UnapproveToken",
      "state": "PENDING",
      "encodedData": "0x2812c96f33b7007b94fad4fa2fe1d6a5b71ece0335d43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## Freeze

The `Freeze` mutation is a powerful tool that enables the temporary suspension of token transfers on a collection, token, collection account, or token account. This freezing action effectively prevents any further transfers from occurring, which also results in marketplace listings being unpurchaseable. The primary purpose of freezing is to provide administrative control, enhance security, investigate suspicious activities, or respond to unforeseen events that require the temporary halt of operations.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Freeze {
  Freeze(
    freezeType: COLLECTION
    collectionId: "10943"    
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "Freeze": {
      "id": 14064,
      "transactionId": null,
      "transactionHash": null,
      "method": "Freeze",
      "state": "PENDING",
      "encodedData": "0x2807fdaa00",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## Thaw

The `Thaw` mutation is a vital operation that allows you to unfreeze a previously frozen collection or token. Freezing temporarily prevents any transfers from occurring. Thawing reverses this action, restoring the collection or token's ability to be traded and transferred.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Thaw{
  Thaw(
    freezeType: TOKEN
    collectionId: 7154
    tokenId: {integer:70468841277235617716769448539773927607}
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "Thaw": {
      "id": 14075,
      "transactionId": null,
      "transactionHash": null,
      "method": "Thaw",
      "state": "PENDING",
      "encodedData": "0x2808c96f01b7007b94fad4fa2fe1d6a5b71ece03350101",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## MutateToken

The `MutateToken` mutation is a powerful tool for modifying specific properties of an individual token within a collection. It provides fine-grained control over token attributes, allowing you to make precise changes to a token's characteristics. In the provided example, the mutation is used to set the `listingForbidden` attribute to `true`, which effectively prohibits the token from being listed for sale or trade.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation MutateToken {
  MutateToken(
    collectionId: "7154"
    tokenId: {integer:6533}
    mutation: {
      listingForbidden:true
    }
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "MutateToken": {
      "id": 14067,
      "transactionId": null,
      "transactionHash": null,
      "method": "MutateToken",
      "state": "PENDING",
      "encodedData": "0x2803c96f15660100010100",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## OperatorTransferToken

The `OperatorTransferToken` mutation is designed for operators to transfer tokens on behalf of the token owner. It enables the transfer of a specified amount of tokens from a source address to a recipient address, with the operation performed by an authorized operator.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation OperatorTransferToken{
    OperatorTransferToken(
      	collectionId: "7154"    
        recipient: "0x50a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890d"
        params: {
          tokenId: {integer:6533}
          amount:1
          source:"0x1013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c00"
        }
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "OperatorTransferToken": {
      "id": 14068,
      "transactionId": null,
      "transactionHash": null,
      "method": "OperatorTransferToken",
      "state": "PENDING",
      "encodedData": "0x28060050a1ba0a184c9aca3a2ac7d427e96a676fe988454b4b56a62dd6622e843e890dc96f0115661013860712045df3393a7902eba3621115fdb7a6a4837349f7bc2fb676d57c000400",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## RemoveAllAttributes

Remove all attributes from a collection and token.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveAllAttributes {
  RemoveAllAttributes(
    collectionId: "7154"  
    tokenId: {integer:6533}
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "RemoveAllAttributes": {
      "id": 14069,
      "transactionId": null,
      "transactionHash": null,
      "method": "RemoveAllAttributes",
      "state": "PENDING",
      "encodedData": "0x280bc96f018519000000000000000000000000000001000000",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## RemoveTokenAttribute

The `RemoveTokenAttribute` mutation provides the capability to remove a specific attribute from an individual token within a collection. This operation is distinct from the `RemoveCollectionAttribute` mutation, which removes an attribute from all tokens within a collection. It is a precise way to manage token metadata, allowing for the removal of attributes that are no longer needed or contain errors.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation RemoveTokenAttribute {
  RemoveTokenAttribute(
    collectionId: "4741"
    tokenId: {integer:0}
    key: "name"
  ) {
    id
    transactionId
    transactionHash
    method
    state
    encodedData
    wallet {
      account {
        publicKey
        address
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
    "RemoveTokenAttribute": {
      "id": 14071,
      "transactionId": null,
      "transactionHash": null,
      "method": "RemoveTokenAttribute",
      "state": "PENDING",
      "encodedData": "0x280a154a0100000000000000000000000000000000106e616d65",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## TransferBalance

The `TransferBalance` mutation is an operation designed for initiating the transfer of a specified amount of funds or balance from one account to another. It plays a fundamental role in enabling financial transactions by allowing users to send precise amounts of cryptocurrency or digital assets securely and transparently.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferBalance {
    TransferBalance(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
        amount: 1
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "TransferBalance": {
      "id": 14077,
      "transactionId": null,
      "transactionHash": null,
      "method": "TransferBalance",
      "state": "PENDING",
      "encodedData": "0x0a0300c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a304",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## TransferAllBalance

The `TransferAllBalance` mutation is designed for the purpose of transferring the entire balance from one account to another. It simplifies the process of moving all available funds from a sender's account to a recipient's account. This mutation is particularly useful for scenarios where you need to empty an account, consolidate funds from multiple accounts into one, or transfer ownership of an account by moving all assets to the new owner.

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation TransferAllBalance {
    TransferAllBalance(
        recipient: "0xc4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a3"
    ) {
        id
        transactionId
        transactionHash
        method
        state
        encodedData
        wallet {
            account {
                publicKey
                address
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
    "TransferAllBalance": {
      "id": 14076,
      "transactionId": null,
      "transactionHash": null,
      "method": "TransferAllBalance",
      "state": "PENDING",
      "encodedData": "0x0a0400c4571a3720604eb1901dad5444376f91409814a2806686c6e6c4f2d664b422a301",
      "wallet": {
        "account": {
          "publicKey": "0x68b427dda4f3894613e113b570d5878f3eee981196133e308c0a82584cf2e160",
          "address": "cxLnsZcpE1xETr7TQrMCCsRYpSfpHPUpJUFAfiZdZvU6Ccy4B"
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## Infuse

The Infuse mutation allows you to embed Enjin Coin (ENJ) into an existing token. This operation is crucial for enhancing the intrinsic value of digital assets, ensuring that they carry a guaranteed ENJ backing. By infusing ENJ, you provide tangible value to the token, which can only be retrieved through the process of "<GlossaryTerm id="melt" />ing" the token.

:::warning Important Note
The `amount` argument is denoted in `u128`. This means that the number you specify is divided by 10^18 to determine the actual amount of ENJ to be infused.
e.g.: to infuse a token with 5 ENJ, the infusion argument should be set to `5000000000000000000`, which is `5*(10^18)`.
:::

<Tabs>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation Infuse{
  Infuse(
    collectionId: 3298 #Specify the collection ID
    tokenId: {integer: 1} #Specify the token ID
    amount: 5000000000000000000 #Specify the amount of ENJ to infuse
  ){
    id
    method
    state
  }
}
```
  </TabItem>
  <TabItem value="response" label="Response">
```json
{
  "data": {
    "Infuse": {
      "id": 386279,
      "method": "Infuse",
      "state": "PENDING"
    }
  }
}
```
  </TabItem>
</Tabs>